

import request from '@/router/axios'

export function addObj(obj) {
  return request({
    url: '/admin/gateway',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/gateway/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/gateway/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/gateway',
    method: 'put',
    data: obj
  })
}

export function getVo(query) {
  return request({
    url: '/admin/gateway',
    method: 'get',
    params: query
  })
}
