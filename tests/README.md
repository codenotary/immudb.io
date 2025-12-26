# VitePress Migration Testing Suite

Comprehensive testing framework for validating the VitePress migration and ensuring feature parity with VuePress.

## Table of Contents

- [Overview](#overview)
- [Test Structure](#test-structure)
- [Quick Start](#quick-start)
- [Test Categories](#test-categories)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [CI/CD Integration](#cicd-integration)
- [Writing Tests](#writing-tests)
- [Troubleshooting](#troubleshooting)

---

## Overview

This testing suite validates:

- ✅ **Build System**: VitePress builds correctly and performantly
- ✅ **Component Migration**: All 37 Vue components work in Vue 3
- ✅ **Version System**: Multi-version documentation routing
- ✅ **Content Rendering**: Markdown, code highlighting, custom containers
- ✅ **Feature Parity**: Search, blog, analytics, navigation
- ✅ **Performance**: Lighthouse scores, Core Web Vitals, bundle size
- ✅ **Cross-Browser**: Desktop and mobile browsers
- ✅ **Accessibility**: WCAG AA compliance

---

## Test Structure

```
tests/
├── setup.ts                 # Global test setup
├── unit/                    # Unit tests (Vitest)
│   ├── build.test.ts       # Build process validation
│   ├── components.test.ts  # Vue component tests
│   ├── versions.test.ts    # Version routing logic
│   ├── content.test.ts     # Markdown rendering
│   └── features.test.ts    # Feature tests
├── integration/             # Integration tests
│   └── algolia.test.ts     # Algolia search indexing
├── e2e/                     # End-to-end tests (Playwright)
│   ├── navigation.spec.ts  # Navigation flows
│   ├── blog.spec.ts        # Blog functionality
│   └── versions.spec.ts    # Version switching
├── fixtures/                # Test fixtures and mock data
└── utils/                   # Test utilities
```

---

## Quick Start

### Install Dependencies

```bash
npm install
```

This installs:
- **vitest** - Unit test runner
- **@vue/test-utils** - Vue component testing
- **@playwright/test** - E2E testing
- **@lhci/cli** - Lighthouse CI

### Run All Tests

```bash
# Run everything
npm test

# Run with coverage
npm run test:coverage
```

### Run Specific Test Suites

```bash
# Unit tests only
npm run test:unit

# E2E tests only
npm run test:e2e

# Performance tests
npm run lighthouse
```

---

## Test Categories

### 1. Build Tests (`tests/unit/build.test.ts`)

Validates the VitePress build process:

```typescript
// Tests:
- Build completes without errors
- Build time < 60 seconds
- All 24 versions build successfully
- JavaScript bundles < 500KB
- Sitemap generated
- Assets copied correctly
```

**Run:**
```bash
npm run test:unit -- build.test.ts
```

### 2. Component Tests (`tests/unit/components.test.ts`)

Tests all 37 migrated Vue components:

```typescript
// Global Components:
- Badge, CnButton, CnContainer
- CnSocialButton, CnDiscordButton

// Navigation Components:
- Navbar, Sidebar, NavLinks
- VersionsDropdown

// Layout Components:
- Layout, BlogPost, Blog, 404

// Custom Components:
- Feature, Terminal, Carousel
```

**Run:**
```bash
npm run test:unit -- components.test.ts
```

### 3. Version System Tests (`tests/unit/versions.test.ts`)

Tests multi-version documentation system:

```typescript
// Tests:
- Version detection from URL
- Sidebar switching per version
- Version switcher preserves path
- All 24 versions accessible
```

**Run:**
```bash
npm run test:unit -- versions.test.ts
```

### 4. Content Tests (`tests/unit/content.test.ts`)

Validates markdown rendering and content features:

```typescript
// Tests:
- Markdown to HTML conversion
- Code syntax highlighting
- Custom containers (tip, warning, danger)
- Image loading
- Link handling
- Frontmatter parsing
```

**Run:**
```bash
npm run test:unit -- content.test.ts
```

### 5. Feature Tests (`tests/unit/features.test.ts`)

Tests key features like search, blog, analytics:

```typescript
// Tests:
- Algolia search integration
- Blog pagination and listing
- Reading time calculation
- Analytics tracking
- Version routing
```

**Run:**
```bash
npm run test:unit -- features.test.ts
```

### 6. E2E Navigation Tests (`tests/e2e/navigation.spec.ts`)

End-to-end navigation testing:

```typescript
// Tests:
- Page navigation works
- Version switching flows
- Sidebar navigation
- Search navigation
- Mobile navigation
- Link validation
```

**Run:**
```bash
npm run test:e2e -- navigation.spec.ts
```

### 7. E2E Blog Tests (`tests/e2e/blog.spec.ts`)

Blog functionality testing:

```typescript
// Tests:
- Blog listing displays
- Blog posts render
- Pagination works
- Tag filtering
- Reading time displays
```

**Run:**
```bash
npm run test:e2e -- blog.spec.ts
```

### 8. E2E Version Tests (`tests/e2e/versions.spec.ts`)

Multi-version system testing:

```typescript
// Tests:
- All 24 versions accessible
- Version switcher works
- Content differs per version
- Sidebar updates per version
```

**Run:**
```bash
npm run test:e2e -- versions.spec.ts
```

### 9. Integration Tests (`tests/integration/algolia.test.ts`)

Algolia search integration:

```typescript
// Tests:
- Index generation
- Search record structure
- Version-specific indexing
- Content extraction
```

**Run:**
```bash
npm run test:integration
```

### 10. Performance Tests (Lighthouse CI)

Performance benchmarking:

```json
// Assertions:
- Performance Score > 85
- Accessibility Score > 90
- FCP < 2000ms
- LCP < 3000ms
- CLS < 0.1
- TBT < 300ms
```

**Run:**
```bash
npm run lighthouse
```

---

## Running Tests

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm run test:unit

# Watch mode (re-runs on file changes)
npm run test:unit -- --watch

# Run specific file
npm run test:unit -- components.test.ts

# Run with UI
npm run test:unit -- --ui

# Generate coverage report
npm run test:coverage
```

**Coverage Thresholds:**
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

### E2E Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run specific browser
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit

# Run specific file
npm run test:e2e -- navigation.spec.ts

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Run in debug mode
npm run test:e2e -- --debug

# Generate HTML report
npm run test:e2e -- --reporter=html
```

**Supported Browsers:**
- Desktop: Chrome, Firefox, Safari (WebKit), Edge
- Mobile: Chrome Mobile, Safari iOS

### Performance Tests (Lighthouse)

```bash
# Run Lighthouse CI
npm run lighthouse

# Test specific URL
npx lhci autorun --url=http://localhost:8080/master/
```

**Pages Tested:**
- Homepage (`/`)
- Master version (`/master/`)
- Quickstart (`/master/quickstart`)
- Version 1.9.6 (`/1.9.6/`)
- Blog (`/blog/`)

---

## Test Coverage

### View Coverage Report

```bash
# Generate coverage
npm run test:coverage

# Open HTML report
open coverage/index.html
```

### Coverage Reports

After running tests with coverage:
- **Text**: Console output
- **HTML**: `coverage/index.html`
- **JSON**: `coverage/coverage-final.json`
- **LCOV**: `coverage/lcov.info`

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Run Lighthouse
        run: npm run lighthouse

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### Pre-Commit Hook

```bash
# .husky/pre-commit
npm run test:unit
npm run lint
```

---

## Writing Tests

### Unit Test Template

```typescript
import { describe, it, expect } from 'vitest'

describe('Feature Name', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test'

    // Act
    const result = processInput(input)

    // Assert
    expect(result).toBe('expected')
  })
})
```

### Component Test Template

```typescript
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('should render correctly', () => {
    const wrapper = mount(MyComponent, {
      props: { title: 'Test' }
    })

    expect(wrapper.text()).toContain('Test')
    expect(wrapper.classes()).toContain('my-component')
  })
})
```

### E2E Test Template

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature', () => {
  test('should work as expected', async ({ page }) => {
    // Navigate
    await page.goto('/master/')

    // Interact
    await page.click('button')

    // Assert
    await expect(page.locator('h1')).toHaveText('Expected')
  })
})
```

---

## Troubleshooting

### Tests Failing

**"Module not found" errors:**
```bash
# Clear cache
npm run test:unit -- --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**"Timeout" errors in E2E tests:**
```typescript
// Increase timeout in playwright.config.ts
test.setTimeout(60000) // 60 seconds
```

**Flaky tests:**
```typescript
// Add waits
await page.waitForLoadState('networkidle')
await page.waitForTimeout(500)

// Use retry
test.describe.configure({ retries: 2 })
```

### Performance Issues

**Slow test execution:**
```bash
# Run tests in parallel
npm run test:unit -- --threads

# Limit workers
npm run test:e2e -- --workers=2
```

**Out of memory:**
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run test:unit
```

### Coverage Issues

**Coverage not updating:**
```bash
# Clean coverage
rm -rf coverage

# Re-run with coverage
npm run test:coverage
```

### Common Errors

**"Cannot find module @vue/test-utils":**
```bash
npm install --save-dev @vue/test-utils
```

**"Playwright browsers not installed":**
```bash
npx playwright install
```

**"Lighthouse server not starting":**
```bash
# Build first
npm run build

# Check port 8080 is free
lsof -i :8080
```

---

## Testing Best Practices

### DO ✅

- Write descriptive test names
- Keep tests isolated and independent
- Test one thing per test
- Use meaningful assertions
- Mock external dependencies
- Test edge cases and error conditions
- Maintain high coverage (>80%)
- Run tests before committing
- Keep tests fast

### DON'T ❌

- Test implementation details
- Write tests that depend on other tests
- Use hardcoded timeouts (use waitFor instead)
- Ignore flaky tests
- Skip accessibility testing
- Test only happy paths
- Commit failing tests
- Copy-paste test code

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Testing Library Best Practices](https://testing-library.com/docs/guiding-principles)

---

## Support

For issues or questions:

1. Check the [migration checklist](../docs/migration-testing-checklist.md)
2. Review test output for error details
3. Check the troubleshooting section above
4. Open an issue on GitHub

---

**Happy Testing! 🎉**
