import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/cms/city/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/city',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/city/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/city/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/city',
    method: 'put',
    data: obj
  })
}
