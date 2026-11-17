import { z } from 'zod';

import type {
  Worker_Interpreters_AppPayload_InterpretAppPayload_App,
  Worker_Interpreters_AppPayload_InterpretAppPayload_Body,
  Worker_Interpreters_AppPayload_InterpretAppPayload_DecodedBody,
  Worker_Interpreters_AppPayload_InterpretAppPayload_Decoder,
  Worker_Interpreters_AppPayload_InterpretAppPayload_Input,
  Worker_Interpreters_AppPayload_InterpretAppPayload_IsSupportedApp,
  Worker_Interpreters_AppPayload_InterpretAppPayload_Parsed,
  Worker_Interpreters_AppPayload_InterpretAppPayload_Payload,
  Worker_Interpreters_AppPayload_InterpretAppPayload_Returns,
  Worker_Interpreters_AppPayload_InterpretAppPayload_SupportedAppList,
  Worker_Interpreters_AppPayload_SupportedApps,
} from '../../types/worker/interpreters/app-payload.d.ts';

/**
 * Worker - Interpreters - App Payload - Supported Apps.
 *
 * Lists the app discriminator values that have matching interpreters.
 * Unknown producer names must not be presented as usable configuration values.
 *
 * @since 2.3.0
 */
const supportedApps: Worker_Interpreters_AppPayload_SupportedApps = [
  'transmission-vpn',
  'pfsense-actions',
  'discord-stonker-bot',
  'outpost',
  'mailmask',
];

/**
 * Worker - Interpreters - App Payload - App Payload Tags Item.
 *
 * Defines the Zod validator for individual tag array entries
 * so the schema can reference it without nesting calls.
 *
 * @since 2.3.0
 */
const appPayloadTagsItem = z.string();

/**
 * Worker - Interpreters - App Payload - App Payload Schema.
 *
 * Defines the alert body that Transmission VPN, pfSense Actions, Discord Stonker
 * Bot, Outpost, and Mailmask send so invalid payloads fail before delivery.
 *
 * @since 2.3.0
 */
const appPayloadSchema = z.object({
  version: z.literal(1),
  app: z.string().min(1),
  event: z.string().min(1),
  title: z.string().min(1),
  message: z.string(),
  priority: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  tags: z.array(appPayloadTagsItem),
  occurredAt: z.string(),
  details: z.record(z.string(), z.unknown()),
});

/**
 * Worker - Interpreters - App Payload - Interpret App Payload.
 *
 * Reads one alert and builds the notification with the app name before its title.
 * An alert from another app fails and names the interpreter its context should use.
 *
 * @param {Worker_Interpreters_AppPayload_InterpretAppPayload_App}   app   - App.
 * @param {Worker_Interpreters_AppPayload_InterpretAppPayload_Input} input - Input.
 *
 * @returns {Worker_Interpreters_AppPayload_InterpretAppPayload_Returns}
 *
 * @since 2.3.0
 */
function interpretAppPayload(app: Worker_Interpreters_AppPayload_InterpretAppPayload_App, input: Worker_Interpreters_AppPayload_InterpretAppPayload_Input): Worker_Interpreters_AppPayload_InterpretAppPayload_Returns {
  let parsed: Worker_Interpreters_AppPayload_InterpretAppPayload_Parsed = input;

  if (typeof input === 'string') {
    parsed = JSON.parse(input);
  } else if (input instanceof ArrayBuffer) {
    const decoder: Worker_Interpreters_AppPayload_InterpretAppPayload_Decoder = new TextDecoder('utf-8');
    const decodedBody: Worker_Interpreters_AppPayload_InterpretAppPayload_DecodedBody = decoder.decode(input);

    parsed = JSON.parse(decodedBody);
  }

  const payload: Worker_Interpreters_AppPayload_InterpretAppPayload_Payload = appPayloadSchema.parse(parsed);

  if (payload['app'] !== app['key']) {
    const isSupportedApp: Worker_Interpreters_AppPayload_InterpretAppPayload_IsSupportedApp = supportedApps.some((supportedApp) => supportedApp === payload['app']);

    if (isSupportedApp === false) {
      const supportedAppList: Worker_Interpreters_AppPayload_InterpretAppPayload_SupportedAppList = supportedApps.join(', ');

      throw new Error(`This context reads ${app['name']} alerts, but the payload came from ${payload['app']}. That app is unsupported. Use one of these interpreters: ${supportedAppList}.`);
    }

    throw new Error(`This context reads ${app['name']} alerts, but the payload came from ${payload['app']}. Set the context's interpreter to ${payload['app']}.`);
  }

  let body: Worker_Interpreters_AppPayload_InterpretAppPayload_Body = payload['message'];

  if (app['formatBody'] !== undefined) {
    body = app.formatBody(payload);
  }

  return {
    notification: {
      title: `[${app['name']}] ${payload['title']}`,
      body,
      priority: payload['priority'],
      tags: [
        app['key'],
        ...payload['tags'],
      ],
    },
  };
}

export {
  interpretAppPayload,
};
