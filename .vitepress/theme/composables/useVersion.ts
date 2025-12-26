/**
 * Version Management Composable
 * Handles version detection and switching for multi-version documentation
 */
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vitepress'

/**
 * Available versions in the documentation
 */
export const VERSIONS = [
  'master',
  'v1.9DOM.1',
  'v1.9DOM.0',
  'v1.5.0',
  'v1.4.1',
  'v1.4.0',
  'v1.3.2',
  'v1.3.1',
  'v1.3.0',
  'v1.2.4',
  'v1.2.3',
  'v1.2.2',
  'v1.2.1',
  'v1.2.0',
  'v1.1.0',
  'v1.0.5',
  'v1.0.1',
  'v1.0.0',
  'v0.9.2',
  'v0.9.1',
  'v0.9.0',
  'v0.8.1',
  'v0.8.0'
] as const

export type Version = typeof VERSIONS[number]

export function useVersion() {
  const route = useRoute()
  const router = useRouter()

  /**
   * Extract version from current route path
   */
  const currentVersion = computed<Version>(() => {
    const path = route.path
    const match = path.match(/^\/(v[\d.DOM]+|master)\//)
    return (match ? match[1] : 'master') as Version
  })

  /**
   * Get the base path without version
   */
  const basePath = computed(() => {
    const path = route.path
    return path.replace(/^\/(v[\d.DOM]+|master)\//, '')
  })

  /**
   * Switch to a different version
   */
  const switchVersion = (version: Version) => {
    const newPath = `/${version}/${basePath.value}`
    router.go(newPath)
  }

  /**
   * Check if a version is the current one
   */
  const isCurrentVersion = (version: Version) => {
    return version === currentVersion.value
  }

  /**
   * Get version display name
   */
  const getVersionDisplayName = (version: Version) => {
    if (version === 'master') return 'Latest (master)'
    return version
  }

  return {
    currentVersion,
    basePath,
    versions: VERSIONS,
    switchVersion,
    isCurrentVersion,
    getVersionDisplayName
  }
}
