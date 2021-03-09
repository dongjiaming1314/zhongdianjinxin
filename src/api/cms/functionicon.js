import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/cms/functionicon/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/functionicon',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/functionicon/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/functionicon/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/functionicon',
    method: 'put',
    data: obj
  })
}

export function fetchIcon(query) {
  return request({
    url: '/cms/functionicon',
    method: 'get',
    params: query
  })
}
