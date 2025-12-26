<template>
  <div class="container" :class="variant" name="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'none' | 'gradient' | 'gradient_inverse'
}

withDefaults(defineProps<Props>(), {
  variant: 'none',
})
</script>

<style scoped>
.container.gradient {
  background: var(--cn-dark-gradient);
}

.container.gradient_inverse {
  background: var(--cn-dark-gradient-inverse);
}
</style>
