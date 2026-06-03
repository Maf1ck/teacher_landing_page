<script setup lang="ts">
import TutorHeader from './TutorHeader.vue'
import TutorHero from './TutorHero.vue'
import TutorAbout from './TutorAbout.vue'
import TutorServices from './TutorServices.vue'
import TutorConsultation from './TutorConsultation.vue'
import TutorCases from './TutorCases.vue'
import TutorReviews from './TutorReviews.vue'
import TutorSignup from './TutorSignup.vue'
import TutorFooter from './TutorFooter.vue'
</script>

<template lang="pug">
.landing
  TutorHeader
  TutorHero
  TutorAbout
  TutorServices
  TutorConsultation
  TutorCases
  TutorReviews
  TutorSignup
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
