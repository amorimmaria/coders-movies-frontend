import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/home/HomeView'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView,
  },
]

export default new VueRouter({
  mode: 'history',
  routes,
})
