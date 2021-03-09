<template>
  <div>
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      @search-change="searchChange"
      @search-reset="searchReset"
      @current-change="currentChange"
      @size-change="sizeChange"
      @selection-change="selectionChange">
<!--      <template slot-scope="scope" slot="menu">-->
<!--          <span style="cursor: pointer;color: #409EFF;padding: 0 5px"-->
<!--                @click.stop="handleEdit(scope.row,scope.index)">导出</span>-->
<!--      </template>-->
      <template slot="menuLeft">
        <div>
          <el-button
            type="primary"
            size="small"
            @click.stop="exportWin()"
          >导出
          </el-button>
        </div>
      </template>
    </avue-crud>
  </div>
</template>

<script>

  export default {
    name: "Commodity",
    data() {
      return {
        page: {
          total: 0, // 总数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
          pageSizes: [10, 20, 30, 50]
        },
        tableData: [{
          id: 'id',
          userName: 'userName',
          userNo: 'userNo',
          phone: 'phone',
          organization: '',
          role: '',
          password: 'password',
          remark: 'remark'
        }, {
          id: 'id1',
          userName: 'userName1',
          userNo: 'userNo1',
          phone: 'phone1',
          organization: '',
          role: '',
          password: 'password1',
          remark: 'remark1'
        }],
        tableLoading: false,
        tableOption: {
          stripe: true,
          addBtn: false,
          editBtn: false,
          delBtn: false,
          columnBtn: false,
          refreshBtn: false,
          selection: true,
          formWidth: '100%',
          searchBtnText: '查询',
          searchBtnIcon: 'none',
          emptyBtnText: '重置',
          emptyBtnIcon: 'none',
          searchLabelWidth: 120,
          searchIcon: false,
          column: [{
            label: '订单号',
            prop: 'userName',
            fixed: true,
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          },{
            label: '商户订单号',
            prop: 'userName',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '客户号',
            prop: 'userNo',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '客户姓名',
            prop: 'userNo',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '手机号',
            prop: 'phone',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '权益名称',
            prop: 'organization',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '发放活动名称',
            prop: 'role',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '订单状态',
            prop: 'role',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '核销状态',
            prop: 'role',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '订单时间',
            prop: 'role',
            search: true,
            searchSpan: 12,
            type: 'date',
            minWidth: '120px'
          }, {
            label: '所属供应商',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '支付金额',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '用户IP地址',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '权益来源',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '商户信息',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '商户号',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '商户名称',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '商户订单号',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '用户支付卡号',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '用户卡等级',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '用户卡性质',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '银行卡所属银行',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '预约信息',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '预约时间',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '预约人',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '预约人手机号',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '随同人数',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '项目名称',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '创建时间',
            prop: 'role',
            minWidth: '120px'
          }]
        },
        idList: []
      }
    },
    methods: {
      // 获取列表数据
      getList() {
        console.log('getList');
      },
      searchChange() {
      },
      // 重置
      searchReset() {
      },
      currentChange() {
      },
      sizeChange() {
      },
      // 勾选
      selectionChange(row) {
        if(row.length) {
          for (let i = 0; i < row.length; i++) {
            this.idList.push(row[i].id)
          }
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  /deep/.avue-crud__left {
    display: flex;
  }
  /deep/ .avue-form__menu > .el-form-item > .el-form-item__content {
    float: right;
  }
</style>
