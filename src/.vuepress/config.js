module.exports = {
    base: '/',
    dest: 'docs',
	title: 'immudb - The lightweight, high-speed immutable database',
	description: 'The lightweight, high-speed immutable database for systems and applications.',
	extend: '@vuepress/theme-default',
    head: [
        ['link', { rel: "canonical", href: "https://immudb.io/" }],
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
        ['meta', { property: "og:title", content: "immudb - The lightweight, high-speed immutable database" }],
        ['meta', { property: "og:description", content: "Immudb is the lightweight, high-speed immutable database for systems and applications." }],
        ['meta', { property: "og:url", content: "https://immudb.io/" }],
        ['meta', { property: "article:publisher", content: "https://immudb.io" }],
        ['meta', { name: "twitter:card", content: "summary" }],
        ['meta', { name: "twitter:title", content: "immudb - The lightweight, high-speed immutable database" }],
        ['meta', { name: "twitter:description", content: "Immudb is the lightweight, high-speed immutable database for systems and applications." }],
        ['meta', { name: "twitter:url", content: "https://immudb.io/" }],
        ['meta', { name: "twitter:site", content: "@immudb" }],
        ['meta', { name: "HandheldFriendly", content: "True" }],
        ['meta', { name: "viewport", content: "width=device-width, initial-scale=1.0" }]
    ],
	themeConfig: {
		logo: '/logo.png',
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Documentation', link: '/docs/introduction' },
			{ text: 'Github', link: 'https://github.com/codenotary/immudb' },
		],
		sidebar: [
			{
				title: 'Get started',
				collapsable: false,
				children: [
                    '/docs/introduction',
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
			},
			// {
			// 	title: 'immudb',
			// 	collapsable: false,
			// 	children: [
            //         '/docs/immudb/introduction',
			// 		'/docs/immudb/consistency-checker',
			// 	]
			// },
			// {
			// 	title: 'immugw',
			// 	collapsable: false,
			// 	children: [
			// 		'/docs/immugw/introduction',
			// 	]
			// },
			// {
			// 	title: 'immuadmin',
			// 	collapsable: false,
			// 	children: [
			// 		'/docs/immuadmin/introduction',
			// 	]
			// },
			// {
			// 	title: 'immuclient',
			// 	collapsable: false,
			// 	children: [
			// 		'/docs/immuclient/introduction',
			// 	]
			// },
		]
	}
};
