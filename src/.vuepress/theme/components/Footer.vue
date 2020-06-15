<template>
    <div class="footer">
        <i-container>
            <i-row>
                <i-column>
                    <span class="copyright">Copyright &copy; vChain {{ year }}</span>
                    <i-nav class="list -inline _font-size-sm">
                        <i-nav-item to="/blog">Blog</i-nav-item>
                        <i-nav-item to="/docs">Documentation</i-nav-item>
                        <i-nav-item to="/careers">Careers</i-nav-item>
                        <i-nav-item href="https://github.com/codenotary/immudb" target="_blank">GitHub</i-nav-item>
                    </i-nav>
                </i-column>
            </i-row>
        </i-container>
    </div>
</template>

<style lang="stylus">
.footer
    padding 2.5rem
    border-top 1px solid $borderColor
    color lighten($textColor, 25%)

    .column
        display flex
        justify-content space-between

        @media screen and (max-width: 767px)
            flex-direction: column-reverse
            align-items center

            .nav
                margin-bottom: 1rem
</style>

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
