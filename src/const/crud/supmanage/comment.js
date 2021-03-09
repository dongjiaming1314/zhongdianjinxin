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
  menu: false, //是否显示操作菜单栏
  // formWidth: '85%',
  searchBtnIcon: "none",
  emptyBtnIcon: "none",
  searchBtnText: "查询",
  emptyBtnText: "重置",
  menuPosition: "right",
  column: [
    {
      label: "商品名称",
      prop: "userName",
      search: true,
      searchSpan: 12,
      searchLabelWidth: '100',
      slot: true,
      overHidden: true
    },
    {
      label: "订单号",
      prop: "phoneNum",
      search: true,
      searchSpan: 12,
      searchLabelWidth: '100',
      overHidden: true
    },
    {
      label: "客户名称",
      prop: "userNo",
      search: true,
      searchSpan: 12,
      searchLabelWidth: '100',
      overHidden: true
    },
    {
      label: "评价时间",
      prop: "commentTime",
      search: true,
      labelWidth: 12,
      searchSpan: 12,
      searchLabelWidth: '100',
      type: "daterange",
      overHidden: true
    },
    {
      label: "分类",
      prop: "password",
      search: true,
      type: 'select',
      searchSpan: 12,
      searchLabelWidth: '100',
      overHidden: true,
      dicData: [{value: 1, label: "好评"}]
    }
  ]
};
