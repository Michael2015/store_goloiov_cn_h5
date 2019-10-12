function callNative(obj = {}) {

  if (process.env.NODE_ENV !== 'production') {
    // 开发只要打印
    console.log(obj)
    return
  }

  if (window.native && window.native.sendMessage) {
    // android
    window.native.sendMessage(JSON.stringify(obj))
  } else {
    // IOS
    window.webkit.messageHandlers.native.postMessage(JSON.stringify(obj))
  }
}

let n = 0

function api(action, data = {}) {
  return new Promise(function(resolve) {
    const cbName = '_native_cb_' + n++
    const wrap = function(json) {
      let r = null
      if (json) {
        try {
          r = JSON.parse(json)
        } catch (e) {
          console.log(e)
          r = json
        }
      }
      resolve(r)
      window[cbName] = null
    }
    window[cbName] = wrap
  
    callNative({
      action,
      callback: cbName,
      data
    })
  })
}

export function getToken() {
  if (process.env.NODE_ENV !== 'production') {
    return Promise.resolve('577de11cb52426332fc15c56529325b1')
  }
}

export function nativeLogin() {
  return api('login')
}
