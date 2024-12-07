<template>
  <div class="relative">
    <button
      ref="trigger"
      class="rounded-full"
      :class="dropdownOpen ? 'bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400' : 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'"
      aria-haspopup="true"
      @click.prevent="toggleDropdown"
      :aria-expanded="dropdownOpen"
    >
      <span class="sr-only">Menu</span>
      <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="2" />
        <circle cx="10" cy="16" r="2" />
        <circle cx="22" cy="16" r="2" />
      </svg>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="origin-top-right z-10 absolute top-full min-w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
        :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <ul
          ref="dropdown"
          @focusin="dropdownOpen = true"
          @focusout="closeDropdown"
        >
          <slot />
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
defineProps({
  align: {
    type: String,
    default: 'left', // Default alignment
  },
})

// Reactive state
const dropdownOpen = ref(false)
const trigger = ref(null)
const dropdown = ref(null)

// Toggle dropdown state
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Close dropdown
const closeDropdown = () => {
  dropdownOpen.value = false
}

// Event handlers
const clickHandler = ({ target }) => {
  if (
    dropdownOpen.value &&
    !dropdown.value.contains(target) &&
    !trigger.value.contains(target)
  ) {
    closeDropdown()
  }
}

const keyHandler = ({ keyCode }) => {
  if (dropdownOpen.value && keyCode === 27) {
    closeDropdown()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', clickHandler)
  document.addEventListener('keydown', keyHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', clickHandler)
  document.removeEventListener('keydown', keyHandler)
})
</script>

<style>
/* Add any custom styles here */
</style>
