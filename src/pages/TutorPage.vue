<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTutorStore } from '../stores/tutor'
import { useSeo } from '../composables/useSeo'
import MathTutorLanding from '../components/tutor/MathTutorLanding.vue'

const store = useTutorStore()
const route = useRoute()

useSeo(() => 'landing')

const scrollToPending = (attempt = 0) => {
  const id = store.pendingNavSection
  if (!id) return
  const el = document.getElementById(id)
  if (el) {
    store.clearPendingNavSection()
    el.scrollIntoView({ behavior: 'smooth' })
    return
  }
  if (attempt < 40) setTimeout(() => scrollToPending(attempt + 1), 50)
}

onMounted(() => {
  if (store.pendingNavSection) scrollToPending()
})

watch(() => route.fullPath, () => {
  if (store.pendingNavSection) scrollToPending()
})
</script>

<template lang="pug">
MathTutorLanding
</template>
