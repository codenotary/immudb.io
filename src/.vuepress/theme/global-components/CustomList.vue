<template>
  <div class="custom-list" :class="computedClass">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "CustomList",
  props: {
    size: {
      type: String,
      default: 'normal',
    },
    inverse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClass() {
      return {
        [`${this.size}-blocks`]: true,
        'inverse-blocks': this.inverse,
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.custom-list
  &.wide-blocks
    ul
      li
        width 188px
        @media (max-width $MQMobile)
          width 150px
          height 50px
  &.small-blocks
    ul
      gap 10px
      li
        box-sizing border-box
        width 140px
        height 50px
        border 1px solid $cn-color-grey_dark;
        @media (max-width $MQMobile)
          width 125px
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
      height 50px
      width 155px
      box-shadow $cn-shadow-sm
      border-radius 7px
      background-color $cn-color-primary_dark
      display flex
      justify-content center
      align-items center
      @media (max-width $MQMobile)
        width 145px
</style>
