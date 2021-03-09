import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/cms/launch/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/launch',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/launch/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/launch/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/launch',
    method: 'put',
    data: obj
  })
}
