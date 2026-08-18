import {
  BlogPreview,
  Canvas,
  Features,
  InstallStrip,
  Stats,
} from '@cbnventures/docusaurus-preset-nova/blocks';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

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
      <Canvas container="full" className={styles['hero']}>
        <div className={styles['heroInner']}>
          <div className={styles['heroContent']}>
            <p className="nova-hero-eyebrow">Notification Gateway</p>
            <Heading as="h1" className={`nova-hero-heading ${styles['heroHeading']}`}>
              Your server IP is in every webhook field.
            </Heading>
            <p className="nova-hero-tagline">
              Every endpoint, every email forward, every service config &mdash; all pointing at your server. Reverse Proxy for ntfy sits in front so your URL, topics, and tokens stay hidden, and your servers fail over automatically.
            </p>
            <div className={`nova-hero-actions ${styles['heroActions']}`}>
              <Link className="nova-cta-primary" to="/docs/overview/">Read the Docs</Link>
              <Link className="nova-cta-secondary" to="https://github.com/cbnventures/ntfy-reverse-proxy">View on GitHub</Link>
            </div>
          </div>
          <div className={styles['termWrap']} aria-hidden="true">
            <div className={styles['term']}>
              <div className={styles['termBar']}>
                <span className={`${styles['termDot']} ${styles['termDotRed']}`} />
                <span className={`${styles['termDot']} ${styles['termDotYellow']}`} />
                <span className={`${styles['termDot']} ${styles['termDotGreen']}`} />
                <span className={styles['termTitle']}>webhook config</span>
              </div>
              <div className={styles['termBody']}>
                <span className={styles['termLine']}><span className={styles['termDim']}># Before &mdash; your IP is exposed</span></span>
                <span className={styles['termLine']}>
                  POST
                  <span className={styles['termExposed']}>https://192.168.1.50:8443</span>
                  /publish
                </span>
                <span className={styles['termLine']}>
                  Authorization: Bearer
                  <span className={styles['termExposed']}>ntfy_sk_xxxx</span>
                </span>
                <span className={styles['termLine']}>&nbsp;</span>
                <span className={styles['termLine']}><span className={styles['termDim']}># After &mdash; proxied through nrp</span></span>
                <span className={styles['termLine']}>
                  POST
                  <span className={styles['termSafe']}>https://notify.example.com</span>
                  /publish
                </span>
                <span className={styles['termLine']}>
                  Authorization: Bearer
                  <span className={styles['termNew']}>ctx_public_token</span>
                </span>
                <span className={styles['termLine']}>&nbsp;</span>
                <span className={styles['termLine']}>
                  <span className={styles['termSafe']}>&#10003;</span>
                  {' '}
                  IP shielded &nbsp;
                  <span className={styles['termSafe']}>&#10003;</span>
                  {' '}
                  Token rotated &nbsp;
                  <span className={styles['termSafe']}>&#10003;</span>
                  {' '}
                  Failover ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </Canvas>
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
