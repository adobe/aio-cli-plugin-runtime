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

const aioConfig = require('@adobe/eslint-config-aio-lib-config')
const jestPlugin = require('eslint-plugin-jest')

const testGlobals = {
  fixtureFile: 'readonly',
  fixtureFileWithTimeZoneAdjustment: 'readonly',
  fixtureJson: 'readonly',
  fixtureZip: 'readonly',
  fakeFileSystem: 'readonly',
  createTestBaseFlagsFunction: 'readonly',
  createTestFlagsFunction: 'readonly'
}

module.exports = [
  ...aioConfig,
  {
    ignores: ['node_modules/**', 'coverage/**']
  },
  {
    rules: {
      'jsdoc/tag-lines': ['error', 'never', { startLines: null }]
    }
  },
  {
    files: ['test/**/*.js', 'e2e/**/*.js'],
    ...jestPlugin.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...jestPlugin.configs['flat/recommended'].languageOptions.globals,
        ...testGlobals
      }
    }
  }
]
