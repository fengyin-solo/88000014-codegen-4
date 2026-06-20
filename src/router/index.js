import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import SamplingWindowsView from '../views/SamplingWindowsView.vue'
import RecordsView from '../views/RecordsView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      title: '运行总览',
    },
  },
  {
    path: '/windows',
    name: 'windows',
    component: SamplingWindowsView,
    meta: {
      title: '采样窗口',
    },
  },
  {
    path: '/records',
    name: 'records',
    component: RecordsView,
    meta: {
      title: '检疫记录',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
