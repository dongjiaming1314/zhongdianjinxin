import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/cust/escustequity/queryCustQuity',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/equity/esequitygroup',
    method: 'post',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/equity/esequitygroup/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/equity/esequitygroup',
    method: 'put',
    data: obj
  })
}

// 详情权益列表
export function getEquityList(param) {
  return request({
    url: `/cust/escustequity/appPage`,
    method: 'get',
    params: param
  })
}
// 详情权益使用列表
export function getEquityUseList(param) {
  return request({
    url: `/cust/escustequity/getCustEquityConsumePage`,
    method: 'get',
    params: param
  })
}

