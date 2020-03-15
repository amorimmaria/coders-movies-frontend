import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'
import AdmOptions from '../pages/AdmOptions'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'adm-options',
    path: '/adm-options',
    component: AdmOptions,
  },
]

export default new VueRouter({
  mode: 'history',
  routes,
})
