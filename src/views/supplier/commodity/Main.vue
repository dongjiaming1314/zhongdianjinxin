<template>
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
      <template slot-scope="scope" slot="isSecondSearch">
        <el-select placeholder="是否秒杀" v-model="searchForm.isSecond">
          <el-option v-for="item in isSecondList" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </template>
      <template slot-scope="scope" slot="isHotSearch">
        <el-select placeholder="是否为热门商品" v-model="searchForm.isHot">
          <el-option v-for="item in isHotList" :key="item.id" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </template>
      <template slot-scope="scope" slot="createTimeSearch">
        <el-date-picker
          v-model="createTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="创建时间起"
          end-placeholder="创建时间止">
        </el-date-picker>
      </template>
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
              @click.stop="handleView(scope.row,scope.index)">详情</span>
        <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
              @click.stop="handleEdit(scope.row,scope.index)">编辑</span>
        <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
              @click.stop="handleDel(scope.row,scope.index)">删除</span>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  export default {
    name: "Main",
    data() {
      return {
        createTime: [],
        searchForm: {
          isSecond: '',
          isHot: '',
        },
        isSecondList: [{
          id: '0',
          label: '是'
        }, {
          id: '1',
          label: '否'
        }],
        isHotList: [{
          id: '0',
          label: '是'
        }, {
          id: '1',
          label: '否'
        }],
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
          formWidth: '100%',
          searchBtnText: '查询',
          searchBtnIcon: 'none',
          emptyBtnText: '重置',
          emptyBtnIcon: 'none',
          searchLabelWidth: 120,
          searchIcon: false,
          column: [{
            label: '商品名称',
            prop: 'userName',
            fixed: true,
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '商品ID',
            prop: 'userNo',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '所属供应商',
            prop: 'phone',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '商品类型',
            prop: 'organization',
            type: 'select',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '商品状态',
            type: 'select',
            prop: 'role',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '是否秒杀',
            type: 'select',
            prop: 'isSecond',
            search: true,
            searchSpan: 12,
            minWidth: '120px',
            searchslot: true
          }, {
            label: '是否为热门商品',
            type: 'select',
            prop: 'isHot',
            search: true,
            searchSpan: 12,
            minWidth: '120px',
            searchslot: true
          }, {
            label: '创建人',
            prop: 'roleGrade',
            minWidth: '120px',
          }, {
            label: '创建时间',
            prop: 'createTime',
            type: 'datetimerange',
            minWidth: '200px',
            search: true,
            searchSpan: 12,
            searchslot: true
          }, {
            label: '库存',
            prop: 'roleGrade',
            minWidth: '120px',
          }, {
            label: '审核状态',
            prop: 'remark',
            minWidth: '120px',
          }]
        },
      }
    },
    mounted() {
      this.getList();
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
        this.$emit('editShow', false)
      },
      // 打开修改
      handleEdit(row) {
        this.$emit('editShow', false)
      },
      // 打开详情
      handleView(row) {
        this.$refs.ref_Comp2.openWin(row);
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
