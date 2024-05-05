import { createRouter, createWebHistory } from 'vue-router'
import InputOrder from '../views/InputOrder.vue'
import LineChart from '../views/LineChart.vue'
import TestPage from '../views/TestPage.vue'

const routes = [
  {
    path: '/',
    name: 'input',
    component: InputOrder
  },
  {
    path: '/chart',
    name: 'chart',
    component: LineChart
  },
  {
    path: '/test',
    name: 'test',
    component: TestPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
