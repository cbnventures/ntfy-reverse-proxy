import {
  LIB_REGEX_AMPERSAND,
  LIB_REGEX_DOUBLE_QUOTE,
  LIB_REGEX_GREATER_THAN,
  LIB_REGEX_LESS_THAN,
  LIB_REGEX_SINGLE_QUOTE,
} from '../../lib/regex.js';

import type {
  WorkerLandingPageBase,
  WorkerLandingPageConfig,
  WorkerLandingPageContexts,
  WorkerLandingPageDebugSection,
  WorkerLandingPageEscapeHtmlReturns,
  WorkerLandingPageEscapeHtmlStr,
  WorkerLandingPageHtml,
  WorkerLandingPageMaskedConfig,
  WorkerLandingPageMaskedContexts,
  WorkerLandingPageMaskedJson,
  WorkerLandingPageMaskedServers,
  WorkerLandingPageResponse,
  WorkerLandingPageServers,
  WorkerLandingPageSettings,
} from '../../types/worker/landing/page.d.ts';

/**
 * Worker - Landing - Page - Escape HTML.
 *
 * Sanitizes user-controlled strings by replacing HTML-sensitive
 * characters with their entity equivalents to prevent XSS.
 *
 * @since 2.0.0
 */
function escapeHtml(str: WorkerLandingPageEscapeHtmlStr): WorkerLandingPageEscapeHtmlReturns {
  return str
    .replace(new RegExp(LIB_REGEX_AMPERSAND, 'g'), '&amp;')
    .replace(new RegExp(LIB_REGEX_LESS_THAN, 'g'), '&lt;')
    .replace(new RegExp(LIB_REGEX_GREATER_THAN, 'g'), '&gt;')
    .replace(new RegExp(LIB_REGEX_DOUBLE_QUOTE, 'g'), '&quot;')
    .replace(new RegExp(LIB_REGEX_SINGLE_QUOTE, 'g'), '&#39;');
}

/**
 * Worker - Landing - Page.
 *
 * Renders the HTML landing page shown when a GET request
 * arrives at the reverse proxy root endpoint.
 *
 * @since 2.0.0
 */
function landingPage(config: WorkerLandingPageConfig): WorkerLandingPageResponse {
  const settings: WorkerLandingPageSettings = config['settings'];
  const servers: WorkerLandingPageServers = config['servers'];
  const contexts: WorkerLandingPageContexts = config['contexts'];

  let debugSection: WorkerLandingPageDebugSection = '';

  if (settings['show_response_output'] === true) {
    const maskedServers: WorkerLandingPageMaskedServers = servers.map((server) => ({
      name: server['name'],
      server: '***',
      token: '***',
    }));

    const maskedContexts: WorkerLandingPageMaskedContexts = contexts.map((context) => {
      const base: WorkerLandingPageBase = {
        id: '***',
        name: context['name'],
        type: context['type'],
        interpreter: context['interpreter'],
        topic: '***',
        ...(context['error_topic'] !== undefined ? { error_topic: '***' } : {}),
        mode: context['mode'],
        show_visitor_info: context['show_visitor_info'],
        primary_server: context['primary_server'],
        servers: context['servers'],
      };

      if (context['type'] === 'http') {
        return {
          ...base,
          ...(context['token'] !== undefined ? { token: '***' } : {}),
        };
      }

      return {
        ...base,
        ...(context['allowed_from'] !== undefined ? { allowed_from: '***' } : {}),
      };
    });

    const maskedConfig: WorkerLandingPageMaskedConfig = {
      settings: {
        ...settings,
        base_domain: '***',
      },
      servers: maskedServers,
      contexts: maskedContexts,
    };

    const maskedJsonRaw: WorkerLandingPageMaskedJson = JSON.stringify(maskedConfig, null, 2);
    const maskedJson: WorkerLandingPageMaskedJson = escapeHtml(maskedJsonRaw);

    debugSection = [
      '',
      '    <details>',
      '      <summary>Debug Info</summary>',
      `      <pre><code>${maskedJson}</code></pre>`,
      '    </details>',
    ].join('\n');
  }

  const html: WorkerLandingPageHtml = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '  <title>Reverse Proxy for ntfy</title>',
    '  <link rel="preconnect" href="https://fonts.googleapis.com" />',
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
    '  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />',
    '  <style>',
    '    :root {',
    '      --bg: #0c0c0f;',
    '      --surface: #16161a;',
    '      --surface-hover: #1c1c22;',
    '      --border: #2a2a32;',
    '      --text: #e8e8ed;',
    '      --text-muted: #7a7a85;',
    '      --accent: #6ee7b7;',
    '      --accent-dim: rgba(110, 231, 183, 0.08);',
    '    }',
    '',
    '    * { margin: 0; padding: 0; box-sizing: border-box; }',
    '',
    '    body {',
    '      background: var(--bg);',
    '      color: var(--text);',
    '      font-family: \'DM Sans\', sans-serif;',
    '      font-weight: 300;',
    '      min-height: 100vh;',
    '      display: flex;',
    '      align-items: center;',
    '      justify-content: center;',
    '      padding: 2rem;',
    '      -webkit-font-smoothing: antialiased;',
    '    }',
    '',
    '    .card {',
    '      background: var(--surface);',
    '      border: 1px solid var(--border);',
    '      border-radius: 16px;',
    '      padding: 3rem;',
    '      max-width: 520px;',
    '      width: 100%;',
    '      animation: fadeUp 0.6s ease-out both;',
    '    }',
    '',
    '    @keyframes fadeUp {',
    '      from { opacity: 0; transform: translateY(12px); }',
    '      to { opacity: 1; transform: translateY(0); }',
    '    }',
    '',
    '    .badge {',
    '      display: inline-flex;',
    '      align-items: center;',
    '      gap: 6px;',
    '      background: var(--accent-dim);',
    '      border: 1px solid rgba(110, 231, 183, 0.15);',
    '      border-radius: 100px;',
    '      padding: 5px 14px;',
    '      font-size: 0.75rem;',
    '      font-weight: 500;',
    '      color: var(--accent);',
    '      letter-spacing: 0.02em;',
    '      margin-bottom: 1.5rem;',
    '    }',
    '',
    '    .badge-dot {',
    '      width: 6px;',
    '      height: 6px;',
    '      background: var(--accent);',
    '      border-radius: 50%;',
    '      animation: pulse 2s ease-in-out infinite;',
    '    }',
    '',
    '    @keyframes pulse {',
    '      0%, 100% { opacity: 1; }',
    '      50% { opacity: 0.4; }',
    '    }',
    '',
    '    h1 {',
    '      font-size: 1.75rem;',
    '      font-weight: 500;',
    '      letter-spacing: -0.025em;',
    '      line-height: 1.2;',
    '      margin-bottom: 0.75rem;',
    '    }',
    '',
    '    .subtitle {',
    '      color: var(--text-muted);',
    '      font-size: 0.95rem;',
    '      line-height: 1.6;',
    '      margin-bottom: 2rem;',
    '    }',
    '',
    '    .link {',
    '      display: inline-flex;',
    '      align-items: center;',
    '      gap: 8px;',
    '      color: var(--text);',
    '      text-decoration: none;',
    '      font-size: 0.875rem;',
    '      font-weight: 500;',
    '      padding: 10px 20px;',
    '      border: 1px solid var(--border);',
    '      border-radius: 10px;',
    '      transition: all 0.2s ease;',
    '    }',
    '',
    '    .link:hover {',
    '      background: var(--surface-hover);',
    '      border-color: var(--accent);',
    '      color: var(--accent);',
    '    }',
    '',
    '    .link svg {',
    '      width: 16px;',
    '      height: 16px;',
    '      fill: currentColor;',
    '    }',
    '',
    '    details {',
    '      margin-top: 2rem;',
    '      border-top: 1px solid var(--border);',
    '      padding-top: 1.5rem;',
    '      animation: fadeUp 0.6s ease-out 0.15s both;',
    '    }',
    '',
    '    summary {',
    '      cursor: pointer;',
    '      font-size: 0.8rem;',
    '      font-weight: 500;',
    '      color: var(--text-muted);',
    '      letter-spacing: 0.05em;',
    '      text-transform: uppercase;',
    '      list-style: none;',
    '      display: flex;',
    '      align-items: center;',
    '      gap: 8px;',
    '      transition: color 0.2s ease;',
    '    }',
    '',
    '    summary:hover { color: var(--text); }',
    '    summary::-webkit-details-marker { display: none; }',
    '',
    '    summary::before {',
    '      content: \'\';',
    '      width: 5px;',
    '      height: 5px;',
    '      border-right: 1.5px solid currentColor;',
    '      border-bottom: 1.5px solid currentColor;',
    '      transform: rotate(-45deg);',
    '      transition: transform 0.2s ease;',
    '    }',
    '',
    '    details[open] summary::before {',
    '      transform: rotate(45deg);',
    '    }',
    '',
    '    pre {',
    '      background: var(--bg);',
    '      border: 1px solid var(--border);',
    '      border-radius: 10px;',
    '      padding: 1.25rem;',
    '      margin-top: 1rem;',
    '      overflow-x: auto;',
    '      font-family: \'JetBrains Mono\', monospace;',
    '      font-size: 0.75rem;',
    '      line-height: 1.7;',
    '      color: var(--text-muted);',
    '      tab-size: 2;',
    '    }',
    '',
    '    code { font-family: inherit; }',
    '  </style>',
    '</head>',
    '<body>',
    '  <div class="card">',
    '    <div class="badge"><span class="badge-dot"></span>Operational</div>',
    '    <h1>Reverse Proxy for ntfy</h1>',
    '    <p class="subtitle">A reverse proxy for ntfy running on Cloudflare Workers. Route webhooks and emails with built-in interpreters and server failover.</p>',
    '    <a class="link" href="https://github.com/cbnventures/ntfy-reverse-proxy" target="_blank" rel="noopener">',
    '      <svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
    '      View on GitHub',
    `    </a>${debugSection}`,
    '  </div>',
    '</body>',
    '</html>',
  ].join('\n');

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

export {
  landingPage,
};
