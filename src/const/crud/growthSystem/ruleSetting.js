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
  emptyBtnText: "重置",
  searchBtnText: "查询",
  column: [
    {
      label: "id",
      prop: "id",
      search: false,
      editDisplay: false,
      hide: true
    },
    {
      label: "规则名称",
      prop: "ruleName",
      search: true,
      editDisplay: true,
      searchSpan: "12",
      slot: true
    },
    {
      label: "规则状态",
      prop: "ruleStatus",
      search: true,
      editDisplay: true,
      searchSpan: "12",
      searchslot:true,
    },
    {
      label: "生效开始时间",
      prop: "startTime",
      search: true,
      editDisplay: true,
      searchRange:false,
      type: 'date',
      searchSpan: "12",
    },
    {
      label: "生效结束时间",
      prop: "endTime",
      search: true,
      editDisplay: true,
      searchSpan: "12",
      searchRange:false,
      type:'date',
    },
    {
      label: "条件数量",
      prop: "total",
      search: false,
      editDisplay: true,
      searchSpan: "12"
    },
    {
      label: "条件关系",
      prop: "relationship",
      search: false,
      editDisplay: true,
    }


  ]
};

export {
  tableOption
}
