export const tableOption = {
  index: false,
  indexLabel: "",
  stripe: true,
  addBtn: false,
  menuAlign: "center",
  align: "center",
  selection: true,
  columnBtn: false,
  refreshBtn: false,
  editBtn: false,
  delBtn: false,
  menu: true, //是否显示操作菜单栏
  // formWidth: '85%',
  searchBtnIcon: "none",
  emptyBtnIcon: "none",
  searchBtnText: "查询",
  emptyBtnText: "重置",
  menuPosition: "right",
  column: [
    {
      label: "姓名",
      prop: "userName",
      search: true,
      editDisplay: true,
      searchSpan: 12,
      searchLabelWidth: '100',
      slot: true,
      overHidden: true
    },
    {
      label: "手机号码",
      prop: "phoneNumber",
      search: true,
      editDisplay: false,
      searchSpan: 12,
      searchLabelWidth: '100',
      overHidden: true
    },
    {
      label: "登录账号",
      prop: "loginName",
      search: true,
      editDisplay: true,
      searchSpan: 12,
      searchLabelWidth: '100',
      overHidden: true
    },
    // {
    //   label: "所属供应商id",
    //   prop: "supId",
    //   search: false,
    //   editDisplay: true,
    //   hide: true
    // },
    {
      label: "所属供应商",
      prop: "supplierId",
      search: true,
      editDisplay: true,
      labelWidth: 12,
      searchSpan: 12,
      searchLabelWidth: '100',
      type: 'select',
      overHidden: true,
      dicData: [
        {label: '111', value: 1}
      ]
    },
    {
      label: "创建时间",
      prop: "createdTime",
      search: false,
      editDisplay: true,
      overHidden: true
    },
  ]
};
