import { z } from 'zod';

import {
  LIB_REGEX_BASE_DOMAIN,
  LIB_REGEX_SECRET_PATH,
  LIB_REGEX_WORKER_NAME,
} from './regex.js';

/**
 * Lib - Schema - Server Schema.
 *
 * Validates the name, HTTPS server URL, and token prefix
 * for each configured ntfy server connection.
 *
 * @since 2.0.0
 */
const serverSchema = z.object({
  name: z.string().min(1),
  server: z.string().url().refine((s) => s.startsWith('https://'), { message: 'Server URL must start with https://' }),
  token: z.string().startsWith('tk_'),
});

/**
 * Lib - Schema - Session Schema.
 *
 * Validates the signing secret, token lifetime, and per-address
 * issue limit for contexts that hand out short-lived session tokens.
 *
 * @since 2.4.0
 */
const sessionSchema = z.object({
  secret: z.string().min(32),
  ttl_seconds: z.number().int().min(60).max(3600).optional(),
  max_per_hour: z.number().int().min(1).max(1000).optional(),
}).strict();

/**
 * Lib - Schema - HTTP Context Schema.
 *
 * Validates routing and interpreter settings for inbound
 * HTTP webhook contexts in the proxy configuration.
 *
 * @since 2.0.0
 */
const httpContextSchema = z.object({
  type: z.literal('http'),
  name: z.string().min(1),
  id: z.string().min(1).max(63).regex(LIB_REGEX_WORKER_NAME, { message: 'HTTP context ID must contain only lowercase alphanumeric characters and hyphens, and cannot start or end with a hyphen' }),
  interpreter: z.enum([
    'plain-text',
    'ntfy-json',
    'seerr',
    'synology',
    'statuspage',
    'pfsense',
    'unifi',
    'transmission-vpn',
    'pfsense-actions',
    'discord-stonker-bot',
    'outpost',
    'mailmask',
  ]),
  topic: z.string().min(1),
  error_topic: z.string().min(1).optional(),
  error_events: z.array(z.enum([
    'authentication',
    'interpretation',
  ])).optional(),
  mode: z.enum([
    'send-once',
    'send-all',
  ]),
  show_visitor_info: z.boolean(),
  primary_server: z.string().min(1),
  servers: z.array(z.string().min(1)).min(1),
  token: z.string().min(1).optional(),
  session: sessionSchema.optional(),
  secret_path: z.string().regex(LIB_REGEX_SECRET_PATH, { message: 'Secret path must be 32 to 128 lowercase letters and digits' }).optional(),
}).strict().refine((context) => context['token'] === undefined || context['session'] === undefined, {
  message: 'HTTP context cannot set both token and session',
  path: ['session'],
}).refine((context) => context['secret_path'] === undefined || context['session'] === undefined, {
  message: 'HTTP context cannot set both secret_path and session',
  path: ['secret_path'],
});

/**
 * Lib - Schema - Email Context Schema.
 *
 * Validates routing and interpreter settings for inbound
 * email contexts in the proxy configuration.
 *
 * @since 2.0.0
 */
const emailContextSchema = z.object({
  type: z.literal('email'),
  name: z.string().min(1),
  id: z.string().min(1),
  interpreter: z.enum([
    'plain-text',
    'ntfy-json',
    'seerr',
    'synology',
    'statuspage',
    'pfsense',
    'unifi',
    'transmission-vpn',
    'pfsense-actions',
    'discord-stonker-bot',
    'outpost',
    'mailmask',
  ]),
  topic: z.string().min(1),
  error_topic: z.string().min(1).optional(),
  error_events: z.array(z.enum([
    'authentication',
    'interpretation',
  ])).optional(),
  mode: z.enum([
    'send-once',
    'send-all',
  ]),
  show_visitor_info: z.boolean(),
  primary_server: z.string().min(1),
  servers: z.array(z.string().min(1)).min(1),
  allowed_from: z.union([
    z.string().min(1),
    z.array(z.string().min(1)).min(1),
  ]).optional(),
}).strict();

/**
 * Lib - Schema - Context Schema.
 *
 * Discriminated union that accepts either an HTTP or email
 * context based on the value of the type field.
 *
 * @since 2.0.0
 */
const contextSchema = z.discriminatedUnion('type', [
  httpContextSchema,
  emailContextSchema,
]);

/**
 * Lib - Schema - Settings Schema.
 *
 * Validates global settings such as the base domain and
 * whether response output should be displayed.
 *
 * @since 2.0.0
 */
const settingsSchema = z.object({
  worker_name: z.string().min(1).regex(LIB_REGEX_WORKER_NAME, { message: 'Worker name must contain only lowercase alphanumeric characters and hyphens, and cannot start or end with a hyphen' }),
  base_domain: z.string().min(1).regex(LIB_REGEX_BASE_DOMAIN, { message: 'Base domain must be a valid domain name (lowercase alphanumeric characters, hyphens, and dots)' }),
  show_response_output: z.boolean(),
});

/**
 * Lib - Schema - Config Schema.
 *
 * Top-level schema that composes settings, servers, and
 * contexts into a single validated configuration object.
 *
 * @since 2.0.0
 */
const configSchema = z.object({
  servers: z.array(serverSchema),
  contexts: z.array(contextSchema),
  settings: settingsSchema,
});

/**
 * Lib - Schema - Cloudflare Envelope Schema.
 *
 * Validates the envelope that wraps every Cloudflare v4 API answer, including
 * the cursor some lists use to page, so deploy reads every endpoint the same way.
 *
 * @since 2.5.0
 */
const cloudflareEnvelopeSchema = z.object({
  success: z.boolean(),
  errors: z.array(z.object({
    code: z.number(),
    message: z.string(),
  })).nullish(),
  result: z.unknown(),
  result_info: z.object({
    cursor: z.string().optional(),
  }).nullish(),
});

/**
 * Lib - Schema - Cloudflare Zones Schema.
 *
 * Validates the zone list returned when deploy looks up the zone, and the
 * account that owns it, for the base domain.
 *
 * @since 2.5.0
 */
const cloudflareZonesSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  account: z.object({
    id: z.string(),
  }),
}));

/**
 * Lib - Schema - Cloudflare Kv Namespaces Schema.
 *
 * Validates the account's KV namespaces, so deploy can reuse the Worker's
 * namespace instead of creating a second one.
 *
 * @since 2.5.0
 */
const cloudflareKvNamespacesSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
}));

/**
 * Lib - Schema - Cloudflare Kv Namespace Schema.
 *
 * Validates the namespace Cloudflare returns after creating one, of which only
 * its ID matters to the generated wrangler.toml.
 *
 * @since 2.5.0
 */
const cloudflareKvNamespaceSchema = z.object({
  id: z.string(),
});

/**
 * Lib - Schema - Cloudflare Email Routing Rules Schema.
 *
 * Validates the zone's Email Routing rules, so deploy can tell which ones send
 * a context address to this Worker.
 *
 * @since 2.5.0
 */
const cloudflareEmailRoutingRulesSchema = z.array(z.object({
  tag: z.string(),
  matchers: z.array(z.object({
    type: z.string(),
    field: z.string().optional(),
    value: z.string().optional(),
  })),
  actions: z.array(z.object({
    type: z.string(),
    value: z.array(z.string()).optional(),
  })),
}));

/**
 * Lib - Schema - Cloudflare Worker Domains Schema.
 *
 * Validates the Workers custom domains on a zone, so deploy can confirm each
 * HTTP context's host is attached to the Worker after publishing.
 *
 * @since 2.5.0
 */
const cloudflareWorkerDomainsSchema = z.array(z.object({
  hostname: z.string(),
  service: z.string(),
}));

/**
 * Lib - Schema - DNS Over HTTPS Answer Schema.
 *
 * Validates a public resolver's JSON answer, of which the response code and each
 * answer's type and data matter, so deploy can see the records the world sees.
 *
 * @since 2.5.0
 */
const dnsOverHttpsAnswerSchema = z.object({
  Status: z.number(),
  Answer: z.array(z.object({
    type: z.number(),
    data: z.string(),
  })).optional(),
});

export {
  cloudflareEmailRoutingRulesSchema,
  cloudflareEnvelopeSchema,
  cloudflareKvNamespaceSchema,
  cloudflareKvNamespacesSchema,
  cloudflareWorkerDomainsSchema,
  cloudflareZonesSchema,
  configSchema,
  contextSchema,
  dnsOverHttpsAnswerSchema,
  emailContextSchema,
  httpContextSchema,
  serverSchema,
  sessionSchema,
  settingsSchema,
};
