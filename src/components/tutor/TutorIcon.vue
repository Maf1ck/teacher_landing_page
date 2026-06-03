<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const iconPath = computed(() => {
  switch (props.name) {
    case 'arrow-up-right':
      return 'M7 17L17 7M17 7H7M17 7V17'
    case 'arrow-right':
      return 'M5 12h14M12 5l7 7-7 7'
    case 'chevron-left':
      return 'M15 18l-6-6 6-6'
    case 'chevron-right':
      return 'M9 18l6-6-6-6'
    case 'graduation':
      return 'M22 10v6M2 10l10-5 10 5-10 5z M6 12.5V16c0 1.5 2.5 3 6 3s6-1.5 6-3v-3.5'
    case 'users':
      return 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75'
    case 'lightning':
      return 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'
    case 'handshake':
      return 'M10 18h4 M8 6h8 M2 10h20 M6 14h12 M12 2v20' // Simple fallback or schematic
    case 'search':
      return 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
    case 'lightbulb':
      return 'M9 21h6 M9 18h6 M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17h8v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z'
    case 'check':
      return 'M20 6L9 17l-5-5'
    case 'telegram':
      return 'M21.5 2L2 11.5l6.5 2.5L21.5 2z M8.5 14l3.5 6 1.5-6.5L8.5 14z'
    case 'instagram':
      return 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01M2 9a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7v6a7 7 0 0 1-7 7H9a7 7 0 0 1-7-7V9z'
    case 'tiktok':
      return 'M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5'
    case 'chat':
      return 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'
    case 'close':
      return 'M18 6L6 18M6 6l12 12'
    case 'menu':
      return 'M3 12h18M3 6h18M3 18h18'
    default:
      return ''
  }
})
</script>

<template lang="pug">
svg(
  :class="['tutor-icon', `icon-${name}`]"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2.2"
  stroke-linecap="round"
  stroke-linejoin="round"
)
  path(:d="iconPath")
</template>

<style scoped lang="scss">
.tutor-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
