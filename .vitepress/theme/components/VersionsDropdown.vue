<template>
  <div class="version-wrapper" :class="{ 'open': open }">
    <div class="version-button">
      <CnButton
        class="skip-click-event"
        variant="secondary"
        style="text-transform: capitalize"
        @click="toggleDropdown($event, true)"
      >
        <span class="version-label">
          {{ getVersionText(currentVersion) }}
          <span
            v-if="showStatus"
            class="status-badge"
            :class="`status-${getStatusClass(currentVersion)}`"
          >
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
            <RouterLink :to="getPageLink(version)">
              <span class="version-item-label">{{ getVersionText(version) }}</span>
              <span class="version-item-status status-latest">{{ getStatus(version) }}</span>
            </RouterLink>
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
            <RouterLink :to="getPageLink(version)">
              <span class="version-item-label">{{ getVersionText(version) }}</span>
              <span
                class="version-item-date"
                v-if="getMetadata(version).releaseDate"
              >
                {{ formatDate(getMetadata(version).releaseDate) }}
              </span>
            </RouterLink>
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
            <RouterLink :to="getPageLink(version)">
              <span class="version-item-label">{{ getVersionText(version) }}</span>
              <span class="version-item-status status-dom">DOM</span>
            </RouterLink>
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
              <RouterLink :to="getPageLink(version)">
                <span class="version-item-label">{{ getVersionText(version) }}</span>
                <span class="version-item-status status-legacy">Legacy</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'
import {
  versionsByStatus,
  getVersionMetadata,
  getVersionLabel,
  VERSION_STATUS
} from '../utils/versions'
import { getVersionFromRoute, switchVersionInPath } from '../utils/versionUtils'
import CnButton from '../global-components/CnButton.vue'

/**
 * Props
 */
interface Props {
  showStatus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showStatus: false
})

/**
 * Composables
 */
const route = useRoute()

/**
 * State
 */
const open = ref(false)
const showLegacy = ref(false)

const groupedVersions = {
  latest: [...(versionsByStatus[VERSION_STATUS.LATEST] || [])].reverse(),
  stable: [...(versionsByStatus[VERSION_STATUS.STABLE] || [])].reverse(),
  dom: [...(versionsByStatus[VERSION_STATUS.DOM] || [])].reverse(),
  legacy: [...(versionsByStatus[VERSION_STATUS.LEGACY] || [])].reverse()
}

/**
 * Computed properties
 */
const currentVersion = computed(() => {
  return getVersionFromRoute(route) || 'master'
})

/**
 * Methods
 */
function getPageLink(version: string): string {
  const currentPath = route.path
  return switchVersionInPath(currentPath, version)
}

function getVersionText(version: string): string {
  return getVersionLabel(version)
}

function getMetadata(version: string) {
  return getVersionMetadata(version) || {}
}

function getStatus(version: string): string {
  const metadata = getMetadata(version)
  return metadata.status || ''
}

function getStatusClass(version: string): string {
  const status = getStatus(version)
  return status.toLowerCase()
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''

  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  } catch (e) {
    return dateStr
  }
}

function toggleDropdown(event?: MouseEvent, force = false) {
  if (event && event.button !== 0) return
  if (
    !force &&
    event &&
    (event as any).path?.some((x: any) =>
      x.className?.toString().includes('skip-click-event')
    )
  ) {
    return
  }

  open.value = !open.value

  if (open.value) {
    window.document.addEventListener('mouseup', toggleDropdown as any)
  } else {
    window.document.removeEventListener('mouseup', toggleDropdown as any)
  }
}

function toggleLegacy() {
  showLegacy.value = !showLegacy.value
}

/**
 * Lifecycle hooks
 */
onUnmounted(() => {
  window.document.removeEventListener('mouseup', toggleDropdown as any)
})
</script>

<style scoped>
.version-button {
  position: relative;
}

button {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 128px;
}

@media (max-width: 920px) {
  button {
    width: 100px;
    padding: 14px 15px !important;
    height: 40px !important;
  }
}

.version-label {
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.7em;
  font-weight: bold;
  text-transform: uppercase;
}

.status-badge.status-latest {
  background-color: #4caf50;
  color: white;
}

.status-badge.status-stable {
  background-color: #2196f3;
  color: white;
}

.status-badge.status-dom {
  background-color: #9c27b0;
  color: white;
}

.status-badge.status-legacy {
  background-color: #757575;
  color: white;
}

.version-dropdown {
  position: absolute;
  box-sizing: border-box;
  top: calc(var(--cn-button-height) + 28px + 4.5px);
  left: calc(50% - 64px);
  background-color: var(--cn-color-secondary);
  display: none;
  width: 280px;
  max-height: 500px;
  overflow-y: auto;
  padding: 8px 4px;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 1000;
}

.version-dropdown::after {
  -webkit-transition: all 0.2s ease-out !important;
  transition: all 0.2s ease-out !important;
  content: url('/triangle.svg');
  position: absolute;
  left: calc(50% - 30.5px);
  top: -28px;
}

.version-group {
  margin-bottom: 12px;
}

.version-group:last-child {
  margin-bottom: 0;
}

.version-group-header {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--cn-color-dark);
  opacity: 0.6;
  padding: 8px 12px 4px;
  letter-spacing: 0.5px;
}

.version-group-header.expandable {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.version-group-header.expandable:hover {
  opacity: 0.8;
}

.expand-icon {
  font-size: 0.6rem;
  transition: transform 0.2s;
}

.version-dropdown-item {
  width: 100%;
  min-height: 42px;
  color: var(--cn-color-dark) !important;
  border-bottom: 1px solid var(--cn-color-secondary-light);
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: background-color 0.2s;
}

.version-dropdown-item:last-of-type {
  border-bottom: none;
}

.version-dropdown-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.version-dropdown-item.active {
  background-color: rgba(37, 89, 141, 0.1);
  font-weight: 600;
}

.version-dropdown-item a {
  width: 100%;
  padding: 10px 12px;
  color: var(--cn-color-dark) !important;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
}

.version-item-label {
  flex: 1;
}

.version-item-status {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 600;
  text-transform: uppercase;
}

.version-item-status.status-latest {
  background-color: #4caf50;
  color: white;
}

.version-item-status.status-dom {
  background-color: #9c27b0;
  color: white;
}

.version-item-status.status-legacy {
  background-color: #9e9e9e;
  color: white;
}

.version-item-date {
  font-size: 0.7rem;
  opacity: 0.6;
}

.legacy-versions {
  max-height: 200px;
  overflow-y: auto;
}

.version-wrapper.open .version-dropdown {
  display: flex;
}

@media (max-width: 920px) {
  .version-dropdown {
    left: calc(50% - 140px);
    width: 240px;
  }
}
</style>
