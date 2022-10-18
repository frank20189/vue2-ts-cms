import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import { App } from 'vue'
import localCache from '@/utils/cache'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "amin" */ '@/views/main/MainView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export const setupRouter = (app: App) => {
  app.use(router)
}

export default router
