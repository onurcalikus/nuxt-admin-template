<template>
  <form
    class="relative items-center flex-1 -space-x-px rounded-xl shadow-sm"
    @submit.prevent="handleSubmit"
  >
    <!-- Search Icon (Optional) -->
    <!-- Uncomment and adjust if you have an Icon component -->
    <!--
    <Icon
      name="ion:search-outline"
      size="20"
      class="absolute z-10 opacity-50 pointer-events-none left-2"
    />
    -->

    <input
      v-model="searchQuery"
      type="text"
      :placeholder="$t('messages.shop.searchProducts')"
      class="z-0 inline-flex items-center w-full p-2 pl-10 text-sm text-gray-500 border border-gray-300 rounded-md shadow-inner outline-none bg-gray-50 shadow-gray-200"
      @input="handleInput"
      aria-label="Search"
    />

    <span
      v-if="searchQuery"
      class="absolute z-10 flex items-center gap-1 px-2 py-1 text-xs rounded cursor-pointer bg-primary bg-opacity-10 hover:bg-opacity-20 text-primary right-2"
      @click="reset"
      role="button"
      aria-label="Clear search"
      tabindex="0"
      @keydown.enter.prevent="reset"
      @keydown.space.prevent="reset"
    >
      <span>{{ $t('messages.general.clear') }}</span>
      <!-- Replace with your Icon component or SVG -->
      <Icon name="ion:close-outline" size="18" />
    </span>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n' // Ensure you have @nuxtjs/i18n installed and configured
import { useSearching } from '~/composables/useSearching'
import Icon from '~/components/Icon.vue' // Adjust the path based on your project structure

// Destructure composable functions
const { getSearchQuery, setSearchQuery, clearSearchQuery } = useSearching()

// Initialize searchQuery from the composable
const searchQuery = ref(getSearchQuery())

// Watch for changes in the composable's searchQuery
watch(
  () => getSearchQuery(),
  (value) => {
    if (!value) reset()
  }
)

// Handle form submission
const handleSubmit = () => {
  setSearchQuery(searchQuery.value)
  // You can emit an event or perform other actions here
}

// Handle input changes (optional, depending on your logic)
const handleInput = () => {
  setSearchQuery(searchQuery.value)
  // You can debounce this if making API calls
}

// Reset the search input
const reset = () => {
  clearSearchQuery()
  searchQuery.value = ''
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
