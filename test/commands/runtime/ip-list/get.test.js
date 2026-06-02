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

jest.mock('@adobe/aio-lib-core-config')
jest.mock('@adobe/aio-lib-ims', () => ({
  getToken: jest.fn(),
  context: {
    getCurrent: jest.fn(),
    setCli: jest.fn()
  }
}))
jest.mock('@adobe/aio-lib-ims/src/context', () => ({ CLI: 'cli' }))
// inquirer v9+ exposes `.prompt` under `.default` when required from
// CommonJS. The mock exports the same jest.fn() under both shapes so
// tests remain agnostic to the inquirer major version.
jest.mock('inquirer', () => {
  const prompt = jest.fn()
  const mod = { prompt }
  mod.default = mod
  return mod
})

const { stdout, stderr } = require('stdout-stderr')
const config = require('@adobe/aio-lib-core-config')
const { getToken, context } = require('@adobe/aio-lib-ims')
const inquirer = require('inquirer')

const TheCommand = require('../../../../src/commands/runtime/ip-list/get')
const IndexCommand = require('../../../../src/commands/runtime/ip-list/index')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand')

/**
 * Builds a minimal fetch-like Response shape that satisfies the command's
 * usage of `res.status` and `res.text()`.
 *
 * @param {number} status - HTTP status to simulate.
 * @param {any} body - Object serialized as the JSON response body, a
 *   string to send raw, or undefined for an empty body.
 * @returns {{status: number, text: () => Promise<string>}} fetch-like stub.
 */
function fetchResponse (status, body) {
  const text = body === undefined ? '' : (typeof body === 'string' ? body : JSON.stringify(body))
  return { status, text: async () => text }
}

/**
 * Instantiate the command with parsed argv and a minimal oclif config.
 *
 * @param {string[]} argv - CLI args to pass to the command.
 * @returns {TheCommand} Ready-to-run command instance.
 */
function makeCommand (argv = []) {
  return new TheCommand(argv, {
    runHook: async () => ({ successes: [], failures: [] }),
    bin: 'aio',
    userAgent: 'test/0.0.0',
    findCommand: () => null,
    pjson: { oclif: {} }
  })
}

// Mirrors the current wire shape returned by `get-ip-list`: each region
// maps to a flat array of CIDR strings.
const IP_LIST_OK = {
  regions: {
    amer: ['44.207.149.158/32', '44.208.197.195/32'],
    emea: ['52.18.22.1/32']
  },
  version: 3,
  lastUpdated: '2026-04-19T08:00:00Z',
  terms: { version: 1, acceptedAt: '2026-04-18T10:00:00Z' }
}

const TERMS_REQUIRED_BODY = {
  error: 'TERMS_REQUIRED',
  termsUrl: 'https://example.com/terms',
  termsText: 'By using this service you agree to the terms of service.',
  termsVersion: 1
}

let origFetch

beforeEach(() => {
  jest.clearAllMocks()
  stdout.start()
  stderr.start()

  // Default binding: project.org.ims_org_id in global scope. Tests that
  // need a local-.aio or env binding override this in-place.
  config.get.mockImplementation((key, scope) => {
    if (key === 'project.org.ims_org_id' && (scope === undefined || scope === 'global')) {
      return 'BA3E111222@AdobeOrg'
    }
    return undefined
  })
  context.getCurrent.mockResolvedValue(null)
  context.setCli.mockResolvedValue()
  getToken.mockResolvedValue('fake-token')

  // Re-install a fresh jest.fn() so tests can assert call counts even
  // when they never enter the interactive branch.
  inquirer.prompt = jest.fn()

  origFetch = global.fetch
  global.fetch = jest.fn()
})

afterEach(() => {
  stdout.stop()
  stderr.stop()
  global.fetch = origFetch
  delete process.env.AIO_IP_LIST_HOST
})

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description is set', () => {
  expect(TheCommand.description).toBeDefined()
  expect(TheCommand.description.length).toBeGreaterThan(0)
})

test('aliases include rt:ip-list:get', () => {
  expect(TheCommand.aliases).toEqual(expect.arrayContaining(['rt:ip-list:get']))
})

test('examples are non-empty', () => {
  expect(TheCommand.examples).toBeDefined()
  expect(TheCommand.examples.length).toBeGreaterThan(0)
})

test('exposes only the shared logging flags from RuntimeBaseCommand', () => {
  // Inherits --debug and --verbose only; OpenWhisk-targeted flags
  // (--apihost, --auth, --cert, --key, --insecure) are excluded because
  // this command does not call OpenWhisk.
  expect(TheCommand.flags.debug).toBe(RuntimeBaseCommand.flags.debug)
  expect(TheCommand.flags.verbose).toBe(RuntimeBaseCommand.flags.verbose)
  expect(TheCommand.flags.apihost).toBeUndefined()
  expect(TheCommand.flags.auth).toBeUndefined()
  expect(TheCommand.flags.insecure).toBeUndefined()
})

test('--service-host is hidden from public help', () => {
  // Internal escape hatch for stage testing; not a supported endpoint
  // override, so it is hidden from --help.
  expect(TheCommand.flags['service-host'].hidden).toBe(true)
})

test('index command is an oclif help wrapper that extends RuntimeBaseCommand', () => {
  expect(typeof IndexCommand).toEqual('function')
  expect(IndexCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
  expect(IndexCommand.description).toBeDefined()
})

describe('resolveHost', () => {
  test('defaults to the hard-coded service host', () => {
    expect(TheCommand.resolveHost({})).toBe(TheCommand.DEFAULT_SERVICE_HOST)
  })
  test('respects AIO_IP_LIST_HOST', () => {
    process.env.AIO_IP_LIST_HOST = 'example.adobeioruntime.net'
    expect(TheCommand.resolveHost({})).toBe('example.adobeioruntime.net')
  })
  test('--service-host wins over AIO_IP_LIST_HOST and the default', () => {
    process.env.AIO_IP_LIST_HOST = 'env-host.adobeioruntime.net'
    expect(TheCommand.resolveHost({ 'service-host': 'flag-host.adobeioruntime.net' })).toBe('flag-host.adobeioruntime.net')
  })
})

describe('callService', () => {
  test('POSTs JSON with token + imsOrgId merged into the body', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(fetchResponse(200, { ok: true }))
    const result = await TheCommand.callService({
      host: 'host.adobeioruntime.net',
      path: '/api/v1/web/ip-list/accept-terms',
      token: 'abc',
      orgId: 'BA3E@AdobeOrg',
      body: { contactEmail: 'a@b.com' },
      fetchImpl
    })
    expect(result.status).toBe(200)
    expect(result.body).toEqual({ ok: true })
    expect(fetchImpl).toHaveBeenCalledWith(
      'https://host.adobeioruntime.net/api/v1/web/ip-list/accept-terms',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    )
    const sent = JSON.parse(fetchImpl.mock.calls[0][1].body)
    expect(sent).toEqual({
      contactEmail: 'a@b.com',
      token: 'abc',
      imsOrgId: 'BA3E@AdobeOrg'
    })
  })

  test('does NOT send Authorization / x-gw-ims-org-id headers', async () => {
    // The token and imsOrgId travel in the JSON body so the service
    // can validate the caller in-action rather than at the gateway.
    const fetchImpl = jest.fn().mockResolvedValue(fetchResponse(200, { ok: true }))
    await TheCommand.callService({
      host: 'h.adobeioruntime.net',
      path: '/p',
      token: 't',
      orgId: 'o',
      body: {},
      fetchImpl
    })
    const sentHeaders = fetchImpl.mock.calls[0][1].headers
    expect(sentHeaders.Authorization).toBeUndefined()
    expect(sentHeaders['x-gw-ims-org-id']).toBeUndefined()
  })

  test('strips protocol / trailing slashes from host', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(fetchResponse(200, {}))
    await TheCommand.callService({
      host: 'https://host.adobeioruntime.net///',
      path: '/api/v1/web/ip-list/get-ip-list',
      token: 't',
      orgId: 'o',
      body: { surface: 'cli' },
      fetchImpl
    })
    expect(fetchImpl.mock.calls[0][0]).toBe('https://host.adobeioruntime.net/api/v1/web/ip-list/get-ip-list')
  })

  test('tolerates non-JSON bodies by returning the raw text', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(fetchResponse(503, '<html>503</html>'))
    const result = await TheCommand.callService({
      host: 'h', path: '/p', token: 't', orgId: 'o', body: {}, fetchImpl
    })
    expect(result.status).toBe(503)
    expect(result.body).toBeNull()
    expect(result.rawBody).toBe('<html>503</html>')
  })
})

describe('formatHumanOutput', () => {
  test('groups CIDRs by region sorted alphabetically', () => {
    const out = TheCommand.formatHumanOutput(IP_LIST_OK)
    expect(out).toMatch(/version:\s+3/)
    expect(out).toMatch(/lastUpdated:\s+2026-04-19/)
    expect(out).toMatch(/AMER/)
    expect(out).toMatch(/EMEA/)
    // amer appears before emea alphabetically
    expect(out.indexOf('AMER')).toBeLessThan(out.indexOf('EMEA'))
    expect(out).toContain('44.207.149.158/32')
    expect(out).toContain('44.208.197.195/32')
    expect(out).toContain('52.18.22.1/32')
  })

  test('handles a freshly-deployed (empty) service gracefully', () => {
    const out = TheCommand.formatHumanOutput({ regions: {}, version: 0, lastUpdated: null })
    expect(out).toMatch(/no regions populated/)
  })

  test('tolerates the legacy { cidrs: [...] } region envelope', () => {
    // Forward-compat: a re-enveloped future wire shape must still render.
    const out = TheCommand.formatHumanOutput({
      regions: { amer: { cidrs: ['10.0.0.1/32'] } },
      version: 1,
      lastUpdated: '2026-04-21T00:00:00Z'
    })
    expect(out).toContain('10.0.0.1/32')
  })
})

describe('run() — happy path', () => {
  test('returns IPs without needing terms acceptance', async () => {
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand([])
    await cmd.run()
    expect(stdout.output).toContain('AMER')
    expect(stdout.output).toContain('44.207.149.158/32')
    // No accept-terms call is made when the user already has acceptance on file.
    expect(global.fetch).toHaveBeenCalledTimes(1)
    const call = global.fetch.mock.calls[0]
    expect(call[0]).toMatch(/\/get-ip-list$/)
    expect(call[1].method).toBe('POST')
    const body = JSON.parse(call[1].body)
    expect(body).toMatchObject({
      surface: 'cli',
      token: 'fake-token',
      imsOrgId: 'BA3E111222@AdobeOrg'
    })
    expect(body.region).toBeUndefined()
  })

  test('--json emits a parseable JSON document', async () => {
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand(['--json'])
    await cmd.run()
    const parsed = JSON.parse(stdout.output)
    expect(parsed).toEqual(IP_LIST_OK)
  })

  test('--region is forwarded to the service', async () => {
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand(['--region', 'amer'])
    await cmd.run()
    const body = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(body.region).toBe('amer')
    expect(body.surface).toBe('cli')
  })

  test('--region accepts uppercase and forwards lowercase', async () => {
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand(['--region', 'AUS'])
    await cmd.run()
    const body = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(body.region).toBe('aus')
  })

  test('--region accepts mixed case and forwards lowercase', async () => {
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand(['--region', 'Aus'])
    await cmd.run()
    const body = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(body.region).toBe('aus')
  })

  test('--service-host overrides the default', async () => {
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand(['--service-host', 'custom.adobeioruntime.net'])
    await cmd.run()
    expect(global.fetch.mock.calls[0][0]).toMatch(/^https:\/\/custom\.adobeioruntime\.net\//)
  })

  test('sends token + imsOrgId in every request body', async () => {
    // Every outbound POST must carry the IMS token and org id in the
    // body so the service can validate the caller in-action.
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(200, { ok: true }))
      .mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand(['--accept-terms', '--contact-email', 'ops@example.com'])
    await cmd.run()
    for (const call of global.fetch.mock.calls) {
      const body = JSON.parse(call[1].body)
      expect(body.token).toBe('fake-token')
      expect(body.imsOrgId).toBe('BA3E111222@AdobeOrg')
    }
  })
})

describe('run() — input validation', () => {
  test('rejects an unknown region before making any HTTP call', async () => {
    const cmd = makeCommand(['--region', 'mars'])
    await expect(cmd.run()).rejects.toThrow(/invalid region "mars"/)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  test('unknown region error preserves the user-supplied casing', async () => {
    const cmd = makeCommand(['--region', 'MARS'])
    await expect(cmd.run()).rejects.toThrow(/invalid region "MARS"/)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  test('rejects --accept-terms without --contact-email', async () => {
    const cmd = makeCommand(['--accept-terms'])
    await expect(cmd.run()).rejects.toThrow(/--accept-terms requires --contact-email/)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  test('errors out if no IMS org id is configured', async () => {
    // Locks the exact multi-line wording so a future copy edit cannot
    // silently regress the customer-facing first-use error.
    config.get.mockReturnValue(undefined)
    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow(
      'IMS org id not found in aio config.\n\n' +
      'Run one of the following and try again:\n' +
      '  aio console org select\n' +
      '  aio app use'
    )
    expect(global.fetch).not.toHaveBeenCalled()
  })

  test('falls back to console.org.code when project.org.ims_org_id is not set', async () => {
    // After `aio console org select` without a subsequent `aio app use`,
    // the IMS org id is stored at console.org.code rather than
    // project.org.ims_org_id; the command must resolve it from there.
    config.get.mockImplementation((key, scope) => {
      if (key === 'project.org.ims_org_id') return undefined
      if (key === 'console.org.code' && (scope === undefined || scope === 'global')) {
        return 'C74F69D7594880280A495D09@AdobeOrg'
      }
      return undefined
    })
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand([])
    await cmd.run()
    const sentBody = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(sentBody.imsOrgId).toBe('C74F69D7594880280A495D09@AdobeOrg')
  })

  test('prefers project.org.ims_org_id over console.org.code when both are set', async () => {
    // An explicit `aio app use` binding (project-local) takes precedence
    // over the global `aio console org select` binding.
    config.get.mockImplementation((key, scope) => {
      if (scope !== undefined && scope !== 'global') return undefined
      if (key === 'project.org.ims_org_id') return 'PROJECT111@AdobeOrg'
      if (key === 'console.org.code') return 'CONSOLE222@AdobeOrg'
      return undefined
    })
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand([])
    await cmd.run()
    const sentBody = JSON.parse(global.fetch.mock.calls[0][1].body)
    expect(sentBody.imsOrgId).toBe('PROJECT111@AdobeOrg')
  })
})

describe('run() — stale org id (403 token/org mismatch)', () => {
  // Service envelope: 403 with `{error: "token does not grant access to org X@AdobeOrg"}`.
  // Remediation routes by the source scope of the resolved org id:
  // global/env → "saved org" + `aio console org select`; local → "this
  // project" + `aio app use`.

  test('global-config scope surfaces the "saved org" remediation', async () => {
    config.get.mockImplementation((key, scope) => {
      if (scope !== undefined && scope !== 'global') return undefined
      if (key === 'console.org.code') return 'STALE111@AdobeOrg'
      return undefined
    })
    global.fetch.mockResolvedValueOnce(fetchResponse(403, {
      error: 'token does not grant access to org STALE111@AdobeOrg'
    }))
    let caught
    try { await makeCommand([]).run() } catch (e) { caught = e }
    expect(caught).toBeDefined()
    expect(caught.message).toMatch(/saved Adobe org/)
    expect(caught.message).toMatch(/STALE111@AdobeOrg/)
    expect(caught.message).toMatch(/console\.org\.code/)
    expect(caught.message).toMatch(/aio console org list/)
    expect(caught.message).toMatch(/aio console org select/)
    // `aio app use` is the local-binding remediation; it must not
    // appear on the global-scope path.
    expect(caught.message).not.toMatch(/aio app use/)
  })

  test('local .aio scope surfaces the project-binding remediation', async () => {
    config.get.mockImplementation((key, scope) => {
      if (key === 'project.org.ims_org_id' && (scope === undefined || scope === 'local')) {
        return 'PROJBOUND@AdobeOrg'
      }
      return undefined
    })
    global.fetch.mockResolvedValueOnce(fetchResponse(403, {
      error: 'token does not grant access to org PROJBOUND@AdobeOrg'
    }))
    let caught
    try { await makeCommand([]).run() } catch (e) { caught = e }
    expect(caught).toBeDefined()
    expect(caught.message).toMatch(/this project's Adobe org/)
    expect(caught.message).toMatch(/PROJBOUND@AdobeOrg/)
    expect(caught.message).toMatch(/project\.org\.ims_org_id/)
    expect(caught.message).toMatch(/aio app use/)
    expect(caught.message).toMatch(/aio console org list/)
    // `aio console org select` would mutate the global selection
    // without fixing the local .aio binding that resolved here.
    expect(caught.message).not.toMatch(/aio console org select/)
  })

  test('env-var scope surfaces the "saved org" remediation and labels the source as env', async () => {
    config.get.mockImplementation((key, scope) => {
      if (key === 'project.org.ims_org_id' && scope === 'env') return 'ENVORG@AdobeOrg'
      return undefined
    })
    global.fetch.mockResolvedValueOnce(fetchResponse(403, {
      error: 'token does not grant access to org ENVORG@AdobeOrg'
    }))
    let caught
    try { await makeCommand([]).run() } catch (e) { caught = e }
    expect(caught).toBeDefined()
    expect(caught.message).toMatch(/saved Adobe org/)
    expect(caught.message).toMatch(/env var/)
  })

  test('non-matching 403 body falls through to the generic error', async () => {
    // Unrelated 403s (auth failures, etc.) must not be misclassified.
    // TERMS_REQUIRED is matched earlier and covered separately.
    global.fetch.mockResolvedValueOnce(fetchResponse(403, { error: 'something else' }))
    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow(/ip-list service returned 403: something else/)
  })

  test('403 with a non-JSON body falls through to the generic error', async () => {
    // A 403 from an upstream proxy may arrive as HTML rather than JSON;
    // res.body is null and the stale-org matcher must short-circuit
    // instead of throwing on the missing field.
    global.fetch.mockResolvedValueOnce(fetchResponse(403, '<html>forbidden</html>'))
    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow(/ip-list service returned 403/)
  })

  test('403 with a JSON body missing `error` falls through to the generic error', async () => {
    // res.body is present but does not carry an `error` field, so the
    // matcher exercises the `res.body.error || ''` fallback and short-circuits.
    global.fetch.mockResolvedValueOnce(fetchResponse(403, { message: 'forbidden' }))
    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow(/ip-list service returned 403: forbidden/)
  })
})

describe('run() — terms acceptance flow', () => {
  test('accepts terms non-interactively with --accept-terms + --contact-email, then retries the GET', async () => {
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY)) // initial GET
      .mockResolvedValueOnce(fetchResponse(200, { ok: true })) // POST accept-terms
      .mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK)) // retry GET

    const cmd = makeCommand(['--accept-terms', '--contact-email', 'ops@example.com'])
    await cmd.run()

    expect(global.fetch).toHaveBeenCalledTimes(3)

    // Second call is the POST to accept-terms with the right body + surface=cli
    // plus the token/imsOrgId the service needs to validate the caller.
    const acceptCall = global.fetch.mock.calls[1]
    expect(acceptCall[0]).toMatch(/\/accept-terms$/)
    expect(acceptCall[1].method).toBe('POST')
    expect(JSON.parse(acceptCall[1].body)).toEqual({
      contactEmail: 'ops@example.com',
      termsVersion: 1,
      surface: 'cli',
      acceptanceMode: 'programmatic',
      token: 'fake-token',
      imsOrgId: 'BA3E111222@AdobeOrg'
    })

    // The human-readable IP list is printed on stdout after acceptance.
    expect(stdout.output).toContain('AMER')
    // Informational messages (terms text and acceptance notice) are
    // written to stderr so --json consumers receive clean stdout.
    expect(stderr.output).toMatch(/Terms v1 accepted/)
    expect(stderr.output).toMatch(/agree to the terms/)

    // inquirer is not invoked when non-interactive flags are supplied.
    expect(inquirer.prompt).not.toHaveBeenCalled()
  })

  test('`--json` first-use produces parseable JSON (terms text on stderr only)', async () => {
    // With --json + --accept-terms on first use, informational output
    // must remain on stderr so stdout stays a valid JSON document for
    // scripted consumers (e.g. `aio runtime ip-list get --json | jq`).
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(200, { ok: true }))
      .mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))

    const cmd = makeCommand(['--json', '--accept-terms', '--contact-email', 'ops@example.com'])
    await cmd.run()

    // stdout must be valid JSON, nothing else.
    const parsed = JSON.parse(stdout.output)
    expect(parsed).toEqual(IP_LIST_OK)
    // terms text + acceptance line landed on stderr, not stdout.
    expect(stderr.output).toMatch(/agree to the terms/)
    expect(stderr.output).toMatch(/Terms v1 accepted/)
  })

  test('prompts interactively when --accept-terms is not passed', async () => {
    inquirer.prompt = jest.fn().mockResolvedValue({ accept: true, contactEmail: 'ops@example.com' })
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(200, { ok: true }))
      .mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))

    const cmd = makeCommand([])
    await cmd.run()

    expect(inquirer.prompt).toHaveBeenCalledTimes(1)
    const acceptBody = JSON.parse(global.fetch.mock.calls[1][1].body)
    expect(acceptBody.contactEmail).toBe('ops@example.com')
    // Prompt-driven acceptance is recorded as "interactive" so the
    // server can distinguish it from flag-driven runs.
    expect(acceptBody.acceptanceMode).toBe('interactive')
    expect(acceptBody.surface).toBe('cli')
  })

  test('bails out if the user declines at the interactive prompt', async () => {
    inquirer.prompt = jest.fn().mockResolvedValue({ accept: false })
    global.fetch.mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))

    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow()
    // The accept-terms POST is never sent on a declined prompt.
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  test('reports a helpful error when accept-terms POST itself fails', async () => {
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(500, { error: 'database offline' }))

    const cmd = makeCommand(['--accept-terms', '--contact-email', 'ops@example.com'])
    await expect(cmd.run()).rejects.toThrow()
    expect(global.fetch).toHaveBeenCalledTimes(2)
  })

  test('surfaces a useful error if the service still returns TERMS_REQUIRED after acceptance', async () => {
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(200, { ok: true }))
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))

    const cmd = makeCommand(['--accept-terms', '--contact-email', 'ops@example.com'])
    await expect(cmd.run()).rejects.toThrow()
  })
})

describe('IMS context selection', () => {
  test('uses the active IMS context name when one is set (non-CLI)', async () => {
    // When an IMS context is already active (for example via
    // `aio auth login`), the command must request a token for that
    // context rather than forcing the bare CLI context.
    context.getCurrent.mockResolvedValue('user-context')
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))

    const cmd = makeCommand([])
    await cmd.run()

    expect(getToken).toHaveBeenCalledWith('user-context')
    // setCli runs only on the no-current-context fallback path.
    expect(context.setCli).not.toHaveBeenCalled()
  })

  test('falls back to setCli when no current context exists', async () => {
    // When no IMS context is active, the command falls back to the
    // bare CLI context with `cli.bare-output: true`.
    context.getCurrent.mockResolvedValue(null)
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))

    const cmd = makeCommand([])
    await cmd.run()

    expect(context.setCli).toHaveBeenCalledWith({ 'cli.bare-output': true }, false)
    expect(getToken).toHaveBeenCalledWith('cli')
  })
})

describe('interactive terms prompt config', () => {
  test('email prompt validate + when callbacks exercise the regex and gating', async () => {
    // The prompt config builds `validate` and `when` callbacks that
    // inquirer invokes against user input. The mock invokes them
    // directly so the closure variables match what inquirer would see.
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(200, { ok: true }))
      .mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))

    inquirer.prompt = jest.fn().mockImplementation(async (questions) => {
      const emailQ = questions.find((q) => q.name === 'contactEmail')
      // validate(): rejects malformed input, accepts well-formed.
      expect(emailQ.validate('not-an-email')).toBe('enter a valid email address')
      expect(emailQ.validate('user@example.com')).toBe(true)
      // when(): asks for the email iff `accept` is true and no
      // --contact-email was supplied on the command line.
      expect(emailQ.when({ accept: true })).toBe(true)
      expect(emailQ.when({ accept: false })).toBe(false)
      return { accept: true, contactEmail: 'ops@example.com' }
    })

    const cmd = makeCommand([])
    await cmd.run()
  })

  test('email prompt is skipped when --contact-email is already supplied', async () => {
    // when() must return false so inquirer does not re-prompt for an
    // email that was already provided on the command line.
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(200, { ok: true }))
      .mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))

    inquirer.prompt = jest.fn().mockImplementation(async (questions) => {
      const emailQ = questions.find((q) => q.name === 'contactEmail')
      expect(emailQ.when({ accept: true })).toBe(false)
      return { accept: true }
    })

    const cmd = makeCommand(['--contact-email', 'preset@example.com'])
    await cmd.run()
  })

  test('errors if the user accepts at the prompt but provides no contact email', async () => {
    // If the prompt returns accept=true with an empty contactEmail,
    // the command exits before sending a malformed accept-terms request.
    inquirer.prompt = jest.fn().mockResolvedValue({ accept: true })
    global.fetch.mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))

    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow()
    // The accept-terms POST is never sent when the email is missing.
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})

describe('IndexCommand', () => {
  test('run() invokes Help.showHelp for the ip-list command group', async () => {
    // `aio runtime ip-list` with no subcommand delegates to oclif Help;
    // spy on Help.prototype.showHelp to confirm the wiring.
    const oclif = require('@oclif/core')
    const showHelpSpy = jest.spyOn(oclif.Help.prototype, 'showHelp').mockResolvedValue()

    const cmd = new IndexCommand([], {
      runHook: async () => ({ successes: [], failures: [] }),
      bin: 'aio',
      userAgent: 'test/0.0.0',
      findCommand: () => null,
      pjson: { oclif: {} }
    })
    await cmd.run()
    expect(showHelpSpy).toHaveBeenCalledWith(['runtime:ip-list', '--help'])
    showHelpSpy.mockRestore()
  })

  test('exposes non-empty examples', () => {
    expect(IndexCommand.examples).toBeDefined()
    expect(IndexCommand.examples.length).toBeGreaterThan(0)
  })

  test('overrides flags to {} so the topic --help does not list OpenWhisk flags', () => {
    // The topic command accepts no input, so OpenWhisk-targeted flags
    // inherited from RuntimeBaseCommand must not appear in --help.
    expect(IndexCommand.flags).toEqual({})
    for (const owFlag of ['apihost', 'auth', 'cert', 'key', 'insecure']) {
      expect(IndexCommand.flags).not.toHaveProperty(owFlag)
    }
  })
})

describe('customer-visible help text', () => {
  test('IpListGet description does not reference auth mechanism in --help', () => {
    // The authentication mechanism is an implementation detail that
    // does not belong in the customer-facing description.
    expect(TheCommand.description).toMatch(/Adobe I\/O Runtime egress IP allowlist/)
    expect(TheCommand.description).not.toMatch(/IMS-authenticated/i)
    expect(TheCommand.description).not.toMatch(/OAuth/i)
    expect(TheCommand.description).not.toMatch(/JWT/i)
  })

  test('IpListGet flags do not expose RuntimeBaseCommand OpenWhisk flags', () => {
    // --apihost / --auth / --cert / --key / --insecure are silently
    // ignored by this command and must not appear in --help.
    for (const owFlag of ['apihost', 'auth', 'cert', 'key', 'insecure']) {
      expect(TheCommand.flags).not.toHaveProperty(owFlag)
    }
    // --service-host is the internal escape hatch: present in flags
    // but hidden from --help output.
    expect(TheCommand.flags['service-host']).toBeDefined()
    expect(TheCommand.flags['service-host'].hidden).toBe(true)
  })
})

describe('branch-coverage edge cases', () => {
  test('callService tolerates an undefined body', async () => {
    // Exercises the `body || {}` short-circuit when callers omit body.
    const fetchImpl = jest.fn().mockResolvedValue(fetchResponse(200, { ok: true }))
    await TheCommand.callService({
      host: 'h', path: '/p', token: 't', orgId: 'o', fetchImpl
    })
    const sent = JSON.parse(fetchImpl.mock.calls[0][1].body)
    expect(sent).toEqual({ token: 't', imsOrgId: 'o' })
  })

  test('callService surfaces an empty response body cleanly', async () => {
    // For an empty body (e.g. 204 No Content), `body` must be null and
    // `rawBody` must be the empty string — never undefined.
    const fetchImpl = jest.fn().mockResolvedValue(fetchResponse(204, undefined))
    const r = await TheCommand.callService({
      host: 'h', path: '/p', token: 't', orgId: 'o', body: {}, fetchImpl
    })
    expect(r.status).toBe(204)
    expect(r.body).toBeNull()
    expect(r.rawBody).toBe('')
  })

  test('formatHumanOutput tolerates a response with no `regions` key', () => {
    // `data.regions || {}` short-circuit when the server omits the key.
    const out = TheCommand.formatHumanOutput({ version: 0, lastUpdated: null })
    expect(out).toMatch(/no regions populated/)
  })

  test('formatHumanOutput tolerates a falsy `raw` value for a region', () => {
    // A null region value (e.g. `{ regions: { amer: null } }`) must
    // not throw; the region renders as "(0 CIDRs)".
    const out = TheCommand.formatHumanOutput({
      regions: { amer: null },
      version: 1,
      lastUpdated: '2026-04-21T00:00:00Z'
    })
    expect(out).toMatch(/AMER/)
    expect(out).toMatch(/0 CIDRs/)
  })

  test('error detail falls back to "http <status>" when the server returns no body', async () => {
    // Covers `|| `http ${res.status}`` in the get-ip-list error path.
    global.fetch.mockResolvedValueOnce(fetchResponse(500, undefined))
    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow(/500/)
  })

  test('accept-terms error detail falls back to rawBody when JSON body is missing', async () => {
    // Covers the `|| acceptRes.rawBody` fallback when the failure
    // response from accept-terms isn't JSON-parseable.
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(502, '<html>bad gateway</html>'))
    const cmd = makeCommand(['--accept-terms', '--contact-email', 'ops@example.com'])
    await expect(cmd.run()).rejects.toThrow()
  })

  test('accept-terms error detail falls back to "http <status>" with no body or rawBody', async () => {
    // Covers the final `|| `http ${acceptRes.status}`` branch.
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(500, undefined))
    const cmd = makeCommand(['--accept-terms', '--contact-email', 'ops@example.com'])
    await expect(cmd.run()).rejects.toThrow()
  })

  test('get-ip-list error detail uses body.message when no body.error is present', async () => {
    // Covers the `res.body.message` branch of the detail-resolution chain.
    global.fetch.mockResolvedValueOnce(fetchResponse(500, { message: 'oops' }))
    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow(/oops/)
  })

  test('accept-terms error detail uses body.message when no body.error is present', async () => {
    // Covers the matching `acceptRes.body.message` branch.
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(500, { message: 'db offline' }))
    const cmd = makeCommand(['--accept-terms', '--contact-email', 'ops@example.com'])
    await expect(cmd.run()).rejects.toThrow(/db offline/)
  })

  test('accept-terms accepts a 201 Created response as success (not just 200)', async () => {
    // The success guard treats 200 and 201 as equivalent; this
    // exercises the 201 branch.
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))
      .mockResolvedValueOnce(fetchResponse(201, { ok: true }))
      .mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand(['--accept-terms', '--contact-email', 'ops@example.com'])
    await cmd.run()
    expect(global.fetch).toHaveBeenCalledTimes(3)
  })

  test('terms prompt omits the "Full terms" link when the server returns no termsUrl', async () => {
    // Covers the `if (termsUrl)` falsy branch in handleTermsRequired.
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, { ...TERMS_REQUIRED_BODY, termsUrl: undefined }))
      .mockResolvedValueOnce(fetchResponse(200, { ok: true }))
      .mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand(['--accept-terms', '--contact-email', 'ops@example.com'])
    await cmd.run()
    expect(stderr.output).not.toMatch(/Full terms/)
  })

  test('terms prompt omits the body block when the server returns no termsText', async () => {
    // Covers the `if (termsText)` falsy branch in handleTermsRequired.
    global.fetch
      .mockResolvedValueOnce(fetchResponse(403, { ...TERMS_REQUIRED_BODY, termsText: undefined }))
      .mockResolvedValueOnce(fetchResponse(200, { ok: true }))
      .mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand(['--accept-terms', '--contact-email', 'ops@example.com'])
    await cmd.run()
    expect(stderr.output).not.toMatch(/agree to the terms/)
  })
})

describe('run() — server errors', () => {
  test('surfaces a 503 raw HTML body (CloudFront-style) with a readable message', async () => {
    global.fetch.mockResolvedValueOnce(fetchResponse(503, '<html>503 Service Unavailable</html>'))
    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow()
  })

  test('surfaces a JSON error.message from the server', async () => {
    global.fetch.mockResolvedValueOnce(fetchResponse(500, { error: 'boom' }))
    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow()
  })
})
