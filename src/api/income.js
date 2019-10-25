import {req, SIZE} from './request'
import {clean} from './index'

const special = ({data}) => {
  return data
}

// 收益接口

// 获取收益页收益列表
export function incomeList(page, size=SIZE) {
  return req.get('/api/partner.partner/incomeList', {
    params: {
      page,
      limit: size
    }
  }).then(clean)
}

// 获取收益详细信息
export function incomeListDetail(order_id, user_id,type_num) {
  return req.get('/api/partner.partner/incomeListDetail', {
    params: {
      order_id,
      user_id,
      type_num
    }
  }).then(special)
}

// 获取收益页公排列表
export function platoonList(page, size=SIZE) {
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

// 获取可提现金额(提现页)
export function withdraw() {
  return req.get('/api/partner/index/withdraw').then(clean)
}

// 提现金额(提现页)
export function extract(amount,extract_type) {
  return req.post('/api/partner/index/extract',{
    amount,extract_type
  }).then(special)
}

// 提现记录
export function withdrawlist(page) {
  return req.get('/api/partner/index/withdrawlist',{
    params:{
      page
    }
  }).then(clean)
}

// 修改绑定银行卡
export function bindbank(senddata) {
  return req.post('/api/partner/index/bindbank',{
    ...senddata
  }).then(special)
}
