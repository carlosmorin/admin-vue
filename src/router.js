import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import('./views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('./views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import('./views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import('./views/Tables.vue')
        },
        {
          path: '/activity_logs',
          name: 'activity_logs',
          component: () => import('./views/ActivityLogs.vue')
        },
        {
          path: '/activity_logs/show/:id',
          name: 'show',
          component: () => import('./views/ActivityLogs/Show.vue')
        },
        {
          path: '/assistants',
          name: 'assistants',
          component: () => import('./views/Assistants/Index.vue')
        },
        {
          path: '/assistants/show/:id',
          name: 'assistants',
          component: () => import('./views/Assistants/Show.vue')
        },
        {
          path: '/assistants/edit/:id',
          name: 'assistants',
          component: () => import('./views/Assistants/Edit.vue')
        }

      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('./views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('./views/Register.vue')
        }
      ]
    }
  ]
})
