<script setup lang="ts">
import { useTutorStore } from '../stores/tutor'
import MathTutorLanding from '../components/tutor/MathTutorLanding.vue'
import MathToolsPage from './MathToolsPage.vue'

const store = useTutorStore()
</script>

<template lang="pug">
MathTutorLanding(v-if="store.currentPage === 'landing'")
MathToolsPage(v-else)
</template>

