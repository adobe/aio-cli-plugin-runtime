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

const { createKeyValueArrayFromObject, createKeyValueObjectFromFile } = require('@adobe/aio-lib-runtime').utils

function getKeyValueArrayFromMergedParameters (args, paramChar, paramString, paramFileChar, paramFileString) {
  const paramsActionObj = getKeyValueObjectFromMergedParameters(args, paramChar, paramString, paramFileChar, paramFileString
    )
  if (Object.keys(paramsActionObj).length > 0) {
    return createKeyValueArrayFromObject(paramsActionObj)
  } else {
    return undefined
  }
}

function getKeyValueObjectFromMergedParameters (args, paramChar, paramString, paramFileChar, paramFileString) {
  let paramsActionObj = {}
  args.forEach((value, index) => {
    if (value === paramChar || value === paramString) {
      if (args.length < (index + 3) || args[index + 1].startsWith('-') || args[index + 2].startsWith('-')
          || (args.length > (index + 3) && !args[index+3].startsWith('-'))) {
        throw (new Error(`Please provide correct values for flags`))
      }
      paramsActionObj[args[index + 1]] = args[index + 2]
    }
    if (value === paramFileChar || value === paramFileString) {
      paramsActionObj = Object.assign(paramsActionObj, createKeyValueObjectFromFile(args[index + 1]))
    }
  })
  return paramsActionObj
}

module.exports = {
  getKeyValueArrayFromMergedParameters,
  getKeyValueObjectFromMergedParameters
}
