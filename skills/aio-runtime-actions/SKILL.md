---
name: aio-runtime-actions
description: >-
  Create, update, invoke, and manage Adobe I/O Runtime actions via aio-cli.
  Use when working with serverless actions, web actions, action parameters,
  runtimes (nodejs:22), annotations, or aio runtime action commands.
---

# Runtime Actions

Manage individual actions with `aio runtime action` (`aio rt action`).

## Create or update

```bash
# Create from source file (kind inferred from extension)
aio runtime action create mypkg/my-action actions/my-action/index.js \
  --web true \
  --kind nodejs:22 \
  -p greeting "hello" \
  -a final true \
  -a require-adobe-auth false

# Update existing action
aio runtime action update mypkg/my-action actions/my-action/index.js --web true
```

### Supported runtimes (by file extension)

| Extension | Kind |
|-----------|------|
| `.js` | `nodejs:default` |
| `.ts` | `typescript:default` |
| `.py` | `python:default` |
| `.java` | `java:default` |
| `.go` | `go:default` |

Prefer explicit `--kind nodejs:22` (or current supported version) over default.

### Web actions

- `--web true` — JSON HTTP response (standard web action)
- `--web raw` — raw HTTP (full control of status, headers, body)
- `--web-secure true` — require whisk auth on the URL

For App Builder UIs calling actions via `actionWebInvoke`, return JSON bodies — not binary Content-Type responses.

### Annotations

```bash
-a final true                    # prevent further updates via CLI
-a require-adobe-auth false      # public web action (App Builder)
-a require-whisk-auth false       # no auth header required
-a raw-http true                  # raw HTTP mode
```

Or load from file: `-A annotations.json`

### Limits

```bash
-m 512          # memory MB (128–4096)
-t 60000        # timeout ms (100–3600000)
-l 10           # log size MB (0–10)
-c 200          # concurrency (1–500)
```

## Invoke and inspect

```bash
# Blocking invoke, show result only
aio runtime action invoke mypkg/my-action -r -p name "World"

# From JSON param file
aio runtime action invoke mypkg/my-action -P params.json -b

# Get action URL (web actions)
aio runtime action get mypkg/my-action -r

# List actions in package
aio runtime action list mypkg

# Get action metadata (+ code if not zipped)
aio runtime action get mypkg/my-action -c

# Save deployed code locally
aio runtime action get mypkg/my-action --save
```

## Action handler pattern (Node.js)

```javascript
async function main (params) {
  return {
    statusCode: 200,
    body: { message: `Hello ${params.name}` }
  }
}
exports.main = main
```

For raw HTTP web actions, return `{ statusCode, headers, body }` with appropriate Content-Type.

## Sequences and copies

```bash
# Sequence action (comma-separated fully-qualified names)
aio runtime action create mypkg/my-seq --sequence "mypkg/step1,mypkg/step2"

# Copy from existing action
aio runtime action create mypkg/new-action --copy mypkg/existing-action
```

## Delete

```bash
aio runtime action delete mypkg/my-action
```

## Quick reference

| Task | Command |
|------|---------|
| List all actions | `aio runtime action list` |
| Count actions | `aio runtime action list --count` |
| JSON output | add `--json` to list/create/update |
| Package-scoped list | `aio runtime action list <packagename>` |

For manifest-based bulk deploy, use the **aio-runtime-deploy** skill.
