// APP 提供的原生接口，主要是登录，获取token，发起分享，支付

function callNative(obj = {}) {

  if (process.env.NODE_ENV !== 'production') {
    // 开发只要打印
    console.log(obj)
    // window[obj.callback]('199b67345294167c0fad6fa9b2d5ab23')
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
  return new Promise(function (resolve) {
    const cbName = '_native_cb_' + n++
    const wrap = function (json) {
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
    // return Promise.resolve('7499508be6601cef1d2cc6c6ac7f6512')
    // return Promise.resolve('543a2d96bc77c89ed982e8f801e1f244')
    // 线上toekn 86399b1c0d922fa339cabe3c9473b2bc
    // 测试token 199b67345294167c0fad6fa9b2d5ab23
    return Promise.resolve('199b67345294167c0fad6fa9b2d5ab23')
  }
  return api('loginToken')
}

export function nativeLogin() {
  return api('appLogin')
}

export function nativeLogout() {
  if (process.env.NODE_ENV !== 'production') {
    return Promise.resolve()
  }
  return api('appLogout')
}

// 邀请合伙人
export function invitePartner(uid, name) {
  return import( /* webpackChunkName: "mini-img" */ 'img/mini.png').then((res) => {
    return res.default
  }).then(img => {
    const len = 'data:image/png;base64,'.length
    return api('MiniProgram', {
      webpageUrl: 'https://wcp.wanchepin.com/app',
      path: '/pages/index/index?share_id=' + uid + '&type=invite',
      title: name + '邀请您免费注册万车品商城会员',
      img: img.substring(len)
    })
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

// 打电话
export function telephone(phone) {
  return api('Telephone', {
    phone
  })
}
