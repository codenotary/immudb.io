<template>
    <main id="homepage">
        <subscribe v-model="subscribeModalVisible" />
        <header class="hero">
            <div class="hero-content">
                <img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heroAlt || 'hero'">

                <h1 v-if="data.heroText !== null" id="main-title">
                    {{ data.heroText || $title || 'Hello' }}
                </h1>

                <p v-if="data.tagline !== null" class="description">
                    {{ data.tagline || $description || 'Welcome to your VuePress site' }}
                </p>

                <p v-if="data.actionText && data.actionLink" class="action">
                    <i-button size="lg" variant="primary" :to="data.actionLink">{{data.actionText}}</i-button>
                </p>

                <p>
                    <i-button link variant="primary" @click="subscribeModalVisible = true">
                        <i-badge size="sm" variant="primary" class="_margin-right-1-2">New</i-badge> Sign up for beta of Cloud Ledger DB
                    </i-button>
                </p>

                <div id="github-button">
                    <github-button href="https://github.com/codenotary/immudb"
                                   data-icon="octicon-star" data-size="large" data-show-count="true"
                                   aria-label="Star codenotary/immudb on GitHub">
                        Star
                    </github-button>
                </div>
            </div>
        </header>

        <Content />

        <Footer />
    </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import Footer from '@theme/components/Footer.vue'
import GithubButton from 'vue-github-button'
import Subscribe from "./Subscribe";

export default {
  name: 'Home',

  components: {
      Subscribe,
      NavLink,
      GithubButton,
      Footer
  },

  data() {
    return {
        subscribeModalVisible: false
    };
  },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

#github-button
    height: 28px

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
