import store from '@/store'
import {
  getToken,
  nativeLogin,
  nativeLogout
} from './native'
import {
  getUserInfo
} from 'api'

export function login() {
  store.commit('setToken', '')
  return new Promise(function (resolve, reject) {
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

      function _getUserInfo(token) {
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
  store.commit('clearUniqueNum')
  let saveToken = ''
  return getToken().then(token => {
    //console.log('进来', token) //199b67345294167c0fad6fa9b2d5ab23
    return token ? saveToken = token : Promise.reject('没有token')
  }).then(getUserInfo).then(data => {
    if (data) {
      store.commit('setToken', saveToken)
      store.commit('setUserInfo', data)
    }
  }).catch(() => {
    login()
  }).finally(() => {
    //tryLogin执行完后设置标识
    store.commit('setUniqueNum')
  })
}

// 退出登录
export function logout() {
  return nativeLogout().then(() => {
    store.commit('setToken', '')
    store.commit('clearUserInfo')
  })
}
