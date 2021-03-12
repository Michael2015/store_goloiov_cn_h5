import axios from 'axios'
import qs from 'qs'
import store from '@/store'

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
