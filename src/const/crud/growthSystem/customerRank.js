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
      label: "客户等级名称",
      prop: "levelName",
      search: true,
      editDisplay: true,
      searchSpan: "12",
    },
    {
      label: "客户等级编码",
      prop: "levelCode",
      editDisplay: true,
      searchSpan: "12",
    },
    {
      label: "达标资产值（AUM）",
      prop: "aum",
      search: true,
      editDisplay: true,
      searchRange:false,
      searchSpan: "12",
      searchLabelWidth: "150",
      renderHeader: (h, { column, $index }) => {
        return h('span', 'AUM(万)')
      },
    },
  ]
};

