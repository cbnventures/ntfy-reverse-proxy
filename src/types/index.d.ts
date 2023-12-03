/**
 * Fetch.
 *
 * @since 1.0.0
 */
export type FetchRequest = Request;

export type FetchEnv = unknown;

export type FetchReturns = Promise<Response>;

/**
 * Fetch request json.
 *
 * @since 1.0.0
 */
export type FetchRequestJsonRequest = Request;

export type FetchRequestJsonReturns = Promise<JSON | null>;

export type FetchRequestJsonJson = JSON;

/**
 * Send ntfy request.
 *
 * @since 1.0.0
 */
export type SendNtfyRequestContentTitle = string;

export type SendNtfyRequestContentDescription = string;

export type SendNtfyRequestContentContent = string;

export type SendNtfyRequestContentIp = string | null;

export type SendNtfyRequestContent = {
  title: SendNtfyRequestContentTitle;
  description: SendNtfyRequestContentDescription;
  content: SendNtfyRequestContentContent;
  ip: SendNtfyRequestContentIp;
};

export type SendNtfyRequestServer = string;

export type SendNtfyRequestTopic = string;

export type SendNtfyRequestToken = string;

export type SendNtfyRequestReturns = Promise<boolean>;