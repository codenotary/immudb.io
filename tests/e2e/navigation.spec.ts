import { test, expect, type Page } from '@playwright/test'

/**
 * End-to-end coverage for the Hugo site.
 *
 * These replace the VitePress-era specs, which asserted on `.VPSidebar`, the
 * version dropdown and a root redirect — none of which exist any more. The site
 * is now a plain static build: the rail is server-rendered, `/` is a real page,
 * and the only client-side behaviour is the theme switch, the tab groups, the
 * copy button and search.
 */

const DOC_PAGE = '/develop/reading/'

/** Below `lg` the rail sits behind a disclosure; on a wide window this is a no-op. */
async function openRail(page: Page) {
  const summary = page.locator('nav[aria-label="Main"] summary')
  if (await summary.isVisible()) await summary.click()
}

test.describe('Pages and navigation', () => {
  test('the home page is the overview, not a redirect', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/immudb/)
    await expect(page.locator('h1')).toBeVisible()
    // The old site served a meta-refresh stub here.
    expect(page.url()).toMatch(/\/$/)
  })

  test('the rail lists every group and navigates', async ({ page }) => {
    await page.goto('/')
    const rail = page.locator('nav[aria-label="Main"]')
    await expect(rail.locator('[role="group"]')).toHaveCount(11)
    await openRail(page)

    await rail.getByRole('link', { name: 'Replication', exact: true }).click()
    await expect(page).toHaveURL(/\/production\/replication\/$/)
    await expect(page.locator('h1')).toContainText('Replication')
  })

  test('the current page is marked in the rail', async ({ page }) => {
    await page.goto(DOC_PAGE)
    const current = page.locator('nav[aria-label="Main"] a[aria-current="page"]')
    await expect(current).toHaveCount(1)
    await expect(current).toHaveAttribute('href', DOC_PAGE)
  })

  test('previous and next follow the rail order', async ({ page }) => {
    await page.goto(DOC_PAGE)
    const pagination = page.getByRole('navigation', { name: 'Pagination' })
    await expect(pagination.getByRole('link')).toHaveCount(2)
    await pagination.getByRole('link').last().click()
    await expect(page).toHaveURL(/\/develop\/queries-history\/$/)
  })

  test('an old /master/ URL still points at its page', async ({ request }) => {
    // Hugo writes an alias as a meta-refresh to the page's absolute permalink,
    // which is the production host. Following it locally would leave the site
    // under test, so this checks the stub rather than the navigation.
    const response = await request.get('/master/develop/reading/')
    expect(response.status()).toBe(200)
    expect(await response.text()).toContain('https://docs.immudb.io/develop/reading/')
  })

  test('an unknown path serves the 404 page', async ({ page }) => {
    const response = await page.goto('/1.9.6/README.html')
    expect(response?.status()).toBe(404)
  })
})

test.describe('Migrated markup', () => {
  test('tab groups render as tabs, not as literal colons', async ({ page }) => {
    await page.goto(DOC_PAGE)
    const group = page.locator('.tabs').first()
    await expect(group).toHaveAttribute('data-enhanced', 'true')

    const tabs = group.getByRole('tab')
    expect(await tabs.count()).toBeGreaterThan(1)
    await expect(group.locator('.tab-panel:not([hidden])')).toHaveCount(1)

    // The bug this migration exists to fix.
    await expect(page.locator('body')).not.toContainText(':::')
    await expect(page.locator('body')).not.toContainText('<<< @')
  })

  test('the chosen language persists to the next page', async ({ page }) => {
    await page.goto(DOC_PAGE)
    await page.locator('.tabs').first().getByRole('tab', { name: 'Java' }).click()

    await page.goto('/develop/transactions/')
    const active = page.locator('.tabs').first().locator('[role="tab"][aria-selected="true"]')
    await expect(active).toHaveText('Java')
  })

  test('without JavaScript the panels stack under readable labels', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto(DOC_PAGE)

    const group = page.locator('.tabs').first()
    await expect(group).not.toHaveAttribute('data-enhanced', 'true')
    // Every panel is present and labelled, so the page still reads.
    const panels = group.locator('.tab-panel')
    expect(await panels.count()).toBeGreaterThan(1)
    await expect(panels.first().locator('.tab-fallback-label')).toBeVisible()
    await context.close()
  })

  test('code snippets are included, not left as an include directive', async ({ page }) => {
    await page.goto(DOC_PAGE)
    const blocks = page.locator('.code-block')
    expect(await blocks.count()).toBeGreaterThan(0)
    await expect(blocks.first().locator('pre')).toBeVisible()
  })

  test('a callout renders as a panel', async ({ page }) => {
    await page.goto('/production/replication/')
    await expect(page.locator('.callout').first()).toBeVisible()
  })
})

test.describe('Theme', () => {
  test('the toggle switches themes and the choice survives a reload', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    await page.locator('[data-theme-toggle]').click()
    await expect(html).toHaveClass(/dark/)

    await page.reload()
    // Applied in <head>, so there is no flash of the wrong theme to catch.
    await expect(html).toHaveClass(/dark/)
  })

  test('the accent stays the same orange in both themes', async ({ page }) => {
    await page.goto('/')
    const accent = () =>
      page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim(),
      )
    const light = await accent()
    await page.locator('[data-theme-toggle]').click()
    expect(await accent()).toBe(light)
    expect(light).toBe('245 147 0')
  })
})

test.describe('Search', () => {
  test('finds the replication page', async ({ page }) => {
    await page.goto('/')
    await page.locator('[data-search-open]').first().click()

    const dialog = page.getByRole('dialog', { name: /search/i })
    await expect(dialog).toBeVisible()
    await dialog.locator('input').fill('replication')

    // Both /production/replication/ and /production/sync-replication/ match the
    // query, and either order is a fine ranking; the page has to be in there.
    const hits = dialog.getByRole('link', { name: /replication/i })
    await expect(hits.first()).toBeVisible({ timeout: 15000 })
    await expect(dialog.locator('a[href="/production/replication/"]')).toHaveCount(1)
  })
})

test.describe('Narrow viewport', () => {
  test.use({ viewport: { width: 375, height: 720 } })

  test('the rail collapses and the band does not cover the content', async ({ page }) => {
    await page.goto(DOC_PAGE)

    const rail = page.locator('nav[aria-label="Main"]')
    const summary = rail.locator('summary')
    await expect(summary).toBeVisible()
    // Collapsed: the group headings are not laid out until it is opened.
    await expect(rail.locator('[role="group"]').first()).toBeHidden()

    await summary.click()
    await expect(rail.locator('[role="group"]').first()).toBeVisible()

    // The page must not scroll sideways at this width.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(1)
  })
})
