Reverse Proxy for ntfy
=======================

[![GitHub Releases](https://img.shields.io/github/v/release/cbnventures/ntfy-reverse-proxy?style=flat-square&color=blue&sort=semver)](https://github.com/cbnventures/ntfy-reverse-proxy/releases)
[![GitHub Top Languages](https://img.shields.io/github/languages/top/cbnventures/ntfy-reverse-proxy?style=flat-square&color=success)](https://github.com/cbnventures/ntfy-reverse-proxy)
[![GitHub License](https://img.shields.io/github/license/cbnventures/ntfy-reverse-proxy?style=flat-square&color=yellow)](https://github.com/cbnventures/ntfy-reverse-proxy/blob/master/LICENSE)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-black?style=flat-square&color=blue)](https://www.cbnventures.io/paypal/)

Receive push notifications on your local Ntfy server through Cloudflare Workers, ensuring seamless delivery while shielding your server's location with the added security of Cloudflare's backbone.

To use this reverse proxy, here are some steps to follow:
1. Run `npm install` inside the project directory.
2. Rename the `wrangler-sample.toml` file to `wrangler.toml`.
3. Read these [instructions](#configuration) to customize the proxy.
4. Run `npm authorize` to authorize your Cloudflare connection.
5. Finally, run `npm deploy` to deploy your changes.

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
mode = "disallow"
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
show_response_output = false
show_visitor_info = true

#######################
## Vars: User agents ##
#######################
[vars.user_agents]
mode = "disallow"
list = [
  "user-agent",
]
```

## Sending Messages to the Proxy

## Configuration for Your Local Servers
must be set to proxy, attachments enabled (used for ultra long messages), and some recommended optimizations

## Specify Local Servers
topics routed based on subdomain (in custom domain cf setting). backup servers supported.

## Limit Visitor Access
countries
ip addresses
User agent

!! mention you may track the incoming request based on cf properties
!! mention security through obscurity
