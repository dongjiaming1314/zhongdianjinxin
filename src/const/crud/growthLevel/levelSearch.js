const tableOption = {
  border: true,
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
  searchLabelWidth: '110',
  searchBtnIcon: "none",
  emptyBtnIcon: "none",
  searchBtnText: "查询",
  emptyBtnText: "重置",
  column: [
    {
      label: "id",
      prop: "id",
      search: false,
      editDisplay: false,
      hide: true
    },
    {
      label: "等级名称",
      prop: "levelName",
      search: true,
      editDisplay: true,
      searchSpan: "12",
      slot: "true"
    },
    {
      label: "升级经验值",
      prop: "ruleName",
      search: false,
      editDisplay: true,
    },
    {
      label: "可兑换权益",
      prop: "ruleName",
      search: false,
      editDisplay: true,
    },
    {
      label: "权益库存",
      prop: "ruleName",
      search: false,
      editDisplay: true,
    },
    {
      label: "创建人",
      prop: "ruleName",
      search: false,
      editDisplay: true,
    },
    {
      label: "创建时间",
      prop: "ruleName",
      search: true,
      editDisplay: true,
      searchSpan: "12",
      searchslot:true
    },
  ]
};

export {
  tableOption
}
