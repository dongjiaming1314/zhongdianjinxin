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
        @size-change="sizeChange"
        @selection-change="selectionChange">
        <template slot-scope="scope" slot="userStateSearch">
          <el-select placeholder="员工状态" v-model="searchForm.userState">
            <el-option v-for="item in stateList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </template>
        <template slot="menuLeft">
          <div>
            <el-button
              type="primary"
              size="small"
              @click.stop="handleAdd()"
            >新增
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click.stop="handleDel()"
            >删除
            </el-button>
          </div>
        </template>
        <template slot="userName" slot-scope="scope">
          <div class="underline" @click.stop="handleView(scope.row,scope.index)">{{ scope.row.labelName }}</div>
        </template>
        <template slot-scope="scope" slot="menu">
          <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
                @click.stop="handleEdit(scope.row,scope.index)">编辑</span>
        </template>
      </avue-crud>
    </basic-container>
    <Comp1 ref="ref_Comp1" @getList="getList"></Comp1>
    <Comp2 ref="ref_Comp2"></Comp2>
  </div>
</template>

<script>
  import Comp1 from "./Comp1";
  import Comp2 from "./Comp2";
  import {
    fetchList,
  } from '@/api/shop/tag'

  export default {
    name: "index",
    components: {Comp1, Comp2},
    data() {
      return {
        searchForm: {
          userState: ''
        },
        stateList: [{
          id: '0',
          label: '在职'
        }, {
          id: '1',
          label: '离职'
        }],
        page: {
          total: 0, // 总数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
          pageSizes: [10, 20, 30, 50]
        },
        tableData: [],
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
          searchIcon: false,
          column: [{
            label: '员工姓名',
            prop: 'userName',
            fixed: true,
            slot: true,
            search: true,
            searchSpan: 12,
            minWidth: '120px',
            overHidden: true
          }, {
            label: '员工号',
            prop: 'userNo',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '手机号码',
            prop: 'phone',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '所属机构',
            prop: 'organization',
            type: 'select',
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '角色',
            type: 'select',
            prop: 'role',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '员工状态',
            type: 'select',
            prop: 'userState',
            search: true,
            searchSpan: 12,
            minWidth: '120px',
            searchslot: true
          }, {
            label: '密码',
            prop: 'password',
            minWidth: '120px',
            showColumn: false,
            hide: true
          }, {
            label: '上次登录时间',
            prop: 'roleGrade',
            minWidth: '200px',
            editDisplay: false,
            addDisplay: false,
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
        idList: []
      }
    },
    created() {
      this.getList(this.page)
    },
    methods: {
      // 获取列表数据
      getList(page, params) {
        fetchList(
          Object.assign(
            {
              current: page.currentPage,
              size: page.pageSize,
            },
            params
          )
        )
          .then(res => {
            this.tableData = res.data.data.records
            this.page.total = res.data.data.total
            this.tableLoading = false
          })
          .catch(() => {
            this.tableLoading = false
          })
      },
      searchChange(param, done) {
        done()
        this.getList(this.page, param)
      },
      // 重置
      searchReset() {
        this.searchForm.userState = ''
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
      // 打开详情
      handleView(row) {
        this.$refs.ref_Comp2.openWin(row);
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
        if (this.idList.length) {
          this.$confirm('此操作将删除选中的记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList()
          });
        } else {
          this.$message.warning('请选择至少一条记录')
        }
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
