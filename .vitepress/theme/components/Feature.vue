<template>
  <div class="feature">
    <img :src="withBase(image)" :alt="title"/>
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

interface Props {
  image?: string
  title?: string
}

withDefaults(defineProps<Props>(), {
  image: '',
  title: ''
})
</script>

<style>
.feature {
  border: 1px solid var(--border-color);
  padding: 1.2rem;
  box-sizing: border-box;
  background: white;
  margin-bottom: 2rem;
  border-radius: 4px;
  border-bottom: 4px solid var(--accent-color);
}

.feature img {
  max-width: 100px;
  margin: 0 auto;
  display: block;
}

.feature h2 {
  font-size: 1.4rem;
  font-weight: 500;
  margin-top: 1.5rem;
  border-bottom: none;
  padding-bottom: 0;
  color: var(--accent-color);
  text-align: center;
}

@media (max-width: 980px) {
  .feature {
    width: 100%;
    max-width: 100%;
  }
}
</style>
