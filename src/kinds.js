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

const path = require('path')

/**
 * Get the file extension for a kind
 *
 * @param {string} kind the kind
 * @returns {string} the file extension, or '' if not found
 */
function fileExtensionForKind (kind) {
  if (kind) {
    const [lang] = kind.split(':')
    switch (lang.toLowerCase()) {
      case 'ballerina': return '.bal'
      case 'dotnet': return '.cs'
      case 'go': return '.go'
      case 'java': return '.java'
      case 'nodejs': return '.js'
      case 'php': return '.php'
      case 'python': return '.py'
      case 'ruby': return '.rb'
      case 'rust': return '.rs'
      case 'swift': return '.swift'
    }
  }
  return ''
}

/**
 * Get the kind for a file extension
 *
 * @param {string} filename the filename
 * @returns {string}  the kind, or undefined if not found
 */
function kindForFileExtension (filename) {
  if (filename) {
    const ext = path.extname(filename)
    switch (ext.toLowerCase()) {
      case '.bal': return 'ballerina:default'
      case '.cs': return 'dotnet:default'
      case '.go': return 'go:default'
      case '.java': return 'java:default'
      case '.js': return 'nodejs:default'
      case '.php': return 'php:default'
      case '.py': return 'python:default'
      case '.rb': return 'ruby:default'
      case '.rs': return 'rust:default'
      case '.swift': return 'swift:default'
    }
  }
  return undefined
}

module.exports = {
  fileExtensionForKind,
  kindForFileExtension
}
