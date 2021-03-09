import request from '@/router/axios'

//权益账户列表
export function getList(params) {
    return request({
        url: '/equity/esEquityAcct/page',
        method: 'get',
        params: params
    })
}

//新增解冻冻结申请
export function saveFrzApply(params) {
    return request({
        url: '/equity/esEquityAcctFrzOrThawApply',
        method: 'post',
        data: params
    })
}

//修改解冻冻结申请
export function updateFrzApply(params) {
    return request({
        url: '/equity/esEquityAcctFrzOrThawApply',
        method: 'put',
        data: params
    })
}

//删除解冻冻结申请
export function deleteFrzApply(id) {
    return request({
        url: '/equity/esEquityAcctFrzOrThawApply/' + id,
        method: 'delete',
    })
}

//新增解冻冻结审核
export function saveFrzAudit(params) {
    return request({
        url: '/equity/esEquityAcctFrzOrThawAudit',
        method: 'post',
        data: params
    })
}


//新增调整审核
export function saveAdjustAudit(params) {
    return request({
        url: '/equity/esEquityAdjustAudit',
        method: 'post',
        data: params
    })
}


//删除解冻冻结审核
export function deleteFrzAudit(id) {
    return request({
        url: '/equity/esEquityAcctFrzOrThawAudit/' + id,
        method: 'delete',
    })
}

//新增权益账户调整申请表
export function saveAdjustApply(params) {
    return request({
        url: '/equity/esEquityAdjustApply',
        method: 'post',
        data: params
    })
}

//申请列表
export function getApplyList(params) {
    return request({
        url: '/equity/esEquityAcct/applyPage',
        method: 'get',
        params: params
    })
}
//审核列表
export function getCheckList(params) {
    return request({
        url: '/equity/esEquityAcct/auditPage',
        method: 'get',
        params: params
    })
}

//修改权益账户调整申请表
export function updateAdjustApply(params) {
    return request({
        url: '/equity/esEquityAdjustApply',
        method: 'put',
        data: params
    })
}


//删除权益账户调整申请表
export function deleteAdjustApply(id) {
    return request({
        url: '/equity/esEquityAdjustApply/' + id,
        method: 'delete',
    })
}

//权益审核跑批任务
export function equityJob() {
    return request({
        url: '/equity/esEquityAcct/equityJob',
        method: 'get',
    })
}