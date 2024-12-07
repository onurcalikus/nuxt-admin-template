<!-- layouts/default.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const sidebarOpen = ref(true) // Mobile off-canvas toggle
const collapsed = ref(false)  // Collapsed state for sidebar

function toggleSidebar() {
  collapsed.value = !collapsed.value
}
function toggleMobileSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <Header :onToggleSidebar="toggleMobileSidebar" />

    <div class="flex flex-1 overflow-hidden">
      <SideBar
          :sidebarOpen="sidebarOpen"
          :collapsed="collapsed"
          :onToggleSidebar="toggleSidebar"
      />
      <main class="flex-1 overflow-auto bg-gray-50 p-4">
        <NuxtPage />
      </main>
    </div>

    <Footer/>
  </div>
</template>
