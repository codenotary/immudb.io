<template>
  <a href="https://discord.gg/ThSJxNEHhZ" target="_blank">
    <button>
      <font-awesome-icon :icon="['fab', 'discord']" />
    </button>
  </a>
</template>

<script>
export default {
  name: 'DiscordChatWidget'
}
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
}
</style>