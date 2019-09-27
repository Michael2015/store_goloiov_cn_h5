import {req, OK} from './request'

const clean = ({data}) => {
  return data && data.code === OK ? (data.data ? data.data : true) : null
}

// 首页接口

// 顾客（非合伙人）获取商城信息
export function getIndexTopInfo() {
  return req.get('/api/customer/mall/getinfo').then(clean)
}

// 顾客（非合伙人）| 游客 获取上级信息
export function getPartnerInfo(share_id) {
  return req.get('/api/customer/mall/getPartnerInfo', {
    params: {
      share_id
    }
  }).then(clean)
}

// 获取首页 banner 数据
export function getBanner() {
  return req.get('/api/marketing/getbanner').then(clean)
}
// 获取首页标签数据
export function getCategory() {
  return req.get('/api/marketing/getCategory').then(clean)
}
// 根据标签获取商品列表
export function getCategoryProducts(cate_id) {
  return req.post('/api/marketing/getCategoryProducts', {
    cate_id
  }).then(clean)
}