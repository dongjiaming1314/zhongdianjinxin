import request from '@/router/axios'

export function fetchSelect() {
  return request({
    url: '/cms/festivaltheme/select',
    method: 'get',
  })
}

export function fetchList(query) {
  return request({
    url: '/cms/festivaltheme/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/festivaltheme',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/festivaltheme/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/festivaltheme/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/festivaltheme',
    method: 'put',
    data: obj
  })
}
