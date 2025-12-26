<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useVersion } from './composables'

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
