// 状态
const checkStatus = [{
            label: '草稿',
            value: '1'
        },
        {
            label: '待审核',
            value: '3'
        },
        {
            label: '审核不通过',
            value: '5'
        },
        {
            label: '审核通过',
            value: '7'
        },
    ]
    // 类型
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
]
export const tableOption = {
    index: true,
    indexLabel: '序号',
    stripe: true,
    addBtn: false,
    menuAlign: 'center',
    align: 'center',
    delBtn: false,
    columnBtn: false,
    refreshBtn: false,
    searchIcon: false,
    editBtn: false,
    emptyBtnIcon: 'none',
    searchBtnIcon: 'none',
    menuWidth: 200,
    searchLabelWidth: 100,
    searchBtnText: '查询',
    emptyBtnText: '重置',
    column: [{
            label: '权益ID',
            prop: 'equityId',
            searchSpan: 12,
            // search: true,
            hide: true
        },
        {
            label: '权益名称',
            prop: 'equityName',
            searchSpan: 12,
            fixed: true,
            search: true,
            slot: true
        },

        {
            label: '权益类型',
            prop: 'equityType',
            // searchSpan:12,
            // search: true,
            type: 'select',
            dicUrl: '/admin/dict/type/equity_type'
        },
        {
            label: '权益目录',
            prop: 'cataName',
        },
        {
            label: '库存',
            prop: 'equityInventory',
        },
        {
            label: '库存状态',
            prop: 'inventoryWarning',
            slot: true,
        },
        {
            label: '成本',
            prop: 'equityCost',
        },
        {
            label: '权益有效期(天)',
            prop: 'equityValidity'
        },
        {
            label: '创建人',
            prop: 'createdBy'
        },
        {
            label: '创建时间',
            prop: 'createdTime',
            type: 'date',
            searchSpan: 12,
            searchRange: true,
            search: true,
            // format: 'yyyy-MM-dd',
            // valueFormat: 'yyyy-MM-dd',
        }
    ]
}

export const applyOption = {
    stripe: true,
    addBtn: false,
    menuAlign: 'center',
    align: 'center',
    delBtn: false,
    columnBtn: false,
    refreshBtn: false,
    searchIcon: false,
    editBtn: false,
    emptyBtnIcon: 'none',
    searchBtnIcon: 'none',
    menuWidth: 200,
    searchLabelWidth: 100,
    searchBtnText: '查询',
    emptyBtnText: '重置',
    column: [{
            label: '权益名称',
            prop: 'equityName',
            searchSpan: 12,
            search: true,
            fixed: true,

            slot: true
        },
        {
            label: '权益ID',
            prop: 'equityId',
            searchSpan: 12,
            // search: true,
            hide: true,
        },
        // 审核类型和草稿类型需要分开调取？？？？？
        {
            label: '类型',
            prop: 'checkType',
            searchSpan: 12,
            search: true,
            searchslot: true,
            slot: true,
            // type: 'select',
            // dicUrl: 'admin/dict/type/slideshow_checkType',
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
            searchSpan: 12,
        },
        {
            label: '申请时间',
            prop: 'createdTime',
            width: 140,
        },
        {
            label: '审核人',
            prop: 'checkBy',
        },
        {
            label: '审核时间',
            prop: 'checkTime',
            width: 140,
        },
        {
            label: '审核备注',
            prop: 'checkMark'
        },
    ]
}