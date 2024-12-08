<template>
  <div class="relative inline-flex">
    <!-- Profile Button -->
    <button
      ref="trigger"
      class="inline-flex justify-center items-center group"
      aria-haspopup="true"
      @click.prevent="toggleDropdown"
      :aria-expanded="dropdownOpen"
    >
      <img
        class="w-8 h-8 rounded-full"
        :src="userAvatar"
        width="32"
        height="32"
        alt="User"
      />
      <div class="flex items-center truncate">
        <span class="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
          Tim Cook
        </span>
        <svg
          class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
          viewBox="0 0 12 12"
        >
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </div>
    </button>

    <!-- Dropdown Menu -->
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
        class="origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
        :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <!-- Profile Info -->
        <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
          <div class="font-medium text-gray-800 dark:text-gray-100">Tim Cook</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 italic">Administrator</div>
        </div>
        <!-- Dropdown Links -->
        <ul ref="dropdown" @focusin="dropdownOpen = true" @focusout="closeDropdown">
          <li>
            <NuxtLink
              class="font-medium text-sm text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
              to="/settings/account"
              @click="closeDropdown"
            >
              Settings
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="font-medium text-sm text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
              to="/signin"
              @click="closeDropdown"
            >
              Sign Out
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// Props
const props = defineProps({
  align: {
    type: String,
    default: 'left',
  },
})

// Reactive state
const dropdownOpen = ref(false)
const trigger = ref(null)
const dropdown = ref(null)

// User Avatar (can be replaced with dynamic data)
import UserAvatar from '../../public/images/avatars/image-timcook.png' // Adjust the path as needed
const userAvatar = UserAvatar

// Methods
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

// Event Handlers
const clickHandler = (event) => {
  const { target } = event
  if (
    dropdownOpen.value &&
    dropdown.value &&
    trigger.value &&
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

// Lifecycle Hooks
onMounted(() => {
  document.addEventListener('click', clickHandler)
  document.addEventListener('keydown', keyHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', clickHandler)
  document.removeEventListener('keydown', keyHandler)
})
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
