import axios from 'axios'
import qs from 'qs'
import store from '@/store'

export const OK = 200
export const SIZE = 10
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
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
  transformRequest: [
    function (data) {
      if (data instanceof FormData) {
        return data
      }
      return qs.stringify(data)
    }
  ]
})

req.interceptors.request.use(
  function (config) {
    const token = store.state.token || '577de11cb52426332fc15c56529325b1'
    if (token) {
      // 从store注入token
      config.params.token = token
    }
    return config
  }
)
