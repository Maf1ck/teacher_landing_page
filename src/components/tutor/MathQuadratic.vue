<script setup lang="ts">
import { ref, computed } from 'vue'

const quadA = ref<number>(1)
const quadB = ref<number>(-5)
const quadC = ref<number>(6)

const formattedEquation = computed(() => {
  let parts: string[] = []
  
  // Term a
  if (quadA.value !== 0) {
    if (quadA.value === 1) parts.push('x²')
    else if (quadA.value === -1) parts.push('-x²')
    else parts.push(`${quadA.value}x²`)
  }
  
  // Term b
  if (quadB.value !== 0) {
    const absB = Math.abs(quadB.value)
    const sign = quadB.value > 0 ? '+' : '-'
    const coeff = absB === 1 ? '' : absB
    parts.push(`${sign} ${coeff}x`)
  }
  
  // Term c
  if (quadC.value !== 0) {
    const absC = Math.abs(quadC.value)
    const sign = quadC.value > 0 ? '+' : '-'
    parts.push(`${sign} ${absC}`)
  }
  
  if (parts.length === 0) {
    return '0 = 0'
  }
  
  let eqStr = parts.join(' ')
  
  // Clean up starting sign spaces
  if (eqStr.startsWith('+ ')) {
    eqStr = eqStr.substring(2)
  }
  if (eqStr.startsWith('- ')) {
    eqStr = '-' + eqStr.substring(2)
  }
  
  return eqStr + ' = 0'
})

const quadResult = computed(() => {
  const a = quadA.value
  const b = quadB.value
  const c = quadC.value

  if (a === 0) {
    if (b === 0) {
      return {
        type: 'invalid',
        message: c === 0 ? 'Рівняння має безліч розв\'язків (0 = 0)' : 'Рівняння не має розв\'язків (неправильна рівність)'
      }
    }
    const x = -c / b
    return {
      type: 'linear',
      formula: `${b}x ${c >= 0 ? '+' : ''} ${c} = 0`,
      steps: [
        `Це лінійне рівняння: ${b}x = ${-c}`,
        `x = ${-c} / ${b}`,
        `x = ${Number(x.toFixed(4))}`
      ],
      roots: [x]
    }
  }

  const d = b * b - 4 * a * c
  
  const steps = [
    `Формула дискримінанта: D = b² - 4ac`,
    `D = (${b})² - 4 * (${a}) * (${c})`,
    `D = ${b*b} - ${4*a*c}`,
    `D = ${d}`
  ]

  if (d < 0) {
    return {
      type: 'no-roots',
      d,
      steps: [...steps, 'Оскільки D < 0, рівняння не має дійсних коренів.']
    }
  } else if (d === 0) {
    const x = -b / (2 * a)
    return {
      type: 'one-root',
      d,
      steps: [
        ...steps,
        `D = 0, тому рівняння має один корінь:`,
        `x = -b / (2a)`,
        `x = -(${b}) / (2 * ${a})`,
        `x = ${-b} / ${2*a}`,
        `x = ${Number(x.toFixed(4))}`
      ],
      roots: [x]
    }
  } else {
    const sqrtD = Math.sqrt(d)
    const x1 = (-b - sqrtD) / (2 * a)
    const x2 = (-b + sqrtD) / (2 * a)
    return {
      type: 'two-roots',
      d,
      sqrtD,
      steps: [
        ...steps,
        `D > 0, тому рівняння має два корені:`,
        `x = (-b ± √D) / (2a)`,
        'x₁ = (-(' + b + ') - ' + Number(sqrtD.toFixed(4)) + ') / (2 * ' + a + ') = ' + (-b - sqrtD) + ' / ' + (2 * a) + ' = ' + Number(x1.toFixed(4)),
        'x₂ = (-(' + b + ') + ' + Number(sqrtD.toFixed(4)) + ') / (2 * ' + a + ') = ' + (-b + sqrtD) + ' / ' + (2 * a) + ' = ' + Number(x2.toFixed(4))
      ],
      roots: [x1, x2]
    }
  }
})
</script>

<template lang="pug">
.tool-view
  h2.tool-header Розв'язувач квадратних рівнянь
  p.tool-intro Введіть коефіцієнти для рівняння ax² + bx + c = 0. Наш калькулятор знайде дискримінант та покаже покрокове розв'язання.
  
  .solver-input-card
    .equation-formula-display
      span.equation-display-text {{ formattedEquation }}
    
    .coeff-inputs-row
      .input-group
        label Коефіцієнт a (при x²)
        input(type="number" v-model.number="quadA" placeholder="a")
      .input-group
        label Коефіцієнт b (при x)
        input(type="number" v-model.number="quadB" placeholder="b")
      .input-group
        label Коефіцієнт c (вільний член)
        input(type="number" v-model.number="quadC" placeholder="c")

  .results-block
    h3.results-title Покроковий розв'язок:
    
    .solution-steps
      .step-item(v-for="(step, idx) in quadResult.steps" :key="idx")
        span.step-number {{ idx + 1 }}
        p.step-text {{ step }}

    .roots-summary-box(:class="quadResult.type")
      h4.roots-title Кінцевий результат:
      
      div(v-if="quadResult.type === 'two-roots'")
        p.roots-count.success-roots Рівняння має два дійсні корені:
        .roots-values
          .root-pill
            span x₁ = 
            strong {{ Number(quadResult.roots[0].toFixed(4)) }}
          .root-pill
            span x₂ = 
            strong {{ Number(quadResult.roots[1].toFixed(4)) }}
      
      div(v-else-if="quadResult.type === 'one-root'")
        p.roots-count.success-roots Рівняння має один корінь:
        .roots-values
          .root-pill
            span x = 
            strong {{ Number(quadResult.roots[0].toFixed(4)) }}
      
      div(v-else-if="quadResult.type === 'no-roots'")
        p.roots-count.error-roots Дійсних коренів немає, оскільки дискримінант від'ємний.
      
      div(v-else-if="quadResult.type === 'linear'")
        p.roots-count Лінійне рівняння має один корінь:
        .roots-values
          .root-pill
            span x = 
            strong {{ Number(quadResult.roots[0].toFixed(4)) }}
      
      div(v-else-if="quadResult.type === 'invalid'")
        p.roots-count {{ quadResult.message }}
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

.solver-input-card {
  background-color: #f8fafc;
  border-radius: var(--radius-md);
  padding: 24px;
  border: 1px solid #e2e8f0;
  margin-bottom: 32px;
}

.equation-formula-display {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: 24px;
  letter-spacing: 0.5px;
  min-height: 48px;
}

.coeff-inputs-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
    text-transform: uppercase;
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

.results-block {
  border-top: 1.5px dashed #cbd5e1;
  padding-top: 32px;
}

.results-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
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

.roots-summary-box {
  background-color: var(--color-primary-light);
  border-radius: var(--radius-md);
  padding: 24px;
  border: 1.5px solid rgba(37, 99, 235, 0.2);

  .roots-title {
    font-size: 16px;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .roots-count {
    font-size: 15px;
    margin-bottom: 12px;
  }

  .success-roots {
    color: #15803d;
    font-weight: 600;
  }

  .error-roots {
    color: #ef4444;
    font-weight: 600;
  }

  .roots-values {
    display: flex;
    gap: 16px;
  }

  .root-pill {
    background-color: white;
    padding: 10px 20px;
    border-radius: var(--radius-sm);
    font-size: 16px;
    border: 1px solid rgba(37, 99, 235, 0.15);
    box-shadow: var(--shadow-sm);

    strong {
      color: var(--color-primary);
      font-size: 18px;
    }
  }

  &.no-roots {
    background-color: #fef2f2;
    border-color: #fca5a5;
    
    .roots-title {
      color: #991b1b;
    }
  }
}
@media (max-width: 768px) {
  .coeff-inputs-row {
    gap: 8px;
  }

  .input-group {
    label {
      font-size: 10px;
      white-space: normal;
      line-height: 1.3;
    }
  }
}
</style>
