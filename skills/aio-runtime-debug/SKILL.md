---
name: aio-runtime-debug
description: >-
  Debug Adobe I/O Runtime actions with activations, logs, and results via
  aio-cli. Use when troubleshooting failed invocations, viewing activation
  history, tailing logs, or aio runtime activation commands.
---

# Runtime Debug and Activations

Every action invocation creates an **activation**. Use activation commands to inspect results and logs.

## List recent activations

```bash
# All recent activations
aio runtime activation list

# Filter by action
aio runtime activation list mypkg/my-action

# Full details
aio runtime activation list --full

# Count only
aio runtime activation list --count

# Time range (milliseconds since epoch)
aio runtime activation list --since 1700000000000
```

## Get activation details

```bash
# By activation ID
aio runtime activation get <activationId>

# Most recent activation
aio runtime activation get --last

# Logs only (stripped timestamps)
aio runtime activation get <activationId> --logs
```

## Result and logs

```bash
# Result body from most recent activation
aio runtime activation result --last

# Logs from specific activation
aio runtime activation logs <activationId>

# Most recent logs
aio runtime activation logs --last
```

## Tail logs (live)

```bash
# Tail logs for an action (continuous)
aio runtime activation logs --action mypkg/my-action --tail

# Watch mode (alias)
aio runtime activation logs --action mypkg/my-action --watch

# Poll continuously
aio runtime activation logs --action mypkg/my-action --poll

# Last N activations
aio runtime activation logs --action mypkg/my-action --limit 10
```

## Manifest-scoped log fetching

When working with deployed manifests:

```bash
# All actions in manifest
aio runtime activation logs --manifest

# Specific package in manifest
aio runtime activation logs --package my-package

# All deployed actions under a package
aio runtime activation logs --deployed --package my-package
```

## Debug workflow

1. **Reproduce** — invoke the action:
   ```bash
   aio runtime action invoke mypkg/my-action -r -p key value
   ```

2. **Check result** — if invoke fails or returns unexpected output:
   ```bash
   aio runtime activation result --last
   ```

3. **Read logs** — for stack traces and `console.log` output:
   ```bash
   aio runtime activation logs --last
   ```

4. **Inspect full activation** — for timing, status, error payload:
   ```bash
   aio runtime activation get --last
   ```

5. **Enable verbose CLI output** for API-level errors:
   ```bash
   aio runtime action invoke mypkg/my-action -r --verbose
   ```

## Aliases

| Command | Aliases |
|---------|---------|
| `aio runtime activation logs` | `aio runtime log`, `aio rt logs` |
| `aio runtime activation list` | `aio rt activations list` |

## Common issues

| Symptom | Check |
|---------|-------|
| Action timeout | `activation get --last` → look at `duration`; increase `-t` / `limits.timeout` |
| 401/403 on web action | Annotations `require-adobe-auth`, `require-whisk-auth` |
| Empty logs | Log size limit (`-l` / `limits.logSize`); activation may have failed before logging |
| "Cannot find activation" | Activation expired; invoke again and use `--last` immediately |

For log forwarding to external systems, see the **aio-runtime-log-forwarding** skill.
