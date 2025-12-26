import { test, expect } from '@playwright/test'

/**
 * E2E Navigation Tests
 *
 * Tests user navigation flows:
 * - Page navigation
 * - Version switching
 * - Sidebar navigation
 * - Breadcrumb navigation
 * - Search navigation
 */

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

  test('should navigate to quickstart', async ({ page }) => {
    await page.goto('/master/')
    await page.click('text=Quickstart')
    await expect(page).toHaveURL(/\/master\/quickstart/)
  })

  test('should navigate using sidebar', async ({ page }) => {
    await page.goto('/master/')

    // Wait for sidebar to load
    await page.waitForSelector('.sidebar')

    // Click first sidebar link
    const firstLink = page.locator('.sidebar a').first()
    await firstLink.click()

    // Verify navigation occurred
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/master/')
  })

  test('should show active page in sidebar', async ({ page }) => {
    await page.goto('/master/quickstart')
    await page.waitForSelector('.sidebar')

    const activeLink = page.locator('.sidebar a.active, .sidebar a.router-link-active')
    await expect(activeLink).toBeVisible()
  })
})

test.describe('Version Switching', () => {
  test('should switch versions using dropdown', async ({ page }) => {
    await page.goto('/master/quickstart')

    // Open version dropdown
    await page.click('.versions-dropdown, [aria-label*="version"]')

    // Select different version
    await page.click('text=v1.9.6')

    // Verify URL changed to new version
    await expect(page).toHaveURL(/\/1\.9\.6\/quickstart/)
  })

  test('should preserve page path when switching versions', async ({ page }) => {
    await page.goto('/master/develop/sql')

    // Switch to v1.9.6
    await page.click('.versions-dropdown, [aria-label*="version"]')
    await page.click('text=v1.9.6')

    // Verify path preserved
    await expect(page).toHaveURL(/\/1\.9\.6\/develop\/sql/)
  })

  test('should update sidebar when switching versions', async ({ page }) => {
    await page.goto('/master/')

    // Get master sidebar items
    const masterItems = await page.locator('.sidebar a').count()

    // Switch to older version
    await page.click('.versions-dropdown, [aria-label*="version"]')
    await page.click('text=v1.0.0')

    await page.waitForLoadState('networkidle')

    // Sidebar should update (may have different items)
    const oldVersionItems = await page.locator('.sidebar a').count()
    expect(oldVersionItems).toBeGreaterThan(0)
  })

  test('should switch between all major versions', async ({ page }) => {
    const versions = ['master', 'v1.9.6', 'v1.9.5', 'v1.5.0', 'v1.0.0']

    for (const version of versions) {
      await page.goto(`/${version}/`)
      await expect(page).toHaveURL(new RegExp(`/${version}/`))

      // Verify page loaded
      await page.waitForSelector('.page, main')
    }
  })
})

test.describe('Search Navigation', () => {
  test('should open search on hotkey', async ({ page }) => {
    await page.goto('/master/')

    // Press Ctrl+K or Cmd+K
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K')

    // Search should be visible
    await expect(page.locator('[role="search"], .algolia-search')).toBeVisible()
  })

  test('should search and navigate to result', async ({ page }) => {
    await page.goto('/master/')

    // Open search
    await page.click('.search-box input, [placeholder*="Search"]')

    // Type search query
    await page.fill('.search-box input, [role="search"] input', 'quickstart')
    await page.waitForTimeout(500) // Wait for search results

    // Click first result if available
    const firstResult = page.locator('.algolia-autocomplete .aa-suggestion, .search-result').first()
    if (await firstResult.isVisible()) {
      await firstResult.click()
      await page.waitForLoadState('networkidle')
      expect(page.url()).toBeTruthy()
    }
  })

  test('should close search on escape', async ({ page }) => {
    await page.goto('/master/')

    // Open search
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K')

    // Press escape
    await page.keyboard.press('Escape')

    // Search should be hidden
    const search = page.locator('[role="search"], .algolia-search')
    await expect(search).toBeHidden()
  })
})

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('should toggle mobile sidebar', async ({ page }) => {
    await page.goto('/master/')

    // Open mobile menu
    const menuButton = page.locator('.sidebar-button, [aria-label*="menu"]')
    await menuButton.click()

    // Sidebar should be visible
    await expect(page.locator('.sidebar')).toBeVisible()

    // Close sidebar
    await menuButton.click()
  })

  test('should navigate on mobile', async ({ page }) => {
    await page.goto('/master/')

    // Open mobile menu
    await page.click('.sidebar-button, [aria-label*="menu"]')

    // Click link
    const link = page.locator('.sidebar a').first()
    await link.click()

    // Navigation should occur
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/master/')
  })
})

test.describe('Link Validation', () => {
  test('should have no broken internal links on homepage', async ({ page }) => {
    await page.goto('/master/')

    // Get all internal links
    const links = await page.locator('a[href^="/"]').all()
    const hrefs = await Promise.all(links.map(link => link.getAttribute('href')))

    // Sample check first 10 links
    for (const href of hrefs.slice(0, 10)) {
      if (href && !href.includes('#')) {
        const response = await page.request.get(href)
        expect(response.status()).toBeLessThan(400)
      }
    }
  })

  test('should handle hash links', async ({ page }) => {
    await page.goto('/master/quickstart')

    // Click hash link
    const hashLink = page.locator('a[href^="#"]').first()
    if (await hashLink.isVisible()) {
      const href = await hashLink.getAttribute('href')
      await hashLink.click()

      // Verify scrolled to section
      await page.waitForTimeout(500)
      expect(page.url()).toContain(href || '')
    }
  })

  test('should open external links in new tab', async ({ page }) => {
    await page.goto('/master/')

    // Find external link
    const externalLink = page.locator('a[href^="http"]').first()
    if (await externalLink.isVisible()) {
      const target = await externalLink.getAttribute('target')
      expect(target).toBe('_blank')

      const rel = await externalLink.getAttribute('rel')
      expect(rel).toContain('noopener')
    }
  })
})

test.describe('Performance', () => {
  test('should load page quickly', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/master/')
    const loadTime = Date.now() - startTime

    // Page should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have fast navigation', async ({ page }) => {
    await page.goto('/master/')

    const startTime = Date.now()
    await page.click('text=Quickstart')
    await page.waitForLoadState('networkidle')
    const navTime = Date.now() - startTime

    // Navigation should be fast (under 2 seconds)
    expect(navTime).toBeLessThan(2000)
  })
})
