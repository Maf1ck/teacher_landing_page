<script setup lang="ts">
import { ref, computed } from 'vue'
import TutorIcon from './TutorIcon.vue'

interface FormulaItem {
  title: string
  formula: string
  desc: string
  category: 'algebra' | 'geometry' | 'trigonometry'
}

const formulasList: FormulaItem[] = [
  { title: 'Квадрат суми', formula: '(a + b)² = a² + 2ab + b²', desc: 'Формула скороченого множення', category: 'algebra' },
  { title: 'Різниця квадратів', formula: 'a² - b² = (a - b)(a + b)', desc: 'Формула скороченого множення', category: 'algebra' },
  { title: 'Теорема Піфагора', formula: 'a² + b² = c²', desc: 'Для прямокутного трикутника з гіпотенузою c', category: 'geometry' },
  { title: 'Площа круга', formula: 'S = πr²', desc: 'Де r — радіус круга', category: 'geometry' },
  { title: 'Основна тригонометрична тотожність', formula: 'sin²α + cos²α = 1', desc: 'Зв\'язок синуса і косинуса одного кута', category: 'trigonometry' },
  { title: 'Синус подвійного кута', formula: 'sin(2α) = 2sinα·cosα', desc: 'Формула подвійного кута', category: 'trigonometry' },
  { title: 'Формула коренів квадратного рівняння', formula: 'x = (-b ± √D) / 2a', desc: 'Де D = b² - 4ac', category: 'algebra' },
  { title: 'Теорема синусів', formula: 'a / sin A = b / sin B = c / sin C = 2R', desc: 'Де R — радіус описаного кола', category: 'geometry' },
  { title: 'Теорема косинусів', formula: 'a² = b² + c² - 2bc·cos A', desc: 'Узагальнення теореми Піфагора для довільного кута', category: 'geometry' },
  { title: 'Косинус подвійного кута', formula: 'cos(2α) = cos²α - sin²α', desc: 'Формула подвійного кута', category: 'trigonometry' }
]

const formulaSearch = ref('')
const selectedFormulaCategory = ref<'all' | 'algebra' | 'geometry' | 'trigonometry'>('all')
const copiedFormulaIndex = ref<number | null>(null)

const filteredFormulas = computed(() => {
  return formulasList.filter(f => {
    const matchesCategory = selectedFormulaCategory.value === 'all' || f.category === selectedFormulaCategory.value
    const matchesSearch = f.title.toLowerCase().includes(formulaSearch.value.toLowerCase()) || 
                          f.formula.toLowerCase().includes(formulaSearch.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const copyFormulaText = (text: string, index: number) => {
  navigator.clipboard.writeText(text).then(() => {
    copiedFormulaIndex.value = index
    setTimeout(() => {
      if (copiedFormulaIndex.value === index) {
        copiedFormulaIndex.value = null
      }
    }, 2000)
  })
}
</script>

<template lang="pug">
.tool-view
  h2.tool-header Довідник формул
  p.tool-intro Знайдіть потрібні формули за допомогою пошуку чи фільтрації за темами. Натисніть кнопку копіювання, щоб зберегти вираз.
  
  .formulas-control-panel
    .search-box
      TutorIcon(name="search")
      input(type="text" v-model="formulaSearch" placeholder="Пошук формули (напр., квадрат, косинус)...")
    
    .category-filter-row
      button.filter-tab(
        :class="{ active: selectedFormulaCategory === 'all' }"
        @click="selectedFormulaCategory = 'all'"
      ) Всі формули
      button.filter-tab(
        :class="{ active: selectedFormulaCategory === 'algebra' }"
        @click="selectedFormulaCategory = 'algebra'"
      ) Алгебра
      button.filter-tab(
        :class="{ active: selectedFormulaCategory === 'geometry' }"
        @click="selectedFormulaCategory = 'geometry'"
      ) Геометрія
      button.filter-tab(
        :class="{ active: selectedFormulaCategory === 'trigonometry' }"
        @click="selectedFormulaCategory = 'trigonometry'"
      ) Тригонометрія

  .formulas-list-grid
    .formula-card(v-for="(form, idx) in filteredFormulas" :key="idx")
      .formula-card-top
        span.formula-tag(:class="form.category") {{ form.category === 'algebra' ? 'Алгебра' : form.category === 'geometry' ? 'Геометрія' : 'Тригонометрія' }}
        button.copy-formula-btn(@click="copyFormulaText(form.formula, idx)" title="Скопіювати формулу")
          TutorIcon(:name="copiedFormulaIndex === idx ? 'check' : 'arrow-up-right'")
          span {{ copiedFormulaIndex === idx ? 'Скопійовано!' : 'Копіювати' }}
      
      h3.formula-card-title {{ form.title }}
      .formula-card-body
        code.math-formula {{ form.formula }}
      p.formula-card-desc {{ form.desc }}

    .no-formulas-found(v-if="filteredFormulas.length === 0")
      p Нічого не знайдено за вашим запитом. Спробуйте змінити критерії пошуку.
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

.formulas-control-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 16px;
    color: var(--color-text-muted);
    font-size: 18px;
  }

  input {
    width: 100%;
    padding: 14px 14px 14px 44px;
    border: 1.5px solid #cbd5e1;
    border-radius: var(--radius-md);
    font-size: 15px;
    outline: none;
    transition: all var(--transition-fast);

    &:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }
}

.category-filter-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 8px 16px;
  background-color: white;
  border: 1.5px solid #cbd5e1;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--color-text-muted);

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  &.active {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

.formulas-list-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.formula-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.formula-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.formula-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: var(--radius-sm);

  &.algebra {
    background-color: #e0f2fe;
    color: #0369a1;
  }
  &.geometry {
    background-color: #fef3c7;
    color: #b45309;
  }
  &.trigonometry {
    background-color: #f3e8ff;
    color: #7e22ce;
  }
}

.copy-formula-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.formula-card-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.formula-card-body {
  background-color: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: var(--radius-sm);
  padding: 12px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
}

.math-formula {
  font-family: monospace;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.formula-card-desc {
  font-size: 12px;
  color: var(--color-text-muted);
}

.no-formulas-found {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .formulas-list-grid {
    grid-template-columns: 1fr;
  }
}
</style>
