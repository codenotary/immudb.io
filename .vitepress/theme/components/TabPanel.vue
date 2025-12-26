<template>
  <div
    v-show="isActive"
    :id="`tab-panel-${id}`"
    class="tab-panel"
    role="tabpanel"
    :aria-hidden="!isActive"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, type Ref } from 'vue'
import type { TabItem } from './Tabs.vue'

interface Props {
  id: string
  label: string
  icon?: any
}

const props = defineProps<Props>()

// Inject from parent Tabs component
const activeTabId = inject<Ref<string>>('activeTabId')
const registerTab = inject<(tab: TabItem) => void>('registerTab')
const unregisterTab = inject<(tabId: string) => void>('unregisterTab')

// Check if this tab is active
const isActive = computed(() => {
  return activeTabId?.value === props.id
})

// Register this tab on mount
onMounted(() => {
  if (registerTab) {
    registerTab({
      id: props.id,
      label: props.label,
      icon: props.icon
    })
  }
})

// Unregister on unmount
onUnmounted(() => {
  if (unregisterTab) {
    unregisterTab(props.id)
  }
})

defineExpose({
  isActive
})
</script>

<style scoped>
.tab-panel {
  animation: fadeIn 0.2s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Preserve spacing and formatting */
.tab-panel :deep(pre) {
  margin: 1rem 0;
}

.tab-panel :deep(p:first-child) {
  margin-top: 0;
}

.tab-panel :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
