module.exports = {
	title: 'CodeNotary.io Docs',
	description: 'CodeNotary Documentation',
	dest: './docs',
	base: "/docs/",
	themeConfig: {
		nav: [
			{ text: 'vcn', link: '/vcn/cmd/vcn' },
			{ text: 'dashboard', link: '/dashboard/' },
			{ text: 'Github', link: 'https://github.com/vchain-us' },
		],
		sidebar: [
			{
				title: 'Get started',
				collapsable: false,
				children: [
					'/guide/quick-start',
				]
			},
			{
				title: 'vcn CLI',
				children: [
					'/vcn/user-guide/quick-start',
					'/vcn/user-guide/notarization',
					'/vcn/user-guide/environments',
					'/vcn/user-guide/formatted-output',
					'/vcn/cmd/vcn',
				]
			},
			{
				title: 'dashboard',
				path: '/dashboard/',
			},
			{
				title: 'integrations',
				collapsable: false,
				children: [
					'/integrations/js',
					'/integrations/java',
				]
			}
		]
	}
}