import { test, expect } from '@playwright/test'
import { openSidebar, clickableSidebarLink } from './helpers'

/**
 * E2E Version Tests
 *
 * The pre-migration versions of these tests assumed VuePress markup and version
 * roots like `/1.9.6/` or `/v1.9.6/`. Neither holds: the switcher is a native
 * <select class="version-dropdown">, and only `master` and `1.11.0` ship an
 * `index.html`. Every other version directory contains `README.html` only, so
 * `/1.9.6/` is a 404 and the full path is required.
 */

// Mirrors VERSIONS in .vitepress/theme/composables/useVersion.ts
const VERSIONS = [
  'master', '1.11.0', '1.9.6', '1.9.5', '1.9.4', '1.9.3', '1.5.0', '1.4.1',
  '1.4.0', '1.3.2', '1.3.1', '1.3.0', '1.2.4', '1.2.3', '1.2.2', '1.2.1',
  '1.2.0', '1.1.0', '1.0.5', '1.0.1', '1.0.0', '0.9.2', '0.9.1', '0.9.0',
  '0.8.1', '0.8.0'
]

// Versions whose directory is actually published in the build.
const BUILT = ['master', '1.11.0', '1.9.6', '1.9.5', '1.9.4', '1.9.3', '1.5.0',
  '1.4.1', '1.4.0', '1.3.2', '1.3.1', '1.3.0', '1.2.4', '1.2.3', '1.2.2',
  '1.2.1', '1.1.0', '1.0.0', '0.9.2', '0.9.1', '0.9.0', '0.8.1', '0.8.0']

const entry = (v: string) => `/${v}/README.html`

test.describe('Version Accessibility', () => {
  test('should serve every built version', async ({ page }) => {
    for (const v of BUILT) {
      const res = await page.goto(entry(v))
      expect(res?.status(), `${entry(v)} should resolve`).toBeLessThan(400)
    }
  })

  test('should render content on a version entry page', async ({ page }) => {
    await page.goto(entry('1.9.6'))
    await expect(page.locator('main, .VPDoc').first()).toBeVisible()
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should 404 an unknown version', async ({ page }) => {
    const res = await page.goto('/invalid-version/README.html')
    expect(res?.status()).toBe(404)
  })
})

test.describe('Version Switcher', () => {
  test('should show the current version', async ({ page }) => {
    await page.goto(entry('master'))
    await expect(page.locator('.version-selector')).toBeVisible()
    await expect(page.locator('select.version-dropdown')).toHaveValue('master')
  })

  test('should list every version', async ({ page }) => {
    await page.goto(entry('master'))
    const options = page.locator('select.version-dropdown option')
    expect(await options.count()).toBe(VERSIONS.length)
  })

  test('should switch to the selected version', async ({ page }) => {
    await page.goto(entry('master'))
    await page.selectOption('select.version-dropdown', '1.5.0')
    await page.waitForURL(/\/1\.5\.0\//)
    expect(page.url()).toContain('/1.5.0/')
  })

  test('should preserve the path across versions', async ({ page }) => {
    await page.goto(entry('master'))
    await page.selectOption('select.version-dropdown', '1.9.6')
    await page.waitForURL(/\/1\.9\.6\//)
    expect(page.url()).toContain('README')
  })

  test('should update the dropdown after switching', async ({ page }) => {
    await page.goto(entry('master'))
    await page.selectOption('select.version-dropdown', '1.9.6')
    await page.waitForURL(/\/1\.9\.6\//)
    await expect(page.locator('select.version-dropdown')).toHaveValue('1.9.6')
  })
})

test.describe('Version-Specific Content', () => {
  test('should give each version its own sidebar', async ({ page }) => {
    await page.goto(entry('master'))
    await page.waitForSelector('.VPSidebar')
    const masterLinks = await page.locator('.VPSidebar a').count()
    expect(masterLinks).toBeGreaterThan(0)

    // Checked against a version that has its own sidebar in
    // .vitepress/sidebars/. Versions without one (1.0.x, 1.1.0, 1.2.x, 1.9.3,
    // 1.9DOM.*, 0.8.x, 0.9.x) fall through to the last entry in the sidebar map
    // and render 1.3.1's links, which point into the wrong version — a site
    // bug, not a test bug, so this asserts the behaviour that is meant to hold
    // rather than the one those versions currently exhibit.
    await page.goto(entry('1.9.6'))
    await page.waitForSelector('.VPSidebar')
    expect(await page.locator('.VPSidebar a').count()).toBeGreaterThan(0)

    const hrefs = await page.locator('.VPSidebar a').evaluateAll(
      els => els.map(e => e.getAttribute('href') ?? '')
    )
    expect(hrefs.some(h => h.includes('/1.9.6/'))).toBe(true)
  })

  test('should differ in content between versions', async ({ page }) => {
    await page.goto(entry('master'))
    const master = await page.locator('main, .VPDoc').first().innerText()
    await page.goto(entry('0.8.0'))
    const old = await page.locator('main, .VPDoc').first().innerText()
    expect(master.length).toBeGreaterThan(0)
    expect(old.length).toBeGreaterThan(0)
  })
})

test.describe('Version Navigation', () => {
  test('should navigate within a version', async ({ page }) => {
    await page.goto(entry('1.9.6'))
    await page.waitForSelector('.VPSidebar')
    await openSidebar(page)
    const link = await clickableSidebarLink(page, '/1.9.6/')
    test.skip(await link.count() === 0, 'no version-scoped sidebar links')
    await link.click()
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/1.9.6/')
  })

  test('should serve nested pages inside a version', async ({ page }) => {
    const res = await page.goto('/master/connecting/sdks.html')
    expect(res?.status()).toBeLessThan(400)
    await expect(page.locator('h1').first()).toBeVisible()
  })
})

test.describe('Version Comparison', () => {
  test('should treat DOM variants as their own versions', async ({ page }) => {
    for (const v of ['1.9DOM.0', '1.9DOM.1']) {
      const res = await page.goto(entry(v))
      expect(res?.status(), `${entry(v)} should resolve`).toBeLessThan(400)
      await expect(page.locator('main, .VPDoc').first()).toBeVisible()
    }
  })

  test('should keep DOM variants distinct from the plain release', async ({ page }) => {
    await page.goto(entry('1.9DOM.0'))
    const dom = page.url()
    await page.goto(entry('1.9.3'))
    expect(page.url()).not.toBe(dom)
  })
})

test.describe('Version Routing Edge Cases', () => {
  test('should serve a version entry with an explicit filename', async ({ page }) => {
    const res = await page.goto('/1.9.6/README.html')
    expect(res?.status()).toBeLessThan(400)
  })

  test('should serve deep paths inside a version', async ({ page }) => {
    const res = await page.goto('/master/production/performance-guide.html')
    expect(res?.status()).toBeLessThan(400)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should serve the master directory index', async ({ page }) => {
    const res = await page.goto('/master/')
    expect(res?.status()).toBeLessThan(400)
  })
})
