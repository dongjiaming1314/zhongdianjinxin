import request from '@/router/axios'

export function getCustBlackListData(query) {
  return request({
    url: '/custmgr/socreAdjust/queryCustBlackList',
    method: 'get',
    params: query
  })
}

export function postCustBlackApplyData(obj) {
  return request({
    url: '/custmgr/custBlack/custBlackApply',
    method: 'post',
    data: obj
  })
}
