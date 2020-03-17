import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'

import UsersRoot from '../pages/users/UsersRoot'
import UsersList from '../pages/users/UsersList'
import UsersDetail from '../pages/users/UsersDetail'
import UsersCreate from '../pages/users/UsersCreate'
import UsersUpdate from '../pages/users/UsersUpdate'
import UsersChangePass from '../pages/users/UsersChangePass'

import User from '../pages/user/User'
import UserUpdate from '../pages/user/UserUpdate'
import UserChangePass from '../pages/user/UserChangePass'

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
      { path: ':id/changepass', component: UsersChangePass },
      { path: ':id/detail', component: UsersDetail },
    ],
  },
  {
    name: 'user',
    path: '/user',
    component: User,
  },
  {
    name: 'user_update',
    path: '/user/update',
    component: UserUpdate,
  },
  {
    name: 'user_change_pass',
    path: '/user/changepass',
    component: UserChangePass,
  },
]

export default new VueRouter({
  mode: 'history',
  routes,
})
