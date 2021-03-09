const ruleSettingTabs = [{
  type: 0,
  children: [{
      name: 'ruleSearch',
      label: '规则查询'
    },
    {
      name: 'applyList',
      label: '申请列表'
    }
  ]
}, {
  type: 1,
  children: [{
      name: 'ruleSearch',
      label: '规则查询'
    },
    {
      name: 'auditList',
      label: '审核列表'
    }
  ]
}]


const growthLevelTabs = [{
    type: 0,
    children: [{
      name: 'levelSearch',
      label: '成长等级查询'
    }, {
      name: 'applyList',
      label: '申请列表'
    }]
  },{
    type: 1,
    children: [{
      name: 'levelSearch',
      label: '成长等级查询'
    }, {
      name: 'auditList',
      label: '审核列表'
    }]
  }
]

const GoodsSearchTabs = [
  {
    name: 'GoodsSearch',
    label: '商品查询'
  },
  {
    name: 'applyList',
    label: '申请列表'
  }
]

export {
  ruleSettingTabs,
  growthLevelTabs,
  GoodsSearchTabs
}
