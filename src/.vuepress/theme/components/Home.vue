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

        <section class="section" aria-labelledby="main-title">
            <div class="features">
                <div class="feature">
                    <img src="/immutable2.svg" alt="Immutable"/>
                    <h2>Immutable</h2>
                    <p>Any kind of key-value. Clients can choose how to structure data.</p>
                    <p><strong>No data mutation APIs</strong> are provided.</p>
                    <p>Data is never overwritten, so multiple versions of the same key can co-exist and can be inspected.</p>
                </div>
                <div class="feature">
                    <img src="/auditable3.svg" alt="Immutable"/>
                    <h2>Auditable</h2>
                    <p>Tamper-evident history system.</p>
                    <p>Clients and auditors ask for <strong>cryptographic proofs</strong>  of data inclusion and historical consistency in real time.</p>
                    <p>If tampered, clients and auditors will be able to notice that and take actions.</p>
                </div>
                <div class="feature">
                    <img src="/secure2.svg" alt="Immutable"/>
                    <h2>Secure</h2>
                    <p>If needed, clients and auditors can verify data ownership.</p>
                    <p>Data can be signed using <strong>Public-Key Cryptography</strong>.</p>
                    <p>Keys additions and revocations can be immutably stored into the database</p>
                </div>
            </div>
        </section>

        <section id="easy-setup-section" class="section _text-center _padding-top-0">
            <h2>Easy setup</h2>
            <p>
                You can either build Docker images based on the Dockerfiles in the GitHub repository
                for the most common architectures or use the prebuild ones on Dockerhub for Linux.
            </p>
            <div class="language-bash extra-class">
                <pre class="language-bash">
<code><span class="token function">docker run</span> -it -d -p 3322:3322 -p 9497:9497 --name <span class="token function">immudb</span> codenotary/immudb:latest</code></pre>
            </div>
        </section>

        <div id="video-section" class="section-wrapper -primary">
            <section class="section">
                <h2>Why immudb?</h2>
                <p>
                    immudb has been developed with performance, scalability and versatility in mind.
                    The user feedback has shown that they love the very high throughput and being able to
                    store hashes as well as data. They see it as a great alternative to using a blockchain
                    or ledger service.
                </p>
                <div class="video-features">
                    <div class="video">
                        <div class="_embed _embed-16by9">
                            <iframe width="560" height="315" frameborder="0"
                                    src="https://www.youtube.com/embed/rQ4iZAM14m0?controls=0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <font-awesome-icon icon="check-circle" />
                            Easy setup
                        </li>
                        <li>
                            <font-awesome-icon icon="check-circle" />
                            Fast and reliable immutable database
                        </li>
                        <li>
                            <font-awesome-icon icon="check-circle" />
                            Secure REST API gateway
                        </li>
                        <li>
                            <font-awesome-icon icon="check-circle" />
                            Powerful, easy to use admin
                        </li>
                        <li>
                            <font-awesome-icon icon="check-circle" />
                            Open source
                        </li>
                    </ul>
                </div>
            </section>
        </div>

        <section class="section">
            <Content class="theme-default-content custom" />
        </section>

        <div v-if="data.footer" class="footer">
            {{ data.footer }}
        </div>
    </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import GithubButton from 'vue-github-button'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckCircle);

export default {
    name: 'Home',
    components: {
        NavLink,
        GithubButton,
        FontAwesomeIcon
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
    margin-top: -100px

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

    > .language-bash
        margin-top: 2rem
        width: auto
        display inline-block

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
</style>
