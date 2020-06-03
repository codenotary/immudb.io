const websiteUrl = 'https://immudb.io';
const title = 'immudb - The lightweight, high-speed immutable database';
const description = 'immudb - the lightweight, high-speed immutable database for systems and applications. Open Source and easy to integrate into any existing application.';
const schemaOrg = `{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "publisher": {
        "@type": "Organization",
        "name": "${title}",
        "url": "${websiteUrl}",
        "logo": {
            "@type": "ImageObject",
            "url": {
                "@type": "ImageObject",
                "url": "https://immudb.io/logo.png",
                "width": 1036,
                "height": 367
            }
        }
    },
    "url": "${websiteUrl}",
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${websiteUrl}"
    },
    "description": "${description}"
}`;

module.exports = {
    base: '/',
    dest: 'docs',
    title,
    description,
    head: [
        ['link', { rel: "canonical", href: websiteUrl }],
        ['link', { rel: "shortcut icon", type: "image/png", href: "/favicon/favicon.ico" }],
        ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png" }],
        ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png" }],
        ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon/favicon-16x16.png" }],
        ['link', { rel: "manifest", href: "/favicon/site.webmanifest" }],
        ['link', { rel: "mask-icon", href: "/favicon/safari-pinned-tab.svg", color: "#4d4d4d" }],
        ['meta', { name: "apple-mobile-web-app-title", content: "immudb" }],
        ['meta', { name: "application-name", content: "immudb" }],
        ['meta', { name: "msapplication-TileColor", content: "#ffffff" }],
        ['meta', { name: "theme-color", content: "#ffffff" }],
        ['meta', { name: "referrer", content: "no-referrer-when-downgrade" }],
        ['meta', { property: "og:site_name", content: "immudb" }],
        ['meta', { property: "og:type", content: "website" }],
        ['meta', { property: "og:title", content: title }],
        ['meta', { property: "og:description", content: description }],
        ['meta', { property: "og:url", content: websiteUrl }],
        ['meta', { property: "article:publisher", content: websiteUrl }],
        ['meta', { name: "twitter:card", content: "summary" }],
        ['meta', { name: "twitter:title", content: title }],
        ['meta', { name: "twitter:description", content: description }],
        ['meta', { name: "twitter:url", content: websiteUrl }],
        ['meta', { name: "twitter:site", content: "@immudb" }],
        ['meta', { name: "HandheldFriendly", content: "True" }],
        ['meta', { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
        ['script', { type: "application/ld+json" }, schemaOrg]
    ],
    themeConfig: {
        logo: '/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Documentation', link: '/docs/' },
            { text: 'Github', link: 'https://github.com/codenotary/immudb' },
        ],
        sidebar: [
            {
                title: 'Get started',
                collapsable: false,
                children: [
                    '/docs/',
                    '/docs/how-it-works',
                    '/docs/quickstart',
                    '/docs/command-reference',
                    '/docs/apis-and-interfaces',
                ]
            },
            {
                title: 'Components',
                collapsable: false,
                children: [
                    '/docs/immudb/',
                    '/docs/immugw/',
                    '/docs/immuadmin/',
                    '/docs/immuclient/',
                ]
            }
        ]
    },
    plugins: [
        ['@vuepress/blog', {
            directories: [
                {
                    id: 'post',
                    dirname: '_blog',
                    path: '/blog/',
                    layout: 'Blog',
                    itemLayout: 'BlogPost',
                    itemPermalink: '/blog/:year/:month/:day/:slug',
                    pagination: {
                        perPagePosts: 10,
                    }
                }
            ]
        }],
        ['sitemap', {
            hostname: 'https://immudb.io'
        }],
        ['@vuepress/google-analytics', {
            ga: 'UA-168112067-1'
        }]
    ]
};
