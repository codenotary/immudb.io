/**
 * Version Management Composable
 * Handles version detection and switching for multi-version documentation
 */
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vitepress'

/**
 * Available versions in the documentation
 * Must match the directory structure in src/
 */
export const VERSIONS = [
  'master',
  '1.9.6',
  '1.9.5',
  '1.9.4',
  '1.9.3',
  '1.5.0',
  '1.4.1',
  '1.4.0',
  '1.3.2',
  '1.3.1',
  '1.3.0',
  '1.2.4',
  '1.2.3',
  '1.2.2',
  '1.2.1',
  '1.2.0',
  '1.1.0',
  '1.0.5',
  '1.0.1',
  '1.0.0',
  '0.9.2',
  '0.9.1',
  '0.9.0',
  '0.8.1',
  '0.8.0'
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
    const match = path.match(/^\/([^\/]+)\//)
    return (match ? match[1] : 'master') as Version
  })

  /**
   * Get the base path without version
   */
  const basePath = computed(() => {
    const path = route.path
    return path.replace(/^\/[^\/]+\//, '')
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
    if (version === 'master') return 'master (latest)'
    return `v${version}`
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
