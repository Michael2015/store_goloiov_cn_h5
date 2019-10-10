import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: true,
    // 什么角色 0 一般用户 1 合伙人
    role: 1,
    // 买商品时，选择收货地址
    selectAddress: {}
  },
  mutations: {
    loginTest(state) {
      state.isLogin = true
      state.role = 1
    },
    setAddress(state, addr) {
      state.selectAddress = addr
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
