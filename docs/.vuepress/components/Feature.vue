<template>
    <div class="feature">
        <img :src="$withBase(image)" :alt="title"/>
        <h2>{{ title }}</h2>
        <slot></slot>
    </div>
</template>

<style lang="stylus">
.feature
    border: 1px solid $borderColor
    padding: 1.2rem
    box-sizing border-box
    background white
    margin-bottom: 2rem
    border-radius: 4px
    border-bottom: 4px solid $accentColor

    img
        max-width: 100px
        margin: 0 auto
        display: block

    h2
        font-size 1.4rem
        font-weight 500
        margin-top: 1.5rem
        border-bottom none
        padding-bottom 0
        color: $accentColor
        text-align center

    @media (max-width: 980px)
        width 100%
        max-width 100%
</style>

<script>
export default {
    props: {
        image: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>
