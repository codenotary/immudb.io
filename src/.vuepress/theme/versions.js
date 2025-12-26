/**
 * Comprehensive Version Configuration
 * Supports all 21 immudb documentation versions
 */

export const VERSION_STATUS = {
  LATEST: 'latest',
  STABLE: 'stable',
  LEGACY: 'legacy',
  DOM: 'dom'
};

/**
 * Complete version metadata for all 21 versions
 */
export const versionMetadata = {
  'master': {
    label: 'master (latest)',
    status: VERSION_STATUS.LATEST,
    releaseDate: null,
    description: 'Development version with latest features',
    isDefault: true,
    order: 1000 // Highest order to appear first
  },
  '1.9.6': {
    label: 'v1.9.6',
    status: VERSION_STATUS.STABLE,
    releaseDate: '2024-12-01',
    description: 'Latest stable release',
    order: 196
  },
  '1.9.5': {
    label: 'v1.9.5',
    status: VERSION_STATUS.STABLE,
    releaseDate: '2024-10-15',
    description: 'Stable release',
    order: 195
  },
  '1.9.4': {
    label: 'v1.9.4',
    status: VERSION_STATUS.STABLE,
    releaseDate: '2024-09-01',
    description: 'Stable release',
    order: 194
  },
  '1.9.3': {
    label: 'v1.9.3',
    status: VERSION_STATUS.STABLE,
    releaseDate: '2024-07-15',
    description: 'Stable release',
    order: 193
  },
  '1.9DOM.1': {
    label: 'v1.9DOM.1',
    status: VERSION_STATUS.DOM,
    releaseDate: '2024-06-01',
    description: 'DOM Edition 1.1',
    order: 191
  },
  '1.9DOM.0': {
    label: 'v1.9DOM.0',
    status: VERSION_STATUS.DOM,
    releaseDate: '2024-05-01',
    description: 'DOM Edition 1.0',
    order: 190
  },
  '1.5.0': {
    label: 'v1.5.0',
    status: VERSION_STATUS.STABLE,
    releaseDate: '2023-12-01',
    description: 'Stable release',
    order: 150
  },
  '1.4.1': {
    label: 'v1.4.1',
    status: VERSION_STATUS.STABLE,
    releaseDate: '2023-10-15',
    description: 'Stable release',
    order: 141
  },
  '1.4.0': {
    label: 'v1.4.0',
    status: VERSION_STATUS.STABLE,
    releaseDate: '2023-09-01',
    description: 'Stable release',
    order: 140
  },
  '1.3.2': {
    label: 'v1.3.2',
    status: VERSION_STATUS.STABLE,
    releaseDate: '2023-06-15',
    description: 'Stable release',
    order: 132
  },
  '1.3.1': {
    label: 'v1.3.1',
    status: VERSION_STATUS.STABLE,
    releaseDate: '2023-05-01',
    description: 'Stable release',
    order: 131
  },
  '1.3.0': {
    label: 'v1.3.0',
    status: VERSION_STATUS.STABLE,
    releaseDate: '2023-04-01',
    description: 'Stable release',
    order: 130
  },
  '1.2.4': {
    label: 'v1.2.4',
    status: VERSION_STATUS.LEGACY,
    releaseDate: '2023-02-15',
    description: 'Legacy version',
    order: 124
  },
  '1.2.3': {
    label: 'v1.2.3',
    status: VERSION_STATUS.LEGACY,
    releaseDate: '2023-01-15',
    description: 'Legacy version',
    order: 123
  },
  '1.2.2': {
    label: 'v1.2.2',
    status: VERSION_STATUS.LEGACY,
    releaseDate: '2022-12-01',
    description: 'Legacy version',
    order: 122
  },
  '1.2.1': {
    label: 'v1.2.1',
    status: VERSION_STATUS.LEGACY,
    releaseDate: '2022-11-01',
    description: 'Legacy version',
    order: 121
  },
  '1.1.0': {
    label: 'v1.1.0',
    status: VERSION_STATUS.LEGACY,
    releaseDate: '2022-09-01',
    description: 'Legacy version',
    order: 110
  },
  '1.0.0': {
    label: 'v1.0.0',
    status: VERSION_STATUS.LEGACY,
    releaseDate: '2022-06-01',
    description: 'First stable release',
    order: 100
  },
  '0.9.2': {
    label: 'v0.9.2',
    status: VERSION_STATUS.LEGACY,
    releaseDate: '2022-03-15',
    description: 'Pre-release version',
    order: 92
  },
  '0.8.1': {
    label: 'v0.8.1',
    status: VERSION_STATUS.LEGACY,
    releaseDate: '2022-01-15',
    description: 'Pre-release version',
    order: 81
  }
};

/**
 * All supported versions in array format (sorted by order)
 * This maintains backward compatibility with existing code
 */
export const versions = Object.keys(versionMetadata)
  .sort((a, b) => versionMetadata[a].order - versionMetadata[b].order);

/**
 * Versions grouped by status for dropdown organization
 */
export const versionsByStatus = {
  [VERSION_STATUS.LATEST]: versions.filter(v => versionMetadata[v].status === VERSION_STATUS.LATEST),
  [VERSION_STATUS.STABLE]: versions.filter(v => versionMetadata[v].status === VERSION_STATUS.STABLE),
  [VERSION_STATUS.DOM]: versions.filter(v => versionMetadata[v].status === VERSION_STATUS.DOM),
  [VERSION_STATUS.LEGACY]: versions.filter(v => versionMetadata[v].status === VERSION_STATUS.LEGACY)
};

/**
 * Get version metadata
 * @param {string} version - Version identifier
 * @returns {Object} Version metadata
 */
export function getVersionMetadata(version) {
  return versionMetadata[version] || null;
}

/**
 * Get version label for display
 * @param {string} version - Version identifier
 * @returns {string} Display label
 */
export function getVersionLabel(version) {
  const metadata = getVersionMetadata(version);
  return metadata ? metadata.label : version;
}

/**
 * Check if version is valid
 * @param {string} version - Version identifier
 * @returns {boolean} True if valid
 */
export function isValidVersion(version) {
  return versions.includes(version);
}

/**
 * Get default version (highest order, usually master)
 * @returns {string} Default version identifier with path format
 */
export function getDefaultVersion() {
  const defaultVer = Object.keys(versionMetadata).find(v => versionMetadata[v].isDefault);
  return '/' + (defaultVer || 'master') + '/';
}

/**
 * Get version from route path
 * @param {Object} route - Vue Router route object
 * @returns {string|null} Version identifier or null
 */
export function getVersionFromRoute(route = { fullPath: '' }) {
  const matches = route.fullPath.match(/[^\/]+/);
  const [version] = matches === null || !versions.includes(matches[0]) ? [] : matches;
  return version; // Return undefined if not found (backward compatible)
}

/**
 * Get next/previous version for navigation
 * @param {string} currentVersion - Current version
 * @param {string} direction - 'next' or 'prev'
 * @returns {string|null} Next/previous version or null
 */
export function getAdjacentVersion(currentVersion, direction = 'next') {
  const currentIndex = versions.indexOf(currentVersion);
  if (currentIndex === -1) return null;

  const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
  return versions[nextIndex] || null;
}

/**
 * Get version status badge color
 * @param {string} version - Version identifier
 * @returns {string} CSS color class
 */
export function getVersionStatusColor(version) {
  const metadata = getVersionMetadata(version);
  if (!metadata) return 'gray';

  switch (metadata.status) {
    case VERSION_STATUS.LATEST:
      return 'green';
    case VERSION_STATUS.STABLE:
      return 'blue';
    case VERSION_STATUS.DOM:
      return 'purple';
    case VERSION_STATUS.LEGACY:
      return 'gray';
    default:
      return 'gray';
  }
}

export default {
  versions,
  versionMetadata,
  versionsByStatus,
  getVersionMetadata,
  getVersionLabel,
  isValidVersion,
  getDefaultVersion,
  getVersionFromRoute,
  getAdjacentVersion,
  getVersionStatusColor,
  VERSION_STATUS
};
