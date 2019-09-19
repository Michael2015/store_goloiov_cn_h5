import Vue from 'vue'
import Router from 'vue-router'
import Index from 'com/index'
import Order from 'com/order'
import OrderDetail from 'com/order/order-detail'
import Income from 'com/income'
import Me from 'com/me'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/index',
      component: Index
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/order-detail',
      component: OrderDetail
    },
    {
      path: '/income',
      component: Income
    },
    {
      path: '/me',
      component: Me
    }
  ]
})