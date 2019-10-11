import { Indicator, Toast as toast } from 'mint-ui'
import * as clipboard from 'clipboard-polyfill'

export const Loading = {
  open: Indicator.open.bind(Indicator),
  close: Indicator.close.bind(Indicator)
}

export const Toast = toast

export const setClipboard = (s) => clipboard.writeText(s)
