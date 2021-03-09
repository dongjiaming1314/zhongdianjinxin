import request from "@/router/axios";

export function fetchList(query) {
  return request({
    url: "/supplier/essupplierusermgr/getSupplierList",
    method: "get",
    params: query
  });
}

// 增加
export function addObj(data) {
  return request({
    url: "/supplier/essupplierusermgr/save",
    method: "post",
    data
  });
}

// 修改
export function editObj(data) {
  return request({
    url: "/supplier/essupplierusermgr/updateById",
    method: "post",
    data
  });
}

// 删除
export function delObj(data) {
  return request({
    url: "/supplier/essupplierusermgr/deleteByPrimaryIds",
    method: "post",
    data
  });
}
