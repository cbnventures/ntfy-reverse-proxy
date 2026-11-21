# PROJECT_RULES.md

## Project Identity

### Name and Description

- **Project name:** ntfy-reverse-proxy
- **Description:** A Cloudflare Workers reverse proxy and notification gateway for ntfy with built-in webhook interpreters, CLI config management, and server fallback.
- **Primary language:** TypeScript
- **Framework / runtime:** Cloudflare Workers (Wrangler), Node.js CLI (Commander), and Docusaurus documentation

### Repository URL

- **URL:** https://github.com/cbnventures/ntfy-reverse-proxy

## Repository Structure

### Repository Layout

```
ntfy-reverse-proxy/
├── .changelog/                    — Pending Nova changelog fragments
├── .github/workflows/             — Nova-generated GitHub Actions workflows
├── apps/
│   └── docs/                      — Docusaurus documentation site
├── packages/
│   └── ntfy-reverse-proxy/        — Published CLI and Cloudflare Worker package
│       └── src/
│           ├── cli/               — CLI commands and interactive menu
│           ├── lib/               — Shared schemas and runtime utilities
│           ├── worker/            — Worker handlers, pipeline, and durable outbox
│           ├── tests/             — Package unit and integration tests
│           └── types/             — Type declarations mirroring package source
├── scripts/                       — Repository build, development, and release helpers
├── tests/                         — Root tooling and package-script contracts
├── config.sample.json             — User configuration example
├── nova.config.json               — Nova project and workspace configuration
├── package.json                   — Private monorepo coordinator
└── README.md                      — Project overview and generated sections
```

### Source Structure

```
packages/ntfy-reverse-proxy/src/
├── cli/
│   ├── commands/                    — Config, deployment, generation, and validation commands
│   ├── menu/                        — Interactive configuration interface
│   └── index.ts                     — Commander entry point
├── lib/
│   ├── schema.ts                    — Zod configuration and API response schemas
│   ├── cloudflare.ts                — Cloudflare API client (token, zone, permissions, KV, Email Routing, custom domains)
│   ├── public-dns.ts                — Public DNS over HTTPS adapter (deploy readiness)
│   ├── package-runtime.ts           — Packaged CLI path and version resolution
│   └── utility.ts                   — Shared configuration helpers
├── worker/
│   ├── durable-objects/             — Durable delivery outbox and retries
│   ├── interpreters/                — ntfy, pfSense, Seerr, Statuspage, Synology, UniFi, and text adapters, plus app-alert adapters for outpost, pfsense-actions, transmission-vpn, and discord-stonker-bot
│   ├── landing/                     — Public landing page response
│   ├── pipeline/                    — Request, email, formatting, and delivery stages
│   ├── handlers.ts                  — HTTP and email pipeline orchestration
│   ├── ntfy-client.ts               — ntfy client: owns every ntfy header, auth, and publish or upload request
│   └── index.ts                     — Cloudflare Worker entry point
├── tests/                           — Tests mirroring package behavior
└── types/                           — Declarations mirroring source and tests
```

### Key Files

| File                                                                        | Purpose                           | When to modify                                       |
|-----------------------------------------------------------------------------|-----------------------------------|------------------------------------------------------|
| `packages/ntfy-reverse-proxy/src/worker/index.ts`                           | Worker entry point                | Changing exported Worker handlers                    |
| `packages/ntfy-reverse-proxy/src/worker/handlers.ts`                        | HTTP and email orchestration      | Changing pipeline sequencing                         |
| `packages/ntfy-reverse-proxy/src/worker/durable-objects/delivery-outbox.ts` | Durable delivery and retry queue  | Changing queued-delivery behavior                    |
| `packages/ntfy-reverse-proxy/src/worker/pipeline/deliver.ts`                | Delivery routing                  | Changing immediate versus durable delivery           |
| `packages/ntfy-reverse-proxy/src/worker/pipeline/interpret.ts`              | Interpreter dispatcher            | Adding or changing interpreter routing               |
| `packages/ntfy-reverse-proxy/src/cli/index.ts`                              | CLI entry point                   | Adding or changing CLI commands                      |
| `packages/ntfy-reverse-proxy/src/cli/menu/interactive.ts`                   | Interactive configuration UI      | Changing the guided menu flow                        |
| `packages/ntfy-reverse-proxy/src/lib/schema.ts`                             | Configuration validation schemas  | Changing the user configuration contract             |
| `apps/docs/docusaurus.config.ts`                                            | Documentation site configuration  | Changing navigation, search, metadata, or deployment |
| `config.sample.json`                                                        | Sample configuration              | Changing the user configuration contract             |
| `nova.config.json`                                                          | Repository and workspace metadata | Changing Nova-managed project behavior               |
| `packages/ntfy-reverse-proxy/package.json`                                  | Published package manifest        | Adding dependencies, scripts, or release metadata    |

## Build and Tooling

### Prerequisites

| Tool     | Version                    | Purpose                                   |
|----------|----------------------------|-------------------------------------------|
| Node.js  | See root `engines`         | Runtime, CLI, documentation, and build    |
| npm      | See root `packageManager`  | Package manager                           |
| Wrangler | See package dependency pin | Cloudflare Workers development and deploy |

### Commands

| Command             | What it does                                           |
|---------------------|--------------------------------------------------------|
| `npm install`       | Install every workspace dependency                     |
| `npm run dev`       | Run available workspace development processes          |
| `npm run prod`      | Run available compiled production processes            |
| `npm run manage`    | Launch the interactive package configuration UI        |
| `npm run tail`      | Stream and persist Cloudflare Worker logs              |
| `npm run check`     | Run root and workspace linting, type checks, and tests |
| `npm run build`     | Build the package and documentation site               |
| `npm run deploy`    | Validate, generate Worker configuration, and deploy    |
| `npm run clean`     | Remove root and workspace build output                 |
| `npm run changelog` | Record or release Nova changelog entries               |
| `npm run recipes`   | Apply enabled Nova recipes across the repository       |

### Environment Variables

Nova supplies `NODE_ENV`, `LOG_LEVEL`, and `LOG_TIME` in generated dotenv files. The root also accepts `CLOUDFLARE_API_TOKEN` for non-interactive Cloudflare operations. Product configuration lives in `config.json`. Deploying needs that API token: the CLI reads it from the environment or `.env` and verifies it, and the interactive flow prompts for one when it's missing or invalid. Credentials from `wrangler login` aren't used.

## Workspace Rules

### Naming Conventions

| Entity               | Convention                   | Example                                                                 |
|----------------------|------------------------------|-------------------------------------------------------------------------|
| Source files         | kebab-case                   | `ntfy-json.ts`, `plain-text.ts`                                         |
| Config keys          | snake_case                   | `base_domain`, `show_visitor_info`, `error_topic`                       |
| Server/context names | user-defined free text       | `"central"`, `"homebridge-adt-pulse"`                                   |
| Type files           | Mirror source path           | `packages/ntfy-reverse-proxy/src/types/worker/pipeline/deliver.d.ts`    |
| Test files           | Mirror source path + `.test` | `packages/ntfy-reverse-proxy/src/tests/worker/pipeline/deliver.test.ts` |
| CLI commands         | kebab-case noun              | `server`, `context`, `settings`                                         |

### Do / Don't

**Do:**
- Keep Worker code (`packages/ntfy-reverse-proxy/src/worker/`) and CLI code (`packages/ntfy-reverse-proxy/src/cli/`) separated. They run on different runtimes.
- Add new interpreters under `packages/ntfy-reverse-proxy/src/worker/interpreters/` and register them in the dispatcher map.
- Use Zod schemas for all external input validation (config, webhook payloads).
- Mask sensitive values (tokens, URLs, subdomains) in any user-visible output. Tokens show as `tk_***`, server URLs as `*** name url ***`, subdomains as last 5 chars only.
- Mirror package source structure in `packages/ntfy-reverse-proxy/src/types/` and `packages/ntfy-reverse-proxy/src/tests/` exactly.
- Keep third-party API code (URLs, auth, headers, request and response shapes) inside its adapter: `lib/cloudflare.ts` for the Cloudflare API, `lib/public-dns.ts` for public DNS lookups, `worker/ntfy-client.ts` for ntfy, and `worker/interpreters/` for inbound payloads. The pipeline builds project-owned messages, and deploy only calls the Cloudflare client's methods.

**Don't:**
- Don't put Cloudflare-specific settings (compatibility_date, routes) in the user-facing config. Those are generated.
- Don't commit `config.json` or `wrangler.toml`. Both are gitignored. Only `config.sample.json` is committed.
- Don't expose server URLs, full subdomains, or tokens in GET landing page debug output or POST/PUT response debug output.
- Don't silently swallow interpreter failures. Hard fail and optionally forward to `error_topic` if configured.

## Architecture and Data

### Architecture

Pipeline architecture with two entry points:

```
HTTP Request (Cloudflare Worker)
  |
  v
Receive -> Route -> Authenticate -> Parse -> Interpret -> Format -> Split -> Deliver -> Respond

Email -> Route -> Authenticate -> Interpret -> Format -> Split -> Deliver

Deliver -> Durable Object outbox -> Primary/fallback ntfy servers

CLI (Node.js)
  |
  v
Interactive Menu / Direct Commands -> Config Read/Write -> Validate -> Generate wrangler.toml
```

The request and email handlers coordinate the transformation stages. Delivery can complete immediately or enter the Durable Object outbox for ordered retries. The CLI manages configuration and generates the Worker deployment file.

### Data Flow and Ownership

1. **Receive or parse email** — Normalize the HTTP request or inbound email into pipeline input.
2. **Route** — Match the HTTP subdomain or email recipient to a configured context.
3. **Authenticate** — Validate the request token or allowed email sender before processing content.
4. **Parse** — Determine HTTP body type or extract the email body and attachments.
5. **Interpret** — Transform the input through the context's configured interpreter.
6. **Format and split** — Produce ntfy messages and divide oversized content safely.
7. **Deliver** — Send immediately or enqueue ordered delivery through the Durable Object outbox.
8. **Respond** — Return the final HTTP status and optional debug information.

### Error Strategy

| Layer              | Strategy                                                                                                        |
|--------------------|-----------------------------------------------------------------------------------------------------------------|
| Worker entry point | Try/catch entire pipeline. Return JSON with HTTP status. Include debug details if `show_response_output` is on. |
| Pipeline stages    | Each stage returns typed result or throws. Entry point identifies which stage failed.                           |
| Interpreters       | Zod validation on payloads. Hard fail if shape doesn't match. Forward to `error_topic` if configured.           |
| Send/fallback      | Never throws. Collects per-server results. Primary fails, tries next. Returns success/failure per server.       |
| CLI                | Try/catch at command level. Chalk-formatted errors. Non-zero exit code on failure.                              |
| Config validation  | Zod schemas on load. Checks: orphaned server refs, duplicate subdomains, missing fields, invalid token format.  |

## Project Guardrails

No additional project-specific guardrails are currently documented beyond the workspace rules and shared convention files.

## Testing and Verification

The supported verification commands are documented under Build and Tooling. Changes must pass every check applicable to the affected workspaces and platforms.

## Documentation and Ownership

### Documentation Structure

#### Framework

- **Framework:** Docusaurus with `@cbnventures/docusaurus-preset-nova`
- **Source directory:** `apps/docs/`

#### Site Structure

```
apps/docs/
├── blog/                       — Release and project articles
├── docs/
│   ├── features/               — Delivery, email, and security behavior
│   ├── getting-started/        — Configuration and deployment guides
│   ├── interpreters/           — Supported webhook formats
│   └── reference/              — Architecture, CLI, development, and troubleshooting
└── src/pages/                  — Documentation homepage
```

#### Commands

- `npm run dev --workspace ntfy-reverse-proxy-docs` starts the documentation site.
- `npm run check --workspace ntfy-reverse-proxy-docs` validates docs, links, types, and formatting.
- `npm run build --workspace ntfy-reverse-proxy-docs` builds the production site.
- `npm run i18n --workspace ntfy-reverse-proxy-docs` synchronizes and validates translations.

## Publishing and Deployment

### Release Process

1. Record user-facing changes through `npm run changelog` while developing.
2. Preview the release with `npm run changelog -- --release --dry-run`, then run the real release after approval.
3. Run a clean install, `npm run check`, and `npm run build` against the released working copy.
4. Run `npm run manage -- validate` to verify config integrity.
5. Commit the verified release and tag it with the released package version; the publish workflow handles package and documentation deployment.

### CI/CD Workflows

| Workflow file                                       | Trigger                  | What it does                                      |
|-----------------------------------------------------|--------------------------|---------------------------------------------------|
| `nova-check-sponsor-gated-issues-sponsor-check.yml` | Issue open/close/comment | Apply GitHub Sponsors-based support policy        |
| `nova-lock-inactive-issues-lock-inactive.yml`       | Weekly cron or manual    | Lock inactive issues and pull requests            |
| `nova-publish-project.yml`                          | Version tag or manual    | Check, build, and publish package and docs output |

### Environments

| Environment        | URL / Identifier                        | Purpose                         |
|--------------------|-----------------------------------------|---------------------------------|
| Cloudflare Workers | Custom domains via `base_domain` config | Production notification gateway |

## Additional Project Rules

No additional project rules are currently documented.
