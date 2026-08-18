import type { Worker_Pipeline_Interpret_NotificationObject } from './interpret.d.ts';

/**
 * Worker - Pipeline - Format.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Format_Notification = Worker_Pipeline_Interpret_NotificationObject;

export type Worker_Pipeline_Format_OptionsShowVisitorInfo = boolean;

export type Worker_Pipeline_Format_OptionsVisitorIp = string;

export type Worker_Pipeline_Format_OptionsCfProperties = Record<string, unknown>;

export type Worker_Pipeline_Format_Options = {
  showVisitorInfo: Worker_Pipeline_Format_OptionsShowVisitorInfo;
  visitorIp?: Worker_Pipeline_Format_OptionsVisitorIp;
  cfProperties?: Worker_Pipeline_Format_OptionsCfProperties;
};

export type Worker_Pipeline_Format_ResultBody = string;

export type Worker_Pipeline_Format_ResultHeaders = Record<string, string>;

export type Worker_Pipeline_Format_Result = {
  body: Worker_Pipeline_Format_ResultBody;
  headers: Worker_Pipeline_Format_ResultHeaders;
};

export type Worker_Pipeline_Format_Returns = Worker_Pipeline_Format_Result;

export type Worker_Pipeline_Format_Body = string;

export type Worker_Pipeline_Format_Cf = Worker_Pipeline_Format_OptionsCfProperties;

export type Worker_Pipeline_Format_Ip = string;

export type Worker_Pipeline_Format_Separator = string;

export type Worker_Pipeline_Format_IsMarkdown = boolean;

export type Worker_Pipeline_Format_Lines = string[];

export type Worker_Pipeline_Format_Headers = Record<string, string>;

export type Worker_Pipeline_Format_PriorityString = string;

export type Worker_Pipeline_Format_TagsString = string;

export type Worker_Pipeline_Format_MarkdownString = string;

export type Worker_Pipeline_Format_Format_Bold_Bold_Returns = string;

export type Worker_Pipeline_Format_Format_Bold_Bold = (text: string) => Worker_Pipeline_Format_Format_Bold_Bold_Returns;
