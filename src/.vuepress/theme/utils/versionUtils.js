/**
 * Version Detection and Navigation Utilities
 * Provides helper functions for multi-version documentation system
 */

import {
  versions,
  versionMetadata,
  isValidVersion,
  getVersionFromRoute as getVersionFromRouteBase,
  getDefaultVersion as getDefaultVersionBase
} from '../versions';

/**
 * Extract version from URL path
 * @param {string} path - URL path
 * @returns {string|null} Version identifier or null
 */
export function extractVersionFromPath(path) {
  if (!path) return null;

  const match = path.match(/^\/([\d.DOM]+|master)\//);
  return match && isValidVersion(match[1]) ? match[1] : null;
}

/**
 * Get version from route (wrapper for backward compatibility)
 * @param {Object} route - Vue Router route
 * @returns {string|null} Version identifier
 */
export function getVersionFromRoute(route) {
  return getVersionFromRouteBase(route);
}

/**
 * Get default version (wrapper for backward compatibility)
 * @returns {string} Default version
 */
export function getDefaultVersion() {
  return getDefaultVersionBase();
}

/**
 * Build version-aware path
 * @param {string} version - Version identifier
 * @param {string} pagePath - Page path within version
 * @returns {string} Complete path
 */
export function buildVersionPath(version, pagePath = '') {
  const cleanVersion = version.replace(/^\/|\/$/g, '');
  const cleanPath = pagePath.replace(/^\/|\/$/g, '');

  return `/${cleanVersion}${cleanPath ? '/' + cleanPath : '/'}`;
}

/**
 * Convert current page to different version
 * @param {string} currentPath - Current page path
 * @param {string} targetVersion - Target version
 * @returns {string} New path in target version
 */
export function switchVersionInPath(currentPath, targetVersion) {
  const currentVersion = extractVersionFromPath(currentPath);

  if (!currentVersion) {
    return buildVersionPath(targetVersion);
  }

  // Extract the page path after version
  const pagePath = currentPath.replace(new RegExp(`^/${currentVersion}/?`), '');

  return buildVersionPath(targetVersion, pagePath);
}

/**
 * Check if page exists in version (basic check based on common patterns)
 * @param {string} version - Version identifier
 * @param {string} pagePath - Page path
 * @returns {boolean} Likely existence
 */
export function pageExistsInVersion(version, pagePath) {
  // This is a basic implementation - could be enhanced with actual page manifest
  const metadata = versionMetadata[version];
  if (!metadata) return false;

  // All versions have at least a root page
  if (!pagePath || pagePath === '/' || pagePath === '') {
    return true;
  }

  return true; // Assume page exists, will fall back to version index if not
}

/**
 * Get version comparison result
 * @param {string} version1 - First version
 * @param {string} version2 - Second version
 * @returns {number} -1 if v1 < v2, 0 if equal, 1 if v1 > v2
 */
export function compareVersions(version1, version2) {
  const idx1 = versions.indexOf(version1);
  const idx2 = versions.indexOf(version2);

  if (idx1 === -1 || idx2 === -1) return 0;

  return idx1 < idx2 ? -1 : idx1 > idx2 ? 1 : 0;
}

/**
 * Get versions in range
 * @param {string} minVersion - Minimum version (inclusive)
 * @param {string} maxVersion - Maximum version (inclusive)
 * @returns {Array} Versions in range
 */
export function getVersionsInRange(minVersion, maxVersion) {
  const minIdx = versions.indexOf(minVersion);
  const maxIdx = versions.indexOf(maxVersion);

  if (minIdx === -1 || maxIdx === -1) return [];

  return versions.slice(
    Math.min(minIdx, maxIdx),
    Math.max(minIdx, maxIdx) + 1
  );
}

/**
 * Check if feature exists in version (based on version order)
 * @param {string} currentVersion - Current version
 * @param {string} minRequiredVersion - Minimum version for feature
 * @returns {boolean} True if feature available
 */
export function hasFeature(currentVersion, minRequiredVersion) {
  return compareVersions(currentVersion, minRequiredVersion) >= 0;
}

/**
 * Normalize version string (remove 'v' prefix if present)
 * @param {string} version - Version string
 * @returns {string} Normalized version
 */
export function normalizeVersion(version) {
  return version.replace(/^v/, '');
}

/**
 * Format version for display
 * @param {string} version - Version identifier
 * @param {boolean} includeStatus - Include status badge
 * @returns {string} Formatted version string
 */
export function formatVersionDisplay(version, includeStatus = false) {
  const metadata = versionMetadata[version];
  if (!metadata) return version;

  if (includeStatus && metadata.status) {
    return `${metadata.label} (${metadata.status})`;
  }

  return metadata.label;
}

/**
 * Get URL-safe version identifier
 * @param {string} version - Version string
 * @returns {string} URL-safe version
 */
export function getUrlSafeVersion(version) {
  return version.replace(/\./g, '-').toLowerCase();
}

/**
 * Parse URL-safe version back to standard format
 * @param {string} urlVersion - URL-safe version
 * @returns {string|null} Standard version or null
 */
export function parseUrlVersion(urlVersion) {
  // Try direct match first
  if (isValidVersion(urlVersion)) {
    return urlVersion;
  }

  // Try converting dashes to dots
  const converted = urlVersion.replace(/-/g, '.');
  return isValidVersion(converted) ? converted : null;
}

/**
 * Get version changelog URL
 * @param {string} version - Version identifier
 * @returns {string|null} Changelog URL or null
 */
export function getChangelogUrl(version) {
  if (version === 'master') {
    return 'https://github.com/codenotary/immudb/blob/master/CHANGELOG.md';
  }

  return `https://github.com/codenotary/immudb/releases/tag/v${version}`;
}

/**
 * Get version documentation URL
 * @param {string} version - Version identifier
 * @param {string} page - Optional page path
 * @returns {string} Full documentation URL
 */
export function getVersionDocUrl(version, page = '') {
  const basePath = buildVersionPath(version, page);
  return `${window.location.origin}${basePath}`;
}

/**
 * Detect version from multiple sources
 * @param {Object} context - Vue component context
 * @returns {string} Detected version or default
 */
export function detectVersion(context) {
  // Try route first
  if (context.$route) {
    const routeVersion = getVersionFromRoute(context.$route);
    if (routeVersion) return routeVersion;
  }

  // Try current path
  if (context.$route?.path) {
    const pathVersion = extractVersionFromPath(context.$route.path);
    if (pathVersion) return pathVersion;
  }

  // Fall back to default
  return getDefaultVersion();
}

export default {
  extractVersionFromPath,
  getVersionFromRoute,
  getDefaultVersion,
  buildVersionPath,
  switchVersionInPath,
  pageExistsInVersion,
  compareVersions,
  getVersionsInRange,
  hasFeature,
  normalizeVersion,
  formatVersionDisplay,
  getUrlSafeVersion,
  parseUrlVersion,
  getChangelogUrl,
  getVersionDocUrl,
  detectVersion
};
