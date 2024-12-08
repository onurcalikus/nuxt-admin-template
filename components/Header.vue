<template>
  <header class="flex items-center justify-between bg-white border-b px-4 py-2">
    <div class="flex items-center space-x-2">
      <!-- Sidebar Toggle (for mobile) -->
      <button @click="onToggleSidebar" class="p-2 rounded-md text-gray-600 hover:text-gray-900 lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <span class="font-medium text-xl text-indigo-600">APP Inc.</span>
    </div>
    <div class="flex items-center space-x-4">
      <div>
        <button
            class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ml-3"
            :class="{ 'bg-gray-200 dark:bg-gray-800': searchModalOpen }"
            @click.stop="openSearchModal"
            aria-controls="search-modal"
            aria-haspopup="true"
            :aria-expanded="searchModalOpen"
        >
          <span class="sr-only">Search</span>
          <svg
              class="fill-current text-gray-500/80 dark:text-gray-400/80"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z"
            />
            <path
                d="m13.314 11.9 2.393 2.393a.999.999 0 01-1.414 1.414L11.9 13.314a8.019 8.019 0 011.414-1.414Z"
            />
          </svg>
        </button>
        <SearchModal
            id="search-modal"
            searchId="search"
            :modalOpen="searchModalOpen"
            @close-modal="closeSearchModal"
        />
      </div>

      <!-- Notifications Dropdown -->
      <DropdownNotifications align="right" />

      <!-- Help Dropdown -->
      <DropdownHelp align="right" />

<!--      &lt;!&ndash; Theme Toggle &ndash;&gt;
      <ThemeToggle />-->

      <!-- Divider -->
      <hr class="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />

      <!-- Dark Mode Toggle -->
      <button @click="onToggleDarkMode" class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
        <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" aria-hidden="true">
          <!-- Moon Icon for Dark Mode -->
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M20.354 15.354A9 9 0 118.646 3.646a7 7 0 1011.708 11.708z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" aria-hidden="true">
          <!-- Sun Icon for Light Mode -->
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05
                   17.95l-1.414-1.414M17.95 17.95l-1.414-1.414M6.05
                   6.05L4.636 4.636M12 8a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>
      </button>

      <!-- User Menu Dropdown -->
      <DropdownProfile align="right" />


      <!--
            &lt;!&ndash; Notification Bell &ndash;&gt;
            <button class="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"
                   viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15 17h5l-1.405-1.405C18.737 14.757 18 13.344 18 12V7a6 6
                         0 00-9.33-5.024A1.5 1.5 0 008 3v0a1.5 1.5 0 00-.67 1.272V12c0
                         1.344-.737 2.757-1.595 3.595L4 17h5m6 0a3 3 0 01-6 0"/>
              </svg>
            </button>
            &lt;!&ndash; User profile &ndash;&gt;
            <button class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none">
              <img src="https://via.placeholder.com/30" alt="User" class="rounded-full h-8 w-8" />
              <span class="hidden md:inline">Tom Cook</span>
            </button>
      -->
    </div>
  </header>
</template>

<!-- components/AppHeader.vue -->
<script setup lang="ts">

const props = defineProps<{
  onToggleSidebar: () => void,
  onToggleDarkMode: () => void,
  isDarkMode: boolean
}>()

const searchModalOpen = ref(false)

const openSearchModal = () => {
  searchModalOpen.value = true
}

const closeSearchModal = () => {
  searchModalOpen.value = false
}

</script>

