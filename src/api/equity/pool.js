import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/equity/esEquityInventoryAdjust/page',
    method: 'get',
    params: query
  })
}

// 库存修改
export function putObj(obj) {
    return request({
      url: '/equity/esEquityInventoryAdjust/submit',
      method: 'post',
      data: obj
    })
}

// 申请和审核列表查询

export function fetchApplyList(query) {
    return request({
      url: '/equity/esEquityInventoryAdjust/applyOrAuditPage',
      method: 'get',
      params: query
    })
  }
 

  // 审核申请 

export function verifyObj(obj) {
    return request({
      url: '/equity/esEquityInventoryAdjust/audit',
      method: 'post',
      data: obj
    })
}

// 撤销申请

export function backObj(obj) {
    return request({
      url: '/equity/esEquityInventoryAdjust/withdraw',
      method: 'post',
      data: obj
    })
}
// 删除申请

export function delVerifyObj(query) {
    return request({
      url: '/equity/esEquityInventoryAdjust/delete/',
      method: 'post',
      data: query
    })
  }


// 所属供应商
export function supplierBusiness(params){
  return request({
    url:'/supplier/business/businessList',
    method:'get',
    params:params
  })
}

// 查询明细
export function adjustDetailPage(params){
  return request({
    url:'/equity/esEquityInventoryAdjust/adjustDetailPage',
    method:'get',
    params:params
  })
}

// 查询时间昼的接口
export function adjustTotalDetailsPage(params){
  return request({
    url:'/equity/esEquityInventoryAdjust/adjustTotalDetailsPage',
    method:'get',
    params:params
  })
}