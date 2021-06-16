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
  props: ['sidebarItems'],
}
</script>

<style lang="stylus" >
@require '../styles/wrapper.styl'

.page
  flex-grow 1
  padding-bottom 2rem
  display block
  margin-left 10px
  padding-left "calc(%s + %s)" % ($cn-md-padding $sidebarWidth)
  position relative
  @media (max-width $MQNarrow)
    padding-left "calc(%s + %s)" % ($cn-xs-padding $sidebarWidth)
  @media (max-width $MQMobile)
    padding-left 0
.page-content
  h1
    &:first-of-type
      padding-top 'calc(%s + 57px)' % ($navbarHeight)
      margin-top 0
    color: $cn-color-primary_light !important
    text-transform uppercase
    width 100%
    text-align center
    //padding-top 57px
  h2
    padding-top 'calc(%s + 57px)' % ($navbarHeight)
    margin-top -120px
    //scroll-margin-top $navbarHeight
    //scroll-margin-bottom: -$navbarHeight
    color $cn-color-secondary
    //scroll-snap-type y mandatory
  a
    span
      display none
</style>
