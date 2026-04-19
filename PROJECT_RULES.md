# PROJECT_RULES.md

## Project Identity

### Name and Description

- **Project name:** ntfy-reverse-proxy
- **Description:** A Cloudflare Workers reverse proxy and notification gateway for ntfy with built-in webhook interpreters, CLI config management, and server fallback.
- **Primary language:** TypeScript
- **Framework / runtime:** Cloudflare Workers (Wrangler) + Node.js CLI (Commander)

### Repository URL

- **URL:** https://github.com/cbnventures/ntfy-reverse-proxy

## Repository Layout

```
ntfy-reverse-proxy/
├── .github/              — GitHub Actions workflows
├── docs/                 — Design specs and documentation
├── src/                  — Application source code
│   ├── worker/           — Cloudflare Worker (pipeline, interpreters, landing page)
│   ├── cli/              — CLI management tool (commands, interactive menu)
│   ├── lib/              — Shared libraries (Zod schemas, config validation)
│   ├── types/            — TypeScript type definitions (.d.ts), mirrors src/ structure
│   └── tests/            — Unit and integration tests, mirrors src/ structure
├── .editorconfig         — Editor formatting rules
├── .gitignore            — Git ignore patterns
├── config.sample.json    — Sample configuration file
├── eslint.config.ts      — ESLint flat config
├── LICENSE               — MIT license
├── package.json          — Node.js manifest and scripts
├── README.md             — Project overview and badges
└── tsconfig.json         — TypeScript compiler configuration
```

## Source Structure

```
src/
├── worker/
│   ├── index.ts                — Worker entry point (fetch handler)
│   ├── pipeline/
│   │   ├── receive.ts          — Extract request metadata, HTTPS auto-detect
│   │   ├── route.ts            — Match subdomain to context
│   │   ├── parse.ts            — Detect body type (text, JSON, binary, multipart)
│   │   ├── interpret.ts        — Dispatcher to interpreter modules
│   │   ├── format.ts           — Build final message body + ntfy headers
│   │   ├── split.ts            — Smart split for large messages
│   │   ├── send.ts             — Send to servers with fallback logic
│   │   └── respond.ts          — Build HTTP response (+ debug output)
│   ├── interpreters/
│   │   ├── plain-text.ts       — Pass-through text interpreter
│   │   ├── ntfy-json.ts        — ntfy JSON to ntfy field mapping
│   │   ├── synology.ts         — Synology DSM webhook interpreter
│   │   └── statuspage.ts       — Statuspage.io webhook interpreter
│   └── landing/
│       └── page.ts             — "Powered by" HTML page + debug view
├── cli/
│   ├── index.ts                — CLI entry point (commander setup)
│   ├── commands/
│   │   ├── server.ts           — server add/list/edit/remove
│   │   ├── context.ts          — context add/list/edit/remove
│   │   ├── settings.ts         — settings management
│   │   ├── generate.ts         — generate wrangler.toml from config
│   │   └── validate.ts         — validate config integrity
│   └── menu/
│       └── interactive.ts      — Interactive TUI menu
├── lib/
│   └── schema.ts               — Zod schemas for config validation
├── types/
│   ├── worker/
│   │   ├── index.d.ts
│   │   ├── pipeline/
│   │   │   ├── receive.d.ts
│   │   │   ├── route.d.ts
│   │   │   ├── parse.d.ts
│   │   │   ├── interpret.d.ts
│   │   │   ├── format.d.ts
│   │   │   ├── split.d.ts
│   │   │   ├── send.d.ts
│   │   │   └── respond.d.ts
│   │   ├── interpreters/
│   │   │   ├── plain-text.d.ts
│   │   │   ├── ntfy-json.d.ts
│   │   │   ├── synology.d.ts
│   │   │   └── statuspage.d.ts
│   │   └── landing/
│   │       └── page.d.ts
│   ├── cli/
│   │   ├── index.d.ts
│   │   ├── commands/
│   │   │   ├── server.d.ts
│   │   │   ├── context.d.ts
│   │   │   ├── settings.d.ts
│   │   │   ├── generate.d.ts
│   │   │   └── validate.d.ts
│   │   └── menu/
│   │       └── interactive.d.ts
│   └── lib/
│       └── schema.d.ts
└── tests/
    ├── worker/
    │   ├── index.test.ts
    │   ├── pipeline/
    │   │   ├── receive.test.ts
    │   │   ├── route.test.ts
    │   │   ├── parse.test.ts
    │   │   ├── interpret.test.ts
    │   │   ├── format.test.ts
    │   │   ├── split.test.ts
    │   │   ├── send.test.ts
    │   │   └── respond.test.ts
    │   └── interpreters/
    │       ├── plain-text.test.ts
    │       ├── ntfy-json.test.ts
    │       ├── synology.test.ts
    │       └── statuspage.test.ts
    ├── cli/
    │   ├── commands/
    │   │   ├── server.test.ts
    │   │   ├── context.test.ts
    │   │   ├── settings.test.ts
    │   │   ├── generate.test.ts
    │   │   └── validate.test.ts
    │   └── menu/
    │       └── interactive.test.ts
    └── lib/
        └── schema.test.ts
```

## Key Files

| File                               | Purpose                   | When to modify                                         |
|------------------------------------|---------------------------|--------------------------------------------------------|
| `src/worker/index.ts`              | Worker entry point        | Changing the pipeline orchestration                    |
| `src/worker/pipeline/send.ts`      | Send logic with fallback  | Changing server fallback or send modes                 |
| `src/worker/pipeline/interpret.ts` | Interpreter dispatcher    | Adding or changing interpreter routing                 |
| `src/cli/index.ts`                 | CLI entry point           | Adding or changing CLI commands                        |
| `src/cli/menu/interactive.ts`      | Interactive TUI           | Changing the menu flow                                 |
| `src/lib/schema.ts`                | Config validation schemas | Changing the config shape                              |
| `config.sample.json`               | Sample config reference   | Changing the config shape                              |
| `package.json`                     | Manifest                  | Adding dependencies, changing scripts, bumping version |
| `tsconfig.json`                    | TS config                 | Changing compiler options or path aliases              |

## Build and Tooling

### Prerequisites

| Tool     | Version | Purpose                                 |
|----------|---------|-----------------------------------------|
| Node.js  | >= 22.x | Runtime (CLI and build)                 |
| npm      | >= 10.x | Package manager                         |
| Wrangler | >= 4.x  | Cloudflare Workers CLI (dev dependency) |

### Commands

| Command               | What it does                                                |
|-----------------------|-------------------------------------------------------------|
| `npm install`         | Install all dependencies                                    |
| `npm start`           | Start local development server (wrangler dev)               |
| `npm run manage`      | Launch interactive config management TUI                    |
| `npm run deploy`      | Validate config, generate wrangler.toml, lint, deploy       |
| `npm run deploy:lint` | Run ESLint across the project                               |
| `npm test`            | Run the test suite (Vitest with Miniflare for worker tests) |

### Environment Variables

No environment variables. All configuration lives in `config.json` (managed via CLI). Cloudflare credentials are handled by `wrangler login`.

## Workspace Rules

### Naming Conventions

| Entity               | Convention                   | Example                                           |
|----------------------|------------------------------|---------------------------------------------------|
| Source files         | kebab-case                   | `ntfy-json.ts`, `plain-text.ts`                   |
| Config keys          | snake_case                   | `base_domain`, `show_visitor_info`, `error_topic` |
| Server/context names | user-defined free text       | `"central"`, `"homebridge-adt-pulse"`             |
| Type files           | Mirror source path           | `src/types/worker/pipeline/send.d.ts`             |
| Test files           | Mirror source path + `.test` | `src/tests/worker/pipeline/send.test.ts`          |
| CLI commands         | kebab-case noun              | `server`, `context`, `settings`                   |

### Do / Don't

**Do:**
- Keep worker code (`src/worker/`) and CLI code (`src/cli/`) cleanly separated. They run on different runtimes (Cloudflare Workers vs Node.js).
- Add new interpreters as single files in `src/worker/interpreters/` and register them in the dispatcher map.
- Use Zod schemas for all external input validation (config, webhook payloads).
- Mask sensitive values (tokens, URLs, subdomains) in any user-visible output. Tokens show as `tk_***`, server URLs as `*** name url ***`, subdomains as last 5 chars only.
- Mirror source structure in `src/types/` and `src/tests/` exactly.

**Don't:**
- Don't put Cloudflare-specific settings (compatibility_date, routes) in the user-facing config. Those are generated.
- Don't commit `config.json` or `wrangler.toml`. Both are gitignored. Only `config.sample.json` is committed.
- Don't expose server URLs, full subdomains, or tokens in GET landing page debug output or POST/PUT response debug output.
- Don't silently swallow interpreter failures. Hard fail and optionally forward to `error_topic` if configured.

## Project-Specific Patterns

### Architecture

Pipeline architecture with two entry points:

```
HTTP Request (Cloudflare Worker)
  |
  v
Receive -> Route -> Parse -> Interpret -> Format -> Split -> Send -> Respond

CLI (Node.js)
  |
  v
Interactive Menu / Direct Commands -> Config Read/Write -> Validate -> Generate wrangler.toml
```

The worker pipeline is linear: each stage transforms data and passes it to the next. The CLI manages the config file that the worker reads at runtime.

### Data Flow

1. **Receive** — HTTP request arrives at Cloudflare Worker. Extract method, URL, headers, raw body. Module: `src/worker/pipeline/receive.ts`.
2. **Route** — Match hostname subdomain against contexts config. Module: `src/worker/pipeline/route.ts`.
3. **Parse** — Determine body type (text, JSON, binary, multipart). Module: `src/worker/pipeline/parse.ts`.
4. **Interpret** — Transform raw payload into standardized notification object via the configured interpreter. Module: `src/worker/pipeline/interpret.ts` + `src/worker/interpreters/*.ts`.
5. **Format** — Build final message body with visitor info and ntfy headers. Module: `src/worker/pipeline/format.ts`.
6. **Split** — Split large messages into numbered parts if over ~4000 bytes. Module: `src/worker/pipeline/split.ts`.
7. **Send** — Deliver to ntfy servers with fallback logic. Module: `src/worker/pipeline/send.ts`.
8. **Respond** — Return JSON response to caller. Module: `src/worker/pipeline/respond.ts`.

### Error Strategy

| Layer              | Strategy                                                                                                        |
|--------------------|-----------------------------------------------------------------------------------------------------------------|
| Worker entry point | Try/catch entire pipeline. Return JSON with HTTP status. Include debug details if `show_response_output` is on. |
| Pipeline stages    | Each stage returns typed result or throws. Entry point identifies which stage failed.                           |
| Interpreters       | Zod validation on payloads. Hard fail if shape doesn't match. Forward to `error_topic` if configured.           |
| Send/fallback      | Never throws. Collects per-server results. Primary fails, tries next. Returns success/failure per server.       |
| CLI                | Try/catch at command level. Chalk-formatted errors. Non-zero exit code on failure.                              |
| Config validation  | Zod schemas on load. Checks: orphaned server refs, duplicate subdomains, missing fields, invalid token format.  |

## Documentation Site

### Framework

- **Framework:** None
- **Source directory:** `docs/`

### Site Structure

```
docs/
└── superpowers/
    └── specs/              — Design specification documents
```

### Commands

No documentation site commands. Documentation lives as markdown in the `docs/` directory.

## Publishing and Deployment

### Release Process

1. All changes committed, `git status --short` is clean.
2. Run `npm run manage validate` to verify config integrity.
3. Run `npm run deploy` (validates, generates wrangler.toml, lints, deploys).
4. Tag the commit if publishing a release.

### CI/CD Workflows

| Workflow file               | Trigger                  | What it does                         |
|-----------------------------|--------------------------|--------------------------------------|
| `lock-inactive-issues.yml`  | Weekly cron (Sunday)     | Lock issues inactive > 30 days       |
| `sponsor-gated-support.yml` | Issue open/close/comment | GitHub Sponsors-based support gating |

### Environments

| Environment        | URL / Identifier                        | Purpose                         |
|--------------------|-----------------------------------------|---------------------------------|
| Cloudflare Workers | Custom domains via `base_domain` config | Production notification gateway |
