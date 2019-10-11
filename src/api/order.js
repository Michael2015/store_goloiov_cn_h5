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

// 确认收货
export function confirmOrder(type, id, order) {
  return req.get('/api/order/confirmOrder', {
    params: {
      type,
      id,
      order_id: order
    }
  }).then(clean)
}

// 删除订单
export function delOrder(id) {
  return req.get('/api/order/delOrder', {
    params: {
      order_id: id
    }
  }).then(clean)
}

// 退款，还没发货
export function fastOrderRefund(id) {
  return req.get('/api/order/refund', {
    params: {
      order_id: id,
      model_id: 1
    }
  }).then(clean)
}

// 退货，已经一般收货
export function orderRefund(params) {
  return req.post('/api/order/refund', {
    model_id: 2,
    ...params
  }).then(clean)
}

// 评论订单
export function postOrderRemark(data) {
  return req.post('/api/order/orderReplay', data).then(clean)
}

// 查看物流信息
export function getOrderTrack(id, name) {
  return req.get('/api/Address/getnowexpress', {
    params: {
      delivery_name: name,
      delivery_id: id
    }
  }).then(clean)
}