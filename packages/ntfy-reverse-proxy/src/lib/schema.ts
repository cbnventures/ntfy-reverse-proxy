import { z } from 'zod';

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
  id: z.string().min(1),
  interpreter: z.enum([
    'plain-text',
    'ntfy-json',
    'seerr',
    'synology',
    'statuspage',
    'pfsense',
    'unifi',
  ]),
  topic: z.string().min(1),
  error_topic: z.string().min(1).optional(),
  mode: z.enum([
    'send-once',
    'send-all',
  ]),
  show_visitor_info: z.boolean(),
  primary_server: z.string().min(1),
  servers: z.array(z.string().min(1)).min(1),
  token: z.string().min(1).optional(),
}).strict();

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
  ]),
  topic: z.string().min(1),
  error_topic: z.string().min(1).optional(),
  mode: z.enum([
    'send-once',
    'send-all',
  ]),
  show_visitor_info: z.boolean(),
  primary_server: z.string().min(1),
  servers: z.array(z.string().min(1)).min(1),
  allowed_from: z.string().min(1).optional(),
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
  worker_name: z.string().min(1),
  base_domain: z.string().min(1),
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

export {
  configSchema,
  contextSchema,
  emailContextSchema,
  httpContextSchema,
  serverSchema,
  settingsSchema,
};
