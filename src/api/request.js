import axios from 'axios'
import qs from 'qs'

export const OK = 1
export const SIZE = 10
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

if (process.env.NODE_ENV !== 'production') {
  // dev 需要的逻辑
}

export const req = axios.create({
  baseURL: '/',
  params: {
  },
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
