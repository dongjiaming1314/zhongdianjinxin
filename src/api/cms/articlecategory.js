import request from '@/router/axios'

export function fetchCategoryTree() {
  return request({
    url: '/cms/articlecategory/tree',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/cms/articlecategory/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/cms/articlecategory',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/cms/articlecategory/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/cms/articlecategory/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/cms/articlecategory',
    method: 'put',
    data: obj
  })
}
