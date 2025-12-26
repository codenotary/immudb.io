<template>
  <div
    class="dropdown-wrapper"
    :class="{ open }"
  >
    <button
      class="dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="setOpen(!open)"
    >
      <span class="title">{{ item.text }}</span>
      <span
        class="arrow"
        :class="open ? 'down' : 'right'"
      />
    </button>

    <DropdownTransition>
      <ul
        v-show="open"
        class="nav-dropdown"
      >
        <li
          v-for="(subItem, index) in item.items"
          :key="subItem.link || index"
          class="dropdown-item"
        >
          <h4 v-if="subItem.type === 'links'">
            {{ subItem.text }}
          </h4>

          <ul
            v-if="subItem.type === 'links'"
            class="dropdown-subitem-wrapper"
          >
            <li
              v-for="childSubItem in subItem.items"
              :key="childSubItem.link"
              class="dropdown-subitem"
            >
              <NavLink
                :item="childSubItem"
                @focusout="
                  isLastItemOfArray(childSubItem, subItem.items) &&
                    isLastItemOfArray(subItem, item.items) &&
                    setOpen(false)
                "
              />
            </li>
          </ul>

          <NavLink
            v-else
            :item="subItem"
            @focusout="isLastItemOfArray(subItem, item.items) && setOpen(false)"
          />
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vitepress'
import NavLink from './NavLink.vue'
import DropdownTransition from './DropdownTransition.vue'

interface NavItem {
  text: string
  ariaLabel?: string
  items?: any[]
  type?: string
  link?: string
  [key: string]: any
}

const props = defineProps<{
  item: NavItem
}>()

const route = useRoute()
const open = ref(false)

const dropdownAriaLabel = computed(() => {
  return props.item.ariaLabel || props.item.text
})

const setOpen = (value: boolean) => {
  open.value = value
}

const isLastItemOfArray = (item: any, array: any[]) => {
  return array[array.length - 1] === item
}

watch(() => route.path, () => {
  open.value = false
})
</script>

<style>
.dropdown-wrapper {
  cursor: pointer;
}

.dropdown-wrapper .dropdown-title {
  display: block;
  font-size: 0.9rem;
  font-family: inherit;
  cursor: inherit;
  padding: inherit;
  line-height: 1.4rem;
  background: transparent;
  border: none;
  font-weight: 500;
  color: var(--text-color);
}

.dropdown-wrapper .dropdown-title:hover {
  border-color: transparent;
}

.dropdown-wrapper .dropdown-title .arrow {
  vertical-align: middle;
  margin-top: -1px;
  margin-left: 0.4rem;
}

.dropdown-wrapper .nav-dropdown .dropdown-item {
  color: inherit;
  line-height: 1.7rem;
}

.dropdown-wrapper .nav-dropdown .dropdown-item h4 {
  margin: 0.45rem 0 0;
  border-top: 1px solid #eee;
  padding: 0.45rem 1.5rem 0 1.25rem;
}

.dropdown-wrapper .nav-dropdown .dropdown-item .dropdown-subitem-wrapper {
  padding: 0;
  list-style: none;
}

.dropdown-wrapper .nav-dropdown .dropdown-item .dropdown-subitem-wrapper .dropdown-subitem {
  font-size: 0.9em;
}

.dropdown-wrapper .nav-dropdown .dropdown-item a {
  display: block;
  line-height: 1.7rem;
  position: relative;
  border-bottom: none;
  font-weight: 400;
  margin-bottom: 0;
  padding: 0 1.5rem 0 1.25rem;
}

.dropdown-wrapper .nav-dropdown .dropdown-item a:hover {
  color: var(--accent-color);
}

.dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active {
  color: var(--accent-color);
}

.dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid var(--accent-color);
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  position: absolute;
  top: calc(50% - 2px);
  left: 9px;
}

.dropdown-wrapper .nav-dropdown .dropdown-item:first-child h4 {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
}

@media (max-width: 920px) {
  .dropdown-wrapper.open .dropdown-title {
    margin-bottom: 0.5rem;
  }

  .dropdown-wrapper .dropdown-title {
    font-weight: 600;
    font-size: inherit;
  }

  .dropdown-wrapper .dropdown-title:hover {
    color: var(--accent-color);
  }

  .dropdown-wrapper .nav-dropdown {
    transition: height 0.1s ease-out;
    overflow: hidden;
  }

  .dropdown-wrapper .nav-dropdown .dropdown-item h4 {
    border-top: 0;
    margin-top: 0;
    padding-top: 0;
  }

  .dropdown-wrapper .nav-dropdown .dropdown-item h4,
  .dropdown-wrapper .nav-dropdown .dropdown-item > a {
    font-size: 15px;
    line-height: 2rem;
  }

  .dropdown-wrapper .nav-dropdown .dropdown-item .dropdown-subitem {
    font-size: 14px;
    padding-left: 1rem;
  }
}

@media (min-width: 920px) {
  .dropdown-wrapper {
    height: 1.8rem;
  }

  .dropdown-wrapper:hover .nav-dropdown,
  .dropdown-wrapper.open .nav-dropdown {
    display: block !important;
  }

  .dropdown-wrapper.open:blur {
    display: none;
  }

  .dropdown-wrapper .dropdown-title .arrow {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid var(--arrow-bg-color);
    border-bottom: 0;
  }

  .dropdown-wrapper .nav-dropdown {
    display: none;
    height: auto !important;
    box-sizing: border-box;
    max-height: calc(100vh - 2.7rem);
    overflow-y: auto;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #fff;
    padding: 0.6rem 0;
    border: 1px solid #ddd;
    border-bottom-color: #ccc;
    text-align: left;
    border-radius: 0.25rem;
    white-space: nowrap;
    margin: 0;
  }
}
</style>
