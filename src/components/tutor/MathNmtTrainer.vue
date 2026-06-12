<script setup lang="ts">
import { ref, computed } from 'vue'
import TutorIcon from './TutorIcon.vue'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Спростіть вираз: (a - 2)² + 4a',
    options: ['a² + 4', 'a² - 4a + 4', 'a² + 8a + 4', 'a² - 4'],
    correctIndex: 0,
    explanation: 'Розкриваємо дужки за формулою квадрата двочлена: (a - 2)² = a² - 4a + 4. Додаємо 4a: a² - 4a + 4 + 4a. Зводимо подібні доданки (-4a + 4a скорочуються) і отримуємо остаточну відповідь: a² + 4.'
  },
  {
    id: 2,
    question: 'Знайдіть площу прямокутного трикутника, катети якого дорівнюють 6 см і 8 см.',
    options: ['48 см²', '24 см²', '14 см²', '10 см²'],
    correctIndex: 1,
    explanation: 'Площа прямокутного трикутника дорівнює половині добутку його катетів: S = ½ * a * b. Підставляємо значення: S = ½ * 6 * 8 = 3 * 8 = 24 см².'
  },
  {
    id: 3,
    question: 'Розв\'яжіть логарифмічне рівняння: log₂(x - 3) = 3.',
    options: ['6', '9', '11', '5'],
    correctIndex: 2,
    explanation: 'За означенням логарифма: аргумент дорівнює основі в степені результату. Тобто x - 3 = 2³. Обчислюємо степінь: x - 3 = 8. Додаємо 3 до обох частин: x = 8 + 3 = 11.'
  },
  {
    id: 4,
    question: 'У коробці лежать 5 синіх і 3 червоні кульки. Яка ймовірність витягнути навмання червону кульку?',
    options: ['3/5', '3/8', '5/8', '1/3'],
    correctIndex: 1,
    explanation: 'Ймовірність події дорівнює відношенню кількості сприятливих подій (m) до загальної кількості подій (n). Кількість червоних кульок m = 3. Загальна кількість кульок n = 5 + 3 = 8. Отже, ймовірність P = 3/8.'
  },
  {
    id: 5,
    question: 'Товар коштував 200 грн. Спочатку його ціну знизили на 10%, а потім підвищили на 10%. Якою стала кінцева ціна товару?',
    options: ['200 грн', '198 грн', '196 грн', '180 грн'],
    correctIndex: 1,
    explanation: '1) Після зниження ціни на 10% товар став коштувати: 200 * 0.9 = 180 грн. 2) Після підвищення нової ціни (180 грн) на 10% товар став коштувати: 180 * 1.1 = 198 грн.'
  }
]

const quizAnswers = ref<Record<number, number>>({})
const showQuizResults = ref(false)
const revealedExplanations = ref<Record<number, boolean>>({})

const score = computed(() => {
  let correctCount = 0
  quizQuestions.forEach(q => {
    if (quizAnswers.value[q.id] === q.correctIndex) {
      correctCount++
    }
  })
  return correctCount
})

const handleSelectAnswer = (qId: number, optionIndex: number) => {
  if (showQuizResults.value) return
  quizAnswers.value[qId] = optionIndex
}

const checkQuiz = () => {
  if (Object.keys(quizAnswers.value).length < quizQuestions.length) {
    alert('Будь ласка, дайте відповіді на всі запитання!')
    return
  }
  showQuizResults.value = true
}

const resetQuiz = () => {
  quizAnswers.value = {}
  showQuizResults.value = false
  revealedExplanations.value = {}
}

const toggleExplanation = (qId: number) => {
  revealedExplanations.value[qId] = !revealedExplanations.value[qId]
}
</script>

<template lang="pug">
.tool-view
  h2.tool-header Міні-тренажер НМТ з математики
  p.tool-intro Спробуйте свої сили на 5 типових завданнях Національного мультипредметного тесту. Дайте відповіді, перевірте себе та перегляньте детальні розв'язання.
  
  .quiz-container
    .question-card(v-for="(q, idx) in quizQuestions" :key="q.id")
      .q-header
        span.q-number Завдання {{ idx + 1 }}
        span.q-topic Тема: {{ q.id === 1 ? 'Алгебра (Вирази)' : q.id === 2 ? 'Геометрія (Площі)' : q.id === 3 ? 'Рівняння (Логарифми)' : q.id === 4 ? 'Теорія ймовірностей' : 'Відсотки' }}
      h3.q-text {{ q.question }}
      
      .options-list
        button.option-btn(
          v-for="(opt, oIdx) in q.options"
          :key="oIdx"
          :class="{ selected: quizAnswers[q.id] === oIdx, correct: showQuizResults && oIdx === q.correctIndex, incorrect: showQuizResults && quizAnswers[q.id] === oIdx && oIdx !== q.correctIndex }"
          @click="handleSelectAnswer(q.id, oIdx)"
        )
          span.option-letter {{ ['А', 'Б', 'В', 'Г'][oIdx] }}
          span.option-val {{ opt }}

      //- Solution toggle
      .explanation-wrapper(v-if="showQuizResults")
        button.toggle-exp-btn(@click="toggleExplanation(q.id)")
          TutorIcon(:name="revealedExplanations[q.id] ? 'close' : 'lightbulb'")
          span {{ revealedExplanations[q.id] ? 'Приховати розв\'язання' : 'Показати розв\'язання' }}
        
        .explanation-body(v-if="revealedExplanations[q.id]")
          p.exp-header #[strong Покрокове розв'язання:]
          p.exp-text {{ q.explanation }}

    //- Bottom control panel
    .quiz-control-bar
      div(v-if="!showQuizResults")
        button.btn.btn-primary(@click="checkQuiz") Перевірити результати
      div.quiz-ended-controls(v-else)
        .score-badge(:class="{ high: score >= 4, medium: score >= 2 && score < 4, low: score < 2 }")
          p Результат: #[strong {{ score }} з {{ quizQuestions.length }}] правильних відповідей!
        button.btn.btn-secondary(@click="resetQuiz") Спробувати ще раз
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

.quiz-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.question-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 24px;
}

.q-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 700;

  .q-number {
    color: var(--color-primary);
    text-transform: uppercase;
  }
  .q-topic {
    color: var(--color-text-muted);
  }
}

.q-text {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}

.options-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  background-color: white;
  border: 1.5px solid #cbd5e1;
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
    background-color: rgba(37, 99, 235, 0.02);
  }

  &.selected {
    border-color: var(--color-primary);
    background-color: rgba(37, 99, 235, 0.05);
    font-weight: 600;
  }

  &.correct {
    border-color: #10b981;
    background-color: #f0fdf4;
    color: #166534;
    font-weight: 600;
  }

  &.incorrect {
    border-color: #ef4444;
    background-color: #fef2f2;
    color: #991b1b;
  }
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #f1f5f9;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.option-btn.selected .option-letter {
  background-color: var(--color-primary);
  color: white;
}

.option-btn.correct .option-letter {
  background-color: #10b981;
  color: white;
}

.option-btn.incorrect .option-letter {
  background-color: #ef4444;
  color: white;
}

.explanation-wrapper {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #e2e8f0;
}

.toggle-exp-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
}

.explanation-body {
  margin-top: 12px;
  background-color: #eff6ff;
  border-radius: var(--radius-sm);
  padding: 16px;
  font-size: 14px;
  border-left: 3px solid var(--color-primary);
}

.exp-header {
  margin-bottom: 6px;
  color: var(--color-primary-dark);
}

.exp-text {
  color: var(--color-text-muted);
}

.quiz-control-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.quiz-ended-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.score-badge {
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  font-size: 15px;

  &.high {
    background-color: #d1fae5;
    color: #065f46;
  }
  &.medium {
    background-color: #fef3c7;
    color: #92400e;
  }
  &.low {
    background-color: #fee2e2;
    color: #991b1b;
  }
}
</style>
