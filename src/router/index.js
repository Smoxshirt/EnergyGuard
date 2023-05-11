import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PlaceHolderView from '../views/PlaceHolderView.vue'
import LoginPresenter from '../presenters/LoginPresenter.vue'
import DetailsPresenter from '../presenters/DetailsPresenter.vue'
import DeviceView from '../views/DeviceView.vue'
import PricePresenter from '../presenters/PricePresenter.vue'
import HomePresenter from '../presenters/HomePresenter.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      props: true,
      component: HomePresenter
    },
    {
      path: '/prices',
      name: 'Prices',
      props: true,
      component: PricePresenter
    },
    {
      path: '/placeholder',
      name: 'Placeholder',
      props: true,
      component: PlaceHolderView
    },
    {
      path: '/login',
      name: 'Login',
      props: true,
      component: LoginPresenter
    },
    {
      path: '/login',
      name: 'Login',
      props: true,
      component: LoginPresenter
    },
    {
      path: '/details',
      name: 'Details',
      props: true,
      component: DetailsPresenter
    }
  ]
})

export default router;
