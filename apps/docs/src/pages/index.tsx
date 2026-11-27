import {
  BlogPreview,
  Canvas,
  Features,
  InstallStrip,
  Showcase,
  Spotlight,
  TerminalFrame,
} from '@cbnventures/docusaurus-preset-nova/blocks';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

import type {
  Pages_Index_FrameMarkers,
  Pages_Index_Home_Shots,
  Pages_Index_PromptMarkers,
  Pages_Index_TerminalLineTone_FirstCharacter,
  Pages_Index_TerminalLineTone_Line,
  Pages_Index_TerminalLineTone_Returns,
} from '../types/pages/index.d.ts';

/**
 * Pages - Prompt Markers.
 *
 * First characters that the prompts library prints before a question, a
 * selected choice, or an answered question, colored like a prompt.
 *
 * @since 0.11.0
 */
const promptMarkers: Pages_Index_PromptMarkers = [
  '❯',
  '?',
  '✔',
];

/**
 * Pages - Frame Markers.
 *
 * First characters of the CLI banner box and the wrangler divider, colored
 * as muted frame lines.
 *
 * @since 0.11.0
 */
const frameMarkers: Pages_Index_FrameMarkers = [
  '╭',
  '│',
  '╰',
  '─',
];

/**
 * Pages - Terminal Line Tone.
 *
 * Picks the color class for one line of captured CLI output, so the terminal
 * window reads like the real thing without an ANSI parser.
 *
 * @param {Pages_Index_TerminalLineTone_Line} line - Line.
 *
 * @returns {Pages_Index_TerminalLineTone_Returns}
 *
 * @since 0.11.0
 */
function terminalLineTone(line: Pages_Index_TerminalLineTone_Line): Pages_Index_TerminalLineTone_Returns {
  if (line.startsWith('INFO') === true) {
    return 'nova-terminal-frame-line-info';
  }

  const firstCharacter: Pages_Index_TerminalLineTone_FirstCharacter = line.slice(0, 1);

  if (promptMarkers.includes(firstCharacter) === true) {
    return 'nova-terminal-frame-line-prompt';
  }

  if (frameMarkers.includes(firstCharacter) === true) {
    return 'nova-terminal-frame-line-muted';
  }

  if (line.startsWith(' ⛅️') === true) {
    return 'nova-terminal-frame-line-muted';
  }

  if (line.endsWith(':') === true) {
    return 'nova-terminal-frame-line-heading';
  }

  return 'nova-terminal-frame-line-body';
}

/**
 * Pages - Home.
 *
 * Root landing page that composes the hero header, install strip, feature grid,
 * CLI showcase, and blog preview using theme components.
 *
 * @constructor
 *
 * @returns {JSX.Element}
 *
 * @since 0.11.0
 */
function Home() {
  const shots: Pages_Index_Home_Shots = [
    {
      key: 'contexts',
      label: 'Contexts',
      heading: 'One context for each sender',
      description: (
        <>
          Give every webhook or mailbox its own context with its own
          address, topic, and token or sender filter, so each source is
          kept apart and easy to turn off.
        </>
      ),
      linkTo: '/docs/getting-started/configuration/',
      linkLabel: 'Configure Contexts',
      alt: 'Adding a context from the Reverse Proxy for ntfy CLI',
      terminalTitle: 'ntfy — ntfy-reverse-proxy — 80×24',
      output: [
        '✔ What would you like to do? › Manage Contexts',
        '✔ Manage Contexts › Add',
        '? Context type: › - Use arrow-keys. Return to submit.',
        '❯   HTTP',
        '    Email',
      ].join('\n'),
    },
    {
      key: 'cli',
      label: 'CLI',
      heading: 'One menu for everything',
      description: (
        <>
          Add ntfy servers, set up contexts, change settings, and deploy
          from one guided menu, or run each step as a direct command with
          {' '}
          <code>npx ntfy-reverse-proxy</code>
          .
        </>
      ),
      linkTo: '/docs/reference/cli/',
      linkLabel: 'Read the CLI Reference',
      alt: 'The Reverse Proxy for ntfy interactive CLI menu',
      terminalTitle: 'ntfy — ntfy-reverse-proxy — 80×24',
      output: [
        '╭────────────────────────────────────────────────╮',
        '│             Reverse Proxy for ntfy             │',
        '│            A CBN Ventures Creation             │',
        '╰────────────────────────────────────────────────╯',
        '',
        '? What would you like to do? › - Use arrow-keys. Return to submit.',
        '❯   Manage Servers',
        '    Manage Contexts',
        '    Settings',
        '    Deploy',
        '    Exit',
      ].join('\n'),
    },
    {
      key: 'deploy',
      label: 'Deploy',
      heading: 'One command to deploy',
      description: (
        <>
          Deploy checks your API token, sets up the KV namespace, publishes
          the Worker, and wires up Email Routing for email contexts, then
          lists the address of every context.
        </>
      ),
      linkTo: '/docs/getting-started/deployment/',
      linkLabel: 'Deploy to Cloudflare',
      alt: 'A Reverse Proxy for ntfy deployment to Cloudflare Workers from the CLI',
      terminalTitle: 'ntfy — ntfy-reverse-proxy deploy — 80×32',
      output: [
        'INFO Checking authentication...',
        'INFO Authenticated.',
        'INFO Validating config...',
        'INFO Config is valid.',
        'INFO Verifying API token permissions...',
        'INFO Permissions verified.',
        'INFO Ensuring KV namespace...',
        'INFO KV namespace ready.',
        'INFO Generating wrangler.toml...',
        'INFO Generated "wrangler.toml".',
        'INFO Deploying worker...',
        ' ⛅️ wrangler',
        '────────────',
        'Uploaded ntfy-reverse-proxy',
        'INFO Worker deployed.',
        'INFO Setting up email routing...',
        'INFO Email routing: 1 created, 0 kept, 0 removed.',
        '',
        'Context reference:',
        '',
        '  GitHub Status',
        '    URL:   https://statuspage.example.com',
        '',
        '  Synology NAS',
        '    Email: synology@example.com',
        '    Allow: nas@example.net',
        '',
        'INFO Deploy complete.',
      ].join('\n'),
    },
  ];

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
              <Link className="nova-cta-primary" to="/docs/getting-started/quick-start/">Get Started</Link>
              <Link className="nova-cta-secondary" to="/docs/overview/">Learn More</Link>
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
                  <span className={styles['termExposed']}>tk_xxxx</span>
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
              description: 'Twelve parsers for Statuspage.io, Synology DSM, Seerr, pfSense, UniFi, Transmission VPN, pfSense Actions, Discord Stonker Bot, Outpost, Mailmask, plain text, and ntfy JSON. Raw payloads go in. Clean notifications come out.',
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
              description: 'Origin IP shielding, per-context token auth, sender filtering, HTTPS enforcement. Webhook senders never see your ntfy server\'s address.',
            },
          ]}
        />
        <Spotlight heading="A closer look" surface="alt">
          <Showcase
            tabsLabel="Reverse Proxy for ntfy features"
            items={shots.map((shot) => ({
              label: shot['label'],
              heading: shot['heading'],
              description: shot['description'],
              link: {
                label: shot['linkLabel'],
                to: shot['linkTo'],
              },
              content: (
                <TerminalFrame title={shot['terminalTitle']} label={shot['alt']}>
                  {shot['output'].split('\n').map((line, index) => (
                    <span key={`${shot['key']}-${String(index)}`} className={terminalLineTone(line)}>
                      {(line === '') ? ' ' : line}
                    </span>
                  ))}
                </TerminalFrame>
              ),
            }))}
          />
        </Spotlight>
        <BlogPreview
          heading="From the Blog"
          description="Launches, milestones, and what's new in Reverse Proxy for ntfy."
          auto={true}
          limit={3}
          sort="newest"
        />
      </main>
    </Layout>
  );
}

export default Home;
