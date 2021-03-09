import request from "@/router/axios";

export function fetchList(query) {
  return request({
    url: "/supplier/essupplierinfo/getSupplierlist",
    method: "get",
    params: query
  });
}

// 屏蔽
export function shieldComment(data) {
  return request({
    url: "/supplier/essupplierinfo/getSupplierlist",
    method: "post",
    data
  });
}

// 回复
export function replyComment(data) {
  return request({
    url: "/supplier/essupplierinfo/getSupplierlist",
    method: "post",
    data
  });
}

//  置顶
export function setTopComment(data) {
  return request({
    url: "/supplier/essupplierinfo/getSupplierlist",
    method: "post",
    data
  });
}
