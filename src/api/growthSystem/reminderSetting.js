import request from "@/router/axios";

// // 查询列表
// export function getInfoList(query) {
//   return request({
//     url: `/points/cust/level/change/reminder`,
//     method: "get",
//     params: query
//   });
// }
//
// // 新增
// export function addInfo(params) {
//   return request({
//     url: `/points/cust/level/change/reminder`,
//     method: "post",
//     data: params
//   });
// }
//
// // 修改
// export function editInfo(params) {
//   return request({
//     url: `/points/cust/level/change/reminder`,
//     method: "put",
//     data: params
//   });
// }
//
// // 删除
// export function delInfo(id) {
//   return request({
//     url: `/points/cust/level/change/reminder`,
//     method: "delete",
//     params: {
//       id: id
//     }
//   });
// }


// 金字塔查询
export function getInfoList() {
    return request({
        url: `points/custLevel/selectListByNameAndAum`,
        method: "get",
    });
}
// 新增成长等级
export function addLevel(data) {
    return request({
        url: `/points/custLevel/addCustLevel`,
        method: "post",
        data
    });
}
// 修改成长等级
export function editLevel(data) {
    return request({
        url: `/points/custLevel/updateById`,
        method: "put",
        data
    });
}
// 删除成长等级
export function delLevel(id) {
    return request({
        url: `/points/custLevel/deleteByIds?ids=${id}`,
        method: "delete"
    });
}
// 修改权益
export function editEquity(params) {
    return request({
        url: `/points/cust/level/equitys`,
        method: "put",
        data: params
    });
}
// 新增阈值
export function addThreshold(params) {
    return request({
        url: `/points/custLevelChangeReminder/add`,
        method: "post",
        data: params
    });
}
// 修改阈值
export function editThreshold(params) {
    return request({
        url: `/points/custLevelChangeReminder/updatedByIdOrLevelId`,
        method: "put",
        data: params
    });
}
// 客户等级详情
export function getLevelDetail(id) {
    return request({
        url: `/points/custLevel/selectCustLevelVoById?id=${id}`,
        method: "get",
    });
}
// 客户等级权益详情
export function getLevelEquityDetail(id) {
    return request({
        url: `/points/custLevelEquitys/selectPageByLevelId?levelId=${id}`,
        method: "get",
    });
}
// 客户等级变更详情
export function getLevelChangeDetail(id) {
    return request({
        url: `/points/custLevelChangeReminder/selectByLevelId?levelId=${id}`,
        method: "get",
    });
}

// 客户等级权益详情新增
export function addLevelEquity(params) {
    return request({
        url: `/points/custLevelEquitys/addLevelEquity`,
        method: "post",
        data: params
    });
}

// 客户等级权益详情修改
export function updateLevelEquity(params) {
    return request({
        url: `/points/custLevelEquitys/updatedById`,
        method: "put",
        data: params
    });
}

//权益领取删除事件
export function deleteLevelEquity(id) {
    return request({
        url: `/points/custLevelEquitys/deleteBylevelId?levelId=${id}`,
        method: "delete",
    });
}
export function deleteLevelThreshold(id) {
    return request({
        url: `/points/custLevelChangeReminder/deleteByIdOrLevelId?levelId=${id}`,
        method: "delete",
    });
}