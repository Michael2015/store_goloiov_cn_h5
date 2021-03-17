import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import Vue from 'vue'
import {
  login
} from 'api/login'
export const OK = 200
export const SIZE = 10
const headers = {
  'Content-Type': 'application/json '
}

// 通用参数
const params = {
  source_type: 'app'
}

if (process.env.NODE_ENV !== 'production') {
  // dev 需要的逻辑
}

export const req = axios.create({
  baseURL: '/',
  params,
  headers,
  /* transformRequest: [
    function (data) {
      if (data instanceof FormData) {
        return data
      }
      return qs.stringify(data)
    }
  ] */
})

req.interceptors.request.use(
  function (config) {
    if (config.url === '/app/user/getuserinfo') {
      // 获取用户信息的时候不能写token
    } else {
      // 注入token
      config.params.token = store.state.token
    }
    return config
  }
)

req.interceptors.response.use(function (response) {
  //未登录统一返回403，调用原生登录
  if (response.data.code == 403) {
    Vue.prototype.$notice.show("请先登录", () => {
      login()
        .then().catch(() => {
          Vue.prototype.$notice.show("登录失败，请稍后再试");
        })
    });
    return
  }
  return response;


}, function (error) {

  return Promise.reject(error);
});
