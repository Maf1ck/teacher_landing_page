<script setup lang="ts">
import { ref, computed } from 'vue'

type Mode = 'ab' | 'ac' | 'aA' | 'aB' | 'cA'

const selectedMode = ref<Mode>('ab')

// Input variables
const sideA = ref<number | null>(3)
const sideB = ref<number | null>(4)
const hypotenuseC = ref<number | null>(5)
const angleA = ref<number | null>(30)
const angleB = ref<number | null>(60)

// Helper to watch mode changes and reset fields to default valid examples
const handleModeChange = () => {
  if (selectedMode.value === 'ab') {
    sideA.value = 3
    sideB.value = 4
  } else if (selectedMode.value === 'ac') {
    sideA.value = 3
    hypotenuseC.value = 5
  } else if (selectedMode.value === 'aA') {
    sideA.value = 5
    angleA.value = 30
  } else if (selectedMode.value === 'aB') {
    sideA.value = 5
    angleB.value = 60
  } else if (selectedMode.value === 'cA') {
    hypotenuseC.value = 10
    angleA.value = 30
  }
}

// Solver calculation computed property
const solvedTriangle = computed(() => {
  const mode = selectedMode.value
  let a = 0, b = 0, c = 0, A = 0, B = 0, C = 90
  let steps: string[] = []
  let errorMsg: string | null = null

  if (mode === 'ab') {
    const valA = sideA.value
    const valB = sideB.value
    if (valA == null || valB == null || valA <= 0 || valB <= 0) {
      errorMsg = 'Будь ласка, введіть додатні числа для обох катетів.'
    } else {
      a = valA
      b = valB
      c = Math.sqrt(a * a + b * b)
      A = Math.atan2(a, b) * (180 / Math.PI)
      B = 90 - A

      steps.push(`Дано два катети: a = ${a}, b = ${b}`)
      steps.push(`1. Обчислюємо гіпотенузу c за теоремою Піфагора: c = √(a² + b²)`)
      steps.push(`   c = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = √(${a * a + b * b}) ≈ ${c.toFixed(4)}`)
      steps.push(`2. Знаходимо гострий кут A через арктангенс: A = arctg(a / b)`)
      steps.push(`   A = arctg(${a} / ${b}) ≈ ${A.toFixed(2)}°`)
      steps.push(`3. Знаходимо гострий кут B: B = 90° - A`)
      steps.push(`   B = 90° - ${A.toFixed(2)}° ≈ ${B.toFixed(2)}°`)
    }
  } else if (mode === 'ac') {
    const valA = sideA.value
    const valC = hypotenuseC.value
    if (valA == null || valC == null || valA <= 0 || valC <= 0) {
      errorMsg = 'Будь ласка, введіть додатні числа для катета та гіпотенузи.'
    } else if (valA >= valC) {
      errorMsg = 'Помилка: Гіпотенуза c має бути строго більшою за катет a.'
    } else {
      a = valA
      c = valC
      b = Math.sqrt(c * c - a * a)
      A = Math.asin(a / c) * (180 / Math.PI)
      B = 90 - A

      steps.push(`Дано катет a = ${a} та гіпотенузу c = ${c}`)
      steps.push(`1. Обчислюємо катет b за теоремою Піфагора: b = √(c² - a²)`)
      steps.push(`   b = √(${c}² - ${a}²) = √(${c * c} - ${a * a}) = √(${c * c - a * a}) ≈ ${b.toFixed(4)}`)
      steps.push(`2. Знаходимо гострий кут A через синус: sin(A) = a / c`)
      steps.push(`   A = arcsin(${a} / ${c}) ≈ ${A.toFixed(2)}°`)
      steps.push(`3. Знаходимо кут B: B = 90° - A`)
      steps.push(`   B = 90° - ${A.toFixed(2)}° ≈ ${B.toFixed(2)}°`)
    }
  } else if (mode === 'aA') {
    const valA = sideA.value
    const valAngA = angleA.value
    if (valA == null || valAngA == null || valA <= 0 || valAngA <= 0) {
      errorMsg = 'Будь ласка, введіть додатні числа для катета та кута A.'
    } else if (valAngA <= 0 || valAngA >= 90) {
      errorMsg = 'Помилка: Гострий кут A повинен бути в межах від 0° до 90°.'
    } else {
      a = valA
      A = valAngA
      B = 90 - A
      const radA = A * Math.PI / 180
      c = a / Math.sin(radA)
      b = a / Math.tan(radA)

      steps.push(`Дано катет a = ${a} та протилежний кут A = ${A}°`)
      steps.push(`1. Обчислюємо другий гострий кут B: B = 90° - A`)
      steps.push(`   B = 90° - ${A}° = ${B}°`)
      steps.push(`2. Обчислюємо гіпотенузу c: c = a / sin(A)`)
      steps.push(`   c = ${a} / sin(${A}°) = ${a} / ${Math.sin(radA).toFixed(4)} ≈ ${c.toFixed(4)}`)
      steps.push(`3. Обчислюємо катет b через тангенс: b = a / tg(A)`)
      steps.push(`   b = ${a} / tg(${A}°) = ${a} / ${Math.tan(radA).toFixed(4)} ≈ ${b.toFixed(4)}`)
    }
  } else if (mode === 'aB') {
    const valA = sideA.value
    const valAngB = angleB.value
    if (valA == null || valAngB == null || valA <= 0 || valAngB <= 0) {
      errorMsg = 'Будь ласка, введіть додатні числа для катета та кута B.'
    } else if (valAngB <= 0 || valAngB >= 90) {
      errorMsg = 'Помилка: Гострий кут B повинен бути в межах від 0° до 90°.'
    } else {
      a = valA
      B = valAngB
      A = 90 - B
      const radB = B * Math.PI / 180
      c = a / Math.cos(radB)
      b = a * Math.tan(radB)

      steps.push(`Дано катет a = ${a} та прилеглий кут B = ${B}°`)
      steps.push(`1. Обчислюємо другий гострий кут A: A = 90° - B`)
      steps.push(`   A = 90° - ${B}° = ${A}°`)
      steps.push(`2. Обчислюємо гіпотенузу c: c = a / cos(B)`)
      steps.push(`   c = ${a} / cos(${B}°) = ${a} / ${Math.cos(radB).toFixed(4)} ≈ ${c.toFixed(4)}`)
      steps.push(`3. Обчислюємо катет b через тангенс: b = a * tg(B)`)
      steps.push(`   b = ${a} * tg(${B}°) = ${a} * ${Math.tan(radB).toFixed(4)} ≈ ${b.toFixed(4)}`)
    }
  } else if (mode === 'cA') {
    const valC = hypotenuseC.value
    const valAngA = angleA.value
    if (valC == null || valAngA == null || valC <= 0 || valAngA <= 0) {
      errorMsg = 'Будь ласка, введіть додатні числа для гіпотенузи та кута A.'
    } else if (valAngA <= 0 || valAngA >= 90) {
      errorMsg = 'Помилка: Гострий кут A повинен бути в межах від 0° до 90°.'
    } else {
      c = valC
      A = valAngA
      B = 90 - A
      const radA = A * Math.PI / 180
      a = c * Math.sin(radA)
      b = c * Math.cos(radA)

      steps.push(`Дано гіпотенузу c = ${c} та гострий кут A = ${A}°`)
      steps.push(`1. Обчислюємо другий кут B: B = 90° - A`)
      steps.push(`   B = 90° - ${A}° = ${B}°`)
      steps.push(`2. Обчислюємо протилежний катет a: a = c * sin(A)`)
      steps.push(`   a = ${c} * sin(${A}°) = ${c} * ${Math.sin(radA).toFixed(4)} ≈ ${a.toFixed(4)}`)
      steps.push(`3. Обчислюємо прилеглий катет b: b = c * cos(A)`)
      steps.push(`   b = ${c} * cos(${A}°) = ${c} * ${Math.cos(radA).toFixed(4)} ≈ ${b.toFixed(4)}`)
    }
  }

  if (errorMsg) {
    return { error: errorMsg, steps: [], a: 0, b: 0, c: 0, A: 0, B: 0, C: 90, area: 0, perimeter: 0, altitude: 0, radA: 0, radB: 0, radC: 0 }
  }

  // Geometric features
  const area = 0.5 * a * b
  const perimeter = a + b + c
  const altitude = (a * b) / c

  const radA = A * Math.PI / 180
  const radB = B * Math.PI / 180
  const radC = 90 * Math.PI / 180

  steps.push(`\n3. Обчислюємо інші характеристики трикутника:`)
  steps.push(`- Площа: S = (a * b) / 2 = (${a.toFixed(4)} * ${b.toFixed(4)}) / 2 ≈ ${area.toFixed(4)}`)
  steps.push(`- Периметр: P = a + b + c = ${a.toFixed(4)} + ${b.toFixed(4)} + ${c.toFixed(4)} ≈ ${perimeter.toFixed(4)}`)
  steps.push(`- Висота до гіпотенузи: hc = (a * b) / c = (${a.toFixed(4)} * ${b.toFixed(4)}) / ${c.toFixed(4)} ≈ ${altitude.toFixed(4)}`)

  return {
    a,
    b,
    c,
    A,
    B,
    C,
    radA,
    radB,
    radC,
    area,
    perimeter,
    altitude,
    steps,
    error: null
  }
})
</script>

<template lang="pug">
.tool-view
  h2.tool-header Розв'язувач прямокутного трикутника
  p.tool-intro Введіть будь-які два відомі параметри трикутника (довжини сторін або гострі кути), щоб знайти решту елементів та покрокове розв'язання.

  .solver-grid
    //- Inputs Section
    .solver-input-card
      .mode-select-group
        label Оберіть відомі параметри:
        select.mode-dropdown(v-model="selectedMode" @change="handleModeChange")
          option(value="ab") Два катети (a, b)
          option(value="ac") Катет і гіпотенуза (a, c)
          option(value="aA") Катет і протилежний кут (a, A)
          option(value="aB") Катет і прилеглий кут (a, B)
          option(value="cA") Гіпотенуза і гострий кут (c, A)

      .inputs-form
        // Mode: ab
        div(v-if="selectedMode === 'ab'" class="inputs-row")
          .input-group
            label Катет a
            input(type="number" v-model.number="sideA" placeholder="Катет a" step="any" min="0.001")
          .input-group
            label Катет b
            input(type="number" v-model.number="sideB" placeholder="Катет b" step="any" min="0.001")

        // Mode: ac
        div(v-if="selectedMode === 'ac'" class="inputs-row")
          .input-group
            label Катет a
            input(type="number" v-model.number="sideA" placeholder="Катет a" step="any" min="0.001")
          .input-group
            label Гіпотенуза c
            input(type="number" v-model.number="hypotenuseC" placeholder="Гіпотенуза c" step="any" min="0.001")

        // Mode: aA
        div(v-if="selectedMode === 'aA'" class="inputs-row")
          .input-group
            label Катет a
            input(type="number" v-model.number="sideA" placeholder="Катет a" step="any" min="0.001")
          .input-group
            label Протилежний кут A (градуси)
            input(type="number" v-model.number="angleA" placeholder="Кут A (°)" min="0.1" max="89.9" step="any")

        // Mode: aB
        div(v-if="selectedMode === 'aB'" class="inputs-row")
          .input-group
            label Катет a
            input(type="number" v-model.number="sideA" placeholder="Катет a" step="any" min="0.001")
          .input-group
            label Прилеглий кут B (градуси)
            input(type="number" v-model.number="angleB" placeholder="Кут B (°)" min="0.1" max="89.9" step="any")

        // Mode: cA
        div(v-if="selectedMode === 'cA'" class="inputs-row")
          .input-group
            label Гіпотенуза c
            input(type="number" v-model.number="hypotenuseC" placeholder="Гіпотенуза c" step="any" min="0.001")
          .input-group
            label Гострий кут A (градуси)
            input(type="number" v-model.number="angleA" placeholder="Кут A (°)" min="0.1" max="89.9" step="any")

      //- Dynamic Error Message
      .error-box(v-if="solvedTriangle.error")
        p.error-text {{ solvedTriangle.error }}

    //- Visual Triangle Diagram Card
    .diagram-card(v-if="!solvedTriangle.error")
      svg.triangle-svg(viewBox="0 0 280 240")
        // Right Angle Marker (square)
        path(d="M 50 185 L 65 185 L 65 200" fill="none" stroke="var(--color-primary)" stroke-width="1.5" stroke-dasharray="none")
        
        // Triangle shape
        polygon.triangle-shape(points="50,50 250,200 50,200")
        
        // Labels for sides
        // side a (vertical, opposite A, adjacent B)
        text.label-text(x="25" y="130") a
        // side b (horizontal, opposite B, adjacent A)
        text.label-text(x="150" y="222") b
        // side c (hypotenuse)
        text.label-text(x="160" y="110") c

        // Vertices labels
        text.vertex-text(x="45" y="40" font-weight="700") A
        text.vertex-text(x="260" y="205" font-weight="700") B
        text.vertex-text(x="35" y="215" font-weight="700") C

  //- Results Output Block
  .results-block(v-if="!solvedTriangle.error")
    h3.results-title Знайдені значення прямокутного трикутника:

    .results-grid-cards
      .result-info-card
        span.result-label Катет a (вертикальний)
        span.result-val {{ Number(solvedTriangle.a.toFixed(4)) }}
      .result-info-card
        span.result-label Катет b (горизонтальний)
        span.result-val {{ Number(solvedTriangle.b.toFixed(4)) }}
      .result-info-card
        span.result-label Гіпотенуза c
        span.result-val {{ Number(solvedTriangle.c.toFixed(4)) }}
      .result-info-card
        span.result-label Гострий кут A (протилежний a)
        span.result-val {{ Number(solvedTriangle.A.toFixed(2)) }}° #[span.rad-text ({{ Number(solvedTriangle.radA.toFixed(4)) }} рад)]
      .result-info-card
        span.result-label Гострий кут B (прилеглий до a)
        span.result-val {{ Number(solvedTriangle.B.toFixed(2)) }}° #[span.rad-text ({{ Number(solvedTriangle.radB.toFixed(4)) }} рад)]
      .result-info-card
        span.result-label Прямий кут C
        span.result-val 90.00° #[span.rad-text ({{ Number(solvedTriangle.radC.toFixed(4)) }} рад)]
      .result-info-card
        span.result-label Площа S
        span.result-val {{ Number(solvedTriangle.area.toFixed(4)) }}
      .result-info-card
        span.result-label Периметр P
        span.result-val {{ Number(solvedTriangle.perimeter.toFixed(4)) }}
      .result-info-card
        span.result-label Висота hc (до гіпотенузи)
        span.result-val {{ Number(solvedTriangle.altitude.toFixed(4)) }}

    h3.results-title.solution-section Покроковий розв'язок:
    
    .solution-steps
      .step-item(v-for="(step, idx) in solvedTriangle.steps" :key="idx")
        span.step-number {{ idx + 1 }}
        p.step-text {{ step }}
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

.solver-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 24px;
  margin-bottom: 32px;
  align-items: stretch;
}

.solver-input-card {
  background-color: #f8fafc;
  border-radius: var(--radius-md);
  padding: 24px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mode-select-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;

  label {
    font-size: 13px;
    font-weight: 700;
    color: var(--color-text-dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.mode-dropdown {
  padding: 12px;
  border: 1.5px solid #cbd5e1;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-dark);
  background-color: white;
  outline: none;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
}

.inputs-form {
  margin-top: 10px;
}

.inputs-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-muted);
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border: 1.5px solid #cbd5e1;
    border-radius: var(--radius-sm);
    font-size: 16px;
    font-weight: 600;
    transition: all var(--transition-fast);
    outline: none;

    &:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }
}

.error-box {
  margin-top: 16px;
  padding: 12px 16px;
  background-color: #fef2f2;
  border-radius: var(--radius-sm);
  border-left: 4px solid #ef4444;
}

.error-text {
  font-size: 14px;
  color: #991b1b;
  font-weight: 600;
}

.diagram-card {
  background-color: #f8fafc;
  border-radius: var(--radius-md);
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.triangle-svg {
  width: 100%;
  max-width: 240px;
  height: auto;
}

.triangle-shape {
  fill: rgba(37, 99, 235, 0.08);
  stroke: var(--color-primary);
  stroke-width: 2.5;
  stroke-linejoin: round;
}

.label-text {
  font-size: 16px;
  font-style: italic;
  font-family: var(--font-heading);
  fill: var(--color-text-dark);
  font-weight: 700;
}

.vertex-text {
  font-size: 14px;
  font-family: var(--font-heading);
  fill: var(--color-primary-dark);
}

.results-block {
  border-top: 1.5px dashed #cbd5e1;
  padding-top: 32px;
}

.results-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;

  &.solution-section {
    margin-top: 32px;
  }
}

.results-grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.result-info-card {
  background-color: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: var(--radius-sm);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: var(--shadow-sm);

  .result-label {
    font-size: 12px;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  .result-val {
    font-size: 18px;
    font-weight: 800;
    color: var(--color-primary);

    .rad-text {
      font-size: 11px;
      font-weight: 500;
      color: var(--color-text-muted);
      margin-left: 4px;
    }
  }
}

.solution-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background-color: #f8fafc;
  border-radius: var(--radius-sm);
  border-left: 3px solid #cbd5e1;
}

.step-number {
  background-color: #e2e8f0;
  color: var(--color-text-dark);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.step-text {
  font-size: 14px;
  font-family: monospace;
  white-space: pre-wrap;
  color: var(--color-text-dark);
}

@media (max-width: 768px) {
  .solver-grid {
    grid-template-columns: 1fr;
  }

  .diagram-card {
    height: 200px;
  }

  .inputs-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
