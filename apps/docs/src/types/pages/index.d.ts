import type { ReactNode } from 'react';

/**
 * Pages - Home - Shot.
 *
 * @since 0.11.0
 */
export type Pages_Index_Home_Shot_Key = string;

export type Pages_Index_Home_Shot_Label = string;

export type Pages_Index_Home_Shot_Heading = string;

export type Pages_Index_Home_Shot_Description = ReactNode;

export type Pages_Index_Home_Shot_LinkTo = string;

export type Pages_Index_Home_Shot_LinkLabel = string;

export type Pages_Index_Home_Shot_Alt = string;

export type Pages_Index_Home_Shot_TerminalTitle = string;

export type Pages_Index_Home_Shot_Output = string;

export type Pages_Index_Home_Shot = {
  key: Pages_Index_Home_Shot_Key;
  label: Pages_Index_Home_Shot_Label;
  heading: Pages_Index_Home_Shot_Heading;
  description: Pages_Index_Home_Shot_Description;
  linkTo: Pages_Index_Home_Shot_LinkTo;
  linkLabel: Pages_Index_Home_Shot_LinkLabel;
  alt: Pages_Index_Home_Shot_Alt;
  terminalTitle: Pages_Index_Home_Shot_TerminalTitle;
  output: Pages_Index_Home_Shot_Output;
};

/**
 * Pages - Terminal Line Tone.
 *
 * @since 0.11.0
 */
export type Pages_Index_TerminalLineTone_Line = string;

export type Pages_Index_TerminalLineTone_Returns = string;

export type Pages_Index_TerminalLineTone_FirstCharacter = string;

/**
 * Pages - Markers.
 *
 * @since 0.11.0
 */
export type Pages_Index_PromptMarkers = string[];

export type Pages_Index_FrameMarkers = string[];

/**
 * Pages - Home - Shots.
 *
 * @since 0.11.0
 */
export type Pages_Index_Home_Shots = Pages_Index_Home_Shot[];
