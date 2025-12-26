<template>
  <div class="wrapped-section" :class="{ thin }">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  thin?: boolean
}>(), {
  thin: false
})
</script>

<style scoped>
.wrapped-section {
  border-radius: var(--cn-border-radius-lg);
  box-shadow: var(--cn-shadow-sm);
  background-color: var(--cn-color-primary-dark);
  padding: 40px;
  margin-bottom: 32px;
  overflow: hidden;
}

.wrapped-section.thin {
  padding: 0;
}

.wrapped-section.thin p {
  margin: 0;
}

@media (max-width: 920px) {
  .wrapped-section {
    margin-bottom: 16px;
    padding: 20px;
  }
}

.wrapped-section h2:first-of-type {
  margin-top: calc(-1 * var(--navbar-height) - 57px);
  color: white;
  text-transform: uppercase;
}

.wrapped-section > h3 {
  padding-top: calc(var(--navbar-height) + 57px);
  margin-top: -145px;
  color: var(--cn-color-secondary);
}

.wrapped-section > h3:not(:first-child) {
  margin-top: -110px;
}

.wrapped-section p {
  margin-bottom: 0;
}
</style>
