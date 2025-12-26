<template>
  <button
    :class="dynamicClass"
    :style="buttonStyle"
    v-bind="$attrs"
  >
    <router-link v-if="to" class="table_link" :to="to">
      <slot />
    </router-link>
    <a v-else-if="href" class="no-hover" :href="href" :rel="rel" :target="target">
      <slot />
    </a>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'secondary' | 'light' | 'primary' | 'primary-inverse' | 'social'
  href?: string | null
  to?: object | null
  size?: string
  target?: string
  rel?: string | null
  inline?: boolean
  bottomOffset?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  href: null,
  to: null,
  size: 'lg',
  target: '_self',
  rel: null,
  inline: false,
  bottomOffset: null
})

const dynamicClass = computed(() => ({
  'cn-button': true,
  [`cn-button_${props.variant}`]: true,
  'cn-button_inline': props.inline,
}))

const buttonStyle = computed(() => {
  const bottomMargin = props.bottomOffset === null
    ? {}
    : { 'margin-bottom': `${props.bottomOffset}px` }

  return Object.assign({}, bottomMargin)
})
</script>

<style scoped>
a:hover,
a:focus,
a:active {
  color: unset;
  text-decoration: unset;
  outline-width: 0;
}

.cn-button {
  outline: none;
  cursor: pointer;
  box-shadow: var(--cn-shadow-sm);
  border-radius: var(--cn-button-radius);
  border: unset;
  height: var(--cn-button-height);
  padding: 14px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-out;
}

.cn-button_inline {
  display: inline-flex;
}

.cn-button_light {
  background-color: var(--cn-color-light);
  color: var(--cn-color-dark);
}

.cn-button_light:hover,
.cn-button_light:focus,
.cn-button_light:active {
  background-color: var(--cn-color-secondary);
  color: var(--cn-color-dark);
}

.cn-button_secondary {
  background-color: var(--cn-color-secondary);
  color: var(--cn-color-dark);
}

.cn-button_secondary:hover,
.cn-button_secondary:focus,
.cn-button_secondary:active {
  background-color: var(--cn-color-light);
  color: var(--cn-color-dark);
}

.cn-button_primary {
  color: white !important;
  background-color: var(--cn-color-primary);
}

.cn-button_primary:hover,
.cn-button_primary:focus,
.cn-button_primary:active {
  color: var(--cn-color-primary);
  background-color: white;
  border: 1px solid var(--cn-color-primary);
}

.cn-button_primary-inverse {
  color: var(--cn-color-primary);
  background-color: white;
  border: 1px solid var(--cn-color-primary);
}

.cn-button_primary-inverse:hover,
.cn-button_primary-inverse:focus,
.cn-button_primary-inverse:active {
  color: white !important;
  background-color: var(--cn-color-primary);
  border: none;
}

.cn-button_social {
  background-color: var(--cn-color-light);
  color: var(--cn-color-primary-darker);
  border: none;
  padding: 7px 15px;
  flex-direction: row;
}

.cn-button_social a {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.cn-button_social a > *:not(:first-child) {
  border-left: 1px solid var(--cn-color-grey);
  padding-left: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cn-button_social a > *:not(:last-child) {
  margin-right: 10px;
}

.cn-button_social a > *:last-child {
  color: var(--cn-color-brand);
}

.cn-button_social > *:not(:first-child) {
  border-left: 1px solid var(--cn-color-grey);
  padding-left: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cn-button_social > *:not(:last-child) {
  margin-right: 10px;
}

.cn-button_social > *:last-child {
  color: var(--cn-color-brand);
}

.cn-button:disabled,
.cn-button:disabled:hover,
.cn-button:disabled:focus {
  cursor: not-allowed;
  opacity: 0.4;
  pointer-events: none;
}

.cn-button:active {
  -webkit-animation: scale-animation 100ms linear;
  animation: scale-animation 100ms linear;
}

.cn-button > a {
  color: inherit;
}
</style>
