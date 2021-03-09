export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  column: [
	  {
      label: '主键ID',
      prop: 'fsId'
    },
	  {
      label: '层级',
      prop: 'grade'
    },
	  {
      label: '树路径',
      prop: 'treePath'
    },
	  {
      label: '父级ID',
      prop: 'parentId'
    },
	  {
      label: '排序',
      prop: 'orders'
    },
	  {
      label: '名称',
      prop: 'name'
    },
	  {
      label: '普通图标',
      prop: 'normalIcon'
    },
	  {
      label: '高亮图标',
      prop: 'highlightIcon'
    },
	  {
      label: '类型：1-导航；2-功能',
      prop: 'type'
    },
	  {
      label: '类型：1-URL；2-离线包；3-原生',
      prop: 'jumpType'
    },
	  {
      label: '离线包编号',
      prop: 'offlineCode'
    },
	  {
      label: 'URL',
      prop: 'url'
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
      label: '版本',
      prop: 'version'
    },
	  {
      label: '逻辑删除标记(0--正常 1--删除)',
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
