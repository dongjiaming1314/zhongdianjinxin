import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/supplier/essupplieruser/getSupplierList',
    method: 'get',
    params: query
  })
}

export function getSupplierList (data) {
  return request({
    url: '',
    method: 'post',
    data: data
  })
}

export function getRole (data) {
  return request({
    url: '',
    method: 'post',
    data: data
  })
}
