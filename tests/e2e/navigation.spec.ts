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

const DOC_PAGE = '/docs/develop/reading/'

/**
 * Reveal a rail link. Two disclosures now stand between the reader and an item:
 * below `lg` the whole rail is behind a menu, and every section ships collapsed
 * except the one holding the current page.
 */
async function openRail(page: Page, group?: string) {
  const root = page.locator('[data-rail-root]')
  const rootSummary = page.locator('[data-rail-root] > summary')
  // Idempotent: without JavaScript the menu already ships open, so an
  // unconditional click would close it.
  if ((await rootSummary.isVisible()) && !(await root.evaluate((e: HTMLDetailsElement) => e.open))) {
    await rootSummary.click()
  }
  if (group) {
    const section = page.locator(`[data-rail-group="${group}"]`)
    if (!(await section.evaluate((e: HTMLDetailsElement) => e.open))) {
      await section.locator('summary').click()
    }
  }
}

test.describe('Pages and navigation', () => {
  test('the home page is the marketing site, not the docs', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/immudb/)
    await expect(page.locator('h1')).toBeVisible()
    // The docs rail belongs to /docs/ only.
    await expect(page.locator('nav[aria-label="Main"]')).toHaveCount(0)
    await expect(page.getByRole('link', { name: 'Get started' }).first()).toBeVisible()
  })

  test('the docs landing page is under /docs/', async ({ page }) => {
    const response = await page.goto('/docs/')
    expect(response?.status()).toBe(200)
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible()
  })

  test('the rail lists every group and navigates', async ({ page }) => {
    await page.goto('/docs/')
    const rail = page.locator('nav[aria-label="Main"]')
    await expect(rail.locator('[data-rail-group]')).toHaveCount(11)
    await openRail(page, 'immudb-in-production')

    await rail.getByRole('link', { name: 'Replication', exact: true }).click()
    await expect(page).toHaveURL(/\/docs\/production\/replication\/$/)
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
    await expect(page).toHaveURL(/\/docs\/develop\/queries-history\/$/)
  })

  test('an old /master/ URL still points at its page', async ({ request }) => {
    // Hugo writes an alias as a meta-refresh to the page's absolute permalink,
    // which is the production host. Following it locally would leave the site
    // under test, so this checks the stub rather than the navigation.
    for (const old of ['/master/develop/reading/', '/develop/reading/']) {
      const response = await request.get(old)
      expect(response.status()).toBe(200)
      expect(await response.text()).toContain('https://immudb.io/docs/develop/reading/')
    }
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

    await page.goto('/docs/develop/transactions/')
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
    await page.goto('/docs/production/replication/')
    await expect(page.locator('.callout').first()).toBeVisible()
  })
})

test.describe('Rail sections', () => {
  test('ships collapsed except the section holding the current page', async ({ page }) => {
    await page.goto(DOC_PAGE)
    await openRail(page)
    const rail = page.locator('nav[aria-label="Main"]')
    await expect(rail.locator('[data-rail-group]')).toHaveCount(11)
    // Exactly one open, and it is the one containing the reader's page.
    await expect(rail.locator('[data-rail-group][open]')).toHaveCount(1)
    await expect(rail.locator('[data-rail-group][open] a[aria-current="page"]')).toHaveCount(1)
    // The current item is reachable without opening anything.
    await expect(page.locator('a[aria-current="page"]')).toBeVisible()
    // A different section keeps its links hidden.
    await expect(
      rail.locator('[data-rail-group="immudb-in-production"] a').first(),
    ).toBeHidden()
  })

  test('an opened section survives navigation', async ({ page }) => {
    await page.goto(DOC_PAGE)
    await openRail(page)
    const other = '[data-rail-group="immudb-in-production"]'
    await page.locator(`${other} summary`).click()
    await expect(page.locator(other)).toHaveAttribute('open', '')

    // `toggle` fires on a later task than the click, so the write to storage can
    // lose a race with navigation. Wait for the stored value, which also asserts
    // the persistence mechanism directly rather than by its effect.
    await expect
      .poll(() =>
        page.evaluate(() => JSON.parse(localStorage.getItem('immudb-rail-open') || '[]')),
      )
      .toContain('immudb-in-production')

    await page.goto('/docs/develop/transactions/')
    // Persisted through a full page load, which every rail click is.
    await expect(page.locator(other)).toHaveAttribute('open', '')
  })

  test('without JavaScript the sections still expand', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto(DOC_PAGE)
    await openRail(page)
    await expect(page.locator('a[aria-current="page"]')).toBeVisible()
    const section = page.locator('[data-rail-group="embedded"]')
    await section.locator('summary').click()
    await expect(section.locator('a').first()).toBeVisible()
    await context.close()
  })
})

test.describe('Blog', () => {
  test('the index lists the imported posts', async ({ page }) => {
    await page.goto('/blog/')
    const cards = page.locator('main article')
    expect(await cards.count()).toBeGreaterThanOrEqual(3)
    await expect(page.getByRole('heading', { name: /immudb 1\.11\.0/ })).toBeVisible()
  })

  test('a post renders with its image served locally', async ({ page }) => {
    await page.goto('/blog/immudb-v1.9.6-released-enhanced-security-and-performance/')
    await expect(page.locator('h1')).toContainText('v1.9.6')
    // Nothing may still be hotlinked to the old CMS.
    const srcs = await page.locator('main img').evaluateAll((els) =>
      els.map((e) => (e as HTMLImageElement).getAttribute('src') ?? ''),
    )
    expect(srcs.length).toBeGreaterThan(0)
    expect(srcs.every((s) => !s.includes('hubfs') && !s.includes('immudb.io/hs-'))).toBe(true)
  })

  test('the home page teases the latest posts', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Latest posts' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'All posts' })).toBeVisible()
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
    await expect(dialog.locator('a[href="/docs/production/replication/"]')).toHaveCount(1)
  })
})

test.describe('Narrow viewport', () => {
  test.use({ viewport: { width: 375, height: 720 } })

  test('the rail collapses and the band does not cover the content', async ({ page }) => {
    await page.goto(DOC_PAGE)

    const rail = page.locator('nav[aria-label="Main"]')
    const summary = rail.locator('[data-rail-root] > summary')
    await expect(summary).toBeVisible()
    // Collapsed: the section headings are not laid out until the menu is opened.
    await expect(rail.locator('[data-rail-group]').first()).toBeHidden()

    await summary.click()
    await expect(rail.locator('[data-rail-group]').first()).toBeVisible()

    // The page must not scroll sideways at this width.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(1)
  })
})
