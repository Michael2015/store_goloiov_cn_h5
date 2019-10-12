import {req} from './request'
import {clean} from './index'

// 购买页，购物，下单

// 根据商品id 获取信息
// 因为可以重新支付，所以还有个 先前订单号参数
export function getPreOrderProductInfo(id, lastOrderId) {
  return req.get('/api/partner/store/price', {
    params: {
      order_id: lastOrderId,
      product_id: id
    }
  }).then(clean)
}