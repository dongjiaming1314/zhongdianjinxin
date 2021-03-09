export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  editBtn: false,
  delBtn: false,
  addBtn: false,
  column: [
	  {
      label: '排序',
      prop: 'sort'
    },
	  {
      label: '名称',
      prop: 'name'
    },
	  {
      label: '页面描述',
      prop: 'seoDescription'
    },
	  {
      label: '页面关键词',
      prop: 'seoKeywords'
    },
	  {
      label: '页面标题',
      prop: 'seoTitle'
    },
	  {
      label: '上级分类',
      prop: 'parentId'
    },
	  {
      label: '创建时间',
      prop: 'createTime',
      width: 160
    },
	  {
      label: '更新时间',
      prop: 'updateTime',
      width: 160
    },
	  {
      label: '是否删除  -1：已删除  0：正常',
      prop: 'delFlag'
    },
	  {
      label: '租户ID',
      prop: 'tenantId'
    },
	  {
      label: '应用ID',
      prop: 'appId'
    },
	  {
      label: '应用空间',
      prop: 'workspaceId'
    },
  ]
}
