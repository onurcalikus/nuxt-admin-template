<!-- ~/components/Icon.vue -->
<template>
  <IconifyIcon :icon="icon" :width="size" :height="size" />
</template>

<script setup>

import { Icon as IconifyIcon } from '@iconify/vue'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: '20',
  },
})
</script>
