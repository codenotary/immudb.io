import { createContentLoader } from 'vitepress'

export interface BlogPost {
  title: string
  url: string
  date: string
  excerpt?: string
  description?: string
  author?: string
  tags?: string[]
  category?: string
  image?: string
}

declare const data: BlogPost[]
export { data }

export default createContentLoader('blog/**/*.md', {
  excerpt: true,
  transform(raw): BlogPost[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title || 'Untitled',
        url,
        date: frontmatter.date || new Date().toISOString(),
        excerpt: excerpt || frontmatter.description || '',
        description: frontmatter.description,
        author: frontmatter.author,
        tags: frontmatter.tags || [],
        category: frontmatter.category,
        image: frontmatter.image
      }))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA
      })
  }
})
