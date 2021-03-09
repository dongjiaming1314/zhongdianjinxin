import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/equity/esequitygroup/queryVO',
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

// 获取具体权益组合信息

export function fetchDetail(id) {
  return request({
    url: '/equity/esequitygroup/' + id,
    method: 'get'
  })
}

// 权益列表
export function fetchEquityList() {
  return request({
    url: '/equity/esequitymessage/allEquityMsg',
    method: 'get'
  })
}

// 选中权益获取

export function getChooseList(query) {
  return request({
    url: '/equity/esequitylist/equiNo',
    method: 'get',
    params: query
  })
}

// 
