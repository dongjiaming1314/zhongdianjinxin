import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/device/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/device',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/device/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/device/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/device',
    method: 'put',
    data: obj
  })
}
