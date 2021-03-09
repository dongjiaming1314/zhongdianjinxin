import request from "@/router/axios";

// 权益启用个数
export function getActiveEquityAmount() {
  return request({
    url: `/equity/esEquityInfo/getActiveEquityAmount`,
    method: "get",
  });
}

// 权益库存预警
export function getInventory() {
  return request({
    url: `/equity/esEquityInfo/inventory`,
    method: "get",
  });
}

// 权益库存告警量
export function getStatistics(params) {
  return request({
    url: `/equity/equityInventory/statistics`,
    method: "get",
    params: params
  });
}

// 获取对应等级获取数量
export function getCustLevelDetail(param) {
  return request({
    url: `/points/custLevel/getCustLevelDetail`,
    method: "get",
    params: param
  });
}

// 活动到期提醒
export function getDueActivities() {
  return request({
    url: `/actmgr/act/dueActivities`,
    method: "get",
  });
}
