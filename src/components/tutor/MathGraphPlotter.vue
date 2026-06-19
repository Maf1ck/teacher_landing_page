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

const presets = [
  { name: 'Лінійна: 2x − 3', expr: '2*x - 3' },
  { name: 'Квадратична: x² − 4', expr: 'x^2 - 4' },
  { name: 'Кубічна: x³ − 3x', expr: 'x^3 - 3*x' },
  { name: 'sin(x)', expr: 'sin(x)' },
  { name: 'cos(2x)', expr: 'cos(2*x)' },
  { name: 'Гіпербола: 1/x', expr: '1 / x' },
  { name: 'Корінь: √x', expr: 'sqrt(x)' },
  { name: 'e^x', expr: 'exp(x)' },
]

const applyPreset = (expr: string) => {
  expression.value = expr
  if (expr.includes('sin') || expr.includes('cos')) {
    xMin.value = -6; xMax.value = 6; yMin.value = -3; yMax.value = 3
  } else if (expr.includes('sqrt')) {
    xMin.value = -2; xMax.value = 10; yMin.value = -2; yMax.value = 6
  } else {
    xMin.value = -10; xMax.value = 10; yMin.value = -10; yMax.value = 10
  }
}

// ── Math parser (no eval) ────────────────────────────────────────
function sanitize(raw: string, xVal: number): string {
  let e = raw.toLowerCase().replace(/\s+/g, '')
  e = e.replace(/(\d)x/g, '$1*x').replace(/(\d)\(/g, '$1*(').replace(/\)(x|\d|\()/g, ')*$1')
  e = e.replace(/\bx\b/g, `(${xVal})`).replace(/\^/g, '**')
  return e
}

function evaluate(expr: string): number {
  let pos = 0
  const peek = () => expr[pos] || ''
  const next = () => expr[pos++] || ''
  const eat = (c: string) => { if (peek() === c) { pos++; return true } return false }

  function parseNum(): number {
    let s = pos
    if (peek() === '-') next()
    while ((peek() >= '0' && peek() <= '9') || peek() === '.') next()
    return parseFloat(expr.substring(s, pos))
  }

  function primary(): number {
    const sub = expr.substring(pos)
    for (const [fn, len, impl] of [
      ['sin(', 4, Math.sin], ['cos(', 4, Math.cos], ['tan(', 4, Math.tan],
      ['sqrt(', 5, Math.sqrt], ['abs(', 4, Math.abs], ['exp(', 4, Math.exp],
    ] as [string, number, (n: number) => number][]) {
      if (sub.startsWith(fn)) { pos += len; const v = addSub(); eat(')'); return impl(v) }
    }
    if (sub.startsWith('ln(') || sub.startsWith('log(')) {
      const ln = sub.startsWith('ln('); pos += ln ? 3 : 4; const v = addSub(); eat(')'); return Math.log(v)
    }
    if (sub.startsWith('pi')) { pos += 2; return Math.PI }
    if (sub.startsWith('e') && (pos >= expr.length - 1 || !/[a-z]/i.test(expr[pos + 1]))) { pos++; return Math.E }
    if ((peek() >= '0' && peek() <= '9') || peek() === '.') return parseNum()
    if (eat('(')) { const v = addSub(); eat(')'); return v }
    if (peek() === '-') { next(); return -primary() }
    if (peek() === '+') { next(); return primary() }
    return 0
  }

  function power(): number {
    let v = primary()
    while (expr.substring(pos).startsWith('**')) { pos += 2; v = Math.pow(v, power()) }
    return v
  }

  function mulDiv(): number {
    let v = power()
    while (true) {
      if (eat('*')) { v *= power() }
      else if (eat('/')) { const d = power(); v = d !== 0 ? v / d : NaN }
      else break
    }
    return v
  }

  function addSub(): number {
    let v = mulDiv()
    while (true) {
      if (eat('+')) { v += mulDiv() }
      else if (eat('-')) { v -= mulDiv() }
      else break
    }
    return v
  }

  expr = expr.replace(/\s+/g, '')
  return addSub()
}

function evalAt(raw: string, x: number): number {
  try { const r = evaluate(sanitize(raw, x)); return isNaN(r) || !isFinite(r) ? NaN : r }
  catch { return NaN }
}

// ── Canvas renderer ─────────────────────────────────────────────
const drawGraph = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const rect = canvas.getBoundingClientRect()
  const W = rect.width, H = rect.height
  const dpr = window.devicePixelRatio || 1
  canvas.width = W * dpr; canvas.height = H * dpr
  ctx.resetTransform(); ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, W, H)

  const x0 = xMin.value, x1 = xMax.value, y0 = yMin.value, y1 = yMax.value
  const xR = x1 - x0, yR = y1 - y0
  const xs = W / xR, ys = H / yR
  const px = (x: number) => (x - x0) * xs
  const py = (y: number) => H - (y - y0) * ys
  const mx = (p: number) => x0 + p / xs

  // Grid
  let xS = 1; if (xR > 20) xS = 2; if (xR > 50) xS = 5; if (xR < 5) xS = 0.5
  let yS = 1; if (yR > 20) yS = 2; if (yR > 50) yS = 5; if (yR < 5) yS = 0.5

  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.fillStyle = '#64748b'; ctx.font = '11px Inter,sans-serif'

  for (let x = Math.ceil(x0 / xS) * xS; x <= x1; x += xS) {
    if (Math.abs(x) < 0.001) continue
    const p = px(x)
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, H); ctx.stroke()
    const yl = Math.max(14, Math.min(H - 4, py(0) + 14))
    ctx.fillText(Number(x.toFixed(2)).toString(), p - 8, yl)
  }
  for (let y = Math.ceil(y0 / yS) * yS; y <= y1; y += yS) {
    if (Math.abs(y) < 0.001) continue
    const p = py(y)
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(W, p); ctx.stroke()
    const xl = Math.max(4, Math.min(W - 28, px(0) - 22))
    ctx.fillText(Number(y.toFixed(2)).toString(), xl, p + 4)
  }

  // Axes
  ctx.strokeStyle = '#334155'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(0, py(0)); ctx.lineTo(W, py(0)); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(px(0), 0); ctx.lineTo(px(0), H); ctx.stroke()
  ctx.font = 'bold 12px Inter,sans-serif'; ctx.fillStyle = '#334155'
  ctx.fillText('x', W - 14, py(0) - 8)
  ctx.fillText('y', px(0) + 10, 14)
  ctx.fillText('0', px(0) - 12, py(0) + 14)

  // Curve
  ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2.5; ctx.beginPath()
  let drawing = false
  for (let p = 0; p <= W; p++) {
    const y = evalAt(expression.value, mx(p))
    if (isNaN(y)) { drawing = false; continue }
    const yp = py(y)
    if (yp < -600 || yp > H + 600) { drawing = false; continue }
    if (!drawing) { ctx.moveTo(p, yp); drawing = true } else ctx.lineTo(p, yp)
  }
  ctx.stroke()

  // Cursor tracker
  if (mousePos.value) {
    const mx2 = mousePos.value.x
    const mathX = mx(mx2)
    const mathY = evalAt(expression.value, mathX)
    if (!isNaN(mathY)) {
      mathMousePos.value = { x: mathX, y: mathY }
      const myp = py(mathY)
      ctx.strokeStyle = 'rgba(239,68,68,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4])
      ctx.beginPath(); ctx.moveTo(mx2, 0); ctx.lineTo(mx2, H); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, myp); ctx.lineTo(W, myp); ctx.stroke()
      ctx.setLineDash([])
      ctx.beginPath(); ctx.arc(mx2, myp, 5, 0, 2 * Math.PI)
      ctx.fillStyle = '#ef4444'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.fill(); ctx.stroke()
    } else {
      mathMousePos.value = null
    }
  } else {
    mathMousePos.value = null
  }
}

const handleMouseMove = (e: MouseEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  mousePos.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  drawGraph()
}
const handleMouseLeave = () => { mousePos.value = null; drawGraph() }

watch([expression, xMin, xMax, yMin, yMax], () => drawGraph())

let ro: ResizeObserver | null = null
onMounted(() => {
  drawGraph()
  if (canvasRef.value) {
    ro = new ResizeObserver(() => drawGraph())
    ro.observe(canvasRef.value)
  }
})
onBeforeUnmount(() => { if (ro && canvasRef.value) ro.unobserve(canvasRef.value) })
</script>

<template lang="pug">
.tool-view
  h2.tool-header Інтерактивний побудовник графіків
  p.tool-intro Введіть формулу нижче або оберіть приклад. Наведіть курсор на графік — побачите точні координати.

  //- ── Canvas at the top, centered, max-width constrained ──────
  .canvas-outer
    .canvas-card
      .canvas-wrapper(
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      )
        canvas.graph-canvas(ref="canvasRef")
        .coord-tooltip(v-if="mathMousePos")
          span.tc x:&nbsp;
          strong {{ mathMousePos.x.toFixed(3) }}
          span.tc &nbsp;·&nbsp; y:&nbsp;
          strong {{ mathMousePos.y.toFixed(3) }}

  //- ── Controls below the canvas ───────────────────────────────
  .controls-row

    //- Expression input
    .ctrl-panel.expr-panel
      p.ctrl-label Формула: y = f(x)
      .input-expr-box
        span.y-pfx y =
        input.expr-input(
          type="text"
          v-model="expression"
          placeholder="напр. x^2 - 4 або sin(x)"
          autocomplete="off"
          spellcheck="false"
        )

    //- View bounds
    .ctrl-panel.bounds-panel
      p.ctrl-label Межі перегляду
      .bounds-row
        .bi
          label x min
          input(type="number" v-model.number="xMin" step="any")
        .bi
          label x max
          input(type="number" v-model.number="xMax" step="any")
        .bi
          label y min
          input(type="number" v-model.number="yMin" step="any")
        .bi
          label y max
          input(type="number" v-model.number="yMax" step="any")

  //- Presets
  .presets-area
    p.ctrl-label Навчальні приклади:
    .presets-chips
      button.chip(
        v-for="p in presets"
        :key="p.expr"
        :class="{ active: expression === p.expr }"
        @click="applyPreset(p.expr)"
      ) {{ p.name }}

  //- Handbook
  .handbook-row
    span.hb-title Синтаксис:
    span Оператори: + − * / ^ &nbsp;·&nbsp; Функції: sin cos tan sqrt abs exp ln &nbsp;·&nbsp; Константи: pi  e &nbsp;·&nbsp; Приклад: 2*x^2 - sin(x) + pi
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
  margin-bottom: 24px;
  line-height: 1.5;
}

// Ensure the root wrapper never overflows parent
.tool-view {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

// ── Canvas ─────────────────────────────────────────────────────
.canvas-outer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.canvas-card {
  width: 100%;
  max-width: 780px;
  height: 420px;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.canvas-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fafafa;
  cursor: crosshair;
}
.graph-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.coord-tooltip {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(15, 23, 42, 0.85);
  color: white;
  border-radius: var(--radius-sm);
  padding: 6px 12px;
  font-size: 13px;
  font-family: monospace;
  display: flex;
  align-items: center;
  gap: 2px;
  backdrop-filter: blur(4px);
  pointer-events: none;
  strong { color: #38bdf8; }
  .tc { color: #94a3b8; }
}

// ── Controls row ───────────────────────────────────────────────
.controls-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: flex-start;
  width: 100%;
}
.ctrl-panel {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 16px 20px;
  min-width: 0;
}
.ctrl-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-muted);
  margin: 0 0 10px;
}
.expr-panel {
  flex: 1;
  min-width: 0;
}
.input-expr-box {
  display: flex;
  align-items: center;
  border: 1.5px solid #cbd5e1;
  border-radius: var(--radius-sm);
  background: white;
  padding: 0 12px;
  &:focus-within { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
}
.y-pfx {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-right: 8px;
  user-select: none;
}
.expr-input {
  flex: 1;
  border: none;
  padding: 12px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-dark);
  outline: none;
  min-width: 0;
  width: 100%;
}
.bounds-panel {
  flex: 0 0 auto;
}
.bounds-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.bi {
  display: flex;
  flex-direction: column;
  gap: 4px;
  label { font-size: 11px; font-weight: 600; color: var(--color-text-muted); }
  input {
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    border: 1.5px solid #cbd5e1;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    outline: none;
    &:focus { border-color: var(--color-primary); }
  }
}

// ── Presets ────────────────────────────────────────────────────
.presets-area {
  margin-bottom: 16px;
}
.presets-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  padding: 7px 14px;
  border: 1.5px solid #cbd5e1;
  border-radius: 999px;
  background: white;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-dark);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  &:hover { border-color: var(--color-primary); color: var(--color-primary); }
  &.active { background: var(--color-primary); border-color: var(--color-primary); color: white; }
}

// ── Handbook ───────────────────────────────────────────────────
.handbook-row {
  background: #eff6ff;
  border: 1.5px solid #dbeafe;
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  font-size: 12.5px;
  color: #1e40af;
  line-height: 1.6;
  .hb-title { font-weight: 700; margin-right: 6px; }
}

// ── Responsive ────────────────────────────────────────────────
@media (max-width: 900px) {
  .canvas-card {
    height: 340px;
    max-width: 100%; // full width on tablet
  }
  .controls-row {
    flex-direction: column;
  }
  .bounds-panel {
    flex: 1 1 auto;
    width: 100%;
  }
  .bounds-row {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
}

@media (max-width: 600px) {
  .canvas-card {
    height: 260px;
    max-width: 100%;
    border-radius: var(--radius-sm);
  }
  .ctrl-panel {
    width: 100%;
    box-sizing: border-box;
  }
  .bounds-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  .chip {
    font-size: 12px;
    padding: 6px 11px;
  }
  .handbook-row {
    font-size: 11.5px;
  }
}
</style>
