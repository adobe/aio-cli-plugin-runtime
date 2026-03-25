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

/**
 * Print a simple text table to stdout.
 *
 * Replaces ux.table from @oclif/core v1-v3 (removed in v4).
 *
 * @param {Array} data - Array of data objects
 * @param {object} columns - Column definitions. Each key maps to a column. Supports:
 *   - header {string}: column header (defaults to key, capitalized)
 *   - get {function}: accessor function (defaults to row[key])
 *   - minWidth {number}: minimum column width
 * @param {object} [options] - Options:
 *   - printLine {function}: function to print a line (defaults to process.stdout.write)
 *   - 'no-header' {boolean}: skip printing the header row
 *   - 'no-truncate' {boolean}: ignored (included for API compatibility)
 */
function table (data, columns, options = {}) {
  const printLine = options.printLine || ((s) => process.stdout.write(s + '\n'))

  const cols = Object.keys(columns).map(key => {
    const col = columns[key]
    const header = typeof col.header === 'string' ? col.header : key.charAt(0).toUpperCase() + key.slice(1)
    const getValue = col.get || ((row) => row[key])
    const minWidth = Math.max(col.minWidth || 0, col.maxWidth || 0, header.length + 1)
    return { key, header, getValue, minWidth }
  })

  // Compute string values for all rows
  const rows = data.map(row => {
    const result = {}
    for (const col of cols) {
      const val = col.getValue(row)
      result[col.key] = val != null ? String(val) : ''
    }
    return result
  })

  // Compute column widths: max of minWidth and widest value + 1
  const widths = {}
  for (const col of cols) {
    const maxDataWidth = rows.length > 0 ? Math.max(...rows.map(r => r[col.key].length)) : 0
    widths[col.key] = Math.max(col.minWidth, maxDataWidth + 1)
  }

  const rowStart = ' '

  // Print header and divider
  let header = rowStart
  let divider = rowStart
  for (const col of cols) {
    const w = widths[col.key]
    header += col.header.padEnd(w)
    divider += ''.padEnd(w - 1, '─') + ' '
  }
  printLine(header)
  printLine(divider)

  // Print rows
  for (const row of rows) {
    let line = rowStart
    for (const col of cols) {
      line += row[col.key].padEnd(widths[col.key])
    }
    printLine(line)
  }
}

module.exports = { table }
