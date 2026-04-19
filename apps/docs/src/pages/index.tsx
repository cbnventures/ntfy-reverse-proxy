import {
  BlogPreview,
  Features,
  Hero,
  InstallStrip,
  Stats,
} from '@cbnventures/docusaurus-preset-nova/components';

import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

/**
 * Pages - Home.
 *
 * Root landing page that composes the hero header, install strip, feature grid,
 * stats, and blog preview using theme components.
 *
 * @constructor
 *
 * @since 0.11.0
 */
function Home() {
  return (
    <Layout description="Notification gateway on Cloudflare Workers that routes webhooks and emails to ntfy with automatic server failover">
      <Head>
        <title>Reverse Proxy for ntfy - Hide Your Server, Keep Your Webhooks</title>
      </Head>
      <Hero
        eyebrow="Notification Gateway"
        heading="Your server IP is in every webhook field."
        tagline="Every endpoint, every email forward, every service config pointing at your self-hosted server. Reverse Proxy for ntfy sits in front — your ntfy URL, topics, and tokens stay hidden, your notifications arrive clean, and your servers fail over automatically."
        ctaLabel="Read the Docs"
        ctaLink="/docs/overview/"
        secondaryCtaLabel="View on GitHub"
        secondaryCtaLink="https://github.com/cbnventures/ntfy-reverse-proxy"
      />
      <main>
        <InstallStrip command="npx ntfy-reverse-proxy" copyTarget="block" />
        <Features
          items={[
            {
              icon: 'lucide:cpu',
              title: 'Built-in Interpreters',
              description: 'Seven parsers for Statuspage.io, Synology DSM, Seerr, pfSense, UniFi, plain text, and ntfy JSON. Raw payloads go in. Clean notifications come out.',
            },
            {
              icon: 'lucide:shield-check',
              title: 'Server Failover',
              description: 'Define a primary ntfy server with ordered fallbacks. If the primary is down, the next one picks up. Send-once or send-all — your call.',
            },
            {
              icon: 'lucide:mail',
              title: 'Email Routing',
              description: 'Receive emails via Cloudflare Email Routing and convert them into push notifications. No inbox required.',
            },
            {
              icon: 'lucide:terminal',
              title: 'Interactive CLI',
              description: 'Add servers, create contexts, configure interpreters, and deploy — all through a terminal UI. No TOML. No hand-editing.',
            },
            {
              icon: 'lucide:scissors',
              title: 'Smart Splitting',
              description: 'Messages over 4,000 bytes are automatically split into numbered parts that fit within ntfy\'s message limits. Nothing gets truncated.',
            },
            {
              icon: 'lucide:lock',
              title: 'Edge Security',
              description: 'Origin IP shielding, per-context token auth, sender filtering, HTTPS enforcement. Your ntfy server stays off the public internet.',
            },
          ]}
        />
        <Stats
          heading="By the Numbers"
          items={[
            {
              value: '7',
              label: 'Built-in interpreters',
              color: 'primary',
            },
            {
              value: '2',
              label: 'Delivery modes',
              color: 'accent',
            },
            {
              value: '0',
              label: 'Manual config editing',
              color: 'primary',
            },
            {
              value: '∞',
              label: 'Server fallbacks per context',
              color: 'accent',
            },
          ]}
        />
        <BlogPreview
          heading="From the Relay Room"
          description="Release notes, integration guides, and the occasional deep dive."
          auto={true}
          limit={3}
        />
      </main>
    </Layout>
  );
}

export default Home;
