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

const RuntimeBaseCommand = require('../../../RuntimeBaseCommand')

class DeployVersion extends RuntimeBaseCommand {
  async run () {
    this.log(this.config.userAgent)
  }
}

DeployVersion.description = 'Prints the version number of aio runtime deploy'

DeployVersion.aliases = ['rt:deploy:version']

module.exports = DeployVersion
