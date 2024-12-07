<template>
  <div
    class="relative"
    @mouseenter="tooltipOpen = true"
    @mouseleave="tooltipOpen = false"
    @focusin="tooltipOpen = true"
    @focusout="tooltipOpen = false"
  >
    <!-- Tooltip Trigger -->
    <button
      class="block"
      aria-haspopup="true"
      :aria-expanded="tooltipOpen"
      :aria-describedby="tooltipId"
      @click.prevent
      @keydown.enter.prevent="tooltipOpen = !tooltipOpen"
      @keydown.space.prevent="tooltipOpen = !tooltipOpen"
    >
      <svg
        class="fill-current text-gray-400 dark:text-gray-500"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
      </svg>
    </button>

    <!-- Tooltip Content -->
    <div :class="positionOuterClasses" :id="tooltipId" role="tooltip">
      <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="tooltipOpen"
          class="rounded-lg border overflow-hidden shadow-lg"
          :class="[colorClasses, sizeClasses]"
          @click.stop
          tabindex="0"
        >
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Define props with validation and default values
const props = defineProps({
  bg: {
    type: String,
    default: 'default', // Options: 'light', 'dark', 'default'
    validator: (value) => ['light', 'dark', 'default'].includes(value),
  },
  size: {
    type: String,
    default: 'default', // Options: 'lg', 'md', 'sm', 'default'
    validator: (value) => ['lg', 'md', 'sm', 'default'].includes(value),
  },
  position: {
    type: String,
    default: 'bottom', // Options: 'right', 'left', 'bottom', 'top'
    validator: (value) => ['right', 'left', 'bottom', 'top'].includes(value),
  },
})

// Reactive state for tooltip visibility
const tooltipOpen = ref(false)

// Generate a unique ID for aria-describedby
const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`

// Computed property for outer position classes
const positionOuterClasses = computed(() => {
  switch (props.position) {
    case 'right':
      return 'left-full top-1/2 -translate-y-1/2';
    case 'left':
      return 'right-full top-1/2 -translate-y-1/2';
    case 'top':
      return 'bottom-full left-1/2 -translate-x-1/2';
    case 'bottom':
    default:
      return 'top-full left-1/2 -translate-x-1/2';
  }
})

// Computed property for size classes
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'min-w-72 px-3 py-2';
    case 'md':
      return 'min-w-56 px-3 py-2';
    case 'sm':
      return 'min-w-44 px-3 py-2';
    case 'default':
    default:
      return 'px-3 py-2';
  }
})

// Computed property for color classes
const colorClasses = computed(() => {
  switch (props.bg) {
    case 'light':
      return 'bg-white text-gray-600 border-gray-200';
    case 'dark':
      return 'bg-gray-800 text-gray-100 border-gray-700/60';
    case 'default':
    default:
      return 'text-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700/60';
  }
})

// Event listeners to handle clicks outside the tooltip
const clickOutsideHandler = (event) => {
  const target = event.target
  const tooltipElement = tooltipContent.value
  const triggerElement = trigger.value

  if (
    tooltipOpen.value &&
    tooltipElement &&
    !tooltipElement.contains(target) &&
    !triggerElement.contains(target)
  ) {
    tooltipOpen.value = false
  }
}

const keyDownHandler = (event) => {
  if (tooltipOpen.value && event.key === 'Escape') {
    tooltipOpen.value = false
    trigger.value.focus()
  }
}

// Refs for elements
const tooltipContent = ref(null)
const trigger = ref(null)

// Lifecycle hooks to add/remove event listeners
onMounted(() => {
  document.addEventListener('click', clickOutsideHandler)
  document.addEventListener('keydown', keyDownHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutsideHandler)
  document.removeEventListener('keydown', keyDownHandler)
})
</script>

<style scoped>
/* Optional: Add any additional styles here */
</style>
