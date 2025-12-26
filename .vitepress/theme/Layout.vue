<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useVersion } from './composables'
import Footer from './components/Footer.vue'

const { Layout } = DefaultTheme

// Use composables for version switching
const { versions, currentVersion, switchVersion, getVersionDisplayName } = useVersion()
</script>

<template>
  <Layout>
    <!-- Version selector in navbar -->
    <template #nav-bar-content-after>
      <div v-if="versions && currentVersion" class="version-selector">
        <select
          :value="currentVersion"
          @change="(e: Event) => switchVersion((e.target as HTMLSelectElement).value)"
          class="version-dropdown"
          aria-label="Select documentation version"
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

    <!-- Custom footer -->
    <template #layout-bottom>
      <Footer />
    </template>
  </Layout>
</template>

<style>
/* Fix navbar title overflow */
:deep(.VPNavBarTitle .title span) {
  white-space: nowrap;
  overflow: visible !important;
  text-overflow: clip !important;
  max-width: none !important;
}

/* Ensure navbar container has proper width */
:deep(.VPNavBarTitle.has-sidebar) {
  flex-shrink: 0;
}

:deep(.VPNavBar .container) {
  max-width: 100%;
}

:deep(.VPNavBar .title) {
  flex: 0 0 auto;
  overflow: visible;
}

/* Fix z-index stacking - navbar above sidebar */
:deep(.VPNav) {
  z-index: var(--vp-z-index-nav, 30);
}

:deep(.VPSidebar) {
  z-index: var(--vp-z-index-sidebar, 10);
}

/* Ensure footer appears below all content and not covered by sidebar */
:deep(.VPFooter) {
  position: relative;
  z-index: 1;
  margin-left: 0 !important;
  width: 100%;
  clear: both;
}
</style>

<style scoped>
/* Version Selector Styling */
.version-selector {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.version-dropdown {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.version-dropdown:hover {
  background: var(--vp-c-bg-elv);
  border-color: var(--vp-c-brand-1);
}

.version-dropdown:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .version-selector {
    margin-left: 0.5rem;
  }

  .version-dropdown {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
