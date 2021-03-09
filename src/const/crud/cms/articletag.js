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
  viewBtn: true,
  column: [
    {
      label: 'ID',
      prop: 'atId',
      hide: true,
      addDisplay: false,
      editDisabled: true
    },
    {
      label: '名称',
      prop: 'name',
      span: 24,
      rules: [{
        required: true,
        message: '请输入名称',
        trigger: 'blur'
      }]
    },
    {
      label: '备注',
      prop: 'memo',
      span: 24
    },
    {
      label: '排序',
      prop: 'sort',
      type: 'number'
    },
    {
      label: '创建日期',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisplay: true,
      addDisplay: false,
      editDisabled: true
    },
    {
      label: '修改日期',
      prop: 'updateTime',
      hide: true,
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisplay: false,
      addDisplay: false
    },
    /*
    {
      label: '版本',
      prop: 'version'
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
