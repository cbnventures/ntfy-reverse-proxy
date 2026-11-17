import { z } from 'zod';

import { interpretAppPayload } from './app-payload.js';

import type {
  Worker_Interpreters_Mailmask_FormatMailmaskBody_BodyLines,
  Worker_Interpreters_Mailmask_FormatMailmaskBody_Parsed,
  Worker_Interpreters_Mailmask_FormatMailmaskBody_Payload,
  Worker_Interpreters_Mailmask_FormatMailmaskBody_Returns,
  Worker_Interpreters_Mailmask_Input,
  Worker_Interpreters_Mailmask_MailmaskInterpreter,
  Worker_Interpreters_Mailmask_MailmaskInterpreter_App,
  Worker_Interpreters_Mailmask_Returns,
} from '../../types/worker/interpreters/mailmask.d.ts';

/**
 * Worker - Interpreters - Mailmask - Payload Tags Item.
 *
 * Validates each ntfy tag before the Mailmask-specific payload is formatted.
 * Keeping the item schema separate matches the shared app payload validator.
 *
 * @since 2.4.0
 */
const mailmaskPayloadTagsItem = z.string();

/**
 * Worker - Interpreters - Mailmask - Payload Schema.
 *
 * Validates Mailmask's versioned notification contract and its detail fields.
 * Unknown fields and future reason codes remain compatible within version 1.
 *
 * @since 2.4.0
 */
const mailmaskPayloadSchema = z.object({
  version: z.literal(1),
  app: z.literal('mailmask'),
  event: z.enum([
    'message-refused',
    'test',
  ]),
  title: z.string().min(1),
  message: z.string(),
  priority: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  tags: z.array(mailmaskPayloadTagsItem),
  occurredAt: z.string(),
  details: z.object({
    alias: z.string(),
    envelopeSender: z.string(),
    recipient: z.string(),
    reason: z.string(),
  }),
});

/**
 * Worker - Interpreters - Mailmask - Format Mailmask Body.
 *
 * Keeps the refusal message readable while retaining the alias, sender, and
 * stable reason code that help an operator diagnose why Mailmask refused it.
 *
 * @param {Worker_Interpreters_Mailmask_FormatMailmaskBody_Payload} payload - Payload.
 *
 * @returns {Worker_Interpreters_Mailmask_FormatMailmaskBody_Returns}
 *
 * @since 2.4.0
 */
function formatMailmaskBody(payload: Worker_Interpreters_Mailmask_FormatMailmaskBody_Payload): Worker_Interpreters_Mailmask_FormatMailmaskBody_Returns {
  const parsed: Worker_Interpreters_Mailmask_FormatMailmaskBody_Parsed = mailmaskPayloadSchema.parse(payload);
  const bodyLines: Worker_Interpreters_Mailmask_FormatMailmaskBody_BodyLines = [
    parsed['message'],
    '',
    `Alias: ${parsed['details']['alias']}`,
    `Envelope sender: ${parsed['details']['envelopeSender']}`,
    `Reason: ${parsed['details']['reason']}`,
  ];

  return bodyLines.join('\n');
}

/**
 * Worker - Interpreters - Mailmask - Interpreter.
 *
 * Reads Mailmask refusal and test notifications through the shared app format.
 * The detail formatter preserves the routing context needed to act on an alert.
 *
 * @returns {Worker_Interpreters_Mailmask_Returns}
 *
 * @since 2.4.0
 */
const mailmaskInterpreter: Worker_Interpreters_Mailmask_MailmaskInterpreter = (input: Worker_Interpreters_Mailmask_Input): Worker_Interpreters_Mailmask_Returns => {
  const app: Worker_Interpreters_Mailmask_MailmaskInterpreter_App = {
    key: 'mailmask',
    name: 'Mailmask',
    formatBody: formatMailmaskBody,
  };

  return interpretAppPayload(app, input);
};

export {
  mailmaskInterpreter,
};
