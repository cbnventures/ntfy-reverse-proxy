import {
  LIB_REGEX_AMPERSAND,
  LIB_REGEX_DOUBLE_QUOTE,
  LIB_REGEX_GREATER_THAN,
  LIB_REGEX_LESS_THAN,
  LIB_REGEX_SINGLE_QUOTE,
} from '../../lib/regex.js';

import type {
  Worker_Landing_Page_Config,
  Worker_Landing_Page_EscapeHtml_Returns,
  Worker_Landing_Page_EscapeHtml_Str,
  Worker_Landing_Page_LandingPage_Base,
  Worker_Landing_Page_LandingPage_Contexts,
  Worker_Landing_Page_LandingPage_DebugSection,
  Worker_Landing_Page_LandingPage_Html,
  Worker_Landing_Page_LandingPage_MaskedConfig,
  Worker_Landing_Page_LandingPage_MaskedContexts,
  Worker_Landing_Page_LandingPage_MaskedJson,
  Worker_Landing_Page_LandingPage_MaskedJsonRaw,
  Worker_Landing_Page_LandingPage_MaskedServers,
  Worker_Landing_Page_LandingPage_Returns,
  Worker_Landing_Page_LandingPage_Servers,
  Worker_Landing_Page_LandingPage_Settings,
} from '../../types/worker/landing/page.d.ts';

/**
 * Worker - Landing - Page - Escape HTML.
 *
 * Sanitizes user-controlled strings by replacing HTML-sensitive
 * characters with their entity equivalents to prevent XSS.
 *
 * @param {Worker_Landing_Page_EscapeHtml_Str} str - Str.
 *
 * @returns {Worker_Landing_Page_EscapeHtml_Returns}
 *
 * @since 2.0.0
 */
function escapeHtml(str: Worker_Landing_Page_EscapeHtml_Str): Worker_Landing_Page_EscapeHtml_Returns {
  return str
    .replace(new RegExp(LIB_REGEX_AMPERSAND, 'g'), '&amp;')
    .replace(new RegExp(LIB_REGEX_LESS_THAN, 'g'), '&lt;')
    .replace(new RegExp(LIB_REGEX_GREATER_THAN, 'g'), '&gt;')
    .replace(new RegExp(LIB_REGEX_DOUBLE_QUOTE, 'g'), '&quot;')
    .replace(new RegExp(LIB_REGEX_SINGLE_QUOTE, 'g'), '&#39;');
}

/**
 * Worker - Landing - Page - Landing Page.
 *
 * Renders the HTML landing page shown when a GET request
 * arrives at the reverse proxy root endpoint.
 *
 * @param {Worker_Landing_Page_Config} config - Config.
 *
 * @returns {Worker_Landing_Page_LandingPage_Returns}
 *
 * @since 2.0.0
 */
function landingPage(config: Worker_Landing_Page_Config): Worker_Landing_Page_LandingPage_Returns {
  const settings: Worker_Landing_Page_LandingPage_Settings = config['settings'];
  const servers: Worker_Landing_Page_LandingPage_Servers = config['servers'];
  const contexts: Worker_Landing_Page_LandingPage_Contexts = config['contexts'];

  let debugSection: Worker_Landing_Page_LandingPage_DebugSection = '';

  if (settings['show_response_output'] === true) {
    const maskedServers: Worker_Landing_Page_LandingPage_MaskedServers = servers.map((server) => ({
      name: server['name'],
      server: '***',
      token: '***',
    }));

    const maskedContexts: Worker_Landing_Page_LandingPage_MaskedContexts = contexts.map((context) => {
      const base: Worker_Landing_Page_LandingPage_Base = {
        id: '***',
        name: context['name'],
        type: context['type'],
        interpreter: context['interpreter'],
        topic: '***',
        ...((context['error_topic'] !== undefined) ? { error_topic: '***' } : {}),
        ...((context['error_events'] !== undefined) ? { error_events: context['error_events'] } : {}),
        mode: context['mode'],
        show_visitor_info: context['show_visitor_info'],
        primary_server: context['primary_server'],
        servers: context['servers'],
      };

      if (context['type'] === 'http') {
        return {
          ...base,
          ...((context['token'] !== undefined) ? { token: '***' } : {}),
          ...((context['session'] !== undefined) ? { session: '***' } : {}),
        };
      }

      return {
        ...base,
        ...((context['allowed_from'] !== undefined) ? { allowed_from: '***' } : {}),
      };
    });

    const maskedConfig: Worker_Landing_Page_LandingPage_MaskedConfig = {
      settings: {
        ...settings,
        base_domain: '***',
      },
      servers: maskedServers,
      contexts: maskedContexts,
    };

    const maskedJsonRaw: Worker_Landing_Page_LandingPage_MaskedJsonRaw = JSON.stringify(maskedConfig, null, 2);
    const maskedJson: Worker_Landing_Page_LandingPage_MaskedJson = escapeHtml(maskedJsonRaw);

    debugSection = [
      '',
      '    <details>',
      '      <summary>Debug Info</summary>',
      `      <pre><code>${maskedJson}</code></pre>`,
      '    </details>',
    ].join('\n');
  }

  const html: Worker_Landing_Page_LandingPage_Html = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <title>Reverse Proxy for ntfy</title>',
    '  <style>',
    '    :root {',
    '      --background: #0f1a19;',
    '      --primary: #0d9488;',
    '      --secondary: #d97706;',
    '      --accent: #14b8a6;',
    '      --accent-text: #042f2e;',
    '      --text: #f6f3ff;',
    '      --text-muted: #cfc9e6;',
    '      --text-subtle: #9a93b8;',
    '    }',
    '',
    '    *, *::before, *::after { box-sizing: border-box; }',
    '',
    '    body {',
    '      margin: 0;',
    '      background:',
    '        radial-gradient(circle at 15% 10%, rgba(13, 148, 136, 0.32), transparent 45%),',
    '        radial-gradient(circle at 85% 90%, rgba(217, 119, 6, 0.2), transparent 40%),',
    '        var(--background);',
    '      color: var(--text);',
    '      font-family: system-ui, -apple-system, \'Segoe UI\', sans-serif;',
    '      min-height: 100dvh;',
    '      display: grid;',
    '      place-items: center;',
    '      padding: 1rem;',
    '      -webkit-font-smoothing: antialiased;',
    '    }',
    '',
    '    .card {',
    '      width: 100%;',
    '      max-width: 28rem;',
    '      display: flex;',
    '      flex-direction: column;',
    '      align-items: center;',
    '      text-align: center;',
    '      padding: 2.25rem 1.5rem 1.25rem;',
    '      background: rgba(255, 255, 255, 0.05);',
    '      border: 1px solid rgba(255, 255, 255, 0.12);',
    '      border-radius: 24px;',
    '      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);',
    '    }',
    '',
    '    .logo {',
    '      width: 80px;',
    '      height: 80px;',
    '      border-radius: 20px;',
    '      margin-bottom: 1.25rem;',
    '      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);',
    '    }',
    '',
    '    h1 {',
    '      margin: 0;',
    '      font-size: 1.75rem;',
    '      line-height: 1.2;',
    '      letter-spacing: -0.4px;',
    '    }',
    '',
    '    .description {',
    '      margin: 0.6rem 0 0;',
    '      color: var(--text-muted);',
    '      font-size: 1rem;',
    '      line-height: 1.5;',
    '    }',
    '',
    '    .status {',
    '      margin-top: 1.1rem;',
    '      display: inline-flex;',
    '      align-items: center;',
    '      gap: 8px;',
    '      padding: 5px 12px;',
    '      border-radius: 999px;',
    '      font-size: 13px;',
    '      font-weight: 600;',
    '      background: rgba(255, 255, 255, 0.08);',
    '      border: 1px solid rgba(255, 255, 255, 0.14);',
    '    }',
    '',
    '    .status-dot {',
    '      width: 8px;',
    '      height: 8px;',
    '      border-radius: 50%;',
    '      background: #34d399;',
    '      box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);',
    '    }',
    '',
    '    .actions {',
    '      display: flex;',
    '      flex-wrap: wrap;',
    '      gap: 10px;',
    '      justify-content: center;',
    '      margin-top: 1.4rem;',
    '    }',
    '',
    '    .button {',
    '      display: inline-flex;',
    '      align-items: center;',
    '      justify-content: center;',
    '      gap: 8px;',
    '      max-width: 100%;',
    '      padding: 0.65rem 1.25rem;',
    '      border-radius: 999px;',
    '      border: 1px solid transparent;',
    '      font: 600 15px system-ui, -apple-system, sans-serif;',
    '      text-decoration: none;',
    '    }',
    '',
    '    .button-primary {',
    '      background: var(--accent);',
    '      color: var(--accent-text);',
    '    }',
    '',
    '    .button-ghost {',
    '      background: transparent;',
    '      color: var(--text);',
    '      border-color: rgba(255, 255, 255, 0.22);',
    '    }',
    '',
    '    .button:hover { filter: brightness(1.08); }',
    '',
    '    .button:focus-visible, summary:focus-visible {',
    '      outline: 3px solid var(--secondary);',
    '      outline-offset: 3px;',
    '    }',
    '',
    '    .button svg {',
    '      width: 16px;',
    '      height: 16px;',
    '    }',
    '',
    '    details {',
    '      width: 100%;',
    '      margin-top: 1.5rem;',
    '      text-align: left;',
    '      background: rgba(0, 0, 0, 0.2);',
    '      border: 1px solid rgba(255, 255, 255, 0.12);',
    '      border-radius: 12px;',
    '      overflow: hidden;',
    '    }',
    '',
    '    summary {',
    '      cursor: pointer;',
    '      list-style: none;',
    '      display: flex;',
    '      align-items: center;',
    '      gap: 8px;',
    '      padding: 0.75rem 0.875rem;',
    '      color: var(--text-muted);',
    '      font-size: 0.75rem;',
    '      font-weight: 600;',
    '      letter-spacing: 0.05em;',
    '      text-transform: uppercase;',
    '    }',
    '',
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
    '      margin: 0;',
    '      padding: 0.875rem;',
    '      border-top: 1px solid rgba(255, 255, 255, 0.12);',
    '      overflow-x: auto;',
    '      font-family: ui-monospace, SFMono-Regular, Consolas, \'Liberation Mono\', Menlo, monospace;',
    '      font-size: 0.6875rem;',
    '      line-height: 1.6;',
    '      color: var(--text-muted);',
    '    }',
    '',
    '    .footer {',
    '      margin-top: 1.6rem;',
    '      color: var(--text-subtle);',
    '      font-size: 12px;',
    '      letter-spacing: 0.2px;',
    '    }',
    '',
    '    @media (max-width: 360px) {',
    '      .card { padding-inline: 1rem; }',
    '      .actions, .button { width: 100%; }',
    '    }',
    '  </style>',
    '</head>',
    '<body>',
    '  <main class="card">',
    '    <svg class="logo" role="img" aria-labelledby="logo-title" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">',
    '      <title id="logo-title">Reverse Proxy for ntfy logo</title>',
    '      <defs><path id="logo-corners" d="M295.359575 0h433.28085C831.343384 0 868.585958 10.69351 906.132625 30.773688c37.546667 20.080177 67.01351 49.54702 87.093688 87.093687C1013.30649 155.414042 1024 192.656616 1024 295.359575v433.28085c0 102.702959-10.69351 139.945533-30.773687 177.4922-20.080178 37.546667-49.547021 67.01351-87.093688 87.093688C868.585958 1013.30649 831.343384 1024 728.640425 1024h-433.28085c-102.702959 0-139.945533-10.69351-177.4922-30.773687-37.546667-20.080178-67.01351-49.547021-87.093688-87.093688C10.69351 868.585958 0 831.343384 0 728.640425v-433.28085c0-102.702959 10.69351-139.945533 30.773687-177.4922C50.853865 80.320708 80.320708 50.853865 117.867375 30.773688 155.414042 10.69351 192.656616 0 295.359575 0Z"/></defs>',
    '      <clipPath id="logo-clip"><use href="#logo-corners"/></clipPath>',
    '      <g clip-path="url(#logo-clip)">',
    '        <path fill="#0fa79b" d="M0 0h1024v1024H0z"/>',
    '        <g transform="translate(160 160)">',
    '          <path fill="#0d9488" d="M352 0c194.333 0 352 157.667 352 352S546.333 704 352 704 0 546.333 0 352 157.667 0 352 0Zm0 88C204.6 88 88 204.6 88 352s116.6 264 264 264 264-116.6 264-264S499.4 88 352 88Z"/>',
    '          <path fill="#0f766e" d="M352 88c147.4 0 264 116.6 264 264S499.4 616 352 616 88 499.4 88 352 204.6 88 352 88Zm0 88c-97.24 0-176 78.76-176 176s78.76 176 176 176 176-78.76 176-176-78.76-176-176-176Z"/>',
    '          <path fill="#134e4a" d="M352 176c97.24 0 176 78.76 176 176s-78.76 176-176 176-176-78.76-176-176 78.76-176 176-176Z"/>',
    '          <path fill="#4db2aa" d="M291.783 272.738c.263-14.605 12.316-26.23 26.92-25.968h112.56c14.234.254 25.711 11.732 25.968 25.968v112.56c.262 14.603-11.363 26.657-25.968 26.919-14.605.263-26.658-11.363-26.92-25.967l1.121-50.305L291.783 449.621c-10.329 10.328-27.073 10.33-37.404 0-10.328-10.329-10.328-27.075 0-37.404l113.69-113.683-50.319 1.124c-14.605-.263-26.231-12.316-25.967-26.92Z"/>',
    '        </g>',
    '      </g>',
    '    </svg>',
    '    <h1>Reverse Proxy for ntfy</h1>',
    '    <p class="description">Routes webhooks and email to ntfy with built-in interpreters and server failover.</p>',
    '    <span class="status"><span class="status-dot" aria-hidden="true"></span>Operational</span>',
    '    <div class="actions">',
    '      <a class="button button-primary" href="https://nrp.cbnventures.io/" target="_blank" rel="noopener noreferrer">Documentation</a>',
    '      <a class="button button-ghost" href="https://github.com/cbnventures/ntfy-reverse-proxy" target="_blank" rel="noopener noreferrer">',
    '        <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',
    '        GitHub',
    '      </a>',
    `    </div>${debugSection}`,
    '    <footer class="footer">A CBN Ventures project</footer>',
    '  </main>',
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
