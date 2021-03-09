<template>
  <div class="adetail">
    <el-row :gutter="10">
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
        <h3 class="title">积分规则明细列表</h3>
      </el-col>
      <el-col style="textAlign: right" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <el-button size="small" @click="backTo" type="primary">关闭</el-button>
      </el-col>
    </el-row>
    <avue-crud :table-loading="tableLoading" :page.sync="page" @on-load="onLoad" :option="tableOption" :data="dataList" @current-change="currentChange">
    </avue-crud>
  </div>
</template>
<script>
import { detailLevelOption } from "@/const/crud/account/accumulatePoints";
import info from "@/components/info";
import { getIntegralFlow } from "@/api/account/accumulatePoints";
export default {
  props: ["rowInfo"],
  data() {
    return {
      tableData: [{ name: "1" }],
      tableOption: detailLevelOption,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  components: {
    info
  },
  methods: {
    //列表加载
    onLoad(page, params) {
      this.tableLoading = true;
      if (this.rowInfo.custNo) {
        getIntegralFlow(
          Object.assign(
            { custNo: this.rowInfo.custNo },
            {
              size: this.page.pageSize,
              current: this.page.currentPage
            }
          )
        )
          .then(res => {
            this.dataList = res.data.data.records;
            this.page.total = res.data.data.total;
            this.tableLoading = false;
          })
          .catch(() => {
            this.tableLoading = false;
          });
      } else {
        this.tableLoading = false;
      }
    },
    //分页
    currentChange(val) {
      this.page.currentPage = val;
    },
    backTo() {
      this.$emit("fun", "list");
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  border-left: 4px solid #0780ff;
  padding-left: 8px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 20px;
}
.adetail ::v-deep {
  .avue-crud__menu {
    display: none;
  }
}
</style>
