# Testing Framework Quick Start

Get started with the VitePress migration testing framework in under 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (for CI/CD)

## Step 1: Install Dependencies

```bash
# Install all dependencies including test frameworks
npm install

# Or install test dependencies only
npm install --save-dev vitest @vue/test-utils @playwright/test @lhci/cli \
  @vitest/ui @vitest/coverage-v8 @vitejs/plugin-vue jsdom happy-dom http-server
```

## Step 2: Install Playwright Browsers

```bash
# Install browsers for E2E testing
npx playwright install

# Or install specific browsers
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

## Step 3: Run Tests

### Quick Test (Unit Tests Only)

```bash
npm run test:unit
```

**Expected output:**
```
✓ tests/unit/build.test.ts (10 tests)
✓ tests/unit/components.test.ts (25 tests)
✓ tests/unit/versions.test.ts (15 tests)
✓ tests/unit/content.test.ts (20 tests)
✓ tests/unit/features.test.ts (18 tests)

Test Files  5 passed (5)
     Tests  88 passed (88)
  Duration  5.23s
```

### Full Test Suite

```bash
npm run test:all
```

This runs:
1. Unit tests (Vitest)
2. E2E tests (Playwright)
3. Performance tests (Lighthouse)

## Step 4: View Results

### Coverage Report

```bash
npm run test:coverage
open coverage/index.html
```

### E2E Test Report

```bash
npm run test:e2e
npx playwright show-report
```

### Lighthouse Report

```bash
npm run lighthouse
# Results in .lighthouseci/ directory
```

---

## Common Commands Cheat Sheet

```bash
# Development Testing
npm run test:unit:watch          # Watch mode for unit tests
npm run test:unit:ui             # Interactive test UI
npm run test:e2e:headed          # See browser during E2E tests

# Specific Test Files
npm run test:unit -- build.test.ts          # Test build only
npm run test:e2e -- navigation.spec.ts      # Test navigation only

# Specific Browsers
npm run test:e2e:chromium        # Chrome only
npm run test:e2e:firefox         # Firefox only
npm run test:e2e:webkit          # Safari only

# Debug Mode
npm run test:e2e:debug           # Debug E2E tests
```

---

## Troubleshooting

### "Module not found" errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Playwright browsers not found

```bash
npx playwright install
```

### Port 8080 already in use

```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or use different port
npm run serve -- -p 3000
```

### Tests timeout

```bash
# Increase timeout in test files
test.setTimeout(60000) // 60 seconds
```

---

## What Gets Tested?

### ✅ Build System
- VitePress builds without errors
- Build time < 60 seconds
- All 24 versions generate correctly
- Bundle size is optimized

### ✅ Components (37 total)
- Badge, Buttons, Containers
- Navigation (Navbar, Sidebar, etc.)
- Layouts (Blog, HomePage, 404)
- Custom components (Feature, Terminal, etc.)

### ✅ Version System (24 versions)
- All versions accessible
- Version switching works
- Sidebar updates per version
- Content differs appropriately

### ✅ Content Rendering
- Markdown to HTML conversion
- Code syntax highlighting
- Custom containers (tip, warning, danger)
- Images and links work

### ✅ Features
- Algolia search works
- Blog listing and posts
- Reading time calculation
- Analytics tracking

### ✅ Performance
- Lighthouse scores > 85
- Core Web Vitals green
- Fast page load times

---

## Next Steps

1. **Read the full documentation:**
   - [tests/README.md](/home/dennis/github/immudb.io/tests/README.md)
   - [Migration Checklist](/home/dennis/github/immudb.io/docs/migration-testing-checklist.md)

2. **Run the full test suite:**
   ```bash
   npm run test:all
   ```

3. **Review test coverage:**
   ```bash
   npm run test:coverage
   ```

4. **Set up CI/CD:**
   - GitHub Actions workflow is in `.github/workflows/tests.yml`
   - Commits to master/main trigger full test suite

5. **Start testing your migration:**
   - Migrate components one by one
   - Run tests after each component
   - Fix any failing tests
   - Maintain > 80% coverage

---

## File Structure

```
tests/
├── QUICKSTART.md              # This file
├── README.md                  # Full documentation
├── SUMMARY.md                 # Test framework summary
├── setup.ts                   # Global test setup
├── unit/                      # Unit tests
│   ├── build.test.ts
│   ├── components.test.ts
│   ├── versions.test.ts
│   ├── content.test.ts
│   └── features.test.ts
├── integration/               # Integration tests
│   └── algolia.test.ts
└── e2e/                       # E2E tests
    ├── navigation.spec.ts
    ├── blog.spec.ts
    └── versions.spec.ts
```

---

## CI/CD Integration

Tests run automatically on:
- Every push to master/main
- Every pull request
- Manual workflow dispatch

**GitHub Actions workflow:**
- `.github/workflows/tests.yml`

**What runs in CI:**
1. Unit tests with coverage
2. Integration tests
3. E2E tests (3 browsers in parallel)
4. Performance tests (Lighthouse)
5. Build validation
6. Bundle size check

---

## Support

- **Documentation:** [tests/README.md](/home/dennis/github/immudb.io/tests/README.md)
- **Migration Checklist:** [docs/migration-testing-checklist.md](/home/dennis/github/immudb.io/docs/migration-testing-checklist.md)
- **Issues:** Create GitHub issue with test output
- **Test Framework Version:** 1.0.0

---

**Happy Testing! 🚀**

Start with `npm run test:unit` and expand from there!
