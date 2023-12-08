import z from 'zod';

import {
  countryCodeArray,
  httpsUrl,
  ntfyTopicArray,
  userAgentFormat,
} from '@/lib/regex.js';

/**
 * Env schema.
 *
 * @since 1.0.0
 */
export const envSchema = z.object({
  ALLOWED_COUNTRIES: z.array(z.string().refine((country) => countryCodeArray.test(country))).min(1),
  ALLOWED_USER_AGENTS: z.string().refine((userAgent) => userAgentFormat.test(userAgent)),
  DISALLOWED_IP_ADDRESSES: z.array(z.string()),
  NTFY_SERVER_ALERT: z.string().min(1),
  NTFY_SERVER_LINK: z.string().refine((url) => httpsUrl.test(url)),
  NTFY_SERVER_TOKEN: z.string().min(1),
  NTFY_TOPICS: z.array(z.string().refine((ntfyTopic) => ntfyTopicArray.test(ntfyTopic))).min(1),
});

/**
 * Request body schema.
 *
 * @since 1.0.0
 */
export const requestBodySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
});

/**
 * Request cf schema.
 *
 * @since 1.0.0
 */
export const requestCfSchema = z.object({
  asn: z.number(),
  asOrganization: z.string(),
  botManagement: z.object({
    score: z.number().gte(1).lte(99),
    verifiedBot: z.boolean(),
  }).optional(),
  city: z.string().optional(),
  colo: z.string(),
  continent: z.string().optional(),
  country: z.string().optional(),
  httpProtocol: z.string(),
  isEUCountry: z.literal('1').optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  metroCode: z.string().optional(),
  postalCode: z.string().optional(),
  region: z.string().optional(),
  regionCode: z.string().optional(),
  requestPriority: z.string().optional(),
  timezone: z.string(),
  tlsCipher: z.string(),
  tlsVersion: z.string(),
});

/**
 * Request header cf connecting ip schema.
 *
 * @since 1.0.0
 */
export const requestHeaderCfConnectingIpSchema = z.string();

/**
 * Request header content type schema.
 *
 * @since 1.0.0
 */
export const requestHeaderContentTypeSchema = z.literal('application/json');

/**
 * Request header user agent schema.
 *
 * @since 1.0.0
 */
export const requestHeaderUserAgentSchema = z.string().refine((userAgent) => userAgentFormat.test(userAgent));

/**
 * Request method schema.
 *
 * @since 1.0.0
 */
export const requestMethodSchema = z.union([
  z.literal('POST'),
  z.literal('PUT'),
]);
