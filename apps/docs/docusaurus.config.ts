import { resolve } from 'node:path';

import type { DocusaurusNovaConfig } from '@cbnventures/docusaurus-preset-nova/types/config';

/**
 * Docusaurus Configuration.
 *
 * @since 0.11.0
 */
const config: DocusaurusNovaConfig = {
  // Site Metadata.
  title: 'Reverse Proxy for ntfy',
  titleDelimiter: ' - ',
  tagline: 'Notification gateway on Cloudflare Workers that routes webhooks and emails to ntfy with automatic server failover',
  favicon: './favicon.ico',

  // Deployment.
  url: 'https://nrp.cbnventures.io',
  baseUrl: '/',
  organizationName: 'cbnventures',
  projectName: 'ntfy-reverse-proxy',
  deploymentBranch: undefined,
  githubHost: undefined,
  githubPort: undefined,
  trailingSlash: true,
  noIndex: false,

  // Error Handling.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  // Static Assets.
  staticDirectories: ['static'],
  baseUrlIssueBanner: true,
  scripts: [],
  stylesheets: [],
  clientModules: [],
  themes: [],

  // Custom Fields.
  customFields: {},

  // Head Tags.
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    },
  ],

  // Internationalization.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
    },
  },

  // Markdown.
  markdown: {
    format: 'mdx',
    mermaid: true,
    emoji: true,
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    anchors: {
      maintainCase: false,
    },
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'throw',
    },
  },

  // Presets (Nova).
  presets: [[
    '@cbnventures/docusaurus-preset-nova',
    {
      // Preset Identity.
      preset: 'envoy',

      // Preset Overrides (undefined = use preset default).
      overrides: {
        colors: {
          primary: '#0D9488',
          accent: '#D97706',
          neutral: '#57534E',
        },
        fonts: {
          display: 'Outfit',
          body: 'Be Vietnam Pro',
          code: 'Fira Code',
        },
        shape: {
          radius: undefined,
          density: undefined,
        },
        depth: {
          cards: undefined,
          codeBlocks: undefined,
        },
        motion: {
          speed: undefined,
          staggeredReveals: undefined,
          hoverEffects: undefined,
        },
        navbar: undefined,
        footer: undefined,
      },

      // Plugins.
      plugins: {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Blog',
          blogDescription: 'Release notes, integration deep dives, and the occasional dispatch from the relay room.',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 15,
          feedOptions: {
            type: [
              'rss',
              'atom',
            ],
            copyright: `Copyright \u00A9 2023-${String(new Date().getFullYear())} CBN Ventures LLC. All Rights Reserved.`,
            limit: 20,
            title: 'Reverse Proxy for ntfy Blog',
            description: 'Release notes, integration deep dives, and the occasional dispatch from the relay room.',
          },
        },
        pages: undefined,
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/docs/tags/**'],
          filename: 'sitemap.xml',
        },
      },

      // Analytics.
      analytics: {
        gtm: {
          containerId: 'GTM-KGQ8Z23R',
        },
      },

      // Search.
      search: {
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: 'docs',
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcutKeymap: 'mod+k',
        searchResultLimits: 8,
        fuzzyMatchingDistance: 1,
        ignorePatterns: [],
      },

      // Progress Bar.
      progressBar: true,
    },
  ]],

  // Plugins.
  plugins: [[
    'docusaurus-plugin-module-alias',
    {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  ]],

  // Theme Config.
  themeConfig: {
    // Site.
    site: {
      title: 'Reverse Proxy for ntfy',
      logo: {
        alt: 'Reverse Proxy for ntfy',
        src: '/images/logo.svg',
        srcDark: undefined,
        href: '/',
        wordmark: undefined,
        wordmarkDark: undefined,
        title: 'Reverse Proxy for ntfy',
      },
      image: '/thumbnails/brand.png',
      metadata: [
        {
          name: 'description',
          content: 'Notification gateway on Cloudflare Workers that routes webhooks and emails to ntfy with automatic server failover',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    },

    // Color Mode.
    colorMode: {
      defaultMode: 'system',
      disableSwitch: false,
    },

    // Navbar.
    navbar: {
      title: 'Reverse Proxy for ntfy',
      hideOnScroll: false,
      items: [
        {
          label: 'Docs',
          position: 'left',
          type: undefined,
          to: '/docs/overview/',
          icon: 'lucide:book-open',
          activeBaseRegex: '^/docs/(?!interpreters)',
        },
        {
          label: 'Interpreters',
          position: 'left',
          type: undefined,
          to: '/docs/interpreters/overview/',
          icon: 'lucide:cpu',
          activeBasePath: '/docs/interpreters',
        },
        {
          label: 'Blog',
          position: 'left',
          type: undefined,
          to: '/blog/',
          icon: 'lucide:pen-line',
        },
        {
          label: 'GitHub',
          position: 'right',
          type: undefined,
          href: 'https://github.com/cbnventures/ntfy-reverse-proxy',
          icon: 'lucide:github',
        },
      ],
    },

    // Docs.
    docs: {
      versionPersistence: 'localStorage',
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },

    // Blog.
    blog: {
      sidebar: {
        groupByYear: true,
      },
      layout: {
        heading: 'Blog',
        description: 'Release notes and integration deep dives',
      },
      share: {
        platforms: [
          'linkedin',
          'reddit',
          'facebook',
          'x',
          'copy',
        ],
      },
    },

    // Table of Contents.
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },

    // Announcement Bar.
    // announcementBar: {
    //   id: '',
    //   content: '',
    //   backgroundColor: undefined,
    //   textColor: undefined,
    //   isCloseable: true,
    // },

    // Back to Top Button.
    backToTopButton: true,

    // Footer.
    footer: {
      sections: {
        docs: [
          {
            label: 'Getting Started',
            href: '/docs/getting-started/quick-start/',
          },
          {
            label: 'Configuration',
            href: '/docs/getting-started/configuration/',
          },
          {
            label: 'CLI Reference',
            href: '/docs/reference/cli/',
          },
        ],
        resources: [
          {
            label: 'Blog',
            href: '/blog/',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/cbnventures/ntfy-reverse-proxy',
          },
        ],
        company: [
          {
            label: 'About',
            href: 'https://www.cbnventures.io/',
          },
          {
            label: 'Get In Touch',
            href: 'https://www.cbnventures.io/get-in-touch/',
          },
        ],
        legal: [
          {
            label: 'Terms of Use',
            href: 'https://www.cbnventures.io/terms/',
          },
          {
            label: 'Privacy Policy',
            href: 'https://www.cbnventures.io/privacy/',
          },
        ],
      },
      layout: {
        docs: {
          title: 'Docs',
          section: 'docs',
        },
        resources: {
          title: 'Resources',
          section: 'resources',
        },
        company: {
          title: 'Company',
          section: 'company',
        },
        legal: {
          title: 'Legal',
          section: 'legal',
        },
      },
      socialLinks: [
        {
          icon: 'mdi:facebook',
          href: 'https://www.facebook.com/cbnventures',
          label: 'Facebook',
        },
        {
          icon: 'ri:twitter-x-fill',
          href: 'https://x.com/cbnventures',
          label: 'X',
        },
        {
          icon: 'mdi:youtube',
          href: 'https://www.youtube.com/@cbnventures',
          label: 'YouTube',
        },
        {
          icon: 'mdi:instagram',
          href: 'https://www.instagram.com/cbnventures/',
          label: 'Instagram',
        },
        {
          icon: 'mdi:github',
          href: 'https://github.com/cbnventures',
          label: 'GitHub',
        },
        {
          icon: 'mdi:google-play',
          href: 'https://play.google.com/store/apps/dev?id=6419450160526226105',
          label: 'Google Play',
        },
        {
          icon: 'mdi:linkedin',
          href: 'https://www.linkedin.com/company/cbnventures/',
          label: 'LinkedIn',
        },
      ],
      copyright: `Copyright \u00A9 2023-${String(new Date().getFullYear())} CBN Ventures LLC. All Rights Reserved.`,
      credit: true,
      cta: undefined,
    },
  },
};

export default config;
