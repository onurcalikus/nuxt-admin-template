<template>
  <div class="relative inline-flex">
    <!-- Trigger Button -->
    <button
      ref="trigger"
      class="btn px-2.5 bg-white dark:bg-gray-800 border-gray-200 hover:border-gray-300 dark:border-gray-700/60 dark:hover:border-gray-600 text-gray-400 dark:text-gray-500"
      aria-haspopup="true"
      @click.prevent="toggleDropdown"
      :aria-expanded="dropdownOpen"
    >
      <span class="sr-only">Filter</span>
      <svg class="fill-current" width="16" height="16" viewBox="0 0 16 16">
        <path d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM3 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM7 12a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Z" />
      </svg>
    </button>

    <!-- Dropdown Content -->
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
        class="origin-top-right z-10 absolute top-full left-0 right-auto min-w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 pt-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
        :class="align === 'right' ? 'md:left-auto md:right-0' : 'md:left-0 md:right-auto'"
      >
        <div ref="dropdown">
          <!-- Filters Header -->
          <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase pt-1.5 pb-2 px-3">
            Filters
          </div>

          <!-- Filters List -->
          <ul class="mb-4">
            <li v-for="(filter, index) in filters" :key="index" class="py-1 px-3">
              <label class="flex items-center">
                <input type="checkbox" class="form-checkbox" />
                <span class="text-sm font-medium ml-2">{{ filter }}</span>
              </label>
            </li>
          </ul>

          <!-- Action Buttons -->
          <div class="py-2 px-3 border-t border-gray-200 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-700/20">
            <ul class="flex items-center justify-between">
              <li>
                <button
                  class="btn-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-red-500"
                  @click="clearFilters"
                >
                  Clear
                </button>
              </li>
              <li>
                <button
                  class="btn-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                  @click="applyFilters"
                  @focusout="closeDropdown"
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
        </div>
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
    default: 'left',
  },
})

// Filters data
const filters = [
  'Direct VS Indirect',
  'Real Time Value',
  'Top Channels',
  'Sales VS Refunds',
  'Last Order',
  'Total Spent',
]

// Reactive state
const dropdownOpen = ref(false)
const trigger = ref(null)
const dropdown = ref(null)

// Toggle dropdown visibility
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Close dropdown
const closeDropdown = () => {
  dropdownOpen.value = false
}

// Clear filters
const clearFilters = () => {
  console.log('Filters cleared')
  closeDropdown()
}

// Apply filters
const applyFilters = () => {
  console.log('Filters applied')
  closeDropdown()
}

// Close on outside click
const clickHandler = ({ target }) => {
  if (
    dropdownOpen.value &&
    !dropdown.value.contains(target) &&
    !trigger.value.contains(target)
  ) {
    closeDropdown()
  }
}

// Close on ESC key press
const keyHandler = ({ keyCode }) => {
  if (dropdownOpen.value && keyCode === 27) {
    closeDropdown()
  }
}

// Add and remove event listeners
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
/* Add any additional styles here */
</style>
