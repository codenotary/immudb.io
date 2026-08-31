import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'
import { masterSidebar } from './master'
import { v1110Sidebar } from './1.11.0'
import { v196Sidebar } from './1.9.6'
import { v195Sidebar } from './1.9.5'
import { v194Sidebar } from './1.9.4'
import { v150Sidebar } from './1.5.0'
import { v141Sidebar } from './1.4.1'
import { v140Sidebar } from './1.4.0'
import { v132Sidebar } from './1.3.2'
import { v131Sidebar } from './1.3.1'

/**
 * VitePress Sidebar Configuration
 *
 * This file exports all version-specific sidebar configurations
 * for the immudb documentation site.
 *
 * Migration from VuePress:
 * - `title` → `text`
 * - `collapsable` → `collapsed`
 * - `children` → `items`
 * - String paths → Objects with `{ text, link }`
 */

export interface SidebarConfig {
  [path: string]: DefaultTheme.SidebarItem[]
}

/**
 * Main sidebar configuration object
 * Maps version paths to their respective sidebar configurations
 */
export const sidebars: SidebarConfig = {
  '/master/': masterSidebar,
  '/1.11.0/': v1110Sidebar,
  '/1.9.6/': v196Sidebar,
  '/1.9.5/': v195Sidebar,
  '/1.9.4/': v194Sidebar,
  '/1.5.0/': v150Sidebar,
  '/1.4.1/': v141Sidebar,
  '/1.4.0/': v140Sidebar,
  '/1.3.2/': v132Sidebar,
  '/1.3.1/': v131Sidebar,
}

/**
 * Get sidebar for a specific version
 * @param version - Version string (e.g., 'master', '1.9.6')
 * @returns Sidebar configuration for the specified version
 */
export function getSidebar(version: string): DefaultTheme.SidebarItem[] {
  const path = `/${version}/`
  return sidebars[path] || masterSidebar
}

/**
 * Get all available versions
 * @returns Array of version strings
 */
export function getVersions(): string[] {
  return Object.keys(sidebars).map(path => path.replace(/\//g, ''))
}

// Export individual sidebars for direct import
export {
  masterSidebar,
  v1110Sidebar,
  v196Sidebar,
  v195Sidebar,
  v194Sidebar,
  v150Sidebar,
  v141Sidebar,
  v140Sidebar,
  v132Sidebar,
  v131Sidebar,
}


/**
 * Sidebars for versions that do not have one of their own.
 *
 * Only ten versions ship a hand-written sidebar. VitePress matches its sidebar
 * map by path prefix, so every other version fell through to the last entry and
 * rendered 1.3.1's links — browsing /1.0.0/ navigated you into /1.3.1/. These
 * derive a sidebar instead: take the nearest curated one, retarget its links at
 * the version being viewed, and drop entries whose page does not exist in that
 * version so the retargeting cannot invent links.
 */

// Newest to oldest. DOM variants sit next to the release they branch from.
const VERSION_ORDER = [
  'master', '1.11.0', '1.9.6', '1.9.5', '1.9.4', '1.9DOM.1', '1.9DOM.0',
  '1.9.3', '1.5.0', '1.4.1', '1.4.0', '1.3.2', '1.3.1', '1.3.0', '1.2.4',
  '1.2.3', '1.2.2', '1.2.1', '1.1.0', '1.0.0', '0.9.2', '0.9.1', '0.9.0',
  '0.8.1', '0.8.0'
]

const SRC_DIR = path.resolve(fileURLToPath(new URL('../../src', import.meta.url)))

/** Does `link` resolve to a markdown source file under `version`? */
function pageExists(version: string, link: string): boolean {
  const rel = link.replace(/^\/[^/]+\/?/, '').replace(/\.html$/, '')
  const dir = path.join(SRC_DIR, version)
  if (!rel) return fs.existsSync(path.join(dir, 'README.md'))
  return (
    fs.existsSync(path.join(dir, `${rel}.md`)) ||
    fs.existsSync(path.join(dir, rel, 'README.md'))
  )
}

/** Rewrite links onto `version`, dropping anything that version does not have. */
function retarget(
  items: DefaultTheme.SidebarItem[],
  version: string
): DefaultTheme.SidebarItem[] {
  const out: DefaultTheme.SidebarItem[] = []
  for (const item of items) {
    const next: DefaultTheme.SidebarItem = { ...item }

    if (typeof next.link === 'string') {
      const link = next.link.replace(/^\/[^/]+\//, `/${version}/`)
      if (!pageExists(version, link)) {
        delete next.link
      } else {
        next.link = link
      }
    }

    if (Array.isArray(next.items)) next.items = retarget(next.items, version)

    // Keep a group only if it still leads somewhere.
    const hasChildren = Array.isArray(next.items) && next.items.length > 0
    if (next.link || hasChildren) out.push(next)
  }
  return out
}

/** Nearest version that has a hand-written sidebar. */
function nearestCuratedVersion(version: string): string {
  const index = VERSION_ORDER.indexOf(version)
  if (index === -1) return 'master'
  for (let d = 1; d < VERSION_ORDER.length; d++) {
    // Prefer the older neighbour: docs gain pages over time, so an older
    // sidebar is likelier to describe pages an older version actually has.
    for (const candidate of [VERSION_ORDER[index + d], VERSION_ORDER[index - d]]) {
      if (candidate && sidebars[`/${candidate}/`]) return candidate
    }
  }
  return 'master'
}

// Present in some old version trees but not documentation: recruiting pages,
// and content the docs themselves already marked as superseded.
const NON_DOC_DIRS = new Set(['careers', 'old'])

/** Every markdown page in a version, as sidebar links. */
function pagesOf(version: string): { link: string; text: string }[] {
  const root = path.join(SRC_DIR, version)
  if (!fs.existsSync(root)) return []

  const found: { link: string; text: string }[] = []
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (dir === root && NON_DOC_DIRS.has(entry.name)) continue
        walk(full)
      } else if (entry.name.endsWith('.md')) {
        const rel = path.relative(root, full).replace(/\.md$/, '')
        const link =
          rel === 'README' ? `/${version}/` : `/${version}/${rel.replace(/\/README$/, '')}`
        found.push({ link, text: titleOf(full, rel) })
      }
    }
  }
  walk(root)
  return found
}

/** Prefer the page's own H1, falling back to a tidied filename. */
function titleOf(file: string, rel: string): string {
  try {
    const heading = fs.readFileSync(file, 'utf8').match(/^#\s+(.+)$/m)
    if (heading) return heading[1].trim()
  } catch {
    // fall through to the filename
  }
  const base = rel.replace(/\/?README$/, '').split('/').pop() || 'Overview'
  return base.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/** Collect every link already present in a sidebar tree. */
function linksIn(items: DefaultTheme.SidebarItem[], acc = new Set<string>()): Set<string> {
  for (const item of items) {
    if (typeof item.link === 'string') acc.add(item.link.replace(/\/$/, ''))
    if (Array.isArray(item.items)) linksIn(item.items, acc)
  }
  return acc
}

/**
 * Sidebar map covering every version directory.
 *
 * Curated sidebars are pruned so they cannot advertise pages the version does
 * not have; derived ones are retargeted from the nearest curated sidebar. Either
 * way, any page the result misses is appended, grouped by its directory — the
 * old releases predate the current docs layout, so retargeting 1.3.1's shape at
 * 0.8.0 matched only two of its nineteen pages.
 */
export const versionSidebars: SidebarConfig = Object.fromEntries(
  VERSION_ORDER.map(version => {
    const source = sidebars[`/${version}/`] ?? sidebars[`/${nearestCuratedVersion(version)}/`]
    const items = retarget(source, version)

    const linked = linksIn(items)
    const missing = pagesOf(version).filter(p => !linked.has(p.link.replace(/\/$/, '')))

    const groups = new Map<string, { text: string; link: string }[]>()
    for (const page of missing) {
      const rel = page.link.replace(`/${version}/`, '').replace(/\/$/, '')
      const group = rel.includes('/') ? rel.split('/')[0] : ''
      const label = group ? group.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'More'
      if (!groups.has(label)) groups.set(label, [])
      groups.get(label)!.push({ text: page.text, link: page.link })
    }

    for (const [text, pages] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
      const sorted = pages.sort((a, b) => a.text.localeCompare(b.text))
      // Fold into a curated group of the same name rather than rendering a
      // second one beside it.
      const existing = items.find(item => item.text === text && Array.isArray(item.items))
      if (existing) existing.items!.push(...sorted)
      else items.push({ text, collapsed: true, items: sorted })
    }

    return [`/${version}/`, items]
  })
)
