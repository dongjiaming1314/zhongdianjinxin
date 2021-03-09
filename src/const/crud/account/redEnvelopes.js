export const queryTableOption={
    menu: false,//隐藏操作栏
    addBtn: false,
    searchBtnText:'查询',
    emptyBtnText:'重置',
    emptyBtnIcon: 'none',
    searchBtnIcon: 'none',
    columnBtn: false,
    refreshBtn: false,

    column: [{
      searchSpan:12,
      label: '客户姓名',
      prop: 'namex',
      fixed: true,
      search:true,
      overHidden:true
    },
    {
      searchSpan:12,
      label: '客户号',
      prop: 'name1',
      search:true,
      overHidden:true
    },
    {
      searchSpan:12,
      label: '账户ID',
      prop: 'name2',
      search:true,
      overHidden:true
    },
    {
      searchSpan:12,
      label: '证件类型',
      prop: 'name3',
      type: 'select',
      dicUrl: '',
      search:true,
      overHidden:true
    },
     {
      searchSpan:12,
      label: '证件号码',
      prop: 'name4',
      search:true,
      overHidden:true
    },
     {
      searchSpan:12,
      label: '手机号',
      prop: 'name5',
      search:true,
      overHidden:true
    },
      {
      searchSpan:12,
      label: '所属机构',
      prop: 'name6',
      search:false,
      overHidden:true
    },
    {
      searchSpan:12,
      label: '权益余量',
      prop: 'name',
      search:false,
      overHidden:true
    },
     {
      searchSpan:12,
      label: '上次登陆时间',
      minWidth: '120px',
      prop: 'name',
      searchValue:'small',
      search:false,
      overHidden:true,
      width: 160
    },
     {
      searchSpan:12,
      label: '登陆IP',
      prop: 'name',
      searchValue:'small',
      search:false,
      overHidden:true
    },
    {
      searchSpan:12,
      label: '登陆渠道',
      prop: 'name',
      searchValue:'small',
      search:false,
      overHidden:true
    },
    ]
}
export const equityOption = {
  columnBtn: false,
  refreshBtn: false,
  menu: false,//隐藏操作栏
  addBtn:false,
  align:'center',
  menuAlign:'center',
  column:[
     {
      label:'领取红包流水号',
      prop:'name1'
    },
    {
      label:'红包状态',
      prop:'name2'
    },
     {
      label:'红包金额',
      prop:'name3'
    },
     {
      label:'红包池编号',
      prop:'name4'
    },
     {
      label:'红包池名称',
      prop:'name5'
    },
     {
      label:'红包领取时间',
      prop:'name6',
      width: 160
    },
     {
      label:'红包打开时间',
      prop:'name7',
      width: 160
    },
     {
      label:'红包到期时间',
      prop:'name8',
      width: 160
    },
     {
      label:'到账卡号',
      prop:'name9'
    },
  ]
}
