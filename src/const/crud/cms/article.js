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
  dialogFullscreen: true,
  viewBtn: true,
  column: [
    {
      label: '标题',
      prop: 'title',
      span: 24,
      rules: [{
        required: true,
        message: '请输入标题',
        trigger: 'blur'
      }]
    },
    {
      label: '文章分类',
      prop: 'acId',
      formslot: true,
      slot: true,
      rules: [{
        required: true,
        message: '请选择文章分类',
        trigger: 'blur'
      }],
    },
	  {
      label: '作者',
      prop: 'author',
      hide: true
    },
    {
      label: '是否发布',
      prop: 'isPublication',
      type: 'switch',
      slot: true
    },
    {
      label: '是否置顶',
      prop: 'isTop',
      type: 'switch',
      hide: true
    },
    {
      label: '文章标签',
      prop: 'tags',
      type: 'checkbox',
      dicUrl: '/cms/articletag/list',
      hide: true
    },
	  {
      label: '内容',
      prop: 'content',
      component: 'AvueUeditor',
      span: 24,
      rules: [{
        required: true,
        message: '请输入内容',
        trigger: 'blur'
      }],
      hide: true
    },
	  {
      label: '创建日期',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisplay: true,
      addDisplay: false,
      editDisabled: true,
      hide: true
    },
	  {
      label: '更新日期',
      prop: 'updateTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisplay: true,
      addDisplay: false,
      editDisabled: true,
      hide: true
    },
    /*
	  {
      label: '版本',
      prop: 'version'
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
    }*/
  ]
}
