Reverse Proxy for ntfy
=======================

[![GitHub Releases](https://img.shields.io/github/v/release/cbnventures/ntfy-reverse-proxy?style=for-the-badge&logo=github&logoColor=%23ffffff&color=%23b25da6)](https://github.com/cbnventures/ntfy-reverse-proxy/releases)
[![GitHub Top Languages](https://img.shields.io/github/languages/top/cbnventures/ntfy-reverse-proxy?style=for-the-badge&logo=typescript&logoColor=%23ffffff&color=%236688c3)](https://github.com/cbnventures/ntfy-reverse-proxy)
[![GitHub License](https://img.shields.io/github/license/cbnventures/ntfy-reverse-proxy?style=for-the-badge&logo=googledocs&logoColor=%23ffffff&color=%2348a56a)](https://github.com/cbnventures/ntfy-reverse-proxy/blob/main/LICENSE)
[![Become a GitHub Sponsor](https://img.shields.io/badge/github-sponsor-gray?style=for-the-badge&logo=githubsponsors&logoColor=%23ffffff&color=%23eaaf41)](https://github.com/sponsors/cbnventures)
[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-gray?style=for-the-badge&logo=paypal&logoColor=%23ffffff&color=%23ce4a4a)](https://www.cbnventures.io/paypal/)

Receive push notifications on one or more [ntfy](https://ntfy.sh) server instances, ensuring redundancy and synchronized communications, all fortified with the added security layer provided by Cloudflare.

To use this reverse proxy, here are some steps to follow:
1. Run `npm install` inside the project directory.
2. Rename the `wrangler-sample.toml` file to `wrangler.toml`.
3. Read these [instructions](#configuration) to customize the proxy.
4. Run `npm run authorize` to authorize your Cloudflare connection.
5. Finally, run `npm run deploy` to deploy your changes.

## Configuration
Here is an example of how the `wrangler.toml` file for this reverse proxy should be configured:
```toml
name = "ntfy-reverse-proxy"
main = "src/index.ts"
compatibility_date = "2023-11-21"

############
## Routes ##
############
routes = [
  { pattern = "abcde.ntfy.example.com", custom_domain = true },
  { pattern = "12345.ntfy.example.com", custom_domain = true },
]

#####################
## Vars: Countries ##
#####################
[vars.countries]
mode = "allow"
list = [
  "US",
  "CA",
]

########################
## Vars: IP addresses ##
########################
[vars.ip_addresses]
mode = "disallow"
list = [
  "127.0.0.1",
  "::1",
]

###################
## Vars: Servers ##
###################
[vars.servers]
mode = "send-once"
list = [
  { subdomain = "abcde", topic = "topic-1", server = "https://server-1-ntfy.sh", token = "tk_m61tag95tx" },
  { subdomain = "abcde", topic = "topic-1", server = "https://server-2-ntfy.sh", token = "tk_mdo4e750xv" },
  { subdomain = "12345", topic = "topic-2", server = "https://server-1-ntfy.sh", token = "tk_3m6p0o830s" },
  { subdomain = "12345", topic = "topic-2", server = "https://server-2-ntfy.sh", token = "tk_ecpoh2t79b" },
]

####################
## Vars: Settings ##
####################
[vars.settings]
force_https = true
show_response_output = true
show_visitor_info = true

#######################
## Vars: User agents ##
#######################
[vars.user_agents]
mode = "allow"
list = [
  "custom-user-agent",
]
```

## Sending Messages to the Proxy
To route messages through the proxy back to your local ntfy servers, initiate a `POST` or `PUT` request with the specified configuration. Please note that sending via the `GET` method or using a JSON body is not supported. Here's an example using the [default configuration](#configuration) shown above:

```http request
POST https://abcde.ntfy.example.com
User-Agent: custom-user-agent

body - can be plain text or a binary file
```

This request will succeed only if the user is within the United States (`US`) or Canada (`CA`), does not match the IP addresses `127.0.0.1` or `::1`, and the user agent is set to `custom-user-agent`. If these conditions are not met, the request will fail. Learn how to configure this by reading the [Limit Visitor Access](#limit-visitor-access) section.

Additionally, be mindful of the limits imposed by [Cloudflare](https://developers.cloudflare.com/workers/platform/limits/#request-limits), which are subject to your account's plan.

## Supported Headers
The proxy seamlessly integrates with the following headers. These headers, each serving a specific purpose, will be forwarded to the ntfy servers when making requests. For in-depth configuration instructions, consult the ntfy documentation using the links provided below:

| Headers (A to C)                                                 | Headers (C to D)                                            | Headers (E to F)                                              | Headers (I to P)                                                | Headers (T to U)                                           |
|------------------------------------------------------------------|-------------------------------------------------------------|---------------------------------------------------------------|-----------------------------------------------------------------|------------------------------------------------------------|
| [X-Actions](https://docs.ntfy.sh/publish/#using-a-header)        | [X-Call](https://docs.ntfy.sh/publish/#phone-calls)         | [X-Email](https://docs.ntfy.sh/publish/#e-mail-notifications) | [X-Icon](https://docs.ntfy.sh/publish/#icons)                   | [X-Tags](https://docs.ntfy.sh/publish/#tags-emojis)        |
| [X-Attach](https://docs.ntfy.sh/publish/#attach-file-from-a-url) | [X-Click](https://docs.ntfy.sh/publish/#click-action)       | [X-Filename](https://docs.ntfy.sh/publish/#attach-local-file) | [X-Markdown](https://docs.ntfy.sh/publish/#markdown-formatting) | [X-Title](https://docs.ntfy.sh/publish/#message-title)     |
| [X-Cache](https://docs.ntfy.sh/publish/#message-caching)         | [X-Delay](https://docs.ntfy.sh/publish/#scheduled-delivery) | [X-Firebase](https://docs.ntfy.sh/publish/#disable-firebase)  | [X-Priority](https://docs.ntfy.sh/publish/#message-priority)    | [X-UnifiedPush](https://docs.ntfy.sh/publish/#unifiedpush) |

__Important:__ If the `show_visitor_info` setting is set to `false` and you attempt to send a request that includes both the `X-Attach` header and a binary file in the body (like a JPEG image), an error will occur. Please be aware that this is considered a user error, not an implementation bug.

## Configuration for Your Local Servers
For optimal functionality, ensure that each ntfy server is defined with a `base-url`, the `behind-proxy` setting is set to `true`. Additionally, set the `attachment-cache-dir` even if you do not intend to send attachments (due to the maximum message size limit of 4,096 bytes).

If you would like to enforce text-only requests, customize the `attachment-file-size-limit` to a smaller value of [your preference](https://docs.ntfy.sh/config/?h=attachments#attachments). This ensures that any file exceeding this limit will fail to send.

For your convenience, you may also refer to the default [server.yml](https://github.com/binwiederhier/ntfy/blob/main/server/server.yml) configuration, the [ntfy Publishing](https://docs.ntfy.sh/publish/) documentation, and the [ntfy Self-hosting Configuration](https://docs.ntfy.sh/config/) documentation.

## Specify Local Servers
To specify a destination ntfy server, use the following settings:

- To send a single message to the first server with a success response, set `mode` to `"send-once"`.
- To send a single message to all matched servers, set `mode` to `"send-all"`.

You have the flexibility to define multiple servers for redundancy or opt for a single ntfy server. For a server to match, the URL should begin with the `subdomain` listed in the `servers` list. For example:

A URL with `abcde.ntfy.example.com` would match servers that have the `abcde` in the `subdomain` value:
```json
[
  {
    "subdomain": "abcde",
    "topic": "topic-1",
    "server": "https://server-1-ntfy.sh",
    "token": "tk_m61tag95tx"
  },
  {
    "subdomain": "abcde",
    "topic": "topic-1",
    "server": "https://server-2-ntfy.sh",
    "token": "tk_mdo4e750xv"
  }
]
```

A URL with `12345.ntfy.example.com` would match servers that have the `12345` in the `subdomain` value:
```json
[
  {
    "subdomain": "12345",
    "topic": "topic-2",
    "server": "https://server-1-ntfy.sh",
    "token": "tk_3m6p0o830s"
  },
  {
    "subdomain": "12345",
    "topic": "topic-2",
    "server": "https://server-2-ntfy.sh",
    "token": "tk_ecpoh2t79b"
  }
]
```

__Important:__ Do not forget to set the `routes` in the `wrangler.toml` configuration as well. This will help automate the creation of the subdomain when deploying the proxy to Cloudflare.

__Note:__ Only token authentication is supported. You may create tokens using the [ntfy command line](https://docs.ntfy.sh/config/?h=token#access-tokens).

## Limit Visitor Access
To control access, you can specify which countries, IP addresses, or user agents are allowed to pass traffic to your local ntfy servers:

- To permit __only__ traffic specified in the list, set `mode` to `"allow"`.
- To restrict __only__ traffic specified in the list, set `mode` to `"disallow"`.
- To disable the setting entirely, set `mode` to `"disabled"`.

Proceed to configure the list based on your preferences. Using the `countries` setting as an example, this would allow __only__ the countries specified:
```toml
[vars.countries]
mode = "allow"
list = [
  "US",
  "CA",
]
```

Keep in mind that you can only specify a single mode for each setting (e.g. `countries` is one setting, `user_agents` is another setting). __You cannot allow and disallow at the same time.__

## Additional Settings
The proxy offers additional settings that might be of interest to you. Here are the available settings:

- To enforce HTTPS, set the `force_https` setting to `true`.
- To display response output, set the `show_response_output` to `true`.
- To reveal visitor information, set the `show_visitor_info` to `true`.

By default, the `show_response_output` setting is set to `true` to assist with initial setup, but please __exercise caution__ as this setting is designed _primarily for debugging purposes_. It is recommended to set this to `false` to avoid exposing excessive information that could compromise the proxy's protections.

When the `show_visitor_info` is set to `true`, a section called __« Incoming Request Details »__ will appear. This section shows the user's IP address, location (region, country, and colo code¹), approximate GPS coordinates, and Internet Service Provider (ISP) details (provider name and ASN).

¹ A colo code is a code used to mark Cloudflare data center locations.

## Show Visitor Info when Sending Attachments
If the `show_visitor_info` is set to `true` and you send a binary file, you will receive two messages on every matched server for each request.

For instance, if you send one attachment, set the servers `mode` to `send-all`, and have two ntfy servers, you will receive four messages in total. One message shows visitor information, and the second message is reserved solely for the binary file. Both messages are duplicated for each matched server.

Customizations made using headers will not be reflected in the second message to prevent intentional duplication of message content and preferences.

This ensures that, for example, you do not receive repeated calls (if the `X-Call` header is set) or multiple long vibration bursts (if the `X-Priority` header is set to `5`).

## Configuration for Cloudflare
After deploying the proxy, make sure to create a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to match the user agents or subdomains specified in the `wrangler.toml` file, disable "Browser Integrity Check", and set the "Security Level" to "Essentially Off" to prevent legitimate traffic (e.g. APIs) from being mistakenly flagged with a 403 response.

A domain name is also required. You can conveniently [register domains](https://www.cloudflare.com/products/registrar/) within Cloudflare at cost, without markup fees as seen with other domain registrars.

__Important:__ Routes are not supported when `custom_domain` is set to `false`. This is because the proxy matches the subdomain of the pattern URL (e.g. `abcde.ntfy.example.com`) with the subdomain value (e.g. `abcde`) on the servers list in your `wrangler.toml` file.

## Credits and Appreciation
If you find value in the ongoing development of this proxy and wish to express your appreciation, you have the option to become our supporter on [GitHub Sponsors](https://github.com/sponsors/cbnventures) or make a one-time donation through [PayPal](https://www.cbnventures.io/paypal/).
