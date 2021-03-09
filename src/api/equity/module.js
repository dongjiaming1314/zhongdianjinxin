import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/equity/esequitymessage/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/equity/esequitymessage',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/equity/esequitymessage/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/equity/esequitymessage/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/equity/esequitymessage',
    method: 'put',
    data: obj
  })
}

export function putNumChangeObj(obj) {
  return request({
    url: '/equity/esequitymessage/putEquityNum',
    method: 'put',
    data: obj
  })
}
