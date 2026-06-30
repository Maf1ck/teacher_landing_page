<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Component } from 'vue'

const props = withDefaults(
  defineProps<{
    component: Component
    minHeight?: string
    rootMargin?: string
  }>(),
  {
    minHeight: '120px',
    rootMargin: '300px 0px',
  },
)

const visible = ref(false)
const root = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { rootMargin: props.rootMargin },
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template lang="pug">
.lazy-section(ref="root")
  component(:is="component" v-if="visible")
  .lazy-placeholder(v-else :style="{ minHeight }" aria-hidden="true")
</template>

<style scoped lang="scss">
.lazy-placeholder {
  width: 100%;
}
</style>
