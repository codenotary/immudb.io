<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>{{ randomMessage }}</blockquote>

      <RouterLink to="/">
        Take me home.
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const messages = [
  "There's nothing here.",
  "How did we get here?",
  "That's a Four-Oh-Four.",
  "Looks like we've got some broken links."
]

const randomMessage = computed(() => {
  return messages[Math.floor(Math.random() * messages.length)]
})
</script>
