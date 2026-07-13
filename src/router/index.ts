import { createRouter, createWebHistory } from 'vue-router'

export const TOOL_ROUTES = [
  { path: '/calculators/quadratic-equations', tool: 'math-quadratic', label: 'Квадратні рівняння', icon: 'lightning' },
  { path: '/calculators/percentage',          tool: 'math-percentage', label: 'Калькулятор відсотків', icon: 'percent' },
  { path: '/calculators/trig-circle',         tool: 'math-trig-circle', label: 'Тригонометричне коло', icon: 'circle' },
  { path: '/calculators/right-triangle',      tool: 'math-right-triangle', label: 'Прямокутний трикутник', icon: 'ruler' },
  { path: '/calculators/graph-plotter',       tool: 'math-graph-plotter', label: 'Побудова графіків', icon: 'chart' },
  { path: '/calculators/formulas',            tool: 'math-formulas', label: 'Довідник формул', icon: 'lightbulb' },
] as const

export type ToolId = typeof TOOL_ROUTES[number]['tool']

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/TutorPage.vue'),
    },
    ...TOOL_ROUTES.map(r => ({
      path: r.path,
      component: () => import('../pages/MathToolsPage.vue'),
      meta: { tool: r.tool },
    })),
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'instant' as ScrollBehavior }
  },
})

export default router
