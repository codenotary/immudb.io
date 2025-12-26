/**
 * Blog Functionality Composable
 * Provides blog post listing, filtering, and reading time calculations
 */
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

export interface BlogPost {
  title: string
  description: string
  date: string
  author: string
  tags?: string[]
  image?: string
  path: string
  readingTime?: string
}

export function useBlog() {
  const { theme } = useData()

  /**
   * Get all blog posts from theme config
   */
  const allPosts = computed<BlogPost[]>(() => {
    // Blog posts would be configured in theme or generated from markdown files
    return theme.value.blog?.posts || []
  })

  /**
   * Filter posts by tag
   */
  const filterByTag = (tag: string) => {
    return allPosts.value.filter(post =>
      post.tags?.includes(tag)
    )
  }

  /**
   * Sort posts by date (newest first)
   */
  const sortedPosts = computed(() => {
    return [...allPosts.value].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  })

  /**
   * Get recent posts
   */
  const recentPosts = computed(() => {
    return sortedPosts.value.slice(0, 5)
  })

  /**
   * Calculate reading time for text content
   * Average reading speed: 200 words per minute
   */
  const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  /**
   * Format date for display
   */
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return {
    allPosts,
    sortedPosts,
    recentPosts,
    filterByTag,
    calculateReadingTime,
    formatDate
  }
}
