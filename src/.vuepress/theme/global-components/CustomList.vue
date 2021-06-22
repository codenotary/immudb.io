<template>
  <div class="custom-list" :class="computedClass">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "CustomList",
  props: {
    wide: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    computedClass() {
      return {
        'wide-blocks': this.wide,
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.custom-list
  &.wide-blocks
    ul
      gap 22px
      li
        width 188px
  ul
    display flex
    justify-content flex-start
    align-items center
    flex-direction row
    list-style none
    padding-left 0
    flex-wrap wrap
    gap 10px
    li
      height 66px
      width 155px
      box-shadow $cn-shadow-sm
      border-radius 7px
      background-color $cn-color-primary_dark
      display flex
      justify-content center
      align-items center
</style>
