import { Indicator, Toast as toast } from 'mint-ui'

export const Loading = {
  open: Indicator.open.bind(Indicator),
  close: Indicator.close.bind(Indicator)
}

export const Toast = toast
