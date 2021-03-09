export const tableOption = {
  stripe: true,
  searchLabelWidth: 100,
  selection: true,
  menuAlign: 'center',
  align: 'center',
  delBtn: false,
  columnBtn: false,
  refreshBtn: false,
  addBtn: false,
  menuWidth: 80,
  editBtn: false,
  searchIcon: false,
  emptyBtnIcon: 'none',
  searchBtnIcon: 'none',
  searchBtnText: '查询',
  emptyBtnText: '重置',
  menu: false,
  column: [
    {
      label: '客户姓名',
      prop: 'cusName',
      search: true,
      searchSpan: 12,
      slot: true,
      fixed: true,
    },
    {
      label: '客户号',
      prop: 'custNo',
      // hide: true,
      search: true,
      searchSpan: 12,
      // addDisplay: false,
      // editDisplay: false
    },
    {
      label: '证件类型',
      prop: "idType",
      search: true,
      searchSpan: 12,
      type: 'select',
      dicUrl: '/admin/dict/type/id_type',
    },
    {
      label: '证件号码',
      prop: 'idNumber',
      search: true,
      searchSpan: 12,
      minWidth: 140
    },
    {
      label: '成长等级',
      prop: 'levelName',
      // search: true,
      // hide: true,
      searchSpan: 12,
      type: 'select',

    }, {
      label: '手机号',
      prop: "phoneNumber",
      search: true,
      searchSpan: 12,
      minWidth: 130
    },
    {
      label: '所属机构',
      prop: 'affiliation',
      search: true,
      searchSpan: 12,
      minWidth: 130

    },
    {
      label: '权益总量',
      prop: 'number'
      // hide: true,
    },
    {
      label: '上次登陆时间',
      prop: 'lastLoginTime',
      width: 160

    },
    {
      label: '登陆IP',
      prop: 'lastLoginIpAddress',
      minWidth: 130
    }
  ]
}

export const applyOption = {
  stripe: true,
  searchLabelWidth: 100,
  menuAlign: 'center',
  align: 'center',
  delBtn: false,
  columnBtn: false,
  refreshBtn: false,
  addBtn: false,
  editBtn: false,
  emptyBtnIcon: 'none',
  searchBtnIcon: 'none',
  searchBtnText: '查询',
  emptyBtnText: '重置',
  searchIcon: false,
  menu: false,
  column: [
    {
      label: '客户姓名',
      prop: 'cusName',
      search: true,
      searchSpan: 12,
      fixed: true,
    },
    {
      label: '客户号',
      prop: 'custNo',
      // addDisplay: false,
      // editDisplay: false
    },
    {
      label: '手机号码',
      prop: 'phoneNumber'

    },
    {
      label: '状态',
      prop: "checkStatus",
      search: true,
      searchSpan: 12,
      type: 'select',
      dicUrl: '/admin/dict/type/verify_status',
    },
    {
      label: '类型',
      prop: 'checkType',
    },
    {
      label: '申请人',
      prop: 'createdBy'
    },

    {
      label: '申请时间',
      prop: 'createdTime',
      width: 160
    },
    {
      label: '审核人',
      prop: 'checkBy',
      // prop: 'number'
    },
    {
      label: '审核时间',
      prop: 'checkTime',
      width: 160
      // prop: 'issueType',

    },
    {
      label: '审核备注',
      prop: 'checkMark'

    },
  ]
}

export const verifyOption = {
  stripe: true,
  searchLabelWidth: 100,
  menuAlign: 'center',
  align: 'center',
  delBtn: false,
  columnBtn: false,
  refreshBtn: false,
  editBtn: false,
  searchIcon: false,
  addBtn: false,
  emptyBtnIcon: 'none',
  searchBtnIcon: 'none',
  searchBtnText: '查询',
  emptyBtnText: '重置',
  menu: false,
  column: [
    {
      label: '客户姓名',
      prop: 'cusName',
      search: true,
      searchSpan: 12,
    },
    {
      label: '客户号',
      prop: 'custNo',
      // addDisplay: false,
      // editDisplay: false
    },
    {
      label: '手机号码',
      prop: 'phoneNumber'

    },
    {
      label: '状态',
      // search: true,
      searchSpan: 12,
      type: 'select',
      hide: true,
      // dicUrl: '/admin/dict/type/id_type',
    },
    {
      label: '是否审核',
      prop: 'isAudit',
      search: true,
      searchSpan: 12,
      type: 'select',
      dicUrl: '/admin/dict/type/default_address',
    },
    {
      label: '类型',
      prop: 'checkType',
    },
    {
      label: '申请人',
      prop: 'createdBy',
    },

    {
      label: '申请时间',
      prop: 'createdTime',
      width: 160
    },
    {
      label: '审核人',
      prop: 'checkBy',
      // prop: 'number'
    },
    {
      label: '审核时间',
      prop: 'checkTime',
      // prop: 'issueType',
      type:'datetime',
      search: true,
      searchSpan: 12,
      width: 160
    },
    {
      label: '审核备注',
      prop: 'checkMark'
    },
  ]
}

export const detailOption = {
  stripe: true,
  index: true,
  indexLabel: '序号',
  menuAlign: 'center',
  align: 'center',
  delBtn: false,
  columnBtn: false,
  refreshBtn: false,
  addBtn: false,
  editBtn: false,
  searchLabelWidth: 100,
  menu: false,
  emptyBtnIcon: 'none',
  searchBtnIcon: 'none',
  searchBtnText: '查询',
  emptyBtnText: '重置',
  column: [
    {
      label: '权益名称',
      prop: 'equityName',
    },
    {
      label: '权益编码',
      prop: 'equityId',
    },
    {
      label: '权益类型',
      prop: 'equityType',
      dicUrl: '/admin/dict/type/equity_type',
    },
    {
      label: '生效开始时间',
      prop: 'startTime',
      width: 160
    },
    {
      label: '生效结束时间',
      prop: 'endTime',
      width: 160
    },
    {
      label: '权益状态',
      prop: 'equityUseStatus',
      dicUrl: '/admin/dict/type/equity_use_status',
    },
    {
      label: '领取日期',
      prop: 'createdTime',
      width: 160
    },
    {
      label: '权益到期日',
      prop: 'dateOfValidity',
      width: 160
    },
  ]
}

export const useOption = {
  stripe: true,
  index: true,
  indexLabel: '序号',
  menuAlign: 'center',
  align: 'center',
  menu: false,
  delBtn: false,
  columnBtn: false,
  refreshBtn: false,
  addBtn: false,
  editBtn: false,
  emptyBtnIcon: 'none',
  searchBtnIcon: 'none',
  column: [
    {
      label: '权益名称',
      prop: 'equityName',
    },
    {
      label: '权益编号',
      prop: 'equityId',
    },
    {
      label: '使用日期',
      prop: 'consmDate',
      width: 160
    },
    {
      label: '使用渠道',
      prop: 'channelType',
      dicUrl: '/admin/dict/type/equity_channel_type',
    },
    {
      label: '供应商名称',
      prop: 'supplierName',
    },
  ]
}


