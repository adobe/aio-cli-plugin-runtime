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

const PackageCreate = require('./create')
const { Args } = require('@oclif/core')

class PackageUpdate extends PackageCreate {
  isUpdate () { return true }
}

PackageUpdate.args = {
  packageName: Args.string({
    required: true
  })
}

PackageUpdate.flags = PackageCreate.flags

PackageUpdate.description = 'Updates a Package'

PackageUpdate.aliases = [
  'runtime:pkg:update',
  'rt:package:update',
  'rt:pkg:update'
]

module.exports = PackageUpdate
