module.exports = {
	title: 'immudb',
	description: 'The lightweight, high-speed immutable database for systems and applications.',
	extend: '@vuepress/theme-default',
	themeConfig: {
		logo: '/logo.png',
		nav: [
			{ text: 'Website', link: 'https://www.codenotary.io' },
			{ text: 'Github', link: 'https://github.com/vchain-us' },
		],
		sidebar: [
			{
				title: 'Get started',
				collapsable: false,
				children: [
					'/',
				]
			},
		]
	}
};
