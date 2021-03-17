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
  let init = !isNaN(date) ? date : date.replace(/-/g, '/')
  let _date = new Date(init)
  let yy = _date.getFullYear();
  let mm = (_date.getMonth() + 1).toString().padStart(2, '0');
  let dd = (_date.getDate()).toString().padStart(2, '0');
  return type.replace('YYYY', yy).replace('MM', mm).replace('DD', dd)
}


export function allTrue(nameArr, valueArr) {
  let flag = true
  for (let i in nameArr) {
    if (nameArr[i] !== valueArr[i]) {
      flag = false
      break
    }
  }
  return flag
}


export function allFalse(nameArr, valueArr) {
  let flag = true
  for (let i in nameArr) {
    if (nameArr[i] === valueArr[i]) {
      flag = false
      break
    }
  }
  return flag
}


//运算 处理精度缺失
export function formatFloat(a, b, flag) {
  var n = a.toString().indexOf('.') == -1 ? 0 : a.toString().split('.')[1].length;
  var t = b.toString().indexOf('.') == -1 ? 0 : b.toString().split('.')[1].length;
  var m = Math.max(n, t);
  switch (flag) {
    case '+':
      return (a * Math.pow(10, m) + b * Math.pow(10, m)) / Math.pow(10, m);
    case '-':
      return (a * Math.pow(10, m) - b * Math.pow(10, m)) / Math.pow(10, m);
    case '*':
      return (a * Math.pow(10, n + t) * b) / Math.pow(10, n + t);
    case '/':
      return ((a * Math.pow(10, n)) / (b * Math.pow(10, t))) * (Math.pow(10, t) / Math.pow(10, n));
    default:
      return null
  }
}

//保留小数 ：num为数字,cutnum为保留的小数位数,updown为0向下取(默认),为1向上取,2为四舍五入
export function remainPoint(num, cutnum, updown) {
  var Num = num.toString(),
    arr = Num.split('.'),
    N = Number(cutnum),
    R = Number(updown);
  if (arr.length === 1) {
    return Num + (N ? '.' : '') + Array.from({
      length: N
    }, () => {
      return "0";
    }).join("");
  } else {
    if (arr[1].length < N) {
      return Num + Array.from({
        length: N - arr[1].length
      }, () => {
        return "0";
      }).join("");
    } else if (arr[1].length === N) {
      return Num;
    } else {
      if (!R) {
        return arr[0] + (N ? '.' : '') + arr[1].substring(0, N);
      } else if (R == 1) {
        return Math.ceil(Number(num) * Math.pow(10, N)) / Math.pow(10, N);
      } else {
        return Math.round(Number(num) * Math.pow(10, N)) / Math.pow(10, N);
      }
    }
  }
}


export const _S = {
  set(name, val) {
    let doVal = typeof val === 'string' ? val : JSON.stringify(val)
    sessionStorage.setItem(name, doVal)
  },
  get(name) {
    return JSON.parse(sessionStorage.getItem(name))
  },
  remove(name) {
    sessionStorage.removeItem(name)
  }
}
