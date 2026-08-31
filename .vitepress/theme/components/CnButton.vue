<template>
  <!--
    Render exactly one interactive element. Wrapping an <a> in a <button> nests
    interactive controls, which is invalid HTML and made axe report the button as
    obscured by its own link: the only part not covered was the 7px of vertical
    padding. The router-link branch is gone with it — VitePress ships no
    vue-router, so it could never have resolved.
  -->
  <a
    v-if="href"
    class="no-hover"
    :class="dynamicClass"
    :style="buttonStyle"
    v-bind="$attrs"
    :href="href"
    :rel="safeRel"
    :target="target"
  >
    <slot />
  </a>
  <button
    v-else
    :class="dynamicClass"
    :style="buttonStyle"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'secondary' | 'light' | 'primary' | 'primary-inverse' | 'social'
  href?: string | null
  size?: string
  target?: string
  rel?: string | null
  inline?: boolean
  bottomOffset?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  href: null,
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

// A link opening a new tab must not hand it window.opener. Callers pass things
// like rel="external", so merge rather than replace.
const safeRel = computed(() => {
  const rel = props.rel ?? ''
  if (props.target !== '_blank') return rel || undefined
  const tokens = new Set(rel.split(/\s+/).filter(Boolean))
  tokens.add('noopener')
  tokens.add('noreferrer')
  return [...tokens].join(' ')
})

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
  text-decoration: none;
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
