const cnHost = 'https://codenotary.com'

export interface FooterLink {
  label: string
  /** External URL, or null when the entry points inside the docs via internalLink. */
  href: string | null
  internalLink?: string
}

export interface FooterTable {
  title: string
  links: FooterLink[]
}

const GlobalContent: { footer: { tables: FooterTable[] } } = {
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

export default GlobalContent
