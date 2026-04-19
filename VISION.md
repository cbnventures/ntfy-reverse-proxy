# VISION.md

## Purpose

### Problem Statement

Self-hosted ntfy users who receive webhooks from multiple services (Synology NAS, Homebridge, Statuspage.io, etc.) have no unified way to route, transform, and reliably deliver those notifications to ntfy servers. Direct webhook-to-ntfy setups lack failover, produce raw/ugly notifications, and break silently when the target server is down. There is no existing tool that sits between webhook sources and ntfy to handle interpretation, formatting, and high-availability delivery.

### Origin

This project was originally built by Jacky (founder) to receive bug alerts for his [homebridge-adt-pulse](https://github.com/mrjackyliang/homebridge-adt-pulse) plugin, so he could catch and fix issues before users had to report them on GitHub. It has since grown to support multiple notification sources and ntfy server redundancy.

### Target Audience

- **Self-hosters with multiple ntfy servers** — Users running ntfy on home servers (e.g., Synology NAS) who want redundancy and failover so notifications are never missed, even when a server hasn't booted yet.
- **Developers and power users** — People who receive webhooks from services and tools (monitoring, CI/CD, status pages) and want them delivered as clean, readable ntfy notifications without writing custom glue code for each source.
- **Less technical users (Phase 2)** — Users who want a simple setup experience: install a global package, run an interactive CLI, deploy. No config file hand-editing required.

### Value Proposition

ntfy-reverse-proxy is a Cloudflare Workers-based notification gateway that transforms webhooks from any service into well-formatted ntfy notifications with automatic server failover. It separates server infrastructure (where to send) from notification contexts (what to send and how to interpret it), managed through an interactive CLI rather than manual config editing.

## Marketing Copy

### Tagline

Route, transform, and reliably deliver webhooks to ntfy from the edge.

### Elevator Pitch

ntfy-reverse-proxy is a notification gateway that runs on Cloudflare Workers and sits between your webhook sources and your ntfy servers. It transforms raw webhook payloads from services like Statuspage.io and Synology DSM into clean, formatted notifications using built-in interpreters. Configure multiple ntfy servers with automatic failover so you never miss a notification, even when your primary server is down. Set everything up through an interactive CLI -- no YAML or TOML editing required.

### Key Features

- **Built-in interpreters** — Out-of-the-box support for Statuspage.io, Synology DSM, generic JSON, and plain text. More interpreters added over time as new services are needed.
- **Server failover** — Define a primary ntfy server per context with ordered fallbacks. If the primary is unreachable, the notification is delivered via the next available server with a note that the primary was down.
- **Interactive CLI** — Manage servers, contexts, and settings through a terminal UI. Auto-generates Cloudflare config on deploy.
- **Smart message splitting** — Large payloads are automatically split into numbered parts that fit within ntfy's message size limits.
- **Debug mode** — Toggle detailed response output with sensitive values masked for safe troubleshooting.
- **Edge deployment** — Runs on Cloudflare Workers for low-latency, globally distributed notification routing.

### Differentiators

| This project                                                               | Alternatives                                                |
|----------------------------------------------------------------------------|-------------------------------------------------------------|
| Transforms webhooks into formatted notifications via built-in interpreters | Direct webhook-to-ntfy requires custom scripts per service  |
| Automatic server failover with primary/backup ordering                     | Single-server setups fail silently when the server is down  |
| Interactive CLI for config management                                      | Manual TOML/YAML/JSON editing                               |
| Proxy runs on Cloudflare's edge, shielding origin server IPs               | Traditional reverse proxies expose your server's IP address |
| Smart message splitting for large payloads                                 | Large messages either truncated or sent as file attachments |

## Glossary

| Term           | Definition                                                                                                                                                                                                    |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Context        | A notification source configuration. Defines a subdomain, interpreter, topic, server list, and delivery mode. Each webhook source (e.g., a Synology NAS, a Statuspage subscription) maps to one context.      |
| Server         | An ntfy server instance defined by URL, name, and authentication token. Servers are defined once and referenced by name from contexts.                                                                        |
| Interpreter    | A module that transforms a raw webhook payload into a standardized notification object (title, body, priority, tags, etc.). Interpreters are maintained by the project — users select from the available set. |
| Pipeline       | The linear processing stages a request passes through in the worker: Receive, Route, Parse, Interpret, Format, Split, Send, Respond.                                                                          |
| Primary server | The preferred ntfy server for a context, tried first in `send-once` mode. If unreachable, fallback servers are tried in order.                                                                                |
| send-once      | Delivery mode that tries the primary server first, then fallbacks in order. Stops on first success.                                                                                                           |
| send-all       | Delivery mode that sends to every server in the context's list simultaneously.                                                                                                                                |
| Smart split    | Automatic splitting of notification bodies exceeding ~4000 bytes into numbered message parts.                                                                                                                 |
| Error topic    | An optional ntfy topic per context where interpreter failures are forwarded, so the user is notified that a webhook couldn't be processed.                                                                    |
| Base domain    | The single domain (e.g., `ntfy.example.com`) under which all context subdomains are registered as Cloudflare custom domain routes.                                                                            |
| Landing page   | The HTML page served on GET requests showing "Powered by ntfy-reverse-proxy" branding, with optional masked debug config output.                                                                              |
