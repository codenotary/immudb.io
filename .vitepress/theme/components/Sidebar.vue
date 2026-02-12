<template>
  <aside class="sidebar">
    <SearchBox
      class="search-box"
      v-if="theme.search !== false && page.frontmatter.search !== false"
    />

    <div class="scrollable-area">
      <NavLinks />

      <slot name="top" />

      <SidebarLinks
        :depth="0"
        :items="items"
      />
    </div>

    <slot name="bottom" />
  </aside>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import SidebarLinks from './SidebarLinks.vue'
import NavLinks from './NavLinks.vue'
import SearchBox from './SearchBox.vue'

/**
 * Props
 */
interface SidebarItem {
  text?: string
  link?: string
  items?: SidebarItem[]
  type?: string
  children?: any[]
  [key: string]: any
}

interface Props {
  items: SidebarItem[]
}

const props = defineProps<Props>()

/**
 * VitePress data
 */
const { theme, page } = useData()
</script>

<style scoped>
.sidebar {
  background-color: var(--cn-color-dark);
  margin-left: var(--cn-md-padding);
  text-transform: uppercase;
  font-weight: bold;
  overflow: visible;
  display: flex;
  flex-direction: column;
}

.sidebar .scrollable-area {
  overflow-y: auto;
  padding-top: 60px;
  padding-bottom: 350px;
}

@media (max-width: 1600px) {
  .sidebar {
    margin-left: var(--cn-xs-padding);
  }
}

@media (max-width: 920px) {
  .sidebar {
    margin-left: var(--cn-xs-padding);
  }
}

.sidebar ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.sidebar a {
  display: inline-block;
}

.sidebar .search-box {
  margin-top: 30px;
  display: none;
}

.sidebar .nav-links {
  display: none;
  border-bottom: 1px solid var(--border-color);
  padding: 0.5rem 0 0.75rem 0;
}

.sidebar .nav-links a {
  font-weight: 600;
}

.sidebar .nav-links .nav-item,
.sidebar .nav-links .repo-link {
  display: block;
  line-height: 1.25rem;
  font-size: 1.1em;
  padding: 0.5rem 0 0.5rem 1.5rem;
}

.sidebar > .sidebar-links {
  padding: 1.5rem 0;
}

.sidebar > .sidebar-links > li > a.sidebar-link {
  font-size: 1.1em;
  line-height: 1.7;
  font-weight: bold;
}

.sidebar > .sidebar-links > li:not(:first-child) {
  margin-top: 0.75rem;
}

@media (max-width: 920px) {
  .sidebar {
    margin-left: 0;
    z-index: 12;
  }

  .sidebar .search-box {
    display: block;
  }

  .sidebar .nav-links {
    display: block;
  }

  .sidebar .nav-links .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
    top: calc(1rem - 2px);
  }

  .sidebar > .sidebar-links {
    padding: 1rem 0;
  }

  .sidebar .scrollable-area {
    padding-bottom: 30px;
    padding-top: 0;
  }
}
</style>
