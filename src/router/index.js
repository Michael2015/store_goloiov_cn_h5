import Vue from 'vue'
import Router from 'vue-router'
import Index from 'com/index'
import Goods from 'com/index/goods'
import GoodsBuyRecords from 'com/index/goods-buy-records'
import GoodsPrice from 'com/index/goods-price'
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
      path: '/goods',
      component: Goods,
      children: [
        {
          path: '',
          redirect: 'price'
        },
        {
          path: 'price',
          component: GoodsPrice
        },
        {
          path: 'buy-records',
          component: GoodsBuyRecords
        }
      ],
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