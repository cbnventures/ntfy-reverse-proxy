import z from 'zod';

import { countryCodeArray } from '@/lib/regex.js';

/**
 * Env schema.
 *
 * @since 1.0.0
 */
export const envSchema = z.object({
  countries: z.object({
    mode: z.union([
      z.literal('disabled'),
      z.literal('allow'),
      z.literal('disallow'),
    ]),
    list: z.array(z.string().regex(countryCodeArray)),
  }),
  ip_addresses: z.object({
    mode: z.union([
      z.literal('disabled'),
      z.literal('allow'),
      z.literal('disallow'),
    ]),
    list: z.array(z.string().ip()),
  }),
  servers: z.object({
    mode: z.union([
      z.literal('send-all'),
      z.literal('send-once'),
    ]),
    list: z.array(z.object({
      subdomain: z.string().min(1),
      topic: z.string().min(1),
      server: z.string().url(),
      token: z.string().startsWith('tk_'),
    })),
  }),
  settings: z.object({
    force_https: z.boolean(),
    show_response_output: z.boolean(),
    show_visitor_info: z.boolean(),
  }),
  user_agents: z.object({
    mode: z.union([
      z.literal('disabled'),
      z.literal('allow'),
      z.literal('disallow'),
    ]),
    list: z.array(z.string().min(1)),
  }),
});
