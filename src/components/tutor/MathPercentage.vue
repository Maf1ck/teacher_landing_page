<script setup lang="ts">
import { ref, computed } from 'vue'

// Tool A: P% of X
const percentA = ref<number>(15)
const numberX = ref<number>(200)
const resultA = computed(() => {
  if (percentA.value == null || numberX.value == null) return 0
  return Number(((percentA.value / 100) * numberX.value).toFixed(4))
})

// Tool B: X is what percent of Y
const valX = ref<number>(30)
const valY = ref<number>(150)
const resultB = computed(() => {
  if (!valY.value) return 0
  return Number(((valX.value / valY.value) * 100).toFixed(2))
})

// Tool C: Increase/decrease X by P%
const valBase = ref<number>(100)
const percentChange = ref<number>(10)
const changeDirection = ref<'up' | 'down'>('up')
const resultC = computed(() => {
  const base = valBase.value
  const pct = percentChange.value
  if (base == null || pct == null) return 0
  const factor = changeDirection.value === 'up' ? 1 + pct / 100 : 1 - pct / 100
  return Number((base * factor).toFixed(4))
})
</script>

<template lang="pug">
.tool-view
  h2.tool-header Калькулятор відсотків
  p.tool-intro Три найпопулярніші операції з відсотками для швидкого домашнього завдання або підготовки.
  
  .percent-grid
    //- Card A
    .percent-card
      h3.percent-card-title Знаходження відсотка від числа
      p.percent-card-subtitle Скільки буде P% від числа X?
      .percent-card-inputs
        .small-input-group
          label Відсоток P (%)
          input(type="number" v-model.number="percentA" min="0")
        .small-input-group
          label Число X
          input(type="number" v-model.number="numberX")
      .percent-card-result
        p Результат: #[span.result-highlight {{ resultA }}]
        span.calc-formula-desc ({{ percentA }}% від {{ numberX }} = {{ percentA }} / 100 * {{ numberX }})

    //- Card B
    .percent-card
      h3.percent-card-title Відсоткове співвідношення
      p.percent-card-subtitle Який відсоток число X становить від Y?
      .percent-card-inputs
        .small-input-group
          label Число X
          input(type="number" v-model.number="valX")
        .small-input-group
          label Число Y
          input(type="number" v-model.number="valY" min="1")
      .percent-card-result
        p Результат: #[span.result-highlight {{ resultB }}%]
        span.calc-formula-desc ({{ valX }} від {{ valY }} = {{ valX }} / {{ valY }} * 100%)

    //- Card C
    .percent-card
      h3.percent-card-title Збільшення / Зменшення числа
      p.percent-card-subtitle Змінити число X на P%
      .percent-card-inputs
        .small-input-group
          label Число X
          input(type="number" v-model.number="valBase")
        .small-input-group
          label Відсоток P (%)
          input(type="number" v-model.number="percentChange" min="0")
        .direction-selector
          label Напрямок
          .btn-toggle-row
            button(:class="{ active: changeDirection === 'up' }" @click="changeDirection = 'up'") + Збільшити
            button(:class="{ active: changeDirection === 'down' }" @click="changeDirection = 'down'") - Зменшити
      .percent-card-result
        p Результат: #[span.result-highlight {{ resultC }}]
        span.calc-formula-desc ({{ valBase }} {{ changeDirection === 'up' ? '+' : '-' }} {{ percentChange }}%)
</template>

<style scoped lang="scss">
.tool-header {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--color-primary);
}

.tool-intro {
  color: var(--color-text-muted);
  font-size: 15px;
  margin-bottom: 32px;
  line-height: 1.5;
}

.percent-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.percent-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.percent-card-title {
  font-size: 18px;
  font-weight: 700;
}

.percent-card-subtitle {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-top: -12px;
}

.percent-card-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
}

.small-input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 140px;
  flex-grow: 1;

  label {
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-muted);
  }

  input {
    padding: 10px;
    border: 1.5px solid #cbd5e1;
    border-radius: var(--radius-sm);
    font-size: 15px;
    font-weight: 600;
    outline: none;

    &:focus {
      border-color: var(--color-primary);
    }
  }
}

.direction-selector {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;

  label {
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-muted);
  }
}

.btn-toggle-row {
  display: flex;
  border: 1.5px solid #cbd5e1;
  border-radius: var(--radius-sm);
  overflow: hidden;

  button {
    flex-grow: 1;
    background: white;
    border: none;
    padding: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    color: var(--color-text-muted);
    transition: all var(--transition-fast);

    &.active {
      background-color: var(--color-primary);
      color: white;
    }

    &:first-child {
      border-right: 1.5px solid #cbd5e1;
    }
  }
}

.percent-card-result {
  background-color: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: var(--radius-sm);
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 15px;
    font-weight: 600;
  }

  .result-highlight {
    font-size: 20px;
    color: var(--color-primary);
    font-weight: 800;
    margin-left: 6px;
  }

  .calc-formula-desc {
    font-size: 12px;
    color: var(--color-text-muted);
    font-style: italic;
  }
}
</style>
