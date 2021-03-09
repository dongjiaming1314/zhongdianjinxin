import request from "@/router/axios";

export function fetchList(query) {
    return request({
        url: "/supplier/business/businessList",
        method: "get",
        params: query
    });
}

// 增加
export function addObj(data) {
    return request({
        url: "/supplier/essupplierbusinessaudit/submit",
        method: "post",
        data
    });
}

// 修改
export function editObj(data) {
    return request({
        url: "/supplier/essupplierbusinessaudit/update",
        method: "put",
        data
    });
}
//草稿编辑
export function editDraft(data) {
    return request({
        url: "/supplier/essupplierbusinessaudit/draftUpdate",
        method: "put",
        data
    });
}

// 删除
export function delObj(data) {
    return request({
        url: "/supplier/essupplierinfo/removeById",
        method: "post",
        data
    });
}

// 启用
export function effectSup(data) {
    return request({
        url: "/supplier/essupplierinfo/effectSup",
        method: "post",
        data
    });
}

// 审核
export function examineSup(data) {
    return request({
        url: "/supplier/essupplierinfo/examineSup",
        method: "post",
        data
    });
}