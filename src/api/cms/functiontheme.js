import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/cms/functiontheme/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/functiontheme',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/functiontheme/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/functiontheme/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/functiontheme',
    method: 'put',
    data: obj
  })
}
