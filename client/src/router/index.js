import Vue from 'vue'
import VueRouter from 'vue-router'
import Task from '../views/tasks/Index.vue'
import Folder from '../views/folders/Index.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '/',
    redirect: '/folders'
  },
  {
    path: '/folders',
    name: 'folders',
    component: Folder
  },
  {
    path: '/folders/:id/tasks',
    name: 'tasks',
    component: Task
  },
  // { path: '*', component: Task }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
