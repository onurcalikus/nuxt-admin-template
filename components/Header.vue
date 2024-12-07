<!-- components/AppHeader.vue -->
<script setup lang="ts">
const props = defineProps<{
  onToggleSidebar: () => void
}>()
</script>

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
      <span class="font-semibold text-xl text-gray-700">MyApp</span>
    </div>
    <div class="flex items-center space-x-4">
      <!-- Notification Bell -->
      <button class="text-gray-600 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405C18.737 14.757 18 13.344 18 12V7a6 6
                   0 00-9.33-5.024A1.5 1.5 0 008 3v0a1.5 1.5 0 00-.67 1.272V12c0
                   1.344-.737 2.757-1.595 3.595L4 17h5m6 0a3 3 0 01-6 0"/>
        </svg>
      </button>
      <!-- User profile -->
      <button class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none">
        <img src="https://via.placeholder.com/30" alt="User" class="rounded-full h-8 w-8" />
        <span class="hidden md:inline">Tom Cook</span>
      </button>
    </div>
  </header>
</template>
