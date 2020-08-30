import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/checkBox1',
    name: 'checkBox1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/checkBox1.vue')
  },
  {
    path: '/checkBox2',
    name: 'checkBox2',
    component: () => import('../views/checkBox2.vue')
  },
  {
    path: '/checkBox3',
    name: 'checkBox3',
    component: () => import('../views/checkBox3.vue')
  },
  {
    path: '/checkBox4',
    name: 'checkBox4',
    component: () => import('../views/checkBox4.vue')
  },
  {
    path: '/radio1',
    name: 'radio1',
    component: () => import('../views/radio1.vue')
  },
  {
    path: '/radio2',
    name: 'radio2',
    component: () => import('../views/radio2.vue')
  },
  {
    path: '/betterScroll',
    name: 'betterScroll',
    component: () => import('../views/betterScroll.vue')
  },
  {
    path: '/betterScroll2',
    name: 'betterScroll2',
    component: () => import('../views/betterScroll2.vue')
  },
  {
    path: '/betterScroll3',
    name: 'betterScroll3',
    component: () => import('../views/betterScroll3.vue')
  },
  {
    path: '/betterScroll4',
    name: 'betterScroll4',
    component: () => import('../views/betterScroll4.vue')
  },
  {
    path: '/weeks',
    name: 'weeks',
    component: () => import('../views/weeks.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/calendar.vue')
  },
  {
    path: '/es6',
    name: 'es6',
    component: () => import('../views/es6.vue')
  },
  {
    path: '/father',
    name: 'father',
    component: () => import('../views/father.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router