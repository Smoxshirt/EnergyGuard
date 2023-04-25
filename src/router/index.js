import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PlaceHolderView from '../views/PlaceHolderView.vue'
import LoginPresenter from '../presenters/LoginPresenter.vue'
import DetailsPresenter from '../presenters/DetailsPresenter.vue'
import DeviceView from '../views/DeviceView.vue'

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
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPresenter
    },
    {
      path: '/devices',
      name: 'Devices',
      component: DeviceView
    },
    {
      path: '/details',
      name: 'Details',
      component: DetailsPresenter
    }
  ]
})

export default router
