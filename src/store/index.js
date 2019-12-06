import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    // 登录凭证
    token: '',
    // 什么角色 0 一般用户 1 合伙人
    role: 0,
    // 用户信息
    userInfo: {},
    // 买商品时，选择收货地址
    selectAddress: null,
    // 发生订单操作,触发刷新，比如删除订单，支付成功订单，重新下单
    refreshOrder: 0,
    // 是否第一次进入首页
    isFirst:false,
    // 储存结算页显示个数,多数情况用不上,解决用户在结算页重选地址丢失个数问题
    buyTotalNum:1,
    // 虚拟资产标识
    is_testing_money: false,
    topNum: 0
  },
  mutations: {
    topNum( state, h) {
      state.topNum = h
    },
    testingMoney(state, flag) {
      state.is_testing_money = flag
    },
    loginTest(state) {
      state.isLogin = true
      state.role = 1
    },
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, info) {
      state.userInfo = info
      state.isLogin = true
      state.role = info.is_promoter === 1 ? 1 : 0
    },
    clearUserInfo(state) {
      // 退出登录用
      state.userInfo = {}
      state.isLogin = false
      state.role = 0
    },
    setAddress(state, addr) {
      state.selectAddress = addr
    },
    refreshOrder(state) {
      state.refreshOrder++
    },
    setFirst(state,falg){
      state.isFirst = falg
    },
    setBuyTotalNum(state,totalnum){
      state.buyTotalNum = totalnum
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
