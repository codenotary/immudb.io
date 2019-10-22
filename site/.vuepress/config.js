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
					'/guide/quickhelp',
				]
			},
			{
				title: 'Dashboard',
				path: '/dashboard/',
				children: [
					'/dashboard/onboarding',
					'/dashboard/profile',
					'/dashboard/dashboard',
					'/dashboard/assets',
					'/dashboard/organizations',
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
				title: 'Integrations',
				collapsable: false,
				children: [
					'/integrations/kube-notary',
					'/integrations/js',
					'/integrations/java',
				]
			}
		]
	}
}