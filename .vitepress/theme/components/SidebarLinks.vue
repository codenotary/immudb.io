<template>
  <ul v-if="items.length" class="sidebar-links">
    <li v-for="(item, i) in items" :key="i">
      <SidebarGroup
        v-if="item.type === 'group'"
        :item="item"
        :open="i === openGroupIndex"
        :collapsable="item.collapsable || item.collapsible"
        :depth="depth"
        @toggle="toggleGroup(i)"
      />
      <SidebarLink
        v-else
        :sidebar-depth="sidebarDepth"
        :item="item"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import { isActive } from '../utils/navigation'

/**
 * Props
 */
interface SidebarItem {
  type?: string
  text?: string
  link?: string
  items?: SidebarItem[]
  children?: SidebarItem[]
  path?: string
  collapsable?: boolean
  collapsible?: boolean
  [key: string]: any
}

interface Props {
  items: SidebarItem[]
  depth?: number
  sidebarDepth?: number
}

const props = withDefaults(defineProps<Props>(), {
  depth: 0,
  sidebarDepth: 1
})

/**
 * State
 */
const route = useRoute()
const openGroupIndex = ref(0)

/**
 * Helper functions
 */
function resolveOpenGroupIndex(items: SidebarItem[]): number {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (descendantIsActive(item)) {
      return i
    }
  }
  return -1
}

function descendantIsActive(item: SidebarItem): boolean {
  if (item.type === 'group') {
    const children = item.children || []
    return children.some(child => {
      if (child.type === 'group') {
        return descendantIsActive(child)
      } else {
        return child.type === 'page' && isActive(route, child.path)
      }
    })
  }
  return false
}

function refreshIndex() {
  const index = resolveOpenGroupIndex(props.items)
  if (index > -1) {
    openGroupIndex.value = index
  }
}

function toggleGroup(index: number) {
  openGroupIndex.value = index === openGroupIndex.value ? -1 : index
}

/**
 * Lifecycle hooks
 */
onMounted(() => {
  refreshIndex()
})

watch(() => route.path, () => {
  refreshIndex()
})
</script>

<style scoped>
.sidebar-links {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
