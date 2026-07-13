<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TOOL_ROUTES, type ToolId } from '../router'
import TutorHeader from '../components/tutor/TutorHeader.vue'
import TutorFooter from '../components/tutor/TutorFooter.vue'
import TutorIcon from '../components/tutor/TutorIcon.vue'

const MathQuadratic    = defineAsyncComponent(() => import('../components/tutor/MathQuadratic.vue'))
const MathPercentage   = defineAsyncComponent(() => import('../components/tutor/MathPercentage.vue'))
const MathTrigCircle   = defineAsyncComponent(() => import('../components/tutor/MathTrigCircle.vue'))
const MathRightTriangle = defineAsyncComponent(() => import('../components/tutor/MathRightTriangle.vue'))
const MathGraphPlotter = defineAsyncComponent(() => import('../components/tutor/MathGraphPlotter.vue'))
const MathFormulas     = defineAsyncComponent(() => import('../components/tutor/MathFormulas.vue'))

const route  = useRoute()
const router = useRouter()

const activeTool = computed<ToolId>(() => (route.meta.tool as ToolId) ?? 'math-quadratic')

const componentMap: Record<ToolId, ReturnType<typeof defineAsyncComponent>> = {
  'math-quadratic':     MathQuadratic,
  'math-percentage':    MathPercentage,
  'math-trig-circle':   MathTrigCircle,
  'math-right-triangle': MathRightTriangle,
  'math-graph-plotter': MathGraphPlotter,
  'math-formulas':      MathFormulas,
}

const activeComponent = computed(() => componentMap[activeTool.value])
</script>

<template lang="pug">
.tools-page
  TutorHeader

  main.tools-main
    .container
      .tools-container-card
        //- Sidebar Navigation
        aside.tools-sidebar
          button.back-home-btn(@click="router.push('/')")
            TutorIcon(name="chevron-left")
            span Повернутися назад

          .sidebar-header
            .tools-title-box
              TutorIcon.icon-decoration(name="calculator")
              h2.sidebar-title Математична Скринька
            p.sidebar-subtitle Корисні інструменти для навчання
          
          nav.sidebar-nav
            button.sidebar-tab-btn(
              v-for="tab in TOOL_ROUTES"
              :key="tab.tool"
              :class="{ active: activeTool === tab.tool }"
              @click="router.push(tab.path)"
            )
              TutorIcon.tab-icon(:name="tab.icon")
              span.tab-label {{ tab.label }}

        //- Main Work Area
        section.tools-content-area
          component(:is="activeComponent" :key="activeTool")

  TutorFooter
</template>

<style scoped lang="scss">
.tools-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-page);
  padding-top: var(--header-height);
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
  overflow: clip;
  min-height: 650px;
  min-width: 0;
  width: 100%;
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
  padding: 32px;
  overflow-x: auto;
  overflow-y: visible;
  min-width: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
}

.tools-main {
  flex-grow: 1;
  padding: 40px 0;
  min-width: 0;
  width: 100%;
}

@media (max-width: 1200px) {
  .tools-container-card {
    grid-template-columns: 240px 1fr;
  }
}

@media (max-width: 1024px) {
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
    padding: 20px 16px;
  }
}

@media (max-width: 768px) {
  .tools-content-area {
    padding: 16px 12px;
  }

  .tools-main {
    padding: 24px 0;
  }
}
</style>
