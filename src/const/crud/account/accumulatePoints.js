export const queryTableOption = {
    menu: true, //隐藏操作栏
    editBtn: false, //行编辑按钮
    delBtn: false, //行删除按钮
    viewBtn: false, //查看按钮
    // selection: true, //勾选
    addBtn: false,
    searchIcon: false,
    // index: true,
    // indexLabel: "序号",
    searchBtnText: '查询',
    emptyBtnText: '重置',
    emptyBtnIcon: 'none',
    align: 'center',
    searchBtnIcon: 'none',
    columnBtn: false,
    refreshBtn: false,
    column: [{
            searchSpan: 12,
            label: '客户号',
            prop: 'custNo',
            fixed: true,
            search: true,
            overHidden: true
        },
        {
            searchSpan: 12,
            label: '所属机构',
            prop: 'orgName',
            overHidden: true
        },
        {
            searchSpan: 12,
            label: '积分总值',
            prop: 'totalIntegral',
            overHidden: true
        },
        {
            searchSpan: 12,
            label: '已使用积分值',
            prop: 'usedIntegral',
            overHidden: true
        },
        {
            searchSpan: 12,
            label: '剩余积分值',
            prop: 'avaIntegral',
            overHidden: true
        },
        {
            searchSpan: 12,
            label: '账户状态',
            prop: 'acctStatus',
            slot: true, // 自定义列
            formslot: true, // 自定义表单
            overHidden: true
        },
    ]
}
export const secodLevelOption = {
    menu: true, //隐藏操作栏
    addBtn: false,
    columnBtn: false,
    refreshBtn: false,
    delBtn: false,
    editBtn: false,
    align: 'center',
    menuAlign: 'center',
    column: [{
            label: '活动号',
            prop: 'actNo'
        },
        {
            label: '年份',
            prop: 'integralYear'
        },
        {
            label: '客户号',
            prop: 'custNo'
        },
        {
            label: '获取积分值',
            prop: 'avaIntegral'
        },
        {
            label: '调增积分值',
            prop: 'cumulativeIncr'
        },
        {
            label: '调减积分值',
            prop: 'cumulativeReduction'
        },
        {
            label: '年度失效积分值',
            prop: 'cumulativeInvalid',
            width: '120'
        },
        {
            label: '使用积分值',
            prop: 'usedIntegral'
        },
        {
            label: '剩余积分值',
            prop: 'residueIntegral'
        },
        {
            label: '账户状态',
            prop: 'acctStatus',
            slot: true,
        },
    ]
}
export const thridLevelOption = {
    menu: true, //隐藏操作栏
    addBtn: false,
    columnBtn: false,
    refreshBtn: false,
    editBtn: false,
    delBtn: false,
    align: 'center',
    menuAlign: 'center',
    column: [{
            label: '活动号',
            prop: 'actNo'
        },
        {
            label: '规则ID',
            prop: 'ruleId'
        },
        {
            label: '规则名称',
            prop: 'ruleName'
        },
        {
            label: '领取积分值',
            prop: 'integralValue'
        },
        {
            label: '年度失效积分值',
            prop: 'cumulativeInvalid'
        },
        {
            label: '使用积分值',
            prop: 'usedIntegral'
        },
        {
            label: '剩余积分值',
            prop: 'leftIntegral'
        },
    ]
}

export const detailLevelOption = {
    menu: false, //隐藏操作栏
    addBtn: false,
    columnBtn: false,
    refreshBtn: false,
    editBtn: false,
    delBtn: false,
    align: 'center',
    menuAlign: 'center',
    column: [{
            label: '活动号',
            prop: 'actNo'
        },
        {
            label: '客户号',
            prop: 'custNo'
        },
        {
            label: '规则ID',
            prop: 'ruleId'
        },
        {
            label: '规则名称',
            prop: 'ruleName'
        },
        {
            label: '领取积分值',
            prop: 'integralValue'
        },
        {
            label: '领取时间',
            prop: 'sysTime'
        },
        {
            label: '失效时间',
            prop: 'invalidTime'
        },
        {
            label: '领取说明',
            prop: 'remark'
        },
    ]
}

export const applyOption = {
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
    column: [{
            label: "操作类型",
            prop: "type",
            search: true,
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "调整方式",
            prop: "adjustWay",
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "调整类型",
            prop: "adjustType",
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "客户号",
            prop: "num",
            search: true,
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "文件名称",
            prop: "fileName",
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "调整额度",
            prop: "amount",
            editDisplay: true,
            searchSpan: "12",
        },
        {
            label: "审核状态",
            prop: "status",
            editDisplay: true,
            searchSpan: "12",
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
            editDisplay: true,
            searchSpan: "12",
            dicUrl: 'admin/dict/type/common_adjust_type'
        },
        {
            label: "客户号",
            prop: "custNo",
            search: true,
            editDisplay: true,
            searchSpan: "12",
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
        {
            label: "申请人",
            prop: "createdBy",
            searchSpan: "12",
        },
        {
            label: "申请时间",
            prop: "createdTime",
            searchSpan: "12",
        },
    ]
}