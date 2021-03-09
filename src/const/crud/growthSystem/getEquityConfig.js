export const tableOption = {
  border: false,
  index: true,
  indexLabel: "序号",
  stripe: true,
  addBtn: false,
  menuAlign: "center",
  align: "center",
  selection: false,
  columnBtn: false,
  refreshBtn: false,
  editBtn: false,
  delBtn: false,
  menu: true, //是否显示操作菜单栏
  searchLabelWidth: '110',
  searchBtnIcon: "none",
  emptyBtnIcon: "none",
  emptyBtnText: "重置",
  searchBtnText: "查询",
  column: [
    {
      label: "客户等级",
      prop: "levelName",
      search: true,
      editDisplay: true,
      searchSpan: "12",
      searchslot: true
    },
    {
      label: "权益类型",
      prop: "equityType",
      editDisplay: true,
      searchSpan: "12",
      dicUrl: "admin/dict/type/equity_type"
    },
    // {
    //   label: "权益编码",
    //   prop: "equityId",
    //   editDisplay: true,
    // },
    // {
    //   label: "权益名称",
    //   prop: "ruleStatus",
    //   editDisplay: true,
    //   searchSpan: "12",
    // },
    // {
    //   label: "领取次数",
    //   prop: "number",
    //   editDisplay: true,
    //   searchSpan: "12",
    // },
    {
      label: "是否启用",
      prop: "enabled",
      editDisplay: true,
      searchSpan: "12",
      dicData: [
        {label: "启用", value: "0"},
        {label: "不启用", value: "1"},
      ]
    },
  ]
};

