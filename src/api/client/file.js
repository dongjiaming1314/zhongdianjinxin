import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/esequitycustinfo/queryCustInfoByCondition',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/esequitycustinfo',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/esequitycustinfo/' + id,
    method: 'get'
  })
}


export function putObj(obj) {
  return request({
    url: '/admin/esequitycustinfo',
    method: 'put',
    data: obj
  })
}

// 用户信息查询
export function fetchInfoList(customerNo) {
  return request({
    url: `/admin/esequitycustinfo/queryCustInfoByCustNo/${customerNo}`,
    method: 'get'
  })
}

// 地址
export function fetchAddressList(customerNo) {
  return request({
    url: `/admin/mall/my/address/queryCustAddressInfo/${customerNo}`,
    method: 'get'
  })
}

// 解绑卡
export function fetchUnboundList(customerNo) {
  return request({
    url: `/admin/escustunbindcard/queryCustUnbindInfo/${customerNo}`,
    method: 'get',
  })
}

// 客户登陆历史
export function fetchHistoryList(customerNo) {
  return request({
    url: `/admin/escustloginhistory/queryCustLoginhistory/${customerNo}`,
    method: 'get'
  })
}

// 客户卡
export function fetchCard(customerNo) {
  return request({
    url: `/admin/esusercardinfo/queryCustCardInfo/${customerNo}`,
    method: 'get'
  })
}

// 修改客户等级
export  function editCusLevel(data) {
  return request({
    url: `/admin/esequitycustinfo`,
    method: 'put',
    data: data
  })
}
