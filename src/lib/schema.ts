import z from 'zod';

import { countryCodeArray, httpsUrl, ntfyTopicArray } from '@/lib/regex';

/**
 * Environment variables.
 *
 * @since 1.0.0
 */
export const environmentVariables = z.object({
  ALLOWED_COUNTRIES: z.array(z.string().refine((country) => countryCodeArray.test(country))).min(1),
  NTFY_SERVER_ALERT: z.string().min(1),
  NTFY_SERVER_LINK: z.string().refine((url) => httpsUrl.test(url)),
  NTFY_SERVER_TOKEN: z.string().min(1),
  NTFY_TOPICS: z.array(z.string().refine((ntfyTopic) => ntfyTopicArray.test(ntfyTopic))).min(1),
});

/**
 * Request body.
 *
 * @since 1.0.0
 */
export const incomingRequestBody = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
});

/**
 * Request cf.
 *
 * @since 1.0.0
 */
export const incomingRequestCf = z.object({
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
  isEUCountry: z.enum(['1']).optional(),
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
 * Request method.
 *
 * @since 1.0.0
 */
export const incomingRequestMethod = z.enum(['PUT', 'POST']);
