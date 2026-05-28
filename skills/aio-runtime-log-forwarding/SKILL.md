---
name: aio-runtime-log-forwarding
description: >-
  Configure Adobe I/O Runtime log forwarding to Splunk, New Relic, Azure Log
  Analytics, or Adobe I/O Runtime via aio-cli. Use when setting up external
  log destinations or troubleshooting log forwarding errors.
---

# Runtime Log Forwarding

Forward activation logs from your namespace to external monitoring systems.

Commands: `aio runtime namespace log-forwarding` (aliases: `aio rt ns lf`, `aio rt ns log-forwarding`).

## Check current configuration

```bash
aio runtime namespace log-forwarding get

# Check forwarding errors
aio runtime namespace log-forwarding errors
```

## Adobe I/O Runtime (CLI-accessible logs)

Store logs in Runtime so `aio runtime activation logs` works (default for many namespaces):

```bash
aio runtime namespace log-forwarding set adobe-io-runtime
```

## Splunk HEC

```bash
aio runtime namespace log-forwarding set splunk-hec \
  --host splunk.example.com \
  --port 8088 \
  --index main \
  --hec-token "$SPLUNK_HEC_TOKEN"
```

Never commit HEC tokens or shared keys to source control. Pass via env vars or secure prompts.

## New Relic

```bash
aio runtime namespace log-forwarding set new-relic \
  --base-uri https://log-api.newrelic.com/log/v1 \
  --license-key "$NEW_RELIC_LICENSE_KEY"
```

## Azure Log Analytics

```bash
aio runtime namespace log-forwarding set azure-log-analytics \
  --customer-id "$AZURE_CUSTOMER_ID" \
  --shared-key "$AZURE_SHARED_KEY" \
  --log-type AdobeRuntime
```

## Interactive setup

```bash
aio runtime namespace log-forwarding set
```

Prompts for destination type and credentials.

## Verify forwarding works

1. Configure destination (above).
2. Invoke an action that logs output:
   ```bash
   aio runtime action invoke mypkg/my-action -r
   ```
3. Check for forwarding errors:
   ```bash
   aio runtime namespace log-forwarding errors
   ```
4. Confirm logs appear in the destination (Splunk, New Relic, etc.) or via CLI:
   ```bash
   aio runtime activation logs --last
   ```

## Aliases

| Long | Short |
|------|-------|
| `aio runtime namespace log-forwarding` | `aio rt ns lf` |
| `aio runtime namespace log-forwarding get` | `aio rt ns lf get` |
| `aio runtime namespace log-forwarding set splunk-hec` | `aio rt ns lf set splunk-hec` |

## Troubleshooting

| Issue | Action |
|-------|--------|
| Logs missing in external system | Run `aio rt ns log-forwarding errors` |
| Auth failures | Verify tokens/keys; rotate if expired |
| CLI logs empty but forwarding set | Ensure destination is `adobe-io-runtime` for CLI access |
| Wrong namespace | Run `aio runtime property get --namespace` first |

For per-activation debugging without external forwarding, use the **aio-runtime-debug** skill.
