<template>
  <div class="wrapped-section">
    <slot />
  </div>
</template>

<script>
export default {
  name: "WrappedSection"
}
</script>

<style lang="stylus" scoped>
.wrapped-section
  border-radius $cn-border-radius-lg
  box-shadow $cn-shadow-sm
  background-color: $cn-color-primary_dark
  padding 40px
  h2
    margin-top 'calc(-%s - 57px)' % ($navbarHeight)
    color white
    text-transform uppercase
  p
    margin-bottom 0
</style>
