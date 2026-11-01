import { interpretAppPayload } from './app-payload.js';

import type {
  Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter,
  Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter_App,
  Worker_Interpreters_DiscordStonkerBot_Input,
  Worker_Interpreters_DiscordStonkerBot_Returns,
} from '../../types/worker/interpreters/discord-stonker-bot.d.ts';

/**
 * Worker - Interpreters - Discord Stonker Bot - Discord Stonker Bot Interpreter.
 *
 * Reads the alerts Discord Stonker Bot sends, such as a lost connection to Discord.
 * The app name goes before each title, and the alert keeps its priority and tags.
 *
 * @returns {Worker_Interpreters_DiscordStonkerBot_Returns}
 *
 * @since 2.3.0
 */
const discordStonkerBotInterpreter: Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter = (input: Worker_Interpreters_DiscordStonkerBot_Input): Worker_Interpreters_DiscordStonkerBot_Returns => {
  const app: Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter_App = {
    key: 'discord-stonker-bot',
    name: 'Discord Stonker Bot',
  };

  return interpretAppPayload(app, input);
};

export {
  discordStonkerBotInterpreter,
};
