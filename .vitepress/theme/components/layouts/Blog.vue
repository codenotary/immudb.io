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
          <h1 class="blog-post-title">immudb blog</h1>
          <p class="blog-post-excerpt">{{ site.description }}</p>
        </i-column>
      </i-row>
    </i-container>

    <i-container id="blog-posts" class="_margin-top-4">
      <i-row id="default-layout">
        <template v-for="blogPage in paginatedPages" :key="blogPage.url">
          <i-column lg="4" md="6">
            <i-card class="blog-entry">
              <router-link
                slot="image"
                class="blog-entry-image"
                :to="blogPage.url"
              >
                <img
                  class="foreground image -fluid"
                  :src="getThumbnail(blogPage.frontmatter.image)"
                  :alt="blogPage.frontmatter.title"
                />
                <img
                  class="background image -fluid"
                  :src="getThumbnail('/blog/background.jpg')"
                  :alt="blogPage.frontmatter.title"
                />
              </router-link>
              <router-link class="blog-entry-title" :to="blogPage.url">
                <h2>{{ blogPage.frontmatter.title }}</h2>
              </router-link>
              <p class="blog-entry-meta">
                {{ formatDate(blogPage.frontmatter.date) }}
              </p>
              <p class="blog-entry-description">
                {{ blogPage.frontmatter.excerpt }}
              </p>
            </i-card>
          </i-column>
        </template>
      </i-row>
      <i-row>
        <i-column class="_text-center">
          <ul class="list -inline" id="pagination" v-if="hasPrev || hasNext">
            <li v-if="hasPrev">
              <router-link :to="prevLink">Prev</router-link>
            </li>
            <li v-if="hasNext">
              <router-link :to="nextLink">Next</router-link>
            </li>
          </ul>
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
const currentPage = ref(1)
const itemsPerPage = 9

// Computed properties
const allBlogPages = computed(() => {
  // Get all blog posts from site pages
  // This should be adapted based on your actual blog structure
  return []
})

const paginatedPages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return allBlogPages.value.slice(start, end)
})

const hasPrev = computed(() => currentPage.value > 1)

const hasNext = computed(() => {
  return currentPage.value * itemsPerPage < allBlogPages.value.length
})

const prevLink = computed(() => {
  return `/blog/page/${currentPage.value - 1}`
})

const nextLink = computed(() => {
  return `/blog/page/${currentPage.value + 1}`
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
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getThumbnail = (url: string) => {
  if (!url) return ''
  const baseUrl = withBase(url)
  return baseUrl.replace(/^\/blog/, '/blog/thumbnail')
}

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
