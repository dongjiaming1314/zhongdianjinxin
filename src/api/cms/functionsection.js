import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/cms/functionsection/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/functionsection',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/functionsection/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/functionsection/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/functionsection',
    method: 'put',
    data: obj
  })
}

export function fetchTree (query) {
  return request({
    url: '/cms/functionsection/tree',
    method: 'get',
    params: query
  })
}

export function fetchDefault() {
  return request({
    url: '/cms/functionsection/default',
    method: 'get',
  })
}
