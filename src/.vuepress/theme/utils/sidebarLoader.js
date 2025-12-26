/**
 * Dynamic Sidebar Configuration Loader
 * Loads appropriate sidebar configuration based on version
 */

import { isValidVersion } from '../versions';

// Import all sidebar configurations
import sidebarBeforeV131 from '../../sidebar_before_v1_3_1';
import sidebarV131 from '../../sidebar_v1_3_1';
import sidebarV132 from '../../sidebar_v1_3_2';
import sidebarV140 from '../../sidebar_v1_4_0';
import sidebarV141 from '../../sidebar_v1_4_1';
import sidebarV150 from '../../sidebar_v1_5_0';
import sidebarV19DOM0 from '../../sidebar_v1_9DOM_0';
import sidebarV19DOM1 from '../../sidebar_v1_9DOM_1';
import sidebarMaster from '../../sidebar_master';

/**
 * Sidebar configuration mapping
 * Maps version ranges to their sidebar configurations
 */
const sidebarMap = {
  // Master (latest development)
  'master': sidebarMaster,

  // Recent versions (1.9.x)
  '1.9.6': sidebarMaster, // Use master sidebar for latest stable
  '1.9.5': sidebarMaster,
  '1.9.4': sidebarMaster,
  '1.9.3': sidebarMaster,

  // DOM editions
  '1.9DOM.1': sidebarV19DOM1,
  '1.9DOM.0': sidebarV19DOM0,

  // 1.5.x series
  '1.5.0': sidebarV150,

  // 1.4.x series
  '1.4.1': sidebarV141,
  '1.4.0': sidebarV140,

  // 1.3.x series
  '1.3.2': sidebarV132,
  '1.3.1': sidebarV131,
  '1.3.0': sidebarV131,

  // 1.2.x and earlier
  '1.2.4': sidebarBeforeV131,
  '1.2.3': sidebarBeforeV131,
  '1.2.2': sidebarBeforeV131,
  '1.2.1': sidebarBeforeV131,
  '1.1.0': sidebarBeforeV131,
  '1.0.0': sidebarBeforeV131,
  '0.9.2': sidebarBeforeV131,
  '0.8.1': sidebarBeforeV131
};

/**
 * Get sidebar configuration for a version
 * @param {string} version - Version identifier
 * @returns {Function|null} Sidebar configuration function
 */
export function getSidebarForVersion(version) {
  if (!isValidVersion(version)) {
    console.warn(`[sidebarLoader] Invalid version: ${version}`);
    return null;
  }

  const sidebarConfig = sidebarMap[version];

  if (!sidebarConfig) {
    console.warn(`[sidebarLoader] No sidebar config found for version ${version}, using master`);
    return sidebarMap['master'];
  }

  return sidebarConfig;
}

/**
 * Load sidebar items for a specific version
 * @param {string} version - Version identifier
 * @returns {Array} Sidebar items array
 */
export function loadSidebarItems(version) {
  const sidebarConfig = getSidebarForVersion(version);

  if (!sidebarConfig) {
    return [];
  }

  try {
    // Sidebar configs are functions that accept version and return items
    const versionPath = `/${version}`;
    const items = sidebarConfig(versionPath);

    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error(`[sidebarLoader] Error loading sidebar for ${version}:`, error);
    return [];
  }
}

/**
 * Get sidebar configuration object for VuePress
 * This builds the complete sidebar object with all version paths
 * @returns {Object} Complete sidebar configuration
 */
export function buildCompleteSidebarConfig() {
  const sidebarConfig = {};

  Object.keys(sidebarMap).forEach(version => {
    const versionPath = `/${version}/`;
    const sidebarFunc = sidebarMap[version];

    try {
      sidebarConfig[versionPath] = sidebarFunc(versionPath);
    } catch (error) {
      console.error(`[sidebarLoader] Error building config for ${version}:`, error);
      sidebarConfig[versionPath] = [];
    }
  });

  return sidebarConfig;
}

/**
 * Check if sidebar exists for version
 * @param {string} version - Version identifier
 * @returns {boolean} True if sidebar config exists
 */
export function hasSidebarConfig(version) {
  return version in sidebarMap;
}

/**
 * Get all versions with sidebar configurations
 * @returns {Array} Array of version identifiers
 */
export function getVersionsWithSidebars() {
  return Object.keys(sidebarMap);
}

/**
 * Preload sidebar for version (for performance optimization)
 * @param {string} version - Version to preload
 * @returns {Promise} Promise that resolves when loaded
 */
export async function preloadSidebar(version) {
  return new Promise((resolve) => {
    try {
      const items = loadSidebarItems(version);
      resolve(items);
    } catch (error) {
      console.error(`[sidebarLoader] Error preloading sidebar for ${version}:`, error);
      resolve([]);
    }
  });
}

/**
 * Preload multiple sidebars
 * @param {Array} versions - Array of versions to preload
 * @returns {Promise} Promise that resolves when all loaded
 */
export async function preloadMultipleSidebars(versions) {
  const promises = versions.map(v => preloadSidebar(v));
  return Promise.all(promises);
}

/**
 * Get sidebar metadata (item count, depth, etc.)
 * @param {string} version - Version identifier
 * @returns {Object} Sidebar metadata
 */
export function getSidebarMetadata(version) {
  const items = loadSidebarItems(version);

  const countItems = (items, depth = 0) => {
    let count = 0;
    let maxDepth = depth;

    items.forEach(item => {
      count++;
      if (item.children && Array.isArray(item.children)) {
        const childResult = countItems(item.children, depth + 1);
        count += childResult.count;
        maxDepth = Math.max(maxDepth, childResult.maxDepth);
      }
    });

    return { count, maxDepth };
  };

  const { count, maxDepth } = countItems(items);

  return {
    version,
    itemCount: count,
    maxDepth,
    topLevelItems: items.length
  };
}

export default {
  getSidebarForVersion,
  loadSidebarItems,
  buildCompleteSidebarConfig,
  hasSidebarConfig,
  getVersionsWithSidebars,
  preloadSidebar,
  preloadMultipleSidebars,
  getSidebarMetadata
};
