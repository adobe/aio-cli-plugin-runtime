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
/*
 * inquirer v9+ is ESM-first and, when `require`d from a CommonJS caller,
 * surfaces its public API under a `.default` namespace instead of the
 * bare module.exports it used to in v8. We use `.default ?? module`
 * so this command keeps working against either shape — the fallback
 * matters for tests that mock `inquirer` with a plain `{ prompt: fn }`
 * object.
 */
const inquirerMod = require('inquirer')
const inquirer = inquirerMod.default || inquirerMod
const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')
const { getToken, context } = require('@adobe/aio-lib-ims')
const { CLI } = require('@adobe/aio-lib-ims/src/context')

/*
 * Service endpoint. Hits the runtime host directly (NOT adobeio-static.net)
 * because the CloudFront distribution in front of the static host rewrites
 * every non-2xx origin response as a generic 503 HTML page, which would
 * clobber the 403 TERMS_REQUIRED flow this command depends on. Tracked as
 * ACNA-4547. The runtime host preserves the underlying status code + JSON
 * body and exercises the same require-adobe-auth sequence + IMS validation.
 */
const DEFAULT_SERVICE_HOST = '53444-iplistservice-stage.adobeioruntime.net'
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
 * Build a canonical HTTPS URL from a host and path, stripping any scheme
 * / trailing slashes the caller may have supplied on the host.
 *
 * @param {string} host - Hostname, with or without protocol / trailing slash.
 * @param {string} path - Request path starting with `/`.
 * @returns {string} Fully-qualified `https://` URL.
 */
function joinUrl (host, path) {
  const cleanHost = host.replace(/^https?:\/\//, '').replace(/\/+$/, '')
  return `https://${cleanHost}${path}`
}

/**
 * Pull an IMS access token for the current CLI context. Mirrors the
 * DeployServiceCommand.getAccessToken implementation so callers of this
 * command behave identically to `aio app deploy` w.r.t. token selection
 * (CLI context if none set, otherwise whatever the user context is).
 *
 * @returns {Promise<string>} bearer token suitable for the Authorization header.
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

/**
 * Resolve the caller's IMS organization id from local aio config. The
 * service validates the IMS token and checks that the claimed imsOrgId
 * is one the token-holder actually belongs to, so if the CLI has not
 * been bound to an IMS org (i.e. no `aio console org select`) we fail
 * fast rather than sending a request that would be rejected with 400.
 *
 * @returns {string} IMS org id in `...@AdobeOrg` form.
 * @throws {Error} if no org id has been configured.
 */
function getImsOrgIdOrError () {
  const orgId = config.get('project.org.ims_org_id') ||
    config.get('console.org.ims_org_id') ||
    config.get('ims.org_id')
  if (!orgId) {
    throw new Error(
      'IMS org id not found in aio config. Run `aio console org select` ' +
      'or `aio app use` to bind this shell to an Adobe IMS org.'
    )
  }
  return orgId
}

/**
 * Low-level HTTP helper for the ip-list service. Returns both the parsed
 * JSON body (when the response decodes as JSON) and the raw text so the
 * caller can present a useful message when the origin returns non-JSON
 * (e.g. the CloudFront 503 HTML page — tracked in ACNA-4547).
 *
 * As of the cross-org refactor the service's web actions run with
 * `require-adobe-auth: false` and perform their own IMS validation inside
 * the action (see actions/auth.js in OneAdobe/ip-list-service). The
 * canonical request shape is therefore POST + JSON body with `token` and
 * `imsOrgId` carried *in the body* rather than in headers; the Authorization
 * / x-gw-ims-org-id header shape is a deprecated fallback only still
 * supported for backward compatibility.
 *
 * @param {object} opts - Request options.
 * @param {string} opts.host - ip-list service host.
 * @param {string} opts.path - Request path.
 * @param {object} opts.body - JSON body; token + imsOrgId are merged in here.
 * @param {string} opts.token - IMS bearer token.
 * @param {string} opts.orgId - IMS org id (`<ident>@AdobeOrg`).
 * @param {Function} [opts.fetchImpl] - fetch override, used by tests.
 * @returns {Promise<{status: number, body: object|null, rawBody: string}>}
 *   response envelope.
 */
async function callService ({ host, path, body, token, orgId, fetchImpl }) {
  const f = fetchImpl || global.fetch
  const url = joinUrl(host, path)
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
 * @param {object} opts - request options.
 * @param {string} opts.host - ip-list service host.
 * @param {string} opts.token - IMS bearer token.
 * @param {string} opts.orgId - IMS org id.
 * @param {string} opts.contactEmail - email to record for notifications.
 * @param {number} opts.termsVersion - version the caller is accepting.
 * @param {Function} [opts.fetchImpl] - fetch override for tests.
 * @returns {Promise<object>} response envelope from {@link callService}.
 */
/**
 * POST a terms acceptance record for the current CLI user.
 *
 * `acceptanceMode` distinguishes whether the user saw + confirmed the
 * terms at an interactive prompt ("interactive") or passed the
 * `--accept-terms` flag non-interactively from a script / CI
 * ("programmatic"). The admin dashboard uses this signal to help
 * customer-support triage contacts: a human-attested acceptance is a
 * stronger audit signal than a flag-driven one.
 *
 * @param {object} opts - request options.
 * @param {string} opts.host - ip-list service host.
 * @param {string} opts.token - IMS bearer token.
 * @param {string} opts.orgId - IMS org id.
 * @param {string} opts.contactEmail - email to record for notifications.
 * @param {number} opts.termsVersion - version the caller is accepting.
 * @param {'interactive'|'programmatic'} opts.acceptanceMode - how the
 *   user expressed consent. The server validates this against its own
 *   whitelist and rejects anything else with 400.
 * @param {Function} [opts.fetchImpl] - fetch override for tests.
 * @returns {Promise<object>} response envelope from {@link callService}.
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
 * Render the ip-list service response as a terminal-friendly block
 * grouped by region. Mirrors the spirit of `runtime:namespace:get` but
 * with a simpler layout since there are only ever a handful of rows.
 *
 * @param {object} data - response body from `get-ip-list`.
 * @returns {string} text ready to pass to `this.log()`.
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
    /*
     * The service returns regions as { [region]: string[] }, a flat
     * array of CIDR strings. We also tolerate a legacy { cidrs: [] }
     * shape in case the payload ever gets re-enveloped — no other
     * client has to care about the difference.
     */
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
  /*
   * NOTE: deliberately does not call super.run() / this.wsk() — this
   * command doesn't talk to OpenWhisk directly. It hits the ip-list
   * service HTTPS endpoint with an IMS bearer token.
   */
  async run () {
    const { flags } = await this.parse(IpListGet)
    try {
      await this.runPipeline(flags)
    } catch (err) {
      await this.handleError('failed to fetch the egress IP list', err)
    }
  }

  async runPipeline (flags) {
    if (flags.region && !VALID_REGIONS.includes(flags.region)) {
      this.error(`invalid region "${flags.region}". Expected one of: ${VALID_REGIONS.join(', ')}`)
    }
    if (flags['accept-terms'] && !flags['contact-email']) {
      this.error('--accept-terms requires --contact-email')
    }

    const host = resolveHost(flags)
    const orgId = getImsOrgIdOrError()
    const token = await getAccessToken()

    // First attempt. Most repeat callers already have terms accepted
    // for their (org, user, surface) tuple and get 200 on the first try.
    let res = await getIpList({ host, token, orgId, region: flags.region })

    if (res.status === 403 && res.body && res.body.error === 'TERMS_REQUIRED') {
      await this.handleTermsRequired({ flags, res, host, token, orgId })
      // Retry once after acceptance.
      res = await getIpList({ host, token, orgId, region: flags.region })
      if (res.status === 403 && res.body && res.body.error === 'TERMS_REQUIRED') {
        this.error('terms were not accepted; try again with --accept-terms --contact-email you@example.com')
      }
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

    this.log('')
    this.log(chalk.yellow.bold('This service requires terms acceptance before first use.'))
    if (termsUrl) this.log(chalk.dim(`Full terms: ${termsUrl}`))
    this.log('')
    if (termsText) {
      this.log(termsText)
      this.log('')
    }

    let contactEmail = flags['contact-email']
    let accepted = flags['accept-terms']
    /*
     * If --accept-terms was passed on the command line we never hit the
     * inquirer branch, so the acceptance is by definition programmatic.
     * Capture the decision up front rather than inferring it later —
     * this mirrors what the server stores and keeps the two code paths
     * symmetric.
     */
    const acceptanceMode = accepted ? 'programmatic' : 'interactive'

    if (!accepted) {
      /*
       * istanbul ignore next -- interactive branch; exercised in manual
       * demo runs. Unit tests route through --accept-terms to keep the
       * test path deterministic, matching the way aio-cli-plugin-runtime
       * tests its other inquirer-backed flows.
       */
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
    this.log(chalk.green(`Terms v${termsVersion} accepted. Fetching the IP list...`))
  }
}

IpListGet.flags = {
  ...RuntimeBaseCommand.flags,
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
    description: 'override the ip-list service host (also: AIO_IP_LIST_HOST env var)'
  }),
  json: Flags.boolean({
    description: 'output raw JSON instead of a formatted table'
  })
}

IpListGet.description = 'Fetch the current Adobe I/O Runtime egress IP allowlist (IMS-authenticated).\n' +
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
