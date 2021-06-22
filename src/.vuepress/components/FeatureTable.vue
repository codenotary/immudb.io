<template>
<div class="features">
	<div class="feature-box">
		<img src="/icons/immutable-sm.svg"/>
		<h3>Immutable</h3>
		<p class="cn-text-xs">Data is never overwritten. See the history of data updates.</p>
	</div>
	<div class="feature-box">
		<img src="/icons/auditable-sm.svg"/>
		<h3>Auditable</h3>
		<p class="cn-text-xs">Tamper-evident history system ensures data authenticity.</p>
	</div>
	<div class="feature-box">
		<img src="/icons/secure-sm.svg"/>
		<h3>Secure</h3>
		<p class="cn-text-xs">Data ownership is verifiable by clients and auditors.</p>
	</div>
</div>
</template>

<style lang="stylus" scoped>
.features
	display flex
	flex-flow row wrap
	justify-content center
	gap 10px
	& ::v-deep + ul
		p
			strong
				color $cn-color-secondary

.feature-box
	box-sizing border-box
	flex-basis 25ch
	flex-grow 1
	display flex
	flex-flow column
	align-items center
	background-color $cn-color-primary_light
	border-radius $cn-border-radius-lg
	padding 20px
	//height 195px
	max-width 213px
	color $cn-color-brand
	margin-bottom 20px
	h3
		text-align: center
		margin-bottom 0
		margin-top 10px
	p
		text-align: center
	img
		height: 60px
</style>
