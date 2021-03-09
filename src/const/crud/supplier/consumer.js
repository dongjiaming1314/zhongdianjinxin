export const tableOption = {
  border: true,
  index: true,
  indexLabel: "用户号",
  stripe: true,
  addBtn: false,
  menuAlign: "center",
  align: "center",
  selection: true,
  columnBtn: false,
  refreshBtn: false,
  column: [
    {
      label: "员工姓名",
      prop: "employeeName",
      search: true,
      rules: [
        {
          required: true
        }
      ]
    },
    {
      label: "手机号码",
      prop: "phoneNum",
      search: true,
    },
    {
      label: "登陆账号",
      prop: "account",
      search: true,
    },
    {
      label: "所属机构",
      prop: "belong",
      search: true,
      type: "select",
      dicData: [
        {
          label: "折扣券",
          value: 0
        },
        {
          label: "抵扣券",
          value: 1
        },
        {
          label: "体验券",
          value: 2
        },
        {
          label: "其他",
          value: 3
        }
      ]
    },
    {
      label: "角色",
      prop: "roleId",
      search: true,
      type: "select",
      dicData: [
        {
          label: "折扣券",
          value: 0
        },
        {
          label: "抵扣券",
          value: 1
        },
        {
          label: "体验券",
          value: 2
        },
        {
          label: "其他",
          value: 3
        }
      ]
    },
    {
      label: "角色等级",
      prop: "roleLevel",
      search: false,
    },
    {
      label: "登录密码",
      prop: "password",
      search: false,
    },
    {
      label: "上次登录时间",
      prop: "lastLoginTime",
      search: false,
      editDisplay: false
    },
    {
      label: "创建人",
      prop: "createUser",
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
      prop: "modifyUser",
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
    },
  ]
};
