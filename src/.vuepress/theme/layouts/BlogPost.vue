<template>
    <div id="blog" class="theme-container" :class="pageClasses" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>

        <div class="sidebar-mask" @click="toggleSidebar(false)" />

        <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
            <template #top>
                <slot name="sidebar-top" />
            </template>
            <template #bottom>
                <slot name="sidebar-bottom" />
            </template>
        </Sidebar>

        <i-container id="blog-post">
            <i-row>
                <i-column>
                    <article>
                        <h1 class="blog-post-title">{{ $page.frontmatter.title }}</h1>
                        <p class="blog-post-excerpt">{{ $page.frontmatter.excerpt }}</p>
                        <ul class="blog-post-meta list -inline">
                            <li>Published on {{ date | dateFormat('MMMM DD, YYYY') }}</li>
                            <li>&middot;</li>
                            <li>{{ $page.readingTime.text }}</li>
                        </ul>

                        <div class="blog-post-image">
                            <img class="image -fluid" :src="$withBase($page.frontmatter.image)" :alt="$page.title" />
                        </div>

                        <Content class="theme-default-content" />
                    </article>
                </i-column>
            </i-row>
        </i-container>

        <Footer />
    </div>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'
import Footer from '@theme/components/Footer.vue'
import readingTime from 'reading-time';

export default {
    name: 'BlogPostLayout',
    extends: Layout,
    components: {
        Footer
    },
    computed: {
        date() {
            return new Date(this.$page.frontmatter.date);
        }
    }
}
</script>
