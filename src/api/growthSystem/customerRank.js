import request from "@/router/axios";

// 列表
export function fetchList(query) {
  return request({
    url: "/points/cust/level",
    method: "get",
    params: query
  });
}

// 新增
export function add(data) {
  return request({
    url: "/points/cust/level",
    method: "post",
    data
  });
}

// 修改
export function edit(data) {
  return request({
    url: "/points/cust/level",
    method: "put",
    data
  });
}

// 删除
export function del(params) {
  return request({
    url: "/points/cust/level",
    method: "delete",
    params
  });
}
