<!--
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
-->

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@adobe/aio-cli-plugin-runtime.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-runtime)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-cli-plugin-runtime.svg)](https://npmjs.org/package/@adobe/aio-cli-plugin-runtime)
[![Build Status](https://travis-ci.org/adobe/aio-cli-plugin-runtime.svg?branch=master)](https://travis-ci.org/adobe/aio-cli-plugin-runtime)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-cli-plugin-runtime/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-cli-plugin-runtime/) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aio-cli-plugin-runtime.svg)](https://greenkeeper.io/)

# aio-cli-plugin-runtime

Adobe I/O Runtime plugin for the Adobe I/O CLI

---


<!-- toc -->
* [aio-cli-plugin-runtime](#aio-cli-plugin-runtime)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @adobe/aio-cli-plugin-runtime
$ ./bin/run COMMAND
running command...
$ ./bin/run (-v|--version|version)
@adobe/aio-cli-plugin-runtime/1.2.0 darwin-x64 node-v10.16.1
$ ./bin/run --help [COMMAND]
USAGE
  $ ./bin/run COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`./bin/run runtime`](#binrun-runtime)
* [`./bin/run runtime:action`](#binrun-runtimeaction)
* [`./bin/run runtime:action:create ACTIONNAME [ACTIONPATH]`](#binrun-runtimeactioncreate-actionname-actionpath)
* [`./bin/run runtime:action:delete ACTIONNAME`](#binrun-runtimeactiondelete-actionname)
* [`./bin/run runtime:action:get ACTIONNAME`](#binrun-runtimeactionget-actionname)
* [`./bin/run runtime:action:invoke ACTIONNAME`](#binrun-runtimeactioninvoke-actionname)
* [`./bin/run runtime:action:list`](#binrun-runtimeactionlist)
* [`./bin/run runtime:action:update ACTIONNAME [ACTIONPATH]`](#binrun-runtimeactionupdate-actionname-actionpath)
* [`./bin/run runtime:activation`](#binrun-runtimeactivation)
* [`./bin/run runtime:activation:get [ACTIVATIONID]`](#binrun-runtimeactivationget-activationid)
* [`./bin/run runtime:activation:list [ACTIVATIONID]`](#binrun-runtimeactivationlist-activationid)
* [`./bin/run runtime:activation:logs [ACTIVATIONID]`](#binrun-runtimeactivationlogs-activationid)
* [`./bin/run runtime:activation:result [ACTIVATIONID]`](#binrun-runtimeactivationresult-activationid)
* [`./bin/run runtime:deploy`](#binrun-runtimedeploy)
* [`./bin/run runtime:deploy:export`](#binrun-runtimedeployexport)
* [`./bin/run runtime:deploy:report`](#binrun-runtimedeployreport)
* [`./bin/run runtime:deploy:sync`](#binrun-runtimedeploysync)
* [`./bin/run runtime:deploy:undeploy`](#binrun-runtimedeployundeploy)
* [`./bin/run runtime:deploy:version`](#binrun-runtimedeployversion)
* [`./bin/run runtime:namespace`](#binrun-runtimenamespace)
* [`./bin/run runtime:namespace:get`](#binrun-runtimenamespaceget)
* [`./bin/run runtime:namespace:list`](#binrun-runtimenamespacelist)
* [`./bin/run runtime:package`](#binrun-runtimepackage)
* [`./bin/run runtime:package:bind PACKAGENAME BINDPACKAGENAME`](#binrun-runtimepackagebind-packagename-bindpackagename)
* [`./bin/run runtime:package:create PACKAGENAME`](#binrun-runtimepackagecreate-packagename)
* [`./bin/run runtime:package:delete PACKAGENAME`](#binrun-runtimepackagedelete-packagename)
* [`./bin/run runtime:package:get PACKAGENAME`](#binrun-runtimepackageget-packagename)
* [`./bin/run runtime:package:list [NAMESPACE]`](#binrun-runtimepackagelist-namespace)
* [`./bin/run runtime:package:update PACKAGENAME`](#binrun-runtimepackageupdate-packagename)
* [`./bin/run runtime:property`](#binrun-runtimeproperty)
* [`./bin/run runtime:property:get`](#binrun-runtimepropertyget)
* [`./bin/run runtime:property:set`](#binrun-runtimepropertyset)
* [`./bin/run runtime:property:unset`](#binrun-runtimepropertyunset)
* [`./bin/run runtime:route`](#binrun-runtimeroute)
* [`./bin/run runtime:route:create BASEPATH RELPATH APIVERB ACTION`](#binrun-runtimeroutecreate-basepath-relpath-apiverb-action)
* [`./bin/run runtime:route:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#binrun-runtimeroutedelete-basepathorapiname-relpath-apiverb)
* [`./bin/run runtime:route:get BASEPATHORAPINAME`](#binrun-runtimerouteget-basepathorapiname)
* [`./bin/run runtime:route:list [BASEPATH] [RELPATH] [APIVERB]`](#binrun-runtimeroutelist-basepath-relpath-apiverb)
* [`./bin/run runtime:rule`](#binrun-runtimerule)
* [`./bin/run runtime:rule:create NAME TRIGGER ACTION`](#binrun-runtimerulecreate-name-trigger-action)
* [`./bin/run runtime:rule:delete NAME`](#binrun-runtimeruledelete-name)
* [`./bin/run runtime:rule:disable NAME`](#binrun-runtimeruledisable-name)
* [`./bin/run runtime:rule:enable NAME`](#binrun-runtimeruleenable-name)
* [`./bin/run runtime:rule:get NAME`](#binrun-runtimeruleget-name)
* [`./bin/run runtime:rule:list`](#binrun-runtimerulelist)
* [`./bin/run runtime:rule:status NAME`](#binrun-runtimerulestatus-name)
* [`./bin/run runtime:rule:update NAME TRIGGER ACTION`](#binrun-runtimeruleupdate-name-trigger-action)
* [`./bin/run runtime:trigger`](#binrun-runtimetrigger)
* [`./bin/run runtime:trigger:create TRIGGERNAME`](#binrun-runtimetriggercreate-triggername)
* [`./bin/run runtime:trigger:delete TRIGGERPATH`](#binrun-runtimetriggerdelete-triggerpath)
* [`./bin/run runtime:trigger:fire TRIGGERNAME`](#binrun-runtimetriggerfire-triggername)
* [`./bin/run runtime:trigger:get TRIGGERPATH`](#binrun-runtimetriggerget-triggerpath)
* [`./bin/run runtime:trigger:list`](#binrun-runtimetriggerlist)
* [`./bin/run runtime:trigger:update TRIGGERNAME`](#binrun-runtimetriggerupdate-triggername)

## `./bin/run runtime`

Execute runtime commands

```
USAGE
  $ ./bin/run runtime

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run rt
```

_See code: [src/commands/runtime/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/index.js)_

## `./bin/run runtime:action`

Manage your actions

```
USAGE
  $ ./bin/run runtime:action

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run rt:action
```

_See code: [src/commands/runtime/action/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/action/index.js)_

## `./bin/run runtime:action:create ACTIONNAME [ACTIONPATH]`

Creates an Action

```
USAGE
  $ ./bin/run runtime:action:create ACTIONNAME [ACTIONPATH]

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -l, --logsize=logsize                  the maximum log size LIMIT in MB for the action (default 10)
  -m, --memory=memory                    the maximum memory LIMIT in MB for the action (default 256)
  -p, --param=param                      parameter values in KEY VALUE format

  -t, --timeout=timeout                  the timeout LIMIT in milliseconds after which the action is terminated (default
                                         60000)

  -u, --auth=auth                        whisk auth

  -v, --verbose                          Verbose output

  --apihost=apihost                      whisk API host

  --apiversion=apiversion                whisk API version

  --cert=cert                            client cert

  --debug=debug                          Debug level output

  --help                                 Show help

  --json                                 output raw json

  --key=key                              client key

  --kind=kind                            [default: nodejs:10] the KIND of the action runtime (example: swift:default,
                                         nodejs:default)

  --main=main                            the name of the action entry point (function or fully-qualified method name
                                         when applicable)

  --sequence=sequence                    treat ACTION as comma separated sequence of actions to invoke

  --version                              Show version

  --web=true|yes|false|no|raw            treat ACTION as a web action or as a raw HTTP web action

ALIASES
  $ ./bin/run rt:action:create
```

_See code: [src/commands/runtime/action/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/action/create.js)_

## `./bin/run runtime:action:delete ACTIONNAME`

Deletes an Action

```
USAGE
  $ ./bin/run runtime:action:delete ACTIONNAME

OPTIONS
  --json  output raw json

ALIASES
  $ ./bin/run runtime:action:del
  $ ./bin/run rt:action:delete
  $ ./bin/run rt:action:del
```

_See code: [src/commands/runtime/action/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/action/delete.js)_

## `./bin/run runtime:action:get ACTIONNAME`

Retrieves an Action

```
USAGE
  $ ./bin/run runtime:action:get ACTIONNAME

OPTIONS
  -i, --insecure           bypass certificate check
  -r, --url                get action url
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --save                   save action code to file corresponding with action name
  --save-as=save-as        file to save action code to
  --version                Show version

ALIASES
  $ ./bin/run rt:action:get
```

_See code: [src/commands/runtime/action/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/action/get.js)_

## `./bin/run runtime:action:invoke ACTIONNAME`

Invokes an Action

```
USAGE
  $ ./bin/run runtime:action:invoke ACTIONNAME

OPTIONS
  -P, --param-file=param-file  FILE containing parameter values in JSON format
  -b, --blocking               blocking invoke
  -i, --insecure               bypass certificate check
  -p, --param=param            parameter values in KEY VALUE format
  -r, --result                 blocking invoke; show only activation result (unless there is a failure)
  -u, --auth=auth              whisk auth
  -v, --verbose                Verbose output
  --apihost=apihost            whisk API host
  --apiversion=apiversion      whisk API version
  --cert=cert                  client cert
  --debug=debug                Debug level output
  --help                       Show help
  --key=key                    client key
  --version                    Show version

ALIASES
  $ ./bin/run rt:action:invoke
```

_See code: [src/commands/runtime/action/invoke.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/action/invoke.js)_

## `./bin/run runtime:action:list`

Lists all the Actions

```
USAGE
  $ ./bin/run runtime:action:list

OPTIONS
  -i, --insecure           bypass certificate check
  -l, --limit=limit        only return LIMIT number of actions from the collection (default 30)
  -n, --name               sort results by name
  -s, --skip=skip          exclude the first SKIP number of actions from the result
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --json                   output raw json
  --key=key                client key
  --name-sort              sort results by name
  --version                Show version

ALIASES
  $ ./bin/run runtime:action:ls
  $ ./bin/run runtime:actions:list
  $ ./bin/run runtime:actions:ls
  $ ./bin/run rt:action:list
  $ ./bin/run rt:actions:list
  $ ./bin/run rt:action:ls
  $ ./bin/run rt:actions:ls
```

_See code: [src/commands/runtime/action/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/action/list.js)_

## `./bin/run runtime:action:update ACTIONNAME [ACTIONPATH]`

Updates an Action

```
USAGE
  $ ./bin/run runtime:action:update ACTIONNAME [ACTIONPATH]

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            parameter to be passed to the action for json params
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -l, --logsize=logsize                  the maximum log size LIMIT in MB for the action (default 10)
  -m, --memory=memory                    the maximum memory LIMIT in MB for the action (default 256)
  -p, --param=param                      parameter to be passed to the action

  -t, --timeout=timeout                  the timeout LIMIT in milliseconds after which the action is terminated (default
                                         60000)

  -u, --auth=auth                        whisk auth

  -v, --verbose                          Verbose output

  --apihost=apihost                      whisk API host

  --apiversion=apiversion                whisk API version

  --cert=cert                            client cert

  --debug=debug                          Debug level output

  --help                                 Show help

  --json                                 output raw json

  --key=key                              client key

  --kind=kind                            the KIND of the action runtime (example: swift:default, nodejs:default)

  --main=main                            the name of the action entry point (function or fully-qualified method name
                                         when applicable)

  --sequence=sequence                    treat ACTION as comma separated sequence of actions to invoke

  --version                              Show version

  --web=true|yes|false|no|raw            treat ACTION as a web action or as a raw HTTP web action. web = true/yes|raw or
                                         web = false/no

ALIASES
  $ ./bin/run rt:action:update
```

_See code: [src/commands/runtime/action/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/action/update.js)_

## `./bin/run runtime:activation`

Manage your activations

```
USAGE
  $ ./bin/run runtime:activation

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run rt:activation
```

_See code: [src/commands/runtime/activation/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/activation/index.js)_

## `./bin/run runtime:activation:get [ACTIVATIONID]`

Retrieves an Activation

```
USAGE
  $ ./bin/run runtime:activation:get [ACTIVATIONID]

OPTIONS
  -g, --logs               emit only the logs, stripped of time stamps and stream identifier
  -i, --insecure           bypass certificate check
  -l, --last               retrieves the most recent activation
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run rt:activation:get
```

_See code: [src/commands/runtime/activation/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/activation/get.js)_

## `./bin/run runtime:activation:list [ACTIVATIONID]`

Lists all the Activations

```
USAGE
  $ ./bin/run runtime:activation:list [ACTIVATIONID]

OPTIONS
  -f, --full               include full activation description
  -i, --insecure           bypass certificate check

  -l, --limit=limit        only return LIMIT number of activations from the collection with a maximum LIMIT of 200
                           activations (default 30)

  -s, --skip=skip          exclude the first SKIP number of activations from the result

  -u, --auth=auth          whisk auth

  -v, --verbose            Verbose output

  --apihost=apihost        whisk API host

  --apiversion=apiversion  whisk API version

  --cert=cert              client cert

  --debug=debug            Debug level output

  --help                   Show help

  --json                   output raw json

  --key=key                client key

  --since=since            return activations with timestamps later than SINCE; measured in milliseconds since Th, 01,
                           Jan 1970

  --upto=upto              return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01,
                           Jan 1970

  --version                Show version

ALIASES
  $ ./bin/run runtime:activations:list
  $ ./bin/run runtime:activation:ls
  $ ./bin/run runtime:activations:ls
  $ ./bin/run rt:activation:list
  $ ./bin/run rt:activation:ls
  $ ./bin/run rt:activations:list
  $ ./bin/run rt:activations:ls
```

_See code: [src/commands/runtime/activation/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/activation/list.js)_

## `./bin/run runtime:activation:logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ ./bin/run runtime:activation:logs [ACTIVATIONID]

OPTIONS
  -c, --count=count        [default: 1] used with --last, return the last `count` activation logs. Max 5
  -i, --insecure           bypass certificate check
  -l, --last               retrieves the most recent activation logs
  -r, --strip              strip timestamp information and output first line only
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run runtime:activation:log
  $ ./bin/run runtime:log
  $ ./bin/run runtime:logs
  $ ./bin/run rt:activation:logs
  $ ./bin/run rt:activation:log
  $ ./bin/run rt:log
  $ ./bin/run rt:logs
```

_See code: [src/commands/runtime/activation/logs.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/activation/logs.js)_

## `./bin/run runtime:activation:result [ACTIVATIONID]`

Retrieves the Results for an Activation

```
USAGE
  $ ./bin/run runtime:activation:result [ACTIVATIONID]

OPTIONS
  -i, --insecure           bypass certificate check
  -l, --last               retrieves the most recent activation result
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run rt:activation:result
```

_See code: [src/commands/runtime/activation/result.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/activation/result.js)_

## `./bin/run runtime:deploy`

The Runtime Deployment Tool

```
USAGE
  $ ./bin/run runtime:deploy

OPTIONS
  -P, --param-file=param-file  FILE containing parameter values in JSON format
  -d, --deployment=deployment  the path to the deployment file
  -i, --insecure               bypass certificate check
  -m, --manifest=manifest      the manifest file location
  -u, --auth=auth              whisk auth
  -v, --verbose                Verbose output
  --apihost=apihost            whisk API host
  --apiversion=apiversion      whisk API version
  --cert=cert                  client cert
  --debug=debug                Debug level output
  --help                       Show help
  --key=key                    client key
  --param=param                parameter values in KEY VALUE format
  --version                    Show version

ALIASES
  $ ./bin/run rt:deploy
```

_See code: [src/commands/runtime/deploy/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/deploy/index.js)_

## `./bin/run runtime:deploy:export`

Exports managed project assets from Runtime to manifest and function files

```
USAGE
  $ ./bin/run runtime:deploy:export

OPTIONS
  -i, --insecure             bypass certificate check
  -m, --manifest=manifest    (required) the manifest file location
  -u, --auth=auth            whisk auth
  -v, --verbose              Verbose output
  --apihost=apihost          whisk API host
  --apiversion=apiversion    whisk API version
  --cert=cert                client cert
  --debug=debug              Debug level output
  --help                     Show help
  --key=key                  client key
  --projectname=projectname  (required) the name of the project to be undeployed
  --version                  Show version

ALIASES
  $ ./bin/run rt:deploy:export
```

_See code: [src/commands/runtime/deploy/export.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/deploy/export.js)_

## `./bin/run runtime:deploy:report`

Provides a summary report of Runtime assets being deployed/undeployed based on manifest/deployment YAML

```
USAGE
  $ ./bin/run runtime:deploy:report

OPTIONS
  -d, --deployment=deployment  the deployment file location
  -i, --insecure               bypass certificate check
  -m, --manifest=manifest      the manifest file location
  -u, --auth=auth              whisk auth
  -v, --verbose                Verbose output
  --apihost=apihost            whisk API host
  --apiversion=apiversion      whisk API version
  --cert=cert                  client cert
  --debug=debug                Debug level output
  --help                       Show help
  --key=key                    client key
  --version                    Show version

ALIASES
  $ ./bin/run rt:deploy:report
```

_See code: [src/commands/runtime/deploy/report.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/deploy/report.js)_

## `./bin/run runtime:deploy:sync`

A tool to sync deployment and undeployment of Runtime packages using a manifest and optional deployment files using YAML

```
USAGE
  $ ./bin/run runtime:deploy:sync

OPTIONS
  -d, --deployment=deployment  the path to the deployment file
  -i, --insecure               bypass certificate check
  -m, --manifest=manifest      the manifest file location
  -u, --auth=auth              whisk auth
  -v, --verbose                Verbose output
  --apihost=apihost            whisk API host
  --apiversion=apiversion      whisk API version
  --cert=cert                  client cert
  --debug=debug                Debug level output
  --help                       Show help
  --key=key                    client key
  --version                    Show version

ALIASES
  $ ./bin/run rt:deploy:sync
```

_See code: [src/commands/runtime/deploy/sync.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/deploy/sync.js)_

## `./bin/run runtime:deploy:undeploy`

Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML

```
USAGE
  $ ./bin/run runtime:deploy:undeploy

OPTIONS
  -i, --insecure             bypass certificate check
  -m, --manifest=manifest    the manifest file location
  -u, --auth=auth            whisk auth
  -v, --verbose              Verbose output
  --apihost=apihost          whisk API host
  --apiversion=apiversion    whisk API version
  --cert=cert                client cert
  --debug=debug              Debug level output
  --help                     Show help
  --key=key                  client key
  --projectname=projectname  the name of the project to be undeployed
  --version                  Show version

ALIASES
  $ ./bin/run rt:deploy:undeploy
```

_See code: [src/commands/runtime/deploy/undeploy.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/deploy/undeploy.js)_

## `./bin/run runtime:deploy:version`

Prints the version number of aio runtime deploy

```
USAGE
  $ ./bin/run runtime:deploy:version

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run rt:deploy:version
```

_See code: [src/commands/runtime/deploy/version.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/deploy/version.js)_

## `./bin/run runtime:namespace`

Manage your namespaces

```
USAGE
  $ ./bin/run runtime:namespace

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run runtime:ns
  $ ./bin/run rt:namespace
  $ ./bin/run rt:ns
```

_See code: [src/commands/runtime/namespace/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/namespace/index.js)_

## `./bin/run runtime:namespace:get`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ ./bin/run runtime:namespace:get

OPTIONS
  -i, --insecure           bypass certificate check
  -n, --name               sort results by name
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --json                   output raw json
  --key=key                client key
  --name-sort              sort results by name
  --version                Show version

ALIASES
  $ ./bin/run rt:get
  $ ./bin/run runtime:list
  $ ./bin/run rt:list
  $ ./bin/run runtime:ls
  $ ./bin/run rt:ls
```

_See code: [src/commands/runtime/namespace/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/namespace/get.js)_

## `./bin/run runtime:namespace:list`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ ./bin/run runtime:namespace:list

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --json                   output raw json
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run runtime:namespace:ls
  $ ./bin/run runtime:ns:list
  $ ./bin/run runtime:ns:ls
  $ ./bin/run rt:namespace:list
  $ ./bin/run rt:namespace:ls
  $ ./bin/run rt:ns:list
  $ ./bin/run rt:ns:ls
```

_See code: [src/commands/runtime/namespace/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/namespace/list.js)_

## `./bin/run runtime:package`

Manage your packages

```
USAGE
  $ ./bin/run runtime:package

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run runtime:pkg
  $ ./bin/run rt:package
  $ ./bin/run rt:pkg
```

_See code: [src/commands/runtime/package/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/package/index.js)_

## `./bin/run runtime:package:bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
USAGE
  $ ./bin/run runtime:package:bind PACKAGENAME BINDPACKAGENAME

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            parameter to be passed to the package for json file
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -p, --param=param                      parameters in key value pairs to be passed to the package
  -u, --auth=auth                        whisk auth
  -v, --verbose                          Verbose output
  --apihost=apihost                      whisk API host
  --apiversion=apiversion                whisk API version
  --cert=cert                            client cert
  --debug=debug                          Debug level output
  --help                                 Show help
  --json                                 output raw json
  --key=key                              client key
  --version                              Show version

ALIASES
  $ ./bin/run runtime:pkg:bind
  $ ./bin/run rt:package:bind
  $ ./bin/run rt:pkg:bind
```

_See code: [src/commands/runtime/package/bind.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/package/bind.js)_

## `./bin/run runtime:package:create PACKAGENAME`

Creates a Package

```
USAGE
  $ ./bin/run runtime:package:create PACKAGENAME

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            parameter to be passed to the package for json file
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -p, --param=param                      parameters in key value pairs to be passed to the package
  -u, --auth=auth                        whisk auth
  -v, --verbose                          Verbose output
  --apihost=apihost                      whisk API host
  --apiversion=apiversion                whisk API version
  --cert=cert                            client cert
  --debug=debug                          Debug level output
  --help                                 Show help
  --json                                 output raw json
  --key=key                              client key
  --shared=true|yes|false|no             parameter to be passed to indicate whether package is shared or private
  --version                              Show version

ALIASES
  $ ./bin/run runtime:pkg:create
  $ ./bin/run rt:package:create
  $ ./bin/run rt:pkg:create
```

_See code: [src/commands/runtime/package/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/package/create.js)_

## `./bin/run runtime:package:delete PACKAGENAME`

Deletes a Package

```
USAGE
  $ ./bin/run runtime:package:delete PACKAGENAME

OPTIONS
  --json  output raw json

ALIASES
  $ ./bin/run runtime:pkg:delete
  $ ./bin/run rt:package:delete
  $ ./bin/run rt:pkg:delete
```

_See code: [src/commands/runtime/package/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/package/delete.js)_

## `./bin/run runtime:package:get PACKAGENAME`

Retrieves a Package

```
USAGE
  $ ./bin/run runtime:package:get PACKAGENAME

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version

ALIASES
  $ ./bin/run runtime:pkg:get
  $ ./bin/run rt:package:get
  $ ./bin/run rt:pkg:get
```

_See code: [src/commands/runtime/package/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/package/get.js)_

## `./bin/run runtime:package:list [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ ./bin/run runtime:package:list [NAMESPACE]

OPTIONS
  -i, --insecure           bypass certificate check
  -l, --limit=limit        only return LIMIT number of packages from the collection (default 30)
  -n, --name               sort results by name
  -s, --skip=skip          exclude the first SKIP number of packages from the result
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --json                   output raw json
  --key=key                client key
  --name-sort              sort results by name
  --version                Show version

ALIASES
  $ ./bin/run runtime:package:ls
  $ ./bin/run runtime:pkg:list
  $ ./bin/run runtime:pkg:ls
  $ ./bin/run rt:package:list
  $ ./bin/run rt:package:ls
  $ ./bin/run rt:pkg:list
  $ ./bin/run rt:pkg:ls
```

_See code: [src/commands/runtime/package/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/package/list.js)_

## `./bin/run runtime:package:update PACKAGENAME`

Updates a Package

```
USAGE
  $ ./bin/run runtime:package:update PACKAGENAME

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -p, --param=param                      parameter values in KEY VALUE format
  -u, --auth=auth                        whisk auth
  -v, --verbose                          Verbose output
  --apihost=apihost                      whisk API host
  --apiversion=apiversion                whisk API version
  --cert=cert                            client cert
  --debug=debug                          Debug level output
  --help                                 Show help
  --json                                 output raw json
  --key=key                              client key
  --shared=true|yes|false|no             parameter to be passed to indicate whether package is shared or private
  --version                              Show version

ALIASES
  $ ./bin/run runtime:pkg:update
  $ ./bin/run rt:package:update
  $ ./bin/run rt:pkg:update
```

_See code: [src/commands/runtime/package/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/package/update.js)_

## `./bin/run runtime:property`

Execute property commands

```
USAGE
  $ ./bin/run runtime:property

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run runtime:prop
  $ ./bin/run rt:prop
```

_See code: [src/commands/runtime/property/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/property/index.js)_

## `./bin/run runtime:property:get`

get property

```
USAGE
  $ ./bin/run runtime:property:get

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --all           all properties
  --apibuild      whisk API build version
  --apibuildno    whisk API build number
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --cliversion    whisk CLI version
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --namespace     whisk namespace
  --version       Show version

ALIASES
  $ ./bin/run runtime:prop:get
  $ ./bin/run rt:property:get
  $ ./bin/run rt:prop:get
```

_See code: [src/commands/runtime/property/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/property/get.js)_

## `./bin/run runtime:property:set`

set property

```
USAGE
  $ ./bin/run runtime:property:set

OPTIONS
  -i, --insecure         bypass certificate check
  -u, --auth             whisk auth
  -v, --verbose          Verbose output
  --apihost              whisk API host
  --apiversion           whisk API version
  --cert                 client cert
  --debug=debug          Debug level output
  --help                 Show help
  --key                  client key
  --namespace=namespace  whisk namespace
  --version              Show version

ALIASES
  $ ./bin/run runtime:prop:set
  $ ./bin/run rt:property:set
  $ ./bin/run rt:prop:set
```

_See code: [src/commands/runtime/property/set.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/property/set.js)_

## `./bin/run runtime:property:unset`

unset property

```
USAGE
  $ ./bin/run runtime:property:unset

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --namespace     whisk namespace
  --version       Show version

ALIASES
  $ ./bin/run runtime:prop:unset
  $ ./bin/run rt:property:unset
  $ ./bin/run rt:prop:unset
```

_See code: [src/commands/runtime/property/unset.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/property/unset.js)_

## `./bin/run runtime:route`

Manage your routes

```
USAGE
  $ ./bin/run runtime:route

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run runtime:api
  $ ./bin/run rt:api
```

_See code: [src/commands/runtime/route/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/route/index.js)_

## `./bin/run runtime:route:create BASEPATH RELPATH APIVERB ACTION`

create a new api route

```
USAGE
  $ ./bin/run runtime:route:create BASEPATH RELPATH APIVERB ACTION

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb
  ACTION    The action to call

OPTIONS
  -i, --insecure                                    bypass certificate check

  -n, --apiname=apiname                             Friendly name of the API; ignored when CFG_FILE is specified
                                                    (default BASE_PATH)

  -r, --response-type=html|http|json|text|svg|json  [default: json] Set the web action response TYPE.

  -u, --auth                                        whisk auth

  -v, --verbose                                     Verbose output

  --apihost                                         whisk API host

  --apiversion                                      whisk API version

  --cert                                            client cert

  --debug=debug                                     Debug level output

  --help                                            Show help

  --key                                             client key

  --version                                         Show version

ALIASES
  $ ./bin/run runtime:api:create
  $ ./bin/run rt:route:create
  $ ./bin/run rt:api:create
```

_See code: [src/commands/runtime/route/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/route/create.js)_

## `./bin/run runtime:route:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
USAGE
  $ ./bin/run runtime:route:delete BASEPATHORAPINAME [RELPATH] [APIVERB]

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name
  RELPATH            The path of the api relative to the base path
  APIVERB            (get|post|put|patch|delete|head|options) The http verb

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run runtime:api:delete
  $ ./bin/run rt:route:delete
  $ ./bin/run rt:api:delete
```

_See code: [src/commands/runtime/route/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/route/delete.js)_

## `./bin/run runtime:route:get BASEPATHORAPINAME`

get API details

```
USAGE
  $ ./bin/run runtime:route:get BASEPATHORAPINAME

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run runtime:api:get
  $ ./bin/run rt:route:get
  $ ./bin/run rt:api:get
```

_See code: [src/commands/runtime/route/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/route/get.js)_

## `./bin/run runtime:route:list [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ ./bin/run runtime:route:list [BASEPATH] [RELPATH] [APIVERB]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

OPTIONS
  -i, --insecure     bypass certificate check
  -l, --limit=limit  [default: 30] only return LIMIT number of triggers from the collection (default 30)
  -s, --skip=skip    exclude the first SKIP number of triggers from the result
  -u, --auth         whisk auth
  -v, --verbose      Verbose output
  --apihost          whisk API host
  --apiversion       whisk API version
  --cert             client cert
  --debug=debug      Debug level output
  --help             Show help
  --json             output raw json
  --key              client key
  --version          Show version

ALIASES
  $ ./bin/run runtime:route:ls
  $ ./bin/run runtime:api:list
  $ ./bin/run runtime:api:ls
  $ ./bin/run rt:route:list
  $ ./bin/run rt:route:ls
  $ ./bin/run rt:api:list
  $ ./bin/run rt:api:ls
```

_See code: [src/commands/runtime/route/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/route/list.js)_

## `./bin/run runtime:rule`

Manage your rules

```
USAGE
  $ ./bin/run runtime:rule

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:rule
```

_See code: [src/commands/runtime/rule/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/rule/index.js)_

## `./bin/run runtime:rule:create NAME TRIGGER ACTION`

Create a Rule

```
USAGE
  $ ./bin/run runtime:rule:create NAME TRIGGER ACTION

ARGUMENTS
  NAME     Name of the rule
  TRIGGER  Name of the trigger
  ACTION   Name of the action

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --json          output raw json
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:rule:create
```

_See code: [src/commands/runtime/rule/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/rule/create.js)_

## `./bin/run runtime:rule:delete NAME`

Delete a Rule

```
USAGE
  $ ./bin/run runtime:rule:delete NAME

ARGUMENTS
  NAME  Name of the rule

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:rule:delete
```

_See code: [src/commands/runtime/rule/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/rule/delete.js)_

## `./bin/run runtime:rule:disable NAME`

Disable a Rule

```
USAGE
  $ ./bin/run runtime:rule:disable NAME

ARGUMENTS
  NAME  Name of the rule

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:rule:disable
```

_See code: [src/commands/runtime/rule/disable.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/rule/disable.js)_

## `./bin/run runtime:rule:enable NAME`

Enable a Rule

```
USAGE
  $ ./bin/run runtime:rule:enable NAME

ARGUMENTS
  NAME  Name of the rule

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:rule:enable
```

_See code: [src/commands/runtime/rule/enable.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/rule/enable.js)_

## `./bin/run runtime:rule:get NAME`

Retrieves a Rule

```
USAGE
  $ ./bin/run runtime:rule:get NAME

ARGUMENTS
  NAME  Name of the rule

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:rule:get
```

_See code: [src/commands/runtime/rule/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/rule/get.js)_

## `./bin/run runtime:rule:list`

Retrieves a list of Rules

```
USAGE
  $ ./bin/run runtime:rule:list

OPTIONS
  -i, --insecure     bypass certificate check
  -l, --limit=limit  [default: 30] Limit number of rules returned. Default 30
  -n, --name         sort results by name
  -s, --skip=skip    Skip number of rules returned
  -u, --auth         whisk auth
  -v, --verbose      Verbose output
  --apihost          whisk API host
  --apiversion       whisk API version
  --cert             client cert
  --debug=debug      Debug level output
  --help             Show help
  --json             output raw json
  --key              client key
  --name-sort        sort results by name
  --version          Show version

ALIASES
  $ ./bin/run runtime:rule:ls
  $ ./bin/run rt:rule:list
  $ ./bin/run rt:rule:ls
```

_See code: [src/commands/runtime/rule/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/rule/list.js)_

## `./bin/run runtime:rule:status NAME`

Gets the status of a rule

```
USAGE
  $ ./bin/run runtime:rule:status NAME

ARGUMENTS
  NAME  Name of the rule

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:rule:status
```

_See code: [src/commands/runtime/rule/status.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/rule/status.js)_

## `./bin/run runtime:rule:update NAME TRIGGER ACTION`

Update a Rule

```
USAGE
  $ ./bin/run runtime:rule:update NAME TRIGGER ACTION

ARGUMENTS
  NAME     Name of the rule
  TRIGGER  Name of the trigger
  ACTION   Name of the action

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --json          output raw json
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:rule:update
```

_See code: [src/commands/runtime/rule/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/rule/update.js)_

## `./bin/run runtime:trigger`

Manage your triggers

```
USAGE
  $ ./bin/run runtime:trigger

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:trigger
```

_See code: [src/commands/runtime/trigger/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/trigger/index.js)_

## `./bin/run runtime:trigger:create TRIGGERNAME`

Create a trigger for Adobe I/O Runtime

```
USAGE
  $ ./bin/run runtime:trigger:create TRIGGERNAME

ARGUMENTS
  TRIGGERNAME  The name of the trigger

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -p, --param=param                      parameter values in KEY VALUE format
  -u, --auth                             whisk auth
  -v, --verbose                          Verbose output
  --apihost                              whisk API host
  --apiversion                           whisk API version
  --cert                                 client cert
  --debug=debug                          Debug level output
  --help                                 Show help
  --key                                  client key
  --version                              Show version

ALIASES
  $ ./bin/run rt:trigger:create
```

_See code: [src/commands/runtime/trigger/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/trigger/create.js)_

## `./bin/run runtime:trigger:delete TRIGGERPATH`

Get a trigger for Adobe I/O Runtime

```
USAGE
  $ ./bin/run runtime:trigger:delete TRIGGERPATH

ARGUMENTS
  TRIGGERPATH  The name of the trigger, in the format /NAMESPACE/NAME

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:trigger:delete
```

_See code: [src/commands/runtime/trigger/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/trigger/delete.js)_

## `./bin/run runtime:trigger:fire TRIGGERNAME`

Fire a trigger for Adobe I/O Runtime

```
USAGE
  $ ./bin/run runtime:trigger:fire TRIGGERNAME

ARGUMENTS
  TRIGGERNAME  The name of the trigger

OPTIONS
  -P, --param-file=param-file  FILE containing parameter values in JSON format
  -i, --insecure               bypass certificate check
  -p, --param=param            parameter values in KEY VALUE format
  -u, --auth                   whisk auth
  -v, --verbose                Verbose output
  --apihost                    whisk API host
  --apiversion                 whisk API version
  --cert                       client cert
  --debug=debug                Debug level output
  --help                       Show help
  --key                        client key
  --version                    Show version

ALIASES
  $ ./bin/run rt:trigger:fire
```

_See code: [src/commands/runtime/trigger/fire.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/trigger/fire.js)_

## `./bin/run runtime:trigger:get TRIGGERPATH`

Get a trigger for Adobe I/O Runtime

```
USAGE
  $ ./bin/run runtime:trigger:get TRIGGERPATH

ARGUMENTS
  TRIGGERPATH  The name/path of the trigger, in the format /NAMESPACE/NAME

OPTIONS
  -i, --insecure  bypass certificate check
  -u, --auth      whisk auth
  -v, --verbose   Verbose output
  --apihost       whisk API host
  --apiversion    whisk API version
  --cert          client cert
  --debug=debug   Debug level output
  --help          Show help
  --key           client key
  --version       Show version

ALIASES
  $ ./bin/run rt:trigger:get
```

_See code: [src/commands/runtime/trigger/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/trigger/get.js)_

## `./bin/run runtime:trigger:list`

Lists all of your triggers for Adobe I/O Runtime

```
USAGE
  $ ./bin/run runtime:trigger:list

OPTIONS
  -i, --insecure     bypass certificate check
  -l, --limit=limit  [default: 30] only return LIMIT number of triggers from the collection (default 30)
  -n, --name         sort results by name
  -s, --skip=skip    exclude the first SKIP number of triggers from the result
  -u, --auth         whisk auth
  -v, --verbose      Verbose output
  --apihost          whisk API host
  --apiversion       whisk API version
  --cert             client cert
  --debug=debug      Debug level output
  --help             Show help
  --json             output raw json
  --key              client key
  --name-sort        sort results by name
  --version          Show version

ALIASES
  $ ./bin/run runtime:trigger:ls
  $ ./bin/run rt:trigger:list
  $ ./bin/run rt:trigger:ls
```

_See code: [src/commands/runtime/trigger/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/trigger/list.js)_

## `./bin/run runtime:trigger:update TRIGGERNAME`

Update or create a trigger for Adobe I/O Runtime

```
USAGE
  $ ./bin/run runtime:trigger:update TRIGGERNAME

ARGUMENTS
  TRIGGERNAME  The name of the trigger

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -p, --param=param                      parameter values in KEY VALUE format
  -u, --auth                             whisk auth
  -v, --verbose                          Verbose output
  --apihost                              whisk API host
  --apiversion                           whisk API version
  --cert                                 client cert
  --debug=debug                          Debug level output
  --help                                 Show help
  --key                                  client key
  --version                              Show version

ALIASES
  $ ./bin/run rt:trigger:update
```

_See code: [src/commands/runtime/trigger/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/v1.2.0/src/commands/runtime/trigger/update.js)_
<!-- commandsstop -->



### Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
