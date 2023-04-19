import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PlaceHolderView from '../views/PlaceHolderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/overview',
      name: 'Overview',
      component: AboutView
    },
    {
      path: '/placeholder',
      name: 'Placeholder',
      component: PlaceHolderView
    }
  ]
})

export default router
