<script setup lang="ts">
import { useTutorStore } from '../../stores/tutor'
import TutorIcon from './TutorIcon.vue'

const store = useTutorStore()

const scrollToSection = (id: string) => {
  store.closeMobileMenu()
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template lang="pug">
header.header
  .nav-container
    a.logo(href="#", @click.prevent="scrollToSection('hero')") MATH_SOFI
    
    nav.nav-links(:class="{ 'nav-active': store.isMobileMenuOpen }")
      a(href="#about", @click.prevent="scrollToSection('about')") Про мене
      a(href="#services", @click.prevent="scrollToSection('services')") З чим допомагаю
      a(href="#cases", @click.prevent="scrollToSection('cases')") Кейси
      a(href="#reviews", @click.prevent="scrollToSection('reviews')") Відгуки
      a(href="#consultation", @click.prevent="scrollToSection('consultation')") Консультація
      a.btn-nav(href="#signup", @click.prevent="scrollToSection('signup')") Записатись

    button.burger-menu(@click="store.toggleMobileMenu", aria-label="Toggle menu")
      TutorIcon(:name="store.isMobileMenuOpen ? 'close' : 'menu'")
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(245, 247, 251, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
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

    &:hover {
      color: var(--color-primary);
    }
  }
}

.btn-nav {
  background-color: var(--color-primary);
  color: white !important;
  padding: 8px 20px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);

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
}

@media (max-width: 768px) {
  .burger-menu {
    display: block;
    z-index: 101;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    width: 280px;
    height: 100vh;
    background-color: var(--color-bg-card);
    flex-direction: column;
    padding: 100px 32px 32px;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.05);
    z-index: 100;
    transform: translateX(100%);
    transition: transform var(--transition-normal);
    align-items: flex-start;

    &.nav-active {
      transform: translateX(0);
    }

    a {
      width: 100%;
      padding: 8px 0;
    }
  }

  .btn-nav {
    text-align: center;
    margin-top: 12px;
  }
}
</style>
