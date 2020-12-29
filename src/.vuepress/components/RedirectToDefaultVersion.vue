<template>

</template>

<script>
import { getDefaultVersion } from "../theme/util";

export default {
  name: "RedirectToDefaultVersion",
  beforeMount() {
    this.$router.replace({ path: getDefaultVersion() });
  }
}
</script>

<style scoped>

</style>
