import request from '@/router/axios'



export function test() {
    return request({
        url: '/admin/check/getDataById/6200/0a27a2f83e8a9c616c9385fbc6aeb39d',
        method: 'get'
    })
}
export function fetchList(query) {
    return request({
        url: '/equity/esEquityInfo/page',
        method: 'get',
        params: query
    })
}

//提交审核 
export function putObj(obj) {
    return request({
        url: '/equity/esEquityInfo/submit',
        method: 'post',
        data: obj
    })
}

// 申请 审核
export function getObj(query) {
    return request({
        url: '/equity/esEquityInfo/applyOrAuditPage',
        method: 'get',
        params: query
    })
}

// 审核申请 

export function verifyObj(obj) {
    return request({
        url: '/equity/esEquityInfo/audit',
        method: 'post',
        data: obj
    })
}

// 删除申请

export function delVerifyObj(query) {
    return request({
        url: '/equity/esEquityInfo/delete/',
        method: 'post',
        data: query
    })
}

// 撤销申请

export function backObj(obj) {
    return request({
        url: '/equity/esEquityInfo/withdraw',
        method: 'post',
        data: obj
    })
}

//查询供应商
export function getSupplier(params) {
    return request({
        url: '/supplier/business/businessList',
        method: 'get',
        params: params
    })
}