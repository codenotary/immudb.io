import { test, expect, type Page, type Request } from '@playwright/test'

/**
 * Google Analytics is opt-in. Requests to Google are intercepted and answered
 * empty, so the suite never reaches the real property; what it asserts is
 * whether the page tried.
 */

function trackGoogle(page: Page) {
  const hits: string[] = []
  page.on('request', (r: Request) => {
    if (/googletagmanager\.com|google-analytics\.com/.test(r.url())) hits.push(r.url())
  })
  return hits
}

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|google-analytics\.com/, (route) =>
    route.fulfill({ status: 200, contentType: 'text/javascript', body: '' }),
  )
})

const banner = (page: Page) => page.locator('[data-consent-banner]')

test('first visit shows the banner and loads nothing from Google', async ({ page }) => {
  const hits = trackGoogle(page)
  await page.goto('/')
  await expect(banner(page)).toBeVisible()
  await page.waitForLoadState('networkidle')
  expect(hits).toEqual([])
})

test('declining hides the banner for good and loads nothing', async ({ page }) => {
  const hits = trackGoogle(page)
  await page.goto('/')
  await banner(page).getByRole('button', { name: 'Decline' }).click()
  await expect(banner(page)).toBeHidden()
  await page.reload()
  await page.waitForLoadState('networkidle')
  await expect(banner(page)).toBeHidden()
  expect(hits).toEqual([])
})

test('accepting loads gtag with the measurement ID, and keeps doing so', async ({ page }) => {
  const hits = trackGoogle(page)
  await page.goto('/')
  await banner(page).getByRole('button', { name: 'Accept' }).click()
  await expect(banner(page)).toBeHidden()
  await expect.poll(() => hits.some((u) => u.includes('gtag/js?id=G-ELLNP48DRV'))).toBe(true)

  hits.length = 0
  await page.goto('/docs/')
  await expect(banner(page)).toBeHidden()
  await expect.poll(() => hits.some((u) => u.includes('gtag/js?id=G-ELLNP48DRV'))).toBe(true)
})

test('the footer reopens the banner', async ({ page }) => {
  await page.goto('/')
  await banner(page).getByRole('button', { name: 'Decline' }).click()
  await page.getByRole('button', { name: 'Cookie settings' }).click()
  await expect(banner(page)).toBeVisible()
})
