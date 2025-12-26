const cnHost = 'https://codenotary.com'

const GlobalContent = {
  footer: {
    tables: [
      {
        title: 'RESOURCES',
        links: [
          {
            label: 'Videos', href: 'https://www.youtube.com/channel/UCYDMxKTM74Acj8LerGrjUuw/videos',
          },
          {
            label: 'Blogs', href: `${cnHost}/blog`,
          },
          {
            label: 'immudb', href: `${cnHost}/technologies/immudb`,
          },
        ],
      },
      {
        title: 'COMPANY',
        links: [
          {
            label: 'About Us', href: `${cnHost}/about`,
          },
          {
            label: 'Join Us', href: `${cnHost}/join`,
          },
          {
            label: 'Partners', href: `${cnHost}/partners`,
          },
          {
            label: 'Contact', href: `${cnHost}/contact`,
          },
        ],
      },
    ],
  },
}

export default GlobalContent;
