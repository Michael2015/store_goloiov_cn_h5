import axios from 'axios'
import qs from 'qs'

export const OK = 200
export const SIZE = 10
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

const params = {}

if (process.env.NODE_ENV !== 'production') {
  // dev 需要的逻辑
  // params.token = '7a0a462f0385fff534b32c2b7bc5e6be'
  // params.token = '543cfdc5e317718442c88d519f1c1f75'
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
