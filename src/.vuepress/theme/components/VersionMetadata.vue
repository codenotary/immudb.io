<template>
  <div v-if="metadata" class="version-metadata" :class="`status-${metadata.status}`">
    <div class="metadata-container">
      <div class="version-info">
        <span class="version-label">{{ metadata.label }}</span>
        <span class="status-badge" :class="`badge-${metadata.status}`">
          {{ formatStatus(metadata.status) }}
        </span>
      </div>

      <div v-if="showDetails" class="metadata-details">
        <div v-if="metadata.releaseDate" class="detail-item">
          <span class="detail-label">Released:</span>
          <span class="detail-value">{{ formatDate(metadata.releaseDate) }}</span>
        </div>

        <div v-if="metadata.description" class="detail-item description">
          <span class="detail-value">{{ metadata.description }}</span>
        </div>

        <div v-if="showActions" class="version-actions">
          <a
            v-if="changelogUrl"
            :href="changelogUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="action-link"
          >
            View Changelog →
          </a>

          <router-link
            v-if="hasNewerVersion"
            :to="getLatestVersionPath()"
            class="action-link upgrade-link"
          >
            Upgrade to latest →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVersionMetadata, getDefaultVersion } from '../versions';
import { getChangelogUrl, switchVersionInPath } from '../utils/versionUtils';

export default {
  name: 'VersionMetadata',

  props: {
    version: {
      type: String,
      required: true
    },
    showDetails: {
      type: Boolean,
      default: false
    },
    showActions: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    metadata() {
      return getVersionMetadata(this.version);
    },

    changelogUrl() {
      return getChangelogUrl(this.version);
    },

    hasNewerVersion() {
      return this.version !== 'master';
    }
  },

  methods: {
    formatStatus(status) {
      if (!status) return '';

      return status
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },

    formatDate(dateStr) {
      if (!dateStr) return '';

      try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (e) {
        return dateStr;
      }
    },

    getLatestVersionPath() {
      const latestVersion = 'master';
      return switchVersionInPath(this.$route.path, latestVersion);
    }
  }
}
</script>

<style lang="stylus" scoped>
.version-metadata
  padding 12px 16px
  border-radius 4px
  margin-bottom 16px
  background-color rgba(0, 0, 0, 0.02)
  border-left 4px solid #ccc

  &.status-latest
    border-left-color #4caf50
    background-color rgba(76, 175, 80, 0.05)

  &.status-stable
    border-left-color #2196f3
    background-color rgba(33, 150, 243, 0.05)

  &.status-dom
    border-left-color #9c27b0
    background-color rgba(156, 39, 176, 0.05)

  &.status-legacy
    border-left-color #ff9800
    background-color rgba(255, 152, 0, 0.05)

.metadata-container
  display flex
  flex-direction column
  gap 8px

.version-info
  display flex
  align-items center
  gap 8px

.version-label
  font-size 1.1em
  font-weight 600
  color $cn-color-dark

.status-badge
  display inline-block
  padding 2px 8px
  border-radius 3px
  font-size 0.75em
  font-weight 700
  text-transform uppercase
  letter-spacing 0.5px

  &.badge-latest
    background-color #4caf50
    color white

  &.badge-stable
    background-color #2196f3
    color white

  &.badge-dom
    background-color #9c27b0
    color white

  &.badge-legacy
    background-color #ff9800
    color white

.metadata-details
  display flex
  flex-direction column
  gap 6px
  padding-top 8px
  border-top 1px solid rgba(0, 0, 0, 0.1)

.detail-item
  display flex
  gap 8px
  font-size 0.9em

  &.description
    flex-direction column
    gap 4px

.detail-label
  font-weight 600
  color rgba(0, 0, 0, 0.6)

.detail-value
  color rgba(0, 0, 0, 0.8)

.version-actions
  display flex
  gap 12px
  margin-top 8px
  flex-wrap wrap

.action-link
  font-size 0.9em
  color #2196f3
  text-decoration none
  font-weight 500
  transition color 0.2s

  &:hover
    color #1976d2
    text-decoration underline

  &.upgrade-link
    color #4caf50

    &:hover
      color #388e3c

@media (max-width $MQMobile)
  .version-metadata
    padding 10px 12px
    margin-bottom 12px

  .version-label
    font-size 1em

  .metadata-details
    font-size 0.85em

  .version-actions
    flex-direction column
    gap 8px
</style>
