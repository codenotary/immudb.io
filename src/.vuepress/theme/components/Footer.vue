<template>
  <div class="footer">
    <div class="flex row main-section">
      <div class="flex column brand">
        <img
          class="logo"
          src="/logos/logo_white_codenotary.svg"
          alt="Codenotary"
        >
        <p class="brand-description cn-text-xs">
          Immutable notarization for all your sensitive data. On-premise or in the cloud, easy to use tamperproof storage with cryptographic verification, processing millions of transactions a second.
        </p>
        <div class="social-links">
          <a href="https://github.com/codenotary">
            <font-awesome-icon :icon="['fab', 'github-square']" />
          </a>
          <a href="https://twitter.com/Codenotary">
            <font-awesome-icon :icon="['fab', 'twitter-square']" />
          </a>
          <a href="https://www.facebook.com/Codenotary-Inc-106257094666687">
            <font-awesome-icon :icon="['fab', 'facebook-square']" />
          </a>
          <a href="https://www.linkedin.com/company/codenotary/">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
        </div>
      </div>
      <div class="flex column table" v-for="(table, index) in content.footer.tables" :key="index">
        <p class="table_title cn-font-weight-bold"> {{ table.title }} </p>
        <div v-for="(link, linkIndex) in table.links" :key="linkIndex">
          <a v-if="link.href !== null"  class="table_link" :href="link.href" target="_blank" rel="noopener nofollow noreferrer">
            {{ link.label }}
          </a>
          <router-link v-else class="table_link" :to="link.internalLink">
            {{ link.label }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex row align-center justify-between copyright">
<!--          <div class="flex column">-->
            <span class="">Copyright © {{ year }} Codenotary, Inc. All rights reserved.</span>
            <div class="row justify-center tos">
              <a href="https://www.codenotary.com/terms-of-service/">
                Terms of Service
              </a>
              <a href="https://www.codenotary.com/privacy-statement">
                Privacy statement
              </a>
            </div>
<!--          </div>-->
    </div>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import GlobalContent from "@theme/content/global";

export default {
    components: {
      NavLink
    },
    data() {
        return {
            year: (new Date()).getFullYear(),
            content: GlobalContent
        };
    }
}
</script>

<style lang="stylus">
.footer
  //padding 2.5rem
  border-top 1px solid $borderColor
  color lighten($textColor, 25%)
  z-index 11
  background-color $cn-color-dark
  position relative

  .column
    //display flex
    justify-content space-between

    @media screen and (max-width: 767px)
      flex-direction: column-reverse
      align-items center

      .nav
        margin-bottom: 1rem


//new style
.footer
  background-color $cn-color-dark !important

  .main-section {
    padding 40px $cn-md-padding
    flex-wrap wrap
  }
  .logo
    height auto
    width 141px


  p
    color white !important

    &.brand-description
      color $cn-color-primary !important
      max-width 340px
      font-size 14px
      line-height 17px



  a
    color $color-gray-30

    &hover,
    &active
      color $color-primary-light



  li
    margin-bottom $spacer


  .social-links
    display: flex;
    gap: 12px;
    font-size: 30px;
    a
      color white

  .table
    display flex
    flex-direction column
    align-items flex-start
    justify-content flex-start
    flex 0 0 200px
    line-height 19px
    margin-top 18px

    &:last-of-type
      flex 0 0 auto

    & > *
      margin 7px 0 0
      width 100%


    .table_title
      margin-bottom 2px
      font-size 18px
      margin-top 0
      line-height 22px


    .table_link
      color $cn-color-primary !important
      font-size 14px
      line-height 17px

      &hover
        color $cn-color-secondary !important


  @media (max-width $MQNarrow)
    .main-section, .copyright
      padding-left $cn-sm-padding !important
      padding-right $cn-sm-padding !important


  @media (max-width $MQMobile)
    .main-section, .copyright
      padding-left $cn-xs-padding !important
      padding-right $cn-xs-padding !important
    .brand
      display flex
      flex-direction column
      flex 1 0 100%
      justify-content center
      align-items center

      .brand-description
        max-width unset


// Copyright
.copyright
  height 100px
  box-sizing border-box
  padding 1.5rem 140px !important
  color $color-gray-30
  text-align center
  font-size 14px
  line-height 17px
  background-color $cn-color-primary_dark !important
  @media (max-width $MQMobile)
    flex-direction column !important
  .tos
    margin-top 10px
  .tos
    a
      padding-left .5rem
      padding-right .5rem
      font-weight bold

</style>
