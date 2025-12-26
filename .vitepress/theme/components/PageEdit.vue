<template>
  <footer class="page-edit">
    <div
      v-if="editLink"
      class="edit-link"
    >
      <a
        :href="editLink"
        target="_blank"
        rel="noopener noreferrer"
      >{{ editLinkText }}</a>
      <OutboundLink />
    </div>

    <div
      v-if="lastUpdated"
      class="last-updated"
    >
      <span class="prefix">{{ lastUpdatedText }}:</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, theme } = useData()

const lastUpdated = computed(() => page.value.lastUpdated)

const lastUpdatedText = computed(() => {
  return theme.value.lastUpdated || 'Last Updated'
})

const editLink = computed(() => {
  const showEditLink = page.value.frontmatter.editLink !== false &&
                        (theme.value.editLink?.pattern || theme.value.editLinks)

  if (!showEditLink) return null

  const {
    repo,
    docsDir = '',
    docsBranch = 'master',
    docsRepo = repo
  } = theme.value

  if (showEditLink && docsRepo && page.value.relativePath) {
    return createEditLink(
      repo,
      docsRepo,
      docsDir,
      docsBranch,
      page.value.relativePath
    )
  }
  return null
})

const editLinkText = computed(() => {
  return theme.value.editLinkText || 'Edit this page'
})

const createEditLink = (
  repo: string,
  docsRepo: string,
  docsDir: string,
  docsBranch: string,
  path: string
): string => {
  const bitbucket = /bitbucket.org/
  const endingSlashRE = /\/$/
  const outboundRE = /^[a-z]+:/i

  if (bitbucket.test(repo)) {
    const base = outboundRE.test(docsRepo) ? docsRepo : repo
    return (
      base.replace(endingSlashRE, '') +
      `/src` +
      `/${docsBranch}/` +
      (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
      path +
      `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
    )
  }

  const base = outboundRE.test(docsRepo)
    ? docsRepo
    : `https://github.com/${docsRepo}`
  return (
    base.replace(endingSlashRE, '') +
    `/edit` +
    `/${docsBranch}/` +
    (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
    path
  )
}
</script>

<style scoped>
.page-edit {
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;
}

.edit-link {
  display: inline-block;
}

.edit-link a {
  color: var(--vp-c-text-2);
  margin-right: 0.25rem;
}

.last-updated {
  float: right;
  font-size: 0.9em;
}

.last-updated .prefix {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.last-updated .time {
  font-weight: 400;
  color: #aaa;
}

@media (max-width: 768px) {
  .page-edit .edit-link {
    margin-bottom: 0.5rem;
  }

  .page-edit .last-updated {
    font-size: 0.8em;
    float: none;
    text-align: left;
  }
}
</style>
