import Vue from 'vue'
import Router from 'vue-router'
// import Index from 'com/index'
import Goods from 'com/index/goods'
import GoodsBuyRecords from 'com/index/goods-buy-records'
import GoodsPrice from 'com/index/goods-price'
import GoodsVisitor from 'com/index/goods-visitor'
import GoodsComment from 'com/index/goods-comment'
// import Order from 'com/order'
import OrderDetail from 'com/order/order-detail'
// import Income from 'com/income'
// import Me from 'com/me'

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
      path: '/goods',
      component: Goods,
      children: [
        {
          path: '',
          redirect: 'buy-records'
        },
        {
          path: 'price',
          component: GoodsPrice
        },
        {
          path: 'buy-records',
          component: GoodsBuyRecords
        },
        {
          path: 'visitor',
          component: GoodsVisitor
        },
        {
          path: 'comment',
          component: GoodsComment
        }
      ],
    },
    {
      path: '/order',
      component: () => import(/* webpackChunkName: "order" */ 'com/order'),
      meta: { haveTab: true }
    },
    {
      path: '/order-detail',
      component: OrderDetail
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
      path: '/mymsg',
      component: () => import(/* webpackChunkName: "me" */ 'com/me/myMsg'),
    },
    {
      path: '/',
      redirect:'/index'
    }
  ]
})