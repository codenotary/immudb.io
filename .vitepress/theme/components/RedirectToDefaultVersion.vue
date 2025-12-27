<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(() => {
  // Redirect to /master/ (the default version)
  if (typeof window !== 'undefined') {
    window.location.href = '/master/'
  }
})
</script>

<style scoped>
</style>
