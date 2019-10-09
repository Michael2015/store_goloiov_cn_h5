import {req} from './request'
import {clean} from './index'

// 获取订单列表
export function getOrderList(status, page, size) {
  return req.get('/api/order/getMyOrderList', {
    params: {
      status,
      page,
      limit: size
    }
  }).then(clean)
}

// 根据订单号获取订单的详情
export function getOrderDetail(id, uid) {
  return req.get('/api/order/getOrderById', {
    params: {
      order_id: id,
      user_id: uid
    }
  }).then(clean)
}
