import Vue from 'vue'
import Router from 'vue-router'
// import Index from 'com/index'
import Goods from 'com/index/goods'
import GoodsBuyRecords from 'com/index/goods/goods-buy-records'
import GoodsPrice from 'com/index/goods/goods-price'
import GoodsDetail from 'com/index/goods/goods-detail'
import GoodsVisitor from 'com/index/goods/goods-visitor'
import GoodsComment from 'com/index/goods/goods-comment'
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
      path: '/goods/:id',
      component: Goods,
      props: true,
      children: [
        {
          path: '',
          redirect: 'detail'
        },
        {
          path: 'price',
          component: GoodsPrice
        },
        {
          path: 'detail',
          component: GoodsDetail
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
      path: '/record',
      component: () => import(/* webpackChunkName: "record" */ 'com/income/record')
    },
    {
      path: '/withdraw',
      component: () => import(/* webpackChunkName: "withdraw" */ 'com/income/withdraw')
    },
    {
      path: '/me',
      component: () => import(/* webpackChunkName: "me" */ 'com/me'),
      meta: { haveTab: true }
    },
    {
      path: '/mymsg',
      component: () => import(/* webpackChunkName: "mymsg" */ 'com/me/myMsg'),
    },
    {
      path: '/',
      redirect:'/index'
    }
  ]
})