import {
  Indicator,
  Toast as toast
} from 'mint-ui'
import Clipboard from 'clipboard'

export const Loading = {
  open: Indicator.open.bind(Indicator),
  close: Indicator.close.bind(Indicator)
}

export const Toast = toast

export const setClipboard = (s) => new Promise(function (resolve) {
  let button = document.createElement('button')
  button.setAttribute('data-clipboard-text', s)
  let clip = new Clipboard(button)
  clip.on('success', () => {
    resolve()
    clip.destroy()
    button = null
    clip = null
  })
  button.click()
})

// 滚动条在Y轴上的滚动距离
export function getScrollTop() {
  let scrollTop, bodyScrollTop, documentScrollTop
  document.body && (bodyScrollTop = document.body.scrollTop)
  document.documentElement && (documentScrollTop = document.documentElement.scrollTop)
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
  return scrollTop
}

//判断是否是IOS设备
export function appSource() {
  const u = navigator.userAgent;
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isiOS) {
    return "ios";
  } else {
    return "others";
  }
}


// 获取当前日期
export function getNowDate() {
  let yy = new Date().getFullYear();
  let mm = new Date().getMonth() + 1;
  let dd = new Date().getDate();
  return yy + '' + mm + '' + dd;
}

//向下保留小数
export function getFloat(num, length) {
  let str = num.toString()
  if (str.includes('.')) {
    return (Math.floor(num * Math.pow(10, length)) / Math.pow(10, length)).toString()
  } else {
    return str + '.' + '0'.repeat(length)
  }
}

//格式化日期
export function formatDate(date, type = 'YYYY-MM-DD') {
  let yy = new Date(date).getFullYear();
  let mm = (new Date(date).getMonth() + 1).toString().padStart(2, '0');
  let dd = (new Date(date).getDate()).toString().padStart(2, '0');
  return type.replace('YYYY', yy).replace('MM', mm).replace('DD', dd)
}
