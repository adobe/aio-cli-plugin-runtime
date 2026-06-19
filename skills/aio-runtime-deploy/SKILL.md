---
name: aio-runtime-deploy
description: >-
  Deploy Adobe I/O Runtime packages from YAML manifests with aio-cli. Use when
  writing manifest.yaml, deploying actions/packages/triggers/rules/sequences,
  sync/undeploy/report, or aio runtime deploy commands.
---

# Runtime Deploy (Manifest YAML)

Deploy multiple packages, actions, triggers, rules, sequences, and APIs from YAML manifests.

## Basic deploy

```bash
aio runtime deploy -m manifest.yaml
# or from directory containing manifest:
aio runtime deploy
```

With deployment overrides (environment-specific trigger inputs):

```bash
aio runtime deploy -m manifest.yaml -d deployment.yaml
```

Pass runtime parameters at deploy time:

```bash
aio runtime deploy -m manifest.yaml --param API_KEY "$API_KEY"
aio runtime deploy -m manifest.yaml -P params.json
```

## Manifest structure

```yaml
packages:
  my-package:
    version: 1.0
    license: Apache-2.0
    actions:
      hello:
        function: actions/hello/index.js
        runtime: nodejs:22
        web: 'yes'
        inputs:
          name: World
        annotations:
          final: true
          require-adobe-auth: false
    sequences:
      my-sequence:
        actions: hello,another-action
    triggers:
      my-trigger:
        inputs:
          event: created
    rules:
      my-rule:
        trigger: my-trigger
        action: hello
    apis:
      my-api:
        v1:
          hello:
            hello:
              method: GET
```

### Key fields

| Field | Purpose |
|-------|---------|
| `function` | Path to `.js`, `.zip`, or other source |
| `runtime` | e.g. `nodejs:22`, `python:default` |
| `web` / `web-export` | `yes`, `no`, `raw` — expose as HTTP endpoint |
| `inputs` | Default parameters (typed or simple key:value) |
| `limits` | `memorySize`, `timeout`, `logSize` |
| `annotations` | `final`, `require-adobe-auth`, `require-whisk-auth`, `raw-http` |
| `sequences` | Comma-separated action names within package |
| `rules` | Map trigger → action |

Action names in rules/triggers are **package-local** unless fully qualified (`pkg/action`).

## Deployment file (overrides)

Separate environment config from manifest:

```yaml
# deployment.yaml
project:
  name: my-project
  packages:
    my-package:
      triggers:
        my-trigger:
          inputs:
            event: prod-created
```

## Sync vs deploy

| Command | Behavior |
|---------|----------|
| `aio runtime deploy` | Deploy entities from manifest |
| `aio runtime deploy sync` | Sync project — add/update/remove to match manifest |
| `aio runtime deploy undeploy` | Remove deployed assets |
| `aio runtime deploy report` | Preview changes before deploy |
| `aio runtime deploy export` | Export runtime project back to manifest |

```bash
# Preview what will change
aio runtime deploy report -m manifest.yaml -d deployment.yaml

# Sync (requires project name in deployment file)
aio runtime deploy sync -m manifest.yaml -d deployment.yaml

# Undeploy
aio runtime deploy undeploy -m manifest.yaml --projectname my-project
```

## App Builder vs standalone

- **App Builder**: `aio app deploy` reads `app.config.yaml` and deploys the `runtimeManifest` section. Use `aio app` commands for full-stack apps.
- **Standalone Runtime**: Use `aio runtime deploy -m manifest.yaml` directly with a hand-written manifest.

## Common patterns

**Zip deployment** — point `function` at a zip archive:

```yaml
actions:
  bundled:
    function: ./dist/action.zip
```

**Adobe IMS auth on web actions**:

```yaml
annotations:
  require-adobe-auth: true
web: 'yes'
```

**Parameter placeholders** — resolved from `--param` or `-P` at deploy:

```yaml
inputs:
  apiKey: $API_KEY
```

## Troubleshooting

- Run `aio runtime deploy report` first to catch missing actions in rules/sequences.
- Rule action names must match deployed action names exactly.
- Use `--verbose` for full OpenWhisk error details.
- After auth issues, verify with `aio runtime property get --all`.
