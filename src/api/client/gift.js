import request from '@/router/axios'

// 条件查询
export function fetchList(query) {
    return request({
        url: '/cust/escustredpacklist/getCustInfoByCondition',
        method: 'get',
        params: query
    })
}

export function conditionFetch(id) {
    return request({
        url: `/cust/custgroup/getCustInfoVOByGroupNo/${id}`,
        method: 'get',
    })
}