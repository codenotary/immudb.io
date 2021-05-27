<template>
  <div
    class="sidebar-button"
    @click="$emit('toggle-sidebar')"
  >
    <img
      class="icon"
      :src="open ? '/icons/close.svg' : '/icons/hamburger.svg'"
    >
<!--    <svg-->
<!--      class="icon"-->
<!--      xmlns="http://www.w3.org/2000/svg"-->
<!--      aria-hidden="true"-->
<!--      role="img"-->
<!--      viewBox="0 0 448 512"-->
<!--    >-->
<!--      <path-->
<!--        fill="currentColor"-->
<!--        d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"-->
<!--        class=""-->
<!--      />-->
<!--    </svg>-->
  </div>
</template>

<script>
export default {
  name: 'SidebarButton',
  props: {
    open: {
      type: Boolean,
    },
  }
}
</script>

<style lang="stylus">
.sidebar-button
  cursor pointer
  display none
  width 24px
  height 24px
  //position absolute
  margin-right 30px
  top 0.6rem
  left 1rem
  .icon
    display block
    width 24px
    height 24px

@media (max-width: $MQMobile)
  .sidebar-button
    display block
</style>
