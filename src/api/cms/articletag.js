import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/cms/articletag/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/articletag',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/articletag/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/articletag/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/articletag',
    method: 'put',
    data: obj
  })
}

export function fetchTagList() {
  return request({
    url: '/cms/articletag/list',
    method: 'get'
  })
}
