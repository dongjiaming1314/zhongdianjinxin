export const equityOption = {
    stripe: true,
    dialogWidth: '100%',
    dialogFullscreen: true,
    addBtn: false,
    delBtn: false, // 行删除按钮
    editBtn: false, // 行编辑按钮
    columnBtn: false, //列动态显隐按钮
    refreshBtn: false, // 刷新按钮
    columnBtn: false, //列显隐按钮
    emptyBtnIcon: 'none',
    searchBtnIcon: 'none',
    searchBtnText: '查询',
    emptyBtnText: '重置',
    searchIcon: false,
    menu: false,
    column: [{
        label: '权益名称',
        prop: 'equityName',
    }, {
        label: '使用时间',
        prop: '',
    }, {
        label: '使用地点',
        prop: '',
    }, {
        label: '支付银行卡',
        prop: '',
    }, {
        label: '支付金额',
        prop: '',
    }, {
        label: '状态',
        prop: 'equityUseStatus',
        slot: true
    }]
}