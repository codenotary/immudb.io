<template>
  <a href="https://discord.gg/ThSJxNEHhZ" target="_blank" rel="noopener noreferrer">
    <button aria-label="Join Discord">
      <font-awesome-icon :icon="['fab', 'discord']" />
    </button>
  </a>
</template>

<script setup lang="ts">
// Discord chat widget - simple external link component
</script>

<style lang="scss" scoped>
button {
  height: 50px;
  width: 50px;
  font-size: 25px;
  border-radius: 50%;
  padding: 10px;
  border: none;
  color: white;
  background: #5865F2;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #4752C4;
  }

  &:active {
    background: #3C45A5;
  }
}
</style>
