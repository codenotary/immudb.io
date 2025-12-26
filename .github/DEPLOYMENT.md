# Deployment Documentation

## Overview

This document describes the deployment process for immudb.io documentation site using GitHub Actions and GitHub Pages.

## Architecture

```
┌─────────────────┐
│  Push to Master │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Actions │
│   Workflow      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌──────┐
│ Build │ │ Test │
└───┬───┘ └──┬───┘
    │        │
    └────┬───┘
         │
         ▼
    ┌─────────┐
    │ Deploy  │
    │ to      │
    │ Pages   │
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │ Algolia │
    │ Index   │
    └─────────┘
```

## Workflow Stages

### 1. Build Stage

**Triggers:**
- Push to `master` branch
- Pull request to `master`
- Manual workflow dispatch

**Steps:**
1. Checkout repository with full git history
2. Setup Node.js 20 with npm caching
3. Cache VuePress build artifacts
4. Create `.env` file with secrets
5. Install dependencies (`npm ci --ignore-scripts`)
6. Rebuild Sharp module for image processing
7. Process blog images (fullsize + thumbnails)
8. Build VuePress site
9. Upload build artifacts

**Outputs:**
- `docs/` directory with static site
- Build artifacts for deployment
- Performance metrics

### 2. Deploy Stage

**Conditions:**
- Only on push to `master`
- Build must succeed

**Steps:**
1. Download build artifacts
2. Deploy to GitHub Pages using official action
3. Update deployment environment

**Target:**
- GitHub Pages environment
- URL: https://immudb.io

### 3. Algolia Indexing

**Conditions:**
- Only after successful deployment
- Only on `master` branch

**Steps:**
1. Checkout repository
2. Install dependencies
3. Run Algolia indexing script
4. Update search index

### 4. Performance Reporting

**Conditions:**
- Only on pull requests

**Steps:**
1. Analyze bundle size
2. Compare with base branch
3. Generate performance report
4. Comment on PR with results

## Environment Configuration

### Required Secrets

Configure in repository Settings → Secrets → Actions:

| Secret Name | Description | Required |
|-------------|-------------|----------|
| `ALGOLIA_API_KEY` | Algolia write API key | Yes |
| `ALGOLIA_APP_ID` | Algolia application ID | Yes |
| `ALGOLIA_INDEX` | Algolia index name | Optional (default: immudb) |
| `ALGOLIA_WRIGHT_API_KEY` | Wright API key | Optional |

### Permissions

The workflow uses:
- `contents: write` - Write to repository
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - OIDC token for Pages

## Deployment Process

### Automatic Deployment

1. Make changes to documentation
2. Commit and push to `master` branch:
   ```bash
   git add .
   git commit -m "Update documentation"
   git push origin master
   ```
3. GitHub Actions automatically:
   - Builds the site
   - Deploys to GitHub Pages
   - Indexes content in Algolia

### Manual Deployment

Trigger manually from GitHub:
1. Go to Actions tab
2. Select "Deploy VuePress Documentation"
3. Click "Run workflow"
4. Select `master` branch
5. Click "Run workflow"

## Monitoring Deployment

### GitHub Actions Dashboard

1. Navigate to repository → Actions
2. Click on latest workflow run
3. View:
   - Build logs
   - Deploy status
   - Performance metrics
   - Error messages

### Deployment Status

Check deployment at:
- Repository → Environments → github-pages
- Shows deployment history
- Links to deployed URLs
- Deployment timestamps

### Build Artifacts

Available for 7 days:
- Download from workflow run
- Contains full site build
- Useful for debugging

## Caching Strategy

### Build Cache

The workflow caches:

1. **npm dependencies**
   - Key: `package-lock.json` hash
   - Path: `~/.npm`
   - Managed by `actions/setup-node`

2. **VuePress build artifacts**
   - Key: Package lock + source files
   - Paths:
     - `node_modules/.cache`
     - `src/.vuepress/.cache`
     - `src/.vuepress/.temp`

### Cache Benefits

- Faster builds (30-50% reduction)
- Lower bandwidth usage
- Consistent build environments

### Cache Invalidation

Cache updates when:
- `package-lock.json` changes
- Source files change
- Manual workflow dispatch

Clear cache by:
1. Repository Settings → Actions → Caches
2. Delete specific caches
3. Or update cache key in workflow

## Rollback Procedure

### Option 1: Revert Commit

```bash
# Find commit to revert
git log --oneline

# Revert the commit
git revert <commit-hash>

# Push to trigger redeploy
git push origin master
```

### Option 2: Deploy Previous Build

1. Go to Actions → Successful workflow
2. Download artifacts
3. Manually deploy to Pages

### Option 3: Redeploy from History

1. Checkout previous commit
2. Create new branch
3. Force push to master (requires admin)

## Troubleshooting

### Build Failures

**Memory Issues:**
```yaml
env:
  NODE_OPTIONS: --max-old-space-size=8192  # Increase if needed
```

**Sharp Module Errors:**
- Workflow includes `npm rebuild sharp`
- Uses platform-specific builds
- Fallback with `continue-on-error: true`

**Image Processing Failures:**
- Non-blocking (continues build)
- Check Sharp installation
- Verify source image formats

### Deployment Failures

**Pages Not Updating:**
1. Check workflow logs
2. Verify `docs/` directory created
3. Check Pages settings enabled
4. Clear DNS cache

**404 Errors:**
1. Verify base path in config
2. Check asset paths
3. Review routing configuration

**SSL/HTTPS Issues:**
1. Verify custom domain DNS
2. Check CNAME file
3. Enable HTTPS in settings

### Performance Issues

**Slow Builds:**
1. Check cache hit rate
2. Review bundle size
3. Optimize images
4. Reduce dependencies

**Large Bundle Size:**
1. Run bundle analyzer:
   ```bash
   npm run build:analyze
   ```
2. Check for duplicates
3. Review code splitting
4. Optimize assets

## Security

### Secret Management

- Never commit secrets
- Use GitHub Secrets
- Rotate keys regularly
- Limit secret access

### Workflow Security

- Pin action versions
- Review third-party actions
- Use minimal permissions
- Enable branch protection

### Deployment Security

- HTTPS enforced
- Custom domain verified
- No sensitive data in builds
- Regular security audits

## Performance Optimization

### Build Optimization

1. **Caching**
   - npm packages
   - VuePress cache
   - Build artifacts

2. **Parallel Processing**
   - Independent jobs
   - Concurrent uploads
   - Parallel tests

3. **Selective Builds**
   - Skip unchanged files
   - Incremental builds
   - Smart caching

### Runtime Optimization

1. **Code Splitting**
   - Vendor bundles
   - Route-based splits
   - Dynamic imports

2. **Asset Optimization**
   - Image compression
   - Lazy loading
   - CDN usage

3. **Performance Monitoring**
   - Bundle analysis
   - Size tracking
   - Performance budgets

## Maintenance

### Regular Tasks

**Weekly:**
- Review build times
- Check cache efficiency
- Monitor bundle sizes

**Monthly:**
- Update dependencies
- Review security alerts
- Audit performance

**Quarterly:**
- Review workflow efficiency
- Update documentation
- Optimize assets

### Updates

**Node.js Version:**
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20  # Update as needed
```

**Action Versions:**
- Use Dependabot for updates
- Test in PR first
- Review changelogs

## Support

### Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [VuePress Docs](https://vuepress.vuejs.org/)

### Getting Help

1. Check workflow logs
2. Review documentation
3. Search GitHub issues
4. Contact team lead

---

**Last Updated**: 2025-12-26
**Maintained By**: DevOps Team
