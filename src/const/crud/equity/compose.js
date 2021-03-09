export const tableOption = {
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  delBtn: false,
  columnBtn: false,
  refreshBtn: false,
  searchIcon: false,
  addBtn: false,
  editBtn: false,
  emptyBtnIcon: 'none', 
  searchBtnIcon: 'none',
  searchBtnText: '查询',
  emptyBtnText: '重置',
  searchLabelWidth: 100,
  column: [
    {
      label: '组合名称',
      prop: 'name',
      search: true,
      searchSpan:12,
      slot: true,
    },
	  {
      label: '组合ID',
      prop: 'id',
      search: true,
      searchSpan:12,
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '权益列表',
      prop: 'listEquitMessageId',
      hide: true,
    },
    {
      label: '组合库存',
      prop: 'number'
    },
    {
	    label: '组合发放模式',
	    prop: 'issueType',
      type: 'select',
      dicUrl: '/admin/dict/type/issueType',
      rules: [{
        required: true
      }]
	  },
    {
      label: '可选数量',
      prop: 'availCost',
      hide: true,
    },
    {
      label: '创建人ID',
      prop: 'createId',
      hide: true,
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '创建人',
      prop: 'createName',
      hide: true,
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '创建时间',
      prop: 'createTime',
      searchSpan:12,
      type: 'datetimerange',
      search:true,
      addDisplay: false,
      editDisplay: false,
      width: 160
    },
    {
      label: '修改人ID',
      prop: 'modifyId',
      hide: true,
      addDisplay: false,
      editDisplay: false
    },
	  {
      label: '修改人',
      prop: 'modifyName',
      hide: true,
      addDisplay: false,
      editDisplay: false
    },
	  {
      label: '修改时间',
      prop: 'modifyTime',
      hide: true,
      addDisplay: false,
      editDisplay: false,
      width: 160
    },
    {
      label: '是否删除',
      prop: 'delFlag',
      hide: true,
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '删除人ID',
      prop: 'delId',
      hide: true,
      addDisplay: false,
      editDisplay: false
    },
	  {
      label: '删除人',
      prop: 'delName',
      hide: true,
      addDisplay: false,
      editDisplay: false
    },
	  {
      label: '删除时间',
      prop: 'delTime',
      hide: true,
      addDisplay: false,
      editDisplay: false,
      width: 160
    },
	  {
      label: '备用字段1',
      prop: 'reserve1',
      hide: true,
      addDisplay: false,
      editDisplay: false
    },
	  {
	    label: '备用字段2',
	    prop: 'reserve2',
	    hide: true,
      addDisplay: false,
      editDisplay: false
	  },
    {
      label: '备用字段3',
      prop: 'reserve3',
      hide: true,
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '备用字段4',
      prop: 'reserve4',
      hide: true,
      addDisplay: false,
      editDisplay: false
    }
  ]
}

export const rightOption = {
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  delBtn: false,
  columnBtn: false,
  refreshBtn: false,
  searchIcon: false,
  addBtn: false,
  editBtn: false,
  menu: false,
  emptyBtnIcon: 'none', 
  searchBtnIcon: 'none',
  searchBtnText: '查询',
  emptyBtnText: '重置',
  searchLabelWidth: 100,
  column: [
    {
      label: '权益名称',
      prop: 'equiName',
    },
	  {
      label: '权益类型',
      prop: 'equityType',
    },
    {
      label: '权益目录',
      prop: 'equiCata',
    },
    {
      label: '所属商户',
      prop: 'clientId',
    },
    {
	    label: '权益库存',
	    prop: 'number',
      
    }
  ]
}