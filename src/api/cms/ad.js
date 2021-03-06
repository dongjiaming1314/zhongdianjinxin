import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/cms/ad/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/ad',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/ad/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/ad/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/ad',
    method: 'put',
    data: obj
  })
}
