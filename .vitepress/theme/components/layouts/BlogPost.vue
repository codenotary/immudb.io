<template>
  <div
    id="blog"
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <i-container id="blog-post">
      <i-row>
        <i-column>
          <article>
            <h1 class="blog-post-title">{{ frontmatter.title }}</h1>
            <p class="blog-post-excerpt">{{ frontmatter.excerpt }}</p>
            <ul class="blog-post-meta list -inline">
              <li>Published on {{ formattedDate }}</li>
              <li>&middot;</li>
              <li>{{ readingTime }}</li>
            </ul>

            <div class="blog-post-image">
              <img
                class="image -fluid"
                :src="fullsizeImage"
                :alt="frontmatter.title"
              />
            </div>

            <Content class="theme-default-content" />
          </article>
        </i-column>
      </i-row>
    </i-container>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import Navbar from '../Navbar.vue'
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
const formattedDate = computed(() => {
  if (!frontmatter.value.date) return ''
  const date = new Date(frontmatter.value.date)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const readingTime = computed(() => {
  // Simple reading time calculation (150 words per minute)
  const content = page.value.content || ''
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 150)
  return `${minutes} min read`
})

const fullsizeImage = computed(() => {
  if (!frontmatter.value.image) return ''
  const baseUrl = withBase(frontmatter.value.image)
  return baseUrl.replace(/^\/blog/, '/blog/fullsize')
})

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
      'sidebar-open': isSidebarOpen.value
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
