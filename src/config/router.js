import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'

import UsersRoot from '../pages/users/UsersRoot'
import UsersList from '../pages/users/UsersList'
import UsersDetail from '../pages/users/UsersDetail'
import UsersCreate from '../pages/users/UsersCreate'
import UsersUpdate from '../pages/users/UsersUpdate'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'users',
    path: '/users',
    component: UsersRoot,
    props: true,
    children: [
      { path: 'list', component: UsersList },
      { path: 'create', component: UsersCreate },
      { path: ':id/update', component: UsersUpdate },
      { path: ':id/detail', component: UsersDetail },
    ],
  },
]

export default new VueRouter({
  mode: 'history',
  routes,
})
