import { Indicator, Toast as toast } from 'mint-ui'
import Clipboard from 'clipboard'

export const Loading = {
  open: Indicator.open.bind(Indicator),
  close: Indicator.close.bind(Indicator)
}

export const Toast = toast

export const setClipboard = (s) => new Promise(function(resolve) {
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
