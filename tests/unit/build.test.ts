import { describe, it, expect, beforeAll } from 'vitest'
import { execSync } from 'child_process'
import { existsSync, statSync, readdirSync } from 'fs'
import { join } from 'path'

/**
 * Build Process Validation Tests
 *
 * Validates VitePress build configuration and output:
 * - Build completes without errors
 * - Build time is under 60 seconds
 * - Output directory structure is correct
 * - All version builds are present
 * - Bundle size is optimized
 */
describe('VitePress Build Process', () => {
  const buildDir = join(process.cwd(), 'docs')
  let buildTime: number
  let buildSuccess: boolean

  beforeAll(() => {
    const startTime = Date.now()
    try {
      execSync('npm run build', {
        stdio: 'pipe',
        timeout: 120000, // 2 minutes max
      })
      buildSuccess = true
      buildTime = Date.now() - startTime
    } catch (error) {
      buildSuccess = false
      buildTime = Date.now() - startTime
    }
  }, 120000)

  it('should build without errors', () => {
    expect(buildSuccess).toBe(true)
  })

  it('should complete build in under 60 seconds', () => {
    expect(buildTime).toBeLessThan(60000)
  })

  it('should create output directory', () => {
    expect(existsSync(buildDir)).toBe(true)
  })

  it('should generate all required assets', () => {
    const requiredFiles = [
      'index.html',
      'assets',
      '404.html',
    ]

    requiredFiles.forEach(file => {
      const filePath = join(buildDir, file)
      expect(existsSync(filePath)).toBe(true)
    })
  })

  it('should build all 24 versions', () => {
    const versions = [
      '0.8.0', '0.8.1', '0.9.0', '0.9.1', '0.9.2',
      '1.0.0', '1.1.0', '1.2.1', '1.2.2', '1.2.3', '1.2.4',
      '1.3.0', '1.3.1', '1.3.2', '1.4.0', '1.4.1', '1.5.0',
      '1.9.3', '1.9.4', '1.9.5', '1.9.6',
      '1.9DOM.0', '1.9DOM.1', 'master'
    ]

    versions.forEach(version => {
      const versionPath = join(buildDir, version)
      expect(existsSync(versionPath), `Version ${version} should exist`).toBe(true)
    })
  })

  it('should generate optimized JavaScript bundles', () => {
    const assetsDir = join(buildDir, 'assets')
    if (existsSync(assetsDir)) {
      const files = readdirSync(assetsDir)
      const jsFiles = files.filter(f => f.endsWith('.js'))

      expect(jsFiles.length).toBeGreaterThan(0)

      // Check bundle sizes are reasonable (< 500KB for main chunks)
      jsFiles.forEach(file => {
        const filePath = join(assetsDir, file)
        const stats = statSync(filePath)
        const sizeInKB = stats.size / 1024

        // Main app chunks should be under 500KB
        if (file.includes('app')) {
          expect(sizeInKB).toBeLessThan(500)
        }
      })
    }
  })

  it('should generate CSS bundles', () => {
    const assetsDir = join(buildDir, 'assets')
    if (existsSync(assetsDir)) {
      const files = readdirSync(assetsDir)
      const cssFiles = files.filter(f => f.endsWith('.css'))

      expect(cssFiles.length).toBeGreaterThan(0)
    }
  })

  it('should include critical assets (logo, favicon)', () => {
    const criticalAssets = [
      'logo.svg',
      'logo_white.svg',
      'favicon/favicon.ico',
    ]

    criticalAssets.forEach(asset => {
      const assetPath = join(buildDir, asset)
      expect(existsSync(assetPath), `Asset ${asset} should exist`).toBe(true)
    })
  })

  it('should generate sitemap', () => {
    const sitemapPath = join(buildDir, 'sitemap.xml')
    expect(existsSync(sitemapPath)).toBe(true)
  })

  it('should have proper directory structure', () => {
    const requiredDirs = ['assets', 'blog', 'master']

    requiredDirs.forEach(dir => {
      const dirPath = join(buildDir, dir)
      expect(existsSync(dirPath), `Directory ${dir} should exist`).toBe(true)
    })
  })
})
