<template>
  <basic-container>
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      :cell-class-name="cellClass"
      @search-change="searchChange"
      @search-reset="searchReset"
      @current-change="currentChange"
      @size-change="sizeChange"
      @cell-click="rowDetail"
    >
      <template #menuLeft>
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
      </template>
      <template #menu="scope">
        <el-button type="text" size="small" @click="handleView(scope.row, scope.index)">查看</el-button>
        <el-button type="text" size="small" @click="handleEdit(scope.row, scope.index)">编辑</el-button>
        <el-button type="text" size="small" @click="handleDel(scope.row, scope.index)">删除</el-button>
      </template>
    </avue-crud>

    <!-- 新增 -->
    <add v-if="addVisible" :addVisible.sync="addVisible" :dialogTitle="dialogTitle"  :isEdit="isEdit"  :detail="detailData" @submitSuccess="submitSuccess"></add>

    <!-- 详情 -->
    <detail v-if="detailVisible" :detailVisible.sync="detailVisible" :data="detailData"></detail>
  </basic-container>
</template>

<script>
import {tableOption} from "@/const/crud/growthSystem/customerRank"
import {fetchList, del} from "@/api/growthSystem/customerRank"
import add from './add'
import detail from "./detail"

export default {
  components: {add, detail},
  data() {
    return {
      tableOption,
      tableLoading: false,
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      cellClass: ({row,column,rowIndex,columnIndex}) => {
        if (columnIndex == 1) return 'link'
      },
      searchForm: {},
      addVisible: false,
      detailVisible: false,
      dialogTitle: 0,
      detailData: {},
      isEdit: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(form, done) {
      fetchList({
        current: this.page.currentPage,
        size: this.page.pageSize,
        ...form
      }).then(res => {
        done && done()
        this.tableLoading = false
        this.tableData = res.data.data.records
        this.page.total = res.data.data.total
      })
    },
    searchChange(form, done) {
      this.tableLoading = true
      this.searchForm = this.deepClone(form)
      this.getList(this.searchForm, done)
    },
    searchReset() {
      this.getList()
    },
    // 切换分页
    currentChange(current) {
      this.page.currentPage = current
      this.getList()
    },
    sizeChange(size) {
      this.page.pageSize = size
      this.getList()
    },
    rowDetail(row, column, cell, event) {
      if (column.property==="levelName") {
        this.handleView(row)
      }
    },
    // 新增
    handleAdd() {
      this.isEdit = false
      this.addVisible = true
      this.dialogTitle = 0
    },
    // 查看
    handleView(row) {
      this.detailVisible = true
      this.detailData = row
    },
    // 编辑
    handleEdit(row) {
      this.isEdit = true
      this.addVisible = true
      this.dialogTitle = 1
      this.detailData = row
    },
    // 删除
    handleDel(row) {
      this.$confirm('此操作将永久删除该规则，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          ids: row.id
        }
        del(params).then(res => {
          this.$message.success('删除成功')
          this.getList()
        })
      })
    },
    // 新增或编辑成功
    submitSuccess() {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .link {
  color: #409EFF!important;
  cursor: pointer;
}
</style>
