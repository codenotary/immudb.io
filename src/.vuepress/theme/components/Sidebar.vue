<template>
  <aside class="sidebar">
    <AlgoliaSearchBox
      class="search-box"
      inputId="sidebarSearchbox"
      v-if="isAlgoliaSearch"
      :options="algolia"
    />
    <SearchBox class="search-box" v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"/>

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

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'

export default {
  name: 'Sidebar',
  components: {
    SidebarLinks,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox,
  },
  props: ['items'],
  computed: {
    algolia() {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },
    isAlgoliaSearch() {
	  return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },
  }
}
</script>

<style lang="stylus">
.sidebar
  background-color $cn-color-dark
  margin-left $cn-md-padding
  text-transform uppercase
  font-weight bold
  overflow visible
  display flex
  flex-direction column
  .scrollable-area
    overflow-y auto
    padding-top 60px
    padding-bottom 350px

  @media (max-width $MQNarrow)
    margin-left $cn-xs-padding
  @media (max-width $MQMobile)
    margin-left $cn-xs-padding
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .search-box
    margin-top 30px
    display none
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem


@media (max-width: $MQMobile)
  .sidebar
    margin-left 0
    z-index 12
    .search-box
      display block
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
    .scrollable-area
      padding-bottom 30px
      padding-top 0
</style>
