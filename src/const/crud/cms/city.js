export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  column: [
	  {
      label: '城市编号',
      prop: 'code',
      rules: [
        {
          required: true,
          message: '请输入城市编号', 
          trigger: 'blur'
        }
      ]
    },
	  {
      label: '名称',
      prop: 'name',
      rules: [
        {
          required: true,
          message: '请输入名称', 
          trigger: 'blur'
        }
      ]
    },
    /*
	  {
      label: '图标',
      prop: 'icon'
    },
    */
	  {
      label: '拼音',
      prop: 'pinyin',
      rules: [
        {
          required: true,
          message: '请输入拼音', 
          trigger: 'blur'
        }
      ]
    },
	  {
      label: '首字母',
      prop: 'initial', 
      maxlength: 1,
      rules: [
        {
          required: true,
          message: '请输入首字母', 
          trigger: 'blur'
        }
      ]
    },
	  {
      label: '热门标识',
      prop: 'hotFlag',
      type: 'switch',
      slot: true
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
      label: '逻辑删除标记(0正常 1删除)',
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
    },*/
  ]
}
