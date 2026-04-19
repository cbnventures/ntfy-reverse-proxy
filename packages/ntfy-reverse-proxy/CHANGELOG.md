# ntfy-reverse-proxy

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

### REMOVED
- Old single-file source structure
- @cloudflare/workers-types package (replaced by Wrangler 4 built-in types)
- Subdomain-based routing replaced by context-based routing
