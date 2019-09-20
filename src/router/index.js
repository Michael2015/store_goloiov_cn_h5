import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/index',
      component : () => import(/* webpackChunkName: "index" */ 'com/index'),
      meta: { haveTab: true }
    },
    {
      path: '/order',
      component: () => import(/* webpackChunkName: "order" */ 'com/order'),
      meta: { haveTab: true }
    },
    {
      path: '/income',
      component: () => import(/* webpackChunkName: "income" */ 'com/income'),
      meta: { haveTab: true }
    },
    {
      path: '/me',
      component: () => import(/* webpackChunkName: "me" */ 'com/me'),
      meta: { haveTab: true }
    },
    {
      path: '/',
      redirect:'/index'
    }
  ]
})