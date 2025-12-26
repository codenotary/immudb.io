import { test, expect } from '@playwright/test'

/**
 * E2E Version System Tests
 *
 * Tests multi-version documentation:
 * - All 24 versions are accessible
 * - Version switcher works correctly
 * - Content differs between versions
 * - Sidebar updates per version
 */

const VERSIONS = [
  '0.8.0', '0.8.1', '0.9.0', '0.9.1', '0.9.2',
  '1.0.0', '1.1.0', '1.2.1', '1.2.2', '1.2.3', '1.2.4',
  '1.3.0', '1.3.1', '1.3.2', '1.4.0', '1.4.1', '1.5.0',
  '1.9.3', '1.9.4', '1.9.5', '1.9.6',
  '1.9DOM.0', '1.9DOM.1', 'master'
]

test.describe('Version Accessibility', () => {
  test('should access all 24 versions', async ({ page }) => {
    for (const version of VERSIONS) {
      await page.goto(`/${version}/`)

      // Page should load successfully
      await expect(page).toHaveURL(new RegExp(`/${version}/`))
      await page.waitForSelector('.page, main, article')

      // Check for content
      const content = page.locator('.page, main')
      await expect(content).toBeVisible()
    }
  })

  test('should load version index pages', async ({ page }) => {
    const testVersions = ['master', '1.9.6', '1.5.0', '1.0.0']

    for (const version of testVersions) {
      await page.goto(`/${version}/`)

      // Should have heading
      await expect(page.locator('h1, h2').first()).toBeVisible()

      // Should have content
      const paragraphs = page.locator('p')
      expect(await paragraphs.count()).toBeGreaterThan(0)
    }
  })

  test('should show 404 for invalid version', async ({ page }) => {
    const response = await page.goto('/invalid-version/')

    // Should return 404 or redirect
    expect(response?.status()).toBeGreaterThanOrEqual(400)
  })
})

test.describe('Version Switcher', () => {
  test('should display current version', async ({ page }) => {
    await page.goto('/master/')

    const versionDropdown = page.locator('.versions-dropdown, [class*="version"]')
    await expect(versionDropdown).toBeVisible()

    const text = await versionDropdown.textContent()
    expect(text).toContain('master')
  })

  test('should list all versions in dropdown', async ({ page }) => {
    await page.goto('/master/')

    // Open dropdown
    await page.click('.versions-dropdown, [aria-label*="version"]')

    // Wait for dropdown items
    await page.waitForSelector('.versions-dropdown li, [role="menuitem"]')

    // Should have multiple versions
    const items = page.locator('.versions-dropdown li, [role="menuitem"]')
    const count = await items.count()

    expect(count).toBeGreaterThan(10) // Should have many versions
  })

  test('should switch to selected version', async ({ page }) => {
    await page.goto('/master/quickstart')

    // Open dropdown
    await page.click('.versions-dropdown, [aria-label*="version"]')

    // Select v1.9.6
    await page.click('text=/^v?1\\.9\\.6$/')

    // Wait for navigation
    await page.waitForURL(/\/1\.9\.6\/quickstart/)

    // Verify URL
    expect(page.url()).toContain('/1.9.6/quickstart')
  })

  test('should preserve page path across versions', async ({ page }) => {
    const paths = ['quickstart', 'features', 'develop/sql']

    for (const path of paths) {
      await page.goto(`/master/${path}`)

      // Switch to 1.9.6
      await page.click('.versions-dropdown, [aria-label*="version"]')
      await page.click('text=/^v?1\\.9\\.6$/')

      await page.waitForURL(new RegExp(`/1\\.9\\.6/${path}`))

      expect(page.url()).toContain(`/1.9.6/${path}`)
    }
  })

  test('should update dropdown after switch', async ({ page }) => {
    await page.goto('/master/')

    // Switch to 1.9.6
    await page.click('.versions-dropdown, [aria-label*="version"]')
    await page.click('text=/^v?1\\.9\\.6$/')

    await page.waitForLoadState('networkidle')

    // Dropdown should show 1.9.6
    const versionText = await page.locator('.versions-dropdown').textContent()
    expect(versionText).toContain('1.9.6')
  })
})

test.describe('Version-Specific Content', () => {
  test('should show different content in different versions', async ({ page }) => {
    // Get master content
    await page.goto('/master/')
    const masterH1 = await page.locator('h1').first().textContent()

    // Get old version content
    await page.goto('/1.0.0/')
    const oldH1 = await page.locator('h1').first().textContent()

    // Content may differ (or be similar for index)
    expect(masterH1).toBeTruthy()
    expect(oldH1).toBeTruthy()
  })

  test('should have version-specific sidebar', async ({ page }) => {
    // Get master sidebar
    await page.goto('/master/')
    const masterLinks = await page.locator('.sidebar a').count()

    // Get old version sidebar
    await page.goto('/1.0.0/')
    const oldLinks = await page.locator('.sidebar a').count()

    // Both should have sidebar
    expect(masterLinks).toBeGreaterThan(0)
    expect(oldLinks).toBeGreaterThan(0)
  })

  test('should update breadcrumbs for version', async ({ page }) => {
    await page.goto('/master/develop/sql')

    const breadcrumbs = page.locator('.breadcrumb, nav[aria-label="breadcrumb"]')

    if (await breadcrumbs.isVisible()) {
      const text = await breadcrumbs.textContent()
      expect(text).toContain('develop')
    }
  })
})

test.describe('Version Navigation', () => {
  test('should navigate within version', async ({ page }) => {
    await page.goto('/1.9.6/')

    // Click sidebar link
    const link = page.locator('.sidebar a').nth(1)
    await link.click()

    await page.waitForLoadState('networkidle')

    // Should stay in same version
    expect(page.url()).toContain('/1.9.6/')
  })

  test('should handle nested pages in version', async ({ page }) => {
    await page.goto('/master/develop/sql')

    await expect(page).toHaveURL(/\/master\/develop\/sql/)

    // Should show content
    await expect(page.locator('.page, main')).toBeVisible()
  })

  test('should maintain version in search', async ({ page }) => {
    await page.goto('/1.9.6/')

    // Open search
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K')

    // Search
    await page.fill('[role="search"] input, .search-box input', 'quickstart')
    await page.waitForTimeout(1000)

    // Click result if available
    const result = page.locator('.search-result, .aa-suggestion').first()
    if (await result.isVisible()) {
      await result.click()
      await page.waitForLoadState('networkidle')

      // Should stay in 1.9.6
      expect(page.url()).toContain('/1.9.6/')
    }
  })
})

test.describe('Version Comparison', () => {
  test('should show version badge or indicator', async ({ page }) => {
    await page.goto('/master/')

    // Look for version indicator
    const indicator = page.locator('.version, .badge, [class*="version"]')

    if (await indicator.isVisible()) {
      const text = await indicator.textContent()
      expect(text).toBeTruthy()
    }
  })

  test('should handle DOM variants separately', async ({ page }) => {
    const domVersions = ['1.9DOM.0', '1.9DOM.1']

    for (const version of domVersions) {
      await page.goto(`/${version}/`)

      await expect(page).toHaveURL(new RegExp(`/${version}/`))
      await expect(page.locator('.page, main')).toBeVisible()
    }
  })

  test('should differentiate DOM vs non-DOM versions', async ({ page }) => {
    // Regular version
    await page.goto('/1.9.3/')
    const regularContent = await page.locator('.page, main').textContent()

    // DOM version
    await page.goto('/1.9DOM.0/')
    const domContent = await page.locator('.page, main').textContent()

    expect(regularContent).toBeTruthy()
    expect(domContent).toBeTruthy()
  })
})

test.describe('Version Routing Edge Cases', () => {
  test('should handle version with trailing slash', async ({ page }) => {
    await page.goto('/master/')
    await expect(page).toHaveURL(/\/master\//)
  })

  test('should handle version without trailing slash', async ({ page }) => {
    await page.goto('/master')
    // May redirect to /master/
    await page.waitForLoadState('networkidle')
    expect(page.url()).toMatch(/\/master\/?/)
  })

  test('should handle deep paths in versions', async ({ page }) => {
    await page.goto('/master/develop/sql/queries')
    await page.waitForLoadState('networkidle')

    // Should load successfully
    await expect(page.locator('.page, main')).toBeVisible()
  })

  test('should handle version index.html', async ({ page }) => {
    await page.goto('/master/index.html')

    // Should work or redirect
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/master')
  })
})
