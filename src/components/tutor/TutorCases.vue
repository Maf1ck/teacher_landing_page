<script setup lang="ts">
import { ref } from 'vue'
import { useTutorStore } from '../../stores/tutor'
import TutorIcon from './TutorIcon.vue'

const store = useTutorStore()

const tooltipVisible = ref(false)

const toggleTooltip = () => {
  tooltipVisible.value = !tooltipVisible.value
}
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
      .cases-title-row
        h2.section-title Кейси учнів
        //- Tooltip trigger
        .tooltip-wrapper
          button.tooltip-btn(
            type="button"
            aria-label="Інформація про кейси"
            @click.stop="toggleTooltip"
          ) i
          transition(name="tooltip-pop")
            .tooltip-box(v-show="tooltipVisible")
              p Натисніть на ім'я учня зліва, щоб побачити його кейс та результат
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

          //- Bottom spacer — motivational quote
          .case-bottom-quote
            span.quote-mark "
            p.quote-text Кожен учень здатен досягти результату — потрібен лише правильний підхід.
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

/* Title row with tooltip */
.cases-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 36px;
  margin-bottom: 0;
}

.section-subtitle {
  font-size: 18px;
  color: var(--color-text-muted);
  max-width: 800px;
  margin: 0 auto 48px;
}

/* ─── Tooltip ───────────────────────────────────────────────── */
.tooltip-wrapper {
  position: relative;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: 6px;
  -webkit-tap-highlight-color: transparent;
}

.tooltip-btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 700;
  font-family: Georgia, serif;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0;
  transition: background-color var(--transition-fast), color var(--transition-fast);

  &:hover, &:focus {
    background-color: var(--color-primary);
    color: white;
    outline: none;
  }
}

.tooltip-box {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-text-dark);
  color: white;
  font-size: 13px;
  line-height: 1.5;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  white-space: nowrap;
  z-index: 100;
  box-shadow: var(--shadow-lg);

  p { margin: 0; }

  // Arrow
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: var(--color-text-dark);
  }
}

@media (max-width: 768px) {
  .tooltip-box {
    left: auto;
    right: -10px;
    transform: none;
    white-space: normal;
    width: 220px;
    max-width: 80vw;

    &::before {
      left: auto;
      right: 16px;
      transform: none;
    }
  }
}

/* Tooltip transition */
.tooltip-pop-enter-active,
.tooltip-pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.tooltip-pop-enter-from,
.tooltip-pop-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}
@media (max-width: 768px) {
  .tooltip-pop-enter-from,
  .tooltip-pop-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }
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
  gap: 12px;
  margin-bottom: 8px;
}

.tab-student-name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 18px;
  color: var(--color-text-dark);
  min-width: 0;
}

.tab-student-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.25;
  flex-shrink: 0;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary);
  background-color: var(--color-primary-light);
  padding: 4px 10px;
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

/* ─── Case details card ──────────────────────────────────────── */
.case-details-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: 40px;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  position: relative;
  overflow: hidden;
}

.case-details-card::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0) 70%);
  border-radius: 50%;
  pointer-events: none;
}
.case-details-card::after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: -60px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.03) 0%, rgba(37, 99, 235, 0) 70%);
  border-radius: 50%;
  pointer-events: none;
}

.case-details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.25;
  flex-shrink: 0;
  background-color: var(--color-primary);
  color: white;
  padding: 8px 14px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  max-width: 130px;
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

.case-bottom-quote {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 24px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(37, 99, 235, 0.08) 100%);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-primary);
}

.quote-mark {
  font-size: 40px;
  line-height: 0.8;
  color: var(--color-primary);
  font-family: Georgia, serif;
  flex-shrink: 0;
  margin-top: 4px;
}

.quote-text {
  font-size: 14px;
  font-style: italic;
  color: var(--color-text-muted);
  line-height: 1.55;
  margin: 0;
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
    flex-wrap: nowrap;
    gap: 12px;
  }

  .case-tab-btn {
    flex-shrink: 0;
    width: 250px;
  }

  .case-bottom-quote {
    margin-top: 20px;
    padding: 12px 16px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .case-details-header {
    flex-direction: column;
    align-items: stretch;
  }

  .case-detail-badge {
    align-self: center;
    max-width: 160px;
  }

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
