<script setup lang="ts">
import { ref, computed } from 'vue'

interface TrigAngle {
  deg: number
  radStr: string
  radVal: number
  sinStr: string
  cosStr: string
  tanStr: string
  cotStr: string
}

const trigAngles: TrigAngle[] = [
  { deg: 0, radStr: '0', radVal: 0, sinStr: '0', cosStr: '1', tanStr: '0', cotStr: 'не існує' },
  { deg: 30, radStr: 'π/6', radVal: Math.PI / 6, sinStr: '1/2', cosStr: '√3/2', tanStr: '√3/3', cotStr: '√3' },
  { deg: 45, radStr: 'π/4', radVal: Math.PI / 4, sinStr: '√2/2', cosStr: '√2/2', tanStr: '1', cotStr: '1' },
  { deg: 60, radStr: 'π/3', radVal: Math.PI / 3, sinStr: '√3/2', cosStr: '1/2', tanStr: '√3', cotStr: '√3/3' },
  { deg: 90, radStr: 'π/2', radVal: Math.PI / 2, sinStr: '1', cosStr: '0', tanStr: 'не існує', cotStr: '0' },
  { deg: 120, radStr: '2π/3', radVal: (2 * Math.PI) / 3, sinStr: '√3/2', cosStr: '-1/2', tanStr: '-√3', cotStr: '-√3/3' },
  { deg: 135, radStr: '3π/4', radVal: (3 * Math.PI) / 4, sinStr: '√2/2', cosStr: '-√2/2', tanStr: '-1', cotStr: '-1' },
  { deg: 150, radStr: '5π/6', radVal: (5 * Math.PI) / 6, sinStr: '1/2', cosStr: '-√3/2', tanStr: '-√3/3', cotStr: '-√3' },
  { deg: 180, radStr: 'π', radVal: Math.PI, sinStr: '0', cosStr: '-1', tanStr: '0', cotStr: 'не існує' },
  { deg: 270, radStr: '3π/2', radVal: (3 * Math.PI) / 2, sinStr: '-1', cosStr: '0', tanStr: 'не існує', cotStr: '0' },
  { deg: 360, radStr: '2π', radVal: 2 * Math.PI, sinStr: '0', cosStr: '1', tanStr: '0', cotStr: 'не існує' }
]

const selectedTrigIndex = ref<number>(1) // Default to 30 deg
const currentTrig = computed(() => trigAngles[selectedTrigIndex.value])

// Interactive SVG calculations
const svgCenter = 120
const svgRadius = 80
const svgPoint = computed(() => {
  const angle = currentTrig.value.radVal
  const x = svgCenter + svgRadius * Math.cos(angle)
  const y = svgCenter - svgRadius * Math.sin(angle) // SVG Y axis goes downwards
  return { x, y }
})
</script>

<template lang="pug">
.tool-view
  h2.tool-header Тригонометричне коло
  p.tool-intro Оберіть кут у градусах або радіанах, щоб побачити його положення на одиничному колі та точні тригонометричні значення.
  
  .trig-layout
    //- Circle Canvas
    .trig-visual-card
      svg.unit-circle-svg(viewBox="0 0 240 240")
        //- Coordinate Grid Axes
        line(x1="10" y1="120" x2="230" y2="120" stroke="#94a3b8" stroke-width="1.5")
        line(x1="120" y1="10" x2="120" y2="230" stroke="#94a3b8" stroke-width="1.5")
        
        //- Arrows
        polygon(points="230,117 236,120 230,123" fill="#94a3b8")
        polygon(points="117,10 120,4 123,10" fill="#94a3b8")
        
        //- Labels x, y
        text(x="228" y="135" fill="#64748b" font-size="12" font-family="sans-serif") cos(x)
        text(x="130" y="16" fill="#64748b" font-size="12" font-family="sans-serif") sin(x)
        
        //- Unit Circle
        circle(cx="120" cy="120" r="80" stroke="#cbd5e1" stroke-width="2" fill="none")
        
        //- Projections (Dashed)
        line(:x1="svgPoint.x" :y1="svgPoint.y" :x2="svgPoint.x" y2="120" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3,3")
        line(:x1="svgPoint.x" :y1="svgPoint.y" x1="120" :y2="svgPoint.y" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3")
        
        //- Radius Vector
        line(x1="120" y1="120" :x2="svgPoint.x" :y2="svgPoint.y" stroke="#2563eb" stroke-width="2.5")
        
        //- Center Origin
        circle(cx="120" cy="120" r="3.5" fill="#475569")
        
        //- Intersection Dot
        circle(:cx="svgPoint.x" :cy="svgPoint.y" r="6" fill="#2563eb" stroke="#ffffff" stroke-width="1.5")
        
        //- Grid ticks
        text(x="202" y="115" fill="#94a3b8" font-size="10") 1
        text(x="32" y="115" fill="#94a3b8" font-size="10") -1
        text(x="125" y="44" fill="#94a3b8" font-size="10") 1
        text(x="125" y="204" fill="#94a3b8" font-size="10") -1

      .angle-picker-wrap
        h4 Оберіть кут кута:
        .angle-buttons-list
          button.angle-btn(
            v-for="(ang, index) in trigAngles"
            :key="ang.deg"
            :class="{ active: selectedTrigIndex === index }"
            @click="selectedTrigIndex = index"
          ) {{ ang.deg }}° ({{ ang.radStr }})

    //- Calculations Table
    .trig-values-card
      h3 Значення для кута #[span.angle-highlight {{ currentTrig.deg }}° ({{ currentTrig.radStr }})]
      
      .trig-value-rows
        .val-row
          span.trig-fn-name Синус (sin α)
          span.trig-fn-val.val-sin {{ currentTrig.sinStr }}
        
        .val-row
          span.trig-fn-name Косинус (cos α)
          span.trig-fn-val.val-cos {{ currentTrig.cosStr }}
        
        .val-row
          span.trig-fn-name Тангенс (tg α)
          span.trig-fn-val.val-tg {{ currentTrig.tanStr }}
        
        .val-row
          span.trig-fn-name Котангенс (ctg α)
          span.trig-fn-val.val-ctg {{ currentTrig.cotStr }}

      .trig-info-box
        p В прямокутному трикутнику:
        ul
          li #[strong Синус] — відношення протилежного катета до гіпотенузи.
          li #[strong Косинус] — відношення прилеглого катета до гіпотенузи.
          li #[strong Тангенс] — відношення протилежного катета до прилеглого.
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

.tool-view {
  container-type: inline-size;
}

.trig-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: start;
  width: 100%;
  min-width: 0;
}

.trig-visual-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.unit-circle-svg {
  width: 100%;
  max-width: 240px;
  height: auto;
  aspect-ratio: 1 / 1;
  background-color: white;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  border: 1px solid #f1f5f9;
}

.angle-picker-wrap {
  width: 100%;

  h4 {
    font-size: 14px;
    margin-bottom: 12px;
    color: var(--color-text-muted);
    text-align: center;
  }
}

.angle-buttons-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
}

.angle-btn {
  width: 100%;
  padding: 8px 6px;
  background-color: white;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-sizing: border-box;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  &.active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }
}

.trig-values-card {
  background-color: white;
  border: 1.5px solid var(--color-primary-light);
  border-radius: var(--radius-md);
  padding: 20px 16px;
  box-shadow: var(--shadow-sm);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--color-primary-light);
  }

  .angle-highlight {
    color: var(--color-primary);
  }
}

.trig-value-rows {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.val-row {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px 20px;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  background-color: #f8fafc;
}

.trig-fn-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-align: right;
}

.trig-fn-val {
  font-family: monospace;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  min-width: 72px;

  &.val-sin { color: #ef4444; }
  &.val-cos { color: #10b981; }
  &.val-tg { color: #8b5cf6; }
  &.val-ctg { color: #f59e0b; }
}

.trig-info-box {
  background-color: #eff6ff;
  border-radius: var(--radius-sm);
  padding: 16px;
  border-left: 4px solid var(--color-primary);

  p {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  ul {
    padding-left: 16px;
    font-size: 12px;
    color: var(--color-text-muted);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}

@container (min-width: 640px) {
  .trig-layout {
    grid-template-columns: 1.2fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 480px) {
  .angle-buttons-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .val-row {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 6px;
  }

  .trig-fn-name,
  .trig-fn-val {
    text-align: center;
  }
}
</style>
