import store from '@/store'
import {getToken, nativeLogin} from './native'
import {getUserInfo} from 'api'

export function login() {
  store.commit('setToken', '')
  return new Promise(function(resolve, reject) {
    getToken().then(token => {
      let calledNative = false
      if (token) {
        // 有 token
        _getUserInfo(token)
      } else {
        calledNative = true
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
            // token 失效
            // alert('登录失败')
            if (!calledNative) {
              nativeLogin().then(token => {
                _getUserInfo(token)
              })
              calledNative = true
            } else {
              reject('获取用户信息失败')
            }
          }
        }, () => {
          // token 失效
          // alert('登录失败')
          if (!calledNative) {
            nativeLogin().then(token => {
              _getUserInfo(token)
            })
            calledNative = true
          } else {
            reject('获取用户信息失败')
          }
        })
      }
    })
  })
}

// app有免登陆功能，app会缓存token到本地
export function tryLogin() {
  let saveToken = ''
  return getToken().then(token => {
    return token ? saveToken=token : Promise.reject('没有token')
  }).then(getUserInfo).then(data => {
    if (data) {
      store.commit('setToken', saveToken)
      store.commit('setUserInfo', data)
    }
  })
}