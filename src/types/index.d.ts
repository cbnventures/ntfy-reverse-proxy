/**
 * Fetch.
 *
 * @since 1.0.0
 */
export type FetchRequest = Request;

export type FetchEnv = unknown;

export type FetchReturns = Promise<Response>;

/**
 * Send ntfy alert.
 *
 * @since 1.0.0
 */
export type SendNtfyAlertContent = string;

export type SendNtfyAlertServer = string;

export type SendNtfyAlertTopic = string;

export type SendNtfyAlertToken = string;

export type SendNtfyAlertReturns = Promise<boolean>;

/**
 * Send ntfy request.
 *
 * @since 1.0.0
 */
export type SendNtfyRequestContentTitle = string;

export type SendNtfyRequestContentDescription = string;

export type SendNtfyRequestContentContent = string;

export type SendNtfyRequestContent = {
  title: SendNtfyRequestContentTitle;
  description: SendNtfyRequestContentDescription;
  content: SendNtfyRequestContentContent;
};

export type SendNtfyRequestServer = string;

export type SendNtfyRequestTopic = string;

export type SendNtfyRequestToken = string;

export type SendNtfyRequestReturns = Promise<boolean>;
