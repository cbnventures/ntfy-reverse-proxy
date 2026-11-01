import { describe, expect, it } from 'vitest';

import { discordStonkerBotInterpreter } from '../../../worker/interpreters/discord-stonker-bot.js';

import type { Tests_Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter_ReadsAJobFailedAlert_Result } from '../../../types/tests/worker/interpreters/discord-stonker-bot.test.d.ts';

/**
 * Tests - Worker - Interpreters - Discord Stonker Bot - Discord Stonker Bot Interpreter.
 *
 * @since 2.3.0
 */
describe('discordStonkerBotInterpreter', () => {
  it('reads a job failed alert', () => {
    const result: Tests_Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter_ReadsAJobFailedAlert_Result = discordStonkerBotInterpreter({
      version: 1,
      app: 'discord-stonker-bot',
      event: 'job-failed',
      title: 'Job gave up',
      message: 'A Discord message for Weekly digest failed on all 5 tries and won\'t run again: Missing Access',
      priority: 4,
      tags: ['x'],
      occurredAt: '2026-10-26T12:00:00.000Z',
      details: { ruleName: 'Weekly digest' },
    });

    expect(result['notification']).toStrictEqual({
      title: '[Discord Stonker Bot] Job gave up',
      body: 'A Discord message for Weekly digest failed on all 5 tries and won\'t run again: Missing Access',
      priority: 4,
      tags: [
        'discord-stonker-bot',
        'x',
      ],
    });

    return;
  });

  return;
});
