<template>
  <article class="blog-card">
    <a :href="post.url" class="card-link">
      <div v-if="post.image" class="card-image">
        <img :src="post.image" :alt="post.title" loading="lazy" />
      </div>

      <div class="card-content">
        <div class="card-meta">
          <time v-if="post.date" :datetime="post.date" class="card-date">
            {{ formatDate(post.date) }}
          </time>
          <span v-if="post.category" class="card-category">
            {{ post.category }}
          </span>
        </div>

        <h2 class="card-title">{{ post.title }}</h2>

        <p v-if="post.excerpt || post.description" class="card-excerpt">
          {{ post.excerpt || post.description }}
        </p>

        <div class="card-footer">
          <div v-if="post.tags && post.tags.length > 0" class="card-tags">
            <span
              v-for="tag in post.tags.slice(0, 3)"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>

          <div v-if="post.author" class="card-author">
            By {{ post.author }}
          </div>
        </div>
      </div>
    </a>
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from '../../blog.data'

interface Props {
  post: BlogPost
}

defineProps<Props>()

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
.blog-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.card-date {
  display: flex;
  align-items: center;
}

.card-category {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.card-excerpt {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.card-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.card-author {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

@media (max-width: 768px) {
  .card-content {
    padding: 1rem;
  }

  .card-title {
    font-size: 1.125rem;
  }
}
</style>
