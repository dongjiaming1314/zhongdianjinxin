<template>
  <div>
    <avue-crud :table-loading="tableLoading" :page.sync="page" @cell-click="cellClick" @on-load="onLoad" :cell-style="cellStyle" :option="tableOption" :search.sync="search" :data="dataList" @selection-change="selectionChange" @search-change="searchChange" @current-change="currentChange">
      <template #menu="scope">
        <el-button v-if="scope.row.operation == '1' || scope.row.operation =='2'" type="text" size="small" @click="handleUpdate(scope.row, scope.index)">编辑</el-button>
        <el-button type="text" size="small" @click="deleteHandle(scope.row, scope.index)">删除</el-button>
      </template>
    </avue-crud>

    <!-- 申请修改弹窗 -->
    <apply-dialog v-if="applyVisible" :applyVisible.sync="applyVisible" :rowInfo="rowInfo" @refreshHandle="refreshHandle"></apply-dialog>
  </div>
</template>
<script>
import { applyOption } from "@/const/crud/account/equity";
import ApplyDialog from "./components/applyDialog";
import { getApplyList, deleteAdjustApply } from "@/api/account/equity";
import { remoteDic } from "@/api/admin/dict";
export default {
  components: { ApplyDialog },
  data() {
    return {
      tableOption: applyOption,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 1
      },
      tableLoading: false,
      dataList: [],
      searchForm: {},
      cellClass: () => {},
      tableData: [],
      applyVisible: false,
      rowInfo: {}
    };
  },
  methods: {
    //列表加载
    onLoad(page, params) {
      this.tableLoading = true;
      getApplyList(
        Object.assign({}, params, {
          size: this.page.pageSize,
          current: this.page.currentPage
        })
      ).then(res => {
        this.dataList = res.data.data.records;
        this.page.total = res.data.data.total;
        this.tableLoading = false;
      });
    },
    //分页
    currentChange(val) {
      this.page.currentPage = val;
    },
    //查询
    searchChange(params, done) {
      done();
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
    },
    // 编辑
    handleUpdate(row) {
      this.rowInfo = row;
      this.applyVisible = true;
      //   this.type = row.type;
    },
    //刷新事件
    refreshHandle() {
      this.onLoad(this.page);
    },
    //删除申请
    deleteHandle(row) {
      deleteAdjustApply(row.id).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.onLoad(this.page);
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
