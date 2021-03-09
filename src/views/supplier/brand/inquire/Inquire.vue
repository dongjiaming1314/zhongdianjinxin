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
      <template slot="inquireName" slot-scope="scope">
        <div class="underline" @click.stop="handleView(scope.row,scope.index)">{{ scope.row.inquireName }}</div>
      </template>
      <template slot-scope="scope" slot="menu">
        <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
              @click.stop="handleEdit(scope.row,scope.index)">编辑</span>
        <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
              @click.stop="handleDel(scope.row,scope.index)">删除</span>
      </template>
    </avue-crud>
    <Comp1 ref="ref_Comp1" @getList="getList"></Comp1>
    <Comp2 ref="ref_Comp2"></Comp2>
  </div>
</template>

<script>
  import Comp1 from "./Comp1";
  import Comp2 from "./Comp2";
  export default {
    name: "Inquire",
    components: { Comp1, Comp2 },
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
          inquireName: 'userName',
          contactPerson: 'userNo',
          trademark: 'phone',
          organization: '',
          registrationNumber: '',
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
          formWidth: '100%',
          searchBtnText: '查询',
          searchBtnIcon: 'none',
          emptyBtnText: '重置',
          emptyBtnIcon: 'none',
          searchIcon: false,
          column: [{
            label: '品牌名称',
            prop: 'inquireName',
            fixed: true,
            search: true,
            searchSpan: 12,
            slot: true,
            minWidth: '120px'
          }, {
            label: '品牌联系人',
            prop: 'contactPerson',
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '商标注册证',
            prop: 'trademark',
            minWidth: '120px'
          }, {
            label: '工商营业照注册号',
            prop: 'registrationNumber',
            minWidth: '120px',
          }, {
            label: '创建人',
            prop: 'roleGrade',
            minWidth: '120px',
            editDisplay: false,
            addDisplay: false,
          }, {
            label: '创建时间',
            prop: 'roleGrade',
            minWidth: '200px',
            editDisplay: false,
            addDisplay: false,
          }, {
            label: '修改人',
            prop: 'roleGrade',
            minWidth: '120px',
            editDisplay: false,
            addDisplay: false,
          }, {
            label: '修改时间',
            prop: 'roleGrade',
            minWidth: '200px',
            editDisplay: false,
            addDisplay: false,
          }, {
            label: '备注',
            prop: 'remark',
            type: 'textarea',
            span: 24,
            minWidth: '200px',
          }]
        },
      }
    },
    methods: {
      // 获取列表数据
      getList() {
        console.log('getList');
      },
      searchChange() {},
      // 重置
      searchReset() {},
      currentChange() {},
      sizeChange() {},
      // 打开新增
      handleAdd() {
        this.$refs.ref_Comp1.openWin();
      },
      // 打开修改
      handleEdit(row) {
        this.$refs.ref_Comp1.openWin(row);
      },
      // 打开详情
      handleView(row) {
        this.$refs.ref_Comp2.openWin(row);
      },
      // 删除
      handleDel(row) {
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
  /deep/ .avue-form__menu > .el-form-item > .el-form-item__content {
    float: right;
  }
  .underline {
    color: #409eff;
    text-decoration: underline;
    cursor: pointer
  }
</style>
