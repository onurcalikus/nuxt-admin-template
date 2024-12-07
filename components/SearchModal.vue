<template>
  <!-- Modal backdrop -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-out duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modalOpen"
      class="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
      aria-hidden="true"
    ></div>
  </transition>

  <!-- Modal dialog -->
  <transition
    enter-active-class="transition ease-in-out duration-200"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="modalOpen"
      :id="id"
      class="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref="modalContent"
        class="bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700/60 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg"
      >
        <!-- Search form -->
        <form class="border-b border-gray-200 dark:border-gray-700/60">
          <div class="relative">
            <label :for="searchId" class="sr-only">Search</label>
            <input
              :id="searchId"
              v-model="searchQuery"
              class="w-full dark:text-gray-300 bg-white dark:bg-gray-800 border-0 focus:ring-transparent placeholder-gray-400 dark:placeholder-gray-500 appearance-none py-3 pl-10 pr-4"
              type="search"
              placeholder="Search Anything…"
              ref="searchInput"
              @input="handleInput"
            />
            <button
              class="absolute inset-0 right-auto group"
              type="submit"
              aria-label="Search"
            >
              <svg
                class="shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 ml-4 mr-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </form>

        <div class="py-4 px-2">
          <!-- Recent searches -->
          <div class="mb-3 last:mb-0">
            <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 mb-2">
              Recent searches
            </div>
            <ul class="text-sm">
              <li v-for="(search, index) in recentSearches" :key="index">
                <NuxtLink
                  class="flex items-center p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                  to="#0"
                  @click="closeModal"
                >
                  <svg
                    class="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                  </svg>
                  <span>{{ search }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Recent pages -->
          <div class="mb-3 last:mb-0">
            <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 mb-2">
              Recent pages
            </div>
            <ul class="text-sm">
              <li v-for="(page, index) in recentPages" :key="index">
                <NuxtLink
                  class="flex items-center p-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20 rounded-lg"
                  to="#0"
                  @click="closeModal"
                >
                  <svg
                    class="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                  </svg>
                  <span>{{ page }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

// Define props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  searchId: {
    type: String,
    required: true,
  },
  modalOpen: {
    type: Boolean,
    required: true,
  },
})

// Define emits
const emit = defineEmits(['open-modal', 'close-modal'])

// Refs
const modalContent = ref(null)
const searchInput = ref(null)

// Example data (can be replaced with dynamic data or fetched from an API)
const recentSearches = ref([
  'Form Builder - 23 hours on-demand video',
  'Access Mosaic on mobile and TV',
  'Product Update - Q4 2024',
  'Dedicated forms for products',
])

const recentPages = ref([
  'Messages - Conversation / … / Mike Mills',
  'Messages - Conversation / … / Eva Patrick',
  'Product Update - Q4 2024',
])

// Methods to close modal
const closeModal = () => {
  emit('close-modal')
}

// Event handlers to close modal when clicking outside or pressing ESC
const clickHandler = (event) => {
  const { target } = event
  if (
    props.modalOpen &&
    modalContent.value &&
    !modalContent.value.contains(target)
  ) {
    emit('close-modal')
  }
}

const keyHandler = ({ keyCode }) => {
  if (props.modalOpen && keyCode === 27) {
    emit('close-modal')
  }
}

// Handle input submission
const handleSubmit = (event) => {
  event.preventDefault()
  setSearchQuery(searchQuery.value)
}

// Handle input changes
const handleInput = () => {
  setSearchQuery(searchQuery.value)
}

// Watch for modal open to focus input
watch(
  () => props.modalOpen,
  (open) => {
    if (open) {
      nextTick(() => {
        if (searchInput.value) {
          searchInput.value.focus()
        }
      })
    }
  }
)

// Import and use the searching composable
import { useSearching } from '~/composables/useSearching' // Adjust the path as necessary
const { getSearchQuery, setSearchQuery, clearSearchQuery } = useSearching()
const searchQuery = ref(getSearchQuery())

const reset = () => {
  clearSearchQuery()
  searchQuery.value = ''
}

watch(getSearchQuery, (value) => {
  if (!value) reset()
})

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

<style scoped>
/* Add any additional styles here if needed */
</style>
