import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/dict/page',
    method: 'get',
    params: query
  })
}

export function fetchItemList(query) {
  return request({
    url: '/admin/dict/item/page',
    method: 'get',
    params: query
  })
}

export function addItemObj(obj) {0
  return request({
    url: '/admin/dict/item',
    method: 'post',
    data: obj
  })
}

export function getItemObj(id) {
  return request({
    url: '/admin/dict/item/id/' + id,
    method: 'get'
  })
}

export function delItemObj(obj) {
  return request({
    url: '/admin/dict/item/',
    method: 'delete',
    data:obj
  })
}

export function putItemObj(obj) {
  return request({
    url: '/admin/dict/item',
    method: 'put',
    data: obj
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/dict/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dict/' + id,
    method: 'get'
  })
}

export function delObj(row) {
  return request({
    url: '/admin/dict/type/' + row.type,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/dict/',
    method: 'put',
    data: obj
  })
}

export function remote(type) {
  return request({
    url: '/admin/dict/type/' + type,
    method: 'get'
  })
}

// 加的
export function getDictByType(type) {
  return request({
    url: '/admin/dict/item/type/' + type,
    method: 'get'
  })
}

export function getDictItem(item) {
  return request({
    url: '/admin/dict/item/value/',
    method: 'get',
    params: item
  })
}

export function getAllDict() {
  return request({
    url: '/admin/dict/all/',
    method: 'get'
  })
}
// 批量获取字典项
export function remoteDic(type) {
  return request({
    url: '/admin/dict/types/' + type,
    method: 'get'
  })
}

// 批量根据字典值获取对应字典项
export function getBatchDic(params) {
  return request({
    url: `/admin/dict/getLabelsByValues`,
    method: 'post',
    data: params
  })
}

