require('dotenv').config();
const webpack = require('webpack');

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

const googleAnalytics = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-ELLNP48DRV');`;

const vgo = `(function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
vgo('setAccount', '66487182');
vgo('setTrackByDefault', true);
vgo('process');`;

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
        ['script', { type: "application/ld+json" }, schemaOrg],
        ['script', { type: "text/javascript" }, vgo],
    ].concat(process.env.NODE_ENV === 'production' ? [
        ['script', { async: true, src: "https://www.googletagmanager.com/gtag/js?id=UA-168112067-1" }],
        ['script', { async: true, src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" }]
    ] : []),
    themeConfig: {
        displayAllHeaders: true,
        logo: '/logo_white.svg',
        nav: [
            { text: 'Codenotary', link: 'https://codenotary.io/technologies/immudb' },
            { text: 'Blog', link: 'https://codenotary.io/blog' },
            // { text: 'Documentation', link: '/' },
            // { text: 'Immutable Data Science', link: 'https://codenotary.io/technologies/immudb/immutable-data-science' },
            { text: 'Github', link: 'https://github.com/codenotary/immudb' },
        ],
        algolia: {
            apiKey: process.env.ALGOLIA_API_KEY,
            indexName: process.env.ALGOLIA_INDEX,
            appId: process.env.ALGOLIA_APP_ID,
        }
    },
    plugins: [
        ['sitemap', {
            hostname: 'https://immudb.io'
        }],
        ['@vuepress/google-analytics', {
            ga: 'UA-168112067-1'
        }],
        ['vuepress-plugin-reading-time'],
        ['vuepress-plugin-element-tabs']
    ],
    configureWebpack: (config, isServer) => {
        const optimizationConfig = {
            plugins: [
                new webpack.EnvironmentPlugin({ ...process.env })
            ],
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendor',
                            priority: 10,
                            reuseExistingChunk: true
                        },
                        common: {
                            minChunks: 2,
                            priority: 5,
                            reuseExistingChunk: true
                        }
                    }
                },
                minimize: process.env.NODE_ENV === 'production',
                runtimeChunk: {
                    name: 'runtime'
                }
            },
            performance: {
                hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000
            }
        };

        // Bundle analyzer for development
        if (process.env.ANALYZE === 'true') {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            optimizationConfig.plugins.push(new BundleAnalyzerPlugin());
        }

        return optimizationConfig;
    },
};
