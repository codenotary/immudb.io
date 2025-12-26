<template>
  <article class="blog-post">
    <header class="post-header">
      <div v-if="frontmatter.category" class="post-category">
        {{ frontmatter.category }}
      </div>

      <h1 class="post-title">{{ frontmatter.title || page.title }}</h1>

      <div class="post-meta">
        <time v-if="frontmatter.date" :datetime="frontmatter.date" class="post-date">
          {{ formatDate(frontmatter.date) }}
        </time>

        <span v-if="frontmatter.author" class="post-author">
          By {{ frontmatter.author }}
        </span>

        <ReadingTime />
      </div>

      <div v-if="frontmatter.tags && frontmatter.tags.length > 0" class="post-tags">
        <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </header>

    <div v-if="frontmatter.image" class="post-image">
      <img :src="frontmatter.image" :alt="frontmatter.title" />
    </div>

    <div class="post-content">
      <Content />
    </div>

    <footer class="post-footer">
      <div v-if="frontmatter.tags && frontmatter.tags.length > 0" class="footer-tags">
        <strong>Tags:</strong>
        <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>

      <nav class="post-nav">
        <a v-if="prevPost" :href="prevPost.url" class="nav-link prev">
          <span class="nav-label">← Previous</span>
          <span class="nav-title">{{ prevPost.title }}</span>
        </a>
        <a v-if="nextPost" :href="nextPost.url" class="nav-link next">
          <span class="nav-label">Next →</span>
          <span class="nav-title">{{ nextPost.title }}</span>
        </a>
      </nav>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../../blog.data'
import ReadingTime from './ReadingTime.vue'

const { page, frontmatter } = useData()

const currentIndex = computed(() => {
  return posts.findIndex(post => post.url === page.value.relativePath.replace(/\.md$/, ''))
})

const prevPost = computed(() => {
  const index = currentIndex.value
  return index > 0 ? posts[index - 1] : null
})

const nextPost = computed(() => {
  const index = currentIndex.value
  return index < posts.length - 1 && index !== -1 ? posts[index + 1] : null
})

function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.blog-post {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.post-header {
  margin-bottom: 2rem;
}

.post-category {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem;
  color: var(--vp-c-text-1);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
  margin-bottom: 1rem;
}

.post-date,
.post-author {
  display: flex;
  align-items: center;
}

.post-tags,
.footer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.footer-tags {
  align-items: center;
}

.footer-tags strong {
  margin-right: 0.5rem;
}

.tag {
  padding: 0.375rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.tag:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.post-image {
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: auto;
  display: block;
}

.post-content {
  margin: 2rem 0;
  line-height: 1.7;
  font-size: 1rem;
}

.post-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid var(--vp-c-divider);
}

.post-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
}

.nav-link {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}

.nav-link:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.nav-link.next {
  text-align: right;
  grid-column: 2;
}

.nav-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.nav-title {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .post-title {
    font-size: 2rem;
  }

  .post-nav {
    grid-template-columns: 1fr;
  }

  .nav-link.next {
    grid-column: 1;
    text-align: left;
  }
}
</style>
