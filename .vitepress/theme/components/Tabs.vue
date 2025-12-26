<template>
  <div class="vp-tabs">
    <div class="tabs-header" role="tablist">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :class="['tab-button', { active: activeTabId === tab.id }]"
        :aria-selected="activeTabId === tab.id"
        role="tab"
        @click="selectTab(tab.id)"
      >
        <component
          v-if="tab.icon"
          :is="tab.icon"
          class="tab-icon"
        />
        {{ tab.label }}
      </button>
    </div>

    <div class="tabs-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, watch } from 'vue'

export interface TabItem {
  id: string
  label: string
  icon?: any
}

interface Props {
  defaultTab?: string
  persist?: boolean
  storageKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: '',
  persist: false,
  storageKey: 'vp-tabs-active'
})

const tabs = ref<TabItem[]>([])
const activeTabId = ref<string>('')

// Provide active tab to child TabPanel components
provide('activeTabId', activeTabId)

// Provide tab registration function
provide('registerTab', (tab: TabItem) => {
  if (!tabs.value.find(t => t.id === tab.id)) {
    tabs.value.push(tab)

    // Set initial active tab
    if (!activeTabId.value) {
      // Try to restore from localStorage if persist is enabled
      if (props.persist && typeof window !== 'undefined') {
        const stored = localStorage.getItem(props.storageKey)
        if (stored && tabs.value.find(t => t.id === stored)) {
          activeTabId.value = stored
          return
        }
      }

      // Otherwise use default or first tab
      activeTabId.value = props.defaultTab || tab.id
    }
  }
})

// Provide tab unregistration function
provide('unregisterTab', (tabId: string) => {
  const index = tabs.value.findIndex(t => t.id === tabId)
  if (index !== -1) {
    tabs.value.splice(index, 1)

    // If the active tab was removed, select the first available tab
    if (activeTabId.value === tabId && tabs.value.length > 0) {
      activeTabId.value = tabs.value[0].id
    }
  }
})

function selectTab(tabId: string) {
  activeTabId.value = tabId

  // Persist to localStorage if enabled
  if (props.persist && typeof window !== 'undefined') {
    localStorage.setItem(props.storageKey, tabId)
  }
}

// Watch for prop changes
watch(() => props.defaultTab, (newDefault) => {
  if (newDefault && tabs.value.find(t => t.id === newDefault)) {
    selectTab(newDefault)
  }
})

defineExpose({
  selectTab,
  tabs,
  activeTabId
})
</script>

<style scoped>
.vp-tabs {
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  overflow-x: auto;
  scrollbar-width: thin;
}

.tabs-header::-webkit-scrollbar {
  height: 4px;
}

.tabs-header::-webkit-scrollbar-track {
  background: transparent;
}

.tabs-header::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.tab-button {
  flex-shrink: 0;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.tab-button:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.tab-button.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.tab-icon {
  width: 1rem;
  height: 1rem;
}

.tabs-content {
  padding: 1.5rem;
}

@media (max-width: 640px) {
  .tab-button {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }

  .tabs-content {
    padding: 1rem;
  }
}
</style>
