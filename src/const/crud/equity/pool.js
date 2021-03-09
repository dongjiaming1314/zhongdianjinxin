export const tableOption = {
    // index: true,
    // indexLabel: '序号',
    stripe: true,
    addBtn: false,
    menuAlign: 'center',
    align: 'center',
    selection: true,
    columnBtn: false,
    refreshBtn: false,
    searchIcon: false,
    editBtn: false,
    delBtn: false,
    emptyBtnIcon: 'none',
    searchBtnIcon: 'none',
    menuWidth: 200,
    searchLabelWidth: 100,
    searchBtnText: '查询',
    emptyBtnText: '重置',
    column: [
        {
            label:'所属供应商',
            prop:'supplierName',
            searchSpan: 12,
            search: true,
            // slot: true,
            searchslot: true,
            type:'select'
        },
        {
            label: '权益名称',
            prop: 'equityName',
            searchSpan: 12,
            // fixed: true,
            search: true,
            slot: true,
            searchslot: true,
        },
        {
            label: '权益类型',
            prop: 'equityType',
            searchSpan: 12,
            search: true,
            slot: true,
            searchslot: true,
            // type: 'select',
            // dicUrl: '/admin/dict/type/equity_type'
        },
        {
            label: '权益目录',
            prop: 'cataName',
            search: true,
            searchslot: true,
            searchSpan: 12,
        },
        {
            label: '当前库存',
            prop: 'equityInventory',
        },
        /* {
            label: '上日消耗库存',
            prop: 'lastDayAmount',
        },
        {
            label: '上周消耗库存',
            prop: 'lastWeekAmount',
        },
        {
            label: '上月消耗库存',
            prop: 'lastMonthAmount'
        }, */
    ]
}
export const particularsOption = {
    // index: true,
    // indexLabel: '序号',
    stripe: true,
    addBtn: false,
    menuAlign: 'center',
    align: 'center',
    selection: false,
    columnBtn: false,
    refreshBtn: false,
    searchIcon: false,
    editBtn: false,
    delBtn: false,
    emptyBtnIcon: 'none',
    searchBtnIcon: 'none',
    menu:false,
    menuWidth: 200,
    searchLabelWidth: 100,
    searchBtnText: '查询',
    emptyBtnText: '重置',
    column: [
        {
            label: '操作类型',
            prop: 'checkTypeNo',
        },
        {
            label: '数量',
            prop: 'incrNumber',
        },
        {
            label:'操作人',
            prop:"createdBy"
        },
        {
            label:'操作时间',
            prop:'createdTime',
            search: true,
            searchSpan: 12,
            type: 'datetime',
            searchRange:true,
        },
    ]
}
export const issueOption = {
    // index: true,
    // indexLabel: '序号',
    stripe: true,
    addBtn: false,
    menuAlign: 'center',
    align: 'center',
    selection: false,
    columnBtn: false,
    refreshBtn: false,
    searchIcon: false,
    editBtn: false,
    delBtn: false,
    emptyBtnIcon: 'none',
    searchBtnIcon: 'none',
    menu:false,
    menuWidth: 200,
    searchLabelWidth: 100,
    searchBtnText: '查询',
    emptyBtnText: '重置',
    column: [
        {
            label:'发放人',
            prop:"createdBy"
        },
        {
            label:'发放时间',
            prop:'createdTime',
            search: true,
            searchSpan: 12,
            type: 'datetime',
            searchRange:true,
        },
        {
            label: '客户',
            prop: 'cusName',
            search: true,
            searchSpan: 12,
        },
        {
            label: '活动',
            prop: 'actName',
            search: true,
            searchSpan: 12,
        },
        {
            label: '操作类型',
            prop: 'checkTypeNo',
        },
    ]
}
export const applyOption = {
    stripe: true,
    addBtn: false,
    menuAlign: 'center',
    align: 'center',
    columnBtn: false,
    delBtn: false,
    refreshBtn: false,
    searchIcon: false,
    editBtn: false,
    emptyBtnIcon: 'none',
    searchBtnIcon: 'none',
    menuWidth: 200,
    searchLabelWidth: 100,
    searchBtnText: '查询',
    emptyBtnText: '重置',
    column: [
        {
            label: '权益名称',
            prop: 'equityName',
            searchSpan: 12,
            fixed: true,
            search: true,
            slot: true
        },
        {
            label: '类型',
            prop: 'checkType',
            searchSpan: 12,
            search: true,
            searchslot: true,
            slot: true,
            // type: 'select',
            // dicUrl: 'admin/dict/type/equity_inventory_apply_check_type',
        },
        {
            label: '状态',
            prop: 'checkStatus',
            searchSpan: 12,
            search: true,
            // formslot: true,
            searchslot: true,
            slot: true,
            // type: 'select',
            // dicUrl: 'admin/dict/type/slideshow_checkStatus',
        },
        {
            label: '申请人',
            prop: 'createdBy',
        },
        {
            label: '申请时间',
            prop: 'createdTime',
        },
        {
            label: '审核人',
            prop: 'checkBy',
        },
        {
            label: '审核时间',
            prop: 'checkTime',
        },
        {
            label: '审核备注',
            prop: 'checkMark'
        },
    ]
}

