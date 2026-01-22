import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import QuestionPage from '../views/QuestionPage.vue'
import FinalPage from '../views/FinalPage.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePage
  },
  {
    path: '/question/:id',
    name: 'Question',
    component: QuestionPage
  },
  {
    path: '/final',
    name: 'Final',
    component: FinalPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
