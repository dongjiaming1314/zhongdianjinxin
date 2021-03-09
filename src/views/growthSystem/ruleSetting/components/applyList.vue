<template>
  <div>
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      :search.sync="searchForm"
      @on-load="getList"
      @search-change="searchChange"
      @selection-change="selectionChange"
      @size-change="sizeChange"
      @cell-click="rowDetail"
    >
      <template slot-scope="scope" slot="statusSearch">
        <el-select clearable v-model="searchForm.ruleStatus">
          <el-option></el-option>
        </el-select>
      </template>

      <template #menu="scope">
        <el-button type="text" size="small" @click="handleView">查看</el-button>
        <el-button type="text" size="small" @click="handleDelete">删除</el-button>
        <el-button type="text" size="small" @click="handleEdit(scope.row, scope.index)">编辑</el-button>
        <el-button type="text" size="small" @click="handleRecall(scope.row)">撤回</el-button>
      </template>
    </avue-crud>

    <!-- 详情 -->
    <detailDialog :visible.sync="detailVisible"></detailDialog>

    <!-- 编辑 -->
    <addDialog v-if="visible" :visible.sync="visible" :dialogTitle="dialogTitle"></addDialog>
  </div>
</template>

<script>
import { tableOption } from "@/const/crud/growthSystem/applyList";
import detailDialog from "./detailDialog";
import addDialog from "./addDialog";

export default {
  components: {
    detailDialog,
    addDialog
  },
  data() {
    return {
      page: {},
      tableData: [
        {
          person: '112'
        }
      ],
      tableLoading: false,
      tableOption,
      searchForm: {},
      tabPermission: '0',
      buttonPermission: '0',
      // 查看详情
      detailVisible: false,
      // 编辑
      visible: false,
      // 编辑标题
      dialogTitle: 1
    };
  },
  methods: {
    getList() {},
    searchChange() {},
    selectionChange() {},
    sizeChange() {},
    rowDetail() {},
    handleView() {
      this.detailVisible = true
    },
    // 删除单行数据
    handleDelete() {
      this.$confirm('此操作将永久删除该规则，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      })
    },
    // 编辑
    handleEdit() {
      this.visible = true
    },
    handleRecall() {}
  },
};
</script>

<style>
</style>
