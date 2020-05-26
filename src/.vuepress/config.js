module.exports = {
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
		]
	}
};
