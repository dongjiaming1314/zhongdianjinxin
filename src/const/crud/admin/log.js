export const tableOption = {
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 150,
  dialogWidth: '85%',
  align: 'center',
  refreshBtn: false,
  showColumn: false,
  columnBtn: false,
  addBtn: false,
  editBtn: false,
  viewBtn: true,
  emptyBtnIcon: 'none', 
  searchBtnIcon: 'none',
  searchBtnText: '查询',
  emptyBtnText: '重置',
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '类型',
    prop: 'type',
    type: 'select',
    dicUrl: '/admin/dict/type/log_type',
    search: true,
    searchSpan: 12,
  }, {
    label: '标题',
    prop: 'title'
  }, {
    label: 'IP地址',
    prop: 'remoteAddr'
  }, {
    label: '请求方式',
    prop: 'method'
  }, {
    label: '客户端',
    prop: 'serviceId'
  }, {
    label: '请求时间',
    prop: 'time',
    width: 160
  }, {
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    width: 160
  }]
}
     