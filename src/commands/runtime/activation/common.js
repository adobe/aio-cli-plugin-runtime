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

// for lines starting with date-time-string followed by stdout|stderr a ':' and a log-line, return only the logline
const dtsRegex = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}T[0-2]{1}\d{1}:[0-6]{1}\d{1}:[0-6]{1}\d{1}.\d+Z( *(stdout|stderr):)?\s(.*)/

const stripLog = (elem) => {
  // `2019-10-11T19:08:57.298Z       stdout: login-success ::  { code: ...`
  // should become: `login-success ::  { code: ...`
  const found = elem.match(dtsRegex)
  if (found && found.length > 3 && found[3].length > 0) {
    return found[3]
  }
  return elem
}

/**
 * Prints activation logs messages.
 *
 * @param activation the activation
 * @param strip if true, strips the timestamp which prefixes every log line
 * @param logger an instance of a logger to emit messages to
 */
module.exports.printLogs = (activation, strip, logger) => {
  if (activation.logs) {
    activation.logs.forEach(elem => {
      if (strip) {
        logger(stripLog(elem))
      } else {
        logger(elem)
      }
    })
  }
}
