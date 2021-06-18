<template>
  <div class="version-wrapper" :class="{'open': open}">
    <div class="version-button">
      <CnButton class="skip-click-event" variant="secondary" style="text-transform: capitalize" @click.native="toggleDropdown($event, true)">
        {{ getVersionText(currentVersion) }}
        <img src="/icons/dropdown_triangle.svg" height="12" width="15">
      </CnButton>
      <div class="version-dropdown" >
        <div class="version-dropdown-item" v-for="version in versions" :disabled="currentVersion === version"
          :key="version">
          <router-link :to="getPageLink(version)" :disabled="currentVersion === version">
            {{ getVersionText(version) }}
          </router-link>
        </div>
      </div>
    </div>
<!--    <div class="overlay" @click="toggleDropdown"/>-->
  </div>
</template>

<script>
import { versions, getVersionFromRoute, getDefaultVersion } from "../util";

export default {
	name: "VersionsDropdown",
	computed: {
		currentVersion() {
			return getVersionFromRoute(this.$route) || getDefaultVersion()
		},
	},
	data() {
		return {
			versions: versions.slice().reverse(),
			open: false,
		}
	},

	methods: {
		getPageLink(version) {
			return `/${ version }`
		},
		getVersionText(version) {
			const versionsWithoutPrefix = ['master']
			const prefix = versionsWithoutPrefix.includes(version)
				? ''
				: 'v';

			return `${ prefix }${ version }`
		},
		toggleDropdown() {
      if (arguments[0]?.button !== 0 || (!arguments[1] && arguments[0]?.path.some(x => x.className?.toString().includes('skip-click-event')))) { // || arguments[0]?.path.some(x => x.className?.toString().includes('version-dropdown-item'))
        return;
      }

			this.open = !this.open;
			if (this.open){
        window.document.addEventListener('mouseup', this.toggleDropdown);
			}
			else {
        window.document.removeEventListener('mouseup', this.toggleDropdown)
      }
		},
	},
  beforeDestroy() {
    window.document.removeEventListener('mouseup', this.toggleDropdown)
  }
}
</script>

<style lang="stylus" scoped>
a.item
	color #2c3e50
	background-color white !important
	padding 0.5rem
	border-bottom 1px solid rgba(0, 0, 0, 0.05) !important

a.item.router-link-active
	color #37598d

.version-button
	position relative
button
	position relative
	z-index 2
	display flex
	flex-direction row !important
	justify-content space-between !important
	align-items center !important
	width 128px
.version-dropdown
	position absolute
	box-sizing border-box
	top 'calc(%s + 28px + 4.5px)' % ($cn-button-height)
	left calc(50% - 64px)
	background-color $cn-color-secondary
	display none
	width 128px
	padding 4px
	flex-direction column
	align-items center
	justify-content center
	&::after
		-webkit-transition all 0.2s ease-out !important
		transition all 0.2s ease-out !important
		transition-delay 0.5s
		content url('/triangle.svg')
		position absolute
		left calc(50% - 30.5px) // Half of the container - half of the icon in order to get the negative left position (centered)
		top -28px
	.version-dropdown-item
		z-index 2
		width 100%
		height 50px
		color $cn-color-dark !important
		border-bottom 1px solid $cn-color-secondary-light
		display flex
		flex-direction row
		align-items center
		justify-content center
		&:last-of-type
			border-bottom none
		a
			color $cn-color-dark !important
			font-weight normal
  //@media (max-width $MQMobile)
  //  left calc(50% - 100px)
  //&::after
.version-wrapper.open
	.version-dropdown
		display flex
	.overlay
		position absolute
		z-index 1
		//max-width 100%
		width 100vw
		//max-height 100%
		height 100vh
		left 0
		top 0
</style>
