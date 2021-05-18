<template>
  <div class="footer">
      <div class="flex row">
          <div class="flex column">
              <span class="copyright">Copyright &copy; vChain {{ year }}</span>
              <div>
                  <a href="https://codenotary.io/blog">Blog</a>
                  <router-link to="/">Documentation</router-link>
                  <a href="https://codenotary.io/careers">Careers</a>
                  <a href="https://github.com/codenotary/immudb" target="_blank">GitHub</a>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
    components: {
      NavLink
    },
    data() {
        return {
            year: (new Date()).getFullYear()
        };
    }
}
</script>

<style lang="stylus">
.footer
  padding 2.5rem
  border-top 1px solid $borderColor
  color lighten($textColor, 25%)
  z-index 11
  background-color $cn-color-dark
  position relative

  .column
    display flex
    justify-content space-between

    @media screen and (max-width: 767px)
      flex-direction: column-reverse
      align-items center

      .nav
        margin-bottom: 1rem
</style>
