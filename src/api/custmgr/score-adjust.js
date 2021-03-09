import request from '@/router/axios'

export function getCustScoreHisData(query) {
  return request({
    url: '/custmgr/socreAdjust/queryCustSocreHis',
    method: 'get',
    params: query
  })
}
