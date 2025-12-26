<template>
  <component
    v-if="dynamicComponent"
    :is="dynamicComponent"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, type Component } from 'vue'

const dynamicComponent = ref<Component | null>(null)

onMounted(async () => {
  try {
    const module = await import('vue-owl-carousel')
    dynamicComponent.value = module.default
  } catch (error) {
    console.error('Failed to load vue-owl-carousel:', error)
  }
})
</script>
