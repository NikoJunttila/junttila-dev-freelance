---
name: playwright
description: Drive a real Chromium browser to verify UI changes in this go-webgym repo via the Playwright CLI — navigate pages, snapshot the accessibility tree to YAML, click/fill by element refs, screenshot, check console errors. Use for ad-hoc UI verification while making changes (NOT for writing regression tests — those go under tests/e2e/ and run via `task test:e2e`).
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

## Project specifics

- **Ports come from `./.env`, never hardcode `:8080` or `:7331`.** Read `PORT` (raw app, Air hot-reload of Go) and `PROXY_PORT` (templ proxy — Go *and* templ hot-reload). Prefer `PROXY_PORT` for UI work.
- **Dev tenant host:** `http://local.localhost:$PROXY_PORT/`. `*.localhost` resolves to 127.0.0.1 on most systems; the multi-tenant middleware peels the subdomain off as the tenant key.
- **Snapshots land in `.playwright-cli/page-<timestamp>.yml`** (gitignored). Element refs in the YAML look like `e21`, `e35` — pass them straight back to `click`/`fill`/`hover`.
- **Always save screenshots under `.playwright-cli/` too** — pass `--filename=.playwright-cli/<name>.png`. The CLI writes screenshots to wherever `--filename` points, and the repo root is *not* gitignored, so a bare `--filename=foo.png` will leave a stray PNG that can get accidentally committed. Only `.playwright-cli/` is in `.gitignore`.
- **Default is headless.** Add `--headed` to `open` when you actually want to watch.
- **Always pass `--browser=chromium` to `open`.** The CLI defaults to Google Chrome (`/opt/google/chrome/chrome`), but this project only installs Chromium via `npx playwright install chromium` (shared with `task test:e2e`). Without the flag you'll get `Chromium distribution 'chrome' is not found`.

## The standard loop

```bash
# 1. Start the dev server in another terminal (or check it's running):
#    task dev

# 2. Read ports from .env (don't hardcode):
PORT=$(grep '^PORT=' .env | cut -d= -f2)
PROXY_PORT=$(grep '^PROXY_PORT=' .env | cut -d= -f2)

# 3. Open + snapshot:
npx -y @playwright/cli@latest open "http://local.localhost:$PROXY_PORT/" --browser=chromium -s=webgym
npx -y @playwright/cli@latest snapshot -s=webgym
# → YAML written to .playwright-cli/page-*.yml; read it to find element refs

# 4. Interact using refs from the snapshot:
npx -y @playwright/cli@latest click e21 -s=webgym
npx -y @playwright/cli@latest fill e15 "admin" -s=webgym

# 5. Screenshot + console:
npx -y @playwright/cli@latest screenshot --filename=.playwright-cli/dashboard.png -s=webgym
npx -y @playwright/cli@latest console error -s=webgym

# 6. Close when done:
npx -y @playwright/cli@latest close -s=webgym
```

The `-s=webgym` flag keeps a named session alive across commands so you don't pay browser-startup cost on every step. `npx -y @playwright/cli@latest list` shows active sessions; `close-all` kills them all.

## Authenticated routes

Most `/management/*` and `/dashboard` routes need a logged-in session (see `internal/handlers/web/route_profiles.go`). Two options:

### A — Reuse the e2e auth state (preferred when available)

The e2e suite logs in once and writes `tests/playwright/.auth/user.json`. After running `task test:e2e` at least once locally:

```bash
npx -y @playwright/cli@latest open "http://local.localhost:$PROXY_PORT/" --browser=chromium -s=webgym
npx -y @playwright/cli@latest state-load tests/playwright/.auth/user.json -s=webgym
npx -y @playwright/cli@latest goto "http://local.localhost:$PROXY_PORT/dashboard" -s=webgym
```

Storage state expires when the JWT does (24h). Re-run `task test:e2e` to refresh.

### B — Walk the Keycloak login

Dev Keycloak is seeded with `admin` / `admin` from `tests/e2e/fixtures/keycloak-realm.json` (override via `E2E_USER` / `E2E_PASSWORD`).

```bash
npx -y @playwright/cli@latest goto "http://local.localhost:$PROXY_PORT/api/auth/oidc/login" -s=webgym
npx -y @playwright/cli@latest snapshot -s=webgym
# locate the username/password input refs in the YAML, then:
npx -y @playwright/cli@latest fill e<user-ref> "admin" -s=webgym
npx -y @playwright/cli@latest fill e<pass-ref> "admin" -s=webgym
npx -y @playwright/cli@latest click e<submit-ref> -s=webgym
npx -y @playwright/cli@latest goto "http://local.localhost:$PROXY_PORT/dashboard" -s=webgym
```

Optionally `state-save tests/playwright/.auth/user.json -s=webgym` afterwards to persist for next session.

### C — Public routes need no auth

`/`, `/anything-bad` (404), and `/dev/components` (only when `!config.IsProd()`) are reachable cold. `/dev/d3-chart*` needs `SuperUser`.

## Responsive checks

Breakpoints in `web/static/assets/css/app.css`: **1280 / 1024 / 768 / 480**. The sidebar collapses to a slide-in drawer below 768.

```bash
for w in 360 768 1280; do
  npx -y @playwright/cli@latest resize $w 900 -s=webgym
  npx -y @playwright/cli@latest screenshot --filename=.playwright-cli/dashboard-$w.png -s=webgym
done
```

## Dark / light parity

The design system uses `[data-scheme="light"|"dark"]` on `<html>`. Hard-coded hex values break dark mode — `eval` style check:

```bash
npx -y @playwright/cli@latest eval "window.SmartTouchTheme.set('dark')" -s=webgym
npx -y @playwright/cli@latest screenshot --filename=.playwright-cli/dark.png -s=webgym
npx -y @playwright/cli@latest eval "window.SmartTouchTheme.set('light')" -s=webgym
npx -y @playwright/cli@latest screenshot --filename=.playwright-cli/light.png -s=webgym
```

## Console errors

Run after each interaction. CSP violations and missing assets surface here. The dev CSP matches prod — real violations need fixing, but `unsafe-eval` from Alpine is a known exemption.

```bash
npx -y @playwright/cli@latest console error -s=webgym
```

## What this is NOT for

- **Deterministic regression tests.** Use `task test:e2e` (specs in `tests/e2e/*.spec.ts`).
- **Network shaping** (slow 3G, offline).
- **Production OIDC.** Dev Keycloak only.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Browser not found` | `npx playwright install chromium` |
| `local.localhost` doesn't resolve | macOS/Windows resolve `*.localhost` natively. On older Linux, add `127.0.0.1 local.localhost` to `/etc/hosts`. |
| Storage-state file missing | Run `task test:e2e` once to populate `tests/playwright/.auth/user.json`. |
| Session feels stale / weird state | `npx -y @playwright/cli@latest close-all` then start fresh. |
| Connection refused | `task dev` not running, or `.env` port doesn't match what's listening. |
