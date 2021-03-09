export const tableOption = {
    stripe: true,
    selection: true,
    menuAlign: 'center',
    align: 'center',
    addBtn:false,
    delBtn:false, // 行删除按钮
    editBtn:false, // 行编辑按钮
    columnBtn:false, //列动态显隐按钮
    refreshBtn:false, // 刷新按钮
    columnBtn:false,//列显隐按钮
    searchIcon: false,
    searchLabelWidth: 100,
    emptyBtnIcon: 'none', 
    searchBtnIcon: 'none',
    searchBtnText: '查询',
    emptyBtnText: '重置',
    column: [
        {
            label: '模板名称',
            prop: 'customerName',
            search: true,
            fixed: true,
            searchSpan: 12,
            slot: true,
        },
        {
            label: '模板ID',
            prop: 'customerNum',
        },
        {
            label: '创建人',
            prop: 'tel',
        },
        {
            label: '创建时间',
            prop: 'name',
            width: 160
        }
    ]
 }
 