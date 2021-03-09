import request from '@/router/axios'

// 账户积分查询
export function getEsIntegralAcct(query) {
    return request({
        url: `/points/esIntegralAcct/page`,
        method: 'get',
        params: query
    })
}

// 调整
export function applyEsIntegralAdjust(params) {
    return request({
        url: `/points/esIntegralAdjustApply`,
        method: 'post',
        data: params
    })
}

// 冻结freezeType：1 or 解冻freezeType：2
export function applyEsIntegralFrzorThaw(params) {
    return request({
        url: `/points/esIntegralFrzorThawApply`,
        method: 'post',
        data: params
    })
}

//二级查询列表
export function getIntegralYear(params) {
    return request({
        url: `/points/esIntegralYearAcct/page`,
        method: 'get',
        params: params
    })
}
//三级列表
export function getYearRule(params) {
    return request({
        url: `/points/esIntegralYearRule/page`,
        method: 'get',
        params: params
    })
}


//明细列表查询
export function getIntegralFlow(params) {
    return request({
        url: `/points/esIntegralFlow/page`,
        method: 'get',
        params: params
    })
}



//审核列表
export function getCheckList(params) {
    return request({
        url: `points/esIntegralAcct/auditPage`,
        method: 'get',
        params: params
    })
}

//审核调整按钮
export function saveAdjustAudit(params) {
    return request({
        url: `points/esIntegralAdjustAudit`,
        method: 'post',
        data: params
    })
}

// 审核冻结按钮
export function saveFrzAudit(params) {
    return request({
        url: `points/esIntegralFrzorThawAudit`,
        method: 'post',
        data: params
    })
}

//积分账号审核跑批任务
export function pointsJob() {
    return request({
        url: '/points/esIntegralAdjustAudit/audit',
        method: 'get',
    })
}