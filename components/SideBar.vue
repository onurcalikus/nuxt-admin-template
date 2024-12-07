

<template>
  <aside
      class="bg-white border-r flex-shrink-0 w-64 p-4 flex flex-col transform transition-transform duration-300 z-20
               fixed inset-y-0 left-0 lg:static lg:translate-x-0"
      :class="{'-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen, 'shadow-lg': sidebarOpen && !sidebarOpen}"
  >
    <!-- Close button on mobile -->
    <div class="flex justify-between mb-4 lg:hidden">
      <span class="text-xl font-semibold">Menu</span>
      <button @click="sidebarOpen = false" class="p-2 rounded-md text-gray-600 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor"
             stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Sidebar Navigation -->
    <nav class="flex-1 overflow-auto">
      <ul class="space-y-2">
        <li v-for="(section, index) in sections" :key="section.title">
          <button @click="toggleSection(index)" class="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 text-gray-700 font-medium">
            <div class="flex items-center space-x-2">
              <span>{{ section.icon }}</span>
              <span>{{ section.title }}</span>
            </div>
            <div v-if="section.links && section.links.length > 0" class="transform transition-transform"
                 :class="{'rotate-90': !section.collapsed}">
              <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="2"
                   viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
          <ul v-if="section.links && section.links.length > 0 && !section.collapsed" class="ml-8 mt-2 space-y-1">
            <li v-for="link in section.links" :key="link.name">
              <NuxtLink :to="link.href" class="block px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-50">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Sidebar Footer Section -->
    <div class="mt-4 border-t pt-4">
      <h3 class="text-xs uppercase text-gray-400 mb-2">Your Teams</h3>
      <div class="space-y-2">
        <a href="#" class="flex items-center space-x-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700">
          <span class="inline-block w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">H</span>
          <span>Heroicons</span>
        </a>
        <a href="#" class="flex items-center space-x-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700">
          <span class="inline-block w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">T</span>
          <span>Tailwind Labs</span>
        </a>
        <a href="#" class="flex items-center space-x-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700">
          <span class="inline-block w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">W</span>
          <span>Workcation</span>
        </a>
      </div>
      <div class="mt-4">
        <NuxtLink
            to="/settings"
            class="flex items-center space-x-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700"
        >
              <span class="inline-block w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" stroke-width="2"
                     viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.75 3.75h4.5M9.75 20.25h4.5M4.688 7.125l3.182 3.182a2.25 2.25 0 010 3.182L4.688 16.875M19.312 16.875l-3.182-3.182a2.25 2.25 0 010-3.182l3.182-3.182" />
                </svg>
              </span>
          <span>Settings</span>
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
import {ref} from "vue";

const sidebarOpen = ref(false)

// Example collapsible sections
const sections = ref([
  {
    title: 'Dashboard',
    icon: '🏠',
    links: [],
    collapsed: true // no links, so collapse doesn't really matter here
  },
  {
    title: 'Team',
    icon: '👥',
    collapsed: true,
    links: [
      { name: 'Members', href: '/team/members' },
      { name: 'Roles', href: '/team/roles' }
    ]
  },
  {
    title: 'Projects',
    icon: '📂',
    collapsed: true,
    links: [
      { name: 'All Projects', href: '/projects' },
      { name: 'Create Project', href: '/projects/create' }
    ]
  },
  {
    title: 'Calendar',
    icon: '📅',
    links: [],
    collapsed: true
  },
  {
    title: 'Documents',
    icon: '📄',
    links: [],
    collapsed: true
  },
  {
    title: 'Reports',
    icon: '📊',
    links: [],
    collapsed: true
  }
])

function toggleSection(index: number) {
  sections.value[index].collapsed = !sections.value[index].collapsed
}

const props = defineProps<{
  sidebarOpen: boolean
  collapsed: boolean
  onToggleSidebar: () => void
}>()
</script>
<style scoped>

</style>
