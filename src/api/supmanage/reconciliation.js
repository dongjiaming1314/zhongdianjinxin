import request from "@/router/axios";

export function fetchList(query) {
  return request({
    url: "/supplier/essupplierinfo/getSupplierlist",
    method: "get",
    params: query
  });
}

// 开始对账
export function reconciliation(query) {
  return request({
    url: "/supplier/essupplierinfo/getSupplierlist",
    method: "get",
    params: query
  });
}


export function downLoad(query) {
  return request({
    url: "/supplier/essupplierinfo/getSupplierlist",
    method: "get",
    params: query
  });
}
