export const tableOption = {
  index: false,
  indexLabel: "",
  stripe: true,
  addBtn: false,
  menuAlign: "center",
  align: "center",
  selection: false,
  columnBtn: false,
  refreshBtn: false,
  editBtn: false,
  delBtn: false,
  emptyBtn: false,
  menu: true, //是否显示操作菜单栏
  // formWidth: '85%',
  searchBtnText: "开始",
  searchBtnIcon: "none",
  emptyBtnIcon: "none",
  menuPosition: "right",
  column: [
    {
      label: "数据日期",
      prop: "userName",
      type: "date",
      search: true,
      searchSpan: 12,
      searchLabelWidth: '100',
      overHidden: true
    },
    {
      label: "跑批日期",
      prop: "phoneNum",
      searchSpan: 12,
      searchLabelWidth: '100',
      overHidden: true
    },
    {
      label: "记录",
      prop: "userNo",
      searchSpan: 12,
      searchLabelWidth: '100',
      overHidden: true
    }
  ]
}
