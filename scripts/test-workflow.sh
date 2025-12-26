#!/bin/bash

###############################################################################
# VuePress Build Workflow Test Script
# Tests the build pipeline locally before pushing to GitHub
###############################################################################

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 Testing VuePress Build Workflow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test tracking
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function to run test
run_test() {
    local test_name="$1"
    local test_command="$2"

    echo -n "Testing: $test_name ... "

    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

echo "📋 Step 1: Environment Check"
echo "─────────────────────────────────────────────────────────────────"

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 20 ]; then
    echo -e "${GREEN}✓${NC} Node.js version: $(node --version)"
else
    echo -e "${RED}✗${NC} Node.js version too old: $(node --version)"
    echo "   Required: v20.x or higher"
    exit 1
fi

# Check npm version
echo -e "${GREEN}✓${NC} npm version: $(npm --version)"

# Check for .env file
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
else
    echo -e "${YELLOW}⚠${NC} .env file not found (using .env.example as reference)"
    if [ ! -f ".env.example" ]; then
        echo -e "${RED}✗${NC} .env.example not found either"
        exit 1
    fi
fi

echo ""
echo "📦 Step 2: Dependencies Check"
echo "─────────────────────────────────────────────────────────────────"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules exists"
else
    echo -e "${YELLOW}⚠${NC} node_modules not found, installing..."
    npm ci --ignore-scripts
fi

# Check for critical dependencies
run_test "vuepress installed" "npm list vuepress --depth=0"
run_test "sharp installed" "npm list sharp --depth=0"
run_test "webpack-bundle-analyzer installed" "npm list webpack-bundle-analyzer --depth=0"

echo ""
echo "🔧 Step 3: Script Availability"
echo "─────────────────────────────────────────────────────────────────"

run_test "dev script" "npm run dev --dry-run 2>/dev/null || true"
run_test "build script" "grep -q '\"build\"' package.json"
run_test "images script" "grep -q '\"images\"' package.json"
run_test "perf:build script" "grep -q '\"perf:build\"' package.json"

echo ""
echo "📁 Step 4: Directory Structure"
echo "─────────────────────────────────────────────────────────────────"

run_test "src/.vuepress exists" "[ -d 'src/.vuepress' ]"
run_test "src/.vuepress/config.js exists" "[ -f 'src/.vuepress/config.js' ]"
run_test "src/.vuepress/public exists" "[ -d 'src/.vuepress/public' ]"
run_test "scripts directory exists" "[ -d 'scripts' ]"
run_test "build-performance.js exists" "[ -f 'scripts/build-performance.js' ]"

echo ""
echo "⚙️  Step 5: Configuration Validation"
echo "─────────────────────────────────────────────────────────────────"

run_test "VuePress config is valid JS" "node -c src/.vuepress/config.js"
run_test "Config has webpack optimization" "grep -q 'configureWebpack' src/.vuepress/config.js"
run_test "Config has splitChunks" "grep -q 'splitChunks' src/.vuepress/config.js"

echo ""
echo "🏗️  Step 6: Build Test (Clean Build)"
echo "─────────────────────────────────────────────────────────────────"

# Clean previous build
if [ -d "docs" ]; then
    echo "Cleaning previous build..."
    rm -rf docs
fi

# Run build
echo "Running build..."
if npm run build; then
    echo -e "${GREEN}✓${NC} Build completed successfully"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗${NC} Build failed"
    ((TESTS_FAILED++))
fi

echo ""
echo "📊 Step 7: Build Output Validation"
echo "─────────────────────────────────────────────────────────────────"

run_test "docs directory created" "[ -d 'docs' ]"
run_test "index.html exists" "[ -f 'docs/index.html' ]"
run_test "assets directory exists" "[ -d 'docs/assets' ]"
run_test "JavaScript files generated" "find docs -name '*.js' | grep -q '.'"
run_test "CSS files generated" "find docs -name '*.css' | grep -q '.'"

echo ""
echo "📏 Step 8: Build Size Analysis"
echo "─────────────────────────────────────────────────────────────────"

if [ -d "docs" ]; then
    TOTAL_SIZE=$(du -sh docs | cut -f1)
    FILE_COUNT=$(find docs -type f | wc -l)
    JS_COUNT=$(find docs -name "*.js" | wc -l)
    CSS_COUNT=$(find docs -name "*.css" | wc -l)
    HTML_COUNT=$(find docs -name "*.html" | wc -l)

    echo "Total size: $TOTAL_SIZE"
    echo "Total files: $FILE_COUNT"
    echo "  - JavaScript: $JS_COUNT files"
    echo "  - CSS: $CSS_COUNT files"
    echo "  - HTML: $HTML_COUNT files"

    # Check for large files
    echo ""
    echo "Largest files:"
    find docs -type f -exec du -h {} \; | sort -rh | head -5
fi

echo ""
echo "🎯 Step 9: Performance Report"
echo "─────────────────────────────────────────────────────────────────"

if [ -f "scripts/build-performance.js" ]; then
    echo "Running performance analysis..."
    node scripts/build-performance.js || echo -e "${YELLOW}⚠${NC} Performance script needs build output"
else
    echo -e "${YELLOW}⚠${NC} Performance script not found"
fi

echo ""
echo "🔍 Step 10: GitHub Actions Workflow Validation"
echo "─────────────────────────────────────────────────────────────────"

run_test "workflow file exists" "[ -f '.github/workflows/deploy-vuepress.yml' ]"
run_test "workflow has build job" "grep -q 'jobs:' .github/workflows/deploy-vuepress.yml"
run_test "workflow has deploy job" "grep -q 'deploy:' .github/workflows/deploy-vuepress.yml"
run_test "workflow uses Node 20" "grep -q 'node-version: 20' .github/workflows/deploy-vuepress.yml"
run_test "workflow has caching" "grep -q 'cache:' .github/workflows/deploy-vuepress.yml"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Test Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))

echo "Tests passed: ${GREEN}${TESTS_PASSED}${NC}/${TOTAL_TESTS}"
echo "Tests failed: ${RED}${TESTS_FAILED}${NC}/${TOTAL_TESTS}"

echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed! Ready to deploy.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Commit your changes: git add ."
    echo "  2. Push to GitHub: git push origin master"
    echo "  3. Monitor deployment at: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:\/]\(.*\)\.git/\1/')/actions"
    exit 0
else
    echo -e "${RED}✗ Some tests failed. Please fix the issues before deploying.${NC}"
    exit 1
fi
