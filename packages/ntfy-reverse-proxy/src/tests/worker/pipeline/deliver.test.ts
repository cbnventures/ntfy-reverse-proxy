import { describe, expect, it } from 'vitest';

import { deliver } from '../../../worker/pipeline/deliver.js';

import type {
  Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_EnqueueInput,
  Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_Options,
  Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_Outbox,
  Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_RequestedName,
  Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_Result,
} from '../../../types/tests/worker/pipeline/deliver.test.d.ts';

/**
 * Tests - Worker - Pipeline - Deliver - Deliver.
 *
 * @since UNRELEASED
 */
describe('deliver', () => {
  it('uses the explicit context ID as the isolated lane name', async () => {
    let requestedName: Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_RequestedName = undefined;
    let enqueueInput: Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_EnqueueInput = undefined;
    const outbox: Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_Outbox = {
      getByName: (name) => {
        requestedName = name;

        return {
          enqueue: (input) => {
            enqueueInput = input;

            return Promise.resolve({
              deliveryId: 'delivery-id',
              state: 'delivered',
              pending: 0,
              sendResult: {
                results: [],
                fallbackUsed: false,
              },
            });
          },
        };
      },
    };
    const options: Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_Options = {
      messages: [{
        body: 'notification',
        headers: { 'X-Title': 'Notification' },
      }],
      servers: [
        {
          name: 'alpha',
          server: 'https://ntfy.alpha.example.com',
          token: 'tk_alpha',
        },
        {
          name: 'beta',
          server: 'https://ntfy.beta.example.com',
          token: 'tk_beta',
        },
      ],
      primaryServer: {
        name: 'beta',
        server: 'https://ntfy.beta.example.com',
        token: 'tk_beta',
      },
      topic: 'test-topic',
      mode: 'send-once',
    };
    const result: Tests_Worker_Pipeline_Deliver_Deliver_UsesTheExplicitContextIDAsTheIsolatedLaneName_Result = await deliver('synology-context', outbox, options);

    expect(requestedName).toBe('synology-context');

    expect(enqueueInput).toBeDefined();

    if (enqueueInput === undefined) {
      throw new Error('Expected the delivery input to be captured');
    }

    expect(enqueueInput['serverNames']).toEqual([
      'alpha',
      'beta',
    ]);

    expect(enqueueInput['primaryServerName']).toBe('beta');

    expect(result['state']).toBe('delivered');

    return;
  });

  return;
});
