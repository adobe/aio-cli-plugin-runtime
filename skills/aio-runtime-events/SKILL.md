---
name: aio-runtime-events
description: >-
  Manage Adobe I/O Runtime triggers, rules, and action sequences via aio-cli.
  Use when wiring event-driven actions, firing triggers, creating rules,
  or composing multi-step sequences with aio runtime trigger/rule commands.
---

# Runtime Events (Triggers, Rules, Sequences)

Event-driven workflows connect **triggers** → **rules** → **actions**. **Sequences** chain multiple actions.

## Triggers

```bash
# Create trigger
aio runtime trigger create my-trigger \
  -p source "api" \
  -p eventType "created"

# Create with feed (scheduled or external feed action)
aio runtime trigger create my-scheduled-trigger --feed mypkg/alarm-feed

# Fire trigger (test event flow)
aio runtime trigger fire my-trigger -p payload '{"id": 1}'

# List / get / update / delete
aio runtime trigger list
aio runtime trigger get /namespace/my-trigger
aio runtime trigger update my-trigger -p key value
aio runtime trigger delete /namespace/my-trigger
```

Trigger paths use format `/NAMESPACE/NAME` for get/delete.

## Rules

Rules bind a trigger to an action:

```bash
# Create rule: when trigger fires, invoke action
aio runtime rule create my-rule my-trigger mypkg/my-action

# Enable / disable
aio runtime rule enable my-rule
aio runtime rule disable my-rule

# Check status
aio runtime rule status my-rule

# List / get / update / delete
aio runtime rule list
aio runtime rule get my-rule
aio runtime rule update my-rule my-trigger mypkg/other-action
aio runtime rule delete my-rule
```

## Sequences

Sequences invoke actions in order, passing output forward.

### Via CLI

```bash
aio runtime action create mypkg/my-sequence \
  --sequence "mypkg/step1,mypkg/step2,mypkg/step3"
```

### Via manifest

```yaml
packages:
  my-package:
    actions:
      step1:
        function: actions/step1.js
      step2:
        function: actions/step2.js
        inputs:
          data: {}    # receives output from previous step
    sequences:
      pipeline:
        actions: step1, step2
```

Sequence action names are comma-separated, package-local unless fully qualified (`other-pkg/action`).

## Manifest triggers and rules

Deploy triggers/rules with manifest deploy:

```yaml
packages:
  my-package:
    actions:
      handler:
        function: actions/handler.js
    triggers:
      order-created:
        inputs:
          orderId: ""
    rules:
      on-order-created:
        trigger: order-created
        action: handler
```

Override trigger inputs per environment in `deployment.yaml`:

```yaml
project:
  name: my-project
  packages:
    my-package:
      triggers:
        order-created:
          inputs:
            orderId: "prod-default"
```

Deploy:

```bash
aio runtime deploy -m manifest.yaml -d deployment.yaml
```

## Test event flow

```bash
# 1. Fire trigger
aio runtime trigger fire order-created -p orderId "12345"

# 2. Check activation from rule-invoked action
aio runtime activation list my-package/handler
aio runtime activation result --last
```

## Package management

Triggers and rules belong to packages. Delete package recursively removes associated rules/triggers:

```bash
aio runtime package delete my-package --recursive
```

## Quick reference

| Task | Command |
|------|---------|
| Inventory namespace | `aio runtime namespace get` |
| List rules | `aio runtime rule list` |
| List triggers | `aio runtime trigger list` |
| JSON output | add `--json` |

For bulk deploy of triggers/rules, prefer manifest deploy (**aio-runtime-deploy** skill).
