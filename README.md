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
* [`aio rt`](#aio-rt)
* [`aio rt action`](#aio-rt-action)
* [`aio rt action create ACTIONNAME [ACTIONPATH]`](#aio-rt-action-create-actionname-actionpath)
* [`aio rt action del ACTIONNAME`](#aio-rt-action-del-actionname)
* [`aio rt action delete ACTIONNAME`](#aio-rt-action-delete-actionname)
* [`aio rt action get ACTIONNAME`](#aio-rt-action-get-actionname)
* [`aio rt action invoke ACTIONNAME`](#aio-rt-action-invoke-actionname)
* [`aio rt action list [PACKAGENAME]`](#aio-rt-action-list-packagename)
* [`aio rt action ls [PACKAGENAME]`](#aio-rt-action-ls-packagename)
* [`aio rt action update ACTIONNAME [ACTIONPATH]`](#aio-rt-action-update-actionname-actionpath)
* [`aio rt actions list [PACKAGENAME]`](#aio-rt-actions-list-packagename)
* [`aio rt actions ls [PACKAGENAME]`](#aio-rt-actions-ls-packagename)
* [`aio rt activation`](#aio-rt-activation)
* [`aio rt activation get [ACTIVATIONID]`](#aio-rt-activation-get-activationid)
* [`aio rt activation list [ACTION_NAME]`](#aio-rt-activation-list-action_name)
* [`aio rt activation log [ACTIVATIONID]`](#aio-rt-activation-log-activationid)
* [`aio rt activation logs [ACTIVATIONID]`](#aio-rt-activation-logs-activationid)
* [`aio rt activation ls [ACTION_NAME]`](#aio-rt-activation-ls-action_name)
* [`aio rt activation result [ACTIVATIONID]`](#aio-rt-activation-result-activationid)
* [`aio rt activations list [ACTION_NAME]`](#aio-rt-activations-list-action_name)
* [`aio rt activations ls [ACTION_NAME]`](#aio-rt-activations-ls-action_name)
* [`aio rt api`](#aio-rt-api)
* [`aio rt api create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`](#aio-rt-api-create-basepath-relpath-apiverb-action)
* [`aio rt api delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#aio-rt-api-delete-basepathorapiname-relpath-apiverb)
* [`aio rt api get BASEPATHORAPINAME`](#aio-rt-api-get-basepathorapiname)
* [`aio rt api list [BASEPATH] [RELPATH] [APIVERB]`](#aio-rt-api-list-basepath-relpath-apiverb)
* [`aio rt api ls [BASEPATH] [RELPATH] [APIVERB]`](#aio-rt-api-ls-basepath-relpath-apiverb)
* [`aio rt deploy`](#aio-rt-deploy)
* [`aio rt deploy export`](#aio-rt-deploy-export)
* [`aio rt deploy report`](#aio-rt-deploy-report)
* [`aio rt deploy sync`](#aio-rt-deploy-sync)
* [`aio rt deploy undeploy`](#aio-rt-deploy-undeploy)
* [`aio rt deploy version`](#aio-rt-deploy-version)
* [`aio rt get`](#aio-rt-get)
* [`aio rt list`](#aio-rt-list)
* [`aio rt log [ACTIVATIONID]`](#aio-rt-log-activationid)
* [`aio rt logs [ACTIVATIONID]`](#aio-rt-logs-activationid)
* [`aio rt ls`](#aio-rt-ls)
* [`aio rt namespace`](#aio-rt-namespace)
* [`aio rt namespace lf`](#aio-rt-namespace-lf)
* [`aio rt namespace lf errors`](#aio-rt-namespace-lf-errors)
* [`aio rt namespace lf get`](#aio-rt-namespace-lf-get)
* [`aio rt namespace lf set`](#aio-rt-namespace-lf-set)
* [`aio rt namespace lf set adobe-io-runtime`](#aio-rt-namespace-lf-set-adobe-io-runtime)
* [`aio rt namespace lf set azure-log-analytics`](#aio-rt-namespace-lf-set-azure-log-analytics)
* [`aio rt namespace lf set splunk-hec`](#aio-rt-namespace-lf-set-splunk-hec)
* [`aio rt namespace list`](#aio-rt-namespace-list)
* [`aio rt namespace log-forwarding`](#aio-rt-namespace-log-forwarding)
* [`aio rt namespace log-forwarding errors`](#aio-rt-namespace-log-forwarding-errors)
* [`aio rt namespace log-forwarding get`](#aio-rt-namespace-log-forwarding-get)
* [`aio rt namespace log-forwarding set`](#aio-rt-namespace-log-forwarding-set)
* [`aio rt namespace log-forwarding set adobe-io-runtime`](#aio-rt-namespace-log-forwarding-set-adobe-io-runtime)
* [`aio rt namespace log-forwarding set azure-log-analytics`](#aio-rt-namespace-log-forwarding-set-azure-log-analytics)
* [`aio rt namespace log-forwarding set splunk-hec`](#aio-rt-namespace-log-forwarding-set-splunk-hec)
* [`aio rt namespace ls`](#aio-rt-namespace-ls)
* [`aio rt ns`](#aio-rt-ns)
* [`aio rt ns lf`](#aio-rt-ns-lf)
* [`aio rt ns lf errors`](#aio-rt-ns-lf-errors)
* [`aio rt ns lf get`](#aio-rt-ns-lf-get)
* [`aio rt ns lf set`](#aio-rt-ns-lf-set)
* [`aio rt ns lf set adobe-io-runtime`](#aio-rt-ns-lf-set-adobe-io-runtime)
* [`aio rt ns lf set azure-log-analytics`](#aio-rt-ns-lf-set-azure-log-analytics)
* [`aio rt ns lf set splunk-hec`](#aio-rt-ns-lf-set-splunk-hec)
* [`aio rt ns list`](#aio-rt-ns-list)
* [`aio rt ns log-forwarding`](#aio-rt-ns-log-forwarding)
* [`aio rt ns log-forwarding errors`](#aio-rt-ns-log-forwarding-errors)
* [`aio rt ns log-forwarding get`](#aio-rt-ns-log-forwarding-get)
* [`aio rt ns log-forwarding set`](#aio-rt-ns-log-forwarding-set)
* [`aio rt ns log-forwarding set adobe-io-runtime`](#aio-rt-ns-log-forwarding-set-adobe-io-runtime)
* [`aio rt ns log-forwarding set azure-log-analytics`](#aio-rt-ns-log-forwarding-set-azure-log-analytics)
* [`aio rt ns log-forwarding set splunk-hec`](#aio-rt-ns-log-forwarding-set-splunk-hec)
* [`aio rt ns ls`](#aio-rt-ns-ls)
* [`aio rt package`](#aio-rt-package)
* [`aio rt package bind PACKAGENAME BINDPACKAGENAME`](#aio-rt-package-bind-packagename-bindpackagename)
* [`aio rt package create PACKAGENAME`](#aio-rt-package-create-packagename)
* [`aio rt package delete PACKAGENAME`](#aio-rt-package-delete-packagename)
* [`aio rt package get PACKAGENAME`](#aio-rt-package-get-packagename)
* [`aio rt package list [NAMESPACE]`](#aio-rt-package-list-namespace)
* [`aio rt package ls [NAMESPACE]`](#aio-rt-package-ls-namespace)
* [`aio rt package update PACKAGENAME`](#aio-rt-package-update-packagename)
* [`aio rt pkg`](#aio-rt-pkg)
* [`aio rt pkg bind PACKAGENAME BINDPACKAGENAME`](#aio-rt-pkg-bind-packagename-bindpackagename)
* [`aio rt pkg create PACKAGENAME`](#aio-rt-pkg-create-packagename)
* [`aio rt pkg delete PACKAGENAME`](#aio-rt-pkg-delete-packagename)
* [`aio rt pkg get PACKAGENAME`](#aio-rt-pkg-get-packagename)
* [`aio rt pkg list [NAMESPACE]`](#aio-rt-pkg-list-namespace)
* [`aio rt pkg ls [NAMESPACE]`](#aio-rt-pkg-ls-namespace)
* [`aio rt pkg update PACKAGENAME`](#aio-rt-pkg-update-packagename)
* [`aio rt prop`](#aio-rt-prop)
* [`aio rt prop get`](#aio-rt-prop-get)
* [`aio rt prop set`](#aio-rt-prop-set)
* [`aio rt prop unset`](#aio-rt-prop-unset)
* [`aio rt property`](#aio-rt-property)
* [`aio rt property get`](#aio-rt-property-get)
* [`aio rt property set`](#aio-rt-property-set)
* [`aio rt property unset`](#aio-rt-property-unset)
* [`aio rt route create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`](#aio-rt-route-create-basepath-relpath-apiverb-action)
* [`aio rt route delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#aio-rt-route-delete-basepathorapiname-relpath-apiverb)
* [`aio rt route get BASEPATHORAPINAME`](#aio-rt-route-get-basepathorapiname)
* [`aio rt route list [BASEPATH] [RELPATH] [APIVERB]`](#aio-rt-route-list-basepath-relpath-apiverb)
* [`aio rt route ls [BASEPATH] [RELPATH] [APIVERB]`](#aio-rt-route-ls-basepath-relpath-apiverb)
* [`aio rt rule`](#aio-rt-rule)
* [`aio rt rule create NAME TRIGGER ACTION`](#aio-rt-rule-create-name-trigger-action)
* [`aio rt rule delete NAME`](#aio-rt-rule-delete-name)
* [`aio rt rule disable NAME`](#aio-rt-rule-disable-name)
* [`aio rt rule enable NAME`](#aio-rt-rule-enable-name)
* [`aio rt rule get NAME`](#aio-rt-rule-get-name)
* [`aio rt rule list`](#aio-rt-rule-list)
* [`aio rt rule ls`](#aio-rt-rule-ls)
* [`aio rt rule status NAME`](#aio-rt-rule-status-name)
* [`aio rt rule update NAME TRIGGER ACTION`](#aio-rt-rule-update-name-trigger-action)
* [`aio rt trigger`](#aio-rt-trigger)
* [`aio rt trigger create TRIGGERNAME`](#aio-rt-trigger-create-triggername)
* [`aio rt trigger delete TRIGGERPATH`](#aio-rt-trigger-delete-triggerpath)
* [`aio rt trigger fire TRIGGERNAME`](#aio-rt-trigger-fire-triggername)
* [`aio rt trigger get TRIGGERPATH`](#aio-rt-trigger-get-triggerpath)
* [`aio rt trigger list`](#aio-rt-trigger-list)
* [`aio rt trigger ls`](#aio-rt-trigger-ls)
* [`aio rt trigger update TRIGGERNAME`](#aio-rt-trigger-update-triggername)
* [`aio runtime`](#aio-runtime)
* [`aio runtime action`](#aio-runtime-action)
* [`aio runtime action create ACTIONNAME [ACTIONPATH]`](#aio-runtime-action-create-actionname-actionpath)
* [`aio runtime action del ACTIONNAME`](#aio-runtime-action-del-actionname)
* [`aio runtime action delete ACTIONNAME`](#aio-runtime-action-delete-actionname)
* [`aio runtime action get ACTIONNAME`](#aio-runtime-action-get-actionname)
* [`aio runtime action invoke ACTIONNAME`](#aio-runtime-action-invoke-actionname)
* [`aio runtime action list [PACKAGENAME]`](#aio-runtime-action-list-packagename)
* [`aio runtime action ls [PACKAGENAME]`](#aio-runtime-action-ls-packagename)
* [`aio runtime action update ACTIONNAME [ACTIONPATH]`](#aio-runtime-action-update-actionname-actionpath)
* [`aio runtime actions list [PACKAGENAME]`](#aio-runtime-actions-list-packagename)
* [`aio runtime actions ls [PACKAGENAME]`](#aio-runtime-actions-ls-packagename)
* [`aio runtime activation`](#aio-runtime-activation)
* [`aio runtime activation get [ACTIVATIONID]`](#aio-runtime-activation-get-activationid)
* [`aio runtime activation list [ACTION_NAME]`](#aio-runtime-activation-list-action_name)
* [`aio runtime activation log [ACTIVATIONID]`](#aio-runtime-activation-log-activationid)
* [`aio runtime activation logs [ACTIVATIONID]`](#aio-runtime-activation-logs-activationid)
* [`aio runtime activation ls [ACTION_NAME]`](#aio-runtime-activation-ls-action_name)
* [`aio runtime activation result [ACTIVATIONID]`](#aio-runtime-activation-result-activationid)
* [`aio runtime activations list [ACTION_NAME]`](#aio-runtime-activations-list-action_name)
* [`aio runtime activations ls [ACTION_NAME]`](#aio-runtime-activations-ls-action_name)
* [`aio runtime api`](#aio-runtime-api)
* [`aio runtime api create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`](#aio-runtime-api-create-basepath-relpath-apiverb-action)
* [`aio runtime api delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#aio-runtime-api-delete-basepathorapiname-relpath-apiverb)
* [`aio runtime api get BASEPATHORAPINAME`](#aio-runtime-api-get-basepathorapiname)
* [`aio runtime api list [BASEPATH] [RELPATH] [APIVERB]`](#aio-runtime-api-list-basepath-relpath-apiverb)
* [`aio runtime api ls [BASEPATH] [RELPATH] [APIVERB]`](#aio-runtime-api-ls-basepath-relpath-apiverb)
* [`aio runtime deploy`](#aio-runtime-deploy)
* [`aio runtime deploy export`](#aio-runtime-deploy-export)
* [`aio runtime deploy report`](#aio-runtime-deploy-report)
* [`aio runtime deploy sync`](#aio-runtime-deploy-sync)
* [`aio runtime deploy undeploy`](#aio-runtime-deploy-undeploy)
* [`aio runtime deploy version`](#aio-runtime-deploy-version)
* [`aio runtime list`](#aio-runtime-list)
* [`aio runtime log [ACTIVATIONID]`](#aio-runtime-log-activationid)
* [`aio runtime logs [ACTIVATIONID]`](#aio-runtime-logs-activationid)
* [`aio runtime ls`](#aio-runtime-ls)
* [`aio runtime namespace`](#aio-runtime-namespace)
* [`aio runtime namespace get`](#aio-runtime-namespace-get)
* [`aio runtime namespace lf`](#aio-runtime-namespace-lf)
* [`aio runtime namespace lf errors`](#aio-runtime-namespace-lf-errors)
* [`aio runtime namespace lf get`](#aio-runtime-namespace-lf-get)
* [`aio runtime namespace lf set`](#aio-runtime-namespace-lf-set)
* [`aio runtime namespace lf set adobe-io-runtime`](#aio-runtime-namespace-lf-set-adobe-io-runtime)
* [`aio runtime namespace lf set azure-log-analytics`](#aio-runtime-namespace-lf-set-azure-log-analytics)
* [`aio runtime namespace lf set splunk-hec`](#aio-runtime-namespace-lf-set-splunk-hec)
* [`aio runtime namespace list`](#aio-runtime-namespace-list)
* [`aio runtime namespace log-forwarding`](#aio-runtime-namespace-log-forwarding)
* [`aio runtime namespace log-forwarding errors`](#aio-runtime-namespace-log-forwarding-errors)
* [`aio runtime namespace log-forwarding get`](#aio-runtime-namespace-log-forwarding-get)
* [`aio runtime namespace log-forwarding set`](#aio-runtime-namespace-log-forwarding-set)
* [`aio runtime namespace log-forwarding set adobe-io-runtime`](#aio-runtime-namespace-log-forwarding-set-adobe-io-runtime)
* [`aio runtime namespace log-forwarding set azure-log-analytics`](#aio-runtime-namespace-log-forwarding-set-azure-log-analytics)
* [`aio runtime namespace log-forwarding set splunk-hec`](#aio-runtime-namespace-log-forwarding-set-splunk-hec)
* [`aio runtime namespace ls`](#aio-runtime-namespace-ls)
* [`aio runtime ns`](#aio-runtime-ns)
* [`aio runtime ns lf`](#aio-runtime-ns-lf)
* [`aio runtime ns lf errors`](#aio-runtime-ns-lf-errors)
* [`aio runtime ns lf get`](#aio-runtime-ns-lf-get)
* [`aio runtime ns lf set`](#aio-runtime-ns-lf-set)
* [`aio runtime ns lf set adobe-io-runtime`](#aio-runtime-ns-lf-set-adobe-io-runtime)
* [`aio runtime ns lf set azure-log-analytics`](#aio-runtime-ns-lf-set-azure-log-analytics)
* [`aio runtime ns lf set splunk-hec`](#aio-runtime-ns-lf-set-splunk-hec)
* [`aio runtime ns list`](#aio-runtime-ns-list)
* [`aio runtime ns log-forwarding`](#aio-runtime-ns-log-forwarding)
* [`aio runtime ns log-forwarding errors`](#aio-runtime-ns-log-forwarding-errors)
* [`aio runtime ns log-forwarding get`](#aio-runtime-ns-log-forwarding-get)
* [`aio runtime ns log-forwarding set`](#aio-runtime-ns-log-forwarding-set)
* [`aio runtime ns log-forwarding set adobe-io-runtime`](#aio-runtime-ns-log-forwarding-set-adobe-io-runtime)
* [`aio runtime ns log-forwarding set azure-log-analytics`](#aio-runtime-ns-log-forwarding-set-azure-log-analytics)
* [`aio runtime ns log-forwarding set splunk-hec`](#aio-runtime-ns-log-forwarding-set-splunk-hec)
* [`aio runtime ns ls`](#aio-runtime-ns-ls)
* [`aio runtime package`](#aio-runtime-package)
* [`aio runtime package bind PACKAGENAME BINDPACKAGENAME`](#aio-runtime-package-bind-packagename-bindpackagename)
* [`aio runtime package create PACKAGENAME`](#aio-runtime-package-create-packagename)
* [`aio runtime package delete PACKAGENAME`](#aio-runtime-package-delete-packagename)
* [`aio runtime package get PACKAGENAME`](#aio-runtime-package-get-packagename)
* [`aio runtime package list [NAMESPACE]`](#aio-runtime-package-list-namespace)
* [`aio runtime package ls [NAMESPACE]`](#aio-runtime-package-ls-namespace)
* [`aio runtime package update PACKAGENAME`](#aio-runtime-package-update-packagename)
* [`aio runtime pkg`](#aio-runtime-pkg)
* [`aio runtime pkg bind PACKAGENAME BINDPACKAGENAME`](#aio-runtime-pkg-bind-packagename-bindpackagename)
* [`aio runtime pkg create PACKAGENAME`](#aio-runtime-pkg-create-packagename)
* [`aio runtime pkg delete PACKAGENAME`](#aio-runtime-pkg-delete-packagename)
* [`aio runtime pkg get PACKAGENAME`](#aio-runtime-pkg-get-packagename)
* [`aio runtime pkg list [NAMESPACE]`](#aio-runtime-pkg-list-namespace)
* [`aio runtime pkg ls [NAMESPACE]`](#aio-runtime-pkg-ls-namespace)
* [`aio runtime pkg update PACKAGENAME`](#aio-runtime-pkg-update-packagename)
* [`aio runtime prop`](#aio-runtime-prop)
* [`aio runtime prop get`](#aio-runtime-prop-get)
* [`aio runtime prop set`](#aio-runtime-prop-set)
* [`aio runtime prop unset`](#aio-runtime-prop-unset)
* [`aio runtime property`](#aio-runtime-property)
* [`aio runtime property get`](#aio-runtime-property-get)
* [`aio runtime property set`](#aio-runtime-property-set)
* [`aio runtime property unset`](#aio-runtime-property-unset)
* [`aio runtime route`](#aio-runtime-route)
* [`aio runtime route create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`](#aio-runtime-route-create-basepath-relpath-apiverb-action)
* [`aio runtime route delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#aio-runtime-route-delete-basepathorapiname-relpath-apiverb)
* [`aio runtime route get BASEPATHORAPINAME`](#aio-runtime-route-get-basepathorapiname)
* [`aio runtime route list [BASEPATH] [RELPATH] [APIVERB]`](#aio-runtime-route-list-basepath-relpath-apiverb)
* [`aio runtime route ls [BASEPATH] [RELPATH] [APIVERB]`](#aio-runtime-route-ls-basepath-relpath-apiverb)
* [`aio runtime rule`](#aio-runtime-rule)
* [`aio runtime rule create NAME TRIGGER ACTION`](#aio-runtime-rule-create-name-trigger-action)
* [`aio runtime rule delete NAME`](#aio-runtime-rule-delete-name)
* [`aio runtime rule disable NAME`](#aio-runtime-rule-disable-name)
* [`aio runtime rule enable NAME`](#aio-runtime-rule-enable-name)
* [`aio runtime rule get NAME`](#aio-runtime-rule-get-name)
* [`aio runtime rule list`](#aio-runtime-rule-list)
* [`aio runtime rule ls`](#aio-runtime-rule-ls)
* [`aio runtime rule status NAME`](#aio-runtime-rule-status-name)
* [`aio runtime rule update NAME TRIGGER ACTION`](#aio-runtime-rule-update-name-trigger-action)
* [`aio runtime trigger`](#aio-runtime-trigger)
* [`aio runtime trigger create TRIGGERNAME`](#aio-runtime-trigger-create-triggername)
* [`aio runtime trigger delete TRIGGERPATH`](#aio-runtime-trigger-delete-triggerpath)
* [`aio runtime trigger fire TRIGGERNAME`](#aio-runtime-trigger-fire-triggername)
* [`aio runtime trigger get TRIGGERPATH`](#aio-runtime-trigger-get-triggerpath)
* [`aio runtime trigger list`](#aio-runtime-trigger-list)
* [`aio runtime trigger ls`](#aio-runtime-trigger-ls)
* [`aio runtime trigger update TRIGGERNAME`](#aio-runtime-trigger-update-triggername)

## `aio rt`

Execute runtime commands

```
USAGE
  $ aio rt [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Execute runtime commands

ALIASES
  $ aio rt
```

## `aio rt action`

Manage your actions

```
USAGE
  $ aio rt action [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your actions

ALIASES
  $ aio rt action
```

## `aio rt action create ACTIONNAME [ACTIONPATH]`

Creates an Action

```
USAGE
  $ aio rt action create ACTIONNAME [ACTIONPATH] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost
    <value>] [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [--copy <value>] [-e <value>]
    [--web-secure <value> --web true|yes|false|no|raw] [-P <value>] [-E <value>] [-t <value>] [-m <value>] [-l <value>]
    [--kind <value>] [-a <value>] [-A <value>] [--sequence <value>] [--docker <value>] [--main <value>] [--binary]
    [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -E, --env-file=<value>         FILE containing environment variables in JSON format
  -P, --param-file=<value>       FILE containing parameter values in JSON format
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -e, --env=<value>...           environment values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -l, --logsize=<value>          the maximum log size LIMIT in MB for the action (default 10, min: 0, max: 10)
  -m, --memory=<value>           the maximum memory LIMIT in MB for the action (default 256, min: 128, max: 4096)
  -p, --param=<value>...         parameter values in KEY VALUE format
  -t, --timeout=<value>          the timeout LIMIT in milliseconds after which the action is terminated (default 60000,
                                 min: 100, max: 3600000)
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --binary                       treat code artifact as binary
  --cert=<value>                 client cert
  --copy=<value>                 copy an existing action
  --debug=<value>                Debug level output
  --docker=<value>               [Restricted Access] use provided Docker image (a path on DockerHub) to run the action
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --kind=<value>                 the KIND of the action runtime (example: swift:default, nodejs:default)
  --main=<value>                 the name of the action entry point (function or fully-qualified method name when
                                 applicable)
  --sequence=<value>             treat ACTION as comma separated sequence of actions to invoke
  --version                      Show version
  --web=<option>                 treat ACTION as a web action or as a raw HTTP web action
                                 <options: true|yes|false|no|raw>
  --web-secure=<value>           secure the web action (valid values are true, false, or any string)

DESCRIPTION
  Creates an Action

ALIASES
  $ aio rt action create
```

## `aio rt action del ACTIONNAME`

Deletes an Action

```
USAGE
  $ aio rt action del ACTIONNAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Deletes an Action

ALIASES
  $ aio runtime action del
  $ aio rt action delete
  $ aio rt action del
```

## `aio rt action delete ACTIONNAME`

Deletes an Action

```
USAGE
  $ aio rt action delete ACTIONNAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Deletes an Action

ALIASES
  $ aio runtime action del
  $ aio rt action delete
  $ aio rt action del
```

## `aio rt action get ACTIONNAME`

Retrieves an Action

```
USAGE
  $ aio rt action get ACTIONNAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-r] [-c] [--save] [--save-as <value>]

FLAGS
  -c, --code            show action code (only works if code is not a zip file)
  -i, --insecure        bypass certificate check
  -r, --url             get action url
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --key=<value>         client key
  --save                save action code to file corresponding with action name
  --save-as=<value>     file to save action code to
  --version             Show version

DESCRIPTION
  Retrieves an Action

ALIASES
  $ aio rt action get
```

## `aio rt action invoke ACTIONNAME`

Invokes an Action

```
USAGE
  $ aio rt action invoke ACTIONNAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [-b] [-r]

FLAGS
  -P, --param-file=<value>  FILE containing parameter values in JSON format
  -b, --blocking            blocking invoke
  -i, --insecure            bypass certificate check
  -p, --param=<value>...    parameter values in KEY VALUE format
  -r, --result              blocking invoke; show only activation result (unless there is a failure)
  -u, --auth=<value>        whisk auth
  -v, --verbose             Verbose output
  --apihost=<value>         whisk API host
  --apiversion=<value>      whisk API version
  --cert=<value>            client cert
  --debug=<value>           Debug level output
  --help                    Show help
  --key=<value>             client key
  --version                 Show version

DESCRIPTION
  Invokes an Action

ALIASES
  $ aio rt action invoke
```

## `aio rt action list [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio rt action list [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of actions from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Actions

ALIASES
  $ aio runtime action ls
  $ aio runtime actions list
  $ aio runtime actions ls
  $ aio rt action list
  $ aio rt actions list
  $ aio rt action ls
  $ aio rt actions ls
```

## `aio rt action ls [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio rt action ls [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of actions from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Actions

ALIASES
  $ aio runtime action ls
  $ aio runtime actions list
  $ aio runtime actions ls
  $ aio rt action list
  $ aio rt actions list
  $ aio rt action ls
  $ aio rt actions ls
```

## `aio rt action update ACTIONNAME [ACTIONPATH]`

Updates an Action

```
USAGE
  $ aio rt action update ACTIONNAME [ACTIONPATH] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost
    <value>] [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [--copy <value>] [-e <value>]
    [--web-secure <value> --web true|yes|false|no|raw] [-P <value>] [-E <value>] [-t <value>] [-m <value>] [-l <value>]
    [--kind <value>] [-a <value>] [-A <value>] [--sequence <value>] [--docker <value>] [--main <value>] [--binary]
    [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -E, --env-file=<value>         FILE containing environment variables in JSON format
  -P, --param-file=<value>       FILE containing parameter values in JSON format
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -e, --env=<value>...           environment values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -l, --logsize=<value>          the maximum log size LIMIT in MB for the action (default 10, min: 0, max: 10)
  -m, --memory=<value>           the maximum memory LIMIT in MB for the action (default 256, min: 128, max: 4096)
  -p, --param=<value>...         parameter values in KEY VALUE format
  -t, --timeout=<value>          the timeout LIMIT in milliseconds after which the action is terminated (default 60000,
                                 min: 100, max: 3600000)
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --binary                       treat code artifact as binary
  --cert=<value>                 client cert
  --copy=<value>                 copy an existing action
  --debug=<value>                Debug level output
  --docker=<value>               [Restricted Access] use provided Docker image (a path on DockerHub) to run the action
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --kind=<value>                 the KIND of the action runtime (example: swift:default, nodejs:default)
  --main=<value>                 the name of the action entry point (function or fully-qualified method name when
                                 applicable)
  --sequence=<value>             treat ACTION as comma separated sequence of actions to invoke
  --version                      Show version
  --web=<option>                 treat ACTION as a web action or as a raw HTTP web action
                                 <options: true|yes|false|no|raw>
  --web-secure=<value>           secure the web action (valid values are true, false, or any string)

DESCRIPTION
  Updates an Action

ALIASES
  $ aio rt action update
```

## `aio rt actions list [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio rt actions list [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of actions from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Actions

ALIASES
  $ aio runtime action ls
  $ aio runtime actions list
  $ aio runtime actions ls
  $ aio rt action list
  $ aio rt actions list
  $ aio rt action ls
  $ aio rt actions ls
```

## `aio rt actions ls [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio rt actions ls [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of actions from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Actions

ALIASES
  $ aio runtime action ls
  $ aio runtime actions list
  $ aio runtime actions ls
  $ aio rt action list
  $ aio rt actions list
  $ aio rt action ls
  $ aio rt actions ls
```

## `aio rt activation`

Manage your activations

```
USAGE
  $ aio rt activation [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your activations

ALIASES
  $ aio rt activation
```

## `aio rt activation get [ACTIVATIONID]`

Retrieves an Activation

```
USAGE
  $ aio rt activation get [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l] [-g]

FLAGS
  -g, --logs            emit only the logs, stripped of time stamps and stream identifier
  -i, --insecure        bypass certificate check
  -l, --last            retrieves the most recent activation
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Retrieves an Activation

ALIASES
  $ aio rt activation get
```

## `aio rt activation list [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio rt activation list [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations (min: 0, max: 50)
  -s, --skip=<value>    exclude the first SKIP number of activations from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --since=<value>       return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan
                        1970
  --upto=<value>        return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan
                        1970
  --version             Show version

DESCRIPTION
  Lists all the Activations

ALIASES
  $ aio runtime activations list
  $ aio runtime activation ls
  $ aio runtime activations ls
  $ aio rt activation list
  $ aio rt activation ls
  $ aio rt activations list
  $ aio rt activations ls
```

## `aio rt activation log [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio rt activation log [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-d |  | [-a <value> | -m | -p <value>]] [-r] [--limit
    <value> | -l] [-t | -w | -o]

FLAGS
  -a, --action=<value>   Fetch logs for a specific action
  -d, --deployed         Fetch logs for all actions deployed under a specific package
  -i, --insecure         bypass certificate check
  -l, --last             retrieves the most recent activation logs
  -m, --manifest         Fetch logs for all actions in the manifest
  -o, --poll             Fetch logs continuously
  -p, --package=<value>  Fetch logs for a specific package in the manifest
  -r, --strip            strip timestamp information and output first line only
  -t, --tail             Fetch logs continuously
  -u, --auth=<value>     whisk auth
  -v, --verbose          Verbose output
  -w, --watch            Fetch logs continuously
  --apihost=<value>      whisk API host
  --apiversion=<value>   whisk API version
  --cert=<value>         client cert
  --debug=<value>        Debug level output
  --help                 Show help
  --key=<value>          client key
  --limit=<value>        return logs only from last LIMIT number of activations (min: 0, max: 50)
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime activation log
  $ aio runtime log
  $ aio runtime logs
  $ aio rt activation logs
  $ aio rt activation log
  $ aio rt log
  $ aio rt logs
```

## `aio rt activation logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio rt activation logs [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-d |  | [-a <value> | -m | -p <value>]] [-r] [--limit
    <value> | -l] [-t | -w | -o]

FLAGS
  -a, --action=<value>   Fetch logs for a specific action
  -d, --deployed         Fetch logs for all actions deployed under a specific package
  -i, --insecure         bypass certificate check
  -l, --last             retrieves the most recent activation logs
  -m, --manifest         Fetch logs for all actions in the manifest
  -o, --poll             Fetch logs continuously
  -p, --package=<value>  Fetch logs for a specific package in the manifest
  -r, --strip            strip timestamp information and output first line only
  -t, --tail             Fetch logs continuously
  -u, --auth=<value>     whisk auth
  -v, --verbose          Verbose output
  -w, --watch            Fetch logs continuously
  --apihost=<value>      whisk API host
  --apiversion=<value>   whisk API version
  --cert=<value>         client cert
  --debug=<value>        Debug level output
  --help                 Show help
  --key=<value>          client key
  --limit=<value>        return logs only from last LIMIT number of activations (min: 0, max: 50)
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime activation log
  $ aio runtime log
  $ aio runtime logs
  $ aio rt activation logs
  $ aio rt activation log
  $ aio rt log
  $ aio rt logs
```

## `aio rt activation ls [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio rt activation ls [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations (min: 0, max: 50)
  -s, --skip=<value>    exclude the first SKIP number of activations from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --since=<value>       return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan
                        1970
  --upto=<value>        return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan
                        1970
  --version             Show version

DESCRIPTION
  Lists all the Activations

ALIASES
  $ aio runtime activations list
  $ aio runtime activation ls
  $ aio runtime activations ls
  $ aio rt activation list
  $ aio rt activation ls
  $ aio rt activations list
  $ aio rt activations ls
```

## `aio rt activation result [ACTIVATIONID]`

Retrieves the Results for an Activation

```
USAGE
  $ aio rt activation result [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l]

FLAGS
  -i, --insecure        bypass certificate check
  -l, --last            retrieves the most recent activation result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Retrieves the Results for an Activation

ALIASES
  $ aio rt activation result
```

## `aio rt activations list [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio rt activations list [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations (min: 0, max: 50)
  -s, --skip=<value>    exclude the first SKIP number of activations from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --since=<value>       return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan
                        1970
  --upto=<value>        return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan
                        1970
  --version             Show version

DESCRIPTION
  Lists all the Activations

ALIASES
  $ aio runtime activations list
  $ aio runtime activation ls
  $ aio runtime activations ls
  $ aio rt activation list
  $ aio rt activation ls
  $ aio rt activations list
  $ aio rt activations ls
```

## `aio rt activations ls [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio rt activations ls [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations (min: 0, max: 50)
  -s, --skip=<value>    exclude the first SKIP number of activations from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --since=<value>       return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan
                        1970
  --upto=<value>        return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan
                        1970
  --version             Show version

DESCRIPTION
  Lists all the Activations

ALIASES
  $ aio runtime activations list
  $ aio runtime activation ls
  $ aio runtime activations ls
  $ aio rt activation list
  $ aio rt activation ls
  $ aio rt activations list
  $ aio rt activations ls
```

## `aio rt api`

Manage your routes

```
USAGE
  $ aio rt api [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your routes

ALIASES
  $ aio runtime api
  $ aio rt api
```

## `aio rt api create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`

create a new api route

```
USAGE
  $ aio rt api create [BASEPATH] [RELPATH] [APIVERB] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
    [--debug <value>] [-v] [--version] [--help] [-n <value> | -c <value>] [-r html|http|json|text|svg|json | ]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb
  ACTION    The action to call

FLAGS
  -c, --config-file=<value>     file containing API configuration in swagger JSON format
  -i, --insecure                bypass certificate check
  -n, --apiname=<value>         Friendly name of the API; ignored when CFG_FILE is specified (default BASE_PATH)
  -r, --response-type=<option>  [default: json] Set the web action response TYPE.
                                <options: html|http|json|text|svg|json>
  -u, --auth                    whisk auth
  -v, --verbose                 Verbose output
  --apihost                     whisk API host
  --apiversion                  whisk API version
  --cert                        client cert
  --debug=<value>               Debug level output
  --help                        Show help
  --key                         client key
  --version                     Show version

DESCRIPTION
  create a new api route

ALIASES
  $ aio runtime api create
  $ aio rt route create
  $ aio rt api create
```

## `aio rt api delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
USAGE
  $ aio rt api delete BASEPATHORAPINAME [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
    [--debug <value>] [-v] [--version] [--help]

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name
  RELPATH            The path of the api relative to the base path
  APIVERB            (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  delete an API

ALIASES
  $ aio runtime api delete
  $ aio rt route delete
  $ aio rt api delete
```

## `aio rt api get BASEPATHORAPINAME`

get API details

```
USAGE
  $ aio rt api get BASEPATHORAPINAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
    [-v] [--version] [--help]

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  get API details

ALIASES
  $ aio runtime api get
  $ aio rt route get
  $ aio rt api get
```

## `aio rt api list [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio rt api list [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--json]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  only return LIMIT number of triggers
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --version            Show version

DESCRIPTION
  list route/apis for Adobe I/O Runtime

ALIASES
  $ aio runtime route ls
  $ aio runtime api list
  $ aio runtime api ls
  $ aio rt route list
  $ aio rt route ls
  $ aio rt api list
  $ aio rt api ls
```

## `aio rt api ls [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio rt api ls [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--json]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  only return LIMIT number of triggers
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --version            Show version

DESCRIPTION
  list route/apis for Adobe I/O Runtime

ALIASES
  $ aio runtime route ls
  $ aio runtime api list
  $ aio runtime api ls
  $ aio rt route list
  $ aio rt route ls
  $ aio rt api list
  $ aio rt api ls
```

## `aio rt deploy`

The Runtime Deployment Tool

```
USAGE
  $ aio rt deploy [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [-m <value>] [-d <value>] [--param <value>] [-P <value>]

FLAGS
  -P, --param-file=<value>  FILE containing parameter values in JSON format
  -d, --deployment=<value>  the path to the deployment file
  -i, --insecure            bypass certificate check
  -m, --manifest=<value>    the manifest file location
  -u, --auth=<value>        whisk auth
  -v, --verbose             Verbose output
  --apihost=<value>         whisk API host
  --apiversion=<value>      whisk API version
  --cert=<value>            client cert
  --debug=<value>           Debug level output
  --help                    Show help
  --key=<value>             client key
  --param=<value>...        parameter values in KEY VALUE format
  --version                 Show version

DESCRIPTION
  The Runtime Deployment Tool

ALIASES
  $ aio rt deploy
```

## `aio rt deploy export`

Exports managed project assets from Runtime to manifest and function files

```
USAGE
  $ aio rt deploy export -m <value> --projectname <value> [--cert <value>] [--key <value>] [--apiversion <value>]
    [--apihost <value>] [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure          bypass certificate check
  -m, --manifest=<value>  (required) the manifest file location
  -u, --auth=<value>      whisk auth
  -v, --verbose           Verbose output
  --apihost=<value>       whisk API host
  --apiversion=<value>    whisk API version
  --cert=<value>          client cert
  --debug=<value>         Debug level output
  --help                  Show help
  --key=<value>           client key
  --projectname=<value>   (required) the name of the project to be undeployed
  --version               Show version

DESCRIPTION
  Exports managed project assets from Runtime to manifest and function files

ALIASES
  $ aio rt deploy export
```

## `aio rt deploy report`

Provides a summary report of Runtime assets being deployed/undeployed based on manifest/deployment YAML

```
USAGE
  $ aio rt deploy report [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [-m <value>] [-d <value>]

FLAGS
  -d, --deployment=<value>  the deployment file location
  -i, --insecure            bypass certificate check
  -m, --manifest=<value>    the manifest file location
  -u, --auth=<value>        whisk auth
  -v, --verbose             Verbose output
  --apihost=<value>         whisk API host
  --apiversion=<value>      whisk API version
  --cert=<value>            client cert
  --debug=<value>           Debug level output
  --help                    Show help
  --key=<value>             client key
  --version                 Show version

DESCRIPTION
  Provides a summary report of Runtime assets being deployed/undeployed based on manifest/deployment YAML

ALIASES
  $ aio rt deploy report
```

## `aio rt deploy sync`

A tool to sync deployment and undeployment of Runtime packages using a manifest and optional deployment files using YAML

```
USAGE
  $ aio rt deploy sync [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [-m <value>] [-d <value>]

FLAGS
  -d, --deployment=<value>  the path to the deployment file
  -i, --insecure            bypass certificate check
  -m, --manifest=<value>    the manifest file location
  -u, --auth=<value>        whisk auth
  -v, --verbose             Verbose output
  --apihost=<value>         whisk API host
  --apiversion=<value>      whisk API version
  --cert=<value>            client cert
  --debug=<value>           Debug level output
  --help                    Show help
  --key=<value>             client key
  --version                 Show version

DESCRIPTION
  A tool to sync deployment and undeployment of Runtime packages using a manifest and optional deployment files using
  YAML

ALIASES
  $ aio rt deploy sync
```

## `aio rt deploy undeploy`

Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML

```
USAGE
  $ aio rt deploy undeploy [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [-m <value>] [--projectname <value>]

FLAGS
  -i, --insecure          bypass certificate check
  -m, --manifest=<value>  the manifest file location
  -u, --auth=<value>      whisk auth
  -v, --verbose           Verbose output
  --apihost=<value>       whisk API host
  --apiversion=<value>    whisk API version
  --cert=<value>          client cert
  --debug=<value>         Debug level output
  --help                  Show help
  --key=<value>           client key
  --projectname=<value>   the name of the project to be undeployed
  --version               Show version

DESCRIPTION
  Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML

ALIASES
  $ aio rt deploy undeploy
```

## `aio rt deploy version`

Prints the version number of aio runtime deploy

```
USAGE
  $ aio rt deploy version [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Prints the version number of aio runtime deploy

ALIASES
  $ aio rt deploy version
```

## `aio rt get`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio rt get [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json] [--name-sort] [-n]

FLAGS
  -i, --insecure        bypass certificate check
  -n, --name            sort results by name
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Get triggers, actions, and rules in the registry for namespace

ALIASES
  $ aio rt get
  $ aio runtime list
  $ aio rt list
  $ aio runtime ls
  $ aio rt ls
```

## `aio rt list`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio rt list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json] [--name-sort] [-n]

FLAGS
  -i, --insecure        bypass certificate check
  -n, --name            sort results by name
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Get triggers, actions, and rules in the registry for namespace

ALIASES
  $ aio rt get
  $ aio runtime list
  $ aio rt list
  $ aio runtime ls
  $ aio rt ls
```

## `aio rt log [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio rt log [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-d |  | [-a <value> | -m | -p <value>]] [-r] [--limit
    <value> | -l] [-t | -w | -o]

FLAGS
  -a, --action=<value>   Fetch logs for a specific action
  -d, --deployed         Fetch logs for all actions deployed under a specific package
  -i, --insecure         bypass certificate check
  -l, --last             retrieves the most recent activation logs
  -m, --manifest         Fetch logs for all actions in the manifest
  -o, --poll             Fetch logs continuously
  -p, --package=<value>  Fetch logs for a specific package in the manifest
  -r, --strip            strip timestamp information and output first line only
  -t, --tail             Fetch logs continuously
  -u, --auth=<value>     whisk auth
  -v, --verbose          Verbose output
  -w, --watch            Fetch logs continuously
  --apihost=<value>      whisk API host
  --apiversion=<value>   whisk API version
  --cert=<value>         client cert
  --debug=<value>        Debug level output
  --help                 Show help
  --key=<value>          client key
  --limit=<value>        return logs only from last LIMIT number of activations (min: 0, max: 50)
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime activation log
  $ aio runtime log
  $ aio runtime logs
  $ aio rt activation logs
  $ aio rt activation log
  $ aio rt log
  $ aio rt logs
```

## `aio rt logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio rt logs [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-d |  | [-a <value> | -m | -p <value>]] [-r] [--limit
    <value> | -l] [-t | -w | -o]

FLAGS
  -a, --action=<value>   Fetch logs for a specific action
  -d, --deployed         Fetch logs for all actions deployed under a specific package
  -i, --insecure         bypass certificate check
  -l, --last             retrieves the most recent activation logs
  -m, --manifest         Fetch logs for all actions in the manifest
  -o, --poll             Fetch logs continuously
  -p, --package=<value>  Fetch logs for a specific package in the manifest
  -r, --strip            strip timestamp information and output first line only
  -t, --tail             Fetch logs continuously
  -u, --auth=<value>     whisk auth
  -v, --verbose          Verbose output
  -w, --watch            Fetch logs continuously
  --apihost=<value>      whisk API host
  --apiversion=<value>   whisk API version
  --cert=<value>         client cert
  --debug=<value>        Debug level output
  --help                 Show help
  --key=<value>          client key
  --limit=<value>        return logs only from last LIMIT number of activations (min: 0, max: 50)
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime activation log
  $ aio runtime log
  $ aio runtime logs
  $ aio rt activation logs
  $ aio rt activation log
  $ aio rt log
  $ aio rt logs
```

## `aio rt ls`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio rt ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json] [--name-sort] [-n]

FLAGS
  -i, --insecure        bypass certificate check
  -n, --name            sort results by name
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Get triggers, actions, and rules in the registry for namespace

ALIASES
  $ aio rt get
  $ aio runtime list
  $ aio rt list
  $ aio runtime ls
  $ aio rt ls
```

## `aio rt namespace`

Manage your namespaces

```
USAGE
  $ aio rt namespace [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your namespaces

ALIASES
  $ aio runtime ns
  $ aio rt namespace
  $ aio rt ns
```

## `aio rt namespace lf`

Manage log forwarding settings

```
USAGE
  $ aio rt namespace lf [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage log forwarding settings

ALIASES
  $ aio runtime ns log-forwarding
  $ aio runtime ns lf
  $ aio runtime namespace lf
  $ aio rt namespace log-forwarding
  $ aio rt namespace lf
  $ aio rt ns log-forwarding
  $ aio rt ns lf
```

## `aio rt namespace lf errors`

Get log forwarding errors

```
USAGE
  $ aio rt namespace lf errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding errors

ALIASES
  $ aio runtime ns log-forwarding errors
  $ aio runtime ns lf errors
  $ aio runtime namespace lf errors
  $ aio rt namespace log-forwarding errors
  $ aio rt namespace lf errors
  $ aio rt ns log-forwarding errors
  $ aio rt ns lf errors
```

## `aio rt namespace lf get`

Get log forwarding destination configuration

```
USAGE
  $ aio rt namespace lf get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding destination configuration

ALIASES
  $ aio runtime ns log-forwarding get
  $ aio runtime ns lf get
  $ aio runtime namespace lf get
  $ aio rt namespace log-forwarding get
  $ aio rt namespace lf get
  $ aio rt ns log-forwarding get
  $ aio rt ns lf get
```

## `aio rt namespace lf set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio rt namespace lf set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Configure log forwarding destination (interactive)

ALIASES
  $ aio runtime ns log-forwarding set
  $ aio runtime ns lf set
  $ aio runtime namespace lf set
  $ aio rt namespace log-forwarding set
  $ aio rt namespace lf set
  $ aio rt ns log-forwarding set
  $ aio rt ns lf set
```

## `aio rt namespace lf set adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio rt namespace lf set adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

ALIASES
  $ aio runtime ns log-forwarding set adobe-io-runtime
  $ aio runtime ns lf set adobe-io-runtime
  $ aio runtime namespace lf set adobe-io-runtime
  $ aio rt namespace log-forwarding set adobe-io-runtime
  $ aio rt namespace lf set adobe-io-runtime
  $ aio rt ns log-forwarding set adobe-io-runtime
  $ aio rt ns lf set adobe-io-runtime
```

## `aio rt namespace lf set azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio rt namespace lf set azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
    [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure         bypass certificate check
  -u, --auth             whisk auth
  -v, --verbose          Verbose output
  --apihost              whisk API host
  --apiversion           whisk API version
  --cert                 client cert
  --customer-id=<value>  (required) Customer ID
  --debug=<value>        Debug level output
  --help                 Show help
  --key                  client key
  --log-type=<value>     (required) Log type
  --shared-key=<value>   (required) Shared key
  --version              Show version

DESCRIPTION
  Set log forwarding destination to Azure Log Analytics

ALIASES
  $ aio runtime ns log-forwarding set azure-log-analytics
  $ aio runtime ns lf set azure-log-analytics
  $ aio runtime namespace lf set azure-log-analytics
  $ aio rt namespace log-forwarding set azure-log-analytics
  $ aio rt namespace lf set azure-log-analytics
  $ aio rt ns log-forwarding set azure-log-analytics
  $ aio rt ns lf set azure-log-analytics
```

## `aio rt namespace lf set splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio rt namespace lf set splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
    [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --hec-token=<value>  (required) HEC token
  --help               Show help
  --host=<value>       (required) Host
  --index=<value>      (required) Index
  --key                client key
  --port=<value>       (required) Port
  --version            Show version

DESCRIPTION
  Set log forwarding destination to Splunk HEC

ALIASES
  $ aio runtime ns log-forwarding set splunk-hec
  $ aio runtime ns lf set splunk-hec
  $ aio runtime namespace lf set splunk-hec
  $ aio rt namespace log-forwarding set splunk-hec
  $ aio rt namespace lf set splunk-hec
  $ aio rt ns log-forwarding set splunk-hec
  $ aio rt ns lf set splunk-hec
```

## `aio rt namespace list`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio rt namespace list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Lists all of your namespaces for Adobe I/O Runtime

ALIASES
  $ aio runtime namespace ls
  $ aio runtime ns list
  $ aio runtime ns ls
  $ aio rt namespace list
  $ aio rt namespace ls
  $ aio rt ns list
  $ aio rt ns ls
```

## `aio rt namespace log-forwarding`

Manage log forwarding settings

```
USAGE
  $ aio rt namespace log-forwarding [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage log forwarding settings

ALIASES
  $ aio runtime ns log-forwarding
  $ aio runtime ns lf
  $ aio runtime namespace lf
  $ aio rt namespace log-forwarding
  $ aio rt namespace lf
  $ aio rt ns log-forwarding
  $ aio rt ns lf
```

## `aio rt namespace log-forwarding errors`

Get log forwarding errors

```
USAGE
  $ aio rt namespace log-forwarding errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding errors

ALIASES
  $ aio runtime ns log-forwarding errors
  $ aio runtime ns lf errors
  $ aio runtime namespace lf errors
  $ aio rt namespace log-forwarding errors
  $ aio rt namespace lf errors
  $ aio rt ns log-forwarding errors
  $ aio rt ns lf errors
```

## `aio rt namespace log-forwarding get`

Get log forwarding destination configuration

```
USAGE
  $ aio rt namespace log-forwarding get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding destination configuration

ALIASES
  $ aio runtime ns log-forwarding get
  $ aio runtime ns lf get
  $ aio runtime namespace lf get
  $ aio rt namespace log-forwarding get
  $ aio rt namespace lf get
  $ aio rt ns log-forwarding get
  $ aio rt ns lf get
```

## `aio rt namespace log-forwarding set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio rt namespace log-forwarding set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Configure log forwarding destination (interactive)

ALIASES
  $ aio runtime ns log-forwarding set
  $ aio runtime ns lf set
  $ aio runtime namespace lf set
  $ aio rt namespace log-forwarding set
  $ aio rt namespace lf set
  $ aio rt ns log-forwarding set
  $ aio rt ns lf set
```

## `aio rt namespace log-forwarding set adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio rt namespace log-forwarding set adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

ALIASES
  $ aio runtime ns log-forwarding set adobe-io-runtime
  $ aio runtime ns lf set adobe-io-runtime
  $ aio runtime namespace lf set adobe-io-runtime
  $ aio rt namespace log-forwarding set adobe-io-runtime
  $ aio rt namespace lf set adobe-io-runtime
  $ aio rt ns log-forwarding set adobe-io-runtime
  $ aio rt ns lf set adobe-io-runtime
```

## `aio rt namespace log-forwarding set azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio rt namespace log-forwarding set azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
    [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure         bypass certificate check
  -u, --auth             whisk auth
  -v, --verbose          Verbose output
  --apihost              whisk API host
  --apiversion           whisk API version
  --cert                 client cert
  --customer-id=<value>  (required) Customer ID
  --debug=<value>        Debug level output
  --help                 Show help
  --key                  client key
  --log-type=<value>     (required) Log type
  --shared-key=<value>   (required) Shared key
  --version              Show version

DESCRIPTION
  Set log forwarding destination to Azure Log Analytics

ALIASES
  $ aio runtime ns log-forwarding set azure-log-analytics
  $ aio runtime ns lf set azure-log-analytics
  $ aio runtime namespace lf set azure-log-analytics
  $ aio rt namespace log-forwarding set azure-log-analytics
  $ aio rt namespace lf set azure-log-analytics
  $ aio rt ns log-forwarding set azure-log-analytics
  $ aio rt ns lf set azure-log-analytics
```

## `aio rt namespace log-forwarding set splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio rt namespace log-forwarding set splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
    [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --hec-token=<value>  (required) HEC token
  --help               Show help
  --host=<value>       (required) Host
  --index=<value>      (required) Index
  --key                client key
  --port=<value>       (required) Port
  --version            Show version

DESCRIPTION
  Set log forwarding destination to Splunk HEC

ALIASES
  $ aio runtime ns log-forwarding set splunk-hec
  $ aio runtime ns lf set splunk-hec
  $ aio runtime namespace lf set splunk-hec
  $ aio rt namespace log-forwarding set splunk-hec
  $ aio rt namespace lf set splunk-hec
  $ aio rt ns log-forwarding set splunk-hec
  $ aio rt ns lf set splunk-hec
```

## `aio rt namespace ls`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio rt namespace ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Lists all of your namespaces for Adobe I/O Runtime

ALIASES
  $ aio runtime namespace ls
  $ aio runtime ns list
  $ aio runtime ns ls
  $ aio rt namespace list
  $ aio rt namespace ls
  $ aio rt ns list
  $ aio rt ns ls
```

## `aio rt ns`

Manage your namespaces

```
USAGE
  $ aio rt ns [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your namespaces

ALIASES
  $ aio runtime ns
  $ aio rt namespace
  $ aio rt ns
```

## `aio rt ns lf`

Manage log forwarding settings

```
USAGE
  $ aio rt ns lf [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage log forwarding settings

ALIASES
  $ aio runtime ns log-forwarding
  $ aio runtime ns lf
  $ aio runtime namespace lf
  $ aio rt namespace log-forwarding
  $ aio rt namespace lf
  $ aio rt ns log-forwarding
  $ aio rt ns lf
```

## `aio rt ns lf errors`

Get log forwarding errors

```
USAGE
  $ aio rt ns lf errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding errors

ALIASES
  $ aio runtime ns log-forwarding errors
  $ aio runtime ns lf errors
  $ aio runtime namespace lf errors
  $ aio rt namespace log-forwarding errors
  $ aio rt namespace lf errors
  $ aio rt ns log-forwarding errors
  $ aio rt ns lf errors
```

## `aio rt ns lf get`

Get log forwarding destination configuration

```
USAGE
  $ aio rt ns lf get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding destination configuration

ALIASES
  $ aio runtime ns log-forwarding get
  $ aio runtime ns lf get
  $ aio runtime namespace lf get
  $ aio rt namespace log-forwarding get
  $ aio rt namespace lf get
  $ aio rt ns log-forwarding get
  $ aio rt ns lf get
```

## `aio rt ns lf set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio rt ns lf set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Configure log forwarding destination (interactive)

ALIASES
  $ aio runtime ns log-forwarding set
  $ aio runtime ns lf set
  $ aio runtime namespace lf set
  $ aio rt namespace log-forwarding set
  $ aio rt namespace lf set
  $ aio rt ns log-forwarding set
  $ aio rt ns lf set
```

## `aio rt ns lf set adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio rt ns lf set adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

ALIASES
  $ aio runtime ns log-forwarding set adobe-io-runtime
  $ aio runtime ns lf set adobe-io-runtime
  $ aio runtime namespace lf set adobe-io-runtime
  $ aio rt namespace log-forwarding set adobe-io-runtime
  $ aio rt namespace lf set adobe-io-runtime
  $ aio rt ns log-forwarding set adobe-io-runtime
  $ aio rt ns lf set adobe-io-runtime
```

## `aio rt ns lf set azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio rt ns lf set azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
    [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure         bypass certificate check
  -u, --auth             whisk auth
  -v, --verbose          Verbose output
  --apihost              whisk API host
  --apiversion           whisk API version
  --cert                 client cert
  --customer-id=<value>  (required) Customer ID
  --debug=<value>        Debug level output
  --help                 Show help
  --key                  client key
  --log-type=<value>     (required) Log type
  --shared-key=<value>   (required) Shared key
  --version              Show version

DESCRIPTION
  Set log forwarding destination to Azure Log Analytics

ALIASES
  $ aio runtime ns log-forwarding set azure-log-analytics
  $ aio runtime ns lf set azure-log-analytics
  $ aio runtime namespace lf set azure-log-analytics
  $ aio rt namespace log-forwarding set azure-log-analytics
  $ aio rt namespace lf set azure-log-analytics
  $ aio rt ns log-forwarding set azure-log-analytics
  $ aio rt ns lf set azure-log-analytics
```

## `aio rt ns lf set splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio rt ns lf set splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
    [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --hec-token=<value>  (required) HEC token
  --help               Show help
  --host=<value>       (required) Host
  --index=<value>      (required) Index
  --key                client key
  --port=<value>       (required) Port
  --version            Show version

DESCRIPTION
  Set log forwarding destination to Splunk HEC

ALIASES
  $ aio runtime ns log-forwarding set splunk-hec
  $ aio runtime ns lf set splunk-hec
  $ aio runtime namespace lf set splunk-hec
  $ aio rt namespace log-forwarding set splunk-hec
  $ aio rt namespace lf set splunk-hec
  $ aio rt ns log-forwarding set splunk-hec
  $ aio rt ns lf set splunk-hec
```

## `aio rt ns list`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio rt ns list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Lists all of your namespaces for Adobe I/O Runtime

ALIASES
  $ aio runtime namespace ls
  $ aio runtime ns list
  $ aio runtime ns ls
  $ aio rt namespace list
  $ aio rt namespace ls
  $ aio rt ns list
  $ aio rt ns ls
```

## `aio rt ns log-forwarding`

Manage log forwarding settings

```
USAGE
  $ aio rt ns log-forwarding [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage log forwarding settings

ALIASES
  $ aio runtime ns log-forwarding
  $ aio runtime ns lf
  $ aio runtime namespace lf
  $ aio rt namespace log-forwarding
  $ aio rt namespace lf
  $ aio rt ns log-forwarding
  $ aio rt ns lf
```

## `aio rt ns log-forwarding errors`

Get log forwarding errors

```
USAGE
  $ aio rt ns log-forwarding errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding errors

ALIASES
  $ aio runtime ns log-forwarding errors
  $ aio runtime ns lf errors
  $ aio runtime namespace lf errors
  $ aio rt namespace log-forwarding errors
  $ aio rt namespace lf errors
  $ aio rt ns log-forwarding errors
  $ aio rt ns lf errors
```

## `aio rt ns log-forwarding get`

Get log forwarding destination configuration

```
USAGE
  $ aio rt ns log-forwarding get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding destination configuration

ALIASES
  $ aio runtime ns log-forwarding get
  $ aio runtime ns lf get
  $ aio runtime namespace lf get
  $ aio rt namespace log-forwarding get
  $ aio rt namespace lf get
  $ aio rt ns log-forwarding get
  $ aio rt ns lf get
```

## `aio rt ns log-forwarding set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio rt ns log-forwarding set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Configure log forwarding destination (interactive)

ALIASES
  $ aio runtime ns log-forwarding set
  $ aio runtime ns lf set
  $ aio runtime namespace lf set
  $ aio rt namespace log-forwarding set
  $ aio rt namespace lf set
  $ aio rt ns log-forwarding set
  $ aio rt ns lf set
```

## `aio rt ns log-forwarding set adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio rt ns log-forwarding set adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

ALIASES
  $ aio runtime ns log-forwarding set adobe-io-runtime
  $ aio runtime ns lf set adobe-io-runtime
  $ aio runtime namespace lf set adobe-io-runtime
  $ aio rt namespace log-forwarding set adobe-io-runtime
  $ aio rt namespace lf set adobe-io-runtime
  $ aio rt ns log-forwarding set adobe-io-runtime
  $ aio rt ns lf set adobe-io-runtime
```

## `aio rt ns log-forwarding set azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio rt ns log-forwarding set azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
    [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure         bypass certificate check
  -u, --auth             whisk auth
  -v, --verbose          Verbose output
  --apihost              whisk API host
  --apiversion           whisk API version
  --cert                 client cert
  --customer-id=<value>  (required) Customer ID
  --debug=<value>        Debug level output
  --help                 Show help
  --key                  client key
  --log-type=<value>     (required) Log type
  --shared-key=<value>   (required) Shared key
  --version              Show version

DESCRIPTION
  Set log forwarding destination to Azure Log Analytics

ALIASES
  $ aio runtime ns log-forwarding set azure-log-analytics
  $ aio runtime ns lf set azure-log-analytics
  $ aio runtime namespace lf set azure-log-analytics
  $ aio rt namespace log-forwarding set azure-log-analytics
  $ aio rt namespace lf set azure-log-analytics
  $ aio rt ns log-forwarding set azure-log-analytics
  $ aio rt ns lf set azure-log-analytics
```

## `aio rt ns log-forwarding set splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio rt ns log-forwarding set splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
    [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --hec-token=<value>  (required) HEC token
  --help               Show help
  --host=<value>       (required) Host
  --index=<value>      (required) Index
  --key                client key
  --port=<value>       (required) Port
  --version            Show version

DESCRIPTION
  Set log forwarding destination to Splunk HEC

ALIASES
  $ aio runtime ns log-forwarding set splunk-hec
  $ aio runtime ns lf set splunk-hec
  $ aio runtime namespace lf set splunk-hec
  $ aio rt namespace log-forwarding set splunk-hec
  $ aio rt namespace lf set splunk-hec
  $ aio rt ns log-forwarding set splunk-hec
  $ aio rt ns lf set splunk-hec
```

## `aio rt ns ls`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio rt ns ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Lists all of your namespaces for Adobe I/O Runtime

ALIASES
  $ aio runtime namespace ls
  $ aio runtime ns list
  $ aio runtime ns ls
  $ aio rt namespace list
  $ aio rt namespace ls
  $ aio rt ns list
  $ aio rt ns ls
```

## `aio rt package`

Manage your packages

```
USAGE
  $ aio rt package [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your packages

ALIASES
  $ aio runtime pkg
  $ aio rt package
  $ aio rt pkg
```

## `aio rt package bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
USAGE
  $ aio rt package bind PACKAGENAME BINDPACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>]
    [--apihost <value>] [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --version                      Show version

DESCRIPTION
  Bind parameters to a package

ALIASES
  $ aio runtime pkg bind
  $ aio rt package bind
  $ aio rt pkg bind
```

## `aio rt package create PACKAGENAME`

Creates a Package

```
USAGE
  $ aio rt package create PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [--shared true|yes|false|no] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --shared=<option>              parameter to be passed to indicate whether package is shared or private
                                 <options: true|yes|false|no>
  --version                      Show version

DESCRIPTION
  Creates a Package

ALIASES
  $ aio runtime pkg create
  $ aio rt package create
  $ aio rt pkg create
```

## `aio rt package delete PACKAGENAME`

Deletes a Package

```
USAGE
  $ aio rt package delete PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [--json] [-r]

FLAGS
  -i, --insecure        bypass certificate check
  -r, --recursive       Deletes all associated actions (and rules & triggers associated with the actions)
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Deletes a Package

ALIASES
  $ aio runtime pkg delete
  $ aio rt package delete
  $ aio rt pkg delete
```

## `aio rt package get PACKAGENAME`

Retrieves a Package

```
USAGE
  $ aio rt package get PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Retrieves a Package

ALIASES
  $ aio runtime pkg get
  $ aio rt package get
  $ aio rt pkg get
```

## `aio rt package list [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio rt package list [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of packages from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Packages

ALIASES
  $ aio runtime package ls
  $ aio runtime pkg list
  $ aio runtime pkg ls
  $ aio rt package list
  $ aio rt package ls
  $ aio rt pkg list
  $ aio rt pkg ls
```

## `aio rt package ls [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio rt package ls [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of packages from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Packages

ALIASES
  $ aio runtime package ls
  $ aio runtime pkg list
  $ aio runtime pkg ls
  $ aio rt package list
  $ aio rt package ls
  $ aio rt pkg list
  $ aio rt pkg ls
```

## `aio rt package update PACKAGENAME`

Updates a Package

```
USAGE
  $ aio rt package update PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [--shared true|yes|false|no] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --shared=<option>              parameter to be passed to indicate whether package is shared or private
                                 <options: true|yes|false|no>
  --version                      Show version

DESCRIPTION
  Updates a Package

ALIASES
  $ aio runtime pkg update
  $ aio rt package update
  $ aio rt pkg update
```

## `aio rt pkg`

Manage your packages

```
USAGE
  $ aio rt pkg [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your packages

ALIASES
  $ aio runtime pkg
  $ aio rt package
  $ aio rt pkg
```

## `aio rt pkg bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
USAGE
  $ aio rt pkg bind PACKAGENAME BINDPACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>]
    [--apihost <value>] [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --version                      Show version

DESCRIPTION
  Bind parameters to a package

ALIASES
  $ aio runtime pkg bind
  $ aio rt package bind
  $ aio rt pkg bind
```

## `aio rt pkg create PACKAGENAME`

Creates a Package

```
USAGE
  $ aio rt pkg create PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [--shared true|yes|false|no] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --shared=<option>              parameter to be passed to indicate whether package is shared or private
                                 <options: true|yes|false|no>
  --version                      Show version

DESCRIPTION
  Creates a Package

ALIASES
  $ aio runtime pkg create
  $ aio rt package create
  $ aio rt pkg create
```

## `aio rt pkg delete PACKAGENAME`

Deletes a Package

```
USAGE
  $ aio rt pkg delete PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [--json] [-r]

FLAGS
  -i, --insecure        bypass certificate check
  -r, --recursive       Deletes all associated actions (and rules & triggers associated with the actions)
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Deletes a Package

ALIASES
  $ aio runtime pkg delete
  $ aio rt package delete
  $ aio rt pkg delete
```

## `aio rt pkg get PACKAGENAME`

Retrieves a Package

```
USAGE
  $ aio rt pkg get PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Retrieves a Package

ALIASES
  $ aio runtime pkg get
  $ aio rt package get
  $ aio rt pkg get
```

## `aio rt pkg list [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio rt pkg list [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of packages from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Packages

ALIASES
  $ aio runtime package ls
  $ aio runtime pkg list
  $ aio runtime pkg ls
  $ aio rt package list
  $ aio rt package ls
  $ aio rt pkg list
  $ aio rt pkg ls
```

## `aio rt pkg ls [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio rt pkg ls [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of packages from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Packages

ALIASES
  $ aio runtime package ls
  $ aio runtime pkg list
  $ aio runtime pkg ls
  $ aio rt package list
  $ aio rt package ls
  $ aio rt pkg list
  $ aio rt pkg ls
```

## `aio rt pkg update PACKAGENAME`

Updates a Package

```
USAGE
  $ aio rt pkg update PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [--shared true|yes|false|no] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --shared=<option>              parameter to be passed to indicate whether package is shared or private
                                 <options: true|yes|false|no>
  --version                      Show version

DESCRIPTION
  Updates a Package

ALIASES
  $ aio runtime pkg update
  $ aio rt package update
  $ aio rt pkg update
```

## `aio rt prop`

Execute property commands

```
USAGE
  $ aio rt prop [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Execute property commands

ALIASES
  $ aio runtime prop
  $ aio rt prop
  $ aio rt property
```

## `aio rt prop get`

get property

```
USAGE
  $ aio rt prop get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace] [--all] [--apibuild] [--apibuildno] [--cliversion]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --all            all properties
  --apibuild       whisk API build version
  --apibuildno     whisk API build number
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --cliversion     whisk CLI version
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --namespace      whisk namespace
  --version        Show version

DESCRIPTION
  get property

ALIASES
  $ aio runtime prop get
  $ aio rt property get
  $ aio rt prop get
```

## `aio rt prop set`

set property

```
USAGE
  $ aio rt prop set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace <value>]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --key                client key
  --namespace=<value>  whisk namespace
  --version            Show version

DESCRIPTION
  set property

ALIASES
  $ aio runtime prop set
  $ aio rt property set
  $ aio rt prop set
```

## `aio rt prop unset`

unset property

```
USAGE
  $ aio rt prop unset [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --namespace      whisk namespace
  --version        Show version

DESCRIPTION
  unset property

ALIASES
  $ aio runtime prop unset
  $ aio rt property unset
  $ aio rt prop unset
```

## `aio rt property`

Execute property commands

```
USAGE
  $ aio rt property [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Execute property commands

ALIASES
  $ aio runtime prop
  $ aio rt prop
  $ aio rt property
```

## `aio rt property get`

get property

```
USAGE
  $ aio rt property get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace] [--all] [--apibuild] [--apibuildno] [--cliversion]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --all            all properties
  --apibuild       whisk API build version
  --apibuildno     whisk API build number
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --cliversion     whisk CLI version
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --namespace      whisk namespace
  --version        Show version

DESCRIPTION
  get property

ALIASES
  $ aio runtime prop get
  $ aio rt property get
  $ aio rt prop get
```

## `aio rt property set`

set property

```
USAGE
  $ aio rt property set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace <value>]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --key                client key
  --namespace=<value>  whisk namespace
  --version            Show version

DESCRIPTION
  set property

ALIASES
  $ aio runtime prop set
  $ aio rt property set
  $ aio rt prop set
```

## `aio rt property unset`

unset property

```
USAGE
  $ aio rt property unset [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --namespace      whisk namespace
  --version        Show version

DESCRIPTION
  unset property

ALIASES
  $ aio runtime prop unset
  $ aio rt property unset
  $ aio rt prop unset
```

## `aio rt route create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`

create a new api route

```
USAGE
  $ aio rt route create [BASEPATH] [RELPATH] [APIVERB] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
    [--debug <value>] [-v] [--version] [--help] [-n <value> | -c <value>] [-r html|http|json|text|svg|json | ]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb
  ACTION    The action to call

FLAGS
  -c, --config-file=<value>     file containing API configuration in swagger JSON format
  -i, --insecure                bypass certificate check
  -n, --apiname=<value>         Friendly name of the API; ignored when CFG_FILE is specified (default BASE_PATH)
  -r, --response-type=<option>  [default: json] Set the web action response TYPE.
                                <options: html|http|json|text|svg|json>
  -u, --auth                    whisk auth
  -v, --verbose                 Verbose output
  --apihost                     whisk API host
  --apiversion                  whisk API version
  --cert                        client cert
  --debug=<value>               Debug level output
  --help                        Show help
  --key                         client key
  --version                     Show version

DESCRIPTION
  create a new api route

ALIASES
  $ aio runtime api create
  $ aio rt route create
  $ aio rt api create
```

## `aio rt route delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
USAGE
  $ aio rt route delete BASEPATHORAPINAME [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
    [--debug <value>] [-v] [--version] [--help]

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name
  RELPATH            The path of the api relative to the base path
  APIVERB            (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  delete an API

ALIASES
  $ aio runtime api delete
  $ aio rt route delete
  $ aio rt api delete
```

## `aio rt route get BASEPATHORAPINAME`

get API details

```
USAGE
  $ aio rt route get BASEPATHORAPINAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
    [-v] [--version] [--help]

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  get API details

ALIASES
  $ aio runtime api get
  $ aio rt route get
  $ aio rt api get
```

## `aio rt route list [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio rt route list [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--json]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  only return LIMIT number of triggers
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --version            Show version

DESCRIPTION
  list route/apis for Adobe I/O Runtime

ALIASES
  $ aio runtime route ls
  $ aio runtime api list
  $ aio runtime api ls
  $ aio rt route list
  $ aio rt route ls
  $ aio rt api list
  $ aio rt api ls
```

## `aio rt route ls [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio rt route ls [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--json]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  only return LIMIT number of triggers
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --version            Show version

DESCRIPTION
  list route/apis for Adobe I/O Runtime

ALIASES
  $ aio runtime route ls
  $ aio runtime api list
  $ aio runtime api ls
  $ aio rt route list
  $ aio rt route ls
  $ aio rt api list
  $ aio rt api ls
```

## `aio rt rule`

Manage your rules

```
USAGE
  $ aio rt rule [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your rules

ALIASES
  $ aio rt rule
```

## `aio rt rule create NAME TRIGGER ACTION`

Create a Rule

```
USAGE
  $ aio rt rule create NAME TRIGGER ACTION [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
    [-v] [--version] [--help] [--json]

ARGUMENTS
  NAME     Name of the rule
  TRIGGER  Name of the trigger
  ACTION   Name of the action

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --json           output raw json
  --key            client key
  --version        Show version

DESCRIPTION
  Create a Rule

ALIASES
  $ aio rt rule create
```

## `aio rt rule delete NAME`

Delete a Rule

```
USAGE
  $ aio rt rule delete NAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--json]

ARGUMENTS
  NAME  Name of the rule

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --json           output raw json
  --key            client key
  --version        Show version

DESCRIPTION
  Delete a Rule

ALIASES
  $ aio rt rule delete
```

## `aio rt rule disable NAME`

Disable a Rule

```
USAGE
  $ aio rt rule disable NAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

ARGUMENTS
  NAME  Name of the rule

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Disable a Rule

ALIASES
  $ aio rt rule disable
```

## `aio rt rule enable NAME`

Enable a Rule

```
USAGE
  $ aio rt rule enable NAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

ARGUMENTS
  NAME  Name of the rule

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Enable a Rule

ALIASES
  $ aio rt rule enable
```

## `aio rt rule get NAME`

Retrieves a Rule

```
USAGE
  $ aio rt rule get NAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

ARGUMENTS
  NAME  Name of the rule

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Retrieves a Rule

ALIASES
  $ aio rt rule get
```

## `aio rt rule list`

Retrieves a list of Rules

```
USAGE
  $ aio rt rule list [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of rules
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  Limit number of rules returned (min: 0, max: 50)
  -n, --name           sort results by name
  -s, --skip=<value>   Skip number of rules returned
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --name-sort          sort results by name
  --version            Show version

DESCRIPTION
  Retrieves a list of Rules

ALIASES
  $ aio runtime rule ls
  $ aio rt rule list
  $ aio rt rule ls
```

## `aio rt rule ls`

Retrieves a list of Rules

```
USAGE
  $ aio rt rule ls [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of rules
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  Limit number of rules returned (min: 0, max: 50)
  -n, --name           sort results by name
  -s, --skip=<value>   Skip number of rules returned
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --name-sort          sort results by name
  --version            Show version

DESCRIPTION
  Retrieves a list of Rules

ALIASES
  $ aio runtime rule ls
  $ aio rt rule list
  $ aio rt rule ls
```

## `aio rt rule status NAME`

Gets the status of a rule

```
USAGE
  $ aio rt rule status NAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

ARGUMENTS
  NAME  Name of the rule

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Gets the status of a rule

ALIASES
  $ aio rt rule status
```

## `aio rt rule update NAME TRIGGER ACTION`

Update a Rule

```
USAGE
  $ aio rt rule update NAME TRIGGER ACTION [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
    [-v] [--version] [--help] [--json]

ARGUMENTS
  NAME     Name of the rule
  TRIGGER  Name of the trigger
  ACTION   Name of the action

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --json           output raw json
  --key            client key
  --version        Show version

DESCRIPTION
  Update a Rule

ALIASES
  $ aio rt rule update
```

## `aio rt trigger`

Manage your triggers

```
USAGE
  $ aio rt trigger [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your triggers

ALIASES
  $ aio rt trigger
```

## `aio rt trigger create TRIGGERNAME`

Create a trigger for Adobe I/O Runtime

```
USAGE
  $ aio rt trigger create TRIGGERNAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help] [-p <value>] [-P <value>] [-a <value>] [-A <value>] [-f <value>]

ARGUMENTS
  TRIGGERNAME  The name of the trigger

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       FILE containing parameter values in JSON format
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -f, --feed=<value>             trigger feed ACTION_NAME
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameter values in KEY VALUE format
  -u, --auth                     whisk auth
  -v, --verbose                  Verbose output
  --apihost                      whisk API host
  --apiversion                   whisk API version
  --cert                         client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --key                          client key
  --version                      Show version

DESCRIPTION
  Create a trigger for Adobe I/O Runtime

ALIASES
  $ aio rt trigger create
```

## `aio rt trigger delete TRIGGERPATH`

Delete a trigger for Adobe I/O Runtime

```
USAGE
  $ aio rt trigger delete TRIGGERPATH [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

ARGUMENTS
  TRIGGERPATH  The name of the trigger, in the format /NAMESPACE/NAME

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Delete a trigger for Adobe I/O Runtime

ALIASES
  $ aio rt trigger delete
```

## `aio rt trigger fire TRIGGERNAME`

Fire a trigger for Adobe I/O Runtime

```
USAGE
  $ aio rt trigger fire TRIGGERNAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help] [-p <value>] [-P <value>]

ARGUMENTS
  TRIGGERNAME  The name of the trigger

FLAGS
  -P, --param-file=<value>  FILE containing parameter values in JSON format
  -i, --insecure            bypass certificate check
  -p, --param=<value>...    parameter values in KEY VALUE format
  -u, --auth                whisk auth
  -v, --verbose             Verbose output
  --apihost                 whisk API host
  --apiversion              whisk API version
  --cert                    client cert
  --debug=<value>           Debug level output
  --help                    Show help
  --key                     client key
  --version                 Show version

DESCRIPTION
  Fire a trigger for Adobe I/O Runtime

ALIASES
  $ aio rt trigger fire
```

## `aio rt trigger get TRIGGERPATH`

Get a trigger for Adobe I/O Runtime

```
USAGE
  $ aio rt trigger get TRIGGERPATH [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

ARGUMENTS
  TRIGGERPATH  The name/path of the trigger, in the format /NAMESPACE/NAME

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get a trigger for Adobe I/O Runtime

ALIASES
  $ aio rt trigger get
```

## `aio rt trigger list`

Lists all of your triggers for Adobe I/O Runtime

```
USAGE
  $ aio rt trigger list [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of triggers
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  [default: 30] only return LIMIT number of triggers (min: 0, max: 50)
  -n, --name           sort results by name
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --name-sort          sort results by name
  --version            Show version

DESCRIPTION
  Lists all of your triggers for Adobe I/O Runtime

ALIASES
  $ aio runtime trigger ls
  $ aio rt trigger list
  $ aio rt trigger ls
```

## `aio rt trigger ls`

Lists all of your triggers for Adobe I/O Runtime

```
USAGE
  $ aio rt trigger ls [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of triggers
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  [default: 30] only return LIMIT number of triggers (min: 0, max: 50)
  -n, --name           sort results by name
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --name-sort          sort results by name
  --version            Show version

DESCRIPTION
  Lists all of your triggers for Adobe I/O Runtime

ALIASES
  $ aio runtime trigger ls
  $ aio rt trigger list
  $ aio rt trigger ls
```

## `aio rt trigger update TRIGGERNAME`

Update or create a trigger for Adobe I/O Runtime

```
USAGE
  $ aio rt trigger update TRIGGERNAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help] [-p <value>] [-P <value>] [-a <value>] [-A <value>]

ARGUMENTS
  TRIGGERNAME  The name of the trigger

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       FILE containing parameter values in JSON format
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameter values in KEY VALUE format
  -u, --auth                     whisk auth
  -v, --verbose                  Verbose output
  --apihost                      whisk API host
  --apiversion                   whisk API version
  --cert                         client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --key                          client key
  --version                      Show version

DESCRIPTION
  Update or create a trigger for Adobe I/O Runtime

ALIASES
  $ aio rt trigger update
```

## `aio runtime`

Execute runtime commands

```
USAGE
  $ aio runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Execute runtime commands

ALIASES
  $ aio rt
```

_See code: [src/commands/runtime/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.2/src/commands/runtime/index.js)_

## `aio runtime action`

Manage your actions

```
USAGE
  $ aio runtime action [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your actions

ALIASES
  $ aio rt action
```

## `aio runtime action create ACTIONNAME [ACTIONPATH]`

Creates an Action

```
USAGE
  $ aio runtime action create ACTIONNAME [ACTIONPATH] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost
    <value>] [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [--copy <value>] [-e <value>]
    [--web-secure <value> --web true|yes|false|no|raw] [-P <value>] [-E <value>] [-t <value>] [-m <value>] [-l <value>]
    [--kind <value>] [-a <value>] [-A <value>] [--sequence <value>] [--docker <value>] [--main <value>] [--binary]
    [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -E, --env-file=<value>         FILE containing environment variables in JSON format
  -P, --param-file=<value>       FILE containing parameter values in JSON format
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -e, --env=<value>...           environment values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -l, --logsize=<value>          the maximum log size LIMIT in MB for the action (default 10, min: 0, max: 10)
  -m, --memory=<value>           the maximum memory LIMIT in MB for the action (default 256, min: 128, max: 4096)
  -p, --param=<value>...         parameter values in KEY VALUE format
  -t, --timeout=<value>          the timeout LIMIT in milliseconds after which the action is terminated (default 60000,
                                 min: 100, max: 3600000)
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --binary                       treat code artifact as binary
  --cert=<value>                 client cert
  --copy=<value>                 copy an existing action
  --debug=<value>                Debug level output
  --docker=<value>               [Restricted Access] use provided Docker image (a path on DockerHub) to run the action
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --kind=<value>                 the KIND of the action runtime (example: swift:default, nodejs:default)
  --main=<value>                 the name of the action entry point (function or fully-qualified method name when
                                 applicable)
  --sequence=<value>             treat ACTION as comma separated sequence of actions to invoke
  --version                      Show version
  --web=<option>                 treat ACTION as a web action or as a raw HTTP web action
                                 <options: true|yes|false|no|raw>
  --web-secure=<value>           secure the web action (valid values are true, false, or any string)

DESCRIPTION
  Creates an Action

ALIASES
  $ aio rt action create
```

## `aio runtime action del ACTIONNAME`

Deletes an Action

```
USAGE
  $ aio runtime action del ACTIONNAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Deletes an Action

ALIASES
  $ aio runtime action del
  $ aio rt action delete
  $ aio rt action del
```

## `aio runtime action delete ACTIONNAME`

Deletes an Action

```
USAGE
  $ aio runtime action delete ACTIONNAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Deletes an Action

ALIASES
  $ aio runtime action del
  $ aio rt action delete
  $ aio rt action del
```

## `aio runtime action get ACTIONNAME`

Retrieves an Action

```
USAGE
  $ aio runtime action get ACTIONNAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-r] [-c] [--save] [--save-as <value>]

FLAGS
  -c, --code            show action code (only works if code is not a zip file)
  -i, --insecure        bypass certificate check
  -r, --url             get action url
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --key=<value>         client key
  --save                save action code to file corresponding with action name
  --save-as=<value>     file to save action code to
  --version             Show version

DESCRIPTION
  Retrieves an Action

ALIASES
  $ aio rt action get
```

## `aio runtime action invoke ACTIONNAME`

Invokes an Action

```
USAGE
  $ aio runtime action invoke ACTIONNAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [-b] [-r]

FLAGS
  -P, --param-file=<value>  FILE containing parameter values in JSON format
  -b, --blocking            blocking invoke
  -i, --insecure            bypass certificate check
  -p, --param=<value>...    parameter values in KEY VALUE format
  -r, --result              blocking invoke; show only activation result (unless there is a failure)
  -u, --auth=<value>        whisk auth
  -v, --verbose             Verbose output
  --apihost=<value>         whisk API host
  --apiversion=<value>      whisk API version
  --cert=<value>            client cert
  --debug=<value>           Debug level output
  --help                    Show help
  --key=<value>             client key
  --version                 Show version

DESCRIPTION
  Invokes an Action

ALIASES
  $ aio rt action invoke
```

## `aio runtime action list [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio runtime action list [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of actions from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Actions

ALIASES
  $ aio runtime action ls
  $ aio runtime actions list
  $ aio runtime actions ls
  $ aio rt action list
  $ aio rt actions list
  $ aio rt action ls
  $ aio rt actions ls
```

## `aio runtime action ls [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio runtime action ls [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of actions from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Actions

ALIASES
  $ aio runtime action ls
  $ aio runtime actions list
  $ aio runtime actions ls
  $ aio rt action list
  $ aio rt actions list
  $ aio rt action ls
  $ aio rt actions ls
```

## `aio runtime action update ACTIONNAME [ACTIONPATH]`

Updates an Action

```
USAGE
  $ aio runtime action update ACTIONNAME [ACTIONPATH] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost
    <value>] [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [--copy <value>] [-e <value>]
    [--web-secure <value> --web true|yes|false|no|raw] [-P <value>] [-E <value>] [-t <value>] [-m <value>] [-l <value>]
    [--kind <value>] [-a <value>] [-A <value>] [--sequence <value>] [--docker <value>] [--main <value>] [--binary]
    [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -E, --env-file=<value>         FILE containing environment variables in JSON format
  -P, --param-file=<value>       FILE containing parameter values in JSON format
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -e, --env=<value>...           environment values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -l, --logsize=<value>          the maximum log size LIMIT in MB for the action (default 10, min: 0, max: 10)
  -m, --memory=<value>           the maximum memory LIMIT in MB for the action (default 256, min: 128, max: 4096)
  -p, --param=<value>...         parameter values in KEY VALUE format
  -t, --timeout=<value>          the timeout LIMIT in milliseconds after which the action is terminated (default 60000,
                                 min: 100, max: 3600000)
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --binary                       treat code artifact as binary
  --cert=<value>                 client cert
  --copy=<value>                 copy an existing action
  --debug=<value>                Debug level output
  --docker=<value>               [Restricted Access] use provided Docker image (a path on DockerHub) to run the action
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --kind=<value>                 the KIND of the action runtime (example: swift:default, nodejs:default)
  --main=<value>                 the name of the action entry point (function or fully-qualified method name when
                                 applicable)
  --sequence=<value>             treat ACTION as comma separated sequence of actions to invoke
  --version                      Show version
  --web=<option>                 treat ACTION as a web action or as a raw HTTP web action
                                 <options: true|yes|false|no|raw>
  --web-secure=<value>           secure the web action (valid values are true, false, or any string)

DESCRIPTION
  Updates an Action

ALIASES
  $ aio rt action update
```

## `aio runtime actions list [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio runtime actions list [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of actions from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Actions

ALIASES
  $ aio runtime action ls
  $ aio runtime actions list
  $ aio runtime actions ls
  $ aio rt action list
  $ aio rt actions list
  $ aio rt action ls
  $ aio rt actions ls
```

## `aio runtime actions ls [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio runtime actions ls [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of actions from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Actions

ALIASES
  $ aio runtime action ls
  $ aio runtime actions list
  $ aio runtime actions ls
  $ aio rt action list
  $ aio rt actions list
  $ aio rt action ls
  $ aio rt actions ls
```

## `aio runtime activation`

Manage your activations

```
USAGE
  $ aio runtime activation [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your activations

ALIASES
  $ aio rt activation
```

## `aio runtime activation get [ACTIVATIONID]`

Retrieves an Activation

```
USAGE
  $ aio runtime activation get [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l] [-g]

FLAGS
  -g, --logs            emit only the logs, stripped of time stamps and stream identifier
  -i, --insecure        bypass certificate check
  -l, --last            retrieves the most recent activation
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Retrieves an Activation

ALIASES
  $ aio rt activation get
```

## `aio runtime activation list [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio runtime activation list [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations (min: 0, max: 50)
  -s, --skip=<value>    exclude the first SKIP number of activations from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --since=<value>       return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan
                        1970
  --upto=<value>        return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan
                        1970
  --version             Show version

DESCRIPTION
  Lists all the Activations

ALIASES
  $ aio runtime activations list
  $ aio runtime activation ls
  $ aio runtime activations ls
  $ aio rt activation list
  $ aio rt activation ls
  $ aio rt activations list
  $ aio rt activations ls
```

## `aio runtime activation log [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio runtime activation log [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-d |  | [-a <value> | -m | -p <value>]] [-r] [--limit
    <value> | -l] [-t | -w | -o]

FLAGS
  -a, --action=<value>   Fetch logs for a specific action
  -d, --deployed         Fetch logs for all actions deployed under a specific package
  -i, --insecure         bypass certificate check
  -l, --last             retrieves the most recent activation logs
  -m, --manifest         Fetch logs for all actions in the manifest
  -o, --poll             Fetch logs continuously
  -p, --package=<value>  Fetch logs for a specific package in the manifest
  -r, --strip            strip timestamp information and output first line only
  -t, --tail             Fetch logs continuously
  -u, --auth=<value>     whisk auth
  -v, --verbose          Verbose output
  -w, --watch            Fetch logs continuously
  --apihost=<value>      whisk API host
  --apiversion=<value>   whisk API version
  --cert=<value>         client cert
  --debug=<value>        Debug level output
  --help                 Show help
  --key=<value>          client key
  --limit=<value>        return logs only from last LIMIT number of activations (min: 0, max: 50)
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime activation log
  $ aio runtime log
  $ aio runtime logs
  $ aio rt activation logs
  $ aio rt activation log
  $ aio rt log
  $ aio rt logs
```

## `aio runtime activation logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio runtime activation logs [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-d |  | [-a <value> | -m | -p <value>]] [-r] [--limit
    <value> | -l] [-t | -w | -o]

FLAGS
  -a, --action=<value>   Fetch logs for a specific action
  -d, --deployed         Fetch logs for all actions deployed under a specific package
  -i, --insecure         bypass certificate check
  -l, --last             retrieves the most recent activation logs
  -m, --manifest         Fetch logs for all actions in the manifest
  -o, --poll             Fetch logs continuously
  -p, --package=<value>  Fetch logs for a specific package in the manifest
  -r, --strip            strip timestamp information and output first line only
  -t, --tail             Fetch logs continuously
  -u, --auth=<value>     whisk auth
  -v, --verbose          Verbose output
  -w, --watch            Fetch logs continuously
  --apihost=<value>      whisk API host
  --apiversion=<value>   whisk API version
  --cert=<value>         client cert
  --debug=<value>        Debug level output
  --help                 Show help
  --key=<value>          client key
  --limit=<value>        return logs only from last LIMIT number of activations (min: 0, max: 50)
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime activation log
  $ aio runtime log
  $ aio runtime logs
  $ aio rt activation logs
  $ aio rt activation log
  $ aio rt log
  $ aio rt logs
```

## `aio runtime activation ls [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio runtime activation ls [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations (min: 0, max: 50)
  -s, --skip=<value>    exclude the first SKIP number of activations from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --since=<value>       return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan
                        1970
  --upto=<value>        return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan
                        1970
  --version             Show version

DESCRIPTION
  Lists all the Activations

ALIASES
  $ aio runtime activations list
  $ aio runtime activation ls
  $ aio runtime activations ls
  $ aio rt activation list
  $ aio rt activation ls
  $ aio rt activations list
  $ aio rt activations ls
```

## `aio runtime activation result [ACTIVATIONID]`

Retrieves the Results for an Activation

```
USAGE
  $ aio runtime activation result [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l]

FLAGS
  -i, --insecure        bypass certificate check
  -l, --last            retrieves the most recent activation result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Retrieves the Results for an Activation

ALIASES
  $ aio rt activation result
```

## `aio runtime activations list [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio runtime activations list [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations (min: 0, max: 50)
  -s, --skip=<value>    exclude the first SKIP number of activations from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --since=<value>       return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan
                        1970
  --upto=<value>        return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan
                        1970
  --version             Show version

DESCRIPTION
  Lists all the Activations

ALIASES
  $ aio runtime activations list
  $ aio runtime activation ls
  $ aio runtime activations ls
  $ aio rt activation list
  $ aio rt activation ls
  $ aio rt activations list
  $ aio rt activations ls
```

## `aio runtime activations ls [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio runtime activations ls [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations (min: 0, max: 50)
  -s, --skip=<value>    exclude the first SKIP number of activations from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --since=<value>       return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan
                        1970
  --upto=<value>        return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan
                        1970
  --version             Show version

DESCRIPTION
  Lists all the Activations

ALIASES
  $ aio runtime activations list
  $ aio runtime activation ls
  $ aio runtime activations ls
  $ aio rt activation list
  $ aio rt activation ls
  $ aio rt activations list
  $ aio rt activations ls
```

## `aio runtime api`

Manage your routes

```
USAGE
  $ aio runtime api [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your routes

ALIASES
  $ aio runtime api
  $ aio rt api
```

## `aio runtime api create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`

create a new api route

```
USAGE
  $ aio runtime api create [BASEPATH] [RELPATH] [APIVERB] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
    [--debug <value>] [-v] [--version] [--help] [-n <value> | -c <value>] [-r html|http|json|text|svg|json | ]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb
  ACTION    The action to call

FLAGS
  -c, --config-file=<value>     file containing API configuration in swagger JSON format
  -i, --insecure                bypass certificate check
  -n, --apiname=<value>         Friendly name of the API; ignored when CFG_FILE is specified (default BASE_PATH)
  -r, --response-type=<option>  [default: json] Set the web action response TYPE.
                                <options: html|http|json|text|svg|json>
  -u, --auth                    whisk auth
  -v, --verbose                 Verbose output
  --apihost                     whisk API host
  --apiversion                  whisk API version
  --cert                        client cert
  --debug=<value>               Debug level output
  --help                        Show help
  --key                         client key
  --version                     Show version

DESCRIPTION
  create a new api route

ALIASES
  $ aio runtime api create
  $ aio rt route create
  $ aio rt api create
```

## `aio runtime api delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
USAGE
  $ aio runtime api delete BASEPATHORAPINAME [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
    [--debug <value>] [-v] [--version] [--help]

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name
  RELPATH            The path of the api relative to the base path
  APIVERB            (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  delete an API

ALIASES
  $ aio runtime api delete
  $ aio rt route delete
  $ aio rt api delete
```

## `aio runtime api get BASEPATHORAPINAME`

get API details

```
USAGE
  $ aio runtime api get BASEPATHORAPINAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
    [-v] [--version] [--help]

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  get API details

ALIASES
  $ aio runtime api get
  $ aio rt route get
  $ aio rt api get
```

## `aio runtime api list [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio runtime api list [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--json]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  only return LIMIT number of triggers
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --version            Show version

DESCRIPTION
  list route/apis for Adobe I/O Runtime

ALIASES
  $ aio runtime route ls
  $ aio runtime api list
  $ aio runtime api ls
  $ aio rt route list
  $ aio rt route ls
  $ aio rt api list
  $ aio rt api ls
```

## `aio runtime api ls [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio runtime api ls [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--json]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  only return LIMIT number of triggers
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --version            Show version

DESCRIPTION
  list route/apis for Adobe I/O Runtime

ALIASES
  $ aio runtime route ls
  $ aio runtime api list
  $ aio runtime api ls
  $ aio rt route list
  $ aio rt route ls
  $ aio rt api list
  $ aio rt api ls
```

## `aio runtime deploy`

The Runtime Deployment Tool

```
USAGE
  $ aio runtime deploy [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [-m <value>] [-d <value>] [--param <value>] [-P <value>]

FLAGS
  -P, --param-file=<value>  FILE containing parameter values in JSON format
  -d, --deployment=<value>  the path to the deployment file
  -i, --insecure            bypass certificate check
  -m, --manifest=<value>    the manifest file location
  -u, --auth=<value>        whisk auth
  -v, --verbose             Verbose output
  --apihost=<value>         whisk API host
  --apiversion=<value>      whisk API version
  --cert=<value>            client cert
  --debug=<value>           Debug level output
  --help                    Show help
  --key=<value>             client key
  --param=<value>...        parameter values in KEY VALUE format
  --version                 Show version

DESCRIPTION
  The Runtime Deployment Tool

ALIASES
  $ aio rt deploy
```

## `aio runtime deploy export`

Exports managed project assets from Runtime to manifest and function files

```
USAGE
  $ aio runtime deploy export -m <value> --projectname <value> [--cert <value>] [--key <value>] [--apiversion <value>]
    [--apihost <value>] [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure          bypass certificate check
  -m, --manifest=<value>  (required) the manifest file location
  -u, --auth=<value>      whisk auth
  -v, --verbose           Verbose output
  --apihost=<value>       whisk API host
  --apiversion=<value>    whisk API version
  --cert=<value>          client cert
  --debug=<value>         Debug level output
  --help                  Show help
  --key=<value>           client key
  --projectname=<value>   (required) the name of the project to be undeployed
  --version               Show version

DESCRIPTION
  Exports managed project assets from Runtime to manifest and function files

ALIASES
  $ aio rt deploy export
```

## `aio runtime deploy report`

Provides a summary report of Runtime assets being deployed/undeployed based on manifest/deployment YAML

```
USAGE
  $ aio runtime deploy report [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [-m <value>] [-d <value>]

FLAGS
  -d, --deployment=<value>  the deployment file location
  -i, --insecure            bypass certificate check
  -m, --manifest=<value>    the manifest file location
  -u, --auth=<value>        whisk auth
  -v, --verbose             Verbose output
  --apihost=<value>         whisk API host
  --apiversion=<value>      whisk API version
  --cert=<value>            client cert
  --debug=<value>           Debug level output
  --help                    Show help
  --key=<value>             client key
  --version                 Show version

DESCRIPTION
  Provides a summary report of Runtime assets being deployed/undeployed based on manifest/deployment YAML

ALIASES
  $ aio rt deploy report
```

## `aio runtime deploy sync`

A tool to sync deployment and undeployment of Runtime packages using a manifest and optional deployment files using YAML

```
USAGE
  $ aio runtime deploy sync [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [-m <value>] [-d <value>]

FLAGS
  -d, --deployment=<value>  the path to the deployment file
  -i, --insecure            bypass certificate check
  -m, --manifest=<value>    the manifest file location
  -u, --auth=<value>        whisk auth
  -v, --verbose             Verbose output
  --apihost=<value>         whisk API host
  --apiversion=<value>      whisk API version
  --cert=<value>            client cert
  --debug=<value>           Debug level output
  --help                    Show help
  --key=<value>             client key
  --version                 Show version

DESCRIPTION
  A tool to sync deployment and undeployment of Runtime packages using a manifest and optional deployment files using
  YAML

ALIASES
  $ aio rt deploy sync
```

## `aio runtime deploy undeploy`

Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML

```
USAGE
  $ aio runtime deploy undeploy [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [-m <value>] [--projectname <value>]

FLAGS
  -i, --insecure          bypass certificate check
  -m, --manifest=<value>  the manifest file location
  -u, --auth=<value>      whisk auth
  -v, --verbose           Verbose output
  --apihost=<value>       whisk API host
  --apiversion=<value>    whisk API version
  --cert=<value>          client cert
  --debug=<value>         Debug level output
  --help                  Show help
  --key=<value>           client key
  --projectname=<value>   the name of the project to be undeployed
  --version               Show version

DESCRIPTION
  Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML

ALIASES
  $ aio rt deploy undeploy
```

## `aio runtime deploy version`

Prints the version number of aio runtime deploy

```
USAGE
  $ aio runtime deploy version [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Prints the version number of aio runtime deploy

ALIASES
  $ aio rt deploy version
```

## `aio runtime list`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio runtime list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json] [--name-sort] [-n]

FLAGS
  -i, --insecure        bypass certificate check
  -n, --name            sort results by name
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Get triggers, actions, and rules in the registry for namespace

ALIASES
  $ aio rt get
  $ aio runtime list
  $ aio rt list
  $ aio runtime ls
  $ aio rt ls
```

## `aio runtime log [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio runtime log [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-d |  | [-a <value> | -m | -p <value>]] [-r] [--limit
    <value> | -l] [-t | -w | -o]

FLAGS
  -a, --action=<value>   Fetch logs for a specific action
  -d, --deployed         Fetch logs for all actions deployed under a specific package
  -i, --insecure         bypass certificate check
  -l, --last             retrieves the most recent activation logs
  -m, --manifest         Fetch logs for all actions in the manifest
  -o, --poll             Fetch logs continuously
  -p, --package=<value>  Fetch logs for a specific package in the manifest
  -r, --strip            strip timestamp information and output first line only
  -t, --tail             Fetch logs continuously
  -u, --auth=<value>     whisk auth
  -v, --verbose          Verbose output
  -w, --watch            Fetch logs continuously
  --apihost=<value>      whisk API host
  --apiversion=<value>   whisk API version
  --cert=<value>         client cert
  --debug=<value>        Debug level output
  --help                 Show help
  --key=<value>          client key
  --limit=<value>        return logs only from last LIMIT number of activations (min: 0, max: 50)
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime activation log
  $ aio runtime log
  $ aio runtime logs
  $ aio rt activation logs
  $ aio rt activation log
  $ aio rt log
  $ aio rt logs
```

## `aio runtime logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio runtime logs [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
    [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-d |  | [-a <value> | -m | -p <value>]] [-r] [--limit
    <value> | -l] [-t | -w | -o]

FLAGS
  -a, --action=<value>   Fetch logs for a specific action
  -d, --deployed         Fetch logs for all actions deployed under a specific package
  -i, --insecure         bypass certificate check
  -l, --last             retrieves the most recent activation logs
  -m, --manifest         Fetch logs for all actions in the manifest
  -o, --poll             Fetch logs continuously
  -p, --package=<value>  Fetch logs for a specific package in the manifest
  -r, --strip            strip timestamp information and output first line only
  -t, --tail             Fetch logs continuously
  -u, --auth=<value>     whisk auth
  -v, --verbose          Verbose output
  -w, --watch            Fetch logs continuously
  --apihost=<value>      whisk API host
  --apiversion=<value>   whisk API version
  --cert=<value>         client cert
  --debug=<value>        Debug level output
  --help                 Show help
  --key=<value>          client key
  --limit=<value>        return logs only from last LIMIT number of activations (min: 0, max: 50)
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime activation log
  $ aio runtime log
  $ aio runtime logs
  $ aio rt activation logs
  $ aio rt activation log
  $ aio rt log
  $ aio rt logs
```

## `aio runtime ls`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio runtime ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json] [--name-sort] [-n]

FLAGS
  -i, --insecure        bypass certificate check
  -n, --name            sort results by name
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Get triggers, actions, and rules in the registry for namespace

ALIASES
  $ aio rt get
  $ aio runtime list
  $ aio rt list
  $ aio runtime ls
  $ aio rt ls
```

## `aio runtime namespace`

Manage your namespaces

```
USAGE
  $ aio runtime namespace [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your namespaces

ALIASES
  $ aio runtime ns
  $ aio rt namespace
  $ aio rt ns
```

## `aio runtime namespace get`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio runtime namespace get [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json] [--name-sort] [-n]

FLAGS
  -i, --insecure        bypass certificate check
  -n, --name            sort results by name
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Get triggers, actions, and rules in the registry for namespace

ALIASES
  $ aio rt get
  $ aio runtime list
  $ aio rt list
  $ aio runtime ls
  $ aio rt ls
```

## `aio runtime namespace lf`

Manage log forwarding settings

```
USAGE
  $ aio runtime namespace lf [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage log forwarding settings

ALIASES
  $ aio runtime ns log-forwarding
  $ aio runtime ns lf
  $ aio runtime namespace lf
  $ aio rt namespace log-forwarding
  $ aio rt namespace lf
  $ aio rt ns log-forwarding
  $ aio rt ns lf
```

## `aio runtime namespace lf errors`

Get log forwarding errors

```
USAGE
  $ aio runtime namespace lf errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding errors

ALIASES
  $ aio runtime ns log-forwarding errors
  $ aio runtime ns lf errors
  $ aio runtime namespace lf errors
  $ aio rt namespace log-forwarding errors
  $ aio rt namespace lf errors
  $ aio rt ns log-forwarding errors
  $ aio rt ns lf errors
```

## `aio runtime namespace lf get`

Get log forwarding destination configuration

```
USAGE
  $ aio runtime namespace lf get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding destination configuration

ALIASES
  $ aio runtime ns log-forwarding get
  $ aio runtime ns lf get
  $ aio runtime namespace lf get
  $ aio rt namespace log-forwarding get
  $ aio rt namespace lf get
  $ aio rt ns log-forwarding get
  $ aio rt ns lf get
```

## `aio runtime namespace lf set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio runtime namespace lf set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Configure log forwarding destination (interactive)

ALIASES
  $ aio runtime ns log-forwarding set
  $ aio runtime ns lf set
  $ aio runtime namespace lf set
  $ aio rt namespace log-forwarding set
  $ aio rt namespace lf set
  $ aio rt ns log-forwarding set
  $ aio rt ns lf set
```

## `aio runtime namespace lf set adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio runtime namespace lf set adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

ALIASES
  $ aio runtime ns log-forwarding set adobe-io-runtime
  $ aio runtime ns lf set adobe-io-runtime
  $ aio runtime namespace lf set adobe-io-runtime
  $ aio rt namespace log-forwarding set adobe-io-runtime
  $ aio rt namespace lf set adobe-io-runtime
  $ aio rt ns log-forwarding set adobe-io-runtime
  $ aio rt ns lf set adobe-io-runtime
```

## `aio runtime namespace lf set azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio runtime namespace lf set azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
    [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure         bypass certificate check
  -u, --auth             whisk auth
  -v, --verbose          Verbose output
  --apihost              whisk API host
  --apiversion           whisk API version
  --cert                 client cert
  --customer-id=<value>  (required) Customer ID
  --debug=<value>        Debug level output
  --help                 Show help
  --key                  client key
  --log-type=<value>     (required) Log type
  --shared-key=<value>   (required) Shared key
  --version              Show version

DESCRIPTION
  Set log forwarding destination to Azure Log Analytics

ALIASES
  $ aio runtime ns log-forwarding set azure-log-analytics
  $ aio runtime ns lf set azure-log-analytics
  $ aio runtime namespace lf set azure-log-analytics
  $ aio rt namespace log-forwarding set azure-log-analytics
  $ aio rt namespace lf set azure-log-analytics
  $ aio rt ns log-forwarding set azure-log-analytics
  $ aio rt ns lf set azure-log-analytics
```

## `aio runtime namespace lf set splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio runtime namespace lf set splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
    [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --hec-token=<value>  (required) HEC token
  --help               Show help
  --host=<value>       (required) Host
  --index=<value>      (required) Index
  --key                client key
  --port=<value>       (required) Port
  --version            Show version

DESCRIPTION
  Set log forwarding destination to Splunk HEC

ALIASES
  $ aio runtime ns log-forwarding set splunk-hec
  $ aio runtime ns lf set splunk-hec
  $ aio runtime namespace lf set splunk-hec
  $ aio rt namespace log-forwarding set splunk-hec
  $ aio rt namespace lf set splunk-hec
  $ aio rt ns log-forwarding set splunk-hec
  $ aio rt ns lf set splunk-hec
```

## `aio runtime namespace list`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio runtime namespace list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Lists all of your namespaces for Adobe I/O Runtime

ALIASES
  $ aio runtime namespace ls
  $ aio runtime ns list
  $ aio runtime ns ls
  $ aio rt namespace list
  $ aio rt namespace ls
  $ aio rt ns list
  $ aio rt ns ls
```

## `aio runtime namespace log-forwarding`

Manage log forwarding settings

```
USAGE
  $ aio runtime namespace log-forwarding [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage log forwarding settings

ALIASES
  $ aio runtime ns log-forwarding
  $ aio runtime ns lf
  $ aio runtime namespace lf
  $ aio rt namespace log-forwarding
  $ aio rt namespace lf
  $ aio rt ns log-forwarding
  $ aio rt ns lf
```

## `aio runtime namespace log-forwarding errors`

Get log forwarding errors

```
USAGE
  $ aio runtime namespace log-forwarding errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding errors

ALIASES
  $ aio runtime ns log-forwarding errors
  $ aio runtime ns lf errors
  $ aio runtime namespace lf errors
  $ aio rt namespace log-forwarding errors
  $ aio rt namespace lf errors
  $ aio rt ns log-forwarding errors
  $ aio rt ns lf errors
```

## `aio runtime namespace log-forwarding get`

Get log forwarding destination configuration

```
USAGE
  $ aio runtime namespace log-forwarding get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding destination configuration

ALIASES
  $ aio runtime ns log-forwarding get
  $ aio runtime ns lf get
  $ aio runtime namespace lf get
  $ aio rt namespace log-forwarding get
  $ aio rt namespace lf get
  $ aio rt ns log-forwarding get
  $ aio rt ns lf get
```

## `aio runtime namespace log-forwarding set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio runtime namespace log-forwarding set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Configure log forwarding destination (interactive)

ALIASES
  $ aio runtime ns log-forwarding set
  $ aio runtime ns lf set
  $ aio runtime namespace lf set
  $ aio rt namespace log-forwarding set
  $ aio rt namespace lf set
  $ aio rt ns log-forwarding set
  $ aio rt ns lf set
```

## `aio runtime namespace log-forwarding set adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio runtime namespace log-forwarding set adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

ALIASES
  $ aio runtime ns log-forwarding set adobe-io-runtime
  $ aio runtime ns lf set adobe-io-runtime
  $ aio runtime namespace lf set adobe-io-runtime
  $ aio rt namespace log-forwarding set adobe-io-runtime
  $ aio rt namespace lf set adobe-io-runtime
  $ aio rt ns log-forwarding set adobe-io-runtime
  $ aio rt ns lf set adobe-io-runtime
```

## `aio runtime namespace log-forwarding set azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio runtime namespace log-forwarding set azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
    [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure         bypass certificate check
  -u, --auth             whisk auth
  -v, --verbose          Verbose output
  --apihost              whisk API host
  --apiversion           whisk API version
  --cert                 client cert
  --customer-id=<value>  (required) Customer ID
  --debug=<value>        Debug level output
  --help                 Show help
  --key                  client key
  --log-type=<value>     (required) Log type
  --shared-key=<value>   (required) Shared key
  --version              Show version

DESCRIPTION
  Set log forwarding destination to Azure Log Analytics

ALIASES
  $ aio runtime ns log-forwarding set azure-log-analytics
  $ aio runtime ns lf set azure-log-analytics
  $ aio runtime namespace lf set azure-log-analytics
  $ aio rt namespace log-forwarding set azure-log-analytics
  $ aio rt namespace lf set azure-log-analytics
  $ aio rt ns log-forwarding set azure-log-analytics
  $ aio rt ns lf set azure-log-analytics
```

## `aio runtime namespace log-forwarding set splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio runtime namespace log-forwarding set splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
    [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --hec-token=<value>  (required) HEC token
  --help               Show help
  --host=<value>       (required) Host
  --index=<value>      (required) Index
  --key                client key
  --port=<value>       (required) Port
  --version            Show version

DESCRIPTION
  Set log forwarding destination to Splunk HEC

ALIASES
  $ aio runtime ns log-forwarding set splunk-hec
  $ aio runtime ns lf set splunk-hec
  $ aio runtime namespace lf set splunk-hec
  $ aio rt namespace log-forwarding set splunk-hec
  $ aio rt namespace lf set splunk-hec
  $ aio rt ns log-forwarding set splunk-hec
  $ aio rt ns lf set splunk-hec
```

## `aio runtime namespace ls`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio runtime namespace ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Lists all of your namespaces for Adobe I/O Runtime

ALIASES
  $ aio runtime namespace ls
  $ aio runtime ns list
  $ aio runtime ns ls
  $ aio rt namespace list
  $ aio rt namespace ls
  $ aio rt ns list
  $ aio rt ns ls
```

## `aio runtime ns`

Manage your namespaces

```
USAGE
  $ aio runtime ns [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your namespaces

ALIASES
  $ aio runtime ns
  $ aio rt namespace
  $ aio rt ns
```

## `aio runtime ns lf`

Manage log forwarding settings

```
USAGE
  $ aio runtime ns lf [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage log forwarding settings

ALIASES
  $ aio runtime ns log-forwarding
  $ aio runtime ns lf
  $ aio runtime namespace lf
  $ aio rt namespace log-forwarding
  $ aio rt namespace lf
  $ aio rt ns log-forwarding
  $ aio rt ns lf
```

## `aio runtime ns lf errors`

Get log forwarding errors

```
USAGE
  $ aio runtime ns lf errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding errors

ALIASES
  $ aio runtime ns log-forwarding errors
  $ aio runtime ns lf errors
  $ aio runtime namespace lf errors
  $ aio rt namespace log-forwarding errors
  $ aio rt namespace lf errors
  $ aio rt ns log-forwarding errors
  $ aio rt ns lf errors
```

## `aio runtime ns lf get`

Get log forwarding destination configuration

```
USAGE
  $ aio runtime ns lf get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding destination configuration

ALIASES
  $ aio runtime ns log-forwarding get
  $ aio runtime ns lf get
  $ aio runtime namespace lf get
  $ aio rt namespace log-forwarding get
  $ aio rt namespace lf get
  $ aio rt ns log-forwarding get
  $ aio rt ns lf get
```

## `aio runtime ns lf set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio runtime ns lf set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Configure log forwarding destination (interactive)

ALIASES
  $ aio runtime ns log-forwarding set
  $ aio runtime ns lf set
  $ aio runtime namespace lf set
  $ aio rt namespace log-forwarding set
  $ aio rt namespace lf set
  $ aio rt ns log-forwarding set
  $ aio rt ns lf set
```

## `aio runtime ns lf set adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio runtime ns lf set adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

ALIASES
  $ aio runtime ns log-forwarding set adobe-io-runtime
  $ aio runtime ns lf set adobe-io-runtime
  $ aio runtime namespace lf set adobe-io-runtime
  $ aio rt namespace log-forwarding set adobe-io-runtime
  $ aio rt namespace lf set adobe-io-runtime
  $ aio rt ns log-forwarding set adobe-io-runtime
  $ aio rt ns lf set adobe-io-runtime
```

## `aio runtime ns lf set azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio runtime ns lf set azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
    [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure         bypass certificate check
  -u, --auth             whisk auth
  -v, --verbose          Verbose output
  --apihost              whisk API host
  --apiversion           whisk API version
  --cert                 client cert
  --customer-id=<value>  (required) Customer ID
  --debug=<value>        Debug level output
  --help                 Show help
  --key                  client key
  --log-type=<value>     (required) Log type
  --shared-key=<value>   (required) Shared key
  --version              Show version

DESCRIPTION
  Set log forwarding destination to Azure Log Analytics

ALIASES
  $ aio runtime ns log-forwarding set azure-log-analytics
  $ aio runtime ns lf set azure-log-analytics
  $ aio runtime namespace lf set azure-log-analytics
  $ aio rt namespace log-forwarding set azure-log-analytics
  $ aio rt namespace lf set azure-log-analytics
  $ aio rt ns log-forwarding set azure-log-analytics
  $ aio rt ns lf set azure-log-analytics
```

## `aio runtime ns lf set splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio runtime ns lf set splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
    [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --hec-token=<value>  (required) HEC token
  --help               Show help
  --host=<value>       (required) Host
  --index=<value>      (required) Index
  --key                client key
  --port=<value>       (required) Port
  --version            Show version

DESCRIPTION
  Set log forwarding destination to Splunk HEC

ALIASES
  $ aio runtime ns log-forwarding set splunk-hec
  $ aio runtime ns lf set splunk-hec
  $ aio runtime namespace lf set splunk-hec
  $ aio rt namespace log-forwarding set splunk-hec
  $ aio rt namespace lf set splunk-hec
  $ aio rt ns log-forwarding set splunk-hec
  $ aio rt ns lf set splunk-hec
```

## `aio runtime ns list`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio runtime ns list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Lists all of your namespaces for Adobe I/O Runtime

ALIASES
  $ aio runtime namespace ls
  $ aio runtime ns list
  $ aio runtime ns ls
  $ aio rt namespace list
  $ aio rt namespace ls
  $ aio rt ns list
  $ aio rt ns ls
```

## `aio runtime ns log-forwarding`

Manage log forwarding settings

```
USAGE
  $ aio runtime ns log-forwarding [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage log forwarding settings

ALIASES
  $ aio runtime ns log-forwarding
  $ aio runtime ns lf
  $ aio runtime namespace lf
  $ aio rt namespace log-forwarding
  $ aio rt namespace lf
  $ aio rt ns log-forwarding
  $ aio rt ns lf
```

## `aio runtime ns log-forwarding errors`

Get log forwarding errors

```
USAGE
  $ aio runtime ns log-forwarding errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding errors

ALIASES
  $ aio runtime ns log-forwarding errors
  $ aio runtime ns lf errors
  $ aio runtime namespace lf errors
  $ aio rt namespace log-forwarding errors
  $ aio rt namespace lf errors
  $ aio rt ns log-forwarding errors
  $ aio rt ns lf errors
```

## `aio runtime ns log-forwarding get`

Get log forwarding destination configuration

```
USAGE
  $ aio runtime ns log-forwarding get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get log forwarding destination configuration

ALIASES
  $ aio runtime ns log-forwarding get
  $ aio runtime ns lf get
  $ aio runtime namespace lf get
  $ aio rt namespace log-forwarding get
  $ aio rt namespace lf get
  $ aio rt ns log-forwarding get
  $ aio rt ns lf get
```

## `aio runtime ns log-forwarding set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio runtime ns log-forwarding set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Configure log forwarding destination (interactive)

ALIASES
  $ aio runtime ns log-forwarding set
  $ aio runtime ns lf set
  $ aio runtime namespace lf set
  $ aio rt namespace log-forwarding set
  $ aio rt namespace lf set
  $ aio rt ns log-forwarding set
  $ aio rt ns lf set
```

## `aio runtime ns log-forwarding set adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio runtime ns log-forwarding set adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

ALIASES
  $ aio runtime ns log-forwarding set adobe-io-runtime
  $ aio runtime ns lf set adobe-io-runtime
  $ aio runtime namespace lf set adobe-io-runtime
  $ aio rt namespace log-forwarding set adobe-io-runtime
  $ aio rt namespace lf set adobe-io-runtime
  $ aio rt ns log-forwarding set adobe-io-runtime
  $ aio rt ns lf set adobe-io-runtime
```

## `aio runtime ns log-forwarding set azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio runtime ns log-forwarding set azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
    [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure         bypass certificate check
  -u, --auth             whisk auth
  -v, --verbose          Verbose output
  --apihost              whisk API host
  --apiversion           whisk API version
  --cert                 client cert
  --customer-id=<value>  (required) Customer ID
  --debug=<value>        Debug level output
  --help                 Show help
  --key                  client key
  --log-type=<value>     (required) Log type
  --shared-key=<value>   (required) Shared key
  --version              Show version

DESCRIPTION
  Set log forwarding destination to Azure Log Analytics

ALIASES
  $ aio runtime ns log-forwarding set azure-log-analytics
  $ aio runtime ns lf set azure-log-analytics
  $ aio runtime namespace lf set azure-log-analytics
  $ aio rt namespace log-forwarding set azure-log-analytics
  $ aio rt namespace lf set azure-log-analytics
  $ aio rt ns log-forwarding set azure-log-analytics
  $ aio rt ns lf set azure-log-analytics
```

## `aio runtime ns log-forwarding set splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio runtime ns log-forwarding set splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
    [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --hec-token=<value>  (required) HEC token
  --help               Show help
  --host=<value>       (required) Host
  --index=<value>      (required) Index
  --key                client key
  --port=<value>       (required) Port
  --version            Show version

DESCRIPTION
  Set log forwarding destination to Splunk HEC

ALIASES
  $ aio runtime ns log-forwarding set splunk-hec
  $ aio runtime ns lf set splunk-hec
  $ aio runtime namespace lf set splunk-hec
  $ aio rt namespace log-forwarding set splunk-hec
  $ aio rt namespace lf set splunk-hec
  $ aio rt ns log-forwarding set splunk-hec
  $ aio rt ns lf set splunk-hec
```

## `aio runtime ns ls`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio runtime ns ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
    [--debug <value>] [-v] [--version] [--help] [--json]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Lists all of your namespaces for Adobe I/O Runtime

ALIASES
  $ aio runtime namespace ls
  $ aio runtime ns list
  $ aio runtime ns ls
  $ aio rt namespace list
  $ aio rt namespace ls
  $ aio rt ns list
  $ aio rt ns ls
```

## `aio runtime package`

Manage your packages

```
USAGE
  $ aio runtime package [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your packages

ALIASES
  $ aio runtime pkg
  $ aio rt package
  $ aio rt pkg
```

## `aio runtime package bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
USAGE
  $ aio runtime package bind PACKAGENAME BINDPACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>]
    [--apihost <value>] [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --version                      Show version

DESCRIPTION
  Bind parameters to a package

ALIASES
  $ aio runtime pkg bind
  $ aio rt package bind
  $ aio rt pkg bind
```

## `aio runtime package create PACKAGENAME`

Creates a Package

```
USAGE
  $ aio runtime package create PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [--shared true|yes|false|no] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --shared=<option>              parameter to be passed to indicate whether package is shared or private
                                 <options: true|yes|false|no>
  --version                      Show version

DESCRIPTION
  Creates a Package

ALIASES
  $ aio runtime pkg create
  $ aio rt package create
  $ aio rt pkg create
```

## `aio runtime package delete PACKAGENAME`

Deletes a Package

```
USAGE
  $ aio runtime package delete PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [--json] [-r]

FLAGS
  -i, --insecure        bypass certificate check
  -r, --recursive       Deletes all associated actions (and rules & triggers associated with the actions)
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Deletes a Package

ALIASES
  $ aio runtime pkg delete
  $ aio rt package delete
  $ aio rt pkg delete
```

## `aio runtime package get PACKAGENAME`

Retrieves a Package

```
USAGE
  $ aio runtime package get PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Retrieves a Package

ALIASES
  $ aio runtime pkg get
  $ aio rt package get
  $ aio rt pkg get
```

## `aio runtime package list [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio runtime package list [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of packages from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Packages

ALIASES
  $ aio runtime package ls
  $ aio runtime pkg list
  $ aio runtime pkg ls
  $ aio rt package list
  $ aio rt package ls
  $ aio rt pkg list
  $ aio rt pkg ls
```

## `aio runtime package ls [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio runtime package ls [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of packages from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Packages

ALIASES
  $ aio runtime package ls
  $ aio runtime pkg list
  $ aio runtime pkg ls
  $ aio rt package list
  $ aio rt package ls
  $ aio rt pkg list
  $ aio rt pkg ls
```

## `aio runtime package update PACKAGENAME`

Updates a Package

```
USAGE
  $ aio runtime package update PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [--shared true|yes|false|no] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --shared=<option>              parameter to be passed to indicate whether package is shared or private
                                 <options: true|yes|false|no>
  --version                      Show version

DESCRIPTION
  Updates a Package

ALIASES
  $ aio runtime pkg update
  $ aio rt package update
  $ aio rt pkg update
```

## `aio runtime pkg`

Manage your packages

```
USAGE
  $ aio runtime pkg [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your packages

ALIASES
  $ aio runtime pkg
  $ aio rt package
  $ aio rt pkg
```

## `aio runtime pkg bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
USAGE
  $ aio runtime pkg bind PACKAGENAME BINDPACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>]
    [--apihost <value>] [-u <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --version                      Show version

DESCRIPTION
  Bind parameters to a package

ALIASES
  $ aio runtime pkg bind
  $ aio rt package bind
  $ aio rt pkg bind
```

## `aio runtime pkg create PACKAGENAME`

Creates a Package

```
USAGE
  $ aio runtime pkg create PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [--shared true|yes|false|no] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --shared=<option>              parameter to be passed to indicate whether package is shared or private
                                 <options: true|yes|false|no>
  --version                      Show version

DESCRIPTION
  Creates a Package

ALIASES
  $ aio runtime pkg create
  $ aio rt package create
  $ aio rt pkg create
```

## `aio runtime pkg delete PACKAGENAME`

Deletes a Package

```
USAGE
  $ aio runtime pkg delete PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [--json] [-r]

FLAGS
  -i, --insecure        bypass certificate check
  -r, --recursive       Deletes all associated actions (and rules & triggers associated with the actions)
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Deletes a Package

ALIASES
  $ aio runtime pkg delete
  $ aio rt package delete
  $ aio rt pkg delete
```

## `aio runtime pkg get PACKAGENAME`

Retrieves a Package

```
USAGE
  $ aio runtime pkg get PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help]

FLAGS
  -i, --insecure        bypass certificate check
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --key=<value>         client key
  --version             Show version

DESCRIPTION
  Retrieves a Package

ALIASES
  $ aio runtime pkg get
  $ aio rt package get
  $ aio rt pkg get
```

## `aio runtime pkg list [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio runtime pkg list [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of packages from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Packages

ALIASES
  $ aio runtime package ls
  $ aio runtime pkg list
  $ aio runtime pkg ls
  $ aio rt package list
  $ aio rt package ls
  $ aio rt pkg list
  $ aio rt pkg ls
```

## `aio runtime pkg ls [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio runtime pkg ls [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages (min: 0, max: 50)
  -n, --name            sort results by name
  -s, --skip=<value>    exclude the first SKIP number of packages from the result
  -u, --auth=<value>    whisk auth
  -v, --verbose         Verbose output
  --apihost=<value>     whisk API host
  --apiversion=<value>  whisk API version
  --cert=<value>        client cert
  --debug=<value>       Debug level output
  --help                Show help
  --json                output raw json
  --key=<value>         client key
  --name-sort           sort results by name
  --version             Show version

DESCRIPTION
  Lists all the Packages

ALIASES
  $ aio runtime package ls
  $ aio runtime pkg list
  $ aio runtime pkg ls
  $ aio rt package list
  $ aio rt package ls
  $ aio rt pkg list
  $ aio rt pkg ls
```

## `aio runtime pkg update PACKAGENAME`

Updates a Package

```
USAGE
  $ aio runtime pkg update PACKAGENAME [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-p <value>] [-P <value>] [--shared true|yes|false|no] [-a
    <value>] [-A <value>] [--json]

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       parameter to be passed to the package for json file
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameters in key value pairs to be passed to the package
  -u, --auth=<value>             whisk auth
  -v, --verbose                  Verbose output
  --apihost=<value>              whisk API host
  --apiversion=<value>           whisk API version
  --cert=<value>                 client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --json                         output raw json
  --key=<value>                  client key
  --shared=<option>              parameter to be passed to indicate whether package is shared or private
                                 <options: true|yes|false|no>
  --version                      Show version

DESCRIPTION
  Updates a Package

ALIASES
  $ aio runtime pkg update
  $ aio rt package update
  $ aio rt pkg update
```

## `aio runtime prop`

Execute property commands

```
USAGE
  $ aio runtime prop [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Execute property commands

ALIASES
  $ aio runtime prop
  $ aio rt prop
  $ aio rt property
```

## `aio runtime prop get`

get property

```
USAGE
  $ aio runtime prop get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace] [--all] [--apibuild] [--apibuildno] [--cliversion]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --all            all properties
  --apibuild       whisk API build version
  --apibuildno     whisk API build number
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --cliversion     whisk CLI version
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --namespace      whisk namespace
  --version        Show version

DESCRIPTION
  get property

ALIASES
  $ aio runtime prop get
  $ aio rt property get
  $ aio rt prop get
```

## `aio runtime prop set`

set property

```
USAGE
  $ aio runtime prop set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace <value>]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --key                client key
  --namespace=<value>  whisk namespace
  --version            Show version

DESCRIPTION
  set property

ALIASES
  $ aio runtime prop set
  $ aio rt property set
  $ aio rt prop set
```

## `aio runtime prop unset`

unset property

```
USAGE
  $ aio runtime prop unset [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --namespace      whisk namespace
  --version        Show version

DESCRIPTION
  unset property

ALIASES
  $ aio runtime prop unset
  $ aio rt property unset
  $ aio rt prop unset
```

## `aio runtime property`

Execute property commands

```
USAGE
  $ aio runtime property [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Execute property commands

ALIASES
  $ aio runtime prop
  $ aio rt prop
  $ aio rt property
```

## `aio runtime property get`

get property

```
USAGE
  $ aio runtime property get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace] [--all] [--apibuild] [--apibuildno] [--cliversion]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --all            all properties
  --apibuild       whisk API build version
  --apibuildno     whisk API build number
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --cliversion     whisk CLI version
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --namespace      whisk namespace
  --version        Show version

DESCRIPTION
  get property

ALIASES
  $ aio runtime prop get
  $ aio rt property get
  $ aio rt prop get
```

## `aio runtime property set`

set property

```
USAGE
  $ aio runtime property set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace <value>]

FLAGS
  -i, --insecure       bypass certificate check
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --key                client key
  --namespace=<value>  whisk namespace
  --version            Show version

DESCRIPTION
  set property

ALIASES
  $ aio runtime prop set
  $ aio rt property set
  $ aio rt prop set
```

## `aio runtime property unset`

unset property

```
USAGE
  $ aio runtime property unset [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--namespace]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --namespace      whisk namespace
  --version        Show version

DESCRIPTION
  unset property

ALIASES
  $ aio runtime prop unset
  $ aio rt property unset
  $ aio rt prop unset
```

## `aio runtime route`

Manage your routes

```
USAGE
  $ aio runtime route [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your routes

ALIASES
  $ aio runtime api
  $ aio rt api
```

## `aio runtime route create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`

create a new api route

```
USAGE
  $ aio runtime route create [BASEPATH] [RELPATH] [APIVERB] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
    [--debug <value>] [-v] [--version] [--help] [-n <value> | -c <value>] [-r html|http|json|text|svg|json | ]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb
  ACTION    The action to call

FLAGS
  -c, --config-file=<value>     file containing API configuration in swagger JSON format
  -i, --insecure                bypass certificate check
  -n, --apiname=<value>         Friendly name of the API; ignored when CFG_FILE is specified (default BASE_PATH)
  -r, --response-type=<option>  [default: json] Set the web action response TYPE.
                                <options: html|http|json|text|svg|json>
  -u, --auth                    whisk auth
  -v, --verbose                 Verbose output
  --apihost                     whisk API host
  --apiversion                  whisk API version
  --cert                        client cert
  --debug=<value>               Debug level output
  --help                        Show help
  --key                         client key
  --version                     Show version

DESCRIPTION
  create a new api route

ALIASES
  $ aio runtime api create
  $ aio rt route create
  $ aio rt api create
```

## `aio runtime route delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
USAGE
  $ aio runtime route delete BASEPATHORAPINAME [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
    [--debug <value>] [-v] [--version] [--help]

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name
  RELPATH            The path of the api relative to the base path
  APIVERB            (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  delete an API

ALIASES
  $ aio runtime api delete
  $ aio rt route delete
  $ aio rt api delete
```

## `aio runtime route get BASEPATHORAPINAME`

get API details

```
USAGE
  $ aio runtime route get BASEPATHORAPINAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
    [-v] [--version] [--help]

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  get API details

ALIASES
  $ aio runtime api get
  $ aio rt route get
  $ aio rt api get
```

## `aio runtime route list [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio runtime route list [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--json]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  only return LIMIT number of triggers
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --version            Show version

DESCRIPTION
  list route/apis for Adobe I/O Runtime

ALIASES
  $ aio runtime route ls
  $ aio runtime api list
  $ aio runtime api ls
  $ aio rt route list
  $ aio rt route ls
  $ aio rt api list
  $ aio rt api ls
```

## `aio runtime route ls [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio runtime route ls [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--json]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

FLAGS
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  only return LIMIT number of triggers
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --version            Show version

DESCRIPTION
  list route/apis for Adobe I/O Runtime

ALIASES
  $ aio runtime route ls
  $ aio runtime api list
  $ aio runtime api ls
  $ aio rt route list
  $ aio rt route ls
  $ aio rt api list
  $ aio rt api ls
```

## `aio runtime rule`

Manage your rules

```
USAGE
  $ aio runtime rule [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your rules

ALIASES
  $ aio rt rule
```

## `aio runtime rule create NAME TRIGGER ACTION`

Create a Rule

```
USAGE
  $ aio runtime rule create NAME TRIGGER ACTION [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
    [-v] [--version] [--help] [--json]

ARGUMENTS
  NAME     Name of the rule
  TRIGGER  Name of the trigger
  ACTION   Name of the action

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --json           output raw json
  --key            client key
  --version        Show version

DESCRIPTION
  Create a Rule

ALIASES
  $ aio rt rule create
```

## `aio runtime rule delete NAME`

Delete a Rule

```
USAGE
  $ aio runtime rule delete NAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [--json]

ARGUMENTS
  NAME  Name of the rule

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --json           output raw json
  --key            client key
  --version        Show version

DESCRIPTION
  Delete a Rule

ALIASES
  $ aio rt rule delete
```

## `aio runtime rule disable NAME`

Disable a Rule

```
USAGE
  $ aio runtime rule disable NAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

ARGUMENTS
  NAME  Name of the rule

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Disable a Rule

ALIASES
  $ aio rt rule disable
```

## `aio runtime rule enable NAME`

Enable a Rule

```
USAGE
  $ aio runtime rule enable NAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

ARGUMENTS
  NAME  Name of the rule

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Enable a Rule

ALIASES
  $ aio rt rule enable
```

## `aio runtime rule get NAME`

Retrieves a Rule

```
USAGE
  $ aio runtime rule get NAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

ARGUMENTS
  NAME  Name of the rule

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Retrieves a Rule

ALIASES
  $ aio rt rule get
```

## `aio runtime rule list`

Retrieves a list of Rules

```
USAGE
  $ aio runtime rule list [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of rules
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  Limit number of rules returned (min: 0, max: 50)
  -n, --name           sort results by name
  -s, --skip=<value>   Skip number of rules returned
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --name-sort          sort results by name
  --version            Show version

DESCRIPTION
  Retrieves a list of Rules

ALIASES
  $ aio runtime rule ls
  $ aio rt rule list
  $ aio rt rule ls
```

## `aio runtime rule ls`

Retrieves a list of Rules

```
USAGE
  $ aio runtime rule ls [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of rules
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  Limit number of rules returned (min: 0, max: 50)
  -n, --name           sort results by name
  -s, --skip=<value>   Skip number of rules returned
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --name-sort          sort results by name
  --version            Show version

DESCRIPTION
  Retrieves a list of Rules

ALIASES
  $ aio runtime rule ls
  $ aio rt rule list
  $ aio rt rule ls
```

## `aio runtime rule status NAME`

Gets the status of a rule

```
USAGE
  $ aio runtime rule status NAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

ARGUMENTS
  NAME  Name of the rule

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Gets the status of a rule

ALIASES
  $ aio rt rule status
```

## `aio runtime rule update NAME TRIGGER ACTION`

Update a Rule

```
USAGE
  $ aio runtime rule update NAME TRIGGER ACTION [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
    [-v] [--version] [--help] [--json]

ARGUMENTS
  NAME     Name of the rule
  TRIGGER  Name of the trigger
  ACTION   Name of the action

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --json           output raw json
  --key            client key
  --version        Show version

DESCRIPTION
  Update a Rule

ALIASES
  $ aio rt rule update
```

## `aio runtime trigger`

Manage your triggers

```
USAGE
  $ aio runtime trigger [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help]

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Manage your triggers

ALIASES
  $ aio rt trigger
```

## `aio runtime trigger create TRIGGERNAME`

Create a trigger for Adobe I/O Runtime

```
USAGE
  $ aio runtime trigger create TRIGGERNAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help] [-p <value>] [-P <value>] [-a <value>] [-A <value>] [-f <value>]

ARGUMENTS
  TRIGGERNAME  The name of the trigger

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       FILE containing parameter values in JSON format
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -f, --feed=<value>             trigger feed ACTION_NAME
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameter values in KEY VALUE format
  -u, --auth                     whisk auth
  -v, --verbose                  Verbose output
  --apihost                      whisk API host
  --apiversion                   whisk API version
  --cert                         client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --key                          client key
  --version                      Show version

DESCRIPTION
  Create a trigger for Adobe I/O Runtime

ALIASES
  $ aio rt trigger create
```

## `aio runtime trigger delete TRIGGERPATH`

Delete a trigger for Adobe I/O Runtime

```
USAGE
  $ aio runtime trigger delete TRIGGERPATH [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

ARGUMENTS
  TRIGGERPATH  The name of the trigger, in the format /NAMESPACE/NAME

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Delete a trigger for Adobe I/O Runtime

ALIASES
  $ aio rt trigger delete
```

## `aio runtime trigger fire TRIGGERNAME`

Fire a trigger for Adobe I/O Runtime

```
USAGE
  $ aio runtime trigger fire TRIGGERNAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help] [-p <value>] [-P <value>]

ARGUMENTS
  TRIGGERNAME  The name of the trigger

FLAGS
  -P, --param-file=<value>  FILE containing parameter values in JSON format
  -i, --insecure            bypass certificate check
  -p, --param=<value>...    parameter values in KEY VALUE format
  -u, --auth                whisk auth
  -v, --verbose             Verbose output
  --apihost                 whisk API host
  --apiversion              whisk API version
  --cert                    client cert
  --debug=<value>           Debug level output
  --help                    Show help
  --key                     client key
  --version                 Show version

DESCRIPTION
  Fire a trigger for Adobe I/O Runtime

ALIASES
  $ aio rt trigger fire
```

## `aio runtime trigger get TRIGGERPATH`

Get a trigger for Adobe I/O Runtime

```
USAGE
  $ aio runtime trigger get TRIGGERPATH [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

ARGUMENTS
  TRIGGERPATH  The name/path of the trigger, in the format /NAMESPACE/NAME

FLAGS
  -i, --insecure   bypass certificate check
  -u, --auth       whisk auth
  -v, --verbose    Verbose output
  --apihost        whisk API host
  --apiversion     whisk API version
  --cert           client cert
  --debug=<value>  Debug level output
  --help           Show help
  --key            client key
  --version        Show version

DESCRIPTION
  Get a trigger for Adobe I/O Runtime

ALIASES
  $ aio rt trigger get
```

## `aio runtime trigger list`

Lists all of your triggers for Adobe I/O Runtime

```
USAGE
  $ aio runtime trigger list [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of triggers
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  [default: 30] only return LIMIT number of triggers (min: 0, max: 50)
  -n, --name           sort results by name
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --name-sort          sort results by name
  --version            Show version

DESCRIPTION
  Lists all of your triggers for Adobe I/O Runtime

ALIASES
  $ aio runtime trigger ls
  $ aio rt trigger list
  $ aio rt trigger ls
```

## `aio runtime trigger ls`

Lists all of your triggers for Adobe I/O Runtime

```
USAGE
  $ aio runtime trigger ls [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of triggers
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  [default: 30] only return LIMIT number of triggers (min: 0, max: 50)
  -n, --name           sort results by name
  -s, --skip=<value>   exclude the first SKIP number of triggers from the result
  -u, --auth           whisk auth
  -v, --verbose        Verbose output
  --apihost            whisk API host
  --apiversion         whisk API version
  --cert               client cert
  --debug=<value>      Debug level output
  --help               Show help
  --json               output raw json
  --key                client key
  --name-sort          sort results by name
  --version            Show version

DESCRIPTION
  Lists all of your triggers for Adobe I/O Runtime

ALIASES
  $ aio runtime trigger ls
  $ aio rt trigger list
  $ aio rt trigger ls
```

## `aio runtime trigger update TRIGGERNAME`

Update or create a trigger for Adobe I/O Runtime

```
USAGE
  $ aio runtime trigger update TRIGGERNAME [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help] [-p <value>] [-P <value>] [-a <value>] [-A <value>]

ARGUMENTS
  TRIGGERNAME  The name of the trigger

FLAGS
  -A, --annotation-file=<value>  FILE containing annotation values in JSON format
  -P, --param-file=<value>       FILE containing parameter values in JSON format
  -a, --annotation=<value>...    annotation values in KEY VALUE format
  -i, --insecure                 bypass certificate check
  -p, --param=<value>...         parameter values in KEY VALUE format
  -u, --auth                     whisk auth
  -v, --verbose                  Verbose output
  --apihost                      whisk API host
  --apiversion                   whisk API version
  --cert                         client cert
  --debug=<value>                Debug level output
  --help                         Show help
  --key                          client key
  --version                      Show version

DESCRIPTION
  Update or create a trigger for Adobe I/O Runtime

ALIASES
  $ aio rt trigger update
```
<!-- commandsstop -->



### Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
