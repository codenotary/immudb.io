<template>
  <div v-if="prev || next" class="page-nav">
    <p class="inner">
      <span v-if="prev" class="prev flex row cn-text-xs align-center">
        <img
          src="/icons/back.svg"
          alt="previous-arrow"
          width="20"
          height="20"
          style="margin-right: 6px"
        />
        <a
          v-if="prev.type === 'external'"
          class="prev"
          :href="prev.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ prev.title || prev.path }}
          <OutboundLink />
        </a>

        <RouterLink v-else class="prev" :to="prev.path">
          {{ prev.title || prev.path }}
        </RouterLink>
      </span>

      <span v-if="next" class="next flex row cn-text-xs align-center">
        <a
          v-if="next.type === 'external'"
          :href="next.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ next.title || next.path }}
          <OutboundLink />
        </a>

        <RouterLink v-else :to="next.path">
          {{ next.title || next.path }}
        </RouterLink>
        <img
          src="/icons/next.svg"
          alt="next-arrow"
          width="20"
          height="20"
          style="margin-left: 6px"
        />
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { resolvePage } from '../utils/navigation'

/**
 * Props
 */
interface SidebarItem {
  type?: string
  path?: string
  title?: string
  items?: SidebarItem[]
  children?: SidebarItem[]
  [key: string]: any
}

interface Props {
  sidebarItems: SidebarItem[]
}

const props = defineProps<Props>()

/**
 * VitePress composables
 */
const { page, theme, site } = useData()
const route = useRoute()

/**
 * Link types configuration
 */
const LINK_TYPES = {
  NEXT: {
    resolveLink: resolveNext,
    getThemeLinkConfig: (themeConfig: any) => themeConfig.nextLinks,
    getPageLinkConfig: (pageData: any) => pageData.frontmatter.next
  },
  PREV: {
    resolveLink: resolvePrev,
    getThemeLinkConfig: (themeConfig: any) => themeConfig.prevLinks,
    getPageLinkConfig: (pageData: any) => pageData.frontmatter.prev
  }
}

/**
 * Helper functions
 */
function find(pageData: any, items: SidebarItem[], offset: number): SidebarItem | undefined {
  const res: SidebarItem[] = []
  flatten(items, res)

  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(pageData.relativePath)) {
      return res[i + offset]
    }
  }
}

function flatten(items: SidebarItem[], res: SidebarItem[]) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || items[i].items || [], res)
    } else {
      res.push(items[i])
    }
  }
}

function resolvePrev(pageData: any, items: SidebarItem[]) {
  return find(pageData, items, -1)
}

function resolveNext(pageData: any, items: SidebarItem[]) {
  return find(pageData, items, 1)
}

function resolvePageLink(linkType: any) {
  const { resolveLink, getThemeLinkConfig, getPageLinkConfig } = linkType

  // Get link config from theme
  const themeLinkConfig = getThemeLinkConfig(theme.value)

  // Get link config from current page
  const pageLinkConfig = getPageLinkConfig(page.value)

  // Page link config will overwrite global theme link config if defined
  const link = pageLinkConfig !== null && pageLinkConfig !== undefined
    ? pageLinkConfig
    : themeLinkConfig

  if (link === false) {
    return undefined
  } else if (typeof link === 'string') {
    return resolvePage(site.value.pages, link, route.path)
  } else {
    return resolveLink(page.value, props.sidebarItems)
  }
}

/**
 * Computed properties
 */
const prev = computed(() => resolvePageLink(LINK_TYPES.PREV))
const next = computed(() => resolvePageLink(LINK_TYPES.NEXT))
</script>

<style scoped>
.page-nav {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 2rem 2.5rem;
  padding-top: 1rem;
  padding-bottom: 0;
  bottom: 0;
  position: absolute;
  width: calc(100% - (var(--cn-md-padding) + var(--sidebar-width)) - 5rem);
}

@media (max-width: 1600px) {
  .page-nav {
    width: calc(100% - (var(--cn-xs-padding) + var(--sidebar-width)) - 4rem);
  }
}

@media (max-width: 920px) {
  .page-nav {
    width: calc(100% - 4rem);
  }
}

@media (max-width: 419px) {
  .page-nav {
    width: calc(100% - 3rem);
  }
}

.page-nav .inner {
  min-height: 2rem;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 1rem;
  overflow: auto;
}

.page-nav .next {
  float: right;
  font-weight: bold;
  max-width: 48%;
}

.page-nav .next a {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-nav .prev {
  float: left;
  font-weight: bold;
  max-width: 48%;
}

.page-nav .prev a {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
