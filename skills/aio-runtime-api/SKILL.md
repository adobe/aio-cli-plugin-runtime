---
name: aio-runtime-api
description: >-
  Create and manage Adobe I/O Runtime HTTP API routes via aio-cli. Use when
  exposing actions as REST endpoints, configuring API base paths, swagger
  config, or aio runtime api commands.
---

# Runtime API Routes

Map HTTP paths and verbs to web actions. Commands: `aio runtime api` (aliases: `aio rt api`, `aio runtime route`).

**Prerequisite**: Target actions must be **web actions** (`--web true` or `web: 'yes'` in manifest).

## Create a route

```bash
# basepath / relpath / verb / action
aio runtime api create /v1 /hello GET mypkg/hello-action

# With response type
aio runtime api create /v1 /data GET mypkg/data-action -r json
# response types: html, http, json, text, svg
```

## Create from Swagger config

```bash
aio runtime api create -c api-config.json
```

Swagger JSON defines multiple routes at once. Use for complex APIs.

## List and inspect

```bash
# All APIs
aio runtime api list

# Filter by base path
aio runtime api list /v1

# Get API details
aio runtime api get my-api-name
aio runtime api get /v1
```

## Delete routes

```bash
# Delete entire API (by name or base path)
aio runtime api delete my-api-name

# Delete specific route
aio runtime api delete /v1 /hello GET
```

## Manifest-based API definition

Deploy APIs with manifest:

```yaml
packages:
  my-package:
    version: 1.0
    license: Apache-2.0
    actions:
      hello:
        function: actions/hello.js
        web: true
      goodbye:
        function: actions/goodbye.js
        web: true
    apis:
      hello-world:        # API name
        v1:                 # base path segment
          hello:            # relpath segments
            world:
              hello:
                method: GET
      goodbye-world:
        v1:
          bye:
            world:
              goodbye:
                method: DELETE
```

Deploy:

```bash
aio runtime deploy -m manifest.yaml
```

Resulting URLs follow pattern: `https://<namespace>.adobeioruntime.net/api/v1/web/<package>/<action>`

For App Builder apps, action URLs are also available via:

```bash
aio app get-url
```

## Auth on API endpoints

Control access via action annotations:

```yaml
annotations:
  require-adobe-auth: true    # Adobe IMS token required
  require-whisk-auth: true    # Namespace auth header required
```

Public endpoints:

```yaml
annotations:
  require-adobe-auth: false
  require-whisk-auth: false
```

## Quick reference

| Task | Command |
|------|---------|
| List APIs | `aio runtime api list` |
| JSON output | `aio runtime api list --json` |
| Get action URL | `aio runtime action get pkg/action -r` |
| Aliases | `aio rt api`, `aio runtime route` |

## Troubleshooting

- **404 on API route** — Confirm action is deployed as web action and route was created (`aio runtime api list`).
- **401 Unauthorized** — Check `require-adobe-auth` / `require-whisk-auth` annotations.
- **Wrong response format** — Set `-r json|html|text` on create, or return proper structure from raw web action.
