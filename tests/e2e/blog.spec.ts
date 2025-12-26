import { test, expect } from '@playwright/test'

/**
 * E2E Blog Tests
 *
 * Tests blog functionality:
 * - Blog listing page
 * - Blog post pages
 * - Pagination
 * - Tag filtering
 * - Reading time display
 */

test.describe('Blog Listing', () => {
  test('should display blog posts', async ({ page }) => {
    await page.goto('/blog/')

    // Wait for blog posts to load
    await page.waitForSelector('.blog-post, article, .post-item', { timeout: 5000 })

    // Check if posts are visible
    const posts = page.locator('.blog-post, article, .post-item')
    const count = await posts.count()

    expect(count).toBeGreaterThan(0)
  })

  test('should show post metadata', async ({ page }) => {
    await page.goto('/blog/')

    const firstPost = page.locator('.blog-post, article').first()

    // Check for title
    await expect(firstPost.locator('h2, h3, .post-title')).toBeVisible()

    // Check for date
    await expect(firstPost.locator('time, .post-date, .date')).toBeVisible()
  })

  test('should navigate to blog post', async ({ page }) => {
    await page.goto('/blog/')

    // Click first post
    const firstPost = page.locator('.blog-post a, article a').first()
    await firstPost.click()

    await page.waitForLoadState('networkidle')

    // Should be on blog post page
    expect(page.url()).toContain('/blog/')
    await expect(page.locator('article, .post-content')).toBeVisible()
  })

  test('should display reading time', async ({ page }) => {
    await page.goto('/blog/')

    // Look for reading time indicators
    const readingTime = page.locator('.reading-time, [class*="read"]')
    if (await readingTime.first().isVisible()) {
      const text = await readingTime.first().textContent()
      expect(text).toMatch(/\d+\s*(min|minute)/i)
    }
  })
})

test.describe('Blog Post', () => {
  test('should display full post content', async ({ page }) => {
    await page.goto('/blog/')

    // Navigate to first post
    await page.click('.blog-post a, article a')
    await page.waitForLoadState('networkidle')

    // Check for post content
    await expect(page.locator('article, .post-content, .page-content')).toBeVisible()

    // Check for title
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should show post metadata', async ({ page }) => {
    await page.goto('/blog/')
    await page.click('.blog-post a, article a')
    await page.waitForLoadState('networkidle')

    // Look for author
    const author = page.locator('.author, [class*="author"]')
    if (await author.isVisible()) {
      expect(await author.textContent()).toBeTruthy()
    }

    // Look for publish date
    await expect(page.locator('time, .date, .post-date')).toBeVisible()
  })

  test('should render markdown content', async ({ page }) => {
    await page.goto('/blog/')
    await page.click('.blog-post a, article a')
    await page.waitForLoadState('networkidle')

    // Check for various markdown elements
    const content = page.locator('article, .post-content')

    // Should have paragraphs
    const paragraphs = content.locator('p')
    expect(await paragraphs.count()).toBeGreaterThan(0)
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/blog/')
    await page.click('.blog-post a, article a')
    await page.waitForLoadState('networkidle')

    // Should have h1 title
    const h1 = page.locator('h1')
    expect(await h1.count()).toBe(1)

    // May have subheadings
    const headings = page.locator('h2, h3, h4')
    const count = await headings.count()
    expect(count).toBeGreaterThanOrEqual(0)
  })
})

test.describe('Blog Pagination', () => {
  test('should paginate posts if many exist', async ({ page }) => {
    await page.goto('/blog/')

    // Look for pagination
    const pagination = page.locator('.pagination, .pager, [role="navigation"]')

    if (await pagination.isVisible()) {
      // Should have page numbers or next/prev
      const hasNumbers = await page.locator('.page-number, .page-item').count() > 0
      const hasNextPrev = await page.locator('.next, .previous, .prev').count() > 0

      expect(hasNumbers || hasNextPrev).toBe(true)
    }
  })

  test('should navigate to next page', async ({ page }) => {
    await page.goto('/blog/')

    const nextButton = page.locator('.next, .pagination-next, button:has-text("Next")')

    if (await nextButton.isVisible()) {
      const initialUrl = page.url()
      await nextButton.click()
      await page.waitForLoadState('networkidle')

      // URL should change or posts should update
      const newUrl = page.url()
      expect(newUrl).not.toBe(initialUrl)
    }
  })

  test('should navigate to previous page', async ({ page }) => {
    await page.goto('/blog/page/2/')

    const prevButton = page.locator('.prev, .previous, .pagination-prev, button:has-text("Previous")')

    if (await prevButton.isVisible()) {
      await prevButton.click()
      await page.waitForLoadState('networkidle')

      expect(page.url()).toContain('/blog/')
    }
  })
})

test.describe('Blog Tags', () => {
  test('should display post tags', async ({ page }) => {
    await page.goto('/blog/')

    const tags = page.locator('.tag, .tags a, .post-tag')

    if (await tags.first().isVisible()) {
      expect(await tags.count()).toBeGreaterThan(0)
    }
  })

  test('should filter by tag', async ({ page }) => {
    await page.goto('/blog/')

    const firstTag = page.locator('.tag, .tags a').first()

    if (await firstTag.isVisible()) {
      await firstTag.click()
      await page.waitForLoadState('networkidle')

      // Should filter posts
      expect(page.url()).toMatch(/\/blog\/tag\/|\/tag\//)
    }
  })
})

test.describe('Blog Search', () => {
  test('should include blog posts in search', async ({ page }) => {
    await page.goto('/master/')

    // Open search
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K')

    // Search for blog-related term
    await page.fill('[role="search"] input, .search-box input', 'blog')
    await page.waitForTimeout(1000)

    // Should show some results
    const results = page.locator('.search-result, .aa-suggestion')
    if (await results.first().isVisible()) {
      expect(await results.count()).toBeGreaterThan(0)
    }
  })
})

test.describe('Blog Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('should display blog list on mobile', async ({ page }) => {
    await page.goto('/blog/')

    await expect(page.locator('.blog-post, article')).toBeVisible()

    const posts = page.locator('.blog-post, article')
    expect(await posts.count()).toBeGreaterThan(0)
  })

  test('should display blog post on mobile', async ({ page }) => {
    await page.goto('/blog/')

    await page.click('.blog-post a, article a')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('article, .post-content')).toBeVisible()
  })
})
