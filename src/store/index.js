import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    // 什么角色 0 一般用户 1 合伙人
    role: 0
  },
  mutations: {
    loginTest(state) {
      state.isLogin = true
      state.role = 1
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
