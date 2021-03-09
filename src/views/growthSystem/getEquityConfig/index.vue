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
      <template #levelNameSearch>
        <el-select v-model="searchform.levelCode" placeholder="请选择" clearable>
            <el-option v-for="item in levelList" :key="item.id" :label="item.levelName" :value="item.levelCode"></el-option>
            <div style="bottom: 0;width: 100%;background: #fff">
              <el-pagination
                small
                @current-change="handleRankCurrentChange"
                :current-page="rankPage.current"
                layout="prev, pager,next,total"
                :page-size="rankPage.size"
                :total="rankTotal">
              </el-pagination>
            </div>
          </el-select>
      </template>
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
    <add v-if="addVisible" :addVisible.sync="addVisible" :isEdit="isEdit" @submitSuccess="submitSuccess" :batchNumber="batchNumber"></add>

    <!-- 详情 -->
    <detail v-if="detailVisible" :detailVisible.sync="detailVisible" :batchNumber="batchNumber"></detail>
  </basic-container>
</template>

<script>
import {fetchList, del} from "@/api/growthSystem/getEquityConfig"
import {fetchList as fetchRankList} from "@/api/growthSystem/customerRank"
import {tableOption} from "@/const/crud/growthSystem/getEquityConfig"
import Add from './add'
import Detail from './detail'
export default {
  components: {Add,Detail},
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
      addVisible: false,
      isEdit: 0, // 0 新增，1 编辑
      detailVisible: true,
      rankPage: {
        current: 1,
        size: 5
      },
      rankTotal: 0,
      levelList: [],
      searchform: {},
      id: null,
      batchNumber: null,
    }
  },
  created() {
    this.getList()
    this.getCustomerRank()
  },
  methods: {
    getList(form, done) {
      fetchList({
        current: this.page.currentPage,
        size: this.page.pageSize,
        ...form
      }).then(res => {
        const data = res.data.data
        this.tableData = data.records
        this.page.total = data.total
        done && done()
      })
    },
    rowDetail(row, column, cell, event) {
      if (column.property==="levelCode") {
        this.handleView(row)
      }
    },
    searchChange(form, done) {
      this.getList(this.searchform, done)
    },
    searchReset() {
      this.searchform = {}
      this.getList()
    },
    sizeChange(size) {
      this.page.pageSize = size
      this.getList()
    },
    currentChange(current) {
      this.page.currentPage = current
      this.getList()
    },
    getCustomerRank() {
      fetchRankList({...this.rankPage}).then(res => {
        const data = res.data.data
        this.levelList = data.records
        this.rankTotal = data.total
      })
    },
    handleRankCurrentChange(current) {
      this.rankPage.current = current
      this.getCustomerRank()
    },
    // 新增
    handleAdd() {
      this.addVisible = true
      this.isEdit = 0
    },
    // 查看
    handleView(row) {
      this.detailVisible = true
      this.batchNumber = row.batchNumber
    },
    // 编辑
    handleEdit(row) {
      this.addVisible = true
      this.isEdit = 1
      this.batchNumber = row.batchNumber
    },
    // 删除
    handleDel(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该规则，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          batchNumbers: row.batchNumber
        }
        del(params).then(res => {
          this.$message.success('删除成功')
          this.getList()
        })
      })
    },
    submitSuccess() {
      this.getList()
      if (this.isEdit) {
        this.$message.success("新增成功")
      } else {
        this.$message.success("编辑成功")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .link {
  color: #409EFF!important;

}
</style>
