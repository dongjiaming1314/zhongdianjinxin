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
      <template slot="menuLeft">
        <div>
          <el-button
            type="primary"
            size="small"
            @click.stop="handleAdd()"
          >退货
          </el-button>
        </div>
        <div>
          <el-button
            type="primary"
            size="small"
            @click.stop="handleAdd()"
          >换货
          </el-button>
        </div>
        <div>
          <el-button
            type="primary"
            size="small"
            @click.stop="exportWin()"
          >导出
          </el-button>
        </div>
      </template>
      <template slot-scope="scope" slot="menu">
        <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
              @click.stop="handleEdit(scope.row,scope.index)">回执</span>
      </template>
    </avue-crud>
    <Comp1 ref="ref_Comp1" @getList="getList"></Comp1>
  </div>
</template>

<script>
  import Comp1 from "./Comp1";

  export default {
    name: "Commodity",
    components: {Comp1},
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
            label: '订单编号',
            prop: 'userName',
            fixed: true,
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '客户ID',
            prop: 'userName',
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
            label: '商品名称',
            prop: 'organization',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '订单生成时间',
            prop: 'role',
            minWidth: '120px',
            type: 'date',
            search: true,
            searchSpan: 12,
          }, {
            label: '订单状态',
            prop: 'role',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '供应商名称',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '商品名称',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '商品类别',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '商品价格(积分)',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '商品价格(金额)',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '是否为秒杀订单',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '客户ip地址',
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
      // 打开新增
      handleAdd() {
        // this.$refs.ref_Comp1.openWin();
      },
      // 打开修改
      handleEdit(row) {
        this.$refs.ref_Comp1.openWin(row);
      },
      // 勾选
      selectionChange(row) {
        if (row.length) {
          for (let i = 0; i < row.length; i++) {
            this.idList.push(row[i].id)
          }
        }
      },
      // 删除
      handleDel() {
        this.$confirm('此操作将删除选中的记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          });
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .avue-crud__left {
    display: flex;
  }

  /deep/ .avue-form__menu > .el-form-item > .el-form-item__content {
    float: right;
  }
</style>
