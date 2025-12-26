#!/usr/bin/env node

/**
 * VitePress Migration Validation Script
 * Validates the migration setup and reports any issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 VitePress Migration Validation');
console.log('='.repeat(60));
console.log('');

const checks = [];
let passed = 0;
let failed = 0;
let warnings = 0;

/**
 * Check helper
 */
function check(name, fn) {
  checks.push({ name, fn });
}

/**
 * Run a check
 */
async function runCheck(check) {
  try {
    const result = await check.fn();
    if (result === true) {
      console.log(`✅ ${check.name}`);
      passed++;
    } else if (result === 'warning') {
      console.log(`⚠️  ${check.name}`);
      warnings++;
    } else {
      console.log(`❌ ${check.name}: ${result}`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ ${check.name}: ${error.message}`);
    failed++;
  }
}

// Define checks

check('VitePress config exists', () => {
  return fs.existsSync('.vitepress/config.ts');
});

check('VitePress theme directory exists', () => {
  return fs.existsSync('.vitepress/theme');
});

check('Theme index.ts exists', () => {
  return fs.existsSync('.vitepress/theme/index.ts');
});

check('Layout.vue exists', () => {
  return fs.existsSync('.vitepress/theme/Layout.vue');
});

check('Sidebar configurations exist', () => {
  const sidebarDir = '.vitepress/sidebars';
  if (!fs.existsSync(sidebarDir)) return 'Sidebars directory missing';

  const files = fs.readdirSync(sidebarDir);
  const tsFiles = files.filter(f => f.endsWith('.ts'));

  if (tsFiles.length === 0) return 'No sidebar TypeScript files found';
  return true;
});

check('Blog data loader exists', () => {
  return fs.existsSync('.vitepress/blog.data.ts');
});

check('Custom components exist', () => {
  const componentsDir = '.vitepress/theme/components';
  if (!fs.existsSync(componentsDir)) return 'Components directory missing';

  const requiredComponents = [
    'BlogIndex.vue',
    'BlogCard.vue',
    'BlogPost.vue',
    'ReadingTime.vue',
    'Tabs.vue',
    'TabPanel.vue',
  ];

  const missing = requiredComponents.filter(c => !fs.existsSync(path.join(componentsDir, c)));

  if (missing.length > 0) {
    return `Missing components: ${missing.join(', ')}`;
  }

  return true;
});

check('CSS styles exist', () => {
  const stylesDir = '.vitepress/theme/styles';
  if (!fs.existsSync(stylesDir)) return 'Styles directory missing';

  const requiredStyles = ['index.css', 'variables.css'];
  const missing = requiredStyles.filter(s => !fs.existsSync(path.join(stylesDir, s)));

  if (missing.length > 0) {
    return `Missing styles: ${missing.join(', ')}`;
  }

  return true;
});

check('TypeScript config exists', () => {
  return fs.existsSync('tsconfig.json');
});

check('Package.json has VitePress dependency', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const hasVitePress = pkg.devDependencies?.vitepress || pkg.dependencies?.vitepress;

  if (!hasVitePress) return 'VitePress not in dependencies';
  return true;
});

check('Package.json has required scripts', () => {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['docs:dev', 'docs:build', 'docs:preview'];
  const missing = requiredScripts.filter(s => !pkg.scripts?.[s]);

  if (missing.length > 0) {
    return `Missing scripts: ${missing.join(', ')}`;
  }

  return true;
});

check('Environment variables template exists', () => {
  return fs.existsSync('.env.example');
});

check('GitHub Actions workflow exists', () => {
  const workflowPath = '.github/workflows/deploy-vuepress.yml';
  if (!fs.existsSync(workflowPath)) return 'warning';
  return true;
});

check('Test configuration exists', () => {
  const hasVitest = fs.existsSync('vitest.config.ts');
  const hasPlaywright = fs.existsSync('playwright.config.ts');

  if (!hasVitest && !hasPlaywright) {
    return 'warning';
  }

  return true;
});

check('Documentation exists', () => {
  const docFiles = [
    'docs/architecture-plan.md',
    'docs/component-migration-strategy.md',
    'docs/multi-version-architecture.md',
    'docs/performance-optimization-plan.md',
  ];

  const missing = docFiles.filter(f => !fs.existsSync(f));

  if (missing.length > 0) {
    return `Missing docs: ${missing.length}/${docFiles.length}`;
  }

  return true;
});

check('Node version compatibility', () => {
  try {
    const version = execSync('node --version', { encoding: 'utf8' }).trim();
    const major = parseInt(version.slice(1).split('.')[0], 10);

    if (major < 18) {
      return `Node ${major} is too old (need 18+)`;
    }

    return true;
  } catch (error) {
    return error.message;
  }
});

check('TypeScript is installed', () => {
  try {
    execSync('npx tsc --version', { encoding: 'utf8', stdio: 'ignore' });
    return true;
  } catch (error) {
    return 'TypeScript not available';
  }
});

// Run all checks
async function main() {
  for (const c of checks) {
    await runCheck(c);
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('📊 Validation Summary');
  console.log('='.repeat(60));
  console.log(`Total checks: ${checks.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('');

  if (failed === 0 && warnings === 0) {
    console.log('🎉 All checks passed! Migration setup is complete.');
    process.exit(0);
  } else if (failed === 0) {
    console.log('✅ Core checks passed. Warnings can be addressed later.');
    process.exit(0);
  } else {
    console.log('❌ Some checks failed. Please fix the issues above.');
    process.exit(1);
  }
}

main();
