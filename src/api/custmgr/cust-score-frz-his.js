import request from '@/router/axios'

export function getCustScoreFrzHisData(query) {
  return request({
    url: '/custmgr/custScoreFrzHis/queryCustScoreFrzHisByParam',
    method: 'get',
    params: query
  })
}
