import request from '@/router/axios'

export function getCustInfoListData(query) {
  return request({
    url: '/custmgr/custInfo/getCustInfoByParam',
    method: 'get',
    params: query
  })
}

export function postScoreFrzData(obj) {
  return request({
    url: '/custmgr/custScoreFrzHis/saveCustScoreFrzHis',
    method: 'post',
    data: obj
  })
}

export function postScoreAdjustData(obj) {
  return request({
    url: '/custmgr/socreAdjust/saveCustSocreAdjustApply',
    method: 'post',
    data: obj
  })
}

export function postBlackApplyData(obj) {
  return request({
    url: '/custmgr/custBlack/custBlackApply',
    method: 'post',
    data: obj
  })
}

export function getEquitiesListData(query) {
  return request({
    url: '/custmgr/custEquities/queryCustEquities',
    method: 'get',
    params: query
  })
}
