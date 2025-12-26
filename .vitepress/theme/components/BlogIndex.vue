<template>
  <div class="blog-index">
    <div class="blog-header">
      <h1 class="blog-title">{{ title }}</h1>
      <p v-if="description" class="blog-description">{{ description }}</p>
    </div>

    <div v-if="tags.length > 0" class="blog-filters">
      <button
        v-for="tag in ['All', ...tags]"
        :key="tag"
        :class="['filter-tag', { active: selectedTag === tag }]"
        @click="selectedTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <div class="blog-grid">
      <BlogCard
        v-for="post in filteredPosts"
        :key="post.url"
        :post="post"
      />
    </div>

    <div v-if="filteredPosts.length === 0" class="no-posts">
      <p>No blog posts found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { data as posts } from '../../blog.data'
import BlogCard from './BlogCard.vue'

interface Props {
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Blog',
  description: ''
})

const selectedTag = ref('All')

const tags = computed(() => {
  const allTags = new Set<string>()
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => allTags.add(tag))
    }
  })
  return Array.from(allTags).sort()
})

const filteredPosts = computed(() => {
  if (selectedTag.value === 'All') {
    return posts
  }
  return posts.filter(post =>
    post.tags?.includes(selectedTag.value)
  )
})
</script>

<style scoped>
.blog-index {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.blog-description {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0 auto;
}

.blog-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.filter-tag {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.filter-tag:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.filter-tag.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.no-posts {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .blog-title {
    font-size: 2rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
