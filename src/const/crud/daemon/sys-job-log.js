export const tableOption = {
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: false,
  columnBtn: false,
  menu: false,
  page: true,
  emptyBtnIcon: 'none', 
  searchBtnIcon: 'none',
  searchBtnText: '查询',
  emptyBtnText: '重置',
  searchIcon: false,
  filterBtn: false,
  editBtn: false,
  delBtn: false,
  addBtn: false,
  column: [
    {
      label: 'id',
      prop: 'jobLogId',
      hide: true
    },
    {
      label: '任务id',
      prop: 'jobId',
      hide: true
    },
    {
      label: '任务名称',
      prop: 'jobName',
      search: true,
      searchSpan: 12,
    },
    {
      label: '任务组名',
      prop: 'jobGroup',
      search: true,
      searchSpan: 12,
    },
    {
      label: '组内顺序',
      prop: 'jobOrder',
      hide: true
    },
    {
      label: '类型',
      prop: 'jobType',
      type: 'select',
      dicUrl: '/admin/dict/type/job_type',
      width: 100
    },
    {
      label: '执行文件',
      prop: 'className',
      overHidden: true
    },
    {
      label: '执行方法',
      prop: 'methodName',
      overHidden: true,
      width: 120,
    },
    {
      label: '执行参数值',
      prop: 'methodParamsValue',
      width: 100,
      overHidden: true
    },
    {
      label: 'cron表达式',
      prop: 'cronExpression',
      width: 100,
      overHidden: true
    },
    {
      label: '状态',
      prop: 'jobLogStatus',
      search: true,
      searchSpan: 12,
      type: 'select',
      dicUrl: '/admin/dict/type/job_execute_status',
      slot: true
    },
    {
      label: '状态描述',
      prop: 'jobMessage'
    },
    {
      label: '执行时间(ms)',
      prop: 'executeTime',
      width: 120,
    },
    {
      label: '异常信息',
      prop: 'exceptionInfo',
      overHidden: true,
    },
    {
      label: '开始时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      width: 160,
    }
  ]
};
