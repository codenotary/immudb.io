/**
 * Dynamic Sidebar Composable
 * Provides version-aware sidebar functionality for VitePress
 */
import { computed } from 'vue'
import { useRoute, useData } from 'vitepress'

export function useDynamicSidebar() {
  const route = useRoute()
  const { theme } = useData()

  /**
   * Get the current version from the route path
   */
  const currentVersion = computed(() => {
    const path = route.path
    const match = path.match(/^\/(v[\d.]+|master)\//)
    return match ? match[1] : 'master'
  })

  /**
   * Get the sidebar items for the current version
   */
  const currentSidebar = computed(() => {
    const version = currentVersion.value
    const versionPath = `/${version}/`
    return theme.value.sidebar?.[versionPath] || []
  })

  /**
   * Check if sidebar should be displayed
   */
  const hasSidebar = computed(() => {
    return currentSidebar.value.length > 0
  })

  return {
    currentVersion,
    currentSidebar,
    hasSidebar
  }
}
