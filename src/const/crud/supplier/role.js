export const tableOption = {
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
  search: true,
  column: [
    {
      label: "角色ID",
      prop: "id",
      search: true,
      editDisplay: false,
      hide: true
    },
    {
      label: "角色编号",
      prop: "roleNum",
      search: true,
      editDisplay: false
    },
    {
      label: "角色名称",
      prop: "roleName",
      search: true,
      rules: [
        {
          required: true
        }
      ]
    },
    {
      label: "敏感数据控制",
      prop: "sensitiveData",
      search: true,
      type: "select",
      dicData: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ]
    },
    {
      label: "创建者",
      prop: "creater",
      search: false,
      editDisplay: false
    },
    {
      label: "创建时间",
      prop: "createTime",
      search: false,
      editDisplay: false
    },
    {
      label: "修改人",
      prop: "modifier",
      search: false,
      editDisplay: false
    },
    {
      label: "修改时间",
      prop: "modifyTime",
      search: false,
      editDisplay: false
    },
    {
      label: "备注",
      prop: "remark",
      search: false,
      editDisplay: false
    },
  ]
};
