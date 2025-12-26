<template>
  <div class="version-wrapper" :class="{'open': open}">
    <div class="version-button">
      <CnButton
        class="skip-click-event"
        variant="secondary"
        style="text-transform: capitalize"
        @click.native="toggleDropdown($event, true)"
      >
        <span class="version-label">
          {{ getVersionText(currentVersion) }}
          <span v-if="showStatus" class="status-badge" :class="`status-${getStatusClass(currentVersion)}`">
            {{ getStatus(currentVersion) }}
          </span>
        </span>
        <img src="/icons/dropdown_triangle.svg" height="12" width="15">
      </CnButton>
      <div class="version-dropdown">
        <!-- Latest Version Section -->
        <div v-if="groupedVersions.latest.length > 0" class="version-group">
          <div class="version-group-header">Latest</div>
          <div
            class="version-dropdown-item"
            v-for="version in groupedVersions.latest"
            :key="version"
            :class="{ 'active': currentVersion === version }"
          >
            <router-link :to="getPageLink(version)">
              <span class="version-item-label">{{ getVersionText(version) }}</span>
              <span class="version-item-status status-latest">{{ getStatus(version) }}</span>
            </router-link>
          </div>
        </div>

        <!-- Stable Versions Section -->
        <div v-if="groupedVersions.stable.length > 0" class="version-group">
          <div class="version-group-header">Stable Releases</div>
          <div
            class="version-dropdown-item"
            v-for="version in groupedVersions.stable"
            :key="version"
            :class="{ 'active': currentVersion === version }"
          >
            <router-link :to="getPageLink(version)">
              <span class="version-item-label">{{ getVersionText(version) }}</span>
              <span class="version-item-date" v-if="getMetadata(version).releaseDate">
                {{ formatDate(getMetadata(version).releaseDate) }}
              </span>
            </router-link>
          </div>
        </div>

        <!-- DOM Editions Section -->
        <div v-if="groupedVersions.dom.length > 0" class="version-group">
          <div class="version-group-header">DOM Editions</div>
          <div
            class="version-dropdown-item"
            v-for="version in groupedVersions.dom"
            :key="version"
            :class="{ 'active': currentVersion === version }"
          >
            <router-link :to="getPageLink(version)">
              <span class="version-item-label">{{ getVersionText(version) }}</span>
              <span class="version-item-status status-dom">DOM</span>
            </router-link>
          </div>
        </div>

        <!-- Legacy Versions Section (Collapsible) -->
        <div v-if="groupedVersions.legacy.length > 0" class="version-group">
          <div class="version-group-header expandable" @click="toggleLegacy">
            Legacy Versions
            <span class="expand-icon">{{ showLegacy ? '▼' : '▶' }}</span>
          </div>
          <div v-show="showLegacy" class="legacy-versions">
            <div
              class="version-dropdown-item"
              v-for="version in groupedVersions.legacy"
              :key="version"
              :class="{ 'active': currentVersion === version }"
            >
              <router-link :to="getPageLink(version)">
                <span class="version-item-label">{{ getVersionText(version) }}</span>
                <span class="version-item-status status-legacy">Legacy</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  versionsByStatus,
  getVersionMetadata,
  getVersionLabel,
  VERSION_STATUS
} from '../versions';
import { getVersionFromRoute, switchVersionInPath } from '../utils/versionUtils';

export default {
  name: "EnhancedVersionsDropdown",

  props: {
    showStatus: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      open: false,
      showLegacy: false,
      groupedVersions: {
        latest: [...versionsByStatus[VERSION_STATUS.LATEST]].reverse(),
        stable: [...versionsByStatus[VERSION_STATUS.STABLE]].reverse(),
        dom: [...versionsByStatus[VERSION_STATUS.DOM]].reverse(),
        legacy: [...versionsByStatus[VERSION_STATUS.LEGACY]].reverse()
      }
    };
  },

  computed: {
    currentVersion() {
      return getVersionFromRoute(this.$route) || 'master';
    }
  },

  methods: {
    /**
     * Get link for version - preserves current page path
     */
    getPageLink(version) {
      const currentPath = this.$route.path;
      return switchVersionInPath(currentPath, version);
    },

    /**
     * Get display text for version
     */
    getVersionText(version) {
      return getVersionLabel(version);
    },

    /**
     * Get version metadata
     */
    getMetadata(version) {
      return getVersionMetadata(version) || {};
    },

    /**
     * Get version status
     */
    getStatus(version) {
      const metadata = this.getMetadata(version);
      return metadata.status || '';
    },

    /**
     * Get CSS class for status
     */
    getStatusClass(version) {
      const status = this.getStatus(version);
      return status.toLowerCase();
    },

    /**
     * Format date for display
     */
    formatDate(dateStr) {
      if (!dateStr) return '';

      try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short'
        });
      } catch (e) {
        return dateStr;
      }
    },

    /**
     * Toggle dropdown visibility
     */
    toggleDropdown() {
      if (arguments[0]?.button !== 0 || (!arguments[1] && arguments[0]?.path.some(x => x.className?.toString().includes('skip-click-event')))) {
        return;
      }

      this.open = !this.open;

      if (this.open) {
        window.document.addEventListener('mouseup', this.toggleDropdown);
      } else {
        window.document.removeEventListener('mouseup', this.toggleDropdown);
      }
    },

    /**
     * Toggle legacy versions visibility
     */
    toggleLegacy() {
      this.showLegacy = !this.showLegacy;
    }
  },

  beforeDestroy() {
    window.document.removeEventListener('mouseup', this.toggleDropdown);
  }
}
</script>

<style lang="stylus" scoped>
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

  @media (max-width $MQMobile)
    width 100px
    padding 14px 15px !important
    height 40px !important

.version-label
  display flex
  align-items center
  gap 4px

.status-badge
  display inline-block
  padding 2px 6px
  border-radius 3px
  font-size 0.7em
  font-weight bold
  text-transform uppercase

  &.status-latest
    background-color #4caf50
    color white

  &.status-stable
    background-color #2196f3
    color white

  &.status-dom
    background-color #9c27b0
    color white

  &.status-legacy
    background-color #757575
    color white

.version-dropdown
  position absolute
  box-sizing border-box
  top 'calc(%s + 28px + 4.5px)' % ($cn-button-height)
  left calc(50% - 64px)
  background-color $cn-color-secondary
  display none
  width 280px
  max-height 500px
  overflow-y auto
  padding 8px 4px
  flex-direction column
  box-shadow 0 4px 12px rgba(0, 0, 0, 0.15)
  border-radius 4px
  z-index 1000

  &::after
    -webkit-transition all 0.2s ease-out !important
    transition all 0.2s ease-out !important
    content url('/triangle.svg')
    position absolute
    left calc(50% - 30.5px)
    top -28px

.version-group
  margin-bottom 12px

  &:last-child
    margin-bottom 0

.version-group-header
  font-size 0.75rem
  font-weight 700
  text-transform uppercase
  color $cn-color-dark
  opacity 0.6
  padding 8px 12px 4px
  letter-spacing 0.5px

  &.expandable
    cursor pointer
    display flex
    justify-content space-between
    align-items center
    user-select none

    &:hover
      opacity 0.8

.expand-icon
  font-size 0.6rem
  transition transform 0.2s

.version-dropdown-item
  width 100%
  min-height 42px
  color $cn-color-dark !important
  border-bottom 1px solid $cn-color-secondary-light
  display flex
  flex-direction row
  align-items center
  transition background-color 0.2s

  &:last-of-type
    border-bottom none

  &:hover
    background-color rgba(0, 0, 0, 0.03)

  &.active
    background-color rgba(37, 89, 141, 0.1)
    font-weight 600

  a
    width 100%
    padding 10px 12px
    color $cn-color-dark !important
    font-weight normal
    display flex
    justify-content space-between
    align-items center
    text-decoration none

.version-item-label
  flex 1

.version-item-status
  font-size 0.7rem
  padding 2px 6px
  border-radius 3px
  font-weight 600
  text-transform uppercase

  &.status-latest
    background-color #4caf50
    color white

  &.status-dom
    background-color #9c27b0
    color white

  &.status-legacy
    background-color #9e9e9e
    color white

.version-item-date
  font-size 0.7rem
  opacity 0.6

.legacy-versions
  max-height 200px
  overflow-y auto

.version-wrapper.open
  .version-dropdown
    display flex

@media (max-width $MQMobile)
  .version-dropdown
    left calc(50% - 140px)
    width 240px
</style>
