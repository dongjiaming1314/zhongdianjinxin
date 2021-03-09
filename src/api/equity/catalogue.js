import request from '@/router/axios'



// 树状信息 1 1级以及其下的目录；2 2级以及2级下的目录
export function getAllList(level) {
    return request({
        url: '/equity/esequitycatalog/getCatalogWithChildList/' + level,
        method: 'get'
    })
}

// 获取目录详情
export function getObj(id) {
    return request({
        url: `/equity/esequitycatalog/${id}`,
        method: 'get'
    })
}

// 获取上级目录
export function getParent(id) {
    return request({
        url: `/equity/esequitycatalog/getParentCatalogList/${id}`,
        method: 'get'
    })

}
// 添加目录
export function addObj(obj) {
    return request({
        url: '/equity/esequitycatalog',
        method: 'post',
        data: obj
    })
}
// 修改目录
export function putObj(obj) {
    return request({
        url: '/equity/esequitycatalog',
        method: 'put',
        data: obj
    })
}
// 删除
export function delObj(id) {
    return request({
        url: '/equity/esequitycatalog/' + id,
        method: 'delete'
    })
}

// 查询目录
export function fetchList(query) {
    return request({
        url: '/equity/esequitycatalog/getCataList',
        method: 'get',
        params: query
    })
}

// 查询下一级目录
export function fetchNextList(query) {
    return request({
        url: '/equity/esequitycatalog/query',
        method: 'get',
        params: query
    })
}










export function getEquityList(query) {
    return request({
        url: '/equity/esequitycatalog/getCataList',
        method: 'get',
        params: query
    })
}


// 目录详情获取

export function getDetail(id) {
    return request({
        url: '/equity/esequitycatalog/' + id,
        method: 'get'
    })
}

// 全部信息

export function getData(query) {
    return request({
        url: 'equity/esequitycatalog/getCataListByCondition',
        method: 'get',
        params: query

    })
}