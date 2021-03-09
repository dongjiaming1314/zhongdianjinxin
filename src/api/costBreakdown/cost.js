import request from '@/router/axios'

// 权益成本明细
export function getEquityList(params) {
  return request({
    url: `/equity/equity/cost/detail`,
    method: 'get',
    params
  })
}

// 积分成本明细
export function getCustList(params) {
  return request({
    url: `/cust/integral/cost/detail`,
    method: 'get',
    params
  })
}

// 下载
export function downLoadByName(fileName) {
  return request({
    url: `/admin/esequitycustinfo/select/avatar/url/${fileName}`,
    method: 'get',
  })
}
