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
                    <h1 class="blog-post-title">immudb</h1>
                    <p class="blog-post-excerpt">{{ $description }}</p>
                </i-column>
            </i-row>
        </i-container>

        <i-container id="blog-posts" class="_margin-top-4">
            <i-row id="default-layout">
                <template v-for="page in $pagination.pages">
                    <i-column lg="4" md="6">
                        <i-card class="blog-entry">
                            <router-link slot="image" class="blog-entry-image" :to="page.path">
                                <img class="foreground image -fluid" :src="thumbnail($withBase(page.frontmatter.image))" :alt="page.frontmatter.title" />
                                <img class="background image -fluid" :src="thumbnail($withBase('/blog/background.jpg'))" :alt="page.frontmatter.title" />
                            </router-link>
                            <router-link class="blog-entry-title" :to="page.path">
                                <h2>{{ page.frontmatter.title }}</h2>
                            </router-link>
                            <p class="blog-entry-meta">{{ date(page.frontmatter.date) | dateFormat('MMMM DD, YYYY') }}</p>
                            <p class="blog-entry-description">{{ page.frontmatter.excerpt }}</p>
                        </i-card>
                    </i-column>
                </template>
            </i-row>
            <i-row>
                <i-column class="_text-center">
                    <ul class="list -inline" id="pagination" v-if="$pagination.hasPrev || $pagination.hasNext">
                        <li v-if="$pagination.hasPrev">
                            <router-link :to="$pagination.prevLink">Prev</router-link>
                        </li>
                        <li v-if="$pagination.hasNext">
                            <router-link :to="$pagination.nextLink">Next</router-link>
                        </li>
                    </ul>
                </i-column>
            </i-row>
        </i-container>
        <Footer />
    </div>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'
import Footer from '@theme/components/Footer.vue'

export default {
    name: 'BlogPostLayout',
    extends: Layout,
    components: {
        Footer
    },
    methods: {
        date(date) {
            return new Date(date);
        },
        thumbnail(url) {
            return url.replace(/^\/blog/, '/blog/thumbnail')
        }
    }
}
</script>
