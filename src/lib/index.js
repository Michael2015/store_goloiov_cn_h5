import { Indicator, Toast as toast } from 'mint-ui'
import * as clipboard from 'clipboard-polyfill'

export const Loading = {
  open: Indicator.open.bind(Indicator),
  close: Indicator.close.bind(Indicator)
}

export const Toast = toast

export const setClipboard = (s) => clipboard.writeText(s)

// 滚动条在Y轴上的滚动距离
export function getScrollTop() {
  let scrollTop, bodyScrollTop, documentScrollTop
  document.body && (bodyScrollTop = document.body.scrollTop)
  document.documentElement && (documentScrollTop = document.documentElement.scrollTop)
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
  return scrollTop
}
