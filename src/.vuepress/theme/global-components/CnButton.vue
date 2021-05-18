<template>
	<button
		:class="dynamicClass" v-bind="$attrs"
	>
		<router-link v-if="to" class="table_link" :to="to">
			<slot>
			</slot>
		</router-link>
		<a class="no-hover" :href="href" v-else-if="href">
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
	},
	computed: {
		dynamicClass() {
			return {
				'cn-button': true,
				['cn-button_' + this.variant]: true,
			};
		},
	},
};
</script>
<style lang="stylus" scoped>
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
	box-shadow: $cn-shadow-sm;
	border-radius: $cn-button-radius;
	border: unset;
	height: $cn-button-height;
	padding: 14px 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease-out;

	&_light {
		background-color: $cn-color-light;
		color: $cn-color-dark;

		&:hover,
		&:focus,
		&:active { // Becomes secondary
			background-color: $cn-color-secondary;
			color: $cn-color-dark;
		}
	}

	&_secondary {
		background-color: $cn-color-secondary;
		color: $cn-color-dark;

		&:hover,
		&:focus,
		&:active { // Becomes light
			background-color: $cn-color-light;
			color: $cn-color-dark;
		}
	}

	&_primary {
		color: white !important;
		background-color: $cn-color-primary;

		&:hover,
		&:focus,
		&:active { // Becomes primary inverse
			color: $cn-color-primary;
			background-color: white;
			border: 1px solid $cn-color-primary;
		}
	}

	&_primary-inverse {
		color: $cn-color-primary;
		background-color: white;
		border: 1px solid $cn-color-primary;

		&:hover,
		&:focus,
		&:active { // Becomes primary
			color: white !important;
			background-color: $cn-color-primary;
			border: none;
		}
	}

	&:disabled,
	&:disabled:hover,
	&:disabled:focus {
		cursor: not-allowed;
		opacity: 0.4;
		pointer-events: none;
	}

	&:active {
		-webkit-animation: scale-animation 100ms linear;
	}

	& > a {
		color: inherit;
	}
}
</style>
