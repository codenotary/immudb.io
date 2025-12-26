import type { DefaultTheme } from 'vitepress'
import { masterSidebar } from './master'
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
  v196Sidebar,
  v195Sidebar,
  v194Sidebar,
  v150Sidebar,
  v141Sidebar,
  v140Sidebar,
  v132Sidebar,
  v131Sidebar,
}
