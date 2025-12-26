#!/usr/bin/env node

/**
 * Build Performance Monitoring Script
 * Tracks build times, bundle sizes, and generates performance reports
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS_DIR = path.join(__dirname, '../docs');
const REPORT_FILE = path.join(__dirname, '../build-performance.json');

class BuildPerformanceMonitor {
  constructor() {
    this.metrics = {
      timestamp: new Date().toISOString(),
      buildTime: 0,
      totalSize: 0,
      fileCount: 0,
      largestFiles: [],
      assetBreakdown: {},
      warnings: []
    };
  }

  async analyze() {
    console.log('🔍 Analyzing build performance...\n');

    const startTime = Date.now();

    try {
      this.analyzeBundleSize();
      this.analyzeFileTypes();
      this.checkForIssues();

      this.metrics.buildTime = Date.now() - startTime;

      this.generateReport();
      this.saveMetrics();

    } catch (error) {
      console.error('❌ Error analyzing build:', error.message);
      process.exit(1);
    }
  }

  analyzeBundleSize() {
    if (!fs.existsSync(DOCS_DIR)) {
      throw new Error('Build directory not found. Run `npm run build` first.');
    }

    // Get total size
    const totalSizeCmd = `du -sb ${DOCS_DIR} | cut -f1`;
    this.metrics.totalSize = parseInt(execSync(totalSizeCmd).toString().trim());

    // Count files
    const fileCountCmd = `find ${DOCS_DIR} -type f | wc -l`;
    this.metrics.fileCount = parseInt(execSync(fileCountCmd).toString().trim());

    // Find largest files
    const largestFilesCmd = `find ${DOCS_DIR} -type f -exec du -b {} \\; | sort -rn | head -10`;
    const largestFiles = execSync(largestFilesCmd).toString()
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [size, filepath] = line.split(/\s+/);
        return {
          file: path.relative(DOCS_DIR, filepath),
          size: parseInt(size),
          sizeFormatted: this.formatBytes(parseInt(size))
        };
      });

    this.metrics.largestFiles = largestFiles;
  }

  analyzeFileTypes() {
    const breakdown = {
      js: { count: 0, size: 0 },
      css: { count: 0, size: 0 },
      html: { count: 0, size: 0 },
      images: { count: 0, size: 0 },
      other: { count: 0, size: 0 }
    };

    const walkDir = (dir) => {
      const files = fs.readdirSync(dir);

      files.forEach(file => {
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);

        if (stat.isDirectory()) {
          walkDir(filepath);
        } else {
          const ext = path.extname(file).toLowerCase();
          const size = stat.size;

          if (ext === '.js') {
            breakdown.js.count++;
            breakdown.js.size += size;
          } else if (ext === '.css') {
            breakdown.css.count++;
            breakdown.css.size += size;
          } else if (ext === '.html') {
            breakdown.html.count++;
            breakdown.html.size += size;
          } else if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
            breakdown.images.count++;
            breakdown.images.size += size;
          } else {
            breakdown.other.count++;
            breakdown.other.size += size;
          }
        }
      });
    };

    walkDir(DOCS_DIR);
    this.metrics.assetBreakdown = breakdown;
  }

  checkForIssues() {
    // Check for large JavaScript bundles (> 1MB)
    const largeJsFiles = this.metrics.largestFiles.filter(
      f => f.file.endsWith('.js') && f.size > 1024 * 1024
    );

    if (largeJsFiles.length > 0) {
      this.metrics.warnings.push({
        type: 'large-js-bundle',
        message: `Found ${largeJsFiles.length} JavaScript file(s) larger than 1MB`,
        files: largeJsFiles.map(f => f.file)
      });
    }

    // Check total bundle size (warning if > 50MB)
    const totalMB = this.metrics.totalSize / (1024 * 1024);
    if (totalMB > 50) {
      this.metrics.warnings.push({
        type: 'large-total-size',
        message: `Total build size is ${totalMB.toFixed(2)}MB (recommended < 50MB)`
      });
    }

    // Check for unoptimized images
    const largeImages = this.metrics.largestFiles.filter(
      f => /\.(jpg|jpeg|png|gif)$/i.test(f.file) && f.size > 500 * 1024
    );

    if (largeImages.length > 0) {
      this.metrics.warnings.push({
        type: 'large-images',
        message: `Found ${largeImages.length} image(s) larger than 500KB`,
        files: largeImages.map(f => f.file)
      });
    }
  }

  generateReport() {
    console.log('📊 Build Performance Report\n');
    console.log('━'.repeat(60));

    console.log('\n📦 Bundle Size:');
    console.log(`   Total: ${this.formatBytes(this.metrics.totalSize)}`);
    console.log(`   Files: ${this.metrics.fileCount}`);

    console.log('\n📂 Asset Breakdown:');
    Object.entries(this.metrics.assetBreakdown).forEach(([type, data]) => {
      console.log(`   ${type.toUpperCase()}: ${data.count} files (${this.formatBytes(data.size)})`);
    });

    console.log('\n🏆 Largest Files:');
    this.metrics.largestFiles.slice(0, 5).forEach((file, i) => {
      console.log(`   ${i + 1}. ${file.sizeFormatted} - ${file.file}`);
    });

    if (this.metrics.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      this.metrics.warnings.forEach(warning => {
        console.log(`   • ${warning.message}`);
        if (warning.files) {
          warning.files.forEach(file => console.log(`     - ${file}`));
        }
      });
    } else {
      console.log('\n✅ No performance issues detected');
    }

    console.log('\n━'.repeat(60));
    console.log(`\n⏱️  Analysis completed in ${this.metrics.buildTime}ms`);
  }

  saveMetrics() {
    let history = [];

    if (fs.existsSync(REPORT_FILE)) {
      try {
        history = JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8'));
      } catch (e) {
        console.warn('⚠️  Could not read previous metrics');
      }
    }

    history.push(this.metrics);

    // Keep only last 10 builds
    if (history.length > 10) {
      history = history.slice(-10);
    }

    fs.writeFileSync(REPORT_FILE, JSON.stringify(history, null, 2));
    console.log(`\n💾 Metrics saved to ${path.relative(process.cwd(), REPORT_FILE)}`);
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Run if called directly
if (require.main === module) {
  const monitor = new BuildPerformanceMonitor();
  monitor.analyze();
}

module.exports = BuildPerformanceMonitor;
