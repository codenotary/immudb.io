<template>
  <Transition
    name="dropdown"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
const setHeight = (element: Element) => {
  const el = element as HTMLElement
  // Explicitly set height so that it can be transitioned
  el.style.height = el.scrollHeight + 'px'
}

const unsetHeight = (element: Element) => {
  const el = element as HTMLElement
  el.style.height = ''
}
</script>

<style>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: height 0.1s ease-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  height: 0 !important;
}
</style>
