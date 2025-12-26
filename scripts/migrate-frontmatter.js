#!/usr/bin/env node

/**
 * Frontmatter Migration Script
 * Converts VuePress frontmatter to VitePress format
 *
 * Usage: node scripts/migrate-frontmatter.js [--dry-run] [--path=src]
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const pathArg = args.find(arg => arg.startsWith('--path='));
const basePath = pathArg ? pathArg.split('=')[1] : 'src';

console.log('🔄 VuePress to VitePress Frontmatter Migration');
console.log('='.repeat(50));
console.log(`Mode: ${isDryRun ? 'DRY RUN (no files will be changed)' : 'LIVE'}`);
console.log(`Path: ${basePath}`);
console.log('');

// Frontmatter transformation rules
const transformations = {
  // Homepage
  'home': (value) => value === true ? { layout: 'home' } : null,
  'heroText': (value) => ({ 'hero.name': value }),
  'tagline': (value) => ({ 'hero.text': value }),
  'actionText': (value) => ({ 'hero.actions[0].text': value }),
  'actionLink': (value) => ({ 'hero.actions[0].link': value }),
  'heroImage': (value) => ({ 'hero.image.src': value }),
  'heroAlt': (value) => ({ 'hero.image.alt': value }),

  // Sidebar
  'sidebar': (value) => {
    if (value === 'auto') return { outline: 'deep' };
    if (value === false) return { outline: false };
    return null;
  },
  'sidebarDepth': (value) => ({ outline: value === 0 ? false : [2, value + 1] }),

  // Other mappings
  'pageClass': (value) => ({ pageClass: value }), // No change
  'layout': (value) => ({ layout: value }), // No change
  'title': (value) => ({ title: value }), // No change
  'description': (value) => ({ description: value }), // No change
};

// Statistics
let stats = {
  filesProcessed: 0,
  filesModified: 0,
  filesSkipped: 0,
  transformations: {},
};

/**
 * Extract frontmatter from markdown content
 */
function extractFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontmatterRegex);

  if (!match) return { frontmatter: null, body: content, raw: null };

  return {
    frontmatter: parseFrontmatter(match[1]),
    body: content.slice(match[0].length),
    raw: match[1],
  };
}

/**
 * Parse YAML-like frontmatter (simplified)
 */
function parseFrontmatter(yaml) {
  const lines = yaml.split('\n');
  const result = {};

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Parse basic types
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    else if (value === 'null') value = null;
    else if (value.match(/^\d+$/)) value = parseInt(value, 10);
    else if (value.startsWith('"') || value.startsWith("'")) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

/**
 * Transform frontmatter from VuePress to VitePress
 */
function transformFrontmatter(frontmatter) {
  if (!frontmatter) return null;

  const transformed = {};
  let hasChanges = false;

  for (const [key, value] of Object.entries(frontmatter)) {
    if (transformations[key]) {
      const result = transformations[key](value);

      if (result) {
        hasChanges = true;

        // Handle nested keys (e.g., 'hero.name')
        for (const [newKey, newValue] of Object.entries(result)) {
          if (newKey.includes('.')) {
            const parts = newKey.split('.');
            let current = transformed;

            for (let i = 0; i < parts.length - 1; i++) {
              const part = parts[i];
              if (!current[part]) current[part] = {};
              current = current[part];
            }

            current[parts[parts.length - 1]] = newValue;
          } else {
            transformed[newKey] = newValue;
          }
        }

        // Track transformation
        stats.transformations[key] = (stats.transformations[key] || 0) + 1;
      } else {
        // Keep original if no transformation
        transformed[key] = value;
      }
    } else {
      // Keep unknown keys
      transformed[key] = value;
    }
  }

  return hasChanges ? transformed : null;
}

/**
 * Serialize frontmatter to YAML
 */
function serializeFrontmatter(frontmatter, indent = 0) {
  const lines = [];
  const spaces = ' '.repeat(indent);

  for (const [key, value] of Object.entries(frontmatter)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      lines.push(`${spaces}${key}:`);
      lines.push(...serializeFrontmatter(value, indent + 2).split('\n').filter(l => l));
    } else if (Array.isArray(value)) {
      lines.push(`${spaces}${key}:`);
      value.forEach(item => {
        if (typeof item === 'object') {
          lines.push(`${spaces}  -`);
          lines.push(...serializeFrontmatter(item, indent + 4).split('\n').filter(l => l));
        } else {
          lines.push(`${spaces}  - ${JSON.stringify(item)}`);
        }
      });
    } else if (typeof value === 'string') {
      lines.push(`${spaces}${key}: "${value}"`);
    } else {
      lines.push(`${spaces}${key}: ${value}`);
    }
  }

  return lines.join('\n');
}

/**
 * Process a single markdown file
 */
function processFile(filePath) {
  stats.filesProcessed++;

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, body, raw } = extractFrontmatter(content);

    if (!frontmatter) {
      stats.filesSkipped++;
      return;
    }

    const transformed = transformFrontmatter(frontmatter);

    if (!transformed) {
      stats.filesSkipped++;
      return;
    }

    // Create new content
    const newFrontmatter = serializeFrontmatter(transformed);
    const newContent = `---\n${newFrontmatter}\n---\n${body}`;

    if (!isDryRun) {
      fs.writeFileSync(filePath, newContent, 'utf8');
    }

    stats.filesModified++;
    console.log(`✓ ${filePath}`);

  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main execution
 */
function main() {
  // Find all markdown files
  const pattern = `${basePath}/**/*.md`;
  const files = glob.sync(pattern, {
    ignore: ['**/node_modules/**', '**/docs/**', '**/.vitepress/**']
  });

  console.log(`Found ${files.length} markdown files\n`);

  // Process each file
  files.forEach(processFile);

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Migration Summary');
  console.log('='.repeat(50));
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Files modified: ${stats.filesModified}`);
  console.log(`Files skipped: ${stats.filesSkipped}`);
  console.log('\nTransformations applied:');

  Object.entries(stats.transformations)
    .sort((a, b) => b[1] - a[1])
    .forEach(([key, count]) => {
      console.log(`  ${key}: ${count}`);
    });

  if (isDryRun) {
    console.log('\n⚠️  This was a DRY RUN - no files were changed');
    console.log('Run without --dry-run to apply changes');
  } else {
    console.log('\n✅ Migration complete!');
  }
}

// Run the script
main();
