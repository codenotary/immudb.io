<template>
  <form
    id="search-form"
    class="algolia-search-wrapper search-box"
    role="search"
  >
    <input
      :id="inputId || 'algolia-search-input'"
      class="search-query"
      :placeholder="placeholder"
    >
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useData, useRouter } from 'vitepress'

interface AlgoliaOptions {
  algoliaOptions?: Record<string, any>
  [key: string]: any
}

const props = withDefaults(defineProps<{
  options?: AlgoliaOptions
  inputId?: string | null
}>(), {
  options: () => ({}),
  inputId: null
})

const { site, theme, lang } = useData()
const router = useRouter()
const placeholder = ref<string>('')

const initialize = async (userOptions: AlgoliaOptions, currentLang: string) => {
  const [docsearch] = await Promise.all([
    import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'),
    import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css')
  ])

  const { algoliaOptions = {} } = userOptions

  docsearch.default({
    ...userOptions,
    inputSelector: '#' + (props.inputId || 'algolia-search-input'),
    algoliaOptions: {
      ...algoliaOptions
    },
    handleSelected: (input: any, event: any, suggestion: any) => {
      const { pathname, hash } = new URL(suggestion.url)
      const routepath = pathname.replace(site.value.base, '/')
      router.go(`${routepath}${hash}`)
    }
  })
}

const update = (options: AlgoliaOptions, currentLang: string) => {
  const container = document.querySelector('#search-form')
  if (container) {
    container.innerHTML = `<input id="${props.inputId || 'algolia-search-input'}" class="search-query">`
    initialize(options, currentLang)
  }
}

watch(() => lang.value, (newLang) => {
  update(props.options || {}, newLang)
})

watch(() => props.options, (newOptions) => {
  update(newOptions || {}, lang.value)
})

onMounted(() => {
  initialize(props.options || {}, lang.value)
  placeholder.value = theme.value.searchPlaceholder || ''
})
</script>

<style scoped>
.algolia-search-wrapper input {
  width: 200px !important;
  height: 45px !important;
  color: var(--cn-color-grey) !important;
  background-position-x: 95% !important;
  background-position-y: 50% !important;
  background-size: 18px 18px !important;
  padding-left: 8px !important;
  padding-right: 32px !important;
}

.algolia-search-wrapper > span {
  vertical-align: middle;
}

.algolia-search-wrapper .algolia-autocomplete {
  line-height: normal;
}

.algolia-search-wrapper .algolia-autocomplete .ds-dropdown-menu {
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 4px;
  font-size: 16px;
  margin: 6px 0 0;
  padding: 4px;
  text-align: left;
}

.algolia-search-wrapper .algolia-autocomplete .ds-dropdown-menu:before {
  border-color: #999;
}

.algolia-search-wrapper .algolia-autocomplete .ds-dropdown-menu [class*=ds-dataset-] {
  border: none;
  padding: 0;
}

.algolia-search-wrapper .algolia-autocomplete .ds-dropdown-menu .ds-suggestions {
  margin-top: 0;
}

.algolia-search-wrapper .algolia-autocomplete .ds-dropdown-menu .ds-suggestion {
  border-bottom: 1px solid var(--border-color);
}

.algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion--highlight {
  color: #2c815b;
}

.algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion {
  border-color: var(--border-color);
  padding: 0;
}

.algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--category-header {
  padding: 5px 10px;
  margin-top: 0;
  background: var(--cn-dark-gradient);
  color: #fff;
  font-weight: 600;
}

.algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--category-header .algolia-docsearch-suggestion--highlight {
  background: rgba(255, 255, 255, 0.6);
}

.algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--wrapper {
  padding: 0;
}

.algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--title {
  font-weight: 600;
  margin-bottom: 0;
  color: var(--cn-color-dark);
}

.algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column {
  vertical-align: top;
  padding: 5px 7px 5px 5px;
  border-color: var(--border-color);
  background: #f1f3f5;
}

.algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column:after {
  display: none;
}

.algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column-text {
  color: #555;
}

.algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-footer {
  border-color: var(--border-color);
}

.algolia-search-wrapper .algolia-autocomplete .ds-cursor .algolia-docsearch-suggestion--content {
  background-color: #e7edf3 !important;
  color: var(--text-color);
}

@media (min-width: 920px) {
  .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column {
    float: none;
    width: 150px;
    min-width: 150px;
    display: table-cell;
  }

  .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .algolia-docsearch-suggestion--content {
    float: none;
    display: table-cell;
    width: 100%;
    vertical-align: top;
  }

  .algolia-search-wrapper .algolia-autocomplete .algolia-docsearch-suggestion .ds-dropdown-menu {
    min-width: 515px !important;
  }
}

@media (max-width: 920px) {
  .algolia-search-wrapper .ds-dropdown-menu {
    min-width: calc(100vw - 4rem) !important;
    max-width: calc(100vw - 4rem) !important;
  }

  .algolia-search-wrapper .algolia-docsearch-suggestion--wrapper {
    padding: 5px 7px 5px 5px !important;
  }

  .algolia-search-wrapper .algolia-docsearch-suggestion--subcategory-column {
    padding: 0 !important;
    background: white !important;
  }

  .algolia-search-wrapper .algolia-docsearch-suggestion--subcategory-column-text:after {
    content: " > ";
    font-size: 10px;
    line-height: 14.4px;
    display: inline-block;
    width: 5px;
    margin: -3px 3px 0;
    vertical-align: middle;
  }
}
</style>
