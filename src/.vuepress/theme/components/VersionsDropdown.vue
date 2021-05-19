<template>
  <div>
    VERSION
  </div>
<!--    <IDropdown size="sm">-->
<!--        <IButton>{{ getVersionText(currentVersion) }}</IButton>-->
<!--        <IDropdownMenu>-->
<!--            <IDropdownItem v-for="version in versions" :to="getPageLink(version)" :disabled="currentVersion === version"-->
<!--                           :key="version">-->
<!--                {{ getVersionText(version) }}-->
<!--            </IDropdownItem>-->
<!--        </IDropdownMenu>-->
<!--    </IDropdown>-->
</template>

<script>
import {versions, getVersionFromRoute, getDefaultVersion} from "../util";

export default {
    name: "VersionsDropdown",

    computed: {
        currentVersion() {
            return getVersionFromRoute(this.$route) || getDefaultVersion()
        },
    },

    data() {
        return {
          versions: versions.slice().reverse()
        }
    },

    methods: {
        getPageLink(version) {
            return `/${version}`
        },
        getVersionText(version) {
            const versionsWithoutPrefix = ['master']
            const prefix = versionsWithoutPrefix.includes(version)
                ? ''
                : 'v';

            return `${prefix}${version}`
        }
    }
}
</script>

<style scoped>
a.item {
	color: #2c3e50;
	background-color: white !important;
	padding: 0.5rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
}

a.item.router-link-active {
    color: #37598d;
}
</style>
