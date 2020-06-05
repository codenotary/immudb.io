<template>
    <div class="footer">Copyright &copy; vChain {{ year }}</div>
</template>

<script>
export default {
    data() {
        return {
            year: (new Date()).getFullYear()
        };
    }
}
</script>
