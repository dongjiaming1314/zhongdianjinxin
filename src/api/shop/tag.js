import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/mall/esmallmgrlabel/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/mall/esmallmgrlabel',
    method: 'post',
    data: obj
  })
}

// export function getObj(id) {
//   return request({
//     url: '/equity/esequitymessage/' + id,
//     method: 'get'
//   })
// }

export function delObj(id) {
  return request({
    url: '/mall/esmallmgrlabel/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/mall/esmallmgrlabel',
    method: 'put',
    data: obj
  })
}
