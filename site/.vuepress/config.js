module.exports = {
	title: 'CodeNotary.io Docs',
	description: 'CodeNotary Documentation',
	dest: './docs',
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
					'/guide/installation',
				]
			},
			{
				title: 'vcn cli',
				children: [
					'/vcn/cmd/vcn',
					'/vcn/user-guide/configuration',
					'/vcn/user-guide/environments',
					'/vcn/user-guide/notarization',
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