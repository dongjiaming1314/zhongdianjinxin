import request from "@/router/axios";

export function fetchList(query) {
    return request({
        url: "/supplier/essupplierbusinessaudit/checkList",
        method: "get",
        params: query
    });
}

// 审核
export function checkHandle(data) {
    return request({
        url: "/supplier/essupplierbusinessaudit/audit",
        method: "post",
        data
    });
}