// APP 提供的原生接口，主要是登录，获取token，发起分享，支付

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
      let r = json
      if (json !== undefined) {
        try {
          r = JSON.parse(json)
        } catch (e) {
          console.log(e)
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

// 从APP获取token
export function getToken() {
  if (process.env.NODE_ENV !== 'production') {
    return Promise.resolve('577de11cb52426332fc15c56529325b1')
    // return Promise.resolve('7c8abee43cb4bf232318bc21eec03a31')
    // return Promise.resolve('1e4c15c790804c9a7d98831e5833ac7b')
    // return Promise.resolve('f553c3923efb0fe51ef4b5ea60f09e9f')
    // return Promise.resolve('1e4c15c790804c9a7d98831e5833ac7b')
  }
  return api('loginToken')
}

export function nativeLogin() {
  return api('appLogin')
}

// 邀请合伙人
export function invitePartner(path, title) {
  return api('MiniProgram', {
    webpageUrl: 'https://wcp.szyrwl.com',
    path,
    title
  })
}

// 分享商品海报到微信
export function sharePoster(posterImg) {
  return api('WeChatShare', {
    shareImg: posterImg
  })
}


// 微信支付
export function wxPay(params) {
  return api('WeChatPay', params)
}

// 支付宝
export function aliPay(params) {
  return api('aliPay', params)
}

//'alipay', 'wechat'
export function nativePay(type, params) {
  if (type === 'alipay') {
    return aliPay(params)
  } else if (type === 'wechat') {
    return wxPay(params)
  } else {
    alert('未知支付类型')
  }
}