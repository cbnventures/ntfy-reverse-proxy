# ntfy-reverse-proxy

## 2.1.2 - 2026-08-20

### UPDATED
- Bumped @cbnventures/nova and @cbnventures/docusaurus-preset-nova from 0.25.0 to 0.25.1

## 2.1.1 - 2026-08-19

### UPDATED
- Updated @cbnventures/nova to 0.25.0 and @cbnventures/docusaurus-preset-nova to 0.25.0.
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
- error_topic notifications now include the unauthorized request body (parsed as JSON or text, never both), structured Zod validation issues, error stack traces, response status, masked authorization header, and pipeline stage — enough detail to debug incoming traffic without keeping wrangler tail open

## 2.0.3 - 2026-04-23

### UPDATED
- Updated nova dependency to v0.17.0.

## 2.0.2 - 2026-04-21

### FIXED
- Fix docs deployment silently failing to reach Cloudflare Pages — nova v0.16.2 workflow template update configures the download-artifact step with the correct workspace build path, so the generated site now lands at `apps/docs/build/` for the Pages upload to pick up, instead of being extracted to the repo root.

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
- pfSense interpreter for firewall event notifications
- ntfy JSON pass-through interpreter for native forwarding
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
- Fix wrangler type generation failing on CI — committed worker-configuration.d.ts as a build dependency and wrapped the generate step to gracefully skip when wrangler.toml is not present
- Fix GitHub Packages workflow failing to install cross-repo scoped dependencies — resolved by nova v0.15.2 workflow template update that configures the registry after npm install

### REMOVED
- Old single-file source structure
- @cloudflare/workers-types package (replaced by Wrangler 4 built-in types)
- Subdomain-based routing replaced by context-based routing

## 1.2.2 - 2026-03-13

### UPDATED
- Updated package dependencies.
- Wrangler configuration migrated to v4 with built-in runtime type generation.
- Enhanced TypeScript declaration linting rules.

### REMOVED
- @cloudflare/workers-types package (replaced by Wrangler 4 built-in types)

## 1.2.1 - 2025-01-21

### UPDATED
- Updated package dependencies.
- ESLint configuration migrated to the new flat config format.
- License changed from Apache License 2.0 to MIT.

### FIXED
- Fix incorrect TypeScript type issues.

## 1.2.0 - 2024-02-27

### UPDATED
- Enhanced README.md documentation.

### REMOVED
- Country, IP address, and user agent visitor filtering settings, in favor of access control through Cloudflare's WAF and Configuration Rules.

## 1.1.0 - 2024-02-24

### UPDATED
- Reverted the wrangler.toml split back to a single configuration file, restoring the `npm run deploy` script.
- Updated development dependencies and the Cloudflare Workers compatibility date.

## 1.0.4 - 2024-01-19

### UPDATED
- Updated package dependencies.
- Deployment configuration split into wrangler-prod.toml and wrangler-test.toml instead of a single wrangler.toml.
- ESLint now runs as part of the deployment process.
- Revamped the TypeScript and ESLint configuration files.

## 1.0.3 - 2024-01-18

### UPDATED
- `deploy` script now explicitly targets wrangler.toml.
- .gitignore updated to track the wrangler-sample.toml template while ignoring generated wrangler*.toml files.

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
- send-once and send-all delivery modes for redundant multi-server setups.
- Country, IP address, and user agent allow/disallow filtering for visitor access control.
- Visitor info section with geolocation and ISP details attached to incoming requests.
- Automatic HTTPS redirect enforcement.
- Forwarding of ntfy publish headers (X-Title, X-Priority, X-Tags, and others) to local servers.
