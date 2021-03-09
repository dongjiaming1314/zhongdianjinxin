export const tableOption = {
    index: true,
    indexLabel: '序号',
    stripe: true,
    searchLabelWidth: 100,
    menuAlign: 'center',
    align: 'center',
    delBtn: false,
    columnBtn: false,
    refreshBtn: false,
    addBtn: false,
    editBtn: false,
    menuWidth: 80,
    emptyBtnIcon: 'none',
    searchBtnIcon: 'none',
    searchBtnText: '查询',
    emptyBtnText: '重置',
    searchIcon: false,
    column: [{
            label: '客户姓名',
            prop: 'cusName',
            search: true,
            slot: true,
            searchSpan: 12,
            fixed: true,
        },
        {
            label: '客户号',
            prop: 'custNo',
            search: true,
            searchSpan: 12,
        },
        {
            label: '证件类型',
            prop: 'idType',
            search: true,
            searchSpan: 12,
            type: 'select',
            dicUrl: '/admin/dict/type/id_type'
        },
        {
            label: '证件号码',
            prop: 'idNumber',
            search: true,
            searchSpan: 12,
        },
        {
            label: '手机号',
            prop: 'phoneNumber',
            search: true,
            searchSpan: 12,
        },
        {
            label: '成长等级',
            prop: 'growthLevel',
            search: true,
            searchSpan: 12,
            type: 'select',
            dicData: [{
                    label: '黄金',
                    value: '1'
                },
                {
                    label: '铂金',
                    value: '2'
                },
                {
                    label: '钻石',
                    value: '3'
                }
            ]
        },
        {
            label: '所属机构',
            prop: 'affiliation',
        },
        {
            label: '上次登陆时间',
            prop: 'lastLandingTime',
            editDisplay: false,
            addDisplay: false,
            width: 160
        },
        {
            label: '登陆IP',
            prop: 'lastLoginIpAddress',
            editDisplay: false,
            addDisplay: false,
        },
        {
            label: '登陆渠道',
            prop: 'custChannel',
            editDisplay: false,
            addDisplay: false,
        }
    ]
}

export const redOption = {
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    refreshBtn: false,
    showColumn: false,
    menu: false,
    addBtn: false,
    searchLabelWidth: 100,
    column: [{
            label: '红包打开状态',
            prop: 'redbagCollectOpenStatus',
            type: 'select',
            dicUrl: '/admin/dict/type/redbag_collect_open_status'
        },
        {
            label: '红包池编号',
            prop: 'redpackNo',
        },
        {
            label: '红包池名称',
            prop: 'redpackName',
        },
        {
            label: '红包领取时间',
            prop: 'redpackCollectTime',
            type: 'datetimerange',
            width: 160
        },
        {
            label: '红包打开时间',
            prop: 'redbagCollectOpenDate',
            width: 160
        },
        {
            label: '红包到期时间',
            prop: 'redbagCollectExpireDate',
            width: 160
        },
        {
            label: '到账卡号',
            prop: 'cardNo',
            // hide: true,
        },
        {
            label: '红包池状态',
            prop: 'redpackStatus',
            hide: true,
            type: 'select',
            dicUrl: '/admin/dict/type/red_pack_status'
        },
        {
            label: '领用红包编号',
            prop: 'redBagNo',
            hide: true
        },

        {
            label: '领用红包状态',
            type: 'select',
            hide: true,
            prop: 'redbagCollectStatus',
            dicUrl: '/admin/dict/type/red_bag_collect_status'
        },
        {
            label: '红包生效开始时间',
            prop: 'redbagFeeectStarttime',
            hide: true,
            width: 160
        },
        {
            label: '红包生效结束时间',
            prop: 'redbagFeeectEndtime',
            hide: true,
            width: 160
        },

        {
            label: '红包池所属机构',
            prop: 'redpackAffiliation',
            hide: true,
        },
        {
            label: '领用红包客户号',
            prop: 'redbagCollectCustno',
            hide: true
        },
        // {
        //     label: '领取日期',
        //     prop: 'dateOfCollection',
        // }

    ]
}
export const cusOption = {
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    refreshBtn: false,
    showColumn: false,
    menu: false,
    addBtn: false,
    columnBtn: false,
    searchLabelWidth: 100,
    column: [{
        label: '客户姓名',
        prop: 'cusName',
    }, {
        label: '客户号',
        prop: 'custNo',
    }, {
        label: '手机号码',
        prop: 'phoneNumber',
    }, ]
}

// export const formOption = {
//     emptyBtn: false,
//     submitBtn: false,
//     searchLabelWidth: 100,
//     column: [
//           {
//             label: '客户姓名',
//             prop: 'cusName',
//             detail:true,
//           },
//           {
//             label: '客户号',
//             prop: 'customerNo',
//             detail: true,

//           },
//           {
//             label: '证件类型',
//             prop: 'idType',
//             type: 'select',
//             detail: true,
//             dicUrl: '/admin/dict/type/id_type',
//           },
//           {
//             label: '证件号码',
//             prop: 'idNumber',
//             detail: true,
//           },
//           {
//             label: '手机号',
//             prop: 'phoneNumber',
//             detail: true,
//           },
//           {
//             label: '所属机构',
//             prop: 'affiliation',
//             detail: true
//           },
//           {
//             label: '上次登陆时间',
//             prop: 'lastLandingTime',
//             detail: true
//           },
//           {
//             label: '登陆IP',
//             prop: 'lastLoginIpAddress',
//             detail: true
//           },
//           {
//             label: '登陆渠道',
//             prop: 'custChannel',
//             detail: true
//           }
//     ]

// }