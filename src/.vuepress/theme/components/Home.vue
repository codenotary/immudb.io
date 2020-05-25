<template>
    <main>
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
                    <NavLink class="button" :item="actionLink"/>
                </p>

                <github-button href="https://github.com/codenotary/immudb"
                   data-icon="octicon-star" data-size="large" data-show-count="true"
                   aria-label="Star codenotary/immudb on GitHub">
                    Star
                </github-button>
            </div>
        </header>

        <Content />

        <div v-if="data.copyright" v-html="data.copyright" class="footer"></div>
    </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import GithubButton from 'vue-github-button'

export default {
    name: 'Home',
    components: {
        NavLink,
        GithubButton
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
.hero
    text-align center
    display block
    background-image: url('/header3.jpg')
    background-attachment: static
    background-repeat: no-repeat
    background-size: cover
    background-position: center center
    padding: $navbarHeight 0 0

    .hero-content
        max-width: $homePageWidth
        padding: 2rem 0 10rem
        display: block
        margin 0 auto

    img
        max-width: 100%
        max-height 280px
        display block
        margin 3rem auto 1.5rem

    h1
        font-size 3rem
    h1, .description, .action
        margin 2rem auto

    .description
        max-width 35rem
        font-size 1.2rem
        line-height 1.5
        color lighten($textColor, 40%)

.features
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
    margin-top: -130px

.feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    border: 1px solid $borderColor
    padding: 1.5rem
    box-sizing border-box
    background white
    margin-bottom: 2rem
    border-radius: 4px
    border-bottom: 4px solid $accentColor

    img
        max-width: 100px
        margin: 0 auto
        display: block

    h2
        font-size 1.4rem
        font-weight 500
        border-bottom none
        padding-bottom 0
        color: $accentColor
        text-align center

#easy-setup-section
    margin-top: -2rem
    max-width: 980px

    > .language-bash
        margin-top: 2rem
        width: auto
        display inline-block

pre code
    font-size: 0.9rem

#video-section
    padding: 2rem 0
    color: white
    text-align center
    background-image: url('/corner-left-right-asymmetric.png')
    background-size: 100% auto
    background-repeat no-repeat
    background-position: top center

    h2
        font-size: 2.4rem
        margin 0 0 1rem
        border-bottom 0
        color: white

    p
        color: rgba(white, 0.8)

    .video-features
        display: flex
        width: 100%
        margin-top: 4rem

        ul
            width: 33%
            text-align: left
            margin-left: 2rem
            list-style: none
            font-size: 1.2rem

            li
                display: flex
                align-items center
                margin-bottom: 0.5rem

            svg
                margin-right: 1rem

        .video
            padding: 1rem
            background white
            display: block
            width: 67%
            box-sizing border-box

        @media screen and (max-width: 979px)
            flex-direction column

            ul,
            .video
                width: 100%
                margin-left: 0

.footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: 980px)
    .features
        flex-direction column
        text-align: center

    .feature
        width 100%
        max-width 100%

@media (max-width: $MQMobileNarrow)
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

#usedby
    padding-top: 0
    justify-content space-between

    img
        margin: 0 auto
        display block
        opacity: 0.3
        transition: opacity 0.3s ease

        &:hover
            opacity: 0.6

#performance
    img
        margin: 1rem auto 0
</style>
