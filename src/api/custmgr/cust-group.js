import request from '@/router/axios'

/**
 * 搜索
 */
export function getCustGroupPage(params) {
  return request({
    url: '/custmgr/custGroup/getCustGroupPage',
    method: 'get',
    params: params
  })
}

/**
 * 添加客户组
 */
export function saveCustGroup(params) {
  return request({
    url: '/custmgr/custGroup/saveCustGroup',
    method: 'post',
    data: params
  })
}

/**
 * 根据编号查询客户组
 */
export function getByGroupNo(groupNo) {
  return request({
    url: `/custmgr/custGroup/getByGroupNo/${groupNo}`,
    method: 'get',
  })
}

/**
 * 修改客户组
 */
export function updateCustGroup(params) {
  return request({
    url: '/custmgr/custGroup/updateCustGroup',
    method: 'post',
    data: params
  })
}

/**
 * 客户组导入客户
 */
export function addCustByExcel(file, groupNo) {
  const formData = new FormData();
  formData.append('file', file);
  return request({
    url: `/custmgr/custGroup/addCustByExcel/${groupNo}`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

/**
 * 下载客户组导入模板
 */
export function downloadTemplate() {
  return request({
    url: '/custmgr/custGroup/downloadTemplate',
    responseType: 'arraybuffer',
    method: 'get',
  })
}

/**
 * 删除客户组
 */
export function removeByGroupNo(groupNo) {
  return request({
    url: `/custmgr/custGroup/removeByGroupNo/${groupNo}`,
    method: 'post',
  })
}

/**
 * 保存客户组积分调整信息
 */
export function saveCustGroupAdjust(params) {
  console.log(params)
  return request({
    url: '/custmgr/custGroup/saveCustGroupAdjust',
    method: 'post',
    data: params
  })
}

/**
 * 保存客户组积分冻结信息
 */
export function saveCustGroupFrz(params) {
  console.log(params)
  return request({
    url: '/custmgr/custGroup/saveCustGroupFrz',
    method: 'post',
    data: params
  })
}

/**
 * 保存客户组黑名单调整信息
 */
export function saveCustGroupBlk(params) {
  console.log(params)
  return request({
    url: '/custmgr/custGroup/saveCustGroupBlk',
    method: 'post',
    data: params
  })
}