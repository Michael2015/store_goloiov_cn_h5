import { req } from './request'
import { clean } from './index'

const special = ({data}) => {
  return data
}

// 我的收获地址管理 =====================
// 我的收获地址列表
export function getAddressList() {
  return req.get('/api/Address/getAddressList').then(clean)
}

// 删除一个地址
export function delAddress(id) {
  return req.get('/api/address/deladdress', {
    params: {
      address_id: id
    }
  }).then(clean)
}

// 编辑一个地址
export function editAddress(params) {
  return req.get('/api/address/editaddress', {
    params: {
      ...params
    }
  }).then(clean)
}

// 新增一个地址
export function addAddress(params) {
  return req.get('/api/Address/addAddress', {
    params: {
      ...params
    }
  }).then(clean)
}

//  我的访客记录管理 =====================
//  获取我的访客记录数据
export function lowerBrowsing(page, limit) {
  return req.get('/api/partner.partner/lowerBrowsing', {
    params: {
      page, limit
    }
  }).then(clean)
}

//  获取我的伙伴数据
export function member(keyword) {
  return req.get('/api/partner/index/member',{
    params:{
      keyword
    }
  }).then(clean)
}

// 获取我的伙伴个数
export function partnerNum() {
  return req.get('/api/partner/index').then(clean)
}

// 获取我的优惠券
export function getcouponlist() {
  return req.get('/api/coupon/getcouponlist').then(clean)
}

// 获取我的评论
export function commentRecord() {
  return req.get('/api/order/commentRecord',{
    params:{
      model_id: 2,
    }
  }).then(clean)
}

// 反馈意见
export function feedback(feedbackData) {
  return req.post('/api/partner/home/feedback',{
    ...feedbackData
  }).then(special)
}

// 获取介绍信息
export function getresource() {
  return req.get('/api/partner/home/getresource').then(clean)
}