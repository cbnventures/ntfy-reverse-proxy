import z from 'zod';

/**
 * Env schema.
 *
 * @since 1.0.0
 */
export const envSchema = z.object({
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
});
