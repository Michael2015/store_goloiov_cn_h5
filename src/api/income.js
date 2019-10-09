import {req, OK, SIZE} from './request'

const clean = ({data}) => {
  return data && data.code === OK ? (data.data ? data.data : true) : null
}

// 收益接口

// 获取收益页收益列表
export function incomeList(page, size) {
  return req.get('/api/partner.partner/incomeList', {
    params: {
      page,
      limit: size
    }
  }).then(clean)
}

// 获取收益页公排列表
export function platoonList(page, size) {
  return req.get('/api/partner.partner/platoonList', {
    params: {
      page,
      limit: size
    }
  }).then(clean)
}

// 获取可提现金额
export function getUserAmount() {
  return req.get('/api/partner.partner/getUserAmount').then(clean)
}
