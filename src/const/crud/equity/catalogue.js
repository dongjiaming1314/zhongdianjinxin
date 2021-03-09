export const tableOption = {
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    refreshBtn: false,
    viewBtn: false,
    editBtn: false,
    addBtn: false,
    columnBtn: false,
    searchIcon: false,
    emptyBtnIcon: 'none',
    searchBtnIcon: 'none',
    searchBtnText: '查询',
    emptyBtnText: '重置',
    searchLabelWidth: 100,
    align: 'center',
    column: [
        {
            label: '目录名称',
            prop: 'cataName',
            search: true,
            searchSpan: 12,
            slot: true,
            fixed: true,
        },
        {
            label: '目录级别',
            prop: 'cataLevel',
            type: 'select',
            search: true,
            searchSpan: 12,
            rules: [{
                required: true,
                message: '请选择目录',
                trigger: 'blur'
            }],
            dicUrl: '/admin/dict/type/catalogue_Level'
        },
        {
            label: '上级目录',
            prop: 'parentName',
        },
        {
            label: '创建时间',
            prop: 'createTime',
            type: 'datetime',
            format: 'yyyy-MM-dd HH:mm:ss',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            editDisplay: false,
            addDisplay: false,
            width: 160
        },
        {
            label: '备注',
            prop: 'comment',
            hide: true,
        },
        {
            label: '权益数量',
            prop: 'amount',
            addDisplay: false,
            editDisplay: false,
        }
    ]
}

export const rightOption = {
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    refreshBtn: false,
    menu: false,
    addBtn: false,
    columnBtn: false,
    align: 'center',
    column: [
        {
            label: '权益名称',
            prop: 'equiName',
        },
        {
            label: '权益类型',
            prop: 'equityType',
            type: 'select',
            dicUrl: '/admin/dict/type/equity_type'
        },
        {
            label: '权益目录',
            prop: 'parentName',
        },
        {
            label: '生效时间',
            prop: 'startTime',
        },
        {
            label: '结束时间',
            prop: 'endTime',
        }
    ]
}

export const catalogueOption = {
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    refreshBtn: false,
    menu: false,
    addBtn: false,
    columnBtn: false,
    align: 'center',
    column: [
        {
            label: '目录名称',
            prop: 'cataName',
        },
        {
            label: '上级目录',
            prop: 'parentName',
        },
        {
            label: '创建时间',
            prop: 'createTime',
        },
        {
            label: '权益数量',
            prop: 'equityNum',
        }
    ]
}
