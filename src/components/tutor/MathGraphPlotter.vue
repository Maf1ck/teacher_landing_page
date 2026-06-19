<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'

const expression = ref('x^2 - 4')
const xMin = ref(-10)
const xMax = ref(10)
const yMin = ref(-10)
const yMax = ref(10)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const mousePos = ref<{ x: number; y: number } | null>(null)
const mathMousePos = ref<{ x: number; y: number } | null>(null)

// Standard presets for learning function types
const presets = [
  { name: 'Лінійна: y = 2x - 3', expr: '2*x - 3' },
  { name: 'Квадратична: y = x² - 4', expr: 'x^2 - 4' },
  { name: 'Кубічна: y = x³ - 3x', expr: 'x^3 - 3*x' },
  { name: 'Синусоїда: y = sin(x)', expr: 'sin(x)' },
  { name: 'Косинусоїда: y = cos(2x)', expr: 'cos(2*x)' },
  { name: 'Гіпербола: y = 1 / x', expr: '1 / x' },
  { name: 'Корінь: y = √x', expr: 'sqrt(x)' },
  { name: 'Експонента: y = e^x', expr: 'exp(x)' }
]

const applyPreset = (expr: string) => {
  expression.value = expr
  // Adjust bounds for sensible viewing
  if (expr.includes('sin') || expr.includes('cos')) {
    xMin.value = -6
    xMax.value = 6
    yMin.value = -3
    yMax.value = 3
  } else if (expr.includes('sqrt')) {
    xMin.value = -2
    xMax.value = 10
    yMin.value = -2
    yMax.value = 6
  } else {
    xMin.value = -10
    xMax.value = 10
    yMin.value = -10
    yMax.value = 10
  }
}

// -------------------------------------------------------------
// MATH PARSER ENGINE (Local, Safe, No eval)
// -------------------------------------------------------------
function sanitizeExpression(rawExpr: string, xVal: number): string {
  let expr = rawExpr.toLowerCase().replace(/\s+/g, '')

  // Insert implicit multiplication: e.g. 2x -> 2*x
  expr = expr
    .replace(/(\d)x/g, '$1*x')
    .replace(/(\d)\(/g, '$1*(')
    .replace(/\)(x|\d|\()/g, ')*$1')

  // Replace variable x with the numeric value (inside parentheses to prevent operator confusion)
  expr = expr.replace(/\bx\b/g, `(${xVal})`)

  // Convert ^ to JS power **
  expr = expr.replace(/\^/g, '**')

  return expr
}

function parseAndEvaluate(expr: string): number {
  let pos = 0

  function peek() {
    return expr[pos] || ''
  }

  function next() {
    return expr[pos++] || ''
  }

  function consume(expected: string) {
    if (peek() === expected) {
      pos++
      return true
    }
    return false
  }

  function parseNumber(): number {
    let start = pos
    if (peek() === '-') {
      next()
    }
    while ((peek() >= '0' && peek() <= '9') || peek() === '.') {
      next()
    }
    return parseFloat(expr.substring(start, pos))
  }

  function parsePrimary(): number {
    let char = peek()
    if ((char >= '0' && char <= '9') || char === '.') {
      return parseNumber()
    }

    const sub = expr.substring(pos)
    if (sub.startsWith('sin(')) {
      pos += 4
      let val = parseExpression()
      consume(')')
      return Math.sin(val)
    }
    if (sub.startsWith('cos(')) {
      pos += 4
      let val = parseExpression()
      consume(')')
      return Math.cos(val)
    }
    if (sub.startsWith('tan(')) {
      pos += 4
      let val = parseExpression()
      consume(')')
      return Math.tan(val)
    }
    if (sub.startsWith('sqrt(')) {
      pos += 5
      let val = parseExpression()
      consume(')')
      return Math.sqrt(val)
    }
    if (sub.startsWith('abs(')) {
      pos += 4
      let val = parseExpression()
      consume(')')
      return Math.abs(val)
    }
    if (sub.startsWith('exp(')) {
      pos += 4
      let val = parseExpression()
      consume(')')
      return Math.exp(val)
    }
    if (sub.startsWith('ln(') || sub.startsWith('log(')) {
      const isLn = sub.startsWith('ln(')
      pos += isLn ? 3 : 4
      let val = parseExpression()
      consume(')')
      return Math.log(val)
    }
    if (sub.startsWith('pi')) {
      pos += 2
      return Math.PI
    }
    if (sub.startsWith('e') && (pos === expr.length - 1 || !/[a-z]/i.test(expr[pos + 1]))) {
      pos += 1
      return Math.E
    }

    if (consume('(')) {
      let val = parseExpression()
      consume(')')
      return val
    }

    if (peek() === '-') {
      next()
      return -parsePrimary()
    }
    if (peek() === '+') {
      next()
      return parsePrimary()
    }
    return 0
  }

  function parsePower(): number {
    let val = parsePrimary()
    while (expr.substring(pos).startsWith('**')) {
      pos += 2
      let exponent = parsePower()
      val = Math.pow(val, exponent)
    }
    return val
  }

  function parseMulDiv(): number {
    let val = parsePower()
    while (true) {
      if (consume('*')) {
        val *= parsePower()
      } else if (consume('/')) {
        let divisor = parsePower()
        val = divisor !== 0 ? val / divisor : NaN
      } else {
        break
      }
    }
    return val
  }

  function parseExpression(): number {
    let val = parseMulDiv()
    while (true) {
      if (consume('+')) {
        val += parseMulDiv()
      } else if (consume('-')) {
        val -= parseMulDiv()
      } else {
        break
      }
    }
    return val
  }

  expr = expr.replace(/\s+/g, '')
  return parseExpression()
}

function evaluateFunctionAt(rawExpr: string, xVal: number): number {
  try {
    const sanitized = sanitizeExpression(rawExpr, xVal)
    const result = parseAndEvaluate(sanitized)
    return isNaN(result) || !isFinite(result) ? NaN : result
  } catch (err) {
    return NaN
  }
}

// -------------------------------------------------------------
// CANVAS PLOTTER DRAWING ENGINE
// -------------------------------------------------------------
const drawGraph = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // DPI adjustments for crisp canvas displays
  const rect = canvas.getBoundingClientRect()
  const width = rect.width
  const height = rect.height
  const dpr = window.devicePixelRatio || 1
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.resetTransform()
  ctx.scale(dpr, dpr)

  // Clear Canvas
  ctx.clearRect(0, 0, width, height)

  // Compute view bounds
  const xMinVal = xMin.value
  const xMaxVal = xMax.value
  const yMinVal = yMin.value
  const yMaxVal = yMax.value

  const xRange = xMaxVal - xMinVal
  const yRange = yMaxVal - yMinVal

  // Scale multipliers (math units to pixels)
  const xScale = width / xRange
  const yScale = height / yRange

  // Helper functions: math coords to canvas pixels
  const toPixelX = (x: number) => (x - xMinVal) * xScale
  const toPixelY = (y: number) => height - (y - yMinVal) * yScale

  // Helper functions: canvas pixels to math coords
  const toMathX = (px: number) => xMinVal + px / xScale
  const toMathY = (py: number) => yMinVal + (height - py) / yScale

  // Draw Grid Lines & Numbers
  ctx.lineWidth = 1
  ctx.strokeStyle = '#e2e8f0' // Light grey grid
  ctx.fillStyle = '#64748b' // Slate tick text
  ctx.font = '11px Inter, sans-serif'

  // Pick reasonable spacing based on limits
  let xStep = 1
  if (xRange > 20) xStep = 2
  if (xRange > 50) xStep = 5
  if (xRange < 5) xStep = 0.5

  let yStep = 1
  if (yRange > 20) yStep = 2
  if (yRange > 50) yStep = 5
  if (yRange < 5) yStep = 0.5

  // X grid lines & ticks
  const firstGridX = Math.ceil(xMinVal / xStep) * xStep
  const lastGridX = Math.floor(xMaxVal / xStep) * xStep
  for (let x = firstGridX; x <= lastGridX; x += xStep) {
    if (Math.abs(x) < 0.0001) continue // Skip origin axis line
    const px = toPixelX(x)
    
    // Grid line
    ctx.beginPath()
    ctx.moveTo(px, 0)
    ctx.lineTo(px, height)
    ctx.stroke()

    // Tick Label
    const pyAxis = toPixelY(0)
    const labelY = Math.max(15, Math.min(height - 5, pyAxis + 15))
    ctx.fillText(Number(x.toFixed(2)).toString(), px - 8, labelY)
  }

  // Y grid lines & ticks
  const firstGridY = Math.ceil(yMinVal / yStep) * yStep
  const lastGridY = Math.floor(yMaxVal / yStep) * yStep
  for (let y = firstGridY; y <= lastGridY; y += yStep) {
    if (Math.abs(y) < 0.0001) continue // Skip origin axis line
    const py = toPixelY(y)

    // Grid line
    ctx.beginPath()
    ctx.moveTo(0, py)
    ctx.lineTo(width, py)
    ctx.stroke()

    // Tick Label
    const pxAxis = toPixelX(0)
    const labelX = Math.max(5, Math.min(width - 25, pxAxis - 20))
    ctx.fillText(Number(y.toFixed(2)).toString(), labelX, py + 4)
  }

  // Draw X & Y Axes
  ctx.lineWidth = 2
  ctx.strokeStyle = '#334155' // Dark slate axes

  const pyZero = toPixelY(0)
  const pxZero = toPixelX(0)

  // X Axis
  ctx.beginPath()
  ctx.moveTo(0, pyZero)
  ctx.lineTo(width, pyZero)
  ctx.stroke()

  // Y Axis
  ctx.beginPath()
  ctx.moveTo(pxZero, 0)
  ctx.lineTo(pxZero, height)
  ctx.stroke()

  // Labels for axes
  ctx.font = 'bold 12px Inter, sans-serif'
  ctx.fillText('x', width - 15, pyZero - 8)
  ctx.fillText('y', pxZero + 10, 15)

  // Draw Origin O
  ctx.fillText('0', pxZero - 12, pyZero + 14)

  // Draw Function Line
  ctx.lineWidth = 3
  ctx.strokeStyle = 'var(--color-primary, #2563eb)' // Nice vibrant blue
  ctx.beginPath()

  let drawing = false
  const pointsCount = width
  for (let px = 0; px <= pointsCount; px++) {
    const x = toMathX(px)
    const y = evaluateFunctionAt(expression.value, x)

    if (isNaN(y)) {
      drawing = false
      continue
    }

    const py = toPixelY(y)

    // Break line drawing for extremely steep transitions/asymptotes (e.g. 1/x)
    if (py < -500 || py > height + 500) {
      drawing = false
      continue
    }

    if (!drawing) {
      ctx.moveTo(px, py)
      drawing = true
    } else {
      ctx.lineTo(px, py)
    }
  }
  ctx.stroke()

  // Draw Interactive Cursor Tooltip & Crosshairs
  if (mousePos.value) {
    const mx = mousePos.value.x
    const mathX = toMathX(mx)
    const mathY = evaluateFunctionAt(expression.value, mathX)

    if (!isNaN(mathY)) {
      const my = toPixelY(mathY)

      // Set mathMousePos for rendering values reactively outside canvas
      mathMousePos.value = { x: mathX, y: mathY }

      // Crosshairs
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)' // Light red dashed crosshairs
      ctx.setLineDash([4, 4])

      // vertical dashed line
      ctx.beginPath()
      ctx.moveTo(mx, 0)
      ctx.lineTo(mx, height)
      ctx.stroke()

      // horizontal dashed line
      ctx.beginPath()
      ctx.moveTo(0, my)
      ctx.lineTo(width, my)
      ctx.stroke()

      ctx.setLineDash([]) // Reset dash

      // Dot on the graph
      ctx.beginPath()
      ctx.arc(mx, my, 6, 0, 2 * Math.PI)
      ctx.fillStyle = '#ef4444' // Vibrant red highlight dot
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.fill()
      ctx.stroke()
    } else {
      mathMousePos.value = null
    }
  } else {
    mathMousePos.value = null
  }
}

// Coordinate tracking on mouse move
const handleMouseMove = (e: MouseEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  mousePos.value = { x, y }
  drawGraph()
}

const handleMouseLeave = () => {
  mousePos.value = null
  drawGraph()
}

// Redraw when expressions, dimensions, or inputs change
watch([expression, xMin, xMax, yMin, yMax], () => {
  drawGraph()
})

// Trigger on load & handle resize
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  drawGraph()
  if (canvasRef.value) {
    resizeObserver = new ResizeObserver(() => {
      drawGraph()
    })
    resizeObserver.observe(canvasRef.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver && canvasRef.value) {
    resizeObserver.unobserve(canvasRef.value)
  }
})
</script>

<template lang="pug">
.tool-view
  h2.tool-header Інтерактивний побудовник графіків
  p.tool-intro Введіть формулу функції або оберіть готовий приклад нижче. Наведіть курсор на графік, щоб побачити точні координати точок.

  .graph-editor-grid
    //- Controls Card
    .controls-card
      .input-group
        label Формула функції: y = f(x)
        .input-expr-box
          span.y-prefix y =
          input.expr-input(
            type="text"
            v-model="expression"
            placeholder="напр. x^2 - 4 або sin(x)"
          )

      //- Preset options grid
      .presets-section
        h4.section-title Навчальні приклади:
        .presets-grid
          button.preset-btn(
            v-for="p in presets"
            :key="p.name"
            :class="{ active: expression === p.expr }"
            @click="applyPreset(p.expr)"
          ) {{ p.name }}

      //- Grid bounds controls
      .bounds-section
        h4.section-title Границі графіка:
        .bounds-grid
          .bound-item
            label x min
            input(type="number" v-model.number="xMin" step="any")
          .bound-item
            label x max
            input(type="number" v-model.number="xMax" step="any")
          .bound-item
            label y min
            input(type="number" v-model.number="yMin" step="any")
          .bound-item
            label y max
            input(type="number" v-model.number="yMax" step="any")

      //- Math rules handbook
      .handbook-card
        span.handbook-title Довідка:
        ul.handbook-list
          <li>Математичні оператори: <strong>+</strong>, <strong>-</strong>, <strong>*</strong>, <strong>/</strong>, <strong>^</strong> (степінь)</li>
          <li>Константи: <strong>pi</strong> (≈ 3.1415), <strong>e</strong> (≈ 2.718)</li>
          <li>Функції: <strong>sin(x)</strong>, <strong>cos(x)</strong>, <strong>tan(x)</strong>, <strong>sqrt(x)</strong> (корінь), <strong>abs(x)</strong> (модуль)</li>
          <li>Для коефіцієнтів пишіть знак множення, наприклад: <strong>2*x</strong> замість <strong>2x</strong></li>

    //- Plotter Canvas Card
    .canvas-card
      .canvas-wrapper(
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      )
        canvas.graph-canvas(ref="canvasRef")
        
        //- Tooltip for coordinates overlay
        .coord-tooltip(v-if="mathMousePos")
          span.tooltip-coord x: <strong>{{ mathMousePos.x.toFixed(2) }}</strong>
          span.tooltip-coord y: <strong>{{ mathMousePos.y.toFixed(2) }}</strong>
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

.graph-editor-grid {
  display: grid;
  grid-template-columns: 1.1fr 1.9fr;
  gap: 24px;
  margin-bottom: 32px;
  align-items: stretch;
}

.controls-card {
  background-color: #f8fafc;
  border-radius: var(--radius-md);
  padding: 24px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 13px;
    font-weight: 700;
    color: var(--color-text-dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.input-expr-box {
  display: flex;
  align-items: center;
  border: 1.5px solid #cbd5e1;
  border-radius: var(--radius-sm);
  background-color: white;
  padding: 0 12px;
  transition: all var(--transition-fast);

  &:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .y-prefix {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-dark);
    margin-right: 8px;
    user-select: none;
  }
}

.expr-input {
  width: 100%;
  border: none;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-dark);
  outline: none;
}

.section-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 10px 0;
}

.presets-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
}

.preset-btn {
  text-align: left;
  padding: 8px 12px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: var(--radius-xs);
  background-color: white;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-dark);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: rgba(37, 99, 235, 0.04);
    border-color: var(--color-primary);
  }

  &.active {
    background-color: var(--color-primary-light);
    color: var(--color-primary-dark);
    border-color: var(--color-primary);
  }
}

.bounds-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.bound-item {
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-muted);
  }

  input {
    padding: 8px;
    border: 1.5px solid #cbd5e1;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 600;
    outline: none;
    text-align: center;
    background-color: white;

    &:focus {
      border-color: var(--color-primary);
    }
  }
}

.handbook-card {
  background-color: #eff6ff;
  border: 1.5px solid #dbeafe;
  border-radius: var(--radius-sm);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .handbook-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--color-primary-dark);
    text-transform: uppercase;
  }

  .handbook-list {
    margin: 0;
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    li {
      font-size: 12px;
      color: #1e3a8a;
      line-height: 1.4;

      strong {
        background-color: rgba(37, 99, 235, 0.08);
        padding: 1px 4px;
        border-radius: 3px;
        font-family: monospace;
      }
    }
  }
}

.canvas-card {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 12px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  min-height: 480px;
}

.canvas-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  background-color: #fafafa;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: crosshair;
}

.graph-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.coord-tooltip {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(15, 23, 42, 0.85);
  color: white;
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: var(--shadow-md);
  pointer-events: none;
  backdrop-filter: blur(4px);

  .tooltip-coord {
    font-family: monospace;

    strong {
      color: #38bdf8;
    }
  }
}

@media (max-width: 992px) {
  .graph-editor-grid {
    grid-template-columns: 1fr;
  }

  .canvas-card {
    min-height: 400px;
  }
}
</style>
