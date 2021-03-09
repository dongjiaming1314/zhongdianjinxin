import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/cms/article/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/article',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/article/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/article/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/article',
    method: 'put',
    data: obj
  })
}
