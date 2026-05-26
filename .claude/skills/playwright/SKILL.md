---
name: playwright
description: Drive a real Chromium browser to verify UI changes in this go- svelterepo via the Playwright CLI — navigate pages, snapshot the accessibility tree to YAML, click/fill by element refs, screenshot, check console errors. Use for ad-hoc UI verification while making changes.
allowed-tools: Bash
---

# Playwright CLI — UI verification

`@playwright/cli` is a shell-invoked browser driver. Each command writes a compact result (and snapshots write YAML to `.playwright-cli/`) instead of streaming the accessibility tree into context like the MCP did. Much cheaper per turn.

## One-time setup

```bash
task playwright:cli:check   # confirms CLI + Chromium are reachable
```

If the check reports a missing browser:

```bash
npx playwright install chromium
```

The CLI itself runs via `npx -y @playwright/cli@latest <cmd>` — no global install needed. For brevity, alias in your shell mentally as `pwc`; **in commands below, always use `npx -y @playwright/cli@latest <cmd>`**.

## The standard loop

```bash
# 1. Start the dev server in another terminal (or check it's running):
#    task dev

# 2. Open + snapshot:
npx -y @playwright/cli@latest open "http://localhost:5173/" --browser=chromium
npx -y @playwright/cli@latest snapshot -s=svelte
# → YAML written to .playwright-cli/page-*.yml; read it to find element refs

# 4. Interact using refs from the snapshot:
npx -y @playwright/cli@latest click e21 -s=svelte
npx -y @playwright/cli@latest fill e15 "admin" -s=svelte

# 5. Screenshot + console:
npx -y @playwright/cli@latest screenshot --filename=.playwright-cli/dashboard.png -s=svelte
npx -y @playwright/cli@latest console error -s=svelte

# 6. Close when done:
npx -y @playwright/cli@latest close -s=svelte
```

The `-s=`svelte flag keeps a named session alive across commands so you don't pay browser-startup cost on every step. `npx -y @playwright/cli@latest list` shows active sessions; `close-all` kills them all.

## Console errors

Run after each interaction. CSP violations and missing assets surface here.

```bash
npx -y @playwright/cli@latest console error -s=svelte
```

## What this is NOT for

- **Network shaping** (slow 3G, offline).
