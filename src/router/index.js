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
      path: '/record',
      component: () => import(/* webpackChunkName: "income" */ 'com/income/record')
    },
    {
      path: '/withdraw',
      component: () => import(/* webpackChunkName: "income" */ 'com/income/withdraw')
    },
    {
      path: '/relevanceCard',
      component: () => import(/* webpackChunkName: "income" */ 'com/income/relevanceCard')
    },
    {
      path: '/allowance',
      component: () => import(/* webpackChunkName: "income" */ 'com/income/IncomeDetails/allowance')
    },
    {
      path: '/benifit',
      component: () => import(/* webpackChunkName: "income" */ 'com/income/IncomeDetails/benifit')
    },
    {
      path: '/commission',
      component: () => import(/* webpackChunkName: "income" */ 'com/income/IncomeDetails/commission')
    },
    {
      path: '/director',
      component: () => import(/* webpackChunkName: "income" */ 'com/income/IncomeDetails/director')
    },
    {
      path: '/public',
      component: () => import(/* webpackChunkName: "income" */ 'com/income/IncomeDetails/public')
    },
    {
      path: '/supplier',
      component: () => import(/* webpackChunkName: "income" */ 'com/income/IncomeDetails/supplier')
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
      path: '/myPartner',
      component: () => import(/* webpackChunkName: "me" */ 'com/me/myPartner'),
    },
    {
      path: '/myVisitor',
      component: () => import(/* webpackChunkName: "me" */ 'com/me/myVisitor'),
    },
    {
      path: '/',
      redirect:'/index'
    }
  ]
})