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
* [`aio rt:action`](#aio-rtaction)
* [`aio rt:action:create ACTIONNAME [ACTIONPATH]`](#aio-rtactioncreate-actionname-actionpath)
* [`aio rt:action:del ACTIONNAME`](#aio-rtactiondel-actionname)
* [`aio rt:action:delete ACTIONNAME`](#aio-rtactiondelete-actionname)
* [`aio rt:action:get ACTIONNAME`](#aio-rtactionget-actionname)
* [`aio rt:action:invoke ACTIONNAME`](#aio-rtactioninvoke-actionname)
* [`aio rt:action:list [PACKAGENAME]`](#aio-rtactionlist-packagename)
* [`aio rt:action:ls [PACKAGENAME]`](#aio-rtactionls-packagename)
* [`aio rt:action:update ACTIONNAME [ACTIONPATH]`](#aio-rtactionupdate-actionname-actionpath)
* [`aio rt:actions:list [PACKAGENAME]`](#aio-rtactionslist-packagename)
* [`aio rt:actions:ls [PACKAGENAME]`](#aio-rtactionsls-packagename)
* [`aio rt:activation`](#aio-rtactivation)
* [`aio rt:activation:get [ACTIVATIONID]`](#aio-rtactivationget-activationid)
* [`aio rt:activation:list [ACTION_NAME]`](#aio-rtactivationlist-action_name)
* [`aio rt:activation:log [ACTIVATIONID]`](#aio-rtactivationlog-activationid)
* [`aio rt:activation:logs [ACTIVATIONID]`](#aio-rtactivationlogs-activationid)
* [`aio rt:activation:ls [ACTION_NAME]`](#aio-rtactivationls-action_name)
* [`aio rt:activation:result [ACTIVATIONID]`](#aio-rtactivationresult-activationid)
* [`aio rt:activations:list [ACTION_NAME]`](#aio-rtactivationslist-action_name)
* [`aio rt:activations:ls [ACTION_NAME]`](#aio-rtactivationsls-action_name)
* [`aio rt:api`](#aio-rtapi)
* [`aio rt:api:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`](#aio-rtapicreate-basepath-relpath-apiverb-action)
* [`aio rt:api:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#aio-rtapidelete-basepathorapiname-relpath-apiverb)
* [`aio rt:api:get BASEPATHORAPINAME`](#aio-rtapiget-basepathorapiname)
* [`aio rt:api:list [BASEPATH] [RELPATH] [APIVERB]`](#aio-rtapilist-basepath-relpath-apiverb)
* [`aio rt:api:ls [BASEPATH] [RELPATH] [APIVERB]`](#aio-rtapils-basepath-relpath-apiverb)
* [`aio rt:deploy`](#aio-rtdeploy)
* [`aio rt:deploy:export`](#aio-rtdeployexport)
* [`aio rt:deploy:report`](#aio-rtdeployreport)
* [`aio rt:deploy:sync`](#aio-rtdeploysync)
* [`aio rt:deploy:undeploy`](#aio-rtdeployundeploy)
* [`aio rt:deploy:version`](#aio-rtdeployversion)
* [`aio rt:get`](#aio-rtget)
* [`aio rt:list`](#aio-rtlist)
* [`aio rt:log [ACTIVATIONID]`](#aio-rtlog-activationid)
* [`aio rt:logs [ACTIVATIONID]`](#aio-rtlogs-activationid)
* [`aio rt:ls`](#aio-rtls)
* [`aio rt:namespace`](#aio-rtnamespace)
* [`aio rt:namespace:lf`](#aio-rtnamespacelf)
* [`aio rt:namespace:lf:errors`](#aio-rtnamespacelferrors)
* [`aio rt:namespace:lf:get`](#aio-rtnamespacelfget)
* [`aio rt:namespace:lf:set`](#aio-rtnamespacelfset)
* [`aio rt:namespace:lf:set:adobe-io-runtime`](#aio-rtnamespacelfsetadobe-io-runtime)
* [`aio rt:namespace:lf:set:azure-log-analytics`](#aio-rtnamespacelfsetazure-log-analytics)
* [`aio rt:namespace:lf:set:splunk-hec`](#aio-rtnamespacelfsetsplunk-hec)
* [`aio rt:namespace:list`](#aio-rtnamespacelist)
* [`aio rt:namespace:log-forwarding`](#aio-rtnamespacelog-forwarding)
* [`aio rt:namespace:log-forwarding:errors`](#aio-rtnamespacelog-forwardingerrors)
* [`aio rt:namespace:log-forwarding:get`](#aio-rtnamespacelog-forwardingget)
* [`aio rt:namespace:log-forwarding:set`](#aio-rtnamespacelog-forwardingset)
* [`aio rt:namespace:log-forwarding:set:adobe-io-runtime`](#aio-rtnamespacelog-forwardingsetadobe-io-runtime)
* [`aio rt:namespace:log-forwarding:set:azure-log-analytics`](#aio-rtnamespacelog-forwardingsetazure-log-analytics)
* [`aio rt:namespace:log-forwarding:set:splunk-hec`](#aio-rtnamespacelog-forwardingsetsplunk-hec)
* [`aio rt:namespace:ls`](#aio-rtnamespacels)
* [`aio rt:ns`](#aio-rtns)
* [`aio rt:ns:lf`](#aio-rtnslf)
* [`aio rt:ns:lf:errors`](#aio-rtnslferrors)
* [`aio rt:ns:lf:get`](#aio-rtnslfget)
* [`aio rt:ns:lf:set`](#aio-rtnslfset)
* [`aio rt:ns:lf:set:adobe-io-runtime`](#aio-rtnslfsetadobe-io-runtime)
* [`aio rt:ns:lf:set:azure-log-analytics`](#aio-rtnslfsetazure-log-analytics)
* [`aio rt:ns:lf:set:splunk-hec`](#aio-rtnslfsetsplunk-hec)
* [`aio rt:ns:list`](#aio-rtnslist)
* [`aio rt:ns:log-forwarding`](#aio-rtnslog-forwarding)
* [`aio rt:ns:log-forwarding:errors`](#aio-rtnslog-forwardingerrors)
* [`aio rt:ns:log-forwarding:get`](#aio-rtnslog-forwardingget)
* [`aio rt:ns:log-forwarding:set`](#aio-rtnslog-forwardingset)
* [`aio rt:ns:log-forwarding:set:adobe-io-runtime`](#aio-rtnslog-forwardingsetadobe-io-runtime)
* [`aio rt:ns:log-forwarding:set:azure-log-analytics`](#aio-rtnslog-forwardingsetazure-log-analytics)
* [`aio rt:ns:log-forwarding:set:splunk-hec`](#aio-rtnslog-forwardingsetsplunk-hec)
* [`aio rt:ns:ls`](#aio-rtnsls)
* [`aio rt:package`](#aio-rtpackage)
* [`aio rt:package:bind PACKAGENAME BINDPACKAGENAME`](#aio-rtpackagebind-packagename-bindpackagename)
* [`aio rt:package:create PACKAGENAME`](#aio-rtpackagecreate-packagename)
* [`aio rt:package:delete PACKAGENAME`](#aio-rtpackagedelete-packagename)
* [`aio rt:package:get PACKAGENAME`](#aio-rtpackageget-packagename)
* [`aio rt:package:list [NAMESPACE]`](#aio-rtpackagelist-namespace)
* [`aio rt:package:ls [NAMESPACE]`](#aio-rtpackagels-namespace)
* [`aio rt:package:update PACKAGENAME`](#aio-rtpackageupdate-packagename)
* [`aio rt:pkg`](#aio-rtpkg)
* [`aio rt:pkg:bind PACKAGENAME BINDPACKAGENAME`](#aio-rtpkgbind-packagename-bindpackagename)
* [`aio rt:pkg:create PACKAGENAME`](#aio-rtpkgcreate-packagename)
* [`aio rt:pkg:delete PACKAGENAME`](#aio-rtpkgdelete-packagename)
* [`aio rt:pkg:get PACKAGENAME`](#aio-rtpkgget-packagename)
* [`aio rt:pkg:list [NAMESPACE]`](#aio-rtpkglist-namespace)
* [`aio rt:pkg:ls [NAMESPACE]`](#aio-rtpkgls-namespace)
* [`aio rt:pkg:update PACKAGENAME`](#aio-rtpkgupdate-packagename)
* [`aio rt:prop`](#aio-rtprop)
* [`aio rt:prop:get`](#aio-rtpropget)
* [`aio rt:prop:set`](#aio-rtpropset)
* [`aio rt:prop:unset`](#aio-rtpropunset)
* [`aio rt:property`](#aio-rtproperty)
* [`aio rt:property:get`](#aio-rtpropertyget)
* [`aio rt:property:set`](#aio-rtpropertyset)
* [`aio rt:property:unset`](#aio-rtpropertyunset)
* [`aio rt:route:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`](#aio-rtroutecreate-basepath-relpath-apiverb-action)
* [`aio rt:route:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#aio-rtroutedelete-basepathorapiname-relpath-apiverb)
* [`aio rt:route:get BASEPATHORAPINAME`](#aio-rtrouteget-basepathorapiname)
* [`aio rt:route:list [BASEPATH] [RELPATH] [APIVERB]`](#aio-rtroutelist-basepath-relpath-apiverb)
* [`aio rt:route:ls [BASEPATH] [RELPATH] [APIVERB]`](#aio-rtroutels-basepath-relpath-apiverb)
* [`aio rt:rule`](#aio-rtrule)
* [`aio rt:rule:create NAME TRIGGER ACTION`](#aio-rtrulecreate-name-trigger-action)
* [`aio rt:rule:delete NAME`](#aio-rtruledelete-name)
* [`aio rt:rule:disable NAME`](#aio-rtruledisable-name)
* [`aio rt:rule:enable NAME`](#aio-rtruleenable-name)
* [`aio rt:rule:get NAME`](#aio-rtruleget-name)
* [`aio rt:rule:list`](#aio-rtrulelist)
* [`aio rt:rule:ls`](#aio-rtrulels)
* [`aio rt:rule:status NAME`](#aio-rtrulestatus-name)
* [`aio rt:rule:update NAME TRIGGER ACTION`](#aio-rtruleupdate-name-trigger-action)
* [`aio rt:trigger`](#aio-rttrigger)
* [`aio rt:trigger:create TRIGGERNAME`](#aio-rttriggercreate-triggername)
* [`aio rt:trigger:delete TRIGGERPATH`](#aio-rttriggerdelete-triggerpath)
* [`aio rt:trigger:fire TRIGGERNAME`](#aio-rttriggerfire-triggername)
* [`aio rt:trigger:get TRIGGERPATH`](#aio-rttriggerget-triggerpath)
* [`aio rt:trigger:list`](#aio-rttriggerlist)
* [`aio rt:trigger:ls`](#aio-rttriggerls)
* [`aio rt:trigger:update TRIGGERNAME`](#aio-rttriggerupdate-triggername)
* [`aio runtime`](#aio-runtime)
* [`aio runtime:action`](#aio-runtimeaction)
* [`aio runtime:action:create ACTIONNAME [ACTIONPATH]`](#aio-runtimeactioncreate-actionname-actionpath)
* [`aio runtime:action:del ACTIONNAME`](#aio-runtimeactiondel-actionname)
* [`aio runtime:action:delete ACTIONNAME`](#aio-runtimeactiondelete-actionname)
* [`aio runtime:action:get ACTIONNAME`](#aio-runtimeactionget-actionname)
* [`aio runtime:action:invoke ACTIONNAME`](#aio-runtimeactioninvoke-actionname)
* [`aio runtime:action:list [PACKAGENAME]`](#aio-runtimeactionlist-packagename)
* [`aio runtime:action:ls [PACKAGENAME]`](#aio-runtimeactionls-packagename)
* [`aio runtime:action:update ACTIONNAME [ACTIONPATH]`](#aio-runtimeactionupdate-actionname-actionpath)
* [`aio runtime:actions:list [PACKAGENAME]`](#aio-runtimeactionslist-packagename)
* [`aio runtime:actions:ls [PACKAGENAME]`](#aio-runtimeactionsls-packagename)
* [`aio runtime:activation`](#aio-runtimeactivation)
* [`aio runtime:activation:get [ACTIVATIONID]`](#aio-runtimeactivationget-activationid)
* [`aio runtime:activation:list [ACTION_NAME]`](#aio-runtimeactivationlist-action_name)
* [`aio runtime:activation:log [ACTIVATIONID]`](#aio-runtimeactivationlog-activationid)
* [`aio runtime:activation:logs [ACTIVATIONID]`](#aio-runtimeactivationlogs-activationid)
* [`aio runtime:activation:ls [ACTION_NAME]`](#aio-runtimeactivationls-action_name)
* [`aio runtime:activation:result [ACTIVATIONID]`](#aio-runtimeactivationresult-activationid)
* [`aio runtime:activations:list [ACTION_NAME]`](#aio-runtimeactivationslist-action_name)
* [`aio runtime:activations:ls [ACTION_NAME]`](#aio-runtimeactivationsls-action_name)
* [`aio runtime:api`](#aio-runtimeapi)
* [`aio runtime:api:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`](#aio-runtimeapicreate-basepath-relpath-apiverb-action)
* [`aio runtime:api:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#aio-runtimeapidelete-basepathorapiname-relpath-apiverb)
* [`aio runtime:api:get BASEPATHORAPINAME`](#aio-runtimeapiget-basepathorapiname)
* [`aio runtime:api:list [BASEPATH] [RELPATH] [APIVERB]`](#aio-runtimeapilist-basepath-relpath-apiverb)
* [`aio runtime:api:ls [BASEPATH] [RELPATH] [APIVERB]`](#aio-runtimeapils-basepath-relpath-apiverb)
* [`aio runtime:deploy`](#aio-runtimedeploy)
* [`aio runtime:deploy:export`](#aio-runtimedeployexport)
* [`aio runtime:deploy:report`](#aio-runtimedeployreport)
* [`aio runtime:deploy:sync`](#aio-runtimedeploysync)
* [`aio runtime:deploy:undeploy`](#aio-runtimedeployundeploy)
* [`aio runtime:deploy:version`](#aio-runtimedeployversion)
* [`aio runtime:list`](#aio-runtimelist)
* [`aio runtime:log [ACTIVATIONID]`](#aio-runtimelog-activationid)
* [`aio runtime:logs [ACTIVATIONID]`](#aio-runtimelogs-activationid)
* [`aio runtime:ls`](#aio-runtimels)
* [`aio runtime:namespace`](#aio-runtimenamespace)
* [`aio runtime:namespace:get`](#aio-runtimenamespaceget)
* [`aio runtime:namespace:lf`](#aio-runtimenamespacelf)
* [`aio runtime:namespace:lf:errors`](#aio-runtimenamespacelferrors)
* [`aio runtime:namespace:lf:get`](#aio-runtimenamespacelfget)
* [`aio runtime:namespace:lf:set`](#aio-runtimenamespacelfset)
* [`aio runtime:namespace:lf:set:adobe-io-runtime`](#aio-runtimenamespacelfsetadobe-io-runtime)
* [`aio runtime:namespace:lf:set:azure-log-analytics`](#aio-runtimenamespacelfsetazure-log-analytics)
* [`aio runtime:namespace:lf:set:splunk-hec`](#aio-runtimenamespacelfsetsplunk-hec)
* [`aio runtime:namespace:list`](#aio-runtimenamespacelist)
* [`aio runtime:namespace:log-forwarding`](#aio-runtimenamespacelog-forwarding)
* [`aio runtime:namespace:log-forwarding:errors`](#aio-runtimenamespacelog-forwardingerrors)
* [`aio runtime:namespace:log-forwarding:get`](#aio-runtimenamespacelog-forwardingget)
* [`aio runtime:namespace:log-forwarding:set`](#aio-runtimenamespacelog-forwardingset)
* [`aio runtime:namespace:log-forwarding:set:adobe-io-runtime`](#aio-runtimenamespacelog-forwardingsetadobe-io-runtime)
* [`aio runtime:namespace:log-forwarding:set:azure-log-analytics`](#aio-runtimenamespacelog-forwardingsetazure-log-analytics)
* [`aio runtime:namespace:log-forwarding:set:splunk-hec`](#aio-runtimenamespacelog-forwardingsetsplunk-hec)
* [`aio runtime:namespace:ls`](#aio-runtimenamespacels)
* [`aio runtime:ns`](#aio-runtimens)
* [`aio runtime:ns:lf`](#aio-runtimenslf)
* [`aio runtime:ns:lf:errors`](#aio-runtimenslferrors)
* [`aio runtime:ns:lf:get`](#aio-runtimenslfget)
* [`aio runtime:ns:lf:set`](#aio-runtimenslfset)
* [`aio runtime:ns:lf:set:adobe-io-runtime`](#aio-runtimenslfsetadobe-io-runtime)
* [`aio runtime:ns:lf:set:azure-log-analytics`](#aio-runtimenslfsetazure-log-analytics)
* [`aio runtime:ns:lf:set:splunk-hec`](#aio-runtimenslfsetsplunk-hec)
* [`aio runtime:ns:list`](#aio-runtimenslist)
* [`aio runtime:ns:log-forwarding`](#aio-runtimenslog-forwarding)
* [`aio runtime:ns:log-forwarding:errors`](#aio-runtimenslog-forwardingerrors)
* [`aio runtime:ns:log-forwarding:get`](#aio-runtimenslog-forwardingget)
* [`aio runtime:ns:log-forwarding:set`](#aio-runtimenslog-forwardingset)
* [`aio runtime:ns:log-forwarding:set:adobe-io-runtime`](#aio-runtimenslog-forwardingsetadobe-io-runtime)
* [`aio runtime:ns:log-forwarding:set:azure-log-analytics`](#aio-runtimenslog-forwardingsetazure-log-analytics)
* [`aio runtime:ns:log-forwarding:set:splunk-hec`](#aio-runtimenslog-forwardingsetsplunk-hec)
* [`aio runtime:ns:ls`](#aio-runtimensls)
* [`aio runtime:package`](#aio-runtimepackage)
* [`aio runtime:package:bind PACKAGENAME BINDPACKAGENAME`](#aio-runtimepackagebind-packagename-bindpackagename)
* [`aio runtime:package:create PACKAGENAME`](#aio-runtimepackagecreate-packagename)
* [`aio runtime:package:delete PACKAGENAME`](#aio-runtimepackagedelete-packagename)
* [`aio runtime:package:get PACKAGENAME`](#aio-runtimepackageget-packagename)
* [`aio runtime:package:list [NAMESPACE]`](#aio-runtimepackagelist-namespace)
* [`aio runtime:package:ls [NAMESPACE]`](#aio-runtimepackagels-namespace)
* [`aio runtime:package:update PACKAGENAME`](#aio-runtimepackageupdate-packagename)
* [`aio runtime:pkg`](#aio-runtimepkg)
* [`aio runtime:pkg:bind PACKAGENAME BINDPACKAGENAME`](#aio-runtimepkgbind-packagename-bindpackagename)
* [`aio runtime:pkg:create PACKAGENAME`](#aio-runtimepkgcreate-packagename)
* [`aio runtime:pkg:delete PACKAGENAME`](#aio-runtimepkgdelete-packagename)
* [`aio runtime:pkg:get PACKAGENAME`](#aio-runtimepkgget-packagename)
* [`aio runtime:pkg:list [NAMESPACE]`](#aio-runtimepkglist-namespace)
* [`aio runtime:pkg:ls [NAMESPACE]`](#aio-runtimepkgls-namespace)
* [`aio runtime:pkg:update PACKAGENAME`](#aio-runtimepkgupdate-packagename)
* [`aio runtime:prop`](#aio-runtimeprop)
* [`aio runtime:prop:get`](#aio-runtimepropget)
* [`aio runtime:prop:set`](#aio-runtimepropset)
* [`aio runtime:prop:unset`](#aio-runtimepropunset)
* [`aio runtime:property`](#aio-runtimeproperty)
* [`aio runtime:property:get`](#aio-runtimepropertyget)
* [`aio runtime:property:set`](#aio-runtimepropertyset)
* [`aio runtime:property:unset`](#aio-runtimepropertyunset)
* [`aio runtime:route`](#aio-runtimeroute)
* [`aio runtime:route:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`](#aio-runtimeroutecreate-basepath-relpath-apiverb-action)
* [`aio runtime:route:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#aio-runtimeroutedelete-basepathorapiname-relpath-apiverb)
* [`aio runtime:route:get BASEPATHORAPINAME`](#aio-runtimerouteget-basepathorapiname)
* [`aio runtime:route:list [BASEPATH] [RELPATH] [APIVERB]`](#aio-runtimeroutelist-basepath-relpath-apiverb)
* [`aio runtime:route:ls [BASEPATH] [RELPATH] [APIVERB]`](#aio-runtimeroutels-basepath-relpath-apiverb)
* [`aio runtime:rule`](#aio-runtimerule)
* [`aio runtime:rule:create NAME TRIGGER ACTION`](#aio-runtimerulecreate-name-trigger-action)
* [`aio runtime:rule:delete NAME`](#aio-runtimeruledelete-name)
* [`aio runtime:rule:disable NAME`](#aio-runtimeruledisable-name)
* [`aio runtime:rule:enable NAME`](#aio-runtimeruleenable-name)
* [`aio runtime:rule:get NAME`](#aio-runtimeruleget-name)
* [`aio runtime:rule:list`](#aio-runtimerulelist)
* [`aio runtime:rule:ls`](#aio-runtimerulels)
* [`aio runtime:rule:status NAME`](#aio-runtimerulestatus-name)
* [`aio runtime:rule:update NAME TRIGGER ACTION`](#aio-runtimeruleupdate-name-trigger-action)
* [`aio runtime:trigger`](#aio-runtimetrigger)
* [`aio runtime:trigger:create TRIGGERNAME`](#aio-runtimetriggercreate-triggername)
* [`aio runtime:trigger:delete TRIGGERPATH`](#aio-runtimetriggerdelete-triggerpath)
* [`aio runtime:trigger:fire TRIGGERNAME`](#aio-runtimetriggerfire-triggername)
* [`aio runtime:trigger:get TRIGGERPATH`](#aio-runtimetriggerget-triggerpath)
* [`aio runtime:trigger:list`](#aio-runtimetriggerlist)
* [`aio runtime:trigger:ls`](#aio-runtimetriggerls)
* [`aio runtime:trigger:update TRIGGERNAME`](#aio-runtimetriggerupdate-triggername)

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

## `aio rt:action`

Manage your actions

```
USAGE
  $ aio rt:action [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio rt:action
```

## `aio rt:action:create ACTIONNAME [ACTIONPATH]`

Creates an Action

```
USAGE
  $ aio rt:action:create [ACTIONNAME] [ACTIONPATH] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost
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
  -l, --logsize=<value>          the maximum log size LIMIT in MB for the action (default 10)
  -m, --memory=<value>           the maximum memory LIMIT in MB for the action (default 256)
  -p, --param=<value>...         parameter values in KEY VALUE format
  -t, --timeout=<value>          the timeout LIMIT in milliseconds after which the action is terminated (default 60000)
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
  $ aio rt:action:create
```

## `aio rt:action:del ACTIONNAME`

Deletes an Action

```
USAGE
  $ aio rt:action:del [ACTIONNAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:action:del
  $ aio rt:action:delete
  $ aio rt:action:del
```

## `aio rt:action:delete ACTIONNAME`

Deletes an Action

```
USAGE
  $ aio rt:action:delete [ACTIONNAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:action:del
  $ aio rt:action:delete
  $ aio rt:action:del
```

## `aio rt:action:get ACTIONNAME`

Retrieves an Action

```
USAGE
  $ aio rt:action:get [ACTIONNAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio rt:action:get
```

## `aio rt:action:invoke ACTIONNAME`

Invokes an Action

```
USAGE
  $ aio rt:action:invoke [ACTIONNAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio rt:action:invoke
```

## `aio rt:action:list [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio rt:action:list [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions
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
  $ aio runtime:action:ls
  $ aio runtime:actions:list
  $ aio runtime:actions:ls
  $ aio rt:action:list
  $ aio rt:actions:list
  $ aio rt:action:ls
  $ aio rt:actions:ls
```

## `aio rt:action:ls [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio rt:action:ls [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions
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
  $ aio runtime:action:ls
  $ aio runtime:actions:list
  $ aio runtime:actions:ls
  $ aio rt:action:list
  $ aio rt:actions:list
  $ aio rt:action:ls
  $ aio rt:actions:ls
```

## `aio rt:action:update ACTIONNAME [ACTIONPATH]`

Updates an Action

```
USAGE
  $ aio rt:action:update [ACTIONNAME] [ACTIONPATH] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost
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
  -l, --logsize=<value>          the maximum log size LIMIT in MB for the action (default 10)
  -m, --memory=<value>           the maximum memory LIMIT in MB for the action (default 256)
  -p, --param=<value>...         parameter values in KEY VALUE format
  -t, --timeout=<value>          the timeout LIMIT in milliseconds after which the action is terminated (default 60000)
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
  $ aio rt:action:update
```

## `aio rt:actions:list [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio rt:actions:list [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions
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
  $ aio runtime:action:ls
  $ aio runtime:actions:list
  $ aio runtime:actions:ls
  $ aio rt:action:list
  $ aio rt:actions:list
  $ aio rt:action:ls
  $ aio rt:actions:ls
```

## `aio rt:actions:ls [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio rt:actions:ls [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions
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
  $ aio runtime:action:ls
  $ aio runtime:actions:list
  $ aio runtime:actions:ls
  $ aio rt:action:list
  $ aio rt:actions:list
  $ aio rt:action:ls
  $ aio rt:actions:ls
```

## `aio rt:activation`

Manage your activations

```
USAGE
  $ aio rt:activation [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio rt:activation
```

## `aio rt:activation:get [ACTIVATIONID]`

Retrieves an Activation

```
USAGE
  $ aio rt:activation:get [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  $ aio rt:activation:get
```

## `aio rt:activation:list [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio rt:activation:list [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations
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
  $ aio runtime:activations:list
  $ aio runtime:activation:ls
  $ aio runtime:activations:ls
  $ aio rt:activation:list
  $ aio rt:activation:ls
  $ aio rt:activations:list
  $ aio rt:activations:ls
```

## `aio rt:activation:log [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio rt:activation:log [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  --limit=<value>        return logs only from last LIMIT number of activations
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime:activation:log
  $ aio runtime:log
  $ aio runtime:logs
  $ aio rt:activation:logs
  $ aio rt:activation:log
  $ aio rt:log
  $ aio rt:logs
```

## `aio rt:activation:logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio rt:activation:logs [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  --limit=<value>        return logs only from last LIMIT number of activations
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime:activation:log
  $ aio runtime:log
  $ aio runtime:logs
  $ aio rt:activation:logs
  $ aio rt:activation:log
  $ aio rt:log
  $ aio rt:logs
```

## `aio rt:activation:ls [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio rt:activation:ls [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations
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
  $ aio runtime:activations:list
  $ aio runtime:activation:ls
  $ aio runtime:activations:ls
  $ aio rt:activation:list
  $ aio rt:activation:ls
  $ aio rt:activations:list
  $ aio rt:activations:ls
```

## `aio rt:activation:result [ACTIVATIONID]`

Retrieves the Results for an Activation

```
USAGE
  $ aio rt:activation:result [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  $ aio rt:activation:result
```

## `aio rt:activations:list [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio rt:activations:list [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations
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
  $ aio runtime:activations:list
  $ aio runtime:activation:ls
  $ aio runtime:activations:ls
  $ aio rt:activation:list
  $ aio rt:activation:ls
  $ aio rt:activations:list
  $ aio rt:activations:ls
```

## `aio rt:activations:ls [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio rt:activations:ls [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations
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
  $ aio runtime:activations:list
  $ aio runtime:activation:ls
  $ aio runtime:activations:ls
  $ aio rt:activation:list
  $ aio rt:activation:ls
  $ aio rt:activations:list
  $ aio rt:activations:ls
```

## `aio rt:api`

Manage your routes

```
USAGE
  $ aio rt:api [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:api
  $ aio rt:api
```

## `aio rt:api:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`

create a new api route

```
USAGE
  $ aio rt:api:create [BASEPATH] [RELPATH] [APIVERB] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
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
  $ aio runtime:api:create
  $ aio rt:route:create
  $ aio rt:api:create
```

## `aio rt:api:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
USAGE
  $ aio rt:api:delete [BASEPATHORAPINAME] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
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
  $ aio runtime:api:delete
  $ aio rt:route:delete
  $ aio rt:api:delete
```

## `aio rt:api:get BASEPATHORAPINAME`

get API details

```
USAGE
  $ aio rt:api:get [BASEPATHORAPINAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
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
  $ aio runtime:api:get
  $ aio rt:route:get
  $ aio rt:api:get
```

## `aio rt:api:list [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio rt:api:list [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
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
  $ aio runtime:route:ls
  $ aio runtime:api:list
  $ aio runtime:api:ls
  $ aio rt:route:list
  $ aio rt:route:ls
  $ aio rt:api:list
  $ aio rt:api:ls
```

## `aio rt:api:ls [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio rt:api:ls [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
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
  $ aio runtime:route:ls
  $ aio runtime:api:list
  $ aio runtime:api:ls
  $ aio rt:route:list
  $ aio rt:route:ls
  $ aio rt:api:list
  $ aio rt:api:ls
```

## `aio rt:deploy`

The Runtime Deployment Tool

```
USAGE
  $ aio rt:deploy [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:deploy
```

## `aio rt:deploy:export`

Exports managed project assets from Runtime to manifest and function files

```
USAGE
  $ aio rt:deploy:export -m <value> --projectname <value> [--cert <value>] [--key <value>] [--apiversion <value>]
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
  $ aio rt:deploy:export
```

## `aio rt:deploy:report`

Provides a summary report of Runtime assets being deployed/undeployed based on manifest/deployment YAML

```
USAGE
  $ aio rt:deploy:report [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:deploy:report
```

## `aio rt:deploy:sync`

A tool to sync deployment and undeployment of Runtime packages using a manifest and optional deployment files using YAML

```
USAGE
  $ aio rt:deploy:sync [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:deploy:sync
```

## `aio rt:deploy:undeploy`

Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML

```
USAGE
  $ aio rt:deploy:undeploy [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:deploy:undeploy
```

## `aio rt:deploy:version`

Prints the version number of aio runtime deploy

```
USAGE
  $ aio rt:deploy:version [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio rt:deploy:version
```

## `aio rt:get`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio rt:get [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:get
  $ aio runtime:list
  $ aio rt:list
  $ aio runtime:ls
  $ aio rt:ls
```

## `aio rt:list`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio rt:list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:get
  $ aio runtime:list
  $ aio rt:list
  $ aio runtime:ls
  $ aio rt:ls
```

## `aio rt:log [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio rt:log [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  --limit=<value>        return logs only from last LIMIT number of activations
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime:activation:log
  $ aio runtime:log
  $ aio runtime:logs
  $ aio rt:activation:logs
  $ aio rt:activation:log
  $ aio rt:log
  $ aio rt:logs
```

## `aio rt:logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio rt:logs [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  --limit=<value>        return logs only from last LIMIT number of activations
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime:activation:log
  $ aio runtime:log
  $ aio runtime:logs
  $ aio rt:activation:logs
  $ aio rt:activation:log
  $ aio rt:log
  $ aio rt:logs
```

## `aio rt:ls`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio rt:ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:get
  $ aio runtime:list
  $ aio rt:list
  $ aio runtime:ls
  $ aio rt:ls
```

## `aio rt:namespace`

Manage your namespaces

```
USAGE
  $ aio rt:namespace [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns
  $ aio rt:namespace
  $ aio rt:ns
```

## `aio rt:namespace:lf`

Manage log forwarding settings

```
USAGE
  $ aio rt:namespace:lf [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding
  $ aio runtime:ns:lf
  $ aio runtime:namespace:lf
  $ aio rt:namespace:log-forwarding
  $ aio rt:namespace:lf
  $ aio rt:ns:log-forwarding
  $ aio rt:ns:lf
```

## `aio rt:namespace:lf:errors`

Get log forwarding errors

```
USAGE
  $ aio rt:namespace:lf:errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:errors
  $ aio runtime:ns:lf:errors
  $ aio runtime:namespace:lf:errors
  $ aio rt:namespace:log-forwarding:errors
  $ aio rt:namespace:lf:errors
  $ aio rt:ns:log-forwarding:errors
  $ aio rt:ns:lf:errors
```

## `aio rt:namespace:lf:get`

Get log forwarding destination configuration

```
USAGE
  $ aio rt:namespace:lf:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:get
  $ aio runtime:ns:lf:get
  $ aio runtime:namespace:lf:get
  $ aio rt:namespace:log-forwarding:get
  $ aio rt:namespace:lf:get
  $ aio rt:ns:log-forwarding:get
  $ aio rt:ns:lf:get
```

## `aio rt:namespace:lf:set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio rt:namespace:lf:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set
  $ aio runtime:ns:lf:set
  $ aio runtime:namespace:lf:set
  $ aio rt:namespace:log-forwarding:set
  $ aio rt:namespace:lf:set
  $ aio rt:ns:log-forwarding:set
  $ aio rt:ns:lf:set
```

## `aio rt:namespace:lf:set:adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio rt:namespace:lf:set:adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set:adobe-io-runtime
  $ aio runtime:ns:lf:set:adobe-io-runtime
  $ aio runtime:namespace:lf:set:adobe-io-runtime
  $ aio rt:namespace:log-forwarding:set:adobe-io-runtime
  $ aio rt:namespace:lf:set:adobe-io-runtime
  $ aio rt:ns:log-forwarding:set:adobe-io-runtime
  $ aio rt:ns:lf:set:adobe-io-runtime
```

## `aio rt:namespace:lf:set:azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio rt:namespace:lf:set:azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
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
  $ aio runtime:ns:log-forwarding:set:azure-log-analytics
  $ aio runtime:ns:lf:set:azure-log-analytics
  $ aio runtime:namespace:lf:set:azure-log-analytics
  $ aio rt:namespace:log-forwarding:set:azure-log-analytics
  $ aio rt:namespace:lf:set:azure-log-analytics
  $ aio rt:ns:log-forwarding:set:azure-log-analytics
  $ aio rt:ns:lf:set:azure-log-analytics
```

## `aio rt:namespace:lf:set:splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio rt:namespace:lf:set:splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
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
  $ aio runtime:ns:log-forwarding:set:splunk-hec
  $ aio runtime:ns:lf:set:splunk-hec
  $ aio runtime:namespace:lf:set:splunk-hec
  $ aio rt:namespace:log-forwarding:set:splunk-hec
  $ aio rt:namespace:lf:set:splunk-hec
  $ aio rt:ns:log-forwarding:set:splunk-hec
  $ aio rt:ns:lf:set:splunk-hec
```

## `aio rt:namespace:list`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio rt:namespace:list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio runtime:namespace:ls
  $ aio runtime:ns:list
  $ aio runtime:ns:ls
  $ aio rt:namespace:list
  $ aio rt:namespace:ls
  $ aio rt:ns:list
  $ aio rt:ns:ls
```

## `aio rt:namespace:log-forwarding`

Manage log forwarding settings

```
USAGE
  $ aio rt:namespace:log-forwarding [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding
  $ aio runtime:ns:lf
  $ aio runtime:namespace:lf
  $ aio rt:namespace:log-forwarding
  $ aio rt:namespace:lf
  $ aio rt:ns:log-forwarding
  $ aio rt:ns:lf
```

## `aio rt:namespace:log-forwarding:errors`

Get log forwarding errors

```
USAGE
  $ aio rt:namespace:log-forwarding:errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:errors
  $ aio runtime:ns:lf:errors
  $ aio runtime:namespace:lf:errors
  $ aio rt:namespace:log-forwarding:errors
  $ aio rt:namespace:lf:errors
  $ aio rt:ns:log-forwarding:errors
  $ aio rt:ns:lf:errors
```

## `aio rt:namespace:log-forwarding:get`

Get log forwarding destination configuration

```
USAGE
  $ aio rt:namespace:log-forwarding:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:get
  $ aio runtime:ns:lf:get
  $ aio runtime:namespace:lf:get
  $ aio rt:namespace:log-forwarding:get
  $ aio rt:namespace:lf:get
  $ aio rt:ns:log-forwarding:get
  $ aio rt:ns:lf:get
```

## `aio rt:namespace:log-forwarding:set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio rt:namespace:log-forwarding:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set
  $ aio runtime:ns:lf:set
  $ aio runtime:namespace:lf:set
  $ aio rt:namespace:log-forwarding:set
  $ aio rt:namespace:lf:set
  $ aio rt:ns:log-forwarding:set
  $ aio rt:ns:lf:set
```

## `aio rt:namespace:log-forwarding:set:adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio rt:namespace:log-forwarding:set:adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set:adobe-io-runtime
  $ aio runtime:ns:lf:set:adobe-io-runtime
  $ aio runtime:namespace:lf:set:adobe-io-runtime
  $ aio rt:namespace:log-forwarding:set:adobe-io-runtime
  $ aio rt:namespace:lf:set:adobe-io-runtime
  $ aio rt:ns:log-forwarding:set:adobe-io-runtime
  $ aio rt:ns:lf:set:adobe-io-runtime
```

## `aio rt:namespace:log-forwarding:set:azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio rt:namespace:log-forwarding:set:azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
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
  $ aio runtime:ns:log-forwarding:set:azure-log-analytics
  $ aio runtime:ns:lf:set:azure-log-analytics
  $ aio runtime:namespace:lf:set:azure-log-analytics
  $ aio rt:namespace:log-forwarding:set:azure-log-analytics
  $ aio rt:namespace:lf:set:azure-log-analytics
  $ aio rt:ns:log-forwarding:set:azure-log-analytics
  $ aio rt:ns:lf:set:azure-log-analytics
```

## `aio rt:namespace:log-forwarding:set:splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio rt:namespace:log-forwarding:set:splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
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
  $ aio runtime:ns:log-forwarding:set:splunk-hec
  $ aio runtime:ns:lf:set:splunk-hec
  $ aio runtime:namespace:lf:set:splunk-hec
  $ aio rt:namespace:log-forwarding:set:splunk-hec
  $ aio rt:namespace:lf:set:splunk-hec
  $ aio rt:ns:log-forwarding:set:splunk-hec
  $ aio rt:ns:lf:set:splunk-hec
```

## `aio rt:namespace:ls`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio rt:namespace:ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio runtime:namespace:ls
  $ aio runtime:ns:list
  $ aio runtime:ns:ls
  $ aio rt:namespace:list
  $ aio rt:namespace:ls
  $ aio rt:ns:list
  $ aio rt:ns:ls
```

## `aio rt:ns`

Manage your namespaces

```
USAGE
  $ aio rt:ns [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns
  $ aio rt:namespace
  $ aio rt:ns
```

## `aio rt:ns:lf`

Manage log forwarding settings

```
USAGE
  $ aio rt:ns:lf [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding
  $ aio runtime:ns:lf
  $ aio runtime:namespace:lf
  $ aio rt:namespace:log-forwarding
  $ aio rt:namespace:lf
  $ aio rt:ns:log-forwarding
  $ aio rt:ns:lf
```

## `aio rt:ns:lf:errors`

Get log forwarding errors

```
USAGE
  $ aio rt:ns:lf:errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:errors
  $ aio runtime:ns:lf:errors
  $ aio runtime:namespace:lf:errors
  $ aio rt:namespace:log-forwarding:errors
  $ aio rt:namespace:lf:errors
  $ aio rt:ns:log-forwarding:errors
  $ aio rt:ns:lf:errors
```

## `aio rt:ns:lf:get`

Get log forwarding destination configuration

```
USAGE
  $ aio rt:ns:lf:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:get
  $ aio runtime:ns:lf:get
  $ aio runtime:namespace:lf:get
  $ aio rt:namespace:log-forwarding:get
  $ aio rt:namespace:lf:get
  $ aio rt:ns:log-forwarding:get
  $ aio rt:ns:lf:get
```

## `aio rt:ns:lf:set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio rt:ns:lf:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set
  $ aio runtime:ns:lf:set
  $ aio runtime:namespace:lf:set
  $ aio rt:namespace:log-forwarding:set
  $ aio rt:namespace:lf:set
  $ aio rt:ns:log-forwarding:set
  $ aio rt:ns:lf:set
```

## `aio rt:ns:lf:set:adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio rt:ns:lf:set:adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set:adobe-io-runtime
  $ aio runtime:ns:lf:set:adobe-io-runtime
  $ aio runtime:namespace:lf:set:adobe-io-runtime
  $ aio rt:namespace:log-forwarding:set:adobe-io-runtime
  $ aio rt:namespace:lf:set:adobe-io-runtime
  $ aio rt:ns:log-forwarding:set:adobe-io-runtime
  $ aio rt:ns:lf:set:adobe-io-runtime
```

## `aio rt:ns:lf:set:azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio rt:ns:lf:set:azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
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
  $ aio runtime:ns:log-forwarding:set:azure-log-analytics
  $ aio runtime:ns:lf:set:azure-log-analytics
  $ aio runtime:namespace:lf:set:azure-log-analytics
  $ aio rt:namespace:log-forwarding:set:azure-log-analytics
  $ aio rt:namespace:lf:set:azure-log-analytics
  $ aio rt:ns:log-forwarding:set:azure-log-analytics
  $ aio rt:ns:lf:set:azure-log-analytics
```

## `aio rt:ns:lf:set:splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio rt:ns:lf:set:splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
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
  $ aio runtime:ns:log-forwarding:set:splunk-hec
  $ aio runtime:ns:lf:set:splunk-hec
  $ aio runtime:namespace:lf:set:splunk-hec
  $ aio rt:namespace:log-forwarding:set:splunk-hec
  $ aio rt:namespace:lf:set:splunk-hec
  $ aio rt:ns:log-forwarding:set:splunk-hec
  $ aio rt:ns:lf:set:splunk-hec
```

## `aio rt:ns:list`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio rt:ns:list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio runtime:namespace:ls
  $ aio runtime:ns:list
  $ aio runtime:ns:ls
  $ aio rt:namespace:list
  $ aio rt:namespace:ls
  $ aio rt:ns:list
  $ aio rt:ns:ls
```

## `aio rt:ns:log-forwarding`

Manage log forwarding settings

```
USAGE
  $ aio rt:ns:log-forwarding [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding
  $ aio runtime:ns:lf
  $ aio runtime:namespace:lf
  $ aio rt:namespace:log-forwarding
  $ aio rt:namespace:lf
  $ aio rt:ns:log-forwarding
  $ aio rt:ns:lf
```

## `aio rt:ns:log-forwarding:errors`

Get log forwarding errors

```
USAGE
  $ aio rt:ns:log-forwarding:errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:errors
  $ aio runtime:ns:lf:errors
  $ aio runtime:namespace:lf:errors
  $ aio rt:namespace:log-forwarding:errors
  $ aio rt:namespace:lf:errors
  $ aio rt:ns:log-forwarding:errors
  $ aio rt:ns:lf:errors
```

## `aio rt:ns:log-forwarding:get`

Get log forwarding destination configuration

```
USAGE
  $ aio rt:ns:log-forwarding:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:get
  $ aio runtime:ns:lf:get
  $ aio runtime:namespace:lf:get
  $ aio rt:namespace:log-forwarding:get
  $ aio rt:namespace:lf:get
  $ aio rt:ns:log-forwarding:get
  $ aio rt:ns:lf:get
```

## `aio rt:ns:log-forwarding:set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio rt:ns:log-forwarding:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set
  $ aio runtime:ns:lf:set
  $ aio runtime:namespace:lf:set
  $ aio rt:namespace:log-forwarding:set
  $ aio rt:namespace:lf:set
  $ aio rt:ns:log-forwarding:set
  $ aio rt:ns:lf:set
```

## `aio rt:ns:log-forwarding:set:adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio rt:ns:log-forwarding:set:adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set:adobe-io-runtime
  $ aio runtime:ns:lf:set:adobe-io-runtime
  $ aio runtime:namespace:lf:set:adobe-io-runtime
  $ aio rt:namespace:log-forwarding:set:adobe-io-runtime
  $ aio rt:namespace:lf:set:adobe-io-runtime
  $ aio rt:ns:log-forwarding:set:adobe-io-runtime
  $ aio rt:ns:lf:set:adobe-io-runtime
```

## `aio rt:ns:log-forwarding:set:azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio rt:ns:log-forwarding:set:azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
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
  $ aio runtime:ns:log-forwarding:set:azure-log-analytics
  $ aio runtime:ns:lf:set:azure-log-analytics
  $ aio runtime:namespace:lf:set:azure-log-analytics
  $ aio rt:namespace:log-forwarding:set:azure-log-analytics
  $ aio rt:namespace:lf:set:azure-log-analytics
  $ aio rt:ns:log-forwarding:set:azure-log-analytics
  $ aio rt:ns:lf:set:azure-log-analytics
```

## `aio rt:ns:log-forwarding:set:splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio rt:ns:log-forwarding:set:splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
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
  $ aio runtime:ns:log-forwarding:set:splunk-hec
  $ aio runtime:ns:lf:set:splunk-hec
  $ aio runtime:namespace:lf:set:splunk-hec
  $ aio rt:namespace:log-forwarding:set:splunk-hec
  $ aio rt:namespace:lf:set:splunk-hec
  $ aio rt:ns:log-forwarding:set:splunk-hec
  $ aio rt:ns:lf:set:splunk-hec
```

## `aio rt:ns:ls`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio rt:ns:ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio runtime:namespace:ls
  $ aio runtime:ns:list
  $ aio runtime:ns:ls
  $ aio rt:namespace:list
  $ aio rt:namespace:ls
  $ aio rt:ns:list
  $ aio rt:ns:ls
```

## `aio rt:package`

Manage your packages

```
USAGE
  $ aio rt:package [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:pkg
  $ aio rt:package
  $ aio rt:pkg
```

## `aio rt:package:bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
USAGE
  $ aio rt:package:bind [PACKAGENAME] [BINDPACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>]
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
  $ aio runtime:pkg:bind
  $ aio rt:package:bind
  $ aio rt:pkg:bind
```

## `aio rt:package:create PACKAGENAME`

Creates a Package

```
USAGE
  $ aio rt:package:create [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:create
  $ aio rt:package:create
  $ aio rt:pkg:create
```

## `aio rt:package:delete PACKAGENAME`

Deletes a Package

```
USAGE
  $ aio rt:package:delete [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:delete
  $ aio rt:package:delete
  $ aio rt:pkg:delete
```

## `aio rt:package:get PACKAGENAME`

Retrieves a Package

```
USAGE
  $ aio rt:package:get [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:get
  $ aio rt:package:get
  $ aio rt:pkg:get
```

## `aio rt:package:list [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio rt:package:list [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages
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
  $ aio runtime:package:ls
  $ aio runtime:pkg:list
  $ aio runtime:pkg:ls
  $ aio rt:package:list
  $ aio rt:package:ls
  $ aio rt:pkg:list
  $ aio rt:pkg:ls
```

## `aio rt:package:ls [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio rt:package:ls [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages
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
  $ aio runtime:package:ls
  $ aio runtime:pkg:list
  $ aio runtime:pkg:ls
  $ aio rt:package:list
  $ aio rt:package:ls
  $ aio rt:pkg:list
  $ aio rt:pkg:ls
```

## `aio rt:package:update PACKAGENAME`

Updates a Package

```
USAGE
  $ aio rt:package:update [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:update
  $ aio rt:package:update
  $ aio rt:pkg:update
```

## `aio rt:pkg`

Manage your packages

```
USAGE
  $ aio rt:pkg [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:pkg
  $ aio rt:package
  $ aio rt:pkg
```

## `aio rt:pkg:bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
USAGE
  $ aio rt:pkg:bind [PACKAGENAME] [BINDPACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>]
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
  $ aio runtime:pkg:bind
  $ aio rt:package:bind
  $ aio rt:pkg:bind
```

## `aio rt:pkg:create PACKAGENAME`

Creates a Package

```
USAGE
  $ aio rt:pkg:create [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:create
  $ aio rt:package:create
  $ aio rt:pkg:create
```

## `aio rt:pkg:delete PACKAGENAME`

Deletes a Package

```
USAGE
  $ aio rt:pkg:delete [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:delete
  $ aio rt:package:delete
  $ aio rt:pkg:delete
```

## `aio rt:pkg:get PACKAGENAME`

Retrieves a Package

```
USAGE
  $ aio rt:pkg:get [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:get
  $ aio rt:package:get
  $ aio rt:pkg:get
```

## `aio rt:pkg:list [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio rt:pkg:list [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages
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
  $ aio runtime:package:ls
  $ aio runtime:pkg:list
  $ aio runtime:pkg:ls
  $ aio rt:package:list
  $ aio rt:package:ls
  $ aio rt:pkg:list
  $ aio rt:pkg:ls
```

## `aio rt:pkg:ls [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio rt:pkg:ls [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages
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
  $ aio runtime:package:ls
  $ aio runtime:pkg:list
  $ aio runtime:pkg:ls
  $ aio rt:package:list
  $ aio rt:package:ls
  $ aio rt:pkg:list
  $ aio rt:pkg:ls
```

## `aio rt:pkg:update PACKAGENAME`

Updates a Package

```
USAGE
  $ aio rt:pkg:update [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:update
  $ aio rt:package:update
  $ aio rt:pkg:update
```

## `aio rt:prop`

Execute property commands

```
USAGE
  $ aio rt:prop [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop
  $ aio rt:prop
  $ aio rt:property
```

## `aio rt:prop:get`

get property

```
USAGE
  $ aio rt:prop:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:get
  $ aio rt:property:get
  $ aio rt:prop:get
```

## `aio rt:prop:set`

set property

```
USAGE
  $ aio rt:prop:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:set
  $ aio rt:property:set
  $ aio rt:prop:set
```

## `aio rt:prop:unset`

unset property

```
USAGE
  $ aio rt:prop:unset [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:unset
  $ aio rt:property:unset
  $ aio rt:prop:unset
```

## `aio rt:property`

Execute property commands

```
USAGE
  $ aio rt:property [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop
  $ aio rt:prop
  $ aio rt:property
```

## `aio rt:property:get`

get property

```
USAGE
  $ aio rt:property:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:get
  $ aio rt:property:get
  $ aio rt:prop:get
```

## `aio rt:property:set`

set property

```
USAGE
  $ aio rt:property:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:set
  $ aio rt:property:set
  $ aio rt:prop:set
```

## `aio rt:property:unset`

unset property

```
USAGE
  $ aio rt:property:unset [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:unset
  $ aio rt:property:unset
  $ aio rt:prop:unset
```

## `aio rt:route:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`

create a new api route

```
USAGE
  $ aio rt:route:create [BASEPATH] [RELPATH] [APIVERB] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
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
  $ aio runtime:api:create
  $ aio rt:route:create
  $ aio rt:api:create
```

## `aio rt:route:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
USAGE
  $ aio rt:route:delete [BASEPATHORAPINAME] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
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
  $ aio runtime:api:delete
  $ aio rt:route:delete
  $ aio rt:api:delete
```

## `aio rt:route:get BASEPATHORAPINAME`

get API details

```
USAGE
  $ aio rt:route:get [BASEPATHORAPINAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
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
  $ aio runtime:api:get
  $ aio rt:route:get
  $ aio rt:api:get
```

## `aio rt:route:list [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio rt:route:list [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
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
  $ aio runtime:route:ls
  $ aio runtime:api:list
  $ aio runtime:api:ls
  $ aio rt:route:list
  $ aio rt:route:ls
  $ aio rt:api:list
  $ aio rt:api:ls
```

## `aio rt:route:ls [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio rt:route:ls [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
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
  $ aio runtime:route:ls
  $ aio runtime:api:list
  $ aio runtime:api:ls
  $ aio rt:route:list
  $ aio rt:route:ls
  $ aio rt:api:list
  $ aio rt:api:ls
```

## `aio rt:rule`

Manage your rules

```
USAGE
  $ aio rt:rule [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio rt:rule
```

## `aio rt:rule:create NAME TRIGGER ACTION`

Create a Rule

```
USAGE
  $ aio rt:rule:create [NAME] [TRIGGER] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [--json]

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
  $ aio rt:rule:create
```

## `aio rt:rule:delete NAME`

Delete a Rule

```
USAGE
  $ aio rt:rule:delete [NAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help] [--json]

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
  $ aio rt:rule:delete
```

## `aio rt:rule:disable NAME`

Disable a Rule

```
USAGE
  $ aio rt:rule:disable [NAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

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
  $ aio rt:rule:disable
```

## `aio rt:rule:enable NAME`

Enable a Rule

```
USAGE
  $ aio rt:rule:enable [NAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

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
  $ aio rt:rule:enable
```

## `aio rt:rule:get NAME`

Retrieves a Rule

```
USAGE
  $ aio rt:rule:get [NAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

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
  $ aio rt:rule:get
```

## `aio rt:rule:list`

Retrieves a list of Rules

```
USAGE
  $ aio rt:rule:list [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of rules
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  Limit number of rules returned
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
  $ aio runtime:rule:ls
  $ aio rt:rule:list
  $ aio rt:rule:ls
```

## `aio rt:rule:ls`

Retrieves a list of Rules

```
USAGE
  $ aio rt:rule:ls [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of rules
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  Limit number of rules returned
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
  $ aio runtime:rule:ls
  $ aio rt:rule:list
  $ aio rt:rule:ls
```

## `aio rt:rule:status NAME`

Gets the status of a rule

```
USAGE
  $ aio rt:rule:status [NAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

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
  $ aio rt:rule:status
```

## `aio rt:rule:update NAME TRIGGER ACTION`

Update a Rule

```
USAGE
  $ aio rt:rule:update [NAME] [TRIGGER] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [--json]

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
  $ aio rt:rule:update
```

## `aio rt:trigger`

Manage your triggers

```
USAGE
  $ aio rt:trigger [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio rt:trigger
```

## `aio rt:trigger:create TRIGGERNAME`

Create a trigger for Adobe I/O Runtime

```
USAGE
  $ aio rt:trigger:create [TRIGGERNAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
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
  $ aio rt:trigger:create
```

## `aio rt:trigger:delete TRIGGERPATH`

Delete a trigger for Adobe I/O Runtime

```
USAGE
  $ aio rt:trigger:delete [TRIGGERPATH] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
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
  $ aio rt:trigger:delete
```

## `aio rt:trigger:fire TRIGGERNAME`

Fire a trigger for Adobe I/O Runtime

```
USAGE
  $ aio rt:trigger:fire [TRIGGERNAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
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
  $ aio rt:trigger:fire
```

## `aio rt:trigger:get TRIGGERPATH`

Get a trigger for Adobe I/O Runtime

```
USAGE
  $ aio rt:trigger:get [TRIGGERPATH] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
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
  $ aio rt:trigger:get
```

## `aio rt:trigger:list`

Lists all of your triggers for Adobe I/O Runtime

```
USAGE
  $ aio rt:trigger:list [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of triggers
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  [default: 30] only return LIMIT number of triggers
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
  $ aio runtime:trigger:ls
  $ aio rt:trigger:list
  $ aio rt:trigger:ls
```

## `aio rt:trigger:ls`

Lists all of your triggers for Adobe I/O Runtime

```
USAGE
  $ aio rt:trigger:ls [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of triggers
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  [default: 30] only return LIMIT number of triggers
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
  $ aio runtime:trigger:ls
  $ aio rt:trigger:list
  $ aio rt:trigger:ls
```

## `aio rt:trigger:update TRIGGERNAME`

Update or create a trigger for Adobe I/O Runtime

```
USAGE
  $ aio rt:trigger:update [TRIGGERNAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
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
  $ aio rt:trigger:update
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

_See code: [src/commands/runtime/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/index.js)_

## `aio runtime:action`

Manage your actions

```
USAGE
  $ aio runtime:action [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio rt:action
```

_See code: [src/commands/runtime/action/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/action/index.js)_

## `aio runtime:action:create ACTIONNAME [ACTIONPATH]`

Creates an Action

```
USAGE
  $ aio runtime:action:create [ACTIONNAME] [ACTIONPATH] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost
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
  -l, --logsize=<value>          the maximum log size LIMIT in MB for the action (default 10)
  -m, --memory=<value>           the maximum memory LIMIT in MB for the action (default 256)
  -p, --param=<value>...         parameter values in KEY VALUE format
  -t, --timeout=<value>          the timeout LIMIT in milliseconds after which the action is terminated (default 60000)
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
  $ aio rt:action:create
```

_See code: [src/commands/runtime/action/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/action/create.js)_

## `aio runtime:action:del ACTIONNAME`

Deletes an Action

```
USAGE
  $ aio runtime:action:del [ACTIONNAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:action:del
  $ aio rt:action:delete
  $ aio rt:action:del
```

## `aio runtime:action:delete ACTIONNAME`

Deletes an Action

```
USAGE
  $ aio runtime:action:delete [ACTIONNAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:action:del
  $ aio rt:action:delete
  $ aio rt:action:del
```

_See code: [src/commands/runtime/action/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/action/delete.js)_

## `aio runtime:action:get ACTIONNAME`

Retrieves an Action

```
USAGE
  $ aio runtime:action:get [ACTIONNAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio rt:action:get
```

_See code: [src/commands/runtime/action/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/action/get.js)_

## `aio runtime:action:invoke ACTIONNAME`

Invokes an Action

```
USAGE
  $ aio runtime:action:invoke [ACTIONNAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio rt:action:invoke
```

_See code: [src/commands/runtime/action/invoke.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/action/invoke.js)_

## `aio runtime:action:list [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio runtime:action:list [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions
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
  $ aio runtime:action:ls
  $ aio runtime:actions:list
  $ aio runtime:actions:ls
  $ aio rt:action:list
  $ aio rt:actions:list
  $ aio rt:action:ls
  $ aio rt:actions:ls
```

_See code: [src/commands/runtime/action/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/action/list.js)_

## `aio runtime:action:ls [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio runtime:action:ls [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions
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
  $ aio runtime:action:ls
  $ aio runtime:actions:list
  $ aio runtime:actions:ls
  $ aio rt:action:list
  $ aio rt:actions:list
  $ aio rt:action:ls
  $ aio rt:actions:ls
```

## `aio runtime:action:update ACTIONNAME [ACTIONPATH]`

Updates an Action

```
USAGE
  $ aio runtime:action:update [ACTIONNAME] [ACTIONPATH] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost
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
  -l, --logsize=<value>          the maximum log size LIMIT in MB for the action (default 10)
  -m, --memory=<value>           the maximum memory LIMIT in MB for the action (default 256)
  -p, --param=<value>...         parameter values in KEY VALUE format
  -t, --timeout=<value>          the timeout LIMIT in milliseconds after which the action is terminated (default 60000)
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
  $ aio rt:action:update
```

_See code: [src/commands/runtime/action/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/action/update.js)_

## `aio runtime:actions:list [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio runtime:actions:list [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions
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
  $ aio runtime:action:ls
  $ aio runtime:actions:list
  $ aio runtime:actions:ls
  $ aio rt:action:list
  $ aio rt:actions:list
  $ aio rt:action:ls
  $ aio rt:actions:ls
```

## `aio runtime:actions:ls [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ aio runtime:actions:ls [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of actions
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of actions
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
  $ aio runtime:action:ls
  $ aio runtime:actions:list
  $ aio runtime:actions:ls
  $ aio rt:action:list
  $ aio rt:actions:list
  $ aio rt:action:ls
  $ aio rt:actions:ls
```

## `aio runtime:activation`

Manage your activations

```
USAGE
  $ aio runtime:activation [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio rt:activation
```

_See code: [src/commands/runtime/activation/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/activation/index.js)_

## `aio runtime:activation:get [ACTIVATIONID]`

Retrieves an Activation

```
USAGE
  $ aio runtime:activation:get [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  $ aio rt:activation:get
```

_See code: [src/commands/runtime/activation/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/activation/get.js)_

## `aio runtime:activation:list [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio runtime:activation:list [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations
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
  $ aio runtime:activations:list
  $ aio runtime:activation:ls
  $ aio runtime:activations:ls
  $ aio rt:activation:list
  $ aio rt:activation:ls
  $ aio rt:activations:list
  $ aio rt:activations:ls
```

_See code: [src/commands/runtime/activation/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/activation/list.js)_

## `aio runtime:activation:log [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio runtime:activation:log [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  --limit=<value>        return logs only from last LIMIT number of activations
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime:activation:log
  $ aio runtime:log
  $ aio runtime:logs
  $ aio rt:activation:logs
  $ aio rt:activation:log
  $ aio rt:log
  $ aio rt:logs
```

## `aio runtime:activation:logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio runtime:activation:logs [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  --limit=<value>        return logs only from last LIMIT number of activations
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime:activation:log
  $ aio runtime:log
  $ aio runtime:logs
  $ aio rt:activation:logs
  $ aio rt:activation:log
  $ aio rt:log
  $ aio rt:logs
```

_See code: [src/commands/runtime/activation/logs.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/activation/logs.js)_

## `aio runtime:activation:ls [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio runtime:activation:ls [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations
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
  $ aio runtime:activations:list
  $ aio runtime:activation:ls
  $ aio runtime:activations:ls
  $ aio rt:activation:list
  $ aio rt:activation:ls
  $ aio rt:activations:list
  $ aio rt:activations:ls
```

## `aio runtime:activation:result [ACTIVATIONID]`

Retrieves the Results for an Activation

```
USAGE
  $ aio runtime:activation:result [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  $ aio rt:activation:result
```

_See code: [src/commands/runtime/activation/result.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/activation/result.js)_

## `aio runtime:activations:list [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio runtime:activations:list [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations
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
  $ aio runtime:activations:list
  $ aio runtime:activation:ls
  $ aio runtime:activations:ls
  $ aio rt:activation:list
  $ aio rt:activation:ls
  $ aio rt:activations:list
  $ aio rt:activations:ls
```

## `aio runtime:activations:ls [ACTION_NAME]`

Lists all the Activations

```
USAGE
  $ aio runtime:activations:ls [ACTION_NAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [--since <value>] [--upto
    <value>] [-c] [--json] [-f]

FLAGS
  -c, --count           show only the total number of activations
  -f, --full            include full activation description
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of activations
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
  $ aio runtime:activations:list
  $ aio runtime:activation:ls
  $ aio runtime:activations:ls
  $ aio rt:activation:list
  $ aio rt:activation:ls
  $ aio rt:activations:list
  $ aio rt:activations:ls
```

## `aio runtime:api`

Manage your routes

```
USAGE
  $ aio runtime:api [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:api
  $ aio rt:api
```

## `aio runtime:api:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`

create a new api route

```
USAGE
  $ aio runtime:api:create [BASEPATH] [RELPATH] [APIVERB] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
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
  $ aio runtime:api:create
  $ aio rt:route:create
  $ aio rt:api:create
```

## `aio runtime:api:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
USAGE
  $ aio runtime:api:delete [BASEPATHORAPINAME] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
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
  $ aio runtime:api:delete
  $ aio rt:route:delete
  $ aio rt:api:delete
```

## `aio runtime:api:get BASEPATHORAPINAME`

get API details

```
USAGE
  $ aio runtime:api:get [BASEPATHORAPINAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
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
  $ aio runtime:api:get
  $ aio rt:route:get
  $ aio rt:api:get
```

## `aio runtime:api:list [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio runtime:api:list [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
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
  $ aio runtime:route:ls
  $ aio runtime:api:list
  $ aio runtime:api:ls
  $ aio rt:route:list
  $ aio rt:route:ls
  $ aio rt:api:list
  $ aio rt:api:ls
```

## `aio runtime:api:ls [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio runtime:api:ls [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
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
  $ aio runtime:route:ls
  $ aio runtime:api:list
  $ aio runtime:api:ls
  $ aio rt:route:list
  $ aio rt:route:ls
  $ aio rt:api:list
  $ aio rt:api:ls
```

## `aio runtime:deploy`

The Runtime Deployment Tool

```
USAGE
  $ aio runtime:deploy [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:deploy
```

_See code: [src/commands/runtime/deploy/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/deploy/index.js)_

## `aio runtime:deploy:export`

Exports managed project assets from Runtime to manifest and function files

```
USAGE
  $ aio runtime:deploy:export -m <value> --projectname <value> [--cert <value>] [--key <value>] [--apiversion <value>]
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
  $ aio rt:deploy:export
```

_See code: [src/commands/runtime/deploy/export.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/deploy/export.js)_

## `aio runtime:deploy:report`

Provides a summary report of Runtime assets being deployed/undeployed based on manifest/deployment YAML

```
USAGE
  $ aio runtime:deploy:report [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:deploy:report
```

_See code: [src/commands/runtime/deploy/report.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/deploy/report.js)_

## `aio runtime:deploy:sync`

A tool to sync deployment and undeployment of Runtime packages using a manifest and optional deployment files using YAML

```
USAGE
  $ aio runtime:deploy:sync [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:deploy:sync
```

_See code: [src/commands/runtime/deploy/sync.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/deploy/sync.js)_

## `aio runtime:deploy:undeploy`

Undeploy removes Runtime assets which were deployed from the manifest and deployment YAML

```
USAGE
  $ aio runtime:deploy:undeploy [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:deploy:undeploy
```

_See code: [src/commands/runtime/deploy/undeploy.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/deploy/undeploy.js)_

## `aio runtime:deploy:version`

Prints the version number of aio runtime deploy

```
USAGE
  $ aio runtime:deploy:version [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio rt:deploy:version
```

_See code: [src/commands/runtime/deploy/version.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/deploy/version.js)_

## `aio runtime:list`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio runtime:list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:get
  $ aio runtime:list
  $ aio rt:list
  $ aio runtime:ls
  $ aio rt:ls
```

## `aio runtime:log [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio runtime:log [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  --limit=<value>        return logs only from last LIMIT number of activations
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime:activation:log
  $ aio runtime:log
  $ aio runtime:logs
  $ aio rt:activation:logs
  $ aio rt:activation:log
  $ aio rt:log
  $ aio rt:logs
```

## `aio runtime:logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ aio runtime:logs [ACTIVATIONID] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>]
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
  --limit=<value>        return logs only from last LIMIT number of activations
  --version              Show version

DESCRIPTION
  Retrieves the Logs for an Activation

ALIASES
  $ aio runtime:activation:log
  $ aio runtime:log
  $ aio runtime:logs
  $ aio rt:activation:logs
  $ aio rt:activation:log
  $ aio rt:log
  $ aio rt:logs
```

## `aio runtime:ls`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio runtime:ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:get
  $ aio runtime:list
  $ aio rt:list
  $ aio runtime:ls
  $ aio rt:ls
```

## `aio runtime:namespace`

Manage your namespaces

```
USAGE
  $ aio runtime:namespace [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns
  $ aio rt:namespace
  $ aio rt:ns
```

_See code: [src/commands/runtime/namespace/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/namespace/index.js)_

## `aio runtime:namespace:get`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ aio runtime:namespace:get [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio rt:get
  $ aio runtime:list
  $ aio rt:list
  $ aio runtime:ls
  $ aio rt:ls
```

_See code: [src/commands/runtime/namespace/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/namespace/get.js)_

## `aio runtime:namespace:lf`

Manage log forwarding settings

```
USAGE
  $ aio runtime:namespace:lf [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding
  $ aio runtime:ns:lf
  $ aio runtime:namespace:lf
  $ aio rt:namespace:log-forwarding
  $ aio rt:namespace:lf
  $ aio rt:ns:log-forwarding
  $ aio rt:ns:lf
```

## `aio runtime:namespace:lf:errors`

Get log forwarding errors

```
USAGE
  $ aio runtime:namespace:lf:errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:errors
  $ aio runtime:ns:lf:errors
  $ aio runtime:namespace:lf:errors
  $ aio rt:namespace:log-forwarding:errors
  $ aio rt:namespace:lf:errors
  $ aio rt:ns:log-forwarding:errors
  $ aio rt:ns:lf:errors
```

## `aio runtime:namespace:lf:get`

Get log forwarding destination configuration

```
USAGE
  $ aio runtime:namespace:lf:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:get
  $ aio runtime:ns:lf:get
  $ aio runtime:namespace:lf:get
  $ aio rt:namespace:log-forwarding:get
  $ aio rt:namespace:lf:get
  $ aio rt:ns:log-forwarding:get
  $ aio rt:ns:lf:get
```

## `aio runtime:namespace:lf:set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio runtime:namespace:lf:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set
  $ aio runtime:ns:lf:set
  $ aio runtime:namespace:lf:set
  $ aio rt:namespace:log-forwarding:set
  $ aio rt:namespace:lf:set
  $ aio rt:ns:log-forwarding:set
  $ aio rt:ns:lf:set
```

## `aio runtime:namespace:lf:set:adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio runtime:namespace:lf:set:adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set:adobe-io-runtime
  $ aio runtime:ns:lf:set:adobe-io-runtime
  $ aio runtime:namespace:lf:set:adobe-io-runtime
  $ aio rt:namespace:log-forwarding:set:adobe-io-runtime
  $ aio rt:namespace:lf:set:adobe-io-runtime
  $ aio rt:ns:log-forwarding:set:adobe-io-runtime
  $ aio rt:ns:lf:set:adobe-io-runtime
```

## `aio runtime:namespace:lf:set:azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio runtime:namespace:lf:set:azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
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
  $ aio runtime:ns:log-forwarding:set:azure-log-analytics
  $ aio runtime:ns:lf:set:azure-log-analytics
  $ aio runtime:namespace:lf:set:azure-log-analytics
  $ aio rt:namespace:log-forwarding:set:azure-log-analytics
  $ aio rt:namespace:lf:set:azure-log-analytics
  $ aio rt:ns:log-forwarding:set:azure-log-analytics
  $ aio rt:ns:lf:set:azure-log-analytics
```

## `aio runtime:namespace:lf:set:splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio runtime:namespace:lf:set:splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
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
  $ aio runtime:ns:log-forwarding:set:splunk-hec
  $ aio runtime:ns:lf:set:splunk-hec
  $ aio runtime:namespace:lf:set:splunk-hec
  $ aio rt:namespace:log-forwarding:set:splunk-hec
  $ aio rt:namespace:lf:set:splunk-hec
  $ aio rt:ns:log-forwarding:set:splunk-hec
  $ aio rt:ns:lf:set:splunk-hec
```

## `aio runtime:namespace:list`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio runtime:namespace:list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio runtime:namespace:ls
  $ aio runtime:ns:list
  $ aio runtime:ns:ls
  $ aio rt:namespace:list
  $ aio rt:namespace:ls
  $ aio rt:ns:list
  $ aio rt:ns:ls
```

_See code: [src/commands/runtime/namespace/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/namespace/list.js)_

## `aio runtime:namespace:log-forwarding`

Manage log forwarding settings

```
USAGE
  $ aio runtime:namespace:log-forwarding [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding
  $ aio runtime:ns:lf
  $ aio runtime:namespace:lf
  $ aio rt:namespace:log-forwarding
  $ aio rt:namespace:lf
  $ aio rt:ns:log-forwarding
  $ aio rt:ns:lf
```

_See code: [src/commands/runtime/namespace/log-forwarding/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/namespace/log-forwarding/index.js)_

## `aio runtime:namespace:log-forwarding:errors`

Get log forwarding errors

```
USAGE
  $ aio runtime:namespace:log-forwarding:errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:errors
  $ aio runtime:ns:lf:errors
  $ aio runtime:namespace:lf:errors
  $ aio rt:namespace:log-forwarding:errors
  $ aio rt:namespace:lf:errors
  $ aio rt:ns:log-forwarding:errors
  $ aio rt:ns:lf:errors
```

_See code: [src/commands/runtime/namespace/log-forwarding/errors.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/namespace/log-forwarding/errors.js)_

## `aio runtime:namespace:log-forwarding:get`

Get log forwarding destination configuration

```
USAGE
  $ aio runtime:namespace:log-forwarding:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:get
  $ aio runtime:ns:lf:get
  $ aio runtime:namespace:lf:get
  $ aio rt:namespace:log-forwarding:get
  $ aio rt:namespace:lf:get
  $ aio rt:ns:log-forwarding:get
  $ aio rt:ns:lf:get
```

_See code: [src/commands/runtime/namespace/log-forwarding/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/namespace/log-forwarding/get.js)_

## `aio runtime:namespace:log-forwarding:set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio runtime:namespace:log-forwarding:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set
  $ aio runtime:ns:lf:set
  $ aio runtime:namespace:lf:set
  $ aio rt:namespace:log-forwarding:set
  $ aio rt:namespace:lf:set
  $ aio rt:ns:log-forwarding:set
  $ aio rt:ns:lf:set
```

_See code: [src/commands/runtime/namespace/log-forwarding/set.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/namespace/log-forwarding/set.js)_

## `aio runtime:namespace:log-forwarding:set:adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio runtime:namespace:log-forwarding:set:adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set:adobe-io-runtime
  $ aio runtime:ns:lf:set:adobe-io-runtime
  $ aio runtime:namespace:lf:set:adobe-io-runtime
  $ aio rt:namespace:log-forwarding:set:adobe-io-runtime
  $ aio rt:namespace:lf:set:adobe-io-runtime
  $ aio rt:ns:log-forwarding:set:adobe-io-runtime
  $ aio rt:ns:lf:set:adobe-io-runtime
```

_See code: [src/commands/runtime/namespace/log-forwarding/set/adobe-io-runtime.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/namespace/log-forwarding/set/adobe-io-runtime.js)_

## `aio runtime:namespace:log-forwarding:set:azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio runtime:namespace:log-forwarding:set:azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
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
  $ aio runtime:ns:log-forwarding:set:azure-log-analytics
  $ aio runtime:ns:lf:set:azure-log-analytics
  $ aio runtime:namespace:lf:set:azure-log-analytics
  $ aio rt:namespace:log-forwarding:set:azure-log-analytics
  $ aio rt:namespace:lf:set:azure-log-analytics
  $ aio rt:ns:log-forwarding:set:azure-log-analytics
  $ aio rt:ns:lf:set:azure-log-analytics
```

_See code: [src/commands/runtime/namespace/log-forwarding/set/azure-log-analytics.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/namespace/log-forwarding/set/azure-log-analytics.js)_

## `aio runtime:namespace:log-forwarding:set:splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio runtime:namespace:log-forwarding:set:splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
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
  $ aio runtime:ns:log-forwarding:set:splunk-hec
  $ aio runtime:ns:lf:set:splunk-hec
  $ aio runtime:namespace:lf:set:splunk-hec
  $ aio rt:namespace:log-forwarding:set:splunk-hec
  $ aio rt:namespace:lf:set:splunk-hec
  $ aio rt:ns:log-forwarding:set:splunk-hec
  $ aio rt:ns:lf:set:splunk-hec
```

_See code: [src/commands/runtime/namespace/log-forwarding/set/splunk-hec.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/namespace/log-forwarding/set/splunk-hec.js)_

## `aio runtime:namespace:ls`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio runtime:namespace:ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio runtime:namespace:ls
  $ aio runtime:ns:list
  $ aio runtime:ns:ls
  $ aio rt:namespace:list
  $ aio rt:namespace:ls
  $ aio rt:ns:list
  $ aio rt:ns:ls
```

## `aio runtime:ns`

Manage your namespaces

```
USAGE
  $ aio runtime:ns [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns
  $ aio rt:namespace
  $ aio rt:ns
```

## `aio runtime:ns:lf`

Manage log forwarding settings

```
USAGE
  $ aio runtime:ns:lf [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding
  $ aio runtime:ns:lf
  $ aio runtime:namespace:lf
  $ aio rt:namespace:log-forwarding
  $ aio rt:namespace:lf
  $ aio rt:ns:log-forwarding
  $ aio rt:ns:lf
```

## `aio runtime:ns:lf:errors`

Get log forwarding errors

```
USAGE
  $ aio runtime:ns:lf:errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:errors
  $ aio runtime:ns:lf:errors
  $ aio runtime:namespace:lf:errors
  $ aio rt:namespace:log-forwarding:errors
  $ aio rt:namespace:lf:errors
  $ aio rt:ns:log-forwarding:errors
  $ aio rt:ns:lf:errors
```

## `aio runtime:ns:lf:get`

Get log forwarding destination configuration

```
USAGE
  $ aio runtime:ns:lf:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:get
  $ aio runtime:ns:lf:get
  $ aio runtime:namespace:lf:get
  $ aio rt:namespace:log-forwarding:get
  $ aio rt:namespace:lf:get
  $ aio rt:ns:log-forwarding:get
  $ aio rt:ns:lf:get
```

## `aio runtime:ns:lf:set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio runtime:ns:lf:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set
  $ aio runtime:ns:lf:set
  $ aio runtime:namespace:lf:set
  $ aio rt:namespace:log-forwarding:set
  $ aio rt:namespace:lf:set
  $ aio rt:ns:log-forwarding:set
  $ aio rt:ns:lf:set
```

## `aio runtime:ns:lf:set:adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio runtime:ns:lf:set:adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set:adobe-io-runtime
  $ aio runtime:ns:lf:set:adobe-io-runtime
  $ aio runtime:namespace:lf:set:adobe-io-runtime
  $ aio rt:namespace:log-forwarding:set:adobe-io-runtime
  $ aio rt:namespace:lf:set:adobe-io-runtime
  $ aio rt:ns:log-forwarding:set:adobe-io-runtime
  $ aio rt:ns:lf:set:adobe-io-runtime
```

## `aio runtime:ns:lf:set:azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio runtime:ns:lf:set:azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
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
  $ aio runtime:ns:log-forwarding:set:azure-log-analytics
  $ aio runtime:ns:lf:set:azure-log-analytics
  $ aio runtime:namespace:lf:set:azure-log-analytics
  $ aio rt:namespace:log-forwarding:set:azure-log-analytics
  $ aio rt:namespace:lf:set:azure-log-analytics
  $ aio rt:ns:log-forwarding:set:azure-log-analytics
  $ aio rt:ns:lf:set:azure-log-analytics
```

## `aio runtime:ns:lf:set:splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio runtime:ns:lf:set:splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
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
  $ aio runtime:ns:log-forwarding:set:splunk-hec
  $ aio runtime:ns:lf:set:splunk-hec
  $ aio runtime:namespace:lf:set:splunk-hec
  $ aio rt:namespace:log-forwarding:set:splunk-hec
  $ aio rt:namespace:lf:set:splunk-hec
  $ aio rt:ns:log-forwarding:set:splunk-hec
  $ aio rt:ns:lf:set:splunk-hec
```

## `aio runtime:ns:list`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio runtime:ns:list [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio runtime:namespace:ls
  $ aio runtime:ns:list
  $ aio runtime:ns:ls
  $ aio rt:namespace:list
  $ aio rt:namespace:ls
  $ aio rt:ns:list
  $ aio rt:ns:ls
```

## `aio runtime:ns:log-forwarding`

Manage log forwarding settings

```
USAGE
  $ aio runtime:ns:log-forwarding [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding
  $ aio runtime:ns:lf
  $ aio runtime:namespace:lf
  $ aio rt:namespace:log-forwarding
  $ aio rt:namespace:lf
  $ aio rt:ns:log-forwarding
  $ aio rt:ns:lf
```

## `aio runtime:ns:log-forwarding:errors`

Get log forwarding errors

```
USAGE
  $ aio runtime:ns:log-forwarding:errors [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:errors
  $ aio runtime:ns:lf:errors
  $ aio runtime:namespace:lf:errors
  $ aio rt:namespace:log-forwarding:errors
  $ aio rt:namespace:lf:errors
  $ aio rt:ns:log-forwarding:errors
  $ aio rt:ns:lf:errors
```

## `aio runtime:ns:log-forwarding:get`

Get log forwarding destination configuration

```
USAGE
  $ aio runtime:ns:log-forwarding:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:get
  $ aio runtime:ns:lf:get
  $ aio runtime:namespace:lf:get
  $ aio rt:namespace:log-forwarding:get
  $ aio rt:namespace:lf:get
  $ aio rt:ns:log-forwarding:get
  $ aio rt:ns:lf:get
```

## `aio runtime:ns:log-forwarding:set`

Configure log forwarding destination (interactive)

```
USAGE
  $ aio runtime:ns:log-forwarding:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set
  $ aio runtime:ns:lf:set
  $ aio runtime:namespace:lf:set
  $ aio rt:namespace:log-forwarding:set
  $ aio rt:namespace:lf:set
  $ aio rt:ns:log-forwarding:set
  $ aio rt:ns:lf:set
```

## `aio runtime:ns:log-forwarding:set:adobe-io-runtime`

Set log forwarding destination to Adobe I/O Runtime (Logs will be accessible via aio CLI)

```
USAGE
  $ aio runtime:ns:log-forwarding:set:adobe-io-runtime [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:ns:log-forwarding:set:adobe-io-runtime
  $ aio runtime:ns:lf:set:adobe-io-runtime
  $ aio runtime:namespace:lf:set:adobe-io-runtime
  $ aio rt:namespace:log-forwarding:set:adobe-io-runtime
  $ aio rt:namespace:lf:set:adobe-io-runtime
  $ aio rt:ns:log-forwarding:set:adobe-io-runtime
  $ aio rt:ns:lf:set:adobe-io-runtime
```

## `aio runtime:ns:log-forwarding:set:azure-log-analytics`

Set log forwarding destination to Azure Log Analytics

```
USAGE
  $ aio runtime:ns:log-forwarding:set:azure-log-analytics --customer-id <value> --shared-key <value> --log-type <value> [--cert] [--key] [--apiversion]
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
  $ aio runtime:ns:log-forwarding:set:azure-log-analytics
  $ aio runtime:ns:lf:set:azure-log-analytics
  $ aio runtime:namespace:lf:set:azure-log-analytics
  $ aio rt:namespace:log-forwarding:set:azure-log-analytics
  $ aio rt:namespace:lf:set:azure-log-analytics
  $ aio rt:ns:log-forwarding:set:azure-log-analytics
  $ aio rt:ns:lf:set:azure-log-analytics
```

## `aio runtime:ns:log-forwarding:set:splunk-hec`

Set log forwarding destination to Splunk HEC

```
USAGE
  $ aio runtime:ns:log-forwarding:set:splunk-hec --host <value> --port <value> --index <value> --hec-token <value> [--cert] [--key]
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
  $ aio runtime:ns:log-forwarding:set:splunk-hec
  $ aio runtime:ns:lf:set:splunk-hec
  $ aio runtime:namespace:lf:set:splunk-hec
  $ aio rt:namespace:log-forwarding:set:splunk-hec
  $ aio rt:namespace:lf:set:splunk-hec
  $ aio rt:ns:log-forwarding:set:splunk-hec
  $ aio rt:ns:lf:set:splunk-hec
```

## `aio runtime:ns:ls`

Lists all of your namespaces for Adobe I/O Runtime

```
USAGE
  $ aio runtime:ns:ls [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u <value>] [-i]
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
  $ aio runtime:namespace:ls
  $ aio runtime:ns:list
  $ aio runtime:ns:ls
  $ aio rt:namespace:list
  $ aio rt:namespace:ls
  $ aio rt:ns:list
  $ aio rt:ns:ls
```

## `aio runtime:package`

Manage your packages

```
USAGE
  $ aio runtime:package [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:pkg
  $ aio rt:package
  $ aio rt:pkg
```

_See code: [src/commands/runtime/package/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/package/index.js)_

## `aio runtime:package:bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
USAGE
  $ aio runtime:package:bind [PACKAGENAME] [BINDPACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>]
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
  $ aio runtime:pkg:bind
  $ aio rt:package:bind
  $ aio rt:pkg:bind
```

_See code: [src/commands/runtime/package/bind.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/package/bind.js)_

## `aio runtime:package:create PACKAGENAME`

Creates a Package

```
USAGE
  $ aio runtime:package:create [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:create
  $ aio rt:package:create
  $ aio rt:pkg:create
```

_See code: [src/commands/runtime/package/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/package/create.js)_

## `aio runtime:package:delete PACKAGENAME`

Deletes a Package

```
USAGE
  $ aio runtime:package:delete [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:delete
  $ aio rt:package:delete
  $ aio rt:pkg:delete
```

_See code: [src/commands/runtime/package/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/package/delete.js)_

## `aio runtime:package:get PACKAGENAME`

Retrieves a Package

```
USAGE
  $ aio runtime:package:get [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:get
  $ aio rt:package:get
  $ aio rt:pkg:get
```

_See code: [src/commands/runtime/package/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/package/get.js)_

## `aio runtime:package:list [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio runtime:package:list [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages
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
  $ aio runtime:package:ls
  $ aio runtime:pkg:list
  $ aio runtime:pkg:ls
  $ aio rt:package:list
  $ aio rt:package:ls
  $ aio rt:pkg:list
  $ aio rt:pkg:ls
```

_See code: [src/commands/runtime/package/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/package/list.js)_

## `aio runtime:package:ls [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio runtime:package:ls [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages
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
  $ aio runtime:package:ls
  $ aio runtime:pkg:list
  $ aio runtime:pkg:ls
  $ aio rt:package:list
  $ aio rt:package:ls
  $ aio rt:pkg:list
  $ aio rt:pkg:ls
```

## `aio runtime:package:update PACKAGENAME`

Updates a Package

```
USAGE
  $ aio runtime:package:update [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:update
  $ aio rt:package:update
  $ aio rt:pkg:update
```

_See code: [src/commands/runtime/package/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/package/update.js)_

## `aio runtime:pkg`

Manage your packages

```
USAGE
  $ aio runtime:pkg [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:pkg
  $ aio rt:package
  $ aio rt:pkg
```

## `aio runtime:pkg:bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
USAGE
  $ aio runtime:pkg:bind [PACKAGENAME] [BINDPACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>]
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
  $ aio runtime:pkg:bind
  $ aio rt:package:bind
  $ aio rt:pkg:bind
```

## `aio runtime:pkg:create PACKAGENAME`

Creates a Package

```
USAGE
  $ aio runtime:pkg:create [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:create
  $ aio rt:package:create
  $ aio rt:pkg:create
```

## `aio runtime:pkg:delete PACKAGENAME`

Deletes a Package

```
USAGE
  $ aio runtime:pkg:delete [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:delete
  $ aio rt:package:delete
  $ aio rt:pkg:delete
```

## `aio runtime:pkg:get PACKAGENAME`

Retrieves a Package

```
USAGE
  $ aio runtime:pkg:get [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:get
  $ aio rt:package:get
  $ aio rt:pkg:get
```

## `aio runtime:pkg:list [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio runtime:pkg:list [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages
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
  $ aio runtime:package:ls
  $ aio runtime:pkg:list
  $ aio runtime:pkg:ls
  $ aio rt:package:list
  $ aio rt:package:ls
  $ aio rt:pkg:list
  $ aio rt:pkg:ls
```

## `aio runtime:pkg:ls [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ aio runtime:pkg:ls [NAMESPACE] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
    <value>] [-i] [--debug <value>] [-v] [--version] [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count           show only the total number of packages
  -i, --insecure        bypass certificate check
  -l, --limit=<value>   only return LIMIT number of packages
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
  $ aio runtime:package:ls
  $ aio runtime:pkg:list
  $ aio runtime:pkg:ls
  $ aio rt:package:list
  $ aio rt:package:ls
  $ aio rt:pkg:list
  $ aio rt:pkg:ls
```

## `aio runtime:pkg:update PACKAGENAME`

Updates a Package

```
USAGE
  $ aio runtime:pkg:update [PACKAGENAME] [--cert <value>] [--key <value>] [--apiversion <value>] [--apihost <value>] [-u
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
  $ aio runtime:pkg:update
  $ aio rt:package:update
  $ aio rt:pkg:update
```

## `aio runtime:prop`

Execute property commands

```
USAGE
  $ aio runtime:prop [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop
  $ aio rt:prop
  $ aio rt:property
```

## `aio runtime:prop:get`

get property

```
USAGE
  $ aio runtime:prop:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:get
  $ aio rt:property:get
  $ aio rt:prop:get
```

## `aio runtime:prop:set`

set property

```
USAGE
  $ aio runtime:prop:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:set
  $ aio rt:property:set
  $ aio rt:prop:set
```

## `aio runtime:prop:unset`

unset property

```
USAGE
  $ aio runtime:prop:unset [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:unset
  $ aio rt:property:unset
  $ aio rt:prop:unset
```

## `aio runtime:property`

Execute property commands

```
USAGE
  $ aio runtime:property [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop
  $ aio rt:prop
  $ aio rt:property
```

_See code: [src/commands/runtime/property/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/property/index.js)_

## `aio runtime:property:get`

get property

```
USAGE
  $ aio runtime:property:get [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:get
  $ aio rt:property:get
  $ aio rt:prop:get
```

_See code: [src/commands/runtime/property/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/property/get.js)_

## `aio runtime:property:set`

set property

```
USAGE
  $ aio runtime:property:set [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:set
  $ aio rt:property:set
  $ aio rt:prop:set
```

_See code: [src/commands/runtime/property/set.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/property/set.js)_

## `aio runtime:property:unset`

unset property

```
USAGE
  $ aio runtime:property:unset [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:prop:unset
  $ aio rt:property:unset
  $ aio rt:prop:unset
```

_See code: [src/commands/runtime/property/unset.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/property/unset.js)_

## `aio runtime:route`

Manage your routes

```
USAGE
  $ aio runtime:route [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio runtime:api
  $ aio rt:api
```

_See code: [src/commands/runtime/route/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/route/index.js)_

## `aio runtime:route:create [BASEPATH] [RELPATH] [APIVERB] [ACTION]`

create a new api route

```
USAGE
  $ aio runtime:route:create [BASEPATH] [RELPATH] [APIVERB] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
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
  $ aio runtime:api:create
  $ aio rt:route:create
  $ aio rt:api:create
```

_See code: [src/commands/runtime/route/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/route/create.js)_

## `aio runtime:route:delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
USAGE
  $ aio runtime:route:delete [BASEPATHORAPINAME] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i]
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
  $ aio runtime:api:delete
  $ aio rt:route:delete
  $ aio rt:api:delete
```

_See code: [src/commands/runtime/route/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/route/delete.js)_

## `aio runtime:route:get BASEPATHORAPINAME`

get API details

```
USAGE
  $ aio runtime:route:get [BASEPATHORAPINAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>]
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
  $ aio runtime:api:get
  $ aio rt:route:get
  $ aio rt:api:get
```

_See code: [src/commands/runtime/route/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/route/get.js)_

## `aio runtime:route:list [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio runtime:route:list [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
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
  $ aio runtime:route:ls
  $ aio runtime:api:list
  $ aio runtime:api:ls
  $ aio rt:route:list
  $ aio rt:route:ls
  $ aio rt:api:list
  $ aio rt:api:ls
```

_See code: [src/commands/runtime/route/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/route/list.js)_

## `aio runtime:route:ls [BASEPATH] [RELPATH] [APIVERB]`

list route/apis for Adobe I/O Runtime

```
USAGE
  $ aio runtime:route:ls [BASEPATH] [RELPATH] [APIVERB] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
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
  $ aio runtime:route:ls
  $ aio runtime:api:list
  $ aio runtime:api:ls
  $ aio rt:route:list
  $ aio rt:route:ls
  $ aio rt:api:list
  $ aio rt:api:ls
```

## `aio runtime:rule`

Manage your rules

```
USAGE
  $ aio runtime:rule [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio rt:rule
```

_See code: [src/commands/runtime/rule/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/rule/index.js)_

## `aio runtime:rule:create NAME TRIGGER ACTION`

Create a Rule

```
USAGE
  $ aio runtime:rule:create [NAME] [TRIGGER] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [--json]

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
  $ aio rt:rule:create
```

_See code: [src/commands/runtime/rule/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/rule/create.js)_

## `aio runtime:rule:delete NAME`

Delete a Rule

```
USAGE
  $ aio runtime:rule:delete [NAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help] [--json]

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
  $ aio rt:rule:delete
```

_See code: [src/commands/runtime/rule/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/rule/delete.js)_

## `aio runtime:rule:disable NAME`

Disable a Rule

```
USAGE
  $ aio runtime:rule:disable [NAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

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
  $ aio rt:rule:disable
```

_See code: [src/commands/runtime/rule/disable.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/rule/disable.js)_

## `aio runtime:rule:enable NAME`

Enable a Rule

```
USAGE
  $ aio runtime:rule:enable [NAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

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
  $ aio rt:rule:enable
```

_See code: [src/commands/runtime/rule/enable.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/rule/enable.js)_

## `aio runtime:rule:get NAME`

Retrieves a Rule

```
USAGE
  $ aio runtime:rule:get [NAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

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
  $ aio rt:rule:get
```

_See code: [src/commands/runtime/rule/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/rule/get.js)_

## `aio runtime:rule:list`

Retrieves a list of Rules

```
USAGE
  $ aio runtime:rule:list [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of rules
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  Limit number of rules returned
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
  $ aio runtime:rule:ls
  $ aio rt:rule:list
  $ aio rt:rule:ls
```

_See code: [src/commands/runtime/rule/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/rule/list.js)_

## `aio runtime:rule:ls`

Retrieves a list of Rules

```
USAGE
  $ aio runtime:rule:ls [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of rules
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  Limit number of rules returned
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
  $ aio runtime:rule:ls
  $ aio rt:rule:list
  $ aio rt:rule:ls
```

## `aio runtime:rule:status NAME`

Gets the status of a rule

```
USAGE
  $ aio runtime:rule:status [NAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
    [--version] [--help]

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
  $ aio rt:rule:status
```

_See code: [src/commands/runtime/rule/status.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/rule/status.js)_

## `aio runtime:rule:update NAME TRIGGER ACTION`

Update a Rule

```
USAGE
  $ aio runtime:rule:update [NAME] [TRIGGER] [ACTION] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug
    <value>] [-v] [--version] [--help] [--json]

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
  $ aio rt:rule:update
```

_See code: [src/commands/runtime/rule/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/rule/update.js)_

## `aio runtime:trigger`

Manage your triggers

```
USAGE
  $ aio runtime:trigger [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
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
  $ aio rt:trigger
```

_See code: [src/commands/runtime/trigger/index.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/trigger/index.js)_

## `aio runtime:trigger:create TRIGGERNAME`

Create a trigger for Adobe I/O Runtime

```
USAGE
  $ aio runtime:trigger:create [TRIGGERNAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
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
  $ aio rt:trigger:create
```

_See code: [src/commands/runtime/trigger/create.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/trigger/create.js)_

## `aio runtime:trigger:delete TRIGGERPATH`

Delete a trigger for Adobe I/O Runtime

```
USAGE
  $ aio runtime:trigger:delete [TRIGGERPATH] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
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
  $ aio rt:trigger:delete
```

_See code: [src/commands/runtime/trigger/delete.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/trigger/delete.js)_

## `aio runtime:trigger:fire TRIGGERNAME`

Fire a trigger for Adobe I/O Runtime

```
USAGE
  $ aio runtime:trigger:fire [TRIGGERNAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
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
  $ aio rt:trigger:fire
```

_See code: [src/commands/runtime/trigger/fire.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/trigger/fire.js)_

## `aio runtime:trigger:get TRIGGERPATH`

Get a trigger for Adobe I/O Runtime

```
USAGE
  $ aio runtime:trigger:get [TRIGGERPATH] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
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
  $ aio rt:trigger:get
```

_See code: [src/commands/runtime/trigger/get.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/trigger/get.js)_

## `aio runtime:trigger:list`

Lists all of your triggers for Adobe I/O Runtime

```
USAGE
  $ aio runtime:trigger:list [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of triggers
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  [default: 30] only return LIMIT number of triggers
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
  $ aio runtime:trigger:ls
  $ aio rt:trigger:list
  $ aio rt:trigger:ls
```

_See code: [src/commands/runtime/trigger/list.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/trigger/list.js)_

## `aio runtime:trigger:ls`

Lists all of your triggers for Adobe I/O Runtime

```
USAGE
  $ aio runtime:trigger:ls [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v] [--version]
    [--help] [-l <value>] [-s <value>] [-c] [--json] [--name-sort] [-n]

FLAGS
  -c, --count          show only the total number of triggers
  -i, --insecure       bypass certificate check
  -l, --limit=<value>  [default: 30] only return LIMIT number of triggers
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
  $ aio runtime:trigger:ls
  $ aio rt:trigger:list
  $ aio rt:trigger:ls
```

## `aio runtime:trigger:update TRIGGERNAME`

Update or create a trigger for Adobe I/O Runtime

```
USAGE
  $ aio runtime:trigger:update [TRIGGERNAME] [--cert] [--key] [--apiversion] [--apihost] [-u] [-i] [--debug <value>] [-v]
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
  $ aio rt:trigger:update
```

_See code: [src/commands/runtime/trigger/update.js](https://github.com/adobe/aio-cli-plugin-runtime/blob/6.0.0/src/commands/runtime/trigger/update.js)_
<!-- commandsstop -->



### Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
