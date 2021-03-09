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
        <template slot-scope="scope" slot="SensitiveControlSearch">
          <el-select placeholder="敏感数据控制" v-model="searchForm.SensitiveControl">
            <el-option v-for="item in controlList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </template>
        <template slot="menuLeft">
          <div>
            <el-button
              type="primary"
              size="small"
              @click.stop="handleAdd()"
            >新增</el-button>
            <el-button
              type="primary"
              size="small"
              @click.stop="handleDel()"
            >删除</el-button>
          </div>
        </template>
        <template slot-scope="scope" slot="menu">
          <span style="cursor: pointer;color: #409EFF;padding: 0 5px" @click.stop="handleWarrant(scope.row,scope.index)">角色授权</span>
          <span style="cursor: pointer;color: #409EFF;padding: 0 5px" @click.stop="handleEdit(scope.row,scope.index)">编辑</span>
        </template>
      </avue-crud>
    </basic-container>
    <Comp1 ref="ref_Comp1" @getList="getList"></Comp1>
    <Comp2 ref="ref_Comp2" @getList="getList"></Comp2>
  </div>
</template>

<script>
  import Comp1 from "./Comp1";
  import Comp2 from "./Comp2";
  export default {
    name: "index" ,
    components: { Comp1, Comp2 },
    data() {
      return {
        searchForm: {
          SensitiveControl: ''
        },
        controlList: [{
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
          roleNo: 'roleNo',
          roleName: 'roleName',
          SensitiveControl: 'SensitiveControl',
          creator: 'creator',
          createTime: 'createTime',
          editor: 'editor',
          editTime: 'editTime'
        }, {
          id: 'id1',
          roleNo: 'roleNo1',
          roleName: 'roleName1',
          SensitiveControl: 'SensitiveControl1',
          creator: 'creator1',
          createTime: 'createTime1',
          editor: 'editor1',
          editTime: 'editTime1'
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
          searchIcon: false,
          column: [{
            label: '角色编号',
            prop: 'roleNo',
            fixed: true,
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '角色名称',
            prop: 'roleName',
            search: true,
            searchSpan: 12,
            minWidth: '120px'
          }, {
            label: '敏感数据控制',
            type: 'select',
            prop: 'SensitiveControl',
            search: true,
            searchSpan: 12,
            minWidth: '120px',
            searchslot: true
          }, {
            label: '创建者',
            prop: 'creator',
            minWidth: '120px',
            editDisplay: false,
            addDisplay: false,
          }, {
            label: '创建时间',
            prop: 'createTime',
            minWidth: '200px',
            editDisplay: false,
            addDisplay: false,
          }, {
            label: '修改人',
            prop: 'editor',
            minWidth: '120px',
            editDisplay: false,
            addDisplay: false,
          }, {
            label: '修改时间',
            prop: 'editTime',
            minWidth: '200px',
            editDisplay: false,
            addDisplay: false,
          }, {
            label: '备注',
            prop: 'remark',
            type: 'textarea',
            minWidth: '200px'
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
      searchChange() {},
      // 重置
      searchReset() {
        this.searchForm.SensitiveControl = ''
      },
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
      handleWarrant(row) {
        this.$refs.ref_Comp2.openWin(row);
      },
      // 勾选
      selectionChange(row) {
        if(row.length) {
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
</style>
