import {
  req
} from './request'
import {
  clean,
  special
} from './index'
import {
  getUserInfo
} from 'api'
import store from '@/store'

// 更新全局用户信息
export function updateUserInfo() {
  return new Promise(function (resolve) {
    getUserInfo(store.state.token).then(data => {
      if (data) {
        store.commit('setUserInfo', data)
        resolve(data)
      } else {
        alert('更新失败')
      }
    }, () => {
      alert('更新失败')
    })
  })
}
// 我的收获地址管理 =====================
// 我的收获地址列表
export function getAddressList() {
  return req.get('/api/Address/getAddressList').then(clean)
}

// 删除一个地址
export function delAddress(id) {
  return req.post('/api/Address/delAddress', {
    address_id: id
  }).then(special)
}

// 编辑一个地址
export function editAddress(params) {
  return req.post('/api/Address/editAddress', params).then(clean)
}

// 新增一个地址
export function addAddress(params) {
  return req.post('/api/Address/addAddress', params).then(clean)
}

//  我的访客记录管理 =====================
//  获取我的访客记录数据
export function lowerBrowsing(page, limit) {
  return req.get('/api/partner.partner/lowerBrowsing', {
    params: {
      page,
      limit
    }
  }).then(clean)
}

//  获取我的伙伴数据
export function member(keyword) {
  return req.get('/api/partner/index/member', {
    params: {
      keyword
    }
  }).then(clean)
}


//  获取我的业绩（计入管理津贴业绩以及晋升业绩）
export function sales() {
  return req.get('/api/partner/partner/getMyselfSales', {
    params: {}
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
  return req.get('/api/order/commentRecord', {
    params: {
      model_id: 2,
    }
  }).then(clean)
}

// 反馈意见
export function feedback(feedbackData) {
  return req.post('/api/partner/home/feedback', {
    ...feedbackData
  }).then(special)
}

// 获取介绍信息
export function getresource() {
  return req.get('/api/partner/home/getresource').then(clean)
}


// 修改绑定手机相关 =================


// 验证手机号
export function legitimatephone(data) {
  return req.post('/app/user/checkphone', {
    ...data
  }).then(special)
}

// 发送验证码
export function sendsms(data) {
  return req.get('/app/user/sendsms', {
    params: {
      mobile: data.mobile,
      event: data.event
    }
  }).then(special)
}
// 修改手机号
export function editphone(data) {
  return req.post('/app/user/editphone', {
    ...data
  }).then(special)
}

// 绑定上级相关 ============

// 通过电话号码获取用户信息
export function searchPartner(data) {
  return req.post('/api/partner/partner/searchPartner', {
    ...data
  }).then(special)
}

// 添加上级合伙人
export function joinTeam(data) {
  return req.post('/api/partner.index/joinTeam', {
    ...data
  }).then(special)
}

// 升级攻略相关 ===============
export function getmyteamincome(user_id) {
  return req.get('/api/partner.partner/getmyteamincome', {
    params: {
      user_id
    }
  }).then(special)
}


//vip服务商相关
export function apply_vip(applyObj) {
  return req.post('/api/partner/home/server_vip_apply', {
    ...applyObj
  }).then(clean)
}

//vip服务商记录
export function get_vip_apply_log() {
  return req.get('/api/partner/home/server_vip_apply_log').then(clean)
}

// vip服务商详情
export function get_vip_apply_log_detail(id) {
  return req.get('/api/partner/home/server_vip_apply_detail', {
    params: {
      id
    }
  }).then(clean)
}
//查看vip申请状态
export function get_vip_server() {
  return req.get('/api/partner/home/get_vip_server').then(clean)
}



// 区域管理员相关=======================

// 申请区域管理员相关
export function region_partner_applye(applyObj) {
  return req.get('/api/partner/home/region_partner_apply', {
    params: {
      ...applyObj
    }
  }).then(clean)
}

//  记录
export function get_my_region_log() {
  return req.get('/api/partner/home/get_my_region_log').then(clean)
}

//  查看用户申请状态
export function get_region_partner() {
  return req.get('/api/partner/home/get_region_partner').then(clean)
}

// 详情
export function get_my_region_log_detail(id) {
  return req.get('/api/partner/home/get_my_region_log_detail', {
    params: {
      id
    }
  }).then(clean)
}

// 海报=======================
//  获取海报列表
export function getposterlist() {
  return req.get('/api/partner.partner/getposterlist').then(clean)
}

export function createPosterImage(imgObj) {
  return req.get('/api/partner.partner/createPosterImage', {
    params: {
      ...imgObj
    }
  }).then(clean)
}

//金卡贝积分
export function getUserIntegralList() {
  return req.get('/api/partner.partner/getUserIntegralList', {
    limit: 1000
  }).then()
}

//获取贡献值详情
export function getUserContributionDetail() {
  return req.get('/api/partner.partner/getUserContributionDetail', {}).then()
}
//贡献值流水
export function getUserContributionList(page, limit) {
  return req.get('/api/partner.partner/getUserContributionList', {
    page,
    limit
  }).then(clean)
}


//我的会员接口
export function getMyFriends(page) {
  return req.get('/api/v1/User/getMyFriends', {
    params: {
      page
    }
  }).then(clean)
}

//获取积分接口
export function getScore() {
  return req.post('/api/v1/Score/getScore').then(clean)
}

//获取积分列表
export function getScoreList(page, limit) {
  return req.post('/api/v1/Score/getList', {
    page,
    limit
  }).then(clean)
}

//获取贡献值记录接口
export function getScoreContribution(page, limit) {
  return req.post('/api/v1/Score/getContribution', {
    page,
    limit
  }).then(clean)
}

//用户首页信息接口
export function getUserHomeInfo() {
  return req.post('/api/v1/user/getUserHomeInfo').then(clean)
}

//积分价值变化接口
export function getScorePrice() {
  return req.post('/api/v1/user/getScorePrice').then(clean)
}


//获取个人信息接口
export function getMyUserInfo() {
  return req.get('/api/v1/User/getUserInfo').then(clean)
}


// 设置个人信息接口
export function editUserInfo(userinfo) {
  return req.post('/api/v1/User/editUserInfo', userinfo).then(special)
}

//绑定支付宝接口
export function bindZfb(userinfo) {
  return req.post('/api/v1/user/bindZfb', userinfo).then(special)
}
