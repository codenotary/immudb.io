<template>
	<button
		:class="dynamicClass" v-bind="$attrs"
	>
		<router-link v-if="to" class="table_link" :to="to">
			<slot>
			</slot>
		</router-link>
		<a class="no-hover" :href="href" v-else-if="href" :rel="rel" :target="target">
			<slot></slot>
		</a>
		<slot v-else></slot>
	</button>
</template>
<script>
export default {
	name: 'CnButton',
	props: {
		variant: {
			type: String,
			default: 'secondary',
		},
		href: {
			type: String,
			default: null,
		},
		to: {
			type: Object,
			default: null,
		},
		size: {
			type: String,
			default: 'lg',
		},
		target: {
			type: String,
			default: '_self',
		},
    rel: {
      type: String,
      default: null,
    },
		inline: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		dynamicClass() {
			return {
				'cn-button': true,
				['cn-button_' + this.variant]: true,
				'cn-button_inline': this.inline,
			};
		},
	},
};
</script>
<style lang="stylus" scoped>
ahover,
afocus,
aactive
	color unset
	text-decoration unset
	outline-width 0


.cn-button
	outline none
	cursor pointer
	box-shadow $cn-shadow-sm
	border-radius $cn-button-radius
	border unset
	height $cn-button-height
	padding 14px 30px
	display flex
	flex-direction column
	justify-content center
	align-items center
	transition all 0.3s ease-out

	&_inline
		display inline-flex

	&_light
		background-color $cn-color-light
		color $cn-color-dark

		&:hover,
		&:focus,
		&:active  // Becomes secondary
			background-color $cn-color-secondary
			color $cn-color-dark



	&_secondary
		background-color $cn-color-secondary
		color $cn-color-dark

		&:hover,
		&:focus,
		&:active  // Becomes light
			background-color $cn-color-light
			color $cn-color-dark



	&_primary
		color white !important
		background-color $cn-color-primary

		&:hover,
		&:focus,
		&:active  // Becomes primary inverse
			color $cn-color-primary
			background-color white
			border 1px solid $cn-color-primary



	&_primary-inverse
		color $cn-color-primary
		background-color white
		border 1px solid $cn-color-primary

		&:hover,
		&:focus,
		&:active  // Becomes primary
			color white !important
			background-color $cn-color-primary
			border none

	&_social
		background-color $cn-color-light
		color $cn-color-primary_darker
		border none
		padding 7px 15px
		flex-direction row
		a
			display flex
			flex-direction row
			justify-content center
			align-items center
			height 100%
			& > *:not(:first-child)
				border-left 1px solid $cn-color-grey
				padding-left 10px
				height 100%
				display flex
				justify-content center
				align-items center
			& > *:not(:last-child)
				margin-right 10px
			& > *:last-child
				color $cn-color-brand
		& > *:not(:first-child)
			border-left 1px solid $cn-color-grey
			padding-left 10px
			height 100%
			display flex
			justify-content center
			align-items center
		& > *:not(:last-child)
			margin-right 10px
		& > *:last-child
			color $cn-color-brand



	&:disabled,
	&:disabled:hover,
	&:disabled:focus
		cursor not-allowed
		opacity 0.4
		pointer-events none


	&active
		-webkit-animation scale-animation 100ms linear


	& > a
		color inherit


</style>
