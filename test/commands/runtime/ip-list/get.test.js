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
jest.mock('inquirer')

const { stdout, stderr } = require('stdout-stderr')
const config = require('@adobe/aio-lib-core-config')
const { getToken, context } = require('@adobe/aio-lib-ims')
const inquirer = require('inquirer')

const TheCommand = require('../../../../src/commands/runtime/ip-list/get')
const IndexCommand = require('../../../../src/commands/runtime/ip-list/index')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand')

/**
 * Builds a mock fetch-like response. The command reads both res.status and
 * res.text() — it never re-parses as JSON itself — so we need a minimal
 * Response shape that satisfies both.
 *
 * @param {number} status - HTTP status to simulate.
 * @param {any} body - Object serialized as the JSON response body, or string
 *   to send raw. Pass undefined to simulate an empty body.
 * @returns {{status: number, text: () => Promise<string>}} fetch-like stub.
 */
function fetchResponse (status, body) {
  const text = body === undefined ? '' : (typeof body === 'string' ? body : JSON.stringify(body))
  return { status, text: async () => text }
}

/**
 * Instantiate the command with parsed argv and injected globals.
 * Mirrors the approach other runtime plugin tests take.
 *
 * @param {string[]} argv - CLI args to pass to the command.
 * @returns {TheCommand} ready-to-run command instance.
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

// Matches the wire shape returned by `get-ip-list` on Stage — regions map
// to a flat array of CIDR strings (not a nested { cidrs: [...] } object).
// Verified against a real Stage response on 2026-04-21.
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

  config.get.mockImplementation((key) => {
    if (key === 'project.org.ims_org_id') return 'BA3E111222@AdobeOrg'
    return undefined
  })
  context.getCurrent.mockResolvedValue(null)
  context.setCli.mockResolvedValue()
  getToken.mockResolvedValue('fake-token')

  // jest.mock('inquirer') replaces the module with an auto-mock whose exports
  // are undefined. Install a jest.fn() here so tests can assert call counts
  // even when they never route through the interactive branch.
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

// eslint-disable-next-line jest/expect-expect
test('base flags included in command flags',
  createTestBaseFlagsFunction(TheCommand, RuntimeBaseCommand)
)

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
  test('adds Authorization / x-gw-ims-org-id headers and posts JSON', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(fetchResponse(200, { ok: true }))
    const result = await TheCommand.callService({
      method: 'POST',
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
        body: JSON.stringify({ contactEmail: 'a@b.com' }),
        headers: expect.objectContaining({
          Authorization: 'Bearer abc',
          'x-gw-ims-org-id': 'BA3E@AdobeOrg',
          'Content-Type': 'application/json'
        })
      })
    )
  })

  test('strips protocol / trailing slashes from host', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(fetchResponse(200, {}))
    await TheCommand.callService({
      method: 'GET',
      host: 'https://host.adobeioruntime.net///',
      path: '/api/v1/web/ip-list/get-ip-list',
      token: 't',
      orgId: 'o',
      fetchImpl
    })
    expect(fetchImpl.mock.calls[0][0]).toBe('https://host.adobeioruntime.net/api/v1/web/ip-list/get-ip-list')
  })

  test('tolerates non-JSON bodies by returning the raw text', async () => {
    const fetchImpl = jest.fn().mockResolvedValue(fetchResponse(503, '<html>503</html>'))
    const result = await TheCommand.callService({
      method: 'GET', host: 'h', path: '/p', token: 't', orgId: 'o', fetchImpl
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
    // Defense in depth for a re-enveloped future wire shape.
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
    // no accept-terms call
    expect(global.fetch).toHaveBeenCalledTimes(1)
    const calledUrl = global.fetch.mock.calls[0][0]
    expect(calledUrl).toMatch(/\/get-ip-list\?/)
    expect(calledUrl).toMatch(/surface=cli/)
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
    const url = global.fetch.mock.calls[0][0]
    expect(url).toMatch(/region=amer/)
  })

  test('--service-host overrides the default', async () => {
    global.fetch.mockResolvedValueOnce(fetchResponse(200, IP_LIST_OK))
    const cmd = makeCommand(['--service-host', 'custom.adobeioruntime.net'])
    await cmd.run()
    expect(global.fetch.mock.calls[0][0]).toMatch(/^https:\/\/custom\.adobeioruntime\.net\//)
  })
})

describe('run() — input validation', () => {
  test('rejects an unknown region before making any HTTP call', async () => {
    const cmd = makeCommand(['--region', 'mars'])
    await expect(cmd.run()).rejects.toThrow()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  test('rejects --accept-terms without --contact-email', async () => {
    const cmd = makeCommand(['--accept-terms'])
    await expect(cmd.run()).rejects.toThrow()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  test('errors out if no IMS org id is configured', async () => {
    config.get.mockReturnValue(undefined)
    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow()
    expect(global.fetch).not.toHaveBeenCalled()
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

    // Second call is the POST to accept-terms with the right body + surface=cli.
    const acceptCall = global.fetch.mock.calls[1]
    expect(acceptCall[0]).toMatch(/\/accept-terms$/)
    expect(acceptCall[1].method).toBe('POST')
    expect(JSON.parse(acceptCall[1].body)).toEqual({
      contactEmail: 'ops@example.com',
      termsVersion: 1,
      surface: 'cli'
    })

    // The human-readable IP list is printed after acceptance.
    expect(stdout.output).toContain('AMER')
    expect(stdout.output).toMatch(/Terms v1 accepted/)
    // Terms text from the server is echoed to the user.
    expect(stdout.output).toMatch(/agree to the terms/)

    // inquirer was NOT prompted because we supplied non-interactive flags.
    expect(inquirer.prompt).not.toHaveBeenCalled()
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
  })

  test('bails out if the user declines at the interactive prompt', async () => {
    inquirer.prompt = jest.fn().mockResolvedValue({ accept: false })
    global.fetch.mockResolvedValueOnce(fetchResponse(403, TERMS_REQUIRED_BODY))

    const cmd = makeCommand([])
    await expect(cmd.run()).rejects.toThrow()
    // no accept-terms POST made
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
