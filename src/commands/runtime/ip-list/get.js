/*
Copyright 2026 Adobe Inc. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { Flags } = require('@oclif/core')
const config = require('@adobe/aio-lib-core-config')
const chalk = require('chalk')
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const { getToken, context } = require('@adobe/aio-lib-ims')
const { CLI } = require('@adobe/aio-lib-ims/src/context')

/*
 * Service endpoint. Targets the runtime host directly rather than the CDN
 * fronted by adobeio-static.net: the CDN rewrites non-2xx origin responses
 * as a generic 503 HTML page, which masks the 403 TERMS_REQUIRED envelope
 * this command relies on. The runtime host preserves the original status
 * code and JSON body.
 */
const DEFAULT_SERVICE_HOST = '53444-iplistservice.adobeioruntime.net'
const SERVICE_PATH = '/api/v1/web/ip-list'
const SURFACE = 'cli'
const VALID_REGIONS = ['amer', 'emea', 'apac', 'aus']

/**
 * Resolve the ip-list service host, preferring explicit flags, then env
 * overrides, then the compiled-in default.
 *
 * @param {object} flags - Parsed oclif flags for this command.
 * @returns {string} Host to target (without scheme, trailing slash, or path).
 */
function resolveHost (flags) {
  return flags['service-host'] ||
    process.env.AIO_IP_LIST_HOST ||
    DEFAULT_SERVICE_HOST
}

/**
 * Resolve an IMS access token for the current CLI context. Uses the
 * active IMS context if one is set; otherwise falls back to the bare
 * CLI context, matching how `aio app deploy` selects its token.
 *
 * @returns {Promise<string>} Bearer token for the Authorization header.
 */
async function getAccessToken () {
  let contextName = CLI
  const currentContext = await context.getCurrent()
  if (currentContext && currentContext !== CLI) {
    contextName = currentContext
  } else {
    await context.setCli({ 'cli.bare-output': true }, false)
  }
  return getToken(contextName)
}

const ORG_ID_KEYS = ['project.org.ims_org_id', 'console.org.code', 'ims.org_id']

/**
 * Resolve the caller's IMS org id from aio config, returning the value
 * along with the key and scope it was read from so error paths can
 * route remediation to the right config surface.
 *
 * Key precedence:
 *   - `project.org.ims_org_id` — written by `aio app use` to both global
 *     config and the project's local `.aio` file; scope is probed
 *     explicitly since the key name alone is ambiguous.
 *   - `console.org.code` — written by `aio console org select` (global).
 *   - `ims.org_id` — legacy, retained for back-compat.
 *
 * Scope precedence matches aio-lib-core-config's merge order:
 * env > local > global.
 *
 * @returns {{orgId: string|null, key: string|null, scope: 'local'|'global'|'env'|null}}
 */
function resolveImsOrgId () {
  for (const key of ORG_ID_KEYS) {
    for (const scope of ['env', 'local', 'global']) {
      const value = config.get(key, scope)
      if (value) return { orgId: value, key, scope }
    }
  }
  return { orgId: null, key: null, scope: null }
}

/**
 * Low-level HTTP helper for the ip-list service. Returns the parsed JSON
 * body when the response decodes as JSON, plus the raw text so callers
 * can render a useful message when the origin returns non-JSON content.
 *
 * The service's web actions perform IMS validation inside the action
 * rather than at the gateway, so the canonical request shape is POST
 * with `token` and `imsOrgId` carried in the JSON body rather than in
 * Authorization / x-gw-ims-org-id headers.
 *
 * @param {object} opts - Request options.
 * @param {string} opts.host - Service host.
 * @param {string} opts.path - Request path.
 * @param {object} opts.body - JSON body; `token` and `imsOrgId` are merged in.
 * @param {string} opts.token - IMS bearer token.
 * @param {string} opts.orgId - IMS org id (`<ident>@AdobeOrg`).
 * @param {Function} [opts.fetchImpl] - Fetch override; used by tests.
 * @returns {Promise<{status: number, body: object|null, rawBody: string}>}
 *   Response envelope with HTTP status, parsed JSON body (or null when
 *   the response is not valid JSON), and the raw response text.
 */
async function callService ({ host, path, body, token, orgId, fetchImpl }) {
  const f = fetchImpl || global.fetch
  // Normalize the host: tolerate a scheme prefix or trailing slashes so
  // callers can pass either `host.example.com` or `https://host.example.com/`.
  const cleanHost = host.replace(/^https?:\/\//, '').replace(/\/+$/, '')
  const url = `https://${cleanHost}${path}`
  const payload = { ...(body || {}), token, imsOrgId: orgId }
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  }
  const res = await f(url, init)
  const text = await res.text()
  let parsed = null
  if (text) {
    try {
      parsed = JSON.parse(text)
    } catch (_) {
      /* leave parsed=null and let caller handle as raw */
    }
  }
  return { status: res.status, body: parsed, rawBody: text }
}

/**
 * Fetch the egress IP list, optionally scoped to a single region.
 *
 * @param {object} opts - see {@link callService}; adds `region`.
 * @param {string} opts.host - ip-list service host.
 * @param {string} opts.token - IMS bearer token.
 * @param {string} opts.orgId - IMS org id.
 * @param {string} [opts.region] - one of VALID_REGIONS.
 * @param {Function} [opts.fetchImpl] - fetch override for tests.
 * @returns {Promise<object>} response envelope from {@link callService}.
 */
async function getIpList ({ host, token, orgId, region, fetchImpl }) {
  const body = { surface: SURFACE }
  if (region) body.region = region
  return callService({
    host,
    path: `${SERVICE_PATH}/get-ip-list`,
    body,
    token,
    orgId,
    fetchImpl
  })
}

/**
 * POST a terms acceptance record for the current CLI user.
 *
 * `acceptanceMode` records whether the user confirmed at an interactive
 * prompt ("interactive") or passed `--accept-terms` non-interactively
 * ("programmatic"). The server validates this against its allowlist and
 * rejects anything else with 400.
 *
 * @param {object} opts - Request options.
 * @param {string} opts.host - Service host.
 * @param {string} opts.token - IMS bearer token.
 * @param {string} opts.orgId - IMS org id.
 * @param {string} opts.contactEmail - Email recorded for change notifications.
 * @param {number} opts.termsVersion - Version being accepted.
 * @param {'interactive'|'programmatic'} opts.acceptanceMode - How the
 *   user expressed consent.
 * @param {Function} [opts.fetchImpl] - Fetch override; used by tests.
 * @returns {Promise<object>} Response envelope from {@link callService}.
 */
async function postAcceptTerms ({ host, token, orgId, contactEmail, termsVersion, acceptanceMode, fetchImpl }) {
  return callService({
    host,
    path: `${SERVICE_PATH}/accept-terms`,
    body: { contactEmail, termsVersion, surface: SURFACE, acceptanceMode },
    token,
    orgId,
    fetchImpl
  })
}

/**
 * Build the error message shown when the service returns 403 because the IMS token does not grant access to the org id we sent. The
 * remediation depends on where the org id came from: if it was read from the local .aio config, the user needs to update that config
 * (e.g. by re-running `aio app use`). But if it came from the global config or env, the user needs to save their saved org selection (e.g. by re-running `aio console org select`).
 *
 * @param {object} opts
 * @param {string} opts.orgId - org id rejected by the service.
 * @param {string} opts.orgIdKey - aio config key it was read from.
 * @param {'local'|'global'|'env'} opts.orgIdScope - source surface.
 * @returns {string} multi-line message for this.error().
 */
function formatStaleOrgError ({ orgId, orgIdKey, orgIdScope }) {
  if (orgIdScope === 'local') {
    return (
      "Unable to fetch Runtime egress IPs for this project's Adobe org.\n\n" +
      "This project's local .aio is configured to use:\n" +
      `  ${orgId}\n` +
      `  (from '${orgIdKey}')\n\n` +
      'but your current Adobe I/O login does not appear to have access to that org.\n\n' +
      'To see the orgs available to your current login, run:\n' +
      '  aio console org list\n\n' +
      `Then either log in as an account with access to ${orgId}, ` +
      'or re-bind this project to an accessible org with:\n' +
      '  aio app use'
    )
  }
  // global, env, or unknown — all read as a "saved" CLI selection.
  return (
    'Unable to fetch Runtime egress IPs for the saved Adobe org.\n\n' +
    'The CLI is using the saved org:\n' +
    `  ${orgId}\n` +
    `  (from '${orgIdKey}'${orgIdScope === 'env' ? ' env var' : ''})\n\n` +
    'but your current Adobe I/O login does not appear to have access to it.\n\n' +
    'To see the orgs available to your current login, run:\n' +
    '  aio console org list\n\n' +
    'Then update the saved org selection:\n' +
    '  aio console org select\n\n' +
    'After that, retry:\n' +
    '  aio runtime ip-list get'
  )
}

/**
 * Render the ip-list service response as a terminal-friendly block
 * grouped by region.
 *
 * @param {object} data - Response body from `get-ip-list`.
 * @returns {string} Text ready to pass to `this.log()`.
 */
function formatHumanOutput (data) {
  const lines = []
  lines.push(chalk.bold('Adobe I/O Runtime egress IPs'))
  lines.push(`  version:     ${data.version}`)
  lines.push(`  lastUpdated: ${data.lastUpdated}`)
  if (data.terms) {
    lines.push(`  terms:       v${data.terms.version} accepted ${data.terms.acceptedAt}`)
  }
  lines.push('')
  const regions = data.regions || {}
  const regionKeys = Object.keys(regions).sort()
  if (regionKeys.length === 0) {
    lines.push(chalk.yellow('(no regions populated yet — the service has not been seeded)'))
    return lines.join('\n')
  }
  const longest = regionKeys.reduce((m, r) => Math.max(m, r.length), 0)
  for (const region of regionKeys) {
    // Current wire shape is { [region]: string[] }; the legacy
    // { cidrs: string[] } envelope is tolerated for forward-compatibility.
    const raw = regions[region]
    const cidrList = Array.isArray(raw) ? raw : (raw && raw.cidrs) || []
    const cidrs = [...cidrList].sort()
    lines.push(chalk.bold(region.toUpperCase().padEnd(longest + 2)) + `(${cidrs.length} CIDR${cidrs.length === 1 ? '' : 's'})`)
    for (const cidr of cidrs) {
      lines.push(`  ${cidr}`)
    }
    lines.push('')
  }
  return lines.join('\n').replace(/\n+$/, '')
}

class IpListGet extends RuntimeBaseCommand {
  // This command does not invoke OpenWhisk; it calls the ip-list HTTPS
  // service with an IMS bearer token, so it does not call super.run()
  // or this.wsk().
  async run () {
    const { flags } = await this.parse(IpListGet)
    const region = flags.region && flags.region.toLowerCase()
    if (region && !VALID_REGIONS.includes(region)) {
      this.error(`invalid region "${flags.region}". Expected one of: ${VALID_REGIONS.join(', ')}`, { exit: 1 })
    }
    flags.region = region
    if (flags['accept-terms'] && !flags['contact-email']) {
      this.error('--accept-terms requires --contact-email', { exit: 1 })
    }
    const { orgId, key: orgIdKey, scope: orgIdScope } = resolveImsOrgId()
    if (!orgId) {
      this.error(
        'IMS org id not found in aio config.\n\n' +
        'Run one of the following and try again:\n' +
        '  aio console org select\n' +
        '  aio app use',
        { exit: 1 }
      )
    }

    try {
      await this.runPipeline(flags, orgId, orgIdKey, orgIdScope)
    } catch (err) {
      // re-throw them as-is so the customer sees only the friendly message, no prefix or stack trace
      if (err && err.oclif) throw err
      await this.handleError('failed to fetch the egress IP list', err)
    }
  }

  async runPipeline (flags, orgId, orgIdKey, orgIdScope) {
    const host = resolveHost(flags)
    const token = await getAccessToken()

    // Repeat callers with an existing acceptance record for their
    // (org, user, surface) tuple receive 200 on the first attempt.
    let res = await getIpList({ host, token, orgId, region: flags.region })

    if (res.status === 403 && res.body && res.body.error === 'TERMS_REQUIRED') {
      await this.handleTermsRequired({ flags, res, host, token, orgId })
      // Retry once after recording acceptance.
      res = await getIpList({ host, token, orgId, region: flags.region })
      if (res.status === 403 && res.body && res.body.error === 'TERMS_REQUIRED') {
        this.error('terms were not accepted; try again with --accept-terms --contact-email you@example.com')
      }
    }

    if (res.status === 403 && res.body && /does not grant access/i.test(res.body.error || '')) {
      // The token is valid, but the resolved org is not accessible to the current login
      this.error(formatStaleOrgError({ orgId, orgIdKey, orgIdScope }), { exit: 1 })
    }

    if (res.status !== 200) {
      const detail = (res.body && (res.body.error || res.body.message)) || res.rawBody || `http ${res.status}`
      this.error(`ip-list service returned ${res.status}: ${detail}`)
    }

    if (flags.json) {
      this.logJSON('', res.body)
    } else {
      this.log(formatHumanOutput(res.body))
    }
  }

  async handleTermsRequired ({ flags, res, host, token, orgId }) {
    const { termsText, termsUrl, termsVersion } = res.body

    // Informational output is written to stderr so `--json` consumers
    // receive only the JSON payload on stdout, even on the first-use
    // path where the terms text and acceptance notice would otherwise
    // be interleaved with the response body.
    const info = (msg) => process.stderr.write(msg + '\n')

    info('')
    info(chalk.yellow.bold('This service requires terms acceptance before first use.'))
    if (termsUrl) info(chalk.dim(`Full terms: ${termsUrl}`))
    info('')
    if (termsText) {
      info(termsText)
      info('')
    }

    let contactEmail = flags['contact-email']
    let accepted = flags['accept-terms']
    // Captured up front so the value the server records matches the
    // path actually taken: `--accept-terms` is always "programmatic",
    // interactive prompt confirmations are "interactive".
    const acceptanceMode = accepted ? 'programmatic' : 'interactive'

    if (!accepted) {
      // Lazy-required so non-interactive runs (`--accept-terms` or
      // already-accepted users) do not pay the ESM-import cost.
      // inquirer v9+ is ESM-first; when required from a CommonJS
      // caller, its public API is exposed on `.default`.
      const inquirer = require('inquirer').default
      const answers = await inquirer.prompt([
        { name: 'accept', type: 'confirm', message: `Accept terms v${termsVersion}?`, default: false },
        {
          name: 'contactEmail',
          type: 'input',
          message: 'Contact email (for IP-change notifications):',
          when: (a) => a.accept && !contactEmail,
          validate: (v) => /.+@.+\..+/.test(v) || 'enter a valid email address'
        }
      ])
      accepted = answers.accept
      contactEmail = contactEmail || answers.contactEmail
    }

    if (!accepted) {
      this.error('terms were not accepted; cannot fetch the IP list')
    }
    if (!contactEmail) {
      this.error('a contact email is required to accept terms')
    }

    const acceptRes = await postAcceptTerms({
      host, token, orgId, contactEmail, termsVersion, acceptanceMode
    })
    if (acceptRes.status !== 200 && acceptRes.status !== 201) {
      const detail = (acceptRes.body && (acceptRes.body.error || acceptRes.body.message)) ||
        acceptRes.rawBody || `http ${acceptRes.status}`
      this.error(`failed to record terms acceptance (${acceptRes.status}): ${detail}`)
    }
    info(chalk.green(`Terms v${termsVersion} accepted. Fetching the IP list...`))
  }
}

/*
 * This command does not call OpenWhisk, so the OpenWhisk-targeted flags
 * from RuntimeBaseCommand (--apihost, --auth, --cert, --key, --insecure)
 * are intentionally excluded — they would be silently ignored and noisy
 * in --help. Only --debug and --verbose are inherited.
 *
 * --service-host is hidden because it is an internal escape hatch for
 * stage testing, not a customer-supported endpoint override. The
 * equivalent AIO_IP_LIST_HOST env var is available for the same purpose.
 */
IpListGet.flags = {
  debug: RuntimeBaseCommand.flags.debug,
  verbose: RuntimeBaseCommand.flags.verbose,
  region: Flags.string({
    description: `restrict output to one region (${VALID_REGIONS.join(', ')})`
  }),
  'accept-terms': Flags.boolean({
    description: 'accept the terms non-interactively; requires --contact-email'
  }),
  'contact-email': Flags.string({
    description: 'contact email used when accepting terms and subscribing to change notifications'
  }),
  'service-host': Flags.string({
    hidden: true,
    description: 'override the ip-list service host (escape hatch; also AIO_IP_LIST_HOST env var)'
  }),
  json: Flags.boolean({
    description: 'output raw JSON instead of a formatted table'
  })
}

IpListGet.description = 'Fetch the current Adobe I/O Runtime egress IP allowlist.\n' +
  'On first use the service returns the terms of service and the command prompts for acceptance; ' +
  'pass --accept-terms --contact-email to do that non-interactively.'

IpListGet.aliases = [
  'rt:ip-list:get'
]

IpListGet.examples = [
  '$ aio runtime ip-list get',
  '$ aio runtime ip-list get --region amer',
  '$ aio runtime ip-list get --json',
  '$ aio runtime ip-list get --accept-terms --contact-email platform-ops@example.com'
]

/* exported for unit tests */
module.exports = IpListGet
module.exports.getIpList = getIpList
module.exports.postAcceptTerms = postAcceptTerms
module.exports.callService = callService
module.exports.resolveHost = resolveHost
module.exports.formatHumanOutput = formatHumanOutput
module.exports.VALID_REGIONS = VALID_REGIONS
module.exports.DEFAULT_SERVICE_HOST = DEFAULT_SERVICE_HOST
module.exports.SERVICE_PATH = SERVICE_PATH
