<template>
  <div>
    <avue-crud :table-loading="tableLoading" :page.sync="page"  :option="tableOption" :search.sync="search" :data="dataList" @selection-change="selectionChange" @search-change="searchChange" @current-change="currentChange">
      <template #menu="scope">
        <el-button type="text" size="small" @click="handleView(scope.row, scope.index)">查看</el-button>
        <el-button v-if="scope.row.checkStatus == '3'" type="text" size="small" @click="handleCheck(scope.row, scope.index)">审核</el-button>
      </template>
    </avue-crud>
    <!-- 查看弹窗 -->
    <detail v-if="detailVisible" :detailVisible.sync="detailVisible" :rowInfo="rowInfo"></detail>
    <!-- 审核弹窗 -->
    <check-dialog v-if="checkVisible" :checkVisible.sync="checkVisible" :type="type" :rowInfo="rowInfo" @refreshHandle="refreshHandle"></check-dialog>
  </div>
</template>
<script>
import { checkOption } from "@/const/crud/account/equity";
import CheckDialog from "./components/checkDialog";
import Detail from "./components/detail";
import { getCheckList } from "@/api/account/equity";
import { remoteDic } from "@/api/admin/dict";
export default {
  components: { CheckDialog, Detail },
  data() {
    return {
      tableOption: checkOption,
      search: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      tableLoading: false,
      searchForm: {},
      cellClass: () => {},
      dataList: [],
      type: 1, // 0:调整,1:批量调整,2:冻结,3:解冻
      checkVisible: false,
      detailVisible: false,
      rowInfo: {}
    };
  },
  created(){
    this.onLoad(this.page)
  },
  methods: {
      //列表加载
    onLoad(page,params) {
      this.tableLoading = true;
      getCheckList(
        Object.assign({},params, {
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
      if(this.search){
        this.onLoad(this.page,this.search)
      }
    },
    //查询
    searchChange(params, done) {
      done();
      this.page.currentPage = 1;
      this.onLoad(this.page,params);
      this.search = JSON.parse(JSON.stringify(params))
    },
    //刷新
    refreshHandle() {
      this.onLoad(this.page);
    },
    // 查看
    handleView(row) {
      this.rowInfo = row;
      this.detailVisible = true;
    },
    // 审核
    handleCheck(row) {
      this.rowInfo = row;
      this.checkVisible = true;
      this.type = row.operation;
    }
  }
};
</script>
<style scoped>
.form {
  overflow: hidden;
}
</style>
