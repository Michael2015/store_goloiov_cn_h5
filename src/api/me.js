import {req} from './request'
import {clean} from './index'

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