const statusMap = [
    { value: '7', label: "审核通过" },
    { value: '5', label: "审核不通过" },
    { value: '3', label: "待审核" },
    { value: '1', label: "草稿" }
];


const checkType = [{
        label: '新增',
        value: '1'
    },
    {
        label: '修改',
        value: '2'
    },
    {
        label: '删除',
        value: '3'
    },
    {
        label: '启用',
        value: '5'
    },
    {
        label: '停用',
        value: '6'
    },
]

export const tableOption = {
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
    searchBtnText: "查询",
    emptyBtnText: "重置",
    menuPosition: "right",
    column: [{
            label: "供应商名称",
            prop: "supplierName",
            search: true,
            editDisplay: true,
            searchSpan: 12,
            searchLabelWidth: '100',
            slot: true,
            width: 140,
        },
        {
            label: "法人代表",
            prop: "legalPerson",
            search: false,
            editDisplay: true
        },
        {
            label: "手机号码",
            prop: "telphone",
            search: false,
            editDisplay: true
        },
        {
            label: "状态",
            prop: "checkStatus",
            search: true,
            editDisplay: false,
            type: 'select',
            searchSpan: 12,
            dicData: statusMap,
            // formatter: function(row, value, label, column) {
            //     let res
            //     statusMap.forEach((item, index) => {
            //         if (item.value == row.supStatus) {
            //             res = item.label
            //         } else if (item.value === 4 || item.value === 5 || item.value === 6) {
            //             res = '待审核'
            //         }
            //     })
            //     return res
            // }
        },
        {
            label: "申请操作",
            prop: "checkType",
            dicData: checkType
        },
        {
            label: "申请人",
            prop: "createdBy",
            search: false,
            editDisplay: true
        },
        {
            label: "申请时间",
            prop: "createdTime",
            search: false,
            editDisplay: true,
            width: 140,
        },
        {
            label: "审核人",
            prop: "checkBy",
            search: false,
            editDisplay: true
        },
        {
            label: "审核时间",
            prop: "checkTime",
            search: false,
            editDisplay: true,
            width: 140,
        },
        {
            label: "审核备注",
            prop: "checkRemark",
            search: false,
            editDisplay: true
        },
    ]
};