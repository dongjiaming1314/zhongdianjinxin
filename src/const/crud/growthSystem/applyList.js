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
  // formWidth: '85%',
  searchBtnIcon: "none",
  emptyBtnIcon: "none",
  emptyBtnText: "重置",
  searchBtnText: "查询",
  searchLabelWidth: '110',
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
      searchSpan: "12"
    },
    {
      label: "状态",
      prop: "status",
      search: true,
      editDisplay: true,
      searchSpan: "12",
      type: "select",
      dicData: [
        { value: 1, label: "审核失败" },
        { value: 2, label: "待审核" },
        { value: 3, label: "草稿" }
      ]
    },
    {
      label: "申请操作",
      prop: "operation",
      search: false,
      editDisplay: true,
    },
    {
      label: "申请人",
      prop: "person",
      search: false,
      editDisplay: true,
    },
    {
      label: "申请时间",
      prop: "person",
      search: false,
      editDisplay: true,
    },
    {
      label: "审核人",
      prop: "person",
      search: false,
      editDisplay: true,
    },
    {
      label: "审核时间",
      prop: "person",
      search: false,
      editDisplay: true,
    },
    {
      label: "审核备注",
      prop: "person",
      search: false,
      editDisplay: true,
    }
  ]
};

export {
  tableOption
}
