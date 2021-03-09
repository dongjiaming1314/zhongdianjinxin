export const queryTableOption = {
    menu: true, //隐藏操作栏
    selection: true, //勾选
    addBtn: false,
    editBtn: false,
    delBtn: false,
    align: 'center',
    searchIcon: false,
    searchBtnText: "查询",
    emptyBtnText: "重置",
    emptyBtnIcon: "none",
    searchBtnIcon: "none",
    columnBtn: false,
    refreshBtn: false,
    column: [{
            searchSpan: 12,
            label: "客户号",
            prop: "custNo",
            search: true
        },
        {
            searchSpan: 12,
            label: "权益类型",
            type: "select",
            prop: "equityType",
            search: true,
            // overHidden: true,
            dicUrl: 'admin/dict/type/equity_type'
        },
        {
            searchSpan: 12,
            label: "权益编码",
            prop: "equityId",
            search: true,
            overHidden: true
        },
        {
            searchSpan: 12,
            label: "权益名称",
            prop: "equityName",
            dicUrl: "",
            overHidden: true
        },
        {
            searchSpan: 12,
            label: "当前周期",
            prop: "period",
            search: false,
            overHidden: true
        },
        {
            searchSpan: 12,
            label: "权益次数",
            prop: "remainTimes",
            search: false,
            overHidden: true
        },
        {
            searchSpan: 12,
            label: "账户状态",
            minWidth: "120px",
            prop: "status",
            search: false,
            overHidden: true,
            dicUrl: 'admin/dict/type/common_account_status'
        }
    ]
};

export const applyOption = {
    border: false,
    index: true,
    indexLabel: "序号",
    stripe: true,
    addBtn: false,
    menuAlign: "center",
    align: "center",
    searchIcon: false,
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
    column: [{
            label: "客户号",
            prop: "custNo",
            search: true,
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "权益类型",
            prop: "equityType",
            search: true,
            editDisplay: true,
            searchSpan: "12",
            type: "select",
            dicUrl: 'admin/dict/type/equity_type'
        },
        {
            label: "权益编码",
            prop: "equityId",
            search: true,
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "操作模式",
            prop: "operation",
            search: true,
            editDisplay: true,
            searchSpan: "12",
            type: 'select',
            dicUrl: 'admin/dict/type/equity_account_operation'
        },
        {
            label: "调整类型",
            prop: "adjustType",
            search: true,
            editDisplay: true,
            searchSpan: "12",
            type: "select",
            dicUrl: 'admin/dict/type/common_adjust_type'
        },
        {
            label: "文件名称",
            prop: "fileName",
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "调整额度",
            prop: "adjustValue",
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "审核状态",
            prop: "checkStatus",
            editDisplay: true,
            searchSpan: "12",
            dicUrl: 'admin/dict/type/equity_audit_check_status'
        },
    ]
}
export const checkOption = {
    border: false,
    index: true,
    indexLabel: "序号",
    stripe: true,
    addBtn: false,
    menuAlign: "center",
    align: "center",
    searchIcon: false,
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
    column: [{
            label: "客户号",
            prop: "custNo",
            search: true,
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "权益类型",
            prop: "equityType",
            search: true,
            editDisplay: true,
            searchSpan: "12",
            type: "select",
            dicUrl: 'admin/dict/type/equity_type'
        },
        {
            label: "权益编码",
            prop: "equityId",
            search: true,
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "操作模式",
            prop: "operation",
            search: true,
            type: 'select',
            editDisplay: true,
            searchSpan: "12",
            dicUrl: 'admin/dict/type/equity_account_operation'
        },
        {
            label: "调整类型",
            prop: "adjustType",
            search: true,
            editDisplay: true,
            searchSpan: "12",
            type: "select",
            dicUrl: 'admin/dict/type/common_adjust_type'
        },
        {
            label: "文件名称",
            prop: "fileName",
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "调整额度",
            prop: "adjustValue",
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "审核状态",
            prop: "checkStatus",
            editDisplay: true,
            searchSpan: "12",
            dicUrl: 'admin/dict/type/equity_audit_check_status'
        },
    ]
}