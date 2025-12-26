<template>
  <component :is="renderComponent" />
</template>

<script setup lang="ts">
import { h, computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { isActive, hashRE, groupHeaders } from '../utils/navigation'

/**
 * Props
 */
interface SidebarLinkItem {
  type?: string
  path?: string
  title?: string
  basePath?: string
  children?: any[]
  headers?: any[]
  slug?: string
  level?: number
}

interface Props {
  item: SidebarLinkItem
  sidebarDepth?: number
}

const props = defineProps<Props>()

/**
 * VitePress composables
 */
const { page, theme, site } = useData()
const route = useRoute()

/**
 * Helper functions
 */
function renderLink(to: string | undefined, text: string, active: boolean, level?: number) {
  // Skip rendering if path is undefined or empty
  if (!to) {
    return h('span', { class: 'sidebar-link' }, text)
  }

  const component = {
    to,
    class: {
      active,
      'sidebar-link': true
    }
  }

  return h('RouterLink', component, () => text)
}

function renderChildren(
  children: any[] | undefined,
  path: string,
  maxDepth: number,
  depth = 1
): any {
  if (!children || !children.length || depth > maxDepth) return null

  return h(
    'ul',
    { class: 'sidebar-sub-headers' },
    children.map(c => {
      const active = isActive(route, path + '#' + c.slug)
      return h('li', { class: 'sidebar-sub-header' }, [
        renderLink(path + '#' + c.slug, c.title, active, c.level - 1),
        renderChildren(c.children, path, maxDepth, depth + 1)
      ])
    })
  )
}

function renderExternal(to: string, text: string) {
  return h(
    'a',
    {
      href: to,
      target: '_blank',
      rel: 'noopener noreferrer',
      class: 'sidebar-link'
    },
    [text, h('OutboundLink')]
  )
}

/**
 * Render component
 */
const renderComponent = computed(() => {
  const { item, sidebarDepth = 1 } = props

  // use custom active class matching logic
  const selfActive = isActive(route, item.path)

  // for sidebar: auto pages, a hash link should be active if one of its child matches
  const active = item.type === 'auto'
    ? selfActive || (item.children || []).some(c =>
        isActive(route, item.basePath + '#' + c.slug)
      )
    : selfActive

  const link = item.type === 'external'
    ? renderExternal(item.path || '', item.title || item.path || '')
    : renderLink(item.path, item.title || item.path || '', active)

  const maxDepth = [
    page.value.frontmatter.sidebarDepth,
    sidebarDepth,
    (theme.value as any).sidebarDepth,
    1
  ].find(depth => depth !== undefined) || 1

  const displayAllHeaders =
    (theme.value as any).displayAllHeaders || false

  if (item.type === 'auto') {
    return () => [
      link,
      renderChildren(item.children, item.basePath || '', maxDepth)
    ]
  } else if (
    (active || displayAllHeaders) &&
    item.headers &&
    !hashRE.test(item.path || '')
  ) {
    const children = groupHeaders(item.headers)
    return () => [
      link,
      renderChildren(children, item.path || '', maxDepth)
    ]
  } else {
    return () => link
  }
})
</script>

<style scoped>
.sidebar .sidebar-sub-headers {
  font-size: 0.95em;
}

.sidebar-links > li > .sidebar-link:not(:last-child) {
  position: relative;
}

.sidebar-links > li > .sidebar-link:not(:last-child):after {
  content: '';
  height: 19px;
  width: 11px;
  background-image: url("/icons/arrow-right.svg");
  right: 5px;
  position: absolute;
  top: calc(50% - 9.5px);
  transition: transform 0.100s linear;
}

.sidebar-links > li > .sidebar-link:not(:last-child).active {
  position: relative;
}

.sidebar-links > li > .sidebar-link:not(:last-child).active:after {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
}

a.sidebar-link {
  font-size: 1em;
  font-weight: 400;
  display: inline-block;
  color: var(--text-color);
  padding: 0.35rem 1rem 0.35rem 0;
  line-height: 1.4;
  width: 100%;
  box-sizing: border-box;
}

a.sidebar-link:not(.active) + .sidebar-sub-headers {
  display: none;
}

a.sidebar-link:hover {
  color: var(--accent-color);
}

a.sidebar-link.active {
  font-weight: 600;
  color: var(--accent-color);
  border-left-color: var(--accent-color);
}

a.sidebar-link.active + .sidebar-sub-headers {
  display: block;
}

.sidebar-sub-headers a.sidebar-link {
  padding-left: 17px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-left: none;
}

.sidebar-sub-headers a.sidebar-link.active {
  font-weight: 500;
}
</style>
