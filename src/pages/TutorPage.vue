<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useTutorStore } from '../stores/tutor'
import { useSeo } from '../composables/useSeo'
import MathTutorLanding from '../components/tutor/MathTutorLanding.vue'

const MathToolsPage = defineAsyncComponent(() => import('./MathToolsPage.vue'))

const store = useTutorStore()
const currentPage = computed(() => store.currentPage)

useSeo(() => currentPage.value)
</script>

<template lang="pug">
MathTutorLanding(v-if="store.currentPage === 'landing'")
MathToolsPage(v-else)
</template>
