<template>
    <IDropdown size="sm">
        <IButton>v{{ currentVersion }}</IButton>
        <IDropdownMenu>
            <IDropdownItem v-for="version in versions" :to="getPageLink(version)" :disabled="currentVersion === version"
                           :key="version">
                v{{ version }}
            </IDropdownItem>
        </IDropdownMenu>
    </IDropdown>
</template>

<script>
import {versions, getVersionFromRoute} from "../util";

export default {
    name: "VersionsDropdown",

    computed: {
        currentVersion() {
            return getVersionFromRoute(this.$route)
        },
    },

    data() {
        return {
            versions
        }
    },

    methods: {
        getPageLink(version) {
            return `/${version}`
        }
    }
}
</script>

<style scoped>
a.item {
    color: #2c3e50;
}

a.item.router-link-active {
    color: #37598d;
}
</style>
