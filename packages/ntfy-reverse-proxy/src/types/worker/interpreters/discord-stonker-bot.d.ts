import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Discord Stonker Bot.
 *
 * @since 2.3.0
 */
export type Worker_Interpreters_DiscordStonkerBot_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_DiscordStonkerBot_Returns = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter = (input: Worker_Interpreters_DiscordStonkerBot_Input) => Worker_Interpreters_DiscordStonkerBot_Returns;

/**
 * Worker - Interpreters - Discord Stonker Bot - Discord Stonker Bot Interpreter.
 *
 * @since 2.3.0
 */
export type Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter_AppKey = string;

export type Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter_AppName = string;

export type Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter_App = {
  key: Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter_AppKey;
  name: Worker_Interpreters_DiscordStonkerBot_DiscordStonkerBotInterpreter_AppName;
};
