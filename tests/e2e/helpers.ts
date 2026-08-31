import type { Page } from '@playwright/test'

/**
 * Bring the sidebar into the viewport.
 *
 * On desktop the sidebar is always laid out, but below VitePress's breakpoint it
 * is translated off-screen until the local nav's "Menu" button opens it. Its
 * links stay visible and enabled the whole time, so Playwright happily resolves
 * them and then fails the click with "element is outside of the viewport".
 *
 * The button only exists and is only visible on the narrow layout, so this is a
 * no-op on desktop.
 */
export async function openSidebar(page: Page): Promise<void> {
  const menu = page.locator('.VPLocalNav button.menu')
  if ((await menu.count()) === 0) return
  if (!(await menu.isVisible())) return
  await menu.click()
  const sidebar = page.locator('.VPSidebar')
  await page.locator('.VPSidebar.open').waitFor({ state: 'visible', timeout: 5000 })

  // .open lands as the slide-in starts. The sidebar's own box settles at once,
  // so polling it returns too early and a click then races the 0.5s transform,
  // which Playwright rejects as "element is not stable". Wait for the real
  // transitionend, with a fallback so a CSS change cannot hang the suite.
  // The sidebar transitions `opacity 0.25s, transform 0.5s`, so waiting for the
  // first transitionend resolves on opacity while the slide is still running.
  // Wait for the transform specifically, with a fallback so a CSS change cannot
  // hang the suite.
  await sidebar.evaluate(
    el =>
      new Promise<void>(resolve => {
        const onEnd = (e: Event) => {
          if ((e as TransitionEvent).propertyName !== 'transform') return
          el.removeEventListener('transitionend', onEnd)
          resolve()
        }
        el.addEventListener('transitionend', onEnd)
        setTimeout(() => {
          el.removeEventListener('transitionend', onEnd)
          resolve()
        }, 1500)
      })
  )
}

/**
 * First sidebar link matching `hrefPrefix`, skipping the link to the section
 * root so the test actually navigates somewhere.
 */
export async function clickableSidebarLink(page: Page, hrefPrefix: string) {
  const links = page.locator(`.VPSidebar a[href^="${hrefPrefix}"]`)
  const total = await links.count()
  for (let i = 0; i < total; i++) {
    const link = links.nth(i)
    if ((await link.getAttribute('href')) === hrefPrefix) continue
    if (await link.boundingBox()) return link
  }
  return links.first()
}
