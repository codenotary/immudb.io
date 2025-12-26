<template>
  <div
    class="theme-container blank"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Page :sidebar-items="sidebarItems">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useData, useRouter } from 'vitepress'
import Navbar from '../Navbar.vue'
import Page from '../Page.vue'
import Sidebar from '../Sidebar.vue'
import Footer from '../Footer.vue'
import { resolveSidebarItems } from '../../utils'

// VitePress composables
const { theme, page, frontmatter, site } = useData()
const router = useRouter()

// State
const isSidebarOpen = ref(false)
const touchStart = ref({ x: 0, y: 0 })

// Computed properties
const shouldShowNavbar = computed(() => {
  const themeConfig = theme.value
  const fm = frontmatter.value

  if (fm.navbar === false || themeConfig.navbar === false) {
    return false
  }

  return (
    site.value.title ||
    themeConfig.logo ||
    themeConfig.repo ||
    themeConfig.nav
  )
})

const shouldShowSidebar = computed(() => {
  const fm = frontmatter.value
  return (
    !fm.home &&
    fm.sidebar !== false &&
    sidebarItems.value.length > 0
  )
})

const sidebarItems = computed(() => {
  return resolveSidebarItems(
    page.value,
    page.value.relativePath,
    site.value,
    ''
  )
})

const pageClasses = computed(() => {
  const userPageClass = frontmatter.value.pageClass
  return [
    {
      'no-navbar': !shouldShowNavbar.value,
      'sidebar-open': isSidebarOpen.value,
      'no-sidebar': !shouldShowSidebar.value
    },
    userPageClass
  ]
})

// Methods
const toggleSidebar = (to?: boolean) => {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
}

const onTouchStart = (e: TouchEvent) => {
  touchStart.value = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY
  }
}

const onTouchEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - touchStart.value.x
  const dy = e.changedTouches[0].clientY - touchStart.value.y

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.value.x <= 80) {
      toggleSidebar(true)
    } else {
      toggleSidebar(false)
    }
  }
}

// Lifecycle
onMounted(() => {
  router.onAfterRouteChanged = () => {
    isSidebarOpen.value = false
  }
})
</script>
