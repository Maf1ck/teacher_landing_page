<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick, type Component } from 'vue'
import { useTutorStore } from '../../stores/tutor'

const props = withDefaults(
  defineProps<{
    component: Component
    sectionId: string
    minHeight?: string
    rootMargin?: string
  }>(),
  {
    minHeight: '120px',
    rootMargin: '300px 0px',
  },
)

const store = useTutorStore()
const intersected = ref(false)
const root = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const visible = computed(
  () => intersected.value || store.pendingNavSection === props.sectionId,
)

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        intersected.value = true
        observer?.disconnect()
      }
    },
    { rootMargin: props.rootMargin },
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

watch(visible, async (isVisible) => {
  if (!isVisible || store.pendingNavSection !== props.sectionId) return
  await nextTick()
  const el = document.getElementById(props.sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    store.clearPendingNavSection()
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
