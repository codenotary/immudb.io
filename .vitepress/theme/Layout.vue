<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { useDynamicSidebar, useVersion } from './composables'

const { Layout } = DefaultTheme

// Access to page data, frontmatter, etc.
const { page, frontmatter, theme } = useData()

// Use composables
const { currentVersion, hasSidebar } = useDynamicSidebar()
const { versions, switchVersion, getVersionDisplayName } = useVersion()
</script>

<template>
  <Layout>
    <!-- Version selector in navbar -->
    <template #nav-bar-content-after>
      <div class="version-selector">
        <select
          :value="currentVersion"
          @change="(e: Event) => switchVersion((e.target as HTMLSelectElement).value as any)"
          class="version-dropdown"
        >
          <option
            v-for="version in versions"
            :key="version"
            :value="version"
          >
            {{ getVersionDisplayName(version) }}
          </option>
        </select>
      </div>
    </template>

    <!-- Custom sidebar content if needed -->
    <template #sidebar-nav-before>
      <div v-if="hasSidebar" class="sidebar-version-info">
        <span class="version-badge">{{ currentVersion }}</span>
      </div>
    </template>

    <!-- Custom footer content -->
    <template #doc-footer-before>
      <div class="custom-footer-content">
        <!-- Additional footer content can go here -->
      </div>
    </template>

    <!-- Home page customizations -->
    <template #home-hero-before>
      <!-- Custom hero section content -->
    </template>

    <template #home-features-after>
      <!-- Additional features or content after main features -->
    </template>

    <!-- Layout-wide customizations -->
    <template #layout-top>
      <!-- Content at the very top of the layout -->
    </template>

    <template #layout-bottom>
      <!-- Content at the very bottom of the layout -->
    </template>
  </Layout>
</template>

<style scoped>
/* Version Selector Styling */
.version-selector {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.version-dropdown {
  background: var(--cn-color-primary-dark);
  color: white;
  border: 1px solid var(--cn-color-primary);
  border-radius: var(--cn-button-radius);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.version-dropdown:hover {
  background: var(--cn-color-primary);
  border-color: var(--cn-color-secondary);
}

.version-dropdown:focus {
  outline: 2px solid var(--cn-color-secondary);
  outline-offset: 2px;
}

/* Sidebar Version Badge */
.sidebar-version-info {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.version-badge {
  display: inline-block;
  background: var(--cn-color-primary);
  color: var(--cn-color-dark);
  padding: 0.25rem 0.75rem;
  border-radius: var(--cn-border-radius-sm);
  font-size: 0.875rem;
  font-weight: bold;
}

/* Custom Footer Content */
.custom-footer-content {
  padding: 2rem 0;
  border-top: 1px solid var(--border-color);
  margin-top: 2rem;
}

/* Responsive adjustments */
@media (max-width: 920px) {
  .version-selector {
    margin-left: 0.5rem;
  }

  .version-dropdown {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }

  .sidebar-version-info {
    padding: 0.5rem;
  }
}
</style>
