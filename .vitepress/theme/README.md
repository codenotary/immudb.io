# immudb VitePress Custom Theme

## Overview

This directory contains the custom VitePress theme for immudb documentation. The theme extends VitePress's default theme with custom branding, multi-version support, and blog functionality.

## Quick Start

The theme is automatically loaded by VitePress. No additional configuration needed beyond what's in `.vitepress/config.ts`.

```bash
# Development
npm run docs:dev

# Build
npm run docs:build
```

## Directory Structure

```
theme/
├── index.ts              # Theme entry point & component registration
├── Layout.vue           # Custom layout with version selector
├── components/          # Vue components
│   ├── BlogIndex.vue   # Blog listing page
│   ├── BlogCard.vue    # Individual blog card
│   ├── BlogPost.vue    # Blog post layout
│   ├── ReadingTime.vue # Reading time calculator
│   ├── Tabs.vue        # Tab container
│   ├── TabPanel.vue    # Tab panel content
│   └── index.ts        # Component exports
├── composables/         # Vue composition functions
│   ├── useDynamicSidebar.ts  # Version-aware sidebar
│   ├── useVersion.ts         # Version management
│   ├── useBlog.ts            # Blog utilities
│   └── index.ts              # Composable exports
└── styles/              # Stylesheets
    ├── index.css        # Main stylesheet (imports all others)
    ├── variables.css    # CSS custom properties/variables
    ├── branding.css     # VitePress theme overrides
    ├── code.css         # Code block styling
    ├── custom-blocks.css # Tip/warning/danger blocks
    ├── typography.css    # Text and heading styles
    ├── mobile.css       # Responsive mobile styles
    └── components/      # Component-specific styles
        ├── arrow.css
        ├── wrapper.css
        ├── toc.css
        └── grid.css
```

## Key Features

### 1. Multi-Version Documentation

- **24 versions** supported (master + v1.9DOM.1 through v0.8.0)
- **Version selector** in navbar
- **Version badge** in sidebar
- **Automatic routing** preserves page path when switching versions

### 2. Custom Branding

All immudb brand colors and styles:
- Primary: `#24c4a1` (teal)
- Secondary: `#febf2d` (yellow)
- Dark backgrounds: `#13274b`, `#153954`, `#0d3049`
- Custom gradients, shadows, and border radius

### 3. Global Components

Ready to use in any markdown file:
- `<BlogIndex />` - Blog listing
- `<BlogCard />` - Blog preview
- `<Tabs>` - Tab container
- `<TabPanel>` - Tab content
- `<font-awesome-icon icon="name" />` - 37 icons available

### 4. FontAwesome Integration

37 icons pre-configured:
- **Brands**: GitHub, Twitter, LinkedIn
- **Solid**: Database, Rocket, Shield, Lock, Server, Cloud, Users, and more

### 5. Custom Layout Slots

Extended VitePress layout with:
- Version selector in navbar
- Version badge in sidebar
- Custom footer content
- Hero section customization

## Usage Examples

### Using Tabs in Markdown

```markdown
<Tabs>
  <TabPanel title="JavaScript">
    ```js
    const immudb = require('immudb-node')
    ```
  </TabPanel>
  <TabPanel title="Python">
    ```python
    from immudb import ImmudbClient
    ```
  </TabPanel>
  <TabPanel title="Go">
    ```go
    import "github.com/codenotary/immudb/pkg/client"
    ```
  </TabPanel>
</Tabs>
```

### Using Icons

```markdown
<font-awesome-icon icon="database" /> Database

<font-awesome-icon icon="rocket" /> Fast

<font-awesome-icon :icon="['fab', 'github']" /> GitHub
```

### Using Blog Components

```markdown
<!-- List all blog posts -->
<BlogIndex />

<!-- Single blog post -->
<BlogPost
  title="Getting Started with immudb"
  date="2024-01-15"
  author="John Doe"
/>
```

## Composables API

### useDynamicSidebar

```vue
<script setup>
import { useDynamicSidebar } from '.vitepress/theme/composables'

const { currentVersion, currentSidebar, hasSidebar } = useDynamicSidebar()
</script>
```

**Returns**:
- `currentVersion`: Current version from URL (e.g., "master", "v1.5.0")
- `currentSidebar`: Sidebar items for current version
- `hasSidebar`: Boolean if sidebar should be shown

### useVersion

```vue
<script setup>
import { useVersion } from '.vitepress/theme/composables'

const {
  currentVersion,
  versions,
  switchVersion,
  isCurrentVersion,
  getVersionDisplayName
} = useVersion()
</script>
```

**Returns**:
- `currentVersion`: Current version
- `versions`: Array of all 24 versions
- `switchVersion(version)`: Function to switch to different version
- `isCurrentVersion(version)`: Check if version is current
- `getVersionDisplayName(version)`: Get display name (e.g., "Latest (master)")

### useBlog

```vue
<script setup>
import { useBlog } from '.vitepress/theme/composables'

const {
  allPosts,
  sortedPosts,
  recentPosts,
  filterByTag,
  calculateReadingTime,
  formatDate
} = useBlog()
</script>
```

**Returns**:
- `allPosts`: All blog posts
- `sortedPosts`: Posts sorted by date (newest first)
- `recentPosts`: 5 most recent posts
- `filterByTag(tag)`: Filter posts by tag
- `calculateReadingTime(content)`: Calculate reading time
- `formatDate(date)`: Format date for display

## Styling

### CSS Variables

All brand variables are in `styles/variables.css`:

```css
:root {
  /* Brand Colors */
  --cn-color-primary: #24c4a1;
  --cn-color-secondary: #febf2d;
  --cn-color-dark: #13274b;

  /* Dimensions */
  --navbar-height: 85px;
  --sidebar-width: 300px;

  /* Border Radius */
  --cn-border-radius-sm: 10px;
  --cn-border-radius-md: 20px;
  --cn-border-radius-lg: 30px;

  /* Shadows */
  --cn-shadow-sm: 3px 3px 10px rgba(0, 0, 0, 0.15);
}
```

### VitePress Overrides

The `branding.css` maps these to VitePress theme variables:

```css
:root {
  --vp-c-brand-1: var(--cn-color-primary);
  --vp-c-bg: var(--cn-color-dark);
  /* ... */
}
```

### Custom Styles

Add custom styles in three ways:

1. **Component-scoped**: `<style scoped>` in `.vue` files
2. **Theme styles**: Add to appropriate `.css` file
3. **Global overrides**: Add to `branding.css`

## Adding New Components

1. Create component in `components/`:
   ```bash
   touch .vitepress/theme/components/MyComponent.vue
   ```

2. Export from `components/index.ts`:
   ```typescript
   export { default as MyComponent } from './MyComponent.vue'
   ```

3. Register in `theme/index.ts`:
   ```typescript
   import { MyComponent } from './components'
   app.component('MyComponent', MyComponent)
   ```

4. Use in markdown:
   ```markdown
   <MyComponent prop="value" />
   ```

## Adding FontAwesome Icons

1. Import in `theme/index.ts`:
   ```typescript
   import { faNewIcon } from '@fortawesome/free-solid-svg-icons'
   ```

2. Add to library:
   ```typescript
   library.add(faNewIcon)
   ```

3. Use in components or markdown:
   ```vue
   <font-awesome-icon icon="new-icon" />
   ```

## Theme Configuration

Main configuration in `.vitepress/config.ts`:

```typescript
export default defineConfig({
  themeConfig: {
    logo: '/logo_white.svg',
    nav: [...],
    sidebar: {
      '/master/': sidebarMaster,
      '/v1.5.0/': sidebarV1_5_0,
      // ... all versions
    }
  }
})
```

## Development

### Hot Reload

All theme changes hot-reload during development:

```bash
npm run docs:dev
```

Changes to these files reload instantly:
- Vue components (`.vue`)
- Stylesheets (`.css`)
- TypeScript (`.ts`)
- Configuration (`.vitepress/config.ts`)

### Type Checking

```bash
npm run typecheck
```

### Building

```bash
npm run docs:build
```

Output: `docs/` directory

## File Sizes

Keep files modular and maintainable:
- Components: < 200 lines
- Composables: < 150 lines
- Stylesheets: < 500 lines
- Split large files into smaller modules

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari
- Chrome Mobile

## Performance

The theme is optimized for:
- **Code splitting**: Components load on-demand
- **Tree-shaking**: Unused code removed
- **CSS optimization**: Minified and concatenated
- **Icon optimization**: Only used FontAwesome icons included

## Troubleshooting

### Styles not applying
1. Check CSS import order in `styles/index.css`
2. Verify CSS variable names
3. Clear browser cache
4. Check specificity (VitePress styles may override)

### Components not rendering
1. Check component registration in `theme/index.ts`
2. Verify export in `components/index.ts`
3. Check for TypeScript errors
4. Ensure Vue 3 syntax

### Version selector not working
1. Verify `Layout.vue` is imported
2. Check composables exports
3. Ensure sidebar config includes all versions

## Migration Notes

Migrated from VuePress to VitePress:

### Breaking Changes
- New slot names (check VitePress docs)
- Different composable APIs
- CSS variable naming conventions

### Improvements
- Faster builds (Vite vs Webpack)
- Better hot reload
- Improved TypeScript support
- Smaller bundle sizes

## Resources

- [VitePress Documentation](https://vitepress.dev)
- [Vue 3 Documentation](https://vuejs.org)
- [FontAwesome Vue](https://fontawesome.com/docs/web/use-with/vue/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

Apache 2.0 - See LICENSE file

## Contributing

1. Follow existing code style
2. Add TypeScript types
3. Document new components
4. Test across versions
5. Update this README
