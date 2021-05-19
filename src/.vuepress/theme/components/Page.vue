<template>
  <main class="page">
    <slot name="top" />
<!--    class="theme-default-content"-->
    <div class="content-wrapper">
      <cn-container>
        <Content class="page-content"/>
      </cn-container>
    </div>

    <ClientOnly>
      <PageEdit />
      <PageNav v-bind="{ sidebarItems }" />
    </ClientOnly>

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import CnContainer from "../global-components/CnContainer";

export default {
  components: { CnContainer, PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus" >
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
  margin-left 10px
  @media (min-width 1201px)
    padding-left "calc(20rem + %s)" % ($cn-sidebar-margin)
.page-content
  h1
    &:first-of-type
      padding-top 'calc(%s + 57px)' % ($navbarHeight)
    color: $cn-color-primary_light !important
    text-transform uppercase
    width 100%
    text-align center
    //padding-top 57px
  h2
    padding-top 'calc(%s + 57px)' % ($navbarHeight)
    margin-top -120px
    color $cn-color-secondary
</style>
