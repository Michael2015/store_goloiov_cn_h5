import store from '@/store'
import {getToken, nativeLogin} from './native'
import {getUserInfo} from 'api'

export function login() {
  store.commit('setToken', '')
  return new Promise(function(resolve) {
    getToken().then(token => {
      if (token) {
        // 有 token
        _getUserInfo(token)
      } else {
        nativeLogin().then(token => {
          _getUserInfo(token)
        })
      }

      function _getUserInfo (token) {
        getUserInfo(token).then(data => {
          if (data) {
            store.commit('setToken', token)
            store.commit('setUserInfo', data)
            resolve(data)
          } else {
            alert('登录失败')
          }
        }, () => {
          alert('登录失败')
        })
      }
    })
  })
}