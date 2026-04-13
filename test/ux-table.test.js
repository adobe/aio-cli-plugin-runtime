/*
Copyright 2019 Adobe Inc. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { table } = require('../src/ux-table')

describe('table', () => {
  let lines

  beforeEach(() => {
    lines = []
  })

  const printLine = (s) => lines.push(s)

  test('prints header and data rows', () => {
    table(
      [{ name: 'Alice', age: '30' }],
      { name: { minWidth: 6 }, age: { minWidth: 5 } },
      { printLine }
    )
    expect(lines[0]).toMatch(/Name/)
    expect(lines[1]).toMatch(/─/)
    expect(lines[2]).toMatch(/Alice/)
  })

  test('suppresses header when no-header option is set', () => {
    table(
      [{ name: 'Alice' }],
      { name: { minWidth: 6 } },
      { printLine, 'no-header': true }
    )
    // Only one line (the data row), no header or divider
    expect(lines.length).toBe(1)
    expect(lines[0]).toMatch(/Alice/)
  })

  test('enforces maxWidth as upper bound and truncates values', () => {
    table(
      [{ code: 'toolongvalue' }],
      { code: { maxWidth: 6 } },
      { printLine }
    )
    // Column width capped at 6; content area is 5 chars (w - 1)
    const dataRow = lines[2]
    // 'toolo' (5 chars) + 1 space = 6 chars for the column
    expect(dataRow).toContain('toolo')
    expect(dataRow).not.toContain('toolongvalue')
  })

  test('truncates header when maxWidth is smaller than header length', () => {
    table(
      [{ status: 'ok' }],
      { status: { header: 'LongHeader', maxWidth: 6 } },
      { printLine }
    )
    // Header 'LongHeader' (10 chars) truncated to fit width 6 → 'LongH'
    expect(lines[0]).toContain('LongH')
    expect(lines[0]).not.toContain('LongHeader')
  })

  test('uses custom header when provided', () => {
    table(
      [{ id: '123' }],
      { id: { header: 'Identifier' } },
      { printLine }
    )
    expect(lines[0]).toContain('Identifier')
  })

  test('uses key-derived header when header is not provided', () => {
    table(
      [{ myKey: 'val' }],
      { myKey: {} },
      { printLine }
    )
    expect(lines[0]).toContain('MyKey')
  })

  test('uses custom get accessor', () => {
    table(
      [{ raw: 'hello' }],
      { raw: { get: row => row.raw.toUpperCase() } },
      { printLine }
    )
    expect(lines[2]).toContain('HELLO')
  })

  test('handles null/undefined values as empty strings', () => {
    table(
      [{ val: null }, { val: undefined }],
      { val: {} },
      { printLine }
    )
    // header + divider + 2 data rows
    expect(lines.length).toBe(4)
    expect(lines[2].trim()).toBe('')
    expect(lines[3].trim()).toBe('')
  })

  test('handles empty data array', () => {
    table([], { name: { minWidth: 6 } }, { printLine })
    // Header and divider still printed, no data rows
    expect(lines.length).toBe(2)
  })

  test('defaults to stdout when printLine is not provided', () => {
    const originalWrite = process.stdout.write.bind(process.stdout)
    const captured = []
    process.stdout.write = (s) => { captured.push(s); return true }
    try {
      table([{ x: '1' }], { x: {} })
      expect(captured.length).toBeGreaterThan(0)
    } finally {
      process.stdout.write = originalWrite
    }
  })
})
