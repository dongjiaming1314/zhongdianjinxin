export const tableOption = {
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    refreshBtn: false,
    columnBtn: false,
    addBtn: false,
    editBtn: false,
    delBtn: false,
    searchIcon: false,
    emptyBtnIcon: 'none', 
    searchBtnIcon: 'none',
    searchBtnText: '查询',
    emptyBtnText: '重置',
    searchLabelWidth: 100,
    column: [
        {
            label: '订单号',
            // prop: 'customerNo',
            search: true,
            searchSpan:12,
        },
        {
            label: '商品订单号',
            // prop: 'cusName',
            search: true,
            searchSpan:12,
        },
        {
            label: '客户号',
            // prop: 'phoneNumber',
            search: true,
            searchSpan:12,
        },
        {
            label: '客户姓名',
            // prop: 'id',
            // hide: true
            search: true,
            searchSpan: 12,
        },
        {
            label: '手机号',
            // prop: 'idNumber',
            search: true,
            searchSpan:12,
        },
        {
            label: '权益名称',
            // prop: 'affiliation',
            search: true,
            // type: 'select',
            searchSpan:12,
        },
        {
            label: '发放活动名称',
            // prop: 'growthLevel',
            search: true,
            // type: 'select',
            searchSpan:12,
        },
        {
            label: '订单状态',
            type: 'select',
            // prop: 'creationTime'
            search: true,
            searchSpan: 12,
        },
        {
            label: '核销状态',
            type: 'select',
            // prop: 'creationTime'
            search: true,
            searchSpan: 12,
        },
        {
            label: '订单时间',
            search: true,
            searchSpan: 12,
            width: 160
            // prop: 'lastLoginIpAddress'
        },
        {
            label: '所属供应商',
        },
        {
            label: '支付金额',
        },
        {
            label: '用户IP地址',
        },
        {
            label: '权益来源',
        },
        {
            label: '商户信息',
        },
        {
            label: '商户号',
        },
        {
            label: '商户名称',
        },
        {
            label: '商户订单号',
        },
        {
            label: '用户支付卡号',
        },
        {
            label: '用户卡等级',
        },
        {
            label: '用户卡性质',
        },
        {
            label: '银行卡所属银行',
        },
        {
            label: '预约信息',
        },
        {
            label: '订单号',
        },
        {
            label: '预约时间',
            width: 160
        },
        {
            label: '预约人',
        },
        {
            label: '预约人手机号',
        },
        {
            label: '随同人数',
        },
        {
            label: '项目名称',
        },
        {
            label: '创建时间',
            width: 160
        }
    ]
  }