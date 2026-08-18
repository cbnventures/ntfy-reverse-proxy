/**
 * Worker - Pipeline - Email.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Email_ResultFrom = string;

export type Worker_Pipeline_Email_ResultTo = string;

export type Worker_Pipeline_Email_ResultSubject = string;

export type Worker_Pipeline_Email_ResultTextBody = string;

export type Worker_Pipeline_Email_Result = {
  from: Worker_Pipeline_Email_ResultFrom;
  to: Worker_Pipeline_Email_ResultTo;
  subject: Worker_Pipeline_Email_ResultSubject;
  textBody: Worker_Pipeline_Email_ResultTextBody;
};

/**
 * Worker - Pipeline - Email - Extract Email Address.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Email_ExtractEmailAddress_Header = string;

export type Worker_Pipeline_Email_ExtractEmailAddress_Returns = string;

export type Worker_Pipeline_Email_ExtractEmailAddress_Match = RegExpMatchArray | null;

/**
 * Worker - Pipeline - Email - Extract From Multipart.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Email_ExtractFromMultipart_Body = string;

export type Worker_Pipeline_Email_ExtractFromMultipart_HeaderSection = string;

export type Worker_Pipeline_Email_ExtractFromMultipart_Returns_Text = string;

export type Worker_Pipeline_Email_ExtractFromMultipart_Returns_Html = string;

export type Worker_Pipeline_Email_ExtractFromMultipart_Returns = {
  text: Worker_Pipeline_Email_ExtractFromMultipart_Returns_Text;
  html: Worker_Pipeline_Email_ExtractFromMultipart_Returns_Html;
};

export type Worker_Pipeline_Email_ExtractFromMultipart_NestedBoundaryMatch = RegExpMatchArray | null;

export type Worker_Pipeline_Email_ExtractFromMultipart_NestedBoundary = string | undefined;

export type Worker_Pipeline_Email_ExtractFromMultipart_Text = string;

export type Worker_Pipeline_Email_ExtractFromMultipart_Html = string;

export type Worker_Pipeline_Email_ExtractFromMultipart_Parts = string[];

export type Worker_Pipeline_Email_ExtractFromMultipart_TrimmedPart = string;

export type Worker_Pipeline_Email_ExtractFromMultipart_Separator = string;

export type Worker_Pipeline_Email_ExtractFromMultipart_SeparatorIndex = number;

export type Worker_Pipeline_Email_ExtractFromMultipart_PartContentType = string;

export type Worker_Pipeline_Email_ExtractFromMultipart_PartBody = string;

/**
 * Worker - Pipeline - Email - Parse Email.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Email_ParseEmail_RawEmail = string;

export type Worker_Pipeline_Email_ParseEmail_Result_From = string;

export type Worker_Pipeline_Email_ParseEmail_Result_To = string;

export type Worker_Pipeline_Email_ParseEmail_Result_Subject = string;

export type Worker_Pipeline_Email_ParseEmail_Result_TextBody = string;

export type Worker_Pipeline_Email_ParseEmail_Result = {
  from: Worker_Pipeline_Email_ParseEmail_Result_From;
  to: Worker_Pipeline_Email_ParseEmail_Result_To;
  subject: Worker_Pipeline_Email_ParseEmail_Result_Subject;
  textBody: Worker_Pipeline_Email_ParseEmail_Result_TextBody;
};

export type Worker_Pipeline_Email_ParseEmail_Returns = Promise<Worker_Pipeline_Email_ParseEmail_Result>;

export type Worker_Pipeline_Email_ParseEmail_Separator = string;

export type Worker_Pipeline_Email_ParseEmail_HeaderSeparatorIndex = number;

export type Worker_Pipeline_Email_ParseEmail_HeaderSection = string;

export type Worker_Pipeline_Email_ParseEmail_BodySection = string;

export type Worker_Pipeline_Email_ParseEmail_UnfoldedHeaderSection = string;

export type Worker_Pipeline_Email_ParseEmail_HeaderLines = string[];

export type Worker_Pipeline_Email_ParseEmail_Headers = Map<string, string>;

export type Worker_Pipeline_Email_ParseEmail_ColonIndex = number;

export type Worker_Pipeline_Email_ParseEmail_Key = string;

export type Worker_Pipeline_Email_ParseEmail_Value = string;

export type Worker_Pipeline_Email_ParseEmail_From = string;

export type Worker_Pipeline_Email_ParseEmail_To = string;

export type Worker_Pipeline_Email_ParseEmail_Subject = string;

export type Worker_Pipeline_Email_ParseEmail_ContentType = string;

export type Worker_Pipeline_Email_ParseEmail_BoundaryMatch = RegExpMatchArray | null;

export type Worker_Pipeline_Email_ParseEmail_Boundary = string | undefined;

export type Worker_Pipeline_Email_ParseEmail_Parts = string[];

export type Worker_Pipeline_Email_ParseEmail_TextBody = string;

export type Worker_Pipeline_Email_ParseEmail_HtmlBody = string;

export type Worker_Pipeline_Email_ParseEmail_TrimmedPart = string;

export type Worker_Pipeline_Email_ParseEmail_PartSeparator = string;

export type Worker_Pipeline_Email_ParseEmail_PartHeaderSeparatorIndex = number;

export type Worker_Pipeline_Email_ParseEmail_PartContentType = string;

export type Worker_Pipeline_Email_ParseEmail_PartBody = string;

export type Worker_Pipeline_Email_ParseEmail_NestedPartHeaders = string;

export type Worker_Pipeline_Email_ParseEmail_NestedResult_Text = string;

export type Worker_Pipeline_Email_ParseEmail_NestedResult_Html = string;

export type Worker_Pipeline_Email_ParseEmail_NestedResult = {
  text: Worker_Pipeline_Email_ParseEmail_NestedResult_Text;
  html: Worker_Pipeline_Email_ParseEmail_NestedResult_Html;
};

export type Worker_Pipeline_Email_ParseEmail_StrippedBody = string;

export type Worker_Pipeline_Email_ParseEmail_HtmlTextBody = string;

export type Worker_Pipeline_Email_ParseEmail_EmbeddedBoundaryMatch = RegExpMatchArray | null;

export type Worker_Pipeline_Email_ParseEmail_EmbeddedBoundaryArg = string;

export type Worker_Pipeline_Email_ParseEmail_EmbeddedResult_Text = string;

export type Worker_Pipeline_Email_ParseEmail_EmbeddedResult_Html = string;

export type Worker_Pipeline_Email_ParseEmail_EmbeddedResult = {
  text: Worker_Pipeline_Email_ParseEmail_EmbeddedResult_Text;
  html: Worker_Pipeline_Email_ParseEmail_EmbeddedResult_Html;
};

export type Worker_Pipeline_Email_ParseEmail_EmbeddedHtmlStripped = string;

export type Worker_Pipeline_Email_ParseEmail_PlainTextBody = string;
