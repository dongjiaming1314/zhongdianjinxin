<template>
  <div>
    <avue-crud :table-loading="tableLoading" :page.sync="page" :option="tableOption" :search.sync="search" :data="dataList" @selection-change="selectionChange" @search-change="searchChange" @current-change="currentChange">
      <template #menu="scope">
        <el-button type="text" size="small" @click="handleView(scope.row, scope.index)">查看</el-button>
        <el-button v-if="scope.row.checkStatus == '3'" type="text" size="small" @click="handleCheck(scope.row, scope.index)">审核</el-button>
      </template>
    </avue-crud>

    <!-- 审核调整 -->
    <check-adjust v-if="checkAdjustVisible" :checkAdjustVisible.sync="checkAdjustVisible" :rowInfo="rowInfo" @refreshHandle="refreshHandle" :type="type"></check-adjust>
    <!-- <check-batch-adjust v-if="checkBatchAdjustVisible" :checkBatchAdjustVisible.sync="checkBatchAdjustVisible" :rowInfo="rowInfo"></check-batch-adjust>
    <check-frozen v-if="checkFrozenVisible" :checkFrozenVisible.sync="checkFrozenVisible" :rowInfo="rowInfo"></check-frozen>
    <check-traw v-if="checkTrawVisible" :checkTrawVisible.sync="checkTrawVisible" :rowInfo="rowInfo"></check-traw> -->
  </div>
</template>
<script>
import { checkOption } from "@/const/crud/account/accumulatePoints";
import CheckAdjust from "./components/checkAdjust";
import CheckBatchAdjust from "./components/checkBatchAdjust.vue";
import CheckFrozen from "./components/checkFrozen.vue";
import CheckTraw from "./components/checkTraw.vue";
import { getCheckList } from "@/api/account/accumulatePoints";
export default {
  components: { CheckAdjust, CheckBatchAdjust, CheckFrozen, CheckTraw },
  data() {
    return {
      tableOption: checkOption,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      tableLoading: false,
      searchForm: {},
      cellClass: () => {},
      dataList: [
        // {
        //   type: "调整",
        //   adjustWay: "单调",
        //   adjustType: "调增",
        //   num: "4000000014",
        //   fileName: "-",
        //   amount: "1000",
        //   status: "待审核"
        // }
      ],
      type: "1", // 1:调整,2:批量调整,3:冻结,4:解冻
      checkAdjustVisible: false,
      checkBatchAdjustVisible: false,
      checkFrozenVisible: false,
      checkTrawVisible: false,
      rowInfo: {}
    };
  },
  created() {
    this.onLoad(this.page);
  },
  methods: {
    //列表加载
    onLoad(page, params) {
      this.tableLoading = true;
      getCheckList(
        Object.assign({}, params, {
          size: page.pageSize,
          current: page.currentPage
        })
      )
        .then(res => {
          this.dataList = res.data.data.records;
          this.page.total = res.data.data.total;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    //分页
    currentChange(val) {
      this.page.currentPage = val;
      if (this.search) {
        this.onLoad(this.page, this.search);
      }
    },
    //查询
    searchChange(params, done) {
      done();
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      this.search = JSON.parse(JSON.stringify(params));
    },
    // 查看
    handleView(row) {
      this.$emit("fun", "detailtwo");
      this.$emit("getRow", row);
    },
    // 审核
    handleCheck(row) {
      this.type = row.operation;
      this.rowInfo = row;
      this.checkAdjustVisible = true;
    },
    //刷新
    refreshHandle() {
      this.onLoad(this.page);
    }
  }
};
</script>
<style scoped>
.form {
  overflow: hidden;
}
</style>
