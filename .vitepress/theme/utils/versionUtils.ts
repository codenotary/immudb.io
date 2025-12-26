/**
 * Version utility functions for path manipulation
 */

import type { Route } from 'vitepress'
import { versions, getDefaultVersion } from './versions'

/**
 * Get version from route
 */
export function getVersionFromRoute(route: Route | { path?: string; fullPath?: string }): string | undefined {
  const path = route.fullPath || route.path || ''
  const matches = path.match(/[^\/]+/)

  if (!matches) return undefined

  const [possibleVersion] = matches
  return versions.includes(possibleVersion) ? possibleVersion : undefined
}

/**
 * Switch version in path while preserving the rest of the path
 * Example: /1.9.4/docs/guide.html -> /master/docs/guide.html
 */
export function switchVersionInPath(currentPath: string, newVersion: string): string {
  const currentVersion = getVersionFromRoute({ path: currentPath })

  if (!currentVersion) {
    // If no version in path, prepend new version
    return `/${newVersion}${currentPath.startsWith('/') ? '' : '/'}${currentPath}`
  }

  // Replace current version with new version
  const versionPattern = new RegExp(`^/${currentVersion}(/|$)`)
  return currentPath.replace(versionPattern, `/${newVersion}$1`)
}

/**
 * Get base path without version
 */
export function getPathWithoutVersion(path: string): string {
  const version = getVersionFromRoute({ path })

  if (!version) return path

  const versionPattern = new RegExp(`^/${version}(/|$)`)
  return path.replace(versionPattern, '/')
}

/**
 * Add version to path
 */
export function addVersionToPath(path: string, version: string): string {
  const currentVersion = getVersionFromRoute({ path })

  if (currentVersion) {
    // Already has a version, switch it
    return switchVersionInPath(path, version)
  }

  // Add version to path
  return `/${version}${path.startsWith('/') ? '' : '/'}${path}`
}

/**
 * Check if path has version
 */
export function pathHasVersion(path: string): boolean {
  return getVersionFromRoute({ path }) !== undefined
}

/**
 * Normalize version path (ensure leading slash, version prefix)
 */
export function normalizeVersionPath(path: string, version?: string): string {
  const ver = version || getVersionFromRoute({ path }) || 'master'
  const pathWithoutVersion = getPathWithoutVersion(path)

  return addVersionToPath(pathWithoutVersion, ver)
}
