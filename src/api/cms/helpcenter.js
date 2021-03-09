import request from '@/router/axios'


export function fetchTree() {
  return request({
    url: '/cms/helpcenter/tree',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/cms/helpcenter/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/helpcenter',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/helpcenter/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/helpcenter/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/helpcenter',
    method: 'put',
    data: obj
  })
}
