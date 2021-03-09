export const statusMap = [
    { value: '0', label: "生效" },
    { value: '1', label: "停用" }
];

export const tableOption = {
    index: false,
    indexLabel: "",
    stripe: true,
    addBtn: false,
    delBtn: false,
    menuAlign: "center",
    align: "center",
    selection: true,
    columnBtn: false,
    refreshBtn: false,
    editBtn: false,
    menu: true, //是否显示操作菜单栏
    // formWidth: '85%',
    labelWidth: 115,
    menuType: "text",
    searchBtnIcon: "none",
    emptyBtnIcon: "none",
    searchBtnText: "查询",
    emptyBtnText: "重置",
    menuPosition: "right",
    column: [{
            label: "供应商名称",
            prop: "supplierName",
            search: true,
            searchSpan: 12,
            searchLabelWidth: '100',
            slot: true
        },
        {
            label: "状态",
            prop: "supplierStatus",
            search: true,
            searchSpan: 12,
            searchLabelWidth: '60',
            editDisplay: false,
            type: "select",
            dicData: statusMap,
        },
        {
            label: "性别",
            prop: "sex",
            search: false,
            editDisplay: true,
            hide: true,
            type: "select",
            overHidden: true,
            dicData: [
                { label: "男", value: 0 },
                { label: "女", value: 1 }
            ]
        },
        {
            label: "证件类型",
            prop: "idType",
            search: false,
            editDisplay: true,
            hide: true,
            overHidden: true,
            type: "select",
            dicUrl: "/admin/dict/type/id_type",
        },
        {
            label: "证件号",
            prop: "idNumber",
            search: false,
            editDisplay: true,
            hide: true,
            overHidden: true,
        },
        {
            label: "法人代表",
            prop: "legalPerson",
            search: false,
            editDisplay: true,
            overHidden: true,
        },
        {
            label: "手机号码",
            prop: "telphone",
            search: false,
            editDisplay: true,
            overHidden: true,
        },
        {
            label: "税务代码",
            prop: "taxCode",
            search: false,
            editDisplay: true,
            overHidden: true,
        },
        {
            label: "纳税人登记号",
            prop: "taxpayerCode",
            search: false,
            editDisplay: true,
            overHidden: true,
        },
        {
            label: "结算账号",
            prop: "closeAccount",
            search: false,
            overHidden: true,
            editDisplay: true,
        },
        {
            label: "开户银行",
            prop: "openingBank  ",
            search: false,
            overHidden: true,
            editDisplay: true,
        },
        {
            label: "创建时间",
            prop: "createdTime",
            searchLabelWidth: '100',
            searchSpan: 12,
            search: true,
            searchslot: true,
            width: 140
        },
    ]
};