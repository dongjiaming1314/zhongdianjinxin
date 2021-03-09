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
      <template slot-scope="scope" slot="stateSearch">
        <el-select placeholder="品牌状态" v-model="searchForm.state">
          <el-option v-for="item in stateList" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </template>
      <template slot-scope="scope" slot="isReviewSearch">
        <el-select placeholder="是否审核" v-model="searchForm.isReview">
          <el-option v-for="item in isReviewList" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </template>
      <template slot-scope="scope" slot="reviewTimeSearch">
        <el-date-picker
          v-model="reviewDate"
          type="datetimerange"
          range-separator="至"
          start-placeholder="审核时间起"
          end-placeholder="审核时间止">
        </el-date-picker>
      </template>
      <template slot="inquireName" slot-scope="scope">
        <div class="underline" @click.stop="handleEdit(scope.row, '0', scope.index)">{{ scope.row.inquireName }}</div>
      </template>
      <template slot-scope="scope" slot="menu">
        <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
              @click.stop="handleEdit(scope.row, '1')">审核</span>
        <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
              @click.stop="handleDel(scope.row)">删除</span>
      </template>
    </avue-crud>
    <Comp1 ref="ref_Comp1" @getList="getList"></Comp1>
  </div>
</template>

<script>
  import Comp1 from "./Comp1";

  export default {
    name: "Review",
    components: {Comp1},
    data() {
      return {
        reviewDate: [],
        searchForm: {
          state: '',
          isReview: ''
        },
        isReviewList: [{
          id: '0',
          label: '是'
        }, {
          id: '1',
          label: '否'
        }],
        stateList: [{
          id: '0',
          label: '草稿'
        }, {
          id: '1',
          label: '待审核'
        }, {
          id: '2',
          label: '审核失败'
        }],
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
            label: '品牌状态',
            prop: 'state',
            type: 'select',
            search: true,
            searchSpan: 12,
            minWidth: '120px',
            searchslot: true
          }, {
            label: '是否审核',
            prop: 'isReview',
            type: 'select',
            search: true,
            searchSpan: 12,
            minWidth: '120px',
            searchslot: true
          }, {
            label: '申请人',
            prop: 'registrationNumber',
            minWidth: '120px',
          }, {
            label: '申请时间',
            prop: 'roleGrade',
            minWidth: '200px',
          }, {
            label: '申请操作',
            prop: 'roleGrade',
            minWidth: '200px',
          }, {
            label: '审核人',
            prop: 'roleGrade',
            minWidth: '120px',
          }, {
            label: '审核时间',
            prop: 'reviewTime',
            minWidth: '200px',
            search: true,
            searchSpan: 12,
            type: 'datetimerange',
            searchslot: true
          }, {
            label: '审核备注',
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
      searchChange() {
      },
      // 重置
      searchReset() {
        this.searchForm.state = ''
        this.searchForm.is = ''
        this.reviewDate = []
      },
      currentChange() {
      },
      sizeChange() {
      },
      // 打开修改
      handleEdit(row, val) {
        this.$refs.ref_Comp1.openWin(row, val);
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

<style scoped>
  /deep/ .avue-form__menu > .el-form-item > .el-form-item__content {
    float: right;
  }
  .underline {
    color: #409eff;
    text-decoration: underline;
    cursor: pointer
  }
</style>
