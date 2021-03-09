<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @search-change="searchChange"
        @search-reset="searchReset"
        @current-change="currentChange"
        @size-change="sizeChange">
        <template slot="menuLeft">
          <div>
            <el-button
              type="primary"
              size="small"
              @click.stop="handleAdd()"
            >新增
            </el-button>
          </div>
        </template>
        <template slot-scope="scope" slot="menu">
          <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
                @click.stop="handleEdit(scope.row,scope.index)">编辑</span>
          <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
                @click.stop="handleDel(scope.row,scope.index)">删除</span>
        </template>
      </avue-crud>
    </basic-container>
    <Comp1 ref="ref_Comp1" @getList="getList"></Comp1>
  </div>
</template>

<script>
  import Comp1 from "./Comp1";

  export default {
    name: "index",
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
          addBtn: false,
          editBtn: false,
          delBtn: false,
          columnBtn: false,
          refreshBtn: false,
          formWidth: '85%',
          searchLabelWidth: 120,
          column: [{
            label: 'SKU编码',
            prop: 'userName',
            fixed: true,
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          },{
            label: '商品名称',
            prop: 'userName',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '商品类别',
            prop: 'userNo',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '机身颜色',
            prop: 'phone',
            minWidth: '120px'
          }, {
            label: '套餐类型',
            prop: 'organization',
            minWidth: '120px'
          }, {
            label: '存储容量',
            prop: 'role',
            minWidth: '120px'
          }, {
            label: '创建人',
            prop: 'roleGrade',
            minWidth: '120px',
          }, {
            label: '创建日期',
            prop: 'createTime',
            minWidth: '200px',
          }, {
            label: '审核状态',
            prop: 'remark',
            minWidth: '120px',
          }]
        },
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
        this.$refs.ref_Comp1.openWin();
      },
      // 打开修改
      handleEdit(row) {
        this.$refs.ref_Comp1.openWin(row);
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

<style scoped>

</style>
