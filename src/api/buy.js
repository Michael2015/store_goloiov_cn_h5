import {
  req
} from './request'
import {
  clean,
  special
} from './index'

// 购买页，购物，下单

// 根据商品id 获取信息
// 因为可以重新支付，所以还有个 先前订单号参数
export function getPreOrderProductInfo(id, lastOrderId, unique) {
  return req.get('/api/partner/store/price', {
    params: {
      order_id: lastOrderId,
      product_id: id,
      unique
    }
  }).then(clean)
}

// 下单接口
export function createOrder(params) {
  return req.post('/api/v1/Order/createOrder', params).then(clean)
}

// 支付，获取支付参数触发微信或支付宝支付
export function pay(id, type) {
  return req.get('/api/v1/pay/pay', {
    params: {
      order_id: id,
      pay_type: type
    }
  }).then(clean)
}

// 查询订单
export function queryOrder(id) {
  return req.get('/api/customer/pay/queryOrder', {
    params: {
      order_id: id
    }
  }).then(clean)
}

// 虚拟资产验证
// 发送验证码
export function sendCode(data) {
  return req.get('/api/server/sms/sendCode', {
    params: {
      mobile: data.phone,
      event: data.event
    }
  }).then(special)
}

// 校验验证码
export function checkCode(data) {
  return req.get('/api/server/sms/checkCode', {
    params: {
      phone: data.phone,
      smscode: data.code
    }
  }).then(special)
}
