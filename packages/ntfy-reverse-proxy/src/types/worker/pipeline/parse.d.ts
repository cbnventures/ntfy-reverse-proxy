/**
 * Worker - Pipeline - Parse.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Parse_ResultType = 'text' | 'json' | 'binary' | 'unknown';

export type Worker_Pipeline_Parse_ResultText = string;

export type Worker_Pipeline_Parse_ResultJson = Record<string, unknown>;

export type Worker_Pipeline_Parse_ResultBinary = ArrayBuffer;

export type Worker_Pipeline_Parse_Result = {
  type: Worker_Pipeline_Parse_ResultType;
  text?: Worker_Pipeline_Parse_ResultText;
  json?: Worker_Pipeline_Parse_ResultJson;
  binary?: Worker_Pipeline_Parse_ResultBinary;
};

export type Worker_Pipeline_Parse_Returns = Worker_Pipeline_Parse_Result;

export type Worker_Pipeline_Parse_ContentType = string;

export type Worker_Pipeline_Parse_ContentTypePart = string | undefined;

export type Worker_Pipeline_Parse_BaseContentType = string;

export type Worker_Pipeline_Parse_IsBinaryContentType = boolean;

export type Worker_Pipeline_Parse_Bytes = Uint8Array;

export type Worker_Pipeline_Parse_Text = string | undefined;

export type Worker_Pipeline_Parse_Decoder = TextDecoder;

export type Worker_Pipeline_Parse_IsJsonContentType = boolean;

export type Worker_Pipeline_Parse_LooksLikeJson = boolean;

export type Worker_Pipeline_Parse_Json = Record<string, unknown>;

export type Worker_Pipeline_Parse_Parse_RawBody = ArrayBuffer;

export type Worker_Pipeline_Parse_Parse_Headers = Headers;
