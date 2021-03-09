const tableOption = {
  border: true,
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
      label: "成长等级名称",
      prop: "ruleName",
      search: true,
      editDisplay: true,
      searchSpan: "12"
    },
    {
      label: "状态",
      prop: "status",
      search: true,
      editDisplay: true,
      searchSpan: "12",
      searchslot:true
    },
    {
      label: "申请操作",
      prop: "ruleName",
      search: false,
      editDisplay: true,
    },
    {
      label: "申请人",
      prop: "ruleName",
      search: false,
      editDisplay: true,
    },
    {
      label: "申请时间",
      prop: "date",
      search: false,
      editDisplay: true,
    },
    {
      label: "审核人",
      prop: "ruleName",
      search: false,
      editDisplay: true,
    },
    {
      label: "审核时间",
      prop: "ruleName",
      search: false,
      editDisplay: true,
    },
    {
      label: "审核备注",
      prop: "ruleName",
      search: false,
      editDisplay: true,
    },
  ]
};

export {
  tableOption
}
