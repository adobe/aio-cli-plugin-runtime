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

/* eslint jest/no-standalone-expect: ["error", { "additionalTestBlockFunctions": ["expect.extend"] }] */

const { stdout } = require('stdout-stderr')
const realFs = jest.requireActual('fs')
const fs = require('fs')
const eol = require('eol')
const path = require('path')

jest.setTimeout(30000)
jest.useFakeTimers()

// ensure a mocked openwhisk module for unit-tests
jest.mock('openwhisk')

// clear env variables
delete process.env.WHISK_AUTH
delete process.env.WHISK_APIHOST
delete process.env.WHISK_APIVERSION
delete process.env.WHISK_NAMESPACE
delete process.env.WSK_CONFIG_FILE

// default location of .wskprops
global.WSK_PROPS_PATH = require('path').join(require('os').homedir(), '.wskprops')

// trap console log
// if you want to see output, you can do this:
// beforeEach(() => { stdout.start(); stdout.print = true })
beforeEach(() => { stdout.start() })
afterEach(() => { stdout.stop() })

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
  // we have to have the default behaviour at the start since @oclif/core does some file reading on require
  readFileSync: jest.fn((p) => jest.requireActual('fs').readFileSync(p)),
  unlinkSync: jest.fn(),
  rmdirSync: jest.fn(),
  readdirSync: jest.fn()
}))

global.createFileSystem = (initialFiles = {}) => {
  const myFileSystem = { ...initialFiles }

  fs.existsSync.mockImplementation((filePath) => {
    const value = !!myFileSystem[filePath]
    if (!value && filePath !== WSK_PROPS_PATH) { // for testing, we don't want to use an existing .wskprops
      return realFs.existsSync(filePath)
    } else {
      return value
    }
  })

  fs.writeFileSync.mockImplementation((filePath, value) => {
    myFileSystem[filePath] = value
  })

  fs.readFileSync.mockImplementation((filePath) => {
    const value = myFileSystem[filePath]
    if (value === undefined && filePath !== WSK_PROPS_PATH) { // for testing, we don't want to use an existing .wskprops
      return realFs.readFileSync(filePath)
    } else {
      return value
    }
  })

  const removeFile = (filePath) => {
    delete myFileSystem[filePath]
  }

  fs.unlinkSync.mockImplementation(removeFile)
  fs.rmdirSync.mockImplementation(removeFile)

  fs.readdirSync.mockImplementation((filePath) => {
    const item = myFileSystem[filePath]
    if (!Array.isArray(item)) {
      throw new Error(`Fake filesystem ${filePath} value does not contain an array.`)
    }
    return item
  })

  fs.mkdirSync = jest.fn() // don't do anything

  return myFileSystem
}

global.clearMockedFs = () => {
  const mockedFs = require('fs')

  mockedFs.existsSync.mockImplementation((p) => realFs.existsSync(p))
  mockedFs.writeFileSync.mockImplementation((p, ...rest) => realFs.writeFileSync(p, ...rest))
  mockedFs.mkdirSync.mockImplementation((p, ...rest) => realFs.mkdirSync(p, ...rest))
  mockedFs.readFileSync.mockImplementation((p, ...rest) => realFs.readFileSync(p, ...rest))
  mockedFs.unlinkSync.mockImplementation((p) => realFs.unlinkSync(p))
  mockedFs.rmdirSync.mockImplementation((p) => realFs.rmdirSync(p))
  mockedFs.readdirSync.mockImplementation((p) => realFs.readdirSync(p))
}

// helper for fixtures
global.fixtureFile = (output) => {
  if (!realFs.existsSync(`./test/__fixtures__/${output}`)) {
    throw new Error(`./test/__fixtures__/${output}` + ' not found')
  }
  return realFs.readFileSync(`./test/__fixtures__/${output}`).toString()
}

// helper for fixtures, with regex replacement of place holders
global.fixtureFileWithTimeZoneAdjustment = (() => {
  const moment = require('dayjs')

  const dateFormatForList = { // only need to replace up to minutes, seconds are the same across timezones
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  }

  // compute timestamp in current timezone (for list views)
  const listViewReplaceWith = (timestamp) => {
    let replaceWith = new Date(timestamp).toLocaleString('en', dateFormatForList)
    replaceWith = replaceWith.replace(/24:/g, '00:')
    replaceWith = replaceWith.replace(/,/g, '')
    return replaceWith
  }

  // determine the string to replace (for list views)
  // if 'fromTimeZone' is not specified then assume it is America/NY
  const listViewToReplace = (timestamp, fromTimeZone) => {
    let toReplace = new Date(timestamp).toLocaleString('en', Object.assign({}, dateFormatForList, { timeZone: fromTimeZone || 'America/New_York' }))
    // remote the comma between the date and time
    toReplace = toReplace.replace(/24:/g, '00:')
    toReplace = toReplace.replace(/,/g, '')
    return toReplace
  }

  // compute timestamp in current timezone (for get views)
  const getViewReplaceWith = (timestamp) => {
    const replaceWith = moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    return replaceWith
  }

  // toReplace is either the string to replace or this is a list view,
  // so will compute what to replace from the given timestamps instead
  return (output, timestamps, fromTimeZone, replaceMe) => {
    let expOutput = fixtureFile(output)
    timestamps = Array.isArray(timestamps) ? timestamps : [timestamps]

    timestamps.forEach(timestamp => {
      // compute timestamp in current timezone
      const replaceWith = replaceMe === undefined ? listViewReplaceWith(timestamp) : getViewReplaceWith(timestamp)
      // determine the string to replace
      const toReplace = replaceMe || listViewToReplace(timestamp, fromTimeZone)

      const re = new RegExp(toReplace, 'g')
      expOutput = expOutput.replace(re, replaceWith)
      if (replaceWith === undefined) {
        // remove , when in list view
        expOutput = expOutput.replace(/,/g, '')
      }
    })

    return expOutput
  }
})()

// helper for fixtures
global.fixtureJson = (output) => {
  return JSON.parse(realFs.readFileSync(path.join(__dirname, '__fixtures__', output)).toString())
}

// helper for zip fixtures
global.fixtureZip = (output) => {
  return realFs.readFileSync(path.join(__dirname, '__fixtures__', output))
}

global.createTestBaseFlagsFunction = (TheCommand, BaseCommand) => {
  return global.createTestFlagsFunction(TheCommand, BaseCommand.flags)
}

global.createTestFlagsFunction = (TheCommand, Flags) => {
  return () => {
    // every command needs to override .flags (for global flags)
    // eslint: see https://eslint.org/docs/rules/no-prototype-builtins
    expect(Object.prototype.hasOwnProperty.call(TheCommand, '_flags')).toBeTruthy()

    const flagsKeys = Object.keys(Flags)
    const theCommandFlagKeys = Object.keys(TheCommand.flags)

    // every command needs to include the global flags (through object spread)
    expect(flagsKeys.every(k => theCommandFlagKeys.includes(k))).toBeTruthy()
  }
}

// fixture matcher
expect.extend({
  toMatchFixture (received, argument) {
    const val = fixtureFile(argument)
    expect(eol.auto(received)).toEqual(eol.auto(val))
    return { pass: true }
  }
})

// clean trailing whitespace which will vary with different terminal settings
/** @private */
function cleanWhite (input) {
  return eol.split(input).map(line => { return line.trim() }).join(eol.auto)
}

expect.extend({
  toMatchFixtureIgnoreWhite (received, argument) {
    const val = cleanWhite(fixtureFile(argument))
    // eat white
    expect(cleanWhite(received)).toEqual(val)
    return { pass: true }
  }
})

expect.extend({
  toMatchFixtureJson (received, argument) {
    const val = fixtureJson(argument)
    expect(received).toEqual(val)
    return { pass: true }
  }
})

global.createFileSystem({ [WSK_PROPS_PATH]: fixtureFile('wsk.properties') }) // seed the filesystem with .wskprops
