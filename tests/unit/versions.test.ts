import { describe, it, expect, beforeEach } from 'vitest'

/**
 * Multi-Version System Tests
 *
 * Validates version routing and switching functionality:
 * - Version detection from URL
 * - Dynamic sidebar loading per version
 * - Version switcher preserves page path
 * - All 24 versions are accessible
 * - Version-specific content loading
 */

// Mock version configuration
const VERSIONS = [
  '0.8.0', '0.8.1', '0.9.0', '0.9.1', '0.9.2',
  '1.0.0', '1.1.0', '1.2.1', '1.2.2', '1.2.3', '1.2.4',
  '1.3.0', '1.3.1', '1.3.2', '1.4.0', '1.4.1', '1.5.0',
  '1.9.3', '1.9.4', '1.9.5', '1.9.6',
  '1.9DOM.0', '1.9DOM.1', 'master'
]

const SIDEBAR_CONFIGS = {
  'master': 'sidebar_master',
  'v1_3_1': 'sidebar_v1_3_1',
  'v1_9DOM_0': 'sidebar_v1_9DOM_0',
  'before_v1_3_1': 'sidebar_before_v1_3_1'
}

/**
 * Helper function to detect version from URL path
 */
function getVersionFromPath(path: string): string | null {
  const match = path.match(/^\/([^\/]+)/)
  if (match && VERSIONS.includes(match[1])) {
    return match[1]
  }
  return null
}

/**
 * Helper function to get sidebar config for version
 */
function getSidebarConfig(version: string): string {
  // Normalize version to config key
  const normalized = version.replace(/\./g, '_')

  // Map version to sidebar config
  if (version === 'master') return SIDEBAR_CONFIGS.master
  if (version.startsWith('1.9DOM')) return SIDEBAR_CONFIGS.v1_9DOM_0
  if (compareVersion(version, '1.3.1') >= 0) return SIDEBAR_CONFIGS.v1_3_1
  return SIDEBAR_CONFIGS.before_v1_3_1
}

/**
 * Helper to compare version strings
 */
function compareVersion(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number)
  const parts2 = v2.split('.').map(Number)

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0
    const p2 = parts2[i] || 0
    if (p1 !== p2) return p1 - p2
  }
  return 0
}

/**
 * Helper to switch version while preserving page path
 */
function switchVersion(currentPath: string, newVersion: string): string {
  const currentVersion = getVersionFromPath(currentPath)
  if (!currentVersion) {
    return `/${newVersion}/`
  }

  const pagePath = currentPath.replace(`/${currentVersion}`, '')
  return `/${newVersion}${pagePath}`
}

describe('Version Detection', () => {
  it('should detect version from URL path', () => {
    expect(getVersionFromPath('/master/quickstart')).toBe('master')
    expect(getVersionFromPath('/1.9.6/introduction')).toBe('1.9.6')
    expect(getVersionFromPath('/1.9DOM.0/features')).toBe('1.9DOM.0')
  })

  it('should return null for invalid version paths', () => {
    expect(getVersionFromPath('/invalid/page')).toBe(null)
    expect(getVersionFromPath('/blog/post')).toBe(null)
    expect(getVersionFromPath('/')).toBe(null)
  })

  it('should handle all 24 versions', () => {
    VERSIONS.forEach(version => {
      const path = `/${version}/index.html`
      expect(getVersionFromPath(path)).toBe(version)
    })
  })

  it('should handle version paths with query params', () => {
    expect(getVersionFromPath('/master/quickstart?search=query')).toBe('master')
  })

  it('should handle version paths with hash', () => {
    expect(getVersionFromPath('/1.9.6/features#section')).toBe('1.9.6')
  })
})

describe('Sidebar Configuration', () => {
  it('should load correct sidebar for master', () => {
    expect(getSidebarConfig('master')).toBe('sidebar_master')
  })

  it('should load v1_3_1 sidebar for versions >= 1.3.1', () => {
    expect(getSidebarConfig('1.3.1')).toBe('sidebar_v1_3_1')
    expect(getSidebarConfig('1.4.0')).toBe('sidebar_v1_3_1')
    expect(getSidebarConfig('1.9.6')).toBe('sidebar_v1_3_1')
  })

  it('should load old sidebar for versions < 1.3.1', () => {
    expect(getSidebarConfig('1.0.0')).toBe('sidebar_before_v1_3_1')
    expect(getSidebarConfig('1.2.4')).toBe('sidebar_before_v1_3_1')
  })

  it('should load DOM sidebar for 1.9DOM versions', () => {
    expect(getSidebarConfig('1.9DOM.0')).toBe('sidebar_v1_9DOM_0')
    expect(getSidebarConfig('1.9DOM.1')).toBe('sidebar_v1_9DOM_0')
  })
})

describe('Version Switching', () => {
  it('should preserve page path when switching versions', () => {
    expect(switchVersion('/master/quickstart', '1.9.6')).toBe('/1.9.6/quickstart')
    expect(switchVersion('/1.9.6/features', 'master')).toBe('/master/features')
  })

  it('should handle nested page paths', () => {
    expect(switchVersion('/master/develop/sql', '1.9.6')).toBe('/1.9.6/develop/sql')
  })

  it('should handle switching from root to version', () => {
    expect(switchVersion('/', 'master')).toBe('/master/')
  })

  it('should handle version switching with hash', () => {
    const newPath = switchVersion('/master/quickstart#install', '1.9.6')
    expect(newPath).toContain('/1.9.6/quickstart')
  })

  it('should switch between all version combinations', () => {
    const testVersions = ['master', '1.9.6', '1.9.5', '1.9DOM.0']
    const testPage = '/quickstart'

    testVersions.forEach(fromVersion => {
      testVersions.forEach(toVersion => {
        if (fromVersion !== toVersion) {
          const result = switchVersion(`/${fromVersion}${testPage}`, toVersion)
          expect(result).toBe(`/${toVersion}${testPage}`)
        }
      })
    })
  })
})

describe('Version Comparison', () => {
  it('should compare version strings correctly', () => {
    expect(compareVersion('1.9.6', '1.9.5')).toBeGreaterThan(0)
    expect(compareVersion('1.9.5', '1.9.6')).toBeLessThan(0)
    expect(compareVersion('1.9.6', '1.9.6')).toBe(0)
  })

  it('should handle different version lengths', () => {
    expect(compareVersion('1.9', '1.9.0')).toBe(0)
    expect(compareVersion('2.0', '1.9.6')).toBeGreaterThan(0)
  })

  it('should sort versions correctly', () => {
    const unsorted = ['1.9.6', '1.9.4', '1.9.5', '1.9.3']
    const sorted = unsorted.sort(compareVersion)
    expect(sorted).toEqual(['1.9.3', '1.9.4', '1.9.5', '1.9.6'])
  })
})

describe('Version Routes', () => {
  it('should generate valid routes for all versions', () => {
    VERSIONS.forEach(version => {
      const routes = [
        `/${version}/`,
        `/${version}/quickstart`,
        `/${version}/features`,
        `/${version}/develop/sql`
      ]

      routes.forEach(route => {
        expect(getVersionFromPath(route)).toBe(version)
      })
    })
  })

  it('should handle index pages for all versions', () => {
    VERSIONS.forEach(version => {
      const indexRoute = `/${version}/index.html`
      expect(getVersionFromPath(indexRoute)).toBe(version)
    })
  })
})

describe('Version Metadata', () => {
  it('should have 24 total versions', () => {
    expect(VERSIONS).toHaveLength(24)
  })

  it('should include all major versions', () => {
    const majorVersions = ['0.8.0', '0.9.0', '1.0.0', '1.1.0', '1.2.1', '1.3.0', '1.4.0', '1.5.0', '1.9.3', 'master']
    majorVersions.forEach(version => {
      expect(VERSIONS).toContain(version)
    })
  })

  it('should include DOM variants', () => {
    expect(VERSIONS).toContain('1.9DOM.0')
    expect(VERSIONS).toContain('1.9DOM.1')
  })

  it('should have master as latest development version', () => {
    expect(VERSIONS).toContain('master')
  })
})
