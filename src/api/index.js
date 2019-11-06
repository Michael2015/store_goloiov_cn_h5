import {req, OK, SIZE} from './request'

export const clean = ({data}) => {
  return data && data.code === OK ? (data.data ? data.data : true) : Promise.reject(data.msg || '')
}

// 获取当前环境的host
export function getHost() {
  if (process.env.NODE_ENV !== 'production') {
    return 'https://storemp.golodata.com'
  } else {
    return window.location.protocol + '//' + window.location.host
  }
}

// 获取用户信息
export function getUserInfo(token) {
  return req.get('/app/user/getuserinfo', {
    params: {
      token
    }
  }).then(clean)
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
// 获取首页滚动消息列表
export function getIndexNotice() {
  return req.get('/api/partner/home/getinfo').then(clean)
}

// 获取首页商品列表（非合伙人）
export function CustomerGetProducts(page, size) {
  return req.get('/api/customer/mall/getProductList', {
    params: {
      page,
      limit: size
    }
  }).then(clean)
}

// 获取首页商品列表（合伙人）
export function PartnerGetProducts(keyword ,page, size) {
  return req.get('/api/partner/home/storelist', {
    params: {
      keyword,
      page,
      limit: size
    }
  }).then(clean)
}

// 获取首页新人专区信息
export function getNewbornZoneStore(){
  return req.get('/api/marketing/getNewbornZoneStore').then(clean)
}

// 商品详情相关接口(接口是分两组的)

// 获取商品的基本信息
export function CustomerGetGoodsInfo(id, shareInfo = {}) {
  return req.get('/api/customer/product/detail', {
    params: {
      product_id: id,
      ...shareInfo
    }
  }).then(clean)
}

// 获取商品下面的图文详情
export function CustomerGetGoodsDesc(id) {
  return req.get('/api/customer/product/getProductDesc', {
    params: {
      product_id: id
    }
  }).then(clean)
}

// 获取商品下面的购买记录
export function CustomerGetGoodsBuyRecords(id, page = 1, size = SIZE) {
  return req.get('/api/customer/product/buyRecord', {
    params: {
      product_id: id,
      page,
      limit: size
    }
  }).then(clean)
}

// 获取商品下面的评论(合伙人和客户端)
export function GetGoodsComments(id, page = 1, size = SIZE) {
  return req.get('/api/order/commentRecord', {
    params: {
      product_id: id,
      page,
      limit: size
    }
  }).then(clean)
}

// 获取商品的基本信息
export function PartnerGetGoodsInfo(id, shareInfo = {}) {
  return req.get('/api/partner/store/getinfo', {
    params: {
      product_id: id,
      ...shareInfo
    }
  }).then(clean)
}

// 获取商品下面的图文详情
export function PartnerGetGoodsDesc(id) {
  return req.get('/api/partner/store/detail', {
    params: {
      product_id: id
    }
  }).then(clean)
}

// 获取商品下面的购买记录
export function PartnerGetGoodsBuyRecords(id, page = 1, size = SIZE) {
  return req.get('/api/partner/store/salesRecord', {
    params: {
      product_id: id,
      page,
      limit: size
    }
  }).then(clean)
}

// 获取商品下面的访客记录
export function PartnerGetGoodsVisitor(id, page = 1, size = SIZE) {
  return req.get('/api/partner/store/visitor', {
    params: {
      product_id: id,
      page,
      limit: size
    }
  }).then(clean)
}

// 加入合伙人
export function joinPartner_old(uid){
  console.log(uid)
  return req.get('/api/partner/index/join', {
    params: {
      spid: uid
    }
  }).then(clean)
}

export function joinPartner(phone){
  return req.get('/app/user/addInviter', {
    params: {
      invitMobile: phone
    }
  }).then(clean)
}

// 获取省市区 ==================================
export function getAreaInfo(id = 0){
  return req.get('/api/address/getArea', {
    params: {
      pid: id
    }
  }).then(clean)
}

// 上传图片
export function uploadImg(formData) {
  return req.post('/api/customer/index/commonUpload', formData).then(clean)
}

// 获取小程序二维码
export function getQrcode(scene) {
  return req.get('/api/partner.partner/getQrCode', {
    params: {
      page: 'pages/index/index',
      scene
    }
  }).then(clean)
}
