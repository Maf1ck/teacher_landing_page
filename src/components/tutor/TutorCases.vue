<script setup lang="ts">
import { useTutorStore } from '../../stores/tutor'
import TutorIcon from './TutorIcon.vue'

const store = useTutorStore()
</script>

<template lang="pug">
div
  // Philosophy Quote Banner
  .banner-philosophy
    .container
      p.philosophy-text КОЖНЕ ЗАНЯТТЯ – ЦЕ ЖИВИЙ ДІАЛОГ І КОМАНДНА РОБОТА, ДЕ МИ #[span.highlight-blue РАЗОМ] ШУКАЄМО НАЙКРАЩІ СПОСОБИ ДОСЯГТИ #[span.highlight-blue РЕЗУЛЬТАТУ].

  // Cases Section
  section#cases.cases-section
    .container
      h2.section-title.text-center Кейси учнів
      p.section-subtitle.text-center Історії успіху моїх учнів та результати нашої спільної праці
      
      .cases-container
        // Left side: Cases tabs list
        .cases-tabs
          button.case-tab-btn(
            v-for="(c, index) in store.cases"
            :key="index"
            :class="{ 'active-tab': store.activeCase === index }"
            @click="store.setCase(index)"
          )
            .tab-btn-header
              span.tab-student-name {{ c.name }}
              span.tab-student-badge {{ c.badge }}
            p.tab-student-goal {{ c.goal }}

        // Right side: Active case details
        .case-details-card
          .case-details-header
            div
              h3.case-student-title {{ store.cases[store.activeCase].name }} — {{ store.cases[store.activeCase].age }}
              p.case-student-goal-label Мета занять: {{ store.cases[store.activeCase].goal }}
            span.case-detail-badge {{ store.cases[store.activeCase].badge }}

          .case-progress-stats
            .stat-progress-box
              span.stat-label До занять
              span.stat-value.start {{ store.cases[store.activeCase].startScore }}
            
            .stat-arrow-indicator
              TutorIcon(name="arrow-right")
            
            .stat-progress-box.highlight
              span.stat-label Результат
              span.stat-value.end {{ store.cases[store.activeCase].endScore }}
            
            .stat-progress-box
              span.stat-label Термін навчання
              span.stat-value.duration {{ store.cases[store.activeCase].duration }}

          .case-description
            h4 Як відбувався процес:
            p {{ store.cases[store.activeCase].text }}
</template>

<style scoped lang="scss">
/* Philosophy Quote Banner */
.banner-philosophy {
  background-color: #f1f5f9;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  padding: 48px 0;
  text-align: center;
}

.philosophy-text {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.45;
  max-width: 950px;
  margin: 0 auto;
  color: var(--color-text-dark);
}

.philosophy-text .highlight-blue {
  color: var(--color-primary);
}

/* Cases Section */
.cases-section {
  padding: 80px 0;
  background-color: #f8fafc;
}

.section-title {
  font-size: 36px;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: var(--color-text-muted);
  max-width: 800px;
  margin: 0 auto 48px;
}

.cases-container {
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 32px;
  margin-top: 40px;
}

.cases-tabs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.case-tab-btn {
  background-color: var(--color-bg-card);
  border: 1px solid rgba(226, 232, 240, 0.8);
  padding: 20px;
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
  width: 100%;

  &:hover {
    transform: translateX(4px);
    border-color: rgba(37, 99, 235, 0.3);
  }
}

.active-tab {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  background-color: var(--color-primary-light);
}

.tab-btn-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.tab-student-name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 18px;
  color: var(--color-text-dark);
}

.tab-student-badge {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary);
  background-color: var(--color-primary-light);
  padding: 2px 8px;
  border-radius: 12px;
}

.active-tab .tab-student-badge {
  background-color: var(--color-primary);
  color: white;
}

.tab-student-goal {
  font-size: 13px;
  color: var(--color-text-muted);
}

.case-details-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: 40px;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.case-details-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 20px;
  margin-bottom: 24px;
}

.case-student-title {
  font-size: 24px;
  margin-bottom: 4px;
}

.case-student-goal-label {
  font-size: 15px;
  color: var(--color-text-muted);
}

.case-detail-badge {
  background-color: var(--color-primary);
  color: white;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
}

.case-progress-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
}

.stat-progress-box {
  background-color: #f1f5f9;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-progress-box.highlight {
  background-color: var(--color-primary-light);
  border: 2px dashed rgba(37, 99, 235, 0.3);
}

.stat-label {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--color-text-muted);
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  font-family: var(--font-heading);
}

.stat-value.start {
  color: var(--color-text-muted);
}

.stat-value.end {
  color: var(--color-primary);
  font-size: 22px;
}

.stat-arrow-indicator {
  font-size: 24px;
  color: var(--color-primary);
}

.case-description {
  h4 {
    font-size: 16px;
    margin-bottom: 8px;
  }

  p {
    color: var(--color-text-muted);
    font-size: 15px;
    line-height: 1.6;
    margin: 0;
  }
}

@media (max-width: 1024px) {
  .cases-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .cases-tabs {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .case-tab-btn {
    flex-shrink: 0;
    width: 250px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .case-details-card {
    padding: 24px 16px;
  }

  .case-progress-stats {
    flex-direction: column;
    gap: 12px;
  }

  .stat-progress-box {
    width: 100%;
  }

  .stat-arrow-indicator {
    transform: rotate(90deg);
  }
}
</style>
