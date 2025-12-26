# Multi-Version Documentation System

## Quick Reference

This directory contains the multi-version documentation system supporting **21 versions** of immudb.

## File Structure

```
theme/
├── versions.js                          # Central version configuration (21 versions)
├── utils/
│   ├── versionUtils.js                  # Version detection & navigation utilities
│   └── sidebarLoader.js                 # Dynamic sidebar loading system
├── composables/
│   └── useDynamicSidebar.js             # Vue composable for reactive sidebar
└── components/
    ├── EnhancedVersionsDropdown.vue     # Enhanced version selector
    └── VersionMetadata.vue              # Version info display component
```

## Supported Versions (21)

- **Latest:** master
- **Stable:** 1.9.6, 1.9.5, 1.9.4, 1.9.3, 1.5.0, 1.4.1, 1.4.0, 1.3.2, 1.3.1, 1.3.0
- **DOM:** 1.9DOM.1, 1.9DOM.0
- **Legacy:** 1.2.4, 1.2.3, 1.2.2, 1.2.1, 1.1.0, 1.0.0, 0.9.2, 0.8.1

## Quick Examples

### Get Current Version
```javascript
import { getVersionFromRoute } from './versions';

const version = getVersionFromRoute(this.$route);
```

### Load Dynamic Sidebar
```javascript
import { useDynamicSidebar } from './composables/useDynamicSidebar';

const { sidebarItems, currentVersion } = useDynamicSidebar(route);
```

### Switch Version
```javascript
import { switchVersionInPath } from './utils/versionUtils';

const newPath = switchVersionInPath('/1.9.6/api/', 'master');
// Returns: '/master/api/'
```

### Get Version Info
```javascript
import { getVersionMetadata } from './versions';

const meta = getVersionMetadata('1.9.6');
console.log(meta.status);      // 'stable'
console.log(meta.releaseDate); // '2024-12-01'
```

## Components

### EnhancedVersionsDropdown
Enhanced version selector with:
- Grouped versions (Latest/Stable/DOM/Legacy)
- Status badges
- Collapsible legacy section
- Current page preservation

### VersionMetadata
Display version information:
```vue
<VersionMetadata
  :version="currentVersion"
  :show-details="true"
  :show-actions="true"
/>
```

## Documentation

Full documentation available in `/docs`:
- `MULTI_VERSION_SYSTEM.md` - Complete technical documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- `QUICK_START_GUIDE.md` - Quick start and usage guide

## API Overview

### versions.js
- `versions: string[]` - All 21 version identifiers
- `versionMetadata: Object` - Complete metadata
- `getVersionMetadata(version)` - Get version info
- `getVersionLabel(version)` - Get display label
- `isValidVersion(version)` - Validate version
- `getDefaultVersion()` - Get default version

### utils/versionUtils.js
- `extractVersionFromPath(path)` - Extract version from URL
- `switchVersionInPath(path, target)` - Switch version
- `compareVersions(v1, v2)` - Compare versions
- `getChangelogUrl(version)` - Get changelog link
- `detectVersion(context)` - Auto-detect version

### utils/sidebarLoader.js
- `loadSidebarItems(version)` - Load sidebar
- `getSidebarForVersion(version)` - Get config
- `hasSidebarConfig(version)` - Check existence
- `preloadSidebar(version)` - Preload for performance

### composables/useDynamicSidebar.js
```javascript
const {
  sidebarItems,    // Current sidebar
  currentVersion,  // Detected version
  isLoaded,        // Loading state
  preloadVersion,  // Preload function
  clearCache       // Clear cache
} = useDynamicSidebar(route, options);
```

## Performance

- **Sidebar caching** - Loaded sidebars are cached
- **Preloading** - Auto-preload on version change
- **Lazy loading** - Legacy versions collapsed by default

## Adding New Versions

1. Create sidebar config (if needed):
   ```javascript
   // ../../sidebar_vX_X_X.js
   export default version => [...items];
   ```

2. Update `versions.js`:
   ```javascript
   versionMetadata['X.X.X'] = {
     label: 'vX.X.X',
     status: VERSION_STATUS.STABLE,
     releaseDate: '2025-XX-XX',
     order: XXX
   };
   ```

3. Update `utils/sidebarLoader.js`:
   ```javascript
   import sidebarVXXX from '../../sidebar_vX_X_X';
   sidebarMap['X.X.X'] = sidebarVXXX;
   ```

## Troubleshooting

### Version not found
Check `versions.js` - ensure version is in `versionMetadata`

### Sidebar not loading
Check `sidebarLoader.js` - ensure version is mapped in `sidebarMap`

### Cache issues
```javascript
const { clearCache } = useDynamicSidebar(route);
clearCache(); // Clear all cached sidebars
```

## Maintenance

Keep these in sync:
1. Version list in `versions.js`
2. Sidebar mappings in `sidebarLoader.js`
3. Actual sidebar config files in `../../sidebar_*.js`

## Status

✅ **Production Ready**
- All 21 versions supported
- Full backward compatibility
- Comprehensive documentation
- Ready for deployment
