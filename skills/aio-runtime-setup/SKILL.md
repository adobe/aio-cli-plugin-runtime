---
name: aio-runtime-setup
description: >-
  Install and configure Adobe I/O Runtime via aio-cli. Use when setting up
  @adobe/aio-cli-plugin-runtime, configuring WHISK_AUTH/APIHOST/NAMESPACE,
  selecting namespaces, or troubleshooting "An AUTH key must be specified".
---

# Adobe I/O Runtime CLI Setup

This skill covers the **runtime plugin** (`aio runtime` / `aio rt`). App Builder full-stack apps use `aio app` (separate plugin); see the app-builder skill for that workflow.

## Install the plugin

```bash
aio plugins:install @adobe/aio-cli-plugin-runtime
# or discover all Adobe plugins:
aio discover -i
```

Verify:

```bash
aio runtime --help
aio rt --help   # alias
```

## Authentication and namespace

Runtime commands require **AUTH** (namespace auth key) and **APIHOST**. Resolution order (highest first):

1. CLI flags: `-u` / `--auth`, `--apihost`
2. Environment: `WHISK_AUTH`, `WHISK_APIHOST`, `WHISK_NAMESPACE`, `WHISK_APIVERSION`
3. aio config: `runtime.auth`, `runtime.apihost`, `runtime.namespace`
4. `~/.wskprops` (or path in `WSK_CONFIG_FILE`)

Default apihost: `https://adobeioruntime.net`

### App Builder projects (linked workspace)

When a project is linked via `aio app use`, credentials are read from aio config automatically. Verify context:

```bash
aio console where
aio runtime property get --all
```

### Standalone / direct Runtime access

Set properties explicitly:

```bash
aio runtime property set --namespace <namespace>
# AUTH and APIHOST typically come from Developer Console Runtime namespace credentials
```

Or export env vars before commands:

```bash
export WHISK_AUTH="<namespace-auth-key>"
export WHISK_APIHOST="https://adobeioruntime.net"
export WHISK_NAMESPACE="<namespace>"
```

## Common commands

| Task | Command |
|------|---------|
| Show all properties | `aio runtime property get --all` |
| Set namespace | `aio runtime property set --namespace <ns>` |
| List namespaces | `aio runtime namespace list` |
| Inventory namespace | `aio runtime namespace get` |
| Verbose errors | add `--verbose` or `--debug '*'` |

## Aliases

| Long form | Short |
|-----------|-------|
| `aio runtime` | `aio rt` |
| `aio runtime namespace` | `aio rt ns` |
| `aio runtime package` | `aio rt pkg` |
| `aio runtime property` | `aio rt prop` |

## Troubleshooting

**"An AUTH key must be specified"** — No valid auth found. Set `WHISK_AUTH`, run `aio runtime property set`, or link an App Builder project with `aio app use`.

**"An API host must be specified"** — Set `WHISK_APIHOST` or `--apihost`.

**Wrong namespace** — Check `aio runtime property get --namespace` and `aio console where` before deploy/invoke.

**Certificate errors** — Use `-i` / `--insecure` only for local dev with self-signed certs.
