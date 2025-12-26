<template>
  <span class="reading-time">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="clock-icon"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
    {{ readingTime }} min read
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

interface Props {
  wordsPerMinute?: number
}

const props = withDefaults(defineProps<Props>(), {
  wordsPerMinute: 200
})

const { page } = useData()

const readingTime = computed(() => {
  // Get the markdown content
  const content = page.value.content || ''

  // Remove code blocks to avoid counting code
  const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '')

  // Remove inline code
  const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]+`/g, '')

  // Remove markdown syntax
  const plainText = withoutInlineCode
    .replace(/#{1,6}\s/g, '') // headers
    .replace(/\*\*|__/g, '') // bold
    .replace(/\*|_/g, '') // italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // links
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // images
    .replace(/^\s*[-*+]\s/gm, '') // lists
    .replace(/^\s*\d+\.\s/gm, '') // numbered lists
    .replace(/^\s*>\s/gm, '') // blockquotes
    .replace(/\n+/g, ' ') // newlines

  // Count words
  const wordCount = plainText
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length

  // Calculate reading time (minimum 1 minute)
  const minutes = Math.max(1, Math.ceil(wordCount / props.wordsPerMinute))

  return minutes
})

const wordCount = computed(() => {
  const content = page.value.content || ''
  const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '')
  const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]+`/g, '')
  const plainText = withoutInlineCode
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*|__/g, '')
    .replace(/\*|_/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')
    .replace(/^\s*[-*+]\s/gm, '')
    .replace(/^\s*\d+\.\s/gm, '')
    .replace(/^\s*>\s/gm, '')
    .replace(/\n+/g, ' ')

  return plainText
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length
})

// Expose reading time data for other components to use
defineExpose({
  readingTime,
  wordCount
})
</script>

<style scoped>
.reading-time {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
}

.clock-icon {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

.reading-time:hover .clock-icon {
  opacity: 1;
}
</style>
