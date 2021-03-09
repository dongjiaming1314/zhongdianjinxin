import request from '@/router/axios'

export function getCustInfo(id) {
    return request({
        url: '/admin/esequitycustinfo/queryCustInfoByCustNo/' + id,
        method: 'get'
    })
}

export function getEquityInfo(params) {
    return request({
        url: '/equity/esEquityInfo/getEeuityInfoByLevelId',
        method: 'get',
        params: params
    })
}

export function getNextEquityInfo(params) {
    return request({
        url: '/points/custLevel/getNextAumByAum',
        method: 'get',
        params: params
    })
}

export function getReceiveEquity(params) {
    return request({
        url: '/cust/escustequity/appPage',
        method: 'get',
        params: params
    })
}