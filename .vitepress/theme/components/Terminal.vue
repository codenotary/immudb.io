<template>
  <div class="terminal-wrapper">
    <div class="terminal">
      <div class="bar">
        <div class="buttons">
          <span class="circle red"></span>
          <span class="circle yellow"></span>
          <span class="circle green"></span>
        </div>
        <div class="title">{{ title }}</div>
      </div>
      <div class="body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'bash'
})
</script>

<style>
.terminal-wrapper {
  display: block;
  box-sizing: border-box;
}

.terminal-wrapper .title {
  text-align: center;
}

.terminal-wrapper .red {
  background: #EC6A5F;
  border-color: #D04E42;
}

.terminal-wrapper .green {
  background: #64CC57;
  border-color: #4EA73B;
}

.terminal-wrapper .yellow {
  background: #F5C04F;
  border-color: #D6A13D;
}

.terminal-wrapper .clear {
  clear: both;
}

.terminal {
  border-radius: 5px;
  position: relative;
}

.terminal .bar {
  background: #E8E6E8;
  color: black;
  padding: 5px;
  border-radius: 5px 5px 0 0;
}

.terminal .buttons {
  position: absolute;
  top: 7px;
  left: 5px;
}

.terminal .circle {
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 15px;
  margin-left: 2px;
  border-width: 1px;
  border-style: solid;
}

.terminal .body {
  background: #282c34;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
}

.terminal div[class*="language-"] {
  border-radius: 0;
}

.terminal div[class*="language-"] pre {
  padding: 2rem;
  display: block;
  box-sizing: border-box;
  overflow: auto;
  margin: 0;
  min-height: 350px;
}
</style>
