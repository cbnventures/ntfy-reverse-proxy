# ntfy-reverse-proxy

## 2.6.1 - 2026-11-27

### UPDATED
- Secret paths sit under `/inbound/`, so one Cloudflare block rule can let every secret path through without listing them.

## 2.6.0 - 2026-11-27

### ADDED
- A `secret_path` setting for HTTP contexts, which turns away any request that doesn't use the context's secret URL path with the same 404 as an unknown host, for senders such as Statuspage that can't send an auth header.
- Lists in `allowed_from`, so an email context can accept several sender addresses or `*@domain` wildcards.

## 2.5.1 - 2026-11-27

### UPDATED
- The documentation site now loads Google Analytics, Microsoft Clarity and Meta Pixel directly instead of through Google Tag Manager and has its own fonts and colors, and the project uses Nova 0.54.0.

## 2.5.0 - 2026-11-21

### UPDATED
- The package's internal file layout now places compiled files in `build/cli/` and `build/worker/` instead of `build/src/`, and its test setup drops a `sequence` option that only repeated Vitest's default. The `ntfy-reverse-proxy` and `nrp` commands are unchanged.
- Tests now report coverage through a `check:coverage` script, which fails when line, function, branch or statement coverage drops below the project minimum, and the README badges now include that coverage.
- Nova 0.49.0, which keeps each Logger entry and error stack trace on one line in Cloudflare Workers logs and other non-interactive output instead of splitting it across several lines.
- The package description now reads "Route webhooks and emails to ntfy through Cloudflare Workers, with automatic server failover".

### ADDED
- A readiness check at the end of `nrp deploy` confirms each HTTP context's custom domain is attached to the Worker and resolves on public DNS, waiting up to a minute and naming any host that is still pending, and warns when email contexts' base domain has no MX records for Cloudflare Email Routing.

## 2.4.0 - 2026-11-17

### UPDATED
- Nova is now 0.44.0.
- The root landing page uses the shared service card, with a documentation link and embedded project branding, and no longer loads Google Fonts.

### FIXED
- A notification that ntfy keeps rejecting no longer blocks its context's queue. Rejected notifications are dropped and reported to error_topic, while network errors and server outages keep retrying on a timer for up to 24 hours.

### ADDED
- Session tokens for HTTP contexts whose senders run public code, set with a context's session secret instead of its token, handed out at /session and spent once per message from the same address.
- A Mailmask interpreter for its versioned refusal and test notifications.

## 2.3.0 - 2026-11-01

### UPDATED
- Bundled and validated the config once at Worker startup instead of storing it in Worker variables, raising practical context capacity from about 20 to thousands.
- Used the package-installed Wrangler for deployments instead of allowing npx to select or download a different version.
- Capped local compatibility dates to the installed Workers runtime and included delivery outcomes in tailed email logs.
- Generated wrangler.toml beside the selected config and regenerated the local Worker bundle on every development run.

### FIXED
- Surfaced malformed ntfy JSON and Statuspage payloads as interpretation errors instead of silent mismatches.
- Validated HTTP context IDs and preserved explicit email context IDs when resolving collisions.
- Returned failing CLI statuses for invalid configurations and clear errors when requested servers or contexts do not exist.
- Prevented failed error-topic diagnostics from entering the durable queue and blocking later alerts.
- Paginated Cloudflare email-routing rule discovery so deployments reconcile more than 50 existing routes.
- Preserved binary plain-text payloads as attachments without adding an empty notification message.

### ADDED
- App-mismatch diagnostics that identify the correct supported interpreter for each incoming alert.
- Transmission VPN, pfSense Actions, Discord Stonker Bot, and Outpost interpreters that preserve source priorities and tags while labeling each notification by app.
- The X-NRP-Context header for selecting a context during localhost development.

## 2.2.1 - 2026-10-18

### UPDATED
- Aligned the sample configuration and full documentation example with the CLI's canonical server, context, and settings ordering.
- The project toolchain moves to Nova 0.33.0, including native workspace orchestration and the dedicated custom-rule preset entry point.

## 2.2.0 - 2026-10-13

### UPDATED
- Regenerated the bug-report template with sentence-aware pronoun capitalization.
- Nova and Docusaurus Preset Nova are now 0.30.1.
- Adopted role-based TypeScript preset layers.
- Standardized root-owned tests under the shared project layout.
- Aligned JSDoc hierarchies with the function-level contract.

### FIXED
- Passed generated Cloudflare Pages project and branch values through the workflow environment so deployment commands remain shell-safe.

### ADDED
- A SQLite-backed Durable Object delivery outbox with isolated FIFO lanes per context, automatic retries on the next notification, per-stage delivery checkpoints, and stable ntfy sequence IDs without Cloudflare Queues.

## 2.1.8 - 2026-10-11

### UPDATED
- Nova and the Docusaurus preset are now 0.29.0 across the project, CLI package, and docs.
- Completed JavaScript, TypeScript, browser, Node.js, Cloudflare Workers, and Docusaurus preset coverage, and consolidated custom Nova lint rules into the shared rule bundle while preserving workspace-specific overrides.
- Declared the root workspace as ESM and expanded Vitest configuration and setup type-check coverage.
- Wrangler, Cloudflare Workers types, and TSX are now on their latest compatible releases, and the Worker runtime declarations are regenerated.
- Recorded README badge and Node.js bug-report settings explicitly in Nova configuration.

## 2.1.7 - 2026-10-03

### UPDATED
- Nova and the Docusaurus preset are now 0.28.0 across the project, CLI package, and docs, including the runtime-only Vitest resolution fix.
- Assigned explicit child environments to development, production, build, and deployment script groups.

## 2.1.6 - 2026-09-23

### UPDATED
- Nova and the Docusaurus preset are now 0.27.3 across the project, CLI package, and docs, granting the generated inactive-thread workflow write access to pull requests.

## 2.1.5 - 2026-09-18

### UPDATED
- Nova and the Docusaurus preset are now 0.27.2 across the project, CLI package, and docs.

## 2.1.4 - 2026-09-16

### UPDATED
- Scoped the Cloudflare Workers ESLint runtime preset to worker implementation files so the hybrid package keeps its Workers and Node.js lint boundaries explicit.
- Approved fsevents for macOS file watching and exact-version node-pty for its native build while explicitly denying the other reviewed install scripts.
- The node-pty package is now the official 1.2.0-beta.14 pre-release so clean macOS installs use executable upstream prebuilds.
- Developer tooling moves to Nova 0.27.0, Wrangler 4.131.1, and Workers Types 5.20260911.1 while preserving CLI token generation compatibility and normalizing generated type output for repository checks.
- Upgraded Docusaurus to 3.10.2, React to 19.2.8, TypeScript to 6.0.3, ESLint to 9.39.5, and Vitest to 4.1.11, while aligning Node types to 24.9.1.
- Disabled Turbo caching for build and check tasks so repository commands no longer accumulate persistent Turbo cache artifacts.

### FIXED
- Installed CLI setup and deployment work by packaging a valid starter config, resolving the bundled Worker entry at runtime, reading the installed version, and keeping repository-only linting out of deploys.
- Interactive CLI integration tests run in restricted environments and report child-process failures immediately.

## 2.1.3 - 2026-08-20

### UPDATED
- The @cbnventures/nova package is now 0.25.2 and @cbnventures/docusaurus-preset-nova is now 0.25.2.

## 2.1.2 - 2026-08-20

### UPDATED
- Bumped @cbnventures/nova and @cbnventures/docusaurus-preset-nova from 0.25.0 to 0.25.1

## 2.1.1 - 2026-08-19

### UPDATED
- The @cbnventures/nova package is now 0.25.0 and @cbnventures/docusaurus-preset-nova is now 0.25.0.
- Upgrade Wrangler from 4.123.0 to 4.124.0, @cloudflare/vitest-pool-workers from 0.21.3 to 0.22.0, tsx from 4.21.0 to 4.23.12, Chalk from 5.6.2 to 6.0.0, Commander from 14.0.3 to 15.0.0, and turbo from 2.10.6 to 2.10.11.

### FIXED
- CI publish workflow failed because node-pty install scripts were blocked by npm. Added allowScripts to permit node-pty compilation on Linux.
- The context edit flow now aborts cleanly if the first prompt is cancelled instead of running all remaining prompts and saving an empty update.
- The error_topic and allowed_from fields in the context edit flow now preserve their current values when the prompt is cancelled instead of being cleared.
- Cancelling a server edit prompt now returns to the server menu instead of the main menu.
- Added an undefined guard for the error_events multiselect in the add-context flow so a cancelled prompt no longer passes undefined to addContext.
- The interactive CLI now shows a "Go back" option on all data-selection prompts (edit/remove servers, edit/remove contexts, and primary server picker in both edit and add flows).

## 2.1.0 - 2026-08-17

### UPDATED
- Internal: removed a no-op conditional branch and its unused state variable from the pfSense interpreter's notification-line parsing; interpreted output is unchanged.
- Internal: removed the unused deleteState KV helper from the Statuspage accumulator; it had no callers, and incident state is already cleaned up by the existing 24-hour TTL.
- Upgrade Nova CLI from 0.17.0 to 0.24.0 and Portless from 0.10.1 to 0.15.5.
- Internal: added a drift-guard test asserting the interpreter enum in the config schema stays in sync with the worker's interpreter dispatch map; a mismatch would otherwise let a valid config through validation and then crash at request time with 'Unknown interpreter'.
- Upgrade Wrangler from 4.87.0 to 4.123.0, @cloudflare/vitest-pool-workers from 0.15.2 to 0.21.3, and @cloudflare/workers-types from 4.20260504.1 to 4.20260702.1.

### FIXED
- The deploy command now runs lint before any Cloudflare API call, so a lint failure no longer leaves behind an orphaned KV namespace or a stale wrangler.toml; a successful deploy is unchanged.
- Seerr media notifications (automatically approved, now available, and similar) no longer fail with HTTP 422 when the issue, comment, media, or request fields arrive as null instead of being absent; these payloads now interpret into notifications correctly.
- The Statuspage interpreter no longer crashes when an incident or component webhook arrives with a null page field.
- The deploy command lint step no longer fails when the CLI is invoked from outside the package directory; it now resolves the package root from the running module path instead of relying on the working directory.

### ADDED
- Contexts can now choose which error categories notify their error topic via the new optional error_events setting; set it to ["interpretation"] to keep interpreter-error alerts while silencing authentication-failure notifications from unauthenticated scanner traffic. Omitting it preserves the previous behavior (both authentication and interpretation errors notify). Settable in the interactive CLI or config.json.

## 2.0.4 - 2026-05-04

### UPDATED
- The error_topic notifications now include the unauthorized request body (parsed as JSON or text, never both), structured Zod validation issues, error stack traces, response status, masked authorization header, and pipeline stage — enough detail to debug incoming traffic without keeping wrangler tail open

## 2.0.3 - 2026-04-23

### UPDATED
- The nova dependency is now v0.17.0.

## 2.0.2 - 2026-04-21

### FIXED
- Docs deployment no longer silently fails to reach Cloudflare Pages — nova v0.16.2 workflow template update configures the download-artifact step with the correct workspace build path, so the generated site now lands at `apps/docs/build/` for the Pages upload to pick up, instead of being extracted to the repo root.

## 2.0.1 - 2026-04-19

### FIXED
- Strip GlobalProps from generated worker types to prevent type-check failures when build output does not exist

## 2.0.0 - 2026-04-18

### UPDATED
- Visitor geolocation injection for enriching notifications with geographic data
- Wrangler configuration migrated to v4 with built-in type generation
- Server failover with send-once and send-all delivery modes
- Markdown formatting support with per-interpreter toggle for bold helpers and separators
- HTTP-to-HTTPS automatic redirect for production requests

### ADDED
- The pfSense interpreter for firewall event notifications
- The ntfy JSON pass-through interpreter for native forwarding
- KV-backed accumulator for Statuspage incidents with 24-hour TTL for tracking component status changes
- Automatic message splitting for notifications exceeding 4KB with numbered part headers
- Synology DSM interpreter for NAS alert notifications
- Seerr interpreter for media request notifications
- Error topics for publishing interpretation failures while preserving raw request data
- Email-to-notification pipeline via Cloudflare Email Routing with MIME multipart parsing
- UniFi interpreter for network device notifications
- Plain text fallback interpreter for unrecognized payloads
- HTML stripping utility with entity decoding for plain-text extraction from email bodies
- Statuspage.io interpreter for incident status notifications
- Interactive CLI with commands for server, context, settings, config-io, validate, generate, and deploy
- Context-based routing with per-context interpreter, authentication, target server, and delivery mode

### FIXED
- Wrangler type generation no longer fails on CI — committed worker-configuration.d.ts as a build dependency and wrapped the generate step to gracefully skip when wrangler.toml is not present
- The GitHub Packages workflow no longer fails to install cross-repo scoped dependencies — resolved by nova v0.15.2 workflow template update that configures the registry after npm install

### REMOVED
- Old single-file source structure
- The @cloudflare/workers-types package (replaced by Wrangler 4 built-in types)
- Subdomain-based routing replaced by context-based routing

## 1.2.2 - 2026-03-13

### UPDATED
- Package dependencies are up to date.
- Wrangler configuration migrated to v4 with built-in runtime type generation.
- Enhanced TypeScript declaration linting rules.

### REMOVED
- The @cloudflare/workers-types package (replaced by Wrangler 4 built-in types)

## 1.2.1 - 2025-01-21

### UPDATED
- Package dependencies are up to date.
- ESLint configuration migrated to the new flat config format.
- License changed from Apache License 2.0 to MIT.

### FIXED
- Incorrect TypeScript type issues are resolved.

## 1.2.0 - 2024-02-27

### UPDATED
- Enhanced README.md documentation.

### REMOVED
- Country, IP address, and user agent visitor filtering settings, in favor of access control through Cloudflare's WAF and Configuration Rules.

## 1.1.0 - 2024-02-24

### UPDATED
- Reverted the wrangler.toml split back to a single configuration file, restoring the `npm run deploy` script.
- Development dependencies and the Cloudflare Workers compatibility date are current.

## 1.0.4 - 2024-01-19

### UPDATED
- Package dependencies are up to date.
- Deployment configuration split into wrangler-prod.toml and wrangler-test.toml instead of a single wrangler.toml.
- ESLint now runs as part of the deployment process.
- Revamped the TypeScript and ESLint configuration files.

## 1.0.3 - 2024-01-18

### UPDATED
- The `deploy` script now explicitly targets wrangler.toml.
- The .gitignore file is updated to track the wrangler-sample.toml template while ignoring generated wrangler*.toml files.

## 1.0.2 - 2024-01-10

### UPDATED
- Simplified the internal type definition used for constructing ntfy request headers.

## 1.0.1 - 2024-01-06

### UPDATED
- License changed from ISC to Apache License 2.0.

## 1.0.0 - 2023-12-28

### ADDED
- Reverse proxy for forwarding push notifications to one or more self-hosted ntfy server instances via Cloudflare Workers.
- Subdomain-based routing to match incoming requests to configured local ntfy servers.
- Send-once and send-all delivery modes for redundant multi-server setups.
- Country, IP address, and user agent allow/disallow filtering for visitor access control.
- Visitor info section with geolocation and ISP details attached to incoming requests.
- Automatic HTTPS redirect enforcement.
- Forwarding of ntfy publish headers (X-Title, X-Priority, X-Tags, and others) to local servers.
