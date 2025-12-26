<template>
  <header class="navbar">
    <SidebarButton :open="isSidebarOpen" @toggle-sidebar="emit('toggle-sidebar')" />

    <RouterLink :to="localePath" class="home-link">
      <img
        v-if="theme.logo"
        class="logo"
        :src="withBase(theme.logo)"
        :alt="site.title"
      >
      <span
        v-if="site.title"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': theme.logo }"
      >{{ site.title }}</span>
    </RouterLink>

    <div
      class="links cn-text-sm"
      :style="linksWrapMaxWidth ? { 'max-width': `${linksWrapMaxWidth}px` } : {}"
    >
      <NavLinks class="can-hide" />
    </div>

    <div class="actions flex row">
      <AlgoliaSearchBox
        class="can-hide"
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <SearchBox
        class="can-hide"
        v-else-if="theme.search !== false && page.frontmatter.search !== false"
      />
      <VersionsDropdown />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'
import SidebarButton from './SidebarButton.vue'
import NavLinks from './NavLinks.vue'
import SearchBox from './SearchBox.vue'
import AlgoliaSearchBox from './AlgoliaSearchBox.vue'
import VersionsDropdown from './VersionsDropdown.vue'

/**
 * Props
 */
interface Props {
  isSidebarOpen: boolean
}

const props = defineProps<Props>()

/**
 * Emits
 */
const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

/**
 * VitePress data
 */
const { theme, page, site } = useData()

/**
 * State
 */
const siteName = ref<HTMLElement | null>(null)
const linksWrapMaxWidth = ref<number | null>(null)

/**
 * Computed properties
 */
const localePath = computed(() => '/')

const algolia = computed(() => {
  return (theme.value as any).algolia || {}
})

const isAlgoliaSearch = computed(() => {
  return algolia.value && algolia.value.apiKey && algolia.value.indexName
})

/**
 * Lifecycle hooks
 */
onMounted(() => {
  const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
  const navbarEl = siteName.value?.parentElement?.parentElement?.parentElement

  if (!navbarEl) return

  const NAVBAR_VERTICAL_PADDING =
    parseInt(css(navbarEl, 'paddingLeft')) +
    parseInt(css(navbarEl, 'paddingRight'))

  const handleLinksWrapWidth = () => {
    if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
      linksWrapMaxWidth.value = null
    } else {
      linksWrapMaxWidth.value =
        navbarEl.offsetWidth -
        NAVBAR_VERTICAL_PADDING -
        (siteName.value?.offsetWidth || 0)
    }
  }

  handleLinksWrapWidth()
  window.addEventListener('resize', handleLinksWrapWidth, false)
})

/**
 * Helper function to get computed styles
 */
function css(el: HTMLElement, property: string): string {
  const win = el.ownerDocument.defaultView
  return win ? win.getComputedStyle(el, null)[property as any] : ''
}
</script>

<style scoped>
.navbar {
  padding: 0.7rem var(--cn-md-padding);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.navbar a {
  font-weight: normal;
}

.navbar a,
.navbar span,
.navbar img {
  display: inline-block;
}

.navbar .logo {
  height: 55px;
  vertical-align: top;
}

.navbar .site-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-color);
  position: relative;
}

.navbar .links {
  padding-left: 1.5rem;
  box-sizing: border-box;
  background-color: transparent;
  white-space: nowrap;
  flex: 1;
  justify-content: flex-start;
  right: var(--cn-md-padding);
  top: 0.7rem;
  display: flex;
}

.navbar .links .search-box {
  flex: 0 0 auto;
  vertical-align: top;
}

@media (max-width: 1600px) {
  .navbar {
    padding: 0.7rem var(--cn-sm-padding);
  }
}

@media (max-width: 920px) {
  .navbar {
    padding: 0.7rem var(--cn-xs-padding);
  }

  .navbar .logo {
    height: 38px;
  }

  .navbar .can-hide {
    display: none;
  }

  .navbar .links {
    padding-left: 1.5rem;
  }

  .navbar .site-name {
    width: calc(100vw - 9.4rem);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
