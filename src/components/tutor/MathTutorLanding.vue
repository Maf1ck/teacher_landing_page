<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TutorHeader from './TutorHeader.vue'
import TutorHero from './TutorHero.vue'
import TutorFooter from './TutorFooter.vue'
import LazySection from './LazySection.vue'

const TutorAbout = defineAsyncComponent(() => import('./TutorAbout.vue'))
const TutorServices = defineAsyncComponent(() => import('./TutorServices.vue'))
const TutorConsultation = defineAsyncComponent(() => import('./TutorConsultation.vue'))
const TutorCases = defineAsyncComponent(() => import('./TutorCases.vue'))
const TutorReviews = defineAsyncComponent(() => import('./TutorReviews.vue'))
const TutorSignup = defineAsyncComponent(() => import('./TutorSignup.vue'))
</script>

<template lang="pug">
.landing
  TutorHeader
  main#main-content
    TutorHero
    LazySection(:component="TutorAbout" min-height="520px")
    LazySection(:component="TutorServices" min-height="480px")
    LazySection(:component="TutorConsultation" min-height="640px")
    LazySection(:component="TutorCases" min-height="420px")
    LazySection(:component="TutorReviews" min-height="380px")
    LazySection(:component="TutorSignup" min-height="560px" root-margin="400px 0px")
  TutorFooter
</template>

<style scoped lang="scss">
.landing {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-page);
}
</style>
