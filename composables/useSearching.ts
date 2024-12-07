// ~/composables/useSearching.js
import { ref } from 'vue'

export function useSearching() {
  const searchQuery = ref('')

  const getSearchQuery = () => searchQuery.value

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
    // You can add additional logic here, such as API calls or state updates
  }

  const clearSearchQuery = () => {
    searchQuery.value = ''
    // Additional logic for clearing search results can be added here
  }

  return {
    getSearchQuery,
    setSearchQuery,
    clearSearchQuery,
  }
}
