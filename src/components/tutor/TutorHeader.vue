<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTutorStore } from '../../stores/tutor'
import TutorIcon from './TutorIcon.vue'

const store  = useTutorStore()
const route  = useRoute()
const router = useRouter()

const isMathPage = computed(() => route.path.startsWith('/calculators'))

// ── Active section tracking (scroll-based) ───────────────────────────────────
// Order MUST match the DOM order in MathTutorLanding.vue
const SECTIONS = ['hero', 'about', 'services', 'consultation', 'cases', 'reviews', 'signup'] as const
type SectionId = typeof SECTIONS[number]

const activeSection = ref<SectionId>('hero')
const isScrolling = ref(false)
let scrollTimeout: ReturnType<typeof setTimeout> | null = null

const updateActive = () => {
  if (isMathPage.value || isScrolling.value) return
  const OFFSET = 120 // px — how far past the top triggers the section

  // Walk sections bottom-up — first one whose top is ≤ OFFSET wins
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTIONS[i])
    if (!el) continue
    if (el.getBoundingClientRect().top <= OFFSET) {
      activeSection.value = SECTIONS[i]
      return
    }
  }
  activeSection.value = 'hero'
}

let retryTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  window.addEventListener('scroll', updateActive, { passive: true })
  // Retry periodically until all lazy sections have mounted
  retryTimer = setInterval(updateActive, 800)
  setTimeout(() => { if (retryTimer) clearInterval(retryTimer) }, 8000)
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateActive)
  if (retryTimer) clearInterval(retryTimer)
})


// ── Navigation helpers ───────────────────────────────────────────────────────
const scrollToSection = (id: string, attempt = 0) => {
  const el = document.getElementById(id)
  if (el) {
    store.clearPendingNavSection()
    isScrolling.value = true
    activeSection.value = id as SectionId
    el.scrollIntoView({ behavior: 'smooth' })
    if (scrollTimeout) clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      isScrolling.value = false
    }, 1000)
    return
  }
  if (attempt < 30) setTimeout(() => scrollToSection(id, attempt + 1), 50)
}

const navigateToSection = (id: string) => {
  store.closeMobileMenu()
  if (isMathPage.value) {
    store.pendingNavSection = id
    router.push('/')
  } else {
    scrollToSection(id)
  }
}

const openCalculators = () => {
  store.closeMobileMenu()
  store.clearPendingNavSection()
  router.push('/calculators/quadratic-equations')
}
</script>

<template lang="pug">
header.header
  .nav-container
    a.logo(href="/" @click.prevent="navigateToSection('hero')" aria-label="MATH_SOFI — на головну") MATH_SOFI

    nav.nav-links(:class="{ 'nav-active': store.isMobileMenuOpen }")
      a(
        href="#about"
        :class="{ active: !isMathPage && activeSection === 'about' }"
        @click.prevent="navigateToSection('about')"
      ) Про мене
      a(
        href="#services"
        :class="{ active: !isMathPage && activeSection === 'services' }"
        @click.prevent="navigateToSection('services')"
      ) З чим допомагаю
      a(
        href="#cases"
        :class="{ active: !isMathPage && activeSection === 'cases' }"
        @click.prevent="navigateToSection('cases')"
      ) Кейси
      a(
        href="#reviews"
        :class="{ active: !isMathPage && activeSection === 'reviews' }"
        @click.prevent="navigateToSection('reviews')"
      ) Відгуки
      a(
        href="#consultation"
        :class="{ active: !isMathPage && activeSection === 'consultation' }"
        @click.prevent="navigateToSection('consultation')"
      ) Консультація
      a.nav-highlight(
        href="/calculators/quadratic-equations"
        :class="{ active: isMathPage }"
        @click.prevent="openCalculators"
      ) Калькулятори
      a.btn-nav(href="#signup" @click.prevent="navigateToSection('signup')") Записатись

    button.burger-menu(@click="store.toggleMobileMenu" aria-label="Toggle menu")
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
    position: relative;

    &:hover {
      color: var(--color-primary);
    }

    // Active indicator underline
    &.active:not(.btn-nav) {
      color: var(--color-primary);
      text-shadow: 0 0 .65px var(--color-primary);

      &::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: var(--color-primary);
        border-radius: 2px;
      }
    }
  }
}

.nav-highlight {
  &.active {
    color: var(--color-primary) !important;
    text-shadow: 0 0 .65px var(--color-primary) !important;

    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--color-primary);
      border-radius: 2px;
    }
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

  &::after { display: none !important; }

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

      &.active:not(.btn-nav)::after {
        bottom: 2px;
      }
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
