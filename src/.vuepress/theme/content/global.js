const cnHost = 'https://codenotary.com'
const cnProductURL = `${cnHost}/products`

const GlobalContent = {
  footer: {
    tables: [
      {
        title: 'PRODUCTS',
        links: [
          {
            label: 'CNIL (Self-Hosted)', href: `${cnProductURL}/immutable-ledger`,
          },
          {
            label: 'CNIL (Cloud)', href: `${cnProductURL}/ci-cd`,
          },
          {
            label: 'CNIL Metrics & Logs', href: `${cnProductURL}/immutable-ledger-metrics-and-logs`,
          },
        ],
      },
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
