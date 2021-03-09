import request from '@/router/axios'

// 获取商品分类
export function getGoodsCategoryName(query) {
  return request({
    url: `/good/category/page`,
    method: 'get',
    params: query
  })
}
// 获取Sku属性
export function getSku(id) {
  return request({
    url: `/good/category/${id}`,
    method: 'get'
  })
}
