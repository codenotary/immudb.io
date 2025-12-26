/**
 * VitePress utilities for sidebar resolution and navigation
 * Ported from VuePress to VitePress
 */

export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^[a-z]+:/i

export interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

export interface PageData {
  title: string
  relativePath: string
  frontmatter: Record<string, any>
  headers?: Header[]
}

export interface Header {
  level: number
  title: string
  slug: string
  children?: Header[]
}

export interface SiteData {
  title: string
  description: string
  base: string
  themeConfig: Record<string, any>
  pages?: any[]
}

export function normalize(path: string): string {
  if (!path) {
    return ''
  }
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

export function getHash(path: string): string | undefined {
  if (!path) {
    return undefined
  }
  const match = path.match(hashRE)
  if (match) {
    return match[0]
  }
}

export function isExternal(path: string): boolean {
  return outboundRE.test(path)
}

export function isMailto(path: string): boolean {
  return /^mailto:/.test(path)
}

export function isTel(path: string): boolean {
  return /^tel:/.test(path)
}

export function ensureExt(path: string): string {
  if (isExternal(path)) {
    return path
  }
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  const normalized = normalize(path)

  if (endingSlashRE.test(normalized)) {
    return path
  }
  return normalized + '.html' + hash
}

export function isActive(currentPath: string, path: string): boolean {
  const currentHash = decodeURIComponent(getHash(currentPath) || '')
  const linkHash = getHash(path)

  if (linkHash && currentHash !== linkHash) {
    return false
  }

  const currentNormalized = normalize(currentPath)
  const pathNormalized = normalize(path)

  return currentNormalized === pathNormalized
}

export function resolveSidebarItems(
  page: PageData,
  regularPath: string,
  site: SiteData,
  localePath: string
): SidebarItem[] {
  const { themeConfig } = site

  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig

  const pageSidebarConfig =
    page.frontmatter.sidebar ||
    localeConfig.sidebar ||
    themeConfig.sidebar

  if (pageSidebarConfig === 'auto') {
    return resolveHeaders(page)
  }

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar

  if (!sidebarConfig) {
    return []
  }

  if (Array.isArray(sidebarConfig)) {
    return sidebarConfig
  }

  // Handle object-based sidebar config
  const matchedConfig = resolveMatchingConfig(regularPath, sidebarConfig)
  return matchedConfig.config || []
}

function resolveHeaders(page: PageData): SidebarItem[] {
  const headers = groupHeaders(page.headers || [])

  return [{
    text: page.title,
    items: headers.map(h => ({
      text: h.title,
      link: `#${h.slug}`,
      items: h.children?.map(child => ({
        text: child.title,
        link: `#${child.slug}`
      })) || []
    }))
  }]
}

export function groupHeaders(headers: Header[]): Header[] {
  const grouped: Header[] = []
  let currentH2: Header | null = null

  headers.forEach(h => {
    if (h.level === 2) {
      currentH2 = { ...h, children: [] }
      grouped.push(currentH2)
    } else if (h.level === 3 && currentH2) {
      if (!currentH2.children) {
        currentH2.children = []
      }
      currentH2.children.push(h)
    }
  })

  return grouped.filter(h => h.level === 2)
}

export function resolveMatchingConfig(
  regularPath: string,
  config: Record<string, any>
): { base: string; config: SidebarItem[] | null } {
  if (Array.isArray(config)) {
    return {
      base: '/',
      config: config
    }
  }

  for (const base in config) {
    if (ensureEndingSlash(regularPath).indexOf(encodeURI(base)) === 0) {
      return {
        base,
        config: config[base]
      }
    }
  }

  return { base: '/', config: null }
}

function ensureEndingSlash(path: string): string {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}

/**
 * Date formatting utility
 */
export function formatDate(date: string | Date, format = 'MMMM DD, YYYY'): string {
  const d = typeof date === 'string' ? new Date(date) : date

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const month = monthNames[d.getMonth()]
  const day = d.getDate()
  const year = d.getFullYear()

  return `${month} ${day}, ${year}`
}

/**
 * Reading time calculation
 */
export function calculateReadingTime(content: string, wordsPerMinute = 150): string {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}
