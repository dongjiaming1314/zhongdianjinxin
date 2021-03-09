<template>
    <div>
        <avue-crud ref="crud" :page.sync="page" :data="tableData" :table-loading="tableLoading" :option="tableOption" :search.sync="searchForm" :cell-class-name="cellClass" @search-change="searchChange" @size-change="sizeChange" @cell-click="rowDetail">
            <template #menu="scope">
                <el-button type="text" size="small" @click="handleUpdate(scope.row, scope.index)">修改</el-button>
                <el-button type="text" size="small" @click="handleDelete(scope.row, scope.index)">删除</el-button>
            </template>
        </avue-crud>

        <!-- 审核调整 -->
        <check-adjust v-if="checkAdjustVisible" :checkAdjustVisible.sync="checkAdjustVisible"></check-adjust>
        <check-batch-adjust v-if="checkBatchAdjustVisible" :checkBatchAdjustVisible.sync="checkBatchAdjustVisible"></check-batch-adjust>
        <check-frozen v-if="checkFrozenVisible" :checkFrozenVisible.sync="checkFrozenVisible"></check-frozen>
        <check-traw v-if="checkTrawVisible" :checkTrawVisible.sync="checkTrawVisible"></check-traw>
    </div>
</template>
<script>
import { applyOption } from "@/const/crud/account/accumulatePoints";
import CheckAdjust from "./components/checkAdjust";
import CheckBatchAdjust from "./components/checkBatchAdjust.vue";
import CheckFrozen from "./components/checkFrozen.vue";
import CheckTraw from "./components/checkTraw.vue";
export default {
  components: { CheckAdjust, CheckBatchAdjust, CheckFrozen, CheckTraw },
  data() {
    return {
      tableOption: applyOption,
      page: {
        pageSize: 20,
        pagerCount: 5,
        total: 1
      },
      tableLoading: false,
      searchForm: {},
      cellClass: () => {},
      tableData: [
        {
          type: "调整",
          adjustWay: "单调",
          adjustType: "调增",
          num: "4000000014",
          fileName: "-",
          amount: "1000",
          status: "待审核"
        },
        {
          type: "调整",
          adjustWay: "单调",
          adjustType: "调增",
          num: "4000000015",
          fileName: "1545454.txt",
          amount: "1000",
          status: "待审核"
        },
        {
          type: "冻结",
          adjustWay: "-",
          adjustType: "-",
          num: "4000000016",
          fileName: "-",
          amount: "-",
          status: "待审核"
        }
      ],
      type: 1, // 1:调整,2:批量调整,3:冻结,4:解冻
      checkAdjustVisible: false,
      checkBatchAdjustVisible: false,
      checkFrozenVisible: false,
      checkTrawVisible: false
    };
  },
  methods: {
    // 修改
    handleUpdate() {
      this.type = row.type;
      if (this.type == 1) {
        this.checkAdjustVisible = true;
      } else if (this.type == 2) {
        this.checkBatchAdjustVisible = true;
      } else if (this.type == 3) {
        this.checkFrozenVisible = true;
      } else if (this.type == 4) {
        this.checkTrawVisible = true;
      }
    }
  },
  // 删除
  handleDelete(row) {}
};
</script>
<style scoped>
.form {
  overflow: hidden;
}
</style>
