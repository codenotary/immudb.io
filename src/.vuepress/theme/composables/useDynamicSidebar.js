/**
 * Dynamic Sidebar Composable
 * Vue composable for managing version-aware sidebar configuration
 */

import { computed, ref, watch } from 'vue';
import { loadSidebarItems, getSidebarMetadata } from '../utils/sidebarLoader';
import { extractVersionFromPath } from '../utils/versionUtils';
import { getDefaultVersion } from '../versions';

/**
 * Composable for dynamic sidebar management
 * @param {Object} route - Vue Router route object (reactive)
 * @param {Object} options - Configuration options
 * @returns {Object} Sidebar state and methods
 */
export function useDynamicSidebar(route, options = {}) {
  const {
    autoPreload = true,
    cacheEnabled = true,
    onVersionChange = null
  } = options;

  // Internal state
  const sidebarCache = ref(new Map());
  const currentVersion = ref(null);
  const loading = ref(false);
  const error = ref(null);

  /**
   * Extract version from current route
   */
  const detectedVersion = computed(() => {
    if (!route || !route.path) return getDefaultVersion();

    const version = extractVersionFromPath(route.path);
    return version || getDefaultVersion();
  });

  /**
   * Current sidebar items
   */
  const sidebarItems = computed(() => {
    const version = detectedVersion.value;

    // Check cache first
    if (cacheEnabled && sidebarCache.value.has(version)) {
      return sidebarCache.value.get(version);
    }

    try {
      loading.value = true;
      error.value = null;

      const items = loadSidebarItems(version);

      // Cache the result
      if (cacheEnabled) {
        sidebarCache.value.set(version, items);
      }

      return items;
    } catch (err) {
      console.error(`[useDynamicSidebar] Error loading sidebar for ${version}:`, err);
      error.value = err;
      return [];
    } finally {
      loading.value = false;
    }
  });

  /**
   * Sidebar metadata
   */
  const sidebarMetadata = computed(() => {
    const version = detectedVersion.value;

    try {
      return getSidebarMetadata(version);
    } catch (err) {
      console.error(`[useDynamicSidebar] Error getting metadata for ${version}:`, err);
      return {
        version,
        itemCount: 0,
        maxDepth: 0,
        topLevelItems: 0
      };
    }
  });

  /**
   * Is sidebar loaded
   */
  const isLoaded = computed(() => {
    return !loading.value && sidebarItems.value.length > 0;
  });

  /**
   * Has sidebar error
   */
  const hasError = computed(() => {
    return error.value !== null;
  });

  /**
   * Preload sidebar for a version
   */
  const preloadVersion = (version) => {
    if (cacheEnabled && sidebarCache.value.has(version)) {
      return Promise.resolve(sidebarCache.value.get(version));
    }

    return new Promise((resolve, reject) => {
      try {
        const items = loadSidebarItems(version);
        if (cacheEnabled) {
          sidebarCache.value.set(version, items);
        }
        resolve(items);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Clear cache
   */
  const clearCache = (version = null) => {
    if (version) {
      sidebarCache.value.delete(version);
    } else {
      sidebarCache.value.clear();
    }
  };

  /**
   * Reload current sidebar
   */
  const reloadSidebar = () => {
    const version = detectedVersion.value;
    clearCache(version);
    // Trigger recomputation
    currentVersion.value = version;
  };

  /**
   * Get cache statistics
   */
  const getCacheStats = () => {
    return {
      size: sidebarCache.value.size,
      versions: Array.from(sidebarCache.value.keys()),
      enabled: cacheEnabled
    };
  };

  // Watch for version changes
  watch(detectedVersion, (newVersion, oldVersion) => {
    if (newVersion !== oldVersion) {
      currentVersion.value = newVersion;

      // Call callback if provided
      if (onVersionChange && typeof onVersionChange === 'function') {
        onVersionChange(newVersion, oldVersion);
      }

      // Preload if enabled
      if (autoPreload && !sidebarCache.value.has(newVersion)) {
        preloadVersion(newVersion).catch(err => {
          console.error(`[useDynamicSidebar] Auto-preload failed for ${newVersion}:`, err);
        });
      }
    }
  }, { immediate: true });

  return {
    // State
    sidebarItems,
    sidebarMetadata,
    currentVersion: detectedVersion,
    loading,
    error,
    isLoaded,
    hasError,

    // Methods
    preloadVersion,
    clearCache,
    reloadSidebar,
    getCacheStats
  };
}

/**
 * Simple version for backward compatibility
 * Returns just the sidebar items for current route
 */
export function getCurrentSidebar(route) {
  const version = extractVersionFromPath(route?.path) || getDefaultVersion();
  return loadSidebarItems(version);
}

export default {
  useDynamicSidebar,
  getCurrentSidebar
};
