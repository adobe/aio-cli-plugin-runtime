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

const TheCommand = require('../src/decorators.js')

test('standard decorators', async () => {
  const decorators = TheCommand.decorators(false)
  expect(decorators.collision).toEqual('\uD83D\uDCA5')
  expect(decorators.dot).toEqual('\u2024')
  expect(decorators.half_circle_lower).toEqual('\u25e1')
  expect(decorators.lock_with_key).toEqual('\uD83D\uDD10')
})

test('windows decorators', async () => {
  const decorators = TheCommand.decorators(true)
  expect(decorators.collision).toEqual('')
  expect(decorators.dot).toEqual('')
  expect(decorators.half_circle_lower).toEqual('')
  expect(decorators.lock_with_key).toEqual('')
})
