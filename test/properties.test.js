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

const TheHelper = require('../src/properties.js')

test('exports', async () => {
  expect(typeof TheHelper).toEqual('object')
  expect(typeof TheHelper.propertiesFile).toEqual('function')
  expect(typeof TheHelper.PropertyKey).toEqual('object')
  expect(typeof TheHelper.PropertyEnv).toEqual('object')
  expect(typeof TheHelper.PropertyDefault).toEqual('object')
})

test('propertiesFile', () => {
  const properties = TheHelper.propertiesFile()
  expect(typeof properties.save).toEqual('function')
})
