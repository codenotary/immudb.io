<template>
 <div class="container" :class="variant">
   <slot></slot>
 </div>
</template>

<script>
export default {
  name: "CnContainer",
  props: {
    variant: {
      type: String,
      default: 'none',
    },
  }
}
</script>

<style lang="stylus" scoped>
.container
  &.gradient
    background: $cn-dark-gradient

  &.gradient_inverse
    background: $cn-dark-gradient_inverse

</style>
