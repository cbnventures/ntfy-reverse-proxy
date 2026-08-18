import { NovaIdentity } from '@cbnventures/nova/toolkit';

import type { DocusaurusNovaConfig } from '@cbnventures/docusaurus-preset-nova/types/config';

/**
 * Identity.
 *
 * @since UNRELEASED
 */
const identity = new NovaIdentity().forDocs();

/**
 * Docusaurus Configuration.
 *
 * @since 0.11.0
 */
const config: DocusaurusNovaConfig = {
  // Site Metadata.
  title: identity['title'] ?? '',
  titleDelimiter: ' - ',
  tagline: identity['tagline'],
  favicon: './favicon.ico',

  // Deployment.
  url: identity['url'] ?? '',
  baseUrl: '/',
  organizationName: identity['organizationName'],
  projectName: identity['projectName'],
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
        href: `${identity['baseUrl'] ?? '/'}apple-touch-icon.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: `${identity['baseUrl'] ?? '/'}favicon-96x96.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `${identity['baseUrl'] ?? '/'}favicon.svg`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: `${identity['baseUrl'] ?? '/'}site.webmanifest`,
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
          primary: {
            light: '#0D9488',
            dark: '#0D9488',
          },
          secondary: {
            light: '#D97706',
            dark: '#D97706',
          },
          text: undefined,
          border: undefined,
          warning: undefined,
          danger: undefined,
        },
        fonts: {
          display: 'Outfit',
          body: 'Be Vietnam Pro',
          code: 'Fira Code',
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
            copyright: identity['copyright'],
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
  plugins: [],

  // Theme Config.
  themeConfig: {
    // Site.
    site: {
      logo: {
        alt: 'Reverse Proxy for ntfy',
        src: {
          light: '/images/logo.svg',
          dark: undefined,
        },
        href: '/',
        target: undefined,
        rel: undefined,
        ariaLabel: undefined,
        wordmark: {
          light: undefined,
          dark: undefined,
        },
      },
      image: '/thumbnails/brand.png',
      metadata: [
        {
          name: 'description',
          content: identity['metaDescription'] ?? '',
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
    announcementBar: undefined,

    // Back to Top Button.
    backToTopButton: true,

    // Error Pages - overrides Nova's randomized defaults with consumer copy.
    // Any unset field falls through to the Nova-flavored randomized pool.
    errorPages: {
      notFound: {
        title: 'This route did not relay.',
        description: 'We could not find a handler for this URL. Head back to the docs index.',
        backHomeLabel: 'Back to the docs',
        backHomeHref: undefined,
      },
      errorPageContent: {
        title: 'Relay failed on this page.',
        retryLabel: 'Retry the relay',
      },
      error: {
        retryLabel: 'Retry the dispatch',
      },
    },

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
          icon: 'ri:facebook-fill',
          href: 'https://www.facebook.com/cbnventures',
          label: 'Facebook',
        },
        {
          icon: 'ri:twitter-x-fill',
          href: 'https://x.com/cbnventures',
          label: 'X',
        },
        {
          icon: 'ri:youtube-fill',
          href: 'https://www.youtube.com/@cbnventures',
          label: 'YouTube',
        },
        {
          icon: 'ri:instagram-fill',
          href: 'https://www.instagram.com/cbnventures/',
          label: 'Instagram',
        },
        {
          icon: 'ri:github-fill',
          href: 'https://github.com/cbnventures',
          label: 'GitHub',
        },
        {
          icon: 'ri:google-play-fill',
          href: 'https://play.google.com/store/apps/dev?id=6419450160526226105',
          label: 'Google Play',
        },
        {
          icon: 'ri:linkedin-fill',
          href: 'https://www.linkedin.com/company/cbnventures/',
          label: 'LinkedIn',
        },
      ],
      copyright: identity['copyright'],
      credit: true,
      cta: undefined,
    },
  },
};

export default config;
