<template>
  <a
    v-if="isExternal(item.link)"
    :href="item.link"
    class="nav-link external"
    :target="isMailto(item.link) || isTel(item.link) ? null : '_blank'"
    :rel="isMailto(item.link) || isTel(item.link) ? null : 'noopener noreferrer'"
    @focusout="$emit('focusout')"
  >
    {{ item.text }}
    <OutboundLink v-if="!isMailto(item.link) && !isTel(item.link)" />
  </a>
  <a
    v-else
    :href="withBase(item.link)"
    class="nav-link"
    :class="{ active: isActive }"
    :aria-current="isActive ? 'page' : null"
    @focusout="$emit('focusout')"
  >
    {{ item.text }}
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'
import OutboundLink from './OutboundLink.vue'

interface NavItem {
  text: string
  link: string
  activeMatch?: string
}

interface Props {
  item: NavItem
}

const props = defineProps<Props>()

defineEmits<{
  focusout: []
}>()

const route = useRoute()

const isActive = computed(() => {
  if (props.item.activeMatch) {
    return new RegExp(props.item.activeMatch).test(route.path)
  }
  return route.path === props.item.link
})

function isExternal(path: string): boolean {
  return /^[a-z]+:/i.test(path)
}

function isMailto(path: string): boolean {
  return /^mailto:/i.test(path)
}

function isTel(path: string): boolean {
  return /^tel:/i.test(path)
}
</script>

<style scoped>
.nav-link {
  display: inline-block;
  color: inherit;
  line-height: 1.4rem;
  text-decoration: none;
}

.nav-link.active {
  font-weight: 600;
  color: var(--vp-c-brand);
}

.nav-link:hover {
  color: var(--vp-c-brand);
}

.nav-link.external {
  display: inline-flex;
  align-items: center;
}

.nav-link.external :deep(svg) {
  margin-left: 0.25rem;
  width: 0.875rem;
  height: 0.875rem;
}
</style>
