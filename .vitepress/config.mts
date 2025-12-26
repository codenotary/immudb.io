import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// Import version-specific sidebars
import {
  masterSidebar,
  v196Sidebar,
  v195Sidebar,
  v194Sidebar,
  v150Sidebar,
  v141Sidebar,
  v140Sidebar,
  v132Sidebar,
  v131Sidebar
} from './sidebars'

const websiteUrl = 'https://immudb.io'
const title = 'immudb - The lightweight, high-speed immutable database'
const description = 'immudb - the lightweight, high-speed immutable database for systems and applications. Open Source and easy to integrate into any existing application.'

// Environment variables for Algolia and Analytics
const algoliaApiKey = process.env.ALGOLIA_API_KEY || ''
const algoliaIndexName = process.env.ALGOLIA_INDEX || ''
const algoliaAppId = process.env.ALGOLIA_APP_ID || ''
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID || 'G-ELLNP48DRV'

export default defineConfig({
  title,
  description,
  lang: 'en-US',

  // Use default output directory (.vitepress/dist)
  // We'll copy to docs/ in the GitHub Actions workflow

  // Clean URLs (removes .html extension)
  cleanUrls: true,

  // Force dark theme and disable appearance toggle
  appearance: false,

  // Source directory
  srcDir: 'src',

  // Head configuration
  head: [
    ['link', { rel: 'canonical', href: websiteUrl }],
    ['link', { rel: 'shortcut icon', type: 'image/png', href: '/favicon/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/favicon/site.webmanifest' }],
    ['link', { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#4d4d4d' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'immudb' }],
    ['meta', { name: 'application-name', content: 'immudb' }],
    ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['meta', { property: 'og:site_name', content: 'immudb' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: websiteUrl }],
    ['meta', { property: 'article:publisher', content: websiteUrl }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:url', content: websiteUrl }],
    ['meta', { name: 'twitter:site', content: '@immudb' }],
    ['meta', { name: 'HandheldFriendly', content: 'True' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],

    // Schema.org structured data
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      publisher: {
        '@type': 'Organization',
        name: title,
        url: websiteUrl,
        logo: {
          '@type': 'ImageObject',
          url: 'https://immudb.io/logo.png',
          width: 1036,
          height: 367
        }
      },
      url: websiteUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': websiteUrl
      },
      description
    })],

    // Google Analytics
    ['script', { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}` }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleAnalyticsId}');
    `],

    // VGO tracking
    ['script', {}, `
      (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
      vgo('setAccount', '66487182');
      vgo('setTrackByDefault', true);
      vgo('process');
    `],

    // reCAPTCHA (production only)
    ...(process.env.NODE_ENV === 'production' ? [
      ['script', { async: true, src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit' }]
    ] : [])
  ],

  // Markdown configuration
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    config: (md) => {
      // Custom markdown-it plugins can be added here
    }
  },

  // Theme configuration
  themeConfig: {
    logo: '/logo_white.svg',

    // Navigation
    nav: [
      { text: 'Codenotary', link: 'https://codenotary.io/technologies/immudb' },
      { text: 'Blog', link: 'https://codenotary.io/blog' },
      { text: 'Github', link: 'https://github.com/codenotary/immudb' }
    ],

    // Multi-version sidebar configuration
    sidebar: {
      '/master/': masterSidebar,
      '/1.9.6/': v196Sidebar,
      '/1.9.5/': v195Sidebar,
      '/1.9.4/': v194Sidebar,
      '/1.5.0/': v150Sidebar,
      '/1.4.1/': v141Sidebar,
      '/1.4.0/': v140Sidebar,
      '/1.3.2/': v132Sidebar,
      '/1.3.1/': v131Sidebar,
      // Older versions use v1.3.1 sidebar
      '/1.3.0/': v131Sidebar,
      '/1.2.4/': v131Sidebar,
      '/1.2.3/': v131Sidebar,
      '/1.2.2/': v131Sidebar,
      '/1.2.1/': v131Sidebar,
      '/1.2.0/': v131Sidebar,
      '/1.1.0/': v131Sidebar,
      '/1.0.5/': v131Sidebar,
      '/1.0.1/': v131Sidebar,
      '/1.0.0/': v131Sidebar,
      '/0.9.2/': v131Sidebar,
      '/0.9.1/': v131Sidebar,
      '/0.9.0/': v131Sidebar,
      '/0.8.1/': v131Sidebar,
      '/0.8.0/': v131Sidebar
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/codenotary/immudb' },
      { icon: 'twitter', link: 'https://twitter.com/immudb' }
    ],

    // Footer
    footer: {
      message: 'Released under the Apache 2.0 License.',
      copyright: 'Copyright © 2024 Codenotary Inc.'
    },

    // Algolia search configuration
    search: algoliaApiKey ? {
      provider: 'algolia',
      options: {
        appId: algoliaAppId,
        apiKey: algoliaApiKey,
        indexName: algoliaIndexName
      }
    } : undefined,

    // Edit link
    editLink: {
      pattern: 'https://github.com/codenotary/immudb.io/edit/master/:path',
      text: 'Edit this page on GitHub'
    },

    // Last updated
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  },

  // Sitemap generation
  sitemap: {
    hostname: websiteUrl
  },

  // Ignore dead links for now (TODO: Fix dead links)
  ignoreDeadLinks: true,

  // Build optimization
  vite: {
    publicDir: fileURLToPath(new URL('../public', import.meta.url)),  // Use root public folder
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('..', import.meta.url))  // Root of the project
      }
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Chunk node_modules separately (except vue/vitepress which are external)
            if (id.includes('node_modules') && !id.includes('vue') && !id.includes('vitepress')) {
              return 'vendor'
            }
          }
        }
      }
    },
    server: {
      port: 8080,
      host: true
    }
  }
})
