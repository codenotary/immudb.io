/**
 * Navigation utility functions for VitePress
 * Ported from VuePress to VitePress
 */

import type { Route } from 'vitepress'

export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^[a-z]+:/i

export interface PageData {
  path?: string
  regularPath?: string
  frontmatter?: any
  headers?: any[]
  title?: string
  [key: string]: any
}

export interface SidebarItem {
  type?: string
  path?: string
  title?: string
  text?: string
  link?: string
  items?: SidebarItem[]
  children?: SidebarItem[]
  headers?: any[]
  basePath?: string
  slug?: string
  level?: number
  [key: string]: any
}

/**
 * Normalize path by removing hash and extension
 */
export function normalize(path?: string): string {
  if (!path) {
    return ''
  }
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

/**
 * Get hash from path
 */
export function getHash(path?: string): string | undefined {
  if (!path) {
    return undefined
  }
  const match = path.match(hashRE)
  if (match) {
    return match[0]
  }
}

/**
 * Check if path is external
 */
export function isExternal(path: string): boolean {
  return outboundRE.test(path)
}

/**
 * Check if path is mailto link
 */
export function isMailto(path: string): boolean {
  return /^mailto:/.test(path)
}

/**
 * Check if path is tel link
 */
export function isTel(path: string): boolean {
  return /^tel:/.test(path)
}

/**
 * Ensure path has extension
 */
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

/**
 * Check if route is active for given path
 */
export function isActive(route: Route, path?: string): boolean {
  if (!path) return false

  const routeHash = decodeURIComponent(route.hash || '')
  const linkHash = getHash(path)

  if (linkHash && routeHash !== linkHash) {
    return false
  }

  const routePath = normalize(route.path)
  const pagePath = normalize(path)

  return routePath === pagePath
}

/**
 * Resolve page from pages array
 */
export function resolvePage(
  pages: PageData[],
  rawPath: string,
  base?: string
): SidebarItem {
  if (isExternal(rawPath)) {
    return {
      type: 'external',
      path: rawPath
    }
  }

  let path = rawPath
  if (base) {
    path = resolvePath(rawPath, base)
  }

  const normalizedPath = normalize(path)

  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].regularPath || pages[i].path) === normalizedPath) {
      return {
        ...pages[i],
        type: 'page',
        path: ensureExt(pages[i].path || '')
      }
    }
  }

  console.error(`[vitepress] No matching page found for sidebar item "${rawPath}"`)
  return {}
}

/**
 * Resolve relative path
 */
function resolvePath(relative: string, base: string, append?: boolean): string {
  const firstChar = relative.charAt(0)

  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  const stack = base.split('/')

  // remove trailing segment if not appending or appending to trailing slash
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/')
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment === '..') {
      stack.pop()
    } else if (segment !== '.') {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}

/**
 * Group headers by level (h3 under h2)
 */
export function groupHeaders(headers: any[]): any[] {
  headers = headers.map(h => Object.assign({}, h))
  let lastH2: any

  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h)
    }
  })

  return headers.filter(h => h.level === 2)
}

/**
 * Resolve navigation link item
 */
export function resolveNavLinkItem(linkItem: any): any {
  return Object.assign(linkItem, {
    type: linkItem.items && linkItem.items.length ? 'links' : 'link'
  })
}

/**
 * Resolve sidebar items for a page
 */
export function resolveSidebarItems(
  page: PageData,
  regularPath: string,
  site: any,
  localePath?: string
): SidebarItem[] {
  const { pages = [], themeConfig = {} } = site

  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig

  const pageSidebarConfig =
    page.frontmatter?.sidebar ||
    localeConfig.sidebar ||
    themeConfig.sidebar

  if (pageSidebarConfig === 'auto') {
    return resolveHeaders(page)
  }

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar

  if (!sidebarConfig) {
    return []
  } else {
    const { base, config } = resolveMatchingConfig(regularPath, sidebarConfig)
    return config
      ? config.map((item: any) => resolveItem(item, pages, base))
      : []
  }
}

/**
 * Resolve headers for auto sidebar
 */
function resolveHeaders(page: PageData): SidebarItem[] {
  const headers = groupHeaders(page.headers || [])

  return [{
    type: 'group',
    collapsable: false,
    title: page.title,
    path: undefined,
    children: headers.map(h => ({
      type: 'auto',
      title: h.title,
      basePath: page.path,
      path: page.path + '#' + h.slug,
      children: h.children || []
    }))
  }]
}

/**
 * Resolve matching sidebar config for path
 */
export function resolveMatchingConfig(
  regularPath: string,
  config: any
): { base: string; config: any } {
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

  return { base: '/', config: [] }
}

/**
 * Ensure path ends with slash
 */
function ensureEndingSlash(path: string): string {
  return /(\.html|\/)$/.test(path) ? path : path + '/'
}

/**
 * Resolve sidebar item
 */
function resolveItem(
  item: any,
  pages: PageData[],
  base: string,
  groupDepth = 1
): SidebarItem {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base)
  } else if (Array.isArray(item)) {
    return {
      ...resolvePage(pages, item[0], base),
      title: item[1]
    }
  } else {
    const children = item.children || []

    if (children.length === 0 && item.path) {
      return {
        ...resolvePage(pages, item.path, base),
        title: item.title
      }
    }

    return {
      type: 'group',
      path: item.path,
      title: item.title,
      sidebarDepth: item.sidebarDepth,
      children: children.map((child: any) =>
        resolveItem(child, pages, base, groupDepth + 1)
      ),
      collapsable: item.collapsable !== false
    }
  }
}
