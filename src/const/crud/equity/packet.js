export const tableOption = {
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    delBtn: false,
    columnBtn: false,
    refreshBtn: false,
    addBtn: false,
    editBtn: false,
    viewBtn: false,
    searchIcon: false,
    emptyBtnIcon: 'none', 
    searchBtnIcon: 'none',
    viewTitle: '红包池详情',
    searchBtnText: '查询',
    emptyBtnText: '重置',
    searchLabelWidth: 100,
    column: [
        {
            label: '红包池名称',
            prop: 'redPackName',
            search: true,
            searchSpan:12,
            slot: true,
        },
        {
            label: '红包池ID',
            prop: 'id',
            search: true,
            searchSpan:12,
        },
        {
            label: '生效开始时间',
            prop: 'startTime',
            search:true,
            searchSpan:12,
            type: 'datetimerange',
            width: 160
        },
        
        {
            label: '生效结束时间',
            prop: 'endTime',
            width: 160
        },
        {
            label: '红包有效期',
            prop: 'redPackValdity',
        },
        {
            label: '红包有效期类型',
            prop: 'valdityType',
            type: 'select',
            dicUrl: '/admin/dict/type/valdity_type',
        },
        {
            label: '红包池类型',
            prop: 'redlogbundlType',
            search: true,
            searchSpan:12,
            dicUrl: '/admin/dict/type/redlogbundle_type',
            slot: true,
            type: 'select',
        },
        {
            label: '每个红包金额',
            prop: 'redPackAmountEach',
            hide: true,
        },
        {
            label: '红包总金额',
            prop: 'totalAmount',
        },
        {
            label: '红包池个数',
            prop: 'number',
            hide: true,
            // addDisplay: false,
            // editDisplay: false
        },
        {
            label: '每个红包金额上限',
            prop: 'redPackAmountEachMax',
            hide: true,
            // addDisplay: false,
            // editDisplay: false
        },
            {
            label: '每个红包金额下限',
            prop: 'redPackAmountEachMin',
            hide: true,
            // addDisplay: false,
            // editDisplay: false
        },
          
        {
            label: '红包池的使用渠道',
            prop: 'redChannel',
            hide: true,
            // addDisplay: false,
            // editDisplay: false
        },
        {
            label: '剩余金额',
            prop: 'remainingAmount',
        
        },
        {
            label: '创建人',
            prop: 'creator',
            hide: true,
            addDisplay: false,
            editDisplay: false
        },
        {
            label: '创建时间',
            prop: 'creatTime',
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            width: 160
        },
        {
            label: '修改人',
            prop: 'modifyName',
            hide: true,
            addDisplay: false,
            editDisplay: false
        },
        {
            label: '修改时间',
            prop: 'modifyTime',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            width: 160
        },
      
        {
            label: '审核人',
            prop: 'auditName',
            hide: true,
        },
        {
            label: '审核时间',
            prop: 'auditTime',
            hide: true,
            width: 160
            // addDisplay: false,
            // editDisplay: false
        },
        
        
        {
            label: '备注',
            prop: 'comment',
            hide: true,
            // addDisplay: false,
            // editDisplay: false
        },
        
        
        
        
        {
            label: '备用字段1',
            prop: 'reserve1',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false
        },
        {
            label: '备用字段2',
            prop: 'reserve2',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false
        },
        {
            label: '备用字段3',
            prop: 'reserve3',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false
        },
        {
            label: '备用字段4',
            prop: 'reserve4',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false
        }
    ]
}
  