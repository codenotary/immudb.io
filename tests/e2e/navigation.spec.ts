import { test, expect } from '@playwright/test'
import { openSidebar, clickableSidebarLink } from './helpers'

/**
 * E2E Navigation Tests
 *
 * These target the VitePress theme. The pre-migration versions of these tests
 * used VuePress selectors (`.sidebar`, `.versions-dropdown`, `.page`) and pages
 * that do not exist in this site (`/master/quickstart`), so every one of them
 * timed out. Selectors below are the ones the built site actually emits.
 *
 * Note on URLs: only `master` and `1.11.0` ship an `index.html`. Every other
 * version directory contains `README.html` only, so `/1.9.6/` is a 404 and
 * version-scoped paths must be spelled out in full.
 */

const MASTER_PAGE = '/master/README.html'

test.describe('Basic Navigation', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/immudb/)
  })

  test('should redirect root to master version', async ({ page }) => {
    await page.goto('/')
    await page.waitForURL(/\/master\//)
    expect(page.url()).toContain('/master/')
  })

  test('should render the sidebar with links', async ({ page }) => {
    await page.goto('/master/')
    await page.waitForSelector('.VPSidebar')
    expect(await page.locator('.VPSidebar a').count()).toBeGreaterThan(0)
  })

  test('should navigate using the sidebar', async ({ page }) => {
    await page.goto('/master/')
    await page.waitForSelector('.VPSidebar')
    await openSidebar(page)

    // Take a sidebar link that goes somewhere other than the current page.
    const link = await clickableSidebarLink(page, '/master/')
    const href = await link.getAttribute('href')
    await link.click()
    await page.waitForLoadState('networkidle')

    expect(page.url()).toContain('/master/')
    expect(page.url()).toContain((href ?? '').replace(/\.html$/, ''))
  })

  test('should mark the current page in the sidebar', async ({ page }) => {
    await page.goto('/master/connecting/sdks.html')
    await page.waitForSelector('.VPSidebar')
    await expect(page.locator('.VPSidebar a.active, .VPSidebar .is-active').first()).toBeVisible()
  })
})

test.describe('Version Switching', () => {
  // The switcher builds `/<version>/<path-without-version>`, so it only lands on
  // a real page when the current path has a segment after the version.
  test('should switch version using the dropdown', async ({ page }) => {
    await page.goto(MASTER_PAGE)
    await page.selectOption('select.version-dropdown', '1.9.6')
    await page.waitForURL(/\/1\.9\.6\//)
    expect(page.url()).toContain('/1.9.6/')
  })

  test('should preserve the page path when switching versions', async ({ page }) => {
    await page.goto(MASTER_PAGE)
    await page.selectOption('select.version-dropdown', '1.9.6')
    await page.waitForURL(/\/1\.9\.6\//)
    expect(page.url()).toContain('README')
  })

  test('should reflect the current version in the dropdown', async ({ page }) => {
    await page.goto('/1.9.6/README.html')
    await expect(page.locator('select.version-dropdown')).toHaveValue('1.9.6')
  })

  test('should keep a populated sidebar after switching', async ({ page }) => {
    await page.goto(MASTER_PAGE)
    await page.selectOption('select.version-dropdown', '1.9.6')
    await page.waitForURL(/\/1\.9\.6\//)
    await page.waitForSelector('.VPSidebar')
    expect(await page.locator('.VPSidebar a').count()).toBeGreaterThan(0)
  })
})

test.describe('Search Navigation', () => {
  // Search is only configured when ALGOLIA_API_KEY is present at build time
  // (see config.mts), so a local build without secrets ships no search UI.
  test('should expose search when it is configured', async ({ page }) => {
    await page.goto('/master/')
    const search = page.locator('.VPNavBarSearch button, .DocSearch-Button').first()
    test.skip(await search.count() === 0, 'site built without ALGOLIA_API_KEY')
    await expect(search).toBeVisible()
  })
})

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('should open the nav screen from the hamburger', async ({ page }) => {
    await page.goto('/master/')
    await page.locator('.VPNavBarHamburger').click()
    await expect(page.locator('.VPNavScreen')).toBeVisible()
  })

  test('should offer reachable links in the nav screen', async ({ page }) => {
    await page.goto('/master/')
    await page.locator('.VPNavBarHamburger').click()
    const link = page.locator('.VPNavScreenMenuLink, .VPNavScreenMenuGroupLink').first()
    await expect(link).toBeVisible()
    await link.click() // must not be intercepted by the backdrop
  })
})

test.describe('Link Validation', () => {
  test('should give external links a safe rel', async ({ page }) => {
    await page.goto(MASTER_PAGE)
    const external = page.locator('a[href^="http"]:not([href*="localhost"])')
    const count = await external.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < Math.min(count, 10); i++) {
      const rel = (await external.nth(i).getAttribute('rel')) ?? ''
      const target = await external.nth(i).getAttribute('target')
      // Only links that open a new tab can leak window.opener.
      if (target === '_blank') expect(rel).toMatch(/noopener|noreferrer/)
    }
  })

  test('should resolve in-page hash links', async ({ page }) => {
    await page.goto('/master/connecting/sdks.html')
    const anchor = page.locator('.vp-doc a[href^="#"]').first()
    test.skip(await anchor.count() === 0, 'page has no in-content anchors')
    const href = await anchor.getAttribute('href')
    await anchor.click()
    expect(page.url()).toContain(href ?? '#')
  })
})

test.describe('Performance', () => {
  test('should load a page within budget', async ({ page }) => {
    const start = Date.now()
    await page.goto(MASTER_PAGE, { waitUntil: 'domcontentloaded' })
    expect(Date.now() - start).toBeLessThan(10000)
  })

  test('should navigate between pages within budget', async ({ page }) => {
    await page.goto('/master/')
    await page.waitForSelector('.VPSidebar')
    await openSidebar(page)
    const link = await clickableSidebarLink(page, '/master/')
    const start = Date.now()
    await link.click()
    await page.waitForLoadState('domcontentloaded')
    expect(Date.now() - start).toBeLessThan(10000)
  })
})
