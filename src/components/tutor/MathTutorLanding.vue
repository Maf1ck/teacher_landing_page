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
    LazySection(:component="TutorAbout" section-id="about" min-height="520px")
    LazySection(:component="TutorServices" section-id="services" min-height="480px")
    LazySection(:component="TutorConsultation" section-id="consultation" min-height="640px")
    LazySection(:component="TutorCases" section-id="cases" min-height="420px")
    LazySection(:component="TutorReviews" section-id="reviews" min-height="380px")
    LazySection(:component="TutorSignup" section-id="signup" min-height="560px" root-margin="400px 0px")
  TutorFooter
</template>

<style scoped lang="scss">
.landing {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-page);
  padding-top: var(--header-height);
}
</style>
