module.exports = {
    base: 'https://codenotary.github.io/immudb-docs/immudb-docs/',
    dest: 'docs',
	title: 'immudb',
	description: 'The lightweight, high-speed immutable database for systems and applications.',
	extend: '@vuepress/theme-default',
	themeConfig: {
		logo: '/logo.png',
		nav: [
			{ text: 'Website', link: 'https://www.immudb.io' },
			{ text: 'Github', link: 'https://github.com/codenotary/immudb' },
		],
		sidebar: [
			{
				title: 'Get started',
				collapsable: false,
				children: [
					'/docs/introduction',
				]
			},
			{
				title: 'immudb',
				collapsable: false,
				children: [
                    '/docs/immudb/introduction',
					'/docs/immudb/consistency-checker',
				]
			},
			{
				title: 'immugw',
				collapsable: false,
				children: [
					'/docs/immugw/introduction',
				]
			},
			{
				title: 'immuadmin',
				collapsable: false,
				children: [
					'/docs/immuadmin/introduction',
				]
			},
			{
				title: 'immuclient',
				collapsable: false,
				children: [
					'/docs/immuclient/introduction',
				]
			},
		]
	}
};
