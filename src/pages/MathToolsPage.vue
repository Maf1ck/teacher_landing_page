<script setup lang="ts">
import { ref } from 'vue'
import { useTutorStore } from '../stores/tutor'
import TutorHeader from '../components/tutor/TutorHeader.vue'
import TutorFooter from '../components/tutor/TutorFooter.vue'
import TutorIcon from '../components/tutor/TutorIcon.vue'

// Import modular tool views
import MathQuadratic from '../components/tutor/MathQuadratic.vue'
import MathPercentage from '../components/tutor/MathPercentage.vue'
import MathTrigCircle from '../components/tutor/MathTrigCircle.vue'
import MathNmtTrainer from '../components/tutor/MathNmtTrainer.vue'
import MathFormulas from '../components/tutor/MathFormulas.vue'

const store = useTutorStore()

// Active tab selector
const activeTab = ref<'quadratic' | 'percent' | 'trig' | 'quiz' | 'formulas'>('quadratic')

// Tabs definition
const tabs = [
  { id: 'quadratic', label: 'Квадратні рівняння', icon: 'lightning' },
  { id: 'percent', label: 'Калькулятор відсотків', icon: 'percent' },
  { id: 'trig', label: 'Тригонометричне коло', icon: 'circle' },
  { id: 'quiz', label: 'Тренажер НМТ', icon: 'graduation' },
  { id: 'formulas', label: 'Довідник формул', icon: 'lightbulb' }
] as const
</script>

<template lang="pug">
.tools-page
  TutorHeader

  main.tools-main.fade-in
    .container
      .tools-container-card
        //- Sidebar Navigation
        aside.tools-sidebar
          button.back-home-btn(@click="store.setCurrentPage('landing')")
            TutorIcon(name="chevron-left")
            span Повернутися назад

          .sidebar-header
            .tools-title-box
              TutorIcon.icon-decoration(name="calculator")
              h2.sidebar-title Математична Скринька
            p.sidebar-subtitle Корисні інструменти для навчання
          
          nav.sidebar-nav
            button.sidebar-tab-btn(
              v-for="tab in tabs"
              :key="tab.id"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            )
              TutorIcon.tab-icon(:name="tab.icon")
              span.tab-label {{ tab.label }}

        //- Main Work Area
        section.tools-content-area
          MathQuadratic(v-if="activeTab === 'quadratic'")
          MathPercentage(v-else-if="activeTab === 'percent'")
          MathTrigCircle(v-else-if="activeTab === 'trig'")
          MathNmtTrainer(v-else-if="activeTab === 'quiz'")
          MathFormulas(v-else-if="activeTab === 'formulas'")

  TutorFooter
</template>

<style scoped lang="scss">
.tools-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-page);
}

.tools-main {
  flex-grow: 1;
  padding: 40px 0;
}

.tools-container-card {
  display: grid;
  grid-template-columns: 280px 1fr;
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(226, 232, 240, 0.8);
  overflow: hidden;
  min-height: 650px;
}

/* Sidebar styling */
.tools-sidebar {
  background-color: #f1f5f9;
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  margin-bottom: 32px;
}

.tools-title-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.icon-decoration {
  font-size: 28px;
  color: var(--color-primary);
}

.sidebar-title {
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
}

.sidebar-subtitle {
  font-size: 13px;
  color: var(--color-text-muted);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.sidebar-tab-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: rgba(37, 99, 235, 0.05);
    color: var(--color-primary);
  }

  &.active {
    background-color: var(--color-primary);
    color: white;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  }
}

.tab-icon {
  font-size: 18px;
}

.back-home-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 10px 16px;
  background-color: transparent;
  border: 1.5px solid var(--color-text-muted);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-text-muted);
    color: white;
  }
}

/* Main Content Area styling */
.tools-content-area {
  padding: 40px;
  overflow-y: auto;
}

/* Responsive adjustment */
@media (max-width: 1024px) {
  .tools-container-card {
    grid-template-columns: 240px 1fr;
  }
}

@media (max-width: 768px) {
  .tools-container-card {
    grid-template-columns: 1fr;
  }

  .tools-sidebar {
    padding: 24px 16px;
    border-right: none;
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  }

  .sidebar-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 16px;
    width: 100%;
  }

  .sidebar-tab-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 14px 10px;
    font-size: 13px;
    font-weight: 600;
    border: 1.5px solid #cbd5e1;
    background-color: white;
    border-radius: var(--radius-sm);
    gap: 8px;
    width: 100%;
    height: 100%;
    color: var(--color-text-muted);
    transition: all var(--transition-fast);
    
    .tab-icon {
      font-size: 20px;
      margin: 0;
    }

    .tab-label {
      display: inline;
    }

    &:last-child {
      grid-column: span 2;
    }

    &:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
      background-color: rgba(37, 99, 235, 0.02);
    }

    &.active {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: white;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    }
  }

  .back-home-btn {
    align-self: flex-start;
    margin-top: 0;
    margin-bottom: 16px;
  }

  .tools-content-area {
    padding: 24px 16px;
  }
}
</style>
