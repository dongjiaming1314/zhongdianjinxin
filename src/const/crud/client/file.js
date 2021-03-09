export const tableOption = {
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: false,
  columnBtn: false,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  // menu: false,
  emptyBtnIcon: 'none',
  searchBtnIcon: 'none',
  searchBtnText: '查询',
  emptyBtnText: '重置',
  searchIcon: false,
  menuWidth: 80,
  column: [
	  {
      label: 'ID',
      prop: 'id',
      hide: true
    },
    {
      label: '客户姓名',
      fixed: true,
      prop: 'cusName',
      search: true,
      searchSpan:12,
      slot: true,
    },
	  {
      label: '客户号',
      prop: 'custNo',
      search: true,
      searchSpan:12,
    },
	  {
      label: '手机号码',
      prop: 'phoneNumber',
      search: true,
      searchSpan:12,
      minWidth: "120px",
    },
	  {
      label: '证件类型',
      prop: 'idType',
      search: true,
      searchSpan:12,
      type: 'select',
      dicUrl: '/admin/dict/type/id_type',
    },
	  {
      label: '证件号码',
      prop: 'idNumber',
      search: true,
      searchSpan:12,
      minWidth: "140px",
    },
	  {
      label: '所属机构',
      prop: 'affiliation',
      search: true,
      searchSpan:12,
      minWidth: "120px",
    },
	  {
      label: '成长等级',
      prop: 'levelCode',
      slot: true, // 自定义列
      formslot: true, // 自定义表单
      minWidth: "120px",
    //   search: true,
    //   type: 'select',
    //   searchSpan:12,
    },
	  {
      label: '创建时间',
      prop: 'creationTime',
      width: 170
    },
	  {
      label: '最后登陆时间',
      prop: 'lastLoginTime',
      width: 170
    },
	  {
      label: '最后登陆IP地址',
      width: 130,
      prop: 'lastLoginIpAddress'
    },
	  {
      label: '用户登陆历史记录',
      prop: 'userLoginHistory',
      hide: true
    },
	  {
      label: '备用字段1',
      prop: 'reserve1',
      hide: true
    },
	  {
      label: '备用字段2',
      prop: 'reserve2',
      hide: true
    },
	  {
      label: '备用字段3',
      prop: 'reserve3',
      hide: true
    },
	  {
      label: '备用字段4',
      prop: 'reserve4',
      hide: true
    },
  ]
}
export const cardOption = {
  index: true,
  indexLabel: '序号',
  stripe: true,
  searchLabelWidth: 100,
  menu: false,
  addBtn: false,
  columnBtn: false,
  refreshBtn: false,
  menuAlign: 'center',
  align: 'center',
  column: [
	  {
      label: '卡号',
      prop: 'cardNumber'
    },
	  {
      label: '所属银行',
      prop: 'bank'
    },
	  {
      label: '卡等级',
      prop: 'cardLevel'
    },
	  {
      label: '卡性质',
      prop: 'cardNature'
    },
	  {
      label: '卡属地',
      prop: 'cardDependencies'
    },
	  {
      label: '有效状态',
      prop: 'activeStatus'
    },
	  {
      label: '绑定时间',
      prop: 'bindtime',
      width: 160
    }
  ]
}

export const historyOption = {
  index: true,
  indexLabel: '序号',
  stripe: true,
  menu: false,
  addBtn: false,
  columnBtn: false,
  refreshBtn: false,
  menuAlign: 'center',
  align: 'center',
  column: [
	  {
      label: '登陆时间',
      prop: 'logintime',
      width: 160
    },
	  {
      label: '登陆渠道',
      prop: 'loginChannel'
    },
	  {
      label: '登陆IP',
      prop: 'loginIp'
    }
  ]
}

export const unboundOption = {
  index: true,
  indexLabel: '序号',
  stripe: true,
  menu: false,
  addBtn: false,
  columnBtn: false,
  refreshBtn: false,
  menuAlign: 'center',
  align: 'center',
  searchIcon: false,
  column: [
    {
      label: '卡号',
      prop: 'cardNumber'
    },
	  {
      label: '所属银行',
      prop: 'bank'
    },
	  {
      label: '操作',
      prop: 'operate'
    },
	  {
      label: '操作人',
      prop: 'operator'
    },
    {
      label: '操作流水号',
      prop: 'operatingFlowNumber'
    },
    {
      label: '操作状态',
      prop: 'actionStatus'
    },
    {
      label: '操作时间',
      prop: 'operationTime',
      width: 160
    },
  ]
}


export const addressOption = {
  index: true,
  indexLabel: '序号',
  stripe: true,
  menu: false,
  addBtn: false,
  columnBtn: false,
  refreshBtn: false,
  menuAlign: 'center',
  align: 'center',
  column: [
    {
      label: '是否为默认地址',
      prop: 'isDefaultAddress',
      type: 'select',
      dicUrl: '/admin/dict/type/default_address'
    },
	  {
      label: '省',
      prop: 'province'
    },
	  {
      label: '市',
      prop: 'city'
    },
	  {
      label: '区/镇',
      prop: 'area'
    },
    {
      label: '详细地址',
      prop: 'detailedAddress'
    },
    {
      label: '收货人',
      prop: 'receiver'
    },
    {
      label: '收货人手机号',
      prop: 'receiverPhoneNum',
    },
  ]
}
