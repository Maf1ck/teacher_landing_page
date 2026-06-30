<script setup lang="ts">
import { nextTick, computed } from 'vue'
import { useTutorStore } from '../../stores/tutor'
import TutorIcon from './TutorIcon.vue'

const store = useTutorStore()

const scrollToSection = (id: string, attempt = 0) => {
  const element = document.getElementById(id)
  if (element) {
    store.clearPendingNavSection()
    element.scrollIntoView({ behavior: 'smooth' })
    return
  }

  if (attempt < 30) {
    setTimeout(() => scrollToSection(id, attempt + 1), 50)
  }
}

const navigateToSection = (id: string) => {
  store.closeMobileMenu()
  store.pendingNavSection = id

  if (store.currentPage !== 'landing') {
    store.setCurrentPage('landing')
    nextTick(() => scrollToSection(id))
  } else {
    scrollToSection(id)
  }
}

const openCalculators = () => {
  store.closeMobileMenu()
  store.clearPendingNavSection()
  store.setCurrentPage('math-quadratic')
}

const isMathPage = computed(() => {
  return [
    'math-quadratic',
    'math-percentage',
    'math-trig-circle',
    'math-right-triangle',
    'math-graph-plotter',
    'math-formulas',
  ].includes(store.currentPage)
})
</script>

<template lang="pug">
header.header
  .nav-container
    a.logo(href="#hero", @click.prevent="navigateToSection('hero')", aria-label="MATH_SOFI — на головну") MATH_SOFI

    nav.nav-links(:class="{ 'nav-active': store.isMobileMenuOpen }")
      a(href="#about", @click.prevent="navigateToSection('about')") Про мене
      a(href="#services", @click.prevent="navigateToSection('services')") З чим допомагаю
      a(href="#cases", @click.prevent="navigateToSection('cases')") Кейси
      a(href="#reviews", @click.prevent="navigateToSection('reviews')") Відгуки
      a.nav-highlight(href="#tools", :class="{ active: isMathPage }", @click.prevent="openCalculators") Калькулятори
      a(href="#consultation", @click.prevent="navigateToSection('consultation')") Консультація
      a.btn-nav(href="#signup", @click.prevent="navigateToSection('signup')") Записатись

    button.burger-menu(@click="store.toggleMobileMenu", aria-label="Toggle menu")
      TutorIcon(:name="store.isMobileMenuOpen ? 'close' : 'menu'")
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  z-index: 200;
  background-color: rgba(248, 250, 252, 0.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  padding: 16px 0;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.logo {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 24px;
  color: var(--color-primary);
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;

  a {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text-muted);
    transition: color var(--transition-fast);
    min-height: 44px;
    display: inline-flex;
    align-items: center;

    &:hover {
      color: var(--color-primary);
    }
  }
}

.nav-highlight {
  &.active {
    color: var(--color-primary) !important;
    font-weight: 600 !important;
  }
}

.btn-nav {
  background-color: var(--color-primary);
  color: white !important;
  padding: 10px 20px;
  min-height: 44px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-1px);
  }
}

.burger-menu {
  display: none;
  background: none;
  border: none;
  color: var(--color-text-dark);
  cursor: pointer;
  font-size: 24px;
  min-width: 44px;
  min-height: 44px;
  padding: 8px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1024px) {
  .burger-menu {
    display: flex;
    z-index: 201;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background-color: var(--color-bg-card);
    flex-direction: column;
    padding: 100px 32px 32px;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.08);
    z-index: 200;
    transform: translateX(100%);
    transition: transform var(--transition-normal);
    align-items: flex-start;

    &.nav-active {
      transform: translateX(0);
    }

    a {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
    }
  }

  .btn-nav {
    width: 100%;
    justify-content: center;
    text-align: center;
    margin-top: 16px;
    padding: 12px 20px;
    font-weight: 600;
    box-sizing: border-box;
  }
}
</style>
