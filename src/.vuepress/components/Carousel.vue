<template>
    <component v-if="dynamicComponent" :is="dynamicComponent" v-bind="$attrs">
        <slot />
    </component>
</template>

<script>
export default {
    data() {
        return {
            dynamicComponent: null
        }
    },
    mounted () {
        import('vue-owl-carousel').then(module => {
            this.dynamicComponent = module.default;
        });
    }
}
</script>
