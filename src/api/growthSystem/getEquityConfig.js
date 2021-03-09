import request from "@/router/axios";

// 列表
export function fetchList(query) {
  return request({
    url: "/points/cust/level/equitys",
    method: "get",
    params: query
  });
}

// 新增
export function add(data) {
  return request({
    url: "/points/cust/level/equitys",
    method: "post",
    data
  });
}

// 修改
export function edit(data) {
  return request({
    url: "/points/cust/level/equitys",
    method: "put",
    data
  });
}

// 删除
export function del(params) {
  return request({
    url: "/points/cust/level/equitys",
    method: "delete",
    params
  });
}

// 查看详情
export function getDetail(params) {
  return request({
    url: "/points/cust/level/equitys/select/by/batchNumber",
    method: "get",
    params
  });
}

// 获取权益列表
export function fetchEquityList(params) {
  return request({
    url: "/equity/esEquityInfo/page",
    method: "get",
    params
  })
}
