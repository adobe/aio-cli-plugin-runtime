/*
Copyright 2020 Adobe Inc. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { createKeyValueObjectFromFlag, createKeyValueArrayFromObject, createKeyValueObjectFromFile } = require('@adobe/aio-lib-runtime').utils
function getKeyValueArrayFromMergedParameters (paramCharFlags, paramStringFlags) {
  const paramsActionObj = getKeyValueObjectFromMergedParameters(paramCharFlags, paramStringFlags)
  if (Object.keys(paramsActionObj).length > 0) {
    return createKeyValueArrayFromObject(paramsActionObj)
  } else {
    return undefined
  }
}

function getKeyValueObjectFromMergedParameters (paramCharFlags, paramStringFlags) {
  let paramsActionObj = {}
  if (paramStringFlags) {
    paramsActionObj = createKeyValueObjectFromFile(paramStringFlags)
  }
  if (paramCharFlags) {
    Object.assign(paramsActionObj, createKeyValueObjectFromFlag(paramCharFlags))
  }
  return paramsActionObj
}

module.exports = {
  getKeyValueArrayFromMergedParameters,
  getKeyValueObjectFromMergedParameters
}
