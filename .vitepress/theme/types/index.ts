/**
 * TypeScript type definitions for VitePress layouts
 */

export interface TouchPosition {
  x: number
  y: number
}

export interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
  collapsible?: boolean
}

export interface NavItem {
  text: string
  link?: string
  items?: NavItem[]
  activeMatch?: string
}

export interface Header {
  level: number
  title: string
  slug: string
  children?: Header[]
}

export interface PageData {
  title: string
  description?: string
  relativePath: string
  filePath: string
  headers?: Header[]
  frontmatter: PageFrontmatter
  content?: string
}

export interface PageFrontmatter {
  layout?: string
  title?: string
  description?: string

  // Layout flags
  home?: boolean
  navbar?: boolean
  sidebar?: boolean | 'auto'
  pageClass?: string

  // Home page
  heroImage?: string
  heroAlt?: string
  heroText?: string
  tagline?: string
  actionText?: string
  actionLink?: string

  // Blog
  date?: string
  excerpt?: string
  image?: string
  author?: string
  tags?: string[]

  // Other
  [key: string]: any
}

export interface SiteData {
  title: string
  description: string
  base: string
  lang: string
  themeConfig: ThemeConfig
  locales?: Record<string, any>
  pages?: any[]
}

export interface ThemeConfig {
  logo?: string
  nav?: NavItem[]
  sidebar?: SidebarConfig
  repo?: string
  repoLabel?: string
  editLink?: {
    pattern: string
    text?: string
  }
  lastUpdated?: boolean
  navbar?: boolean
  locales?: Record<string, any>
  [key: string]: any
}

export type SidebarConfig =
  | SidebarItem[]
  | Record<string, SidebarItem[]>
  | 'auto'

export interface BlogPage extends PageData {
  frontmatter: PageFrontmatter & {
    date: string
    excerpt: string
    image: string
  }
}

export interface PaginationData {
  pages: BlogPage[]
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  nextLink: string
  prevLink: string
}
