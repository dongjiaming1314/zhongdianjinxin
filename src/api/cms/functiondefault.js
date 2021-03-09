import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/cms/functiondefault/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/functiondefault',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/functiondefault/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/functiondefault/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/functiondefault',
    method: 'put',
    data: obj
  })
}
