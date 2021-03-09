import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/equity/esequityredlogbundlepool/equityRedlogbundQueryPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/equity/esequityredlogbundlepool',
    method: 'post',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/equity/esequityredlogbundlepool/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/equity/esequityredlogbundlepool',
    method: 'put',
    data: obj
  })
}

export function getObj(id){
  return request({
    url: '/equity/esequityredlogbundlepool/' + id,
    method: 'get'
  })
}

