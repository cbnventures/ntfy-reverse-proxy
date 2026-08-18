/**
 * Tests - Worker - Pipeline - Parse.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_Body = Uint8Array;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_Headers = Headers;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_ResultType = string;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_Result = {
  type: Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_ResultType;
  text?: string;
  json?: Record<string, unknown>;
  binary?: ArrayBuffer;
};

export type Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_Body = Uint8Array;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_Headers = Headers;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_ResultType = string;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_Result = {
  type: Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_ResultType;
  text?: string;
  json?: Record<string, unknown>;
  binary?: ArrayBuffer;
};

export type Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_Body = Uint8Array;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_Headers = Headers;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_ResultType = string;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_Result = {
  type: Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_ResultType;
  text?: string;
  json?: Record<string, unknown>;
  binary?: ArrayBuffer;
};

export type Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_Body = Uint8Array;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_Headers = Headers;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_ResultType = string;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_Result = {
  type: Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_ResultType;
  text?: string;
  json?: Record<string, unknown>;
  binary?: ArrayBuffer;
};

export type Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_Body = Uint8Array;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_Headers = Headers;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_ResultType = string;

export type Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_Result = {
  type: Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_ResultType;
  text?: string;
  json?: Record<string, unknown>;
  binary?: ArrayBuffer;
};

export type Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_Body = ArrayBuffer;

export type Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_Headers = Headers;

export type Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_ResultType = string;

export type Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_Result = {
  type: Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_ResultType;
  text?: string;
  json?: Record<string, unknown>;
  binary?: ArrayBuffer;
};
