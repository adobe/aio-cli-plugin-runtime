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
![Node.js CI](https://github.com/adobe/aio-cli-plugin-app/workflows/Node.js%20CI/badge.svg)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-cli-plugin-runtime/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-cli-plugin-runtime/) 

# aio-cli-plugin-runtime

Adobe I/O Runtime plugin for the Adobe I/O CLI

---


<!-- toc -->
* [aio-cli-plugin-runtime](#aio-cli-plugin-runtime)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
```sh-session
$ aio plugins:install @adobe/aio-cli-plugin-runtime
$ # OR
$ aio discover -i
$ aio runtime --help
```

# Commands
<!-- commands -->
* [`aio runtime`](#aio-runtime)
* [`aio runtime:action`](#aio-runtimeaction)
* [`aio runtime:action:create ACTIONNAME [ACTIONPATH]`](#aio-runtimeactioncreate-actionname-actionpath)
* [`aio runtime:action:delete ACTIONNAME`](#aio-runtimeactiondelete-actionname)
* [`aio runtime:action:get ACTIONNAME`](#aio-runtimeactionget-actionname)
* [`aio runtime:action:invoke ACTIONNAME`](#aio-runtimeactioninvoke-actionname)
* [`aio runtime:action:list [PACKAGENAME]`](#aio-runtimeactionlist-packagename)
* [`aio runtime:action:update ACTIONNAME [ACTIONPATH]`](#aio-runtimeactionupdate-actionname-actionpath)
* [`aio runtime:activation`](#aio-runtimeactivation)
* [`aio runtime:activation:get [ACTIVATIONID]`](#aio-runtimeactivationget-activationid)
* [`aio runtime:activation:list [ACTIVATION_NAME]`](#aio-runtimeactivationlist-activation_name)
* [`aio runtime:activation:logs [ACTIVATIONID]`](#aio-runtimeactivationlogs-activationid)
* [`aio runtime:activation:result [ACTIVATIONID]`](#aio-runtimeactivationresult-activationid)
* [`aio runtime:deploy`](#aio-runtimedeploy)
* [`aio runtime:deploy:export`](#aio-runtimedeployexport)
* [`aio runtime:deploy:report`](#aio-runtimedeployreport)
* [`aio runtime:deploy:sync`](#aio-runtimedeploysync)
* [`aio runtime:deploy:undeploy`](#aio-runtimedeployundeploy)
* [`aio runtime:deploy:version`](#aio-runtimedeployversion)
* [`aio runtime:namespace`](#aio-runtimenamespace)
* [`aio runtime:namespace:get`](#aio-runtimenamespaceget)
* [`aio runtime:namespace:list`](#aio-runtimenamespacelist)
* [`aio runtime:namespace:log-forwarding`](#aio-runtimenamespacelog-forwarding)
* [`aio runtime:namespace:log-forwarding:errors`](#aio-runtimenamespacelog-forwardingerrors)
* [`aio runtime:namespace:log-forwarding:get`](#aio-runtimenamespacelog-forwardingget)
* [`aio runtime:namespace:log-forwarding:set`](#aio-runtimenamespacelog-forwardingset)
* [`aio runtime:namespace:log-forwarding:set:adobe-io-runtime`](#aio-runtimenamespacelog-forwardingsetadobe-io-runtime)
* [`aio runtime:namespace:log-forwarding:set:azure-log-analytics`](#aio-runtimenamespacelog-forwardingsetazure-log-analytics)
* [`aio runtime:namespace:log-forwarding:set:splunk-hec`](#aio-runtimenamespacelog-forwardingsetsplunk-hec)
* [`aio runtime:package`](#aio-runtimepackage)
* [`aio runtime:package:bind PACKAGENAME BINDPACKAGENAME`](#aio-runtimepackagebind-packagename-bindpackagename)
* [`aio runtime:package:create PACKAGENAME`](#aio-runtimepackagecreate-packagename)
* [`aio runtime:package:delete PACKAGENAME`](#aio-runtimepackagedelete-packagename)
* [`aio runtime:package:get PACKAGENAME`](#aio-runtimepackageget-packagename)
* [`aio runtime:package:list [NAMESPACE]`](#aio-runtimepackagelist-namespace)
* [`aio runtime:package:update PACKAGENAME`](#aio-runtimepackageupdate-packagename)
* [`aio runtime:property`](#aio-runtimeproperty)
* [`aio runtime:property:get`](#aio-runtimepropertyget)
* [`aio runtime:property:set`](#aio-runtimepropertyset)
* [`aio runtime:property:unset`](#aio-runtimepropertyunset)
* [`aio runtime:route`](#aio-runtimeroute)
* [`aio runtime:route:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`](#aio-runtimeroutecreate-basepath-relpath-apiverb-action)
* [`aio runtime:route:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#aio-runtimeroutedelete-basepathorapiname-relpath-apiverb)
* [`aio runtime:route:get BASEPATHORAPINAME`](#aio-runtimerouteget-basepathorapiname)
* [`aio runtime:route:list [BASEPATH] [RELPATH] [APIVERB]`](#aio-runtimeroutelist-basepath-relpath-apiverb)
* [`aio runtime:rule`](#aio-runtimerule)
* [`aio runtime:rule:create NAME TRIGGER ACTION`](#aio-runtimerulecreate-name-trigger-action)
* [`aio runtime:rule:delete NAME`](#aio-runtimeruledelete-name)
* [`aio runtime:rule:disable NAME`](#aio-runtimeruledisable-name)
* [`aio runtime:rule:enable NAME`](#aio-runtimeruleenable-name)
* [`aio runtime:rule:get NAME`](#aio-runtimeruleget-name)
* [`aio runtime:rule:list`](#aio-runtimerulelist)
* [`aio runtime:rule:status NAME`](#aio-runtimerulestatus-name)
* [`aio runtime:rule:update NAME TRIGGER ACTION`](#aio-runtimeruleupdate-name-trigger-action)
* [`aio runtime:trigger`](#aio-runtimetrigger)
* [`aio runtime:trigger:create TRIGGERNAME`](#aio-runtimetriggercreate-triggername)
* [`aio runtime:trigger:delete TRIGGERPATH`](#aio-runtimetriggerdelete-triggerpath)
* [`aio runtime:trigger:fire TRIGGERNAME`](#aio-runtimetriggerfire-triggername)
* [`aio runtime:trigger:get TRIGGERPATH`](#aio-runtimetriggerget-triggerpath)
* [`aio runtime:trigger:list`](#aio-runtimetriggerlist)
* [`aio runtime:trigger:update TRIGGERNAME`](#aio-runtimetriggerupdate-triggername)

## `aio runtime`

Execute runtime commands

```
Execute runtime commands

USAGE
  $ aio runtime

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
  $ aio rt
```

_See code: [src/commands/runtime/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/index.js)_

## `aio runtime:action`

Manage your actions

```
Manage your actions

USAGE
  $ aio runtime:action

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
  $ aio rt:action
```

_See code: [src/commands/runtime/action/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/action/index.js)_

## `aio runtime:action:create ACTIONNAME [ACTIONPATH]`

Creates an Action

```
Creates an Action

USAGE
  $ aio runtime:action:create ACTIONNAME [ACTIONPATH]

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -E, --env-file=env-file                FILE containing environment variables in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -e, --env=env                          environment values in KEY VALUE format
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

  --binary                               treat code artifact as binary

  --cert=cert                            client cert

  --debug=debug                          Debug level output

  --docker=docker                        [Restricted Access] use provided Docker image (a path on DockerHub) to run the
                                         action

  --help                                 Show help

  --json                                 output raw json

  --key=key                              client key

  --kind=kind                            the KIND of the action runtime (example: swift:default, nodejs:default)

  --main=main                            the name of the action entry point (function or fully-qualified method name
                                         when applicable)

  --sequence=sequence                    treat ACTION as comma separated sequence of actions to invoke

  --version                              Show version

  --web=true|yes|false|no|raw            treat ACTION as a web action or as a raw HTTP web action

  --web-secure=web-secure                secure the web action (valid values are true, false, or any string)

ALIASES
  $ aio rt:action:create
```

_See code: [src/commands/runtime/action/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/action/create.js)_

## `aio runtime:action:delete ACTIONNAME`

Deletes an Action

```
Deletes an Action

USAGE
  $ aio runtime:action:delete ACTIONNAME

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
  $ aio runtime:action:del
  $ aio rt:action:delete
  $ aio rt:action:del
```

_See code: [src/commands/runtime/action/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/action/delete.js)_

## `aio runtime:action:get ACTIONNAME`

Retrieves an Action

```
Retrieves an Action

USAGE
  $ aio runtime:action:get ACTIONNAME

OPTIONS
  -c, --code               show action code (only works if code is not a zip file)
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
  $ aio rt:action:get
```

_See code: [src/commands/runtime/action/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/action/get.js)_

## `aio runtime:action:invoke ACTIONNAME`

Invokes an Action

```
Invokes an Action

USAGE
  $ aio runtime:action:invoke ACTIONNAME

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
  $ aio rt:action:invoke
```

_See code: [src/commands/runtime/action/invoke.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/action/invoke.js)_

## `aio runtime:action:list [PACKAGENAME]`

Lists all the Actions

```
Lists all the Actions

USAGE
  $ aio runtime:action:list [PACKAGENAME]

OPTIONS
  -c, --count              show only the total number of actions
  -i, --insecure           bypass certificate check
  -l, --limit=limit        only return LIMIT number of actions
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
  $ aio runtime:action:ls
  $ aio runtime:actions:list
  $ aio runtime:actions:ls
  $ aio rt:action:list
  $ aio rt:actions:list
  $ aio rt:action:ls
  $ aio rt:actions:ls
```

_See code: [src/commands/runtime/action/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/action/list.js)_

## `aio runtime:action:update ACTIONNAME [ACTIONPATH]`

Updates an Action

```
Updates an Action

USAGE
  $ aio runtime:action:update ACTIONNAME [ACTIONPATH]

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -E, --env-file=env-file                FILE containing environment variables in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -e, --env=env                          environment values in KEY VALUE format
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

  --binary                               treat code artifact as binary

  --cert=cert                            client cert

  --debug=debug                          Debug level output

  --docker=docker                        [Restricted Access] use provided Docker image (a path on DockerHub) to run the
                                         action

  --help                                 Show help

  --json                                 output raw json

  --key=key                              client key

  --kind=kind                            the KIND of the action runtime (example: swift:default, nodejs:default)

  --main=main                            the name of the action entry point (function or fully-qualified method name
                                         when applicable)

  --sequence=sequence                    treat ACTION as comma separated sequence of actions to invoke

  --version                              Show version

  --web=true|yes|false|no|raw            treat ACTION as a web action or as a raw HTTP web action

  --web-secure=web-secure                secure the web action (valid values are true, false, or any string)

ALIASES
  $ aio rt:action:update
```

_See code: [src/commands/runtime/action/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/action/update.js)_

## `aio runtime:activation`

Manage your activations

```
Manage your activations

USAGE
  $ aio runtime:activation

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
  $ aio rt:activation
```

_See code: [src/commands/runtime/activation/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/activation/index.js)_

## `aio runtime:activation:get [ACTIVATIONID]`

Retrieves an Activation

```
Retrieves an Activation

USAGE
  $ aio runtime:activation:get [ACTIVATIONID]

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
  $ aio rt:activation:get
```

_See code: [src/commands/runtime/activation/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/activation/get.js)_

## `aio runtime:activation:list [ACTIVATION_NAME]`

Lists all the Activations

```
Lists all the Activations

USAGE
  $ aio runtime:activation:list [ACTIVATION_NAME]

OPTIONS
  -c, --count              show only the total number of activations
  -f, --full               include full activation description
  -i, --insecure           bypass certificate check
  -l, --limit=limit        only return LIMIT number of activations
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
  $ aio runtime:activations:list
  $ aio runtime:activation:ls
  $ aio runtime:activations:ls
  $ aio rt:activation:list
  $ aio rt:activation:ls
  $ aio rt:activations:list
  $ aio rt:activations:ls
```

_See code: [src/commands/runtime/activation/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/activation/list.js)_

## `aio runtime:activation:logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
Retrieves the Logs for an Activation

USAGE
  $ aio runtime:activation:logs [ACTIVATIONID]

OPTIONS
  -a, --action=action      Fetch logs for a specific action
  -d, --deployed           Fetch logs for all actions deployed under a specific package
  -i, --insecure           bypass certificate check
  -l, --last               retrieves the most recent activation logs
  -m, --manifest           Fetch logs for all actions in the manifest
  -o, --poll               Fetch logs continuously
  -p, --package=package    Fetch logs for a specific package in the manifest
  -r, --strip              strip timestamp information and output first line only
  -t, --tail               Fetch logs continuously
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  -w, --watch              Fetch logs continuously
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --limit=limit            return logs only from last LIMIT number of activations
  --version                Show version

ALIASES
  $ aio runtime:activation:log
  $ aio runtime:log
  $ aio runtime:logs
  $ aio rt:activation:logs
  $ aio rt:activation:log
  $ aio rt:log
  $ aio rt:logs
```

_See code: [src/commands/runtime/activation/logs.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/activation/logs.js)_

## `aio runtime:activation:result [ACTIVATIONID]`

Retrieves the Results for an Activation

```
Retrieves the Results for an Activation

USAGE
  $ aio runtime:activation:result [ACTIVATIONID]

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
  $ aio rt:activation:result
```

_See code: [src/commands/runtime/activation/result.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/activation/result.js)_

## `aio runtime:deploy`

The Runtime Deployment Tool

```
The Runtime Deployment Tool

USAGE
  $ aio runtime:deploy

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
  $ aio rt:deploy
```

_See code: [src/commands/runtime/deploy/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/deploy/index.js)_

## `aio runtime:deploy:export`

Exports managed project assets from Runtime to manifest and function files

```
Exports managed project assets from Runtime to manifest and function files

USAGE
  $ aio runtime:deploy:export

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
  $ aio rt:deploy:export
```

_See code: [src/commands/runtime/deploy/export.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/deploy/export.js)_

## `aio runtime:deploy:report`

Provides a summary report of Runtime assets being deployed/undeployed based on manifest/deployment YAML

```
Provides a summary report of Runtime assets being deployed/undeployed based on manifest/deployment YAML

USAGE
  $ aio runtime:deploy:report

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
  $ aio rt:deploy:report
```

_See code: [src/commands/runtime/deploy/report.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/deploy/report.js)_

## `aio runtime:deploy:sync`

A tool to sync deployment and undeployment of Runtime packages using a manifest and optional deployment files using YAML

```
A tool to sync deployment and undeployment of Runtime packages using a manifest and optional deployment files using YAML

USAGE
  $ aio runtime:deploy:sync

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
  $ aio rt:deploy:sync
```

_See code: [src/commands/runtime/deploy/sync.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/deploy/sync.js)_

## `aio runtime:deploy:undeploy`

Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML

```
Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML

USAGE
  $ aio runtime:deploy:undeploy

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
  $ aio rt:deploy:undeploy
```

_See code: [src/commands/runtime/deploy/undeploy.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/deploy/undeploy.js)_

## `aio runtime:deploy:version`

Prints the version number of aio runtime deploy

```
Prints the version number of aio runtime deploy

USAGE
  $ aio runtime:deploy:version

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
  $ aio rt:deploy:version
```

_See code: [src/commands/runtime/deploy/version.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/deploy/version.js)_

## `aio runtime:namespace`

Manage your namespaces

```
Manage your namespaces

USAGE
  $ aio runtime:namespace

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
  $ aio runtime:ns
  $ aio rt:namespace
  $ aio rt:ns
```

_See code: [src/commands/runtime/namespace/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/namespace/index.js)_

## `aio runtime:namespace:get`

Get triggers, actions, and rules in the registry for namespace

```
Get triggers, actions, and rules in the registry for namespace

USAGE
  $ aio runtime:namespace:get

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
  $ aio rt:get
  $ aio runtime:list
  $ aio rt:list
  $ aio runtime:ls
  $ aio rt:ls
```

_See code: [src/commands/runtime/namespace/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/namespace/get.js)_

## `aio runtime:namespace:list`

Lists all of your namespaces for Adobe I/O Runtime

```
Lists all of your namespaces for Adobe I/O Runtime

USAGE
  $ aio runtime:namespace:list

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
  $ aio runtime:namespace:ls
  $ aio runtime:ns:list
  $ aio runtime:ns:ls
  $ aio rt:namespace:list
  $ aio rt:namespace:ls
  $ aio rt:ns:list
  $ aio rt:ns:ls
```

_See code: [src/commands/runtime/namespace/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/namespace/list.js)_

## `aio runtime:namespace:log-forwarding`

Manage log forwarding settings

```
Manage log forwarding settings

USAGE
  $ aio runtime:namespace:log-forwarding

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
  $ aio runtime:ns:log-forwarding
  $ aio runtime:ns:lf
  $ aio runtime:namespace:lf
  $ aio rt:namespace:log-forwarding
  $ aio rt:namespace:lf
  $ aio rt:ns:log-forwarding
  $ aio rt:ns:lf
```

_See code: [src/commands/runtime/namespace/log-forwarding/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/namespace/log-forwarding/index.js)_

## `aio runtime:namespace:log-forwarding:errors`

Get log forwarding errors

```
Get log forwarding errors

USAGE
  $ aio runtime:namespace:log-forwarding:errors

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
  $ aio runtime:ns:log-forwarding:errors
  $ aio runtime:ns:lf:errors
  $ aio runtime:namespace:lf:errors
  $ aio rt:namespace:log-forwarding:errors
  $ aio rt:namespace:lf:errors
  $ aio rt:ns:log-forwarding:errors
  $ aio rt:ns:lf:errors
```

_See code: [src/commands/runtime/namespace/log-forwarding/errors.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/namespace/log-forwarding/errors.js)_

## `aio runtime:namespace:log-forwarding:get`

Get log forwarding destination configuration

```
Get log forwarding destination configuration

USAGE
  $ aio runtime:namespace:log-forwarding:get

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
  $ aio runtime:ns:log-forwarding:get
  $ aio runtime:ns:lf:get
  $ aio runtime:namespace:lf:get
  $ aio rt:namespace:log-forwarding:get
  $ aio rt:namespace:lf:get
  $ aio rt:ns:log-forwarding:get
  $ aio rt:ns:lf:get
```

_See code: [src/commands/runtime/namespace/log-forwarding/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/namespace/log-forwarding/get.js)_

## `aio runtime:namespace:log-forwarding:set`

Configure log forwarding destination (interactive)

```
Configure log forwarding destination (interactive)

USAGE
  $ aio runtime:namespace:log-forwarding:set

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
  $ aio runtime:ns:log-forwarding:set
  $ aio runtime:ns:lf:set
  $ aio runtime:namespace:lf:set
  $ aio rt:namespace:log-forwarding:set
  $ aio rt:namespace:lf:set
  $ aio rt:ns:log-forwarding:set
  $ aio rt:ns:lf:set
```

_See code: [src/commands/runtime/namespace/log-forwarding/set.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/namespace/log-forwarding/set.js)_

## `aio runtime:namespace:log-forwarding:set:adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

USAGE
  $ aio runtime:namespace:log-forwarding:set:adobe-io-runtime

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
  $ aio runtime:ns:log-forwarding:set:adobe-io-runtime
  $ aio runtime:ns:lf:set:adobe-io-runtime
  $ aio runtime:namespace:lf:set:adobe-io-runtime
  $ aio rt:namespace:log-forwarding:set:adobe-io-runtime
  $ aio rt:namespace:lf:set:adobe-io-runtime
  $ aio rt:ns:log-forwarding:set:adobe-io-runtime
  $ aio rt:ns:lf:set:adobe-io-runtime
```

_See code: [src/commands/runtime/namespace/log-forwarding/set/adobe-io-runtime.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/namespace/log-forwarding/set/adobe-io-runtime.js)_

## `aio runtime:namespace:log-forwarding:set:azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
Set log forwarding destination to Azure Log Analytics

USAGE
  $ aio runtime:namespace:log-forwarding:set:azure-log-analytics

OPTIONS
  -i, --insecure             bypass certificate check
  -u, --auth                 whisk auth
  -v, --verbose              Verbose output
  --apihost                  whisk API host
  --apiversion               whisk API version
  --cert                     client cert
  --customer-id=customer-id  (required) Customer ID
  --debug=debug              Debug level output
  --help                     Show help
  --key                      client key
  --log-type=log-type        (required) Log type
  --shared-key=shared-key    (required) Shared key
  --version                  Show version

ALIASES
  $ aio runtime:ns:log-forwarding:set:azure-log-analytics
  $ aio runtime:ns:lf:set:azure-log-analytics
  $ aio runtime:namespace:lf:set:azure-log-analytics
  $ aio rt:namespace:log-forwarding:set:azure-log-analytics
  $ aio rt:namespace:lf:set:azure-log-analytics
  $ aio rt:ns:log-forwarding:set:azure-log-analytics
  $ aio rt:ns:lf:set:azure-log-analytics
```

_See code: [src/commands/runtime/namespace/log-forwarding/set/azure-log-analytics.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/namespace/log-forwarding/set/azure-log-analytics.js)_

## `aio runtime:namespace:log-forwarding:set:splunk-hec`

Set log forwarding destination to Splunk HEC

```
Set log forwarding destination to Splunk HEC

USAGE
  $ aio runtime:namespace:log-forwarding:set:splunk-hec

OPTIONS
  -i, --insecure         bypass certificate check
  -u, --auth             whisk auth
  -v, --verbose          Verbose output
  --apihost              whisk API host
  --apiversion           whisk API version
  --cert                 client cert
  --debug=debug          Debug level output
  --hec-token=hec-token  (required) HEC token
  --help                 Show help
  --host=host            (required) Host
  --index=index          (required) Index
  --key                  client key
  --port=port            (required) Port
  --version              Show version

ALIASES
  $ aio runtime:ns:log-forwarding:set:splunk-hec
  $ aio runtime:ns:lf:set:splunk-hec
  $ aio runtime:namespace:lf:set:splunk-hec
  $ aio rt:namespace:log-forwarding:set:splunk-hec
  $ aio rt:namespace:lf:set:splunk-hec
  $ aio rt:ns:log-forwarding:set:splunk-hec
  $ aio rt:ns:lf:set:splunk-hec
```

_See code: [src/commands/runtime/namespace/log-forwarding/set/splunk-hec.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/namespace/log-forwarding/set/splunk-hec.js)_

## `aio runtime:package`

Manage your packages

```
Manage your packages

USAGE
  $ aio runtime:package

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
  $ aio runtime:pkg
  $ aio rt:package
  $ aio rt:pkg
```

_See code: [src/commands/runtime/package/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/package/index.js)_

## `aio runtime:package:bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
Bind parameters to a package

USAGE
  $ aio runtime:package:bind PACKAGENAME BINDPACKAGENAME

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
  $ aio runtime:pkg:bind
  $ aio rt:package:bind
  $ aio rt:pkg:bind
```

_See code: [src/commands/runtime/package/bind.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/package/bind.js)_

## `aio runtime:package:create PACKAGENAME`

Creates a Package

```
Creates a Package

USAGE
  $ aio runtime:package:create PACKAGENAME

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
  $ aio runtime:pkg:create
  $ aio rt:package:create
  $ aio rt:pkg:create
```

_See code: [src/commands/runtime/package/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/package/create.js)_

## `aio runtime:package:delete PACKAGENAME`

Deletes a Package

```
Deletes a Package

USAGE
  $ aio runtime:package:delete PACKAGENAME

OPTIONS
  --json  output raw json

ALIASES
  $ aio runtime:pkg:delete
  $ aio rt:package:delete
  $ aio rt:pkg:delete
```

_See code: [src/commands/runtime/package/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/package/delete.js)_

## `aio runtime:package:get PACKAGENAME`

Retrieves a Package

```
Retrieves a Package

USAGE
  $ aio runtime:package:get PACKAGENAME

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
  $ aio runtime:pkg:get
  $ aio rt:package:get
  $ aio rt:pkg:get
```

_See code: [src/commands/runtime/package/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/package/get.js)_

## `aio runtime:package:list [NAMESPACE]`

Lists all the Packages

```
Lists all the Packages

USAGE
  $ aio runtime:package:list [NAMESPACE]

OPTIONS
  -c, --count              show only the total number of packages
  -i, --insecure           bypass certificate check
  -l, --limit=limit        only return LIMIT number of packages
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
  $ aio runtime:package:ls
  $ aio runtime:pkg:list
  $ aio runtime:pkg:ls
  $ aio rt:package:list
  $ aio rt:package:ls
  $ aio rt:pkg:list
  $ aio rt:pkg:ls
```

_See code: [src/commands/runtime/package/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/package/list.js)_

## `aio runtime:package:update PACKAGENAME`

Updates a Package

```
Updates a Package

USAGE
  $ aio runtime:package:update PACKAGENAME

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
  $ aio runtime:pkg:update
  $ aio rt:package:update
  $ aio rt:pkg:update
```

_See code: [src/commands/runtime/package/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/package/update.js)_

## `aio runtime:property`

Execute property commands

```
Execute property commands

USAGE
  $ aio runtime:property

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
  $ aio runtime:prop
  $ aio rt:prop
  $ aio rt:property
```

_See code: [src/commands/runtime/property/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/property/index.js)_

## `aio runtime:property:get`

get property

```
get property

USAGE
  $ aio runtime:property:get

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
  $ aio runtime:prop:get
  $ aio rt:property:get
  $ aio rt:prop:get
```

_See code: [src/commands/runtime/property/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/property/get.js)_

## `aio runtime:property:set`

set property

```
set property

USAGE
  $ aio runtime:property:set

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
  $ aio runtime:prop:set
  $ aio rt:property:set
  $ aio rt:prop:set
```

_See code: [src/commands/runtime/property/set.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/property/set.js)_

## `aio runtime:property:unset`

unset property

```
unset property

USAGE
  $ aio runtime:property:unset

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
  $ aio runtime:prop:unset
  $ aio rt:property:unset
  $ aio rt:prop:unset
```

_See code: [src/commands/runtime/property/unset.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/property/unset.js)_

## `aio runtime:route`

Manage your routes

```
Manage your routes

USAGE
  $ aio runtime:route

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
  $ aio runtime:api
  $ aio rt:api
```

_See code: [src/commands/runtime/route/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/route/index.js)_

## `aio runtime:route:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`

create a new api route

```
create a new api route

USAGE
  $ aio runtime:route:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb
  ACTION    The action to call

OPTIONS
  -c, --config-file=config-file                     file containing API configuration in swagger JSON format
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
  $ aio runtime:api:create
  $ aio rt:route:create
  $ aio rt:api:create
```

_See code: [src/commands/runtime/route/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/route/create.js)_

## `aio runtime:route:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
delete an API

USAGE
  $ aio runtime:route:delete BASEPATHORAPINAME [RELPATH] [APIVERB]

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
  $ aio runtime:api:delete
  $ aio rt:route:delete
  $ aio rt:api:delete
```

_See code: [src/commands/runtime/route/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/route/delete.js)_

## `aio runtime:route:get BASEPATHORAPINAME`

get API details

```
get API details

USAGE
  $ aio runtime:route:get BASEPATHORAPINAME

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
  $ aio runtime:api:get
  $ aio rt:route:get
  $ aio rt:api:get
```

_See code: [src/commands/runtime/route/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/route/get.js)_

## `aio runtime:route:list [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
list route/apis for Adobe I/O Runtime

USAGE
  $ aio runtime:route:list [BASEPATH] [RELPATH] [APIVERB]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

OPTIONS
  -i, --insecure     bypass certificate check
  -l, --limit=limit  only return LIMIT number of triggers
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
  $ aio runtime:route:ls
  $ aio runtime:api:list
  $ aio runtime:api:ls
  $ aio rt:route:list
  $ aio rt:route:ls
  $ aio rt:api:list
  $ aio rt:api:ls
```

_See code: [src/commands/runtime/route/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/route/list.js)_

## `aio runtime:rule`

Manage your rules

```
Manage your rules

USAGE
  $ aio runtime:rule

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
  $ aio rt:rule
```

_See code: [src/commands/runtime/rule/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/rule/index.js)_

## `aio runtime:rule:create NAME TRIGGER ACTION`

Create a Rule

```
Create a Rule

USAGE
  $ aio runtime:rule:create NAME TRIGGER ACTION

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
  $ aio rt:rule:create
```

_See code: [src/commands/runtime/rule/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/rule/create.js)_

## `aio runtime:rule:delete NAME`

Delete a Rule

```
Delete a Rule

USAGE
  $ aio runtime:rule:delete NAME

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
  --json          output raw json
  --key           client key
  --version       Show version

ALIASES
  $ aio rt:rule:delete
```

_See code: [src/commands/runtime/rule/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/rule/delete.js)_

## `aio runtime:rule:disable NAME`

Disable a Rule

```
Disable a Rule

USAGE
  $ aio runtime:rule:disable NAME

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
  $ aio rt:rule:disable
```

_See code: [src/commands/runtime/rule/disable.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/rule/disable.js)_

## `aio runtime:rule:enable NAME`

Enable a Rule

```
Enable a Rule

USAGE
  $ aio runtime:rule:enable NAME

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
  $ aio rt:rule:enable
```

_See code: [src/commands/runtime/rule/enable.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/rule/enable.js)_

## `aio runtime:rule:get NAME`

Retrieves a Rule

```
Retrieves a Rule

USAGE
  $ aio runtime:rule:get NAME

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
  $ aio rt:rule:get
```

_See code: [src/commands/runtime/rule/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/rule/get.js)_

## `aio runtime:rule:list`

Retrieves a list of Rules

```
Retrieves a list of Rules

USAGE
  $ aio runtime:rule:list

OPTIONS
  -c, --count        show only the total number of rules
  -i, --insecure     bypass certificate check
  -l, --limit=limit  Limit number of rules returned
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
  $ aio runtime:rule:ls
  $ aio rt:rule:list
  $ aio rt:rule:ls
```

_See code: [src/commands/runtime/rule/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/rule/list.js)_

## `aio runtime:rule:status NAME`

Gets the status of a rule

```
Gets the status of a rule

USAGE
  $ aio runtime:rule:status NAME

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
  $ aio rt:rule:status
```

_See code: [src/commands/runtime/rule/status.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/rule/status.js)_

## `aio runtime:rule:update NAME TRIGGER ACTION`

Update a Rule

```
Update a Rule

USAGE
  $ aio runtime:rule:update NAME TRIGGER ACTION

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
  $ aio rt:rule:update
```

_See code: [src/commands/runtime/rule/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/rule/update.js)_

## `aio runtime:trigger`

Manage your triggers

```
Manage your triggers

USAGE
  $ aio runtime:trigger

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
  $ aio rt:trigger
```

_See code: [src/commands/runtime/trigger/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/trigger/index.js)_

## `aio runtime:trigger:create TRIGGERNAME`

Create a trigger for Adobe I/O Runtime

```
Create a trigger for Adobe I/O Runtime

USAGE
  $ aio runtime:trigger:create TRIGGERNAME

ARGUMENTS
  TRIGGERNAME  The name of the trigger

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -f, --feed=feed                        trigger feed ACTION_NAME
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
  $ aio rt:trigger:create
```

_See code: [src/commands/runtime/trigger/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/trigger/create.js)_

## `aio runtime:trigger:delete TRIGGERPATH`

Delete a trigger for Adobe I/O Runtime

```
Delete a trigger for Adobe I/O Runtime

USAGE
  $ aio runtime:trigger:delete TRIGGERPATH

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
  $ aio rt:trigger:delete
```

_See code: [src/commands/runtime/trigger/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/trigger/delete.js)_

## `aio runtime:trigger:fire TRIGGERNAME`

Fire a trigger for Adobe I/O Runtime

```
Fire a trigger for Adobe I/O Runtime

USAGE
  $ aio runtime:trigger:fire TRIGGERNAME

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
  $ aio rt:trigger:fire
```

_See code: [src/commands/runtime/trigger/fire.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/trigger/fire.js)_

## `aio runtime:trigger:get TRIGGERPATH`

Get a trigger for Adobe I/O Runtime

```
Get a trigger for Adobe I/O Runtime

USAGE
  $ aio runtime:trigger:get TRIGGERPATH

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
  $ aio rt:trigger:get
```

_See code: [src/commands/runtime/trigger/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/trigger/get.js)_

## `aio runtime:trigger:list`

Lists all of your triggers for Adobe I/O Runtime

```
Lists all of your triggers for Adobe I/O Runtime

USAGE
  $ aio runtime:trigger:list

OPTIONS
  -c, --count        show only the total number of triggers
  -i, --insecure     bypass certificate check
  -l, --limit=limit  only return LIMIT number of triggers
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
  $ aio runtime:trigger:ls
  $ aio rt:trigger:list
  $ aio rt:trigger:ls
```

_See code: [src/commands/runtime/trigger/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/trigger/list.js)_

## `aio runtime:trigger:update TRIGGERNAME`

Update or create a trigger for Adobe I/O Runtime

```
Update or create a trigger for Adobe I/O Runtime

USAGE
  $ aio runtime:trigger:update TRIGGERNAME

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
  $ aio rt:trigger:update
```

_See code: [src/commands/runtime/trigger/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/5.1.0/src/commands/runtime/trigger/update.js)_
<!-- commandsstop -->



### Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
