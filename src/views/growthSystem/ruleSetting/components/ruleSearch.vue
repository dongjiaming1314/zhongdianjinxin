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
      <template slot="menuLeft">
        <el-button type="primary" size="small" @click.native="openDialog">新增</el-button>
        <el-button size="small" type="primary" @click="handleDeleteBatch  ">删除</el-button>
        <el-button size="small" type="primary" @click="doStop">暂停</el-button>
        <el-button size="small" type="primary" @click="doStart">生效</el-button>
      </template>

      <template #ruleName="record">
        <el-button type="text" @click="handleView(record.row)">{{
          record.row.ruleName
        }}</el-button>
      </template>

      <template #menu="scope">
        <el-button
          type="text"
          size="small"
          @click.stop="handleView(scope.row)"
          >查看</el-button
        >
        <el-button
          type="text"
          size="small"
          @click.stop="handleEdit(scope.row, scope.index)"
          >编辑</el-button
        >
        <el-button
          type="text"
          size="small"
          @click.stop="handleDelete(scope.row, scope.index)"
          >删除</el-button
        >
      </template>

      <template slot-scope="scope" slot="ruleStatusSearch">
        <el-select clearable v-model="searchForm.ruleStatus">
          <el-option></el-option>
        </el-select>
      </template>
    </avue-crud>

    <!-- 新增 -->
    <addDialog v-if="visible" :visible.sync="visible" :dialogTitle="dialogTitle"></addDialog>

    <!-- 详情 -->
    <detailDialog :visible.sync="detailVisible"></detailDialog>

    <!-- 规则暂停 -->
    <rulesStopDialog :visible.sync="ruleStopVisible"></rulesStopDialog>

    <!-- 规则生效 -->
    <rulesStartDialog :visible.sync="ruleStartVisible"></rulesStartDialog>
  </div>
</template>

<script>
import { tableOption } from "@/const/crud/growthSystem/ruleSetting";
import { deepClone } from "@/util/tag";
import addDialog from "./addDialog";
import detailDialog from "./detailDialog";
import rulesStopDialog from "./rulesStopDialog";
import rulesStartDialog from "./rulesStartDialog";
export default {
  data() {
    return {
      tableData: [
        {
          ruleName: "111",
          ruleStatus: '11'
        }
      ],
      tableLoading: false, 
      tableOption,
      searchForm: {},
      visible: false,
      ruleVisible: false,
      detailVisible: false,
      detailTable: [],
      selectData: [],
      dialogTitle: 0,
      ruleStopVisible: false,
      stopTable: [],
      ruleStartVisible: false
    };
  },
  components: {
    addDialog,
    detailDialog,
    rulesStopDialog,
    rulesStartDialog
  },
  methods: {
    getList() {},
    searchChange(val) {},
    selectionChange(val) {
      this.selectData = val.map(item => item.id);
    },
    sizeChange() {},
    rowDetail() {},
    openDialog() {
      this.visible = true;
      this.dialogTitle = 0;
    },
    handleView() {
      this.detailVisible = true;
    },
    // 暂停规则
    doStop() {
      if (this.validatenull(this.selectData)) {
        this.$message.warning('请选择要删除的规则')
        return
      }
      this.ruleStopVisible = true;
    },
    // 生效规则
    doStart() {
      if (this.validatenull(this.selectData)) {
        this.$message.warning('请选择要删除的规则')
        return
      }
      this.ruleStartVisible = true;
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
    // 批量删除数据
    handleDeleteBatch() {
      if (this.validatenull(this.selectData)) {
        this.$message.warning('请选择要删除的规则')
        return
      }
    },
    // 编辑规则
    handleEdit(row) {
      this.visible = true
      this.dialogTitle = 1
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.inline_block {
  display: inline-block;
}

.mr_10 {
  margin-right: 10px;
}

.px {
  padding-left: 10px;
  padding-right: 10px;
}

.width_120 {
  width: 100px;
  // text-align: right;
}

.mb_10 {
  margin-bottom: 10px;
}
</style>
