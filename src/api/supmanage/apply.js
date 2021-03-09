import request from "@/router/axios";

export function fetchList(query) {
    return request({
        url: "/supplier/essupplierbusinessaudit/applyList",
        method: "get",
        params: query
    });
}