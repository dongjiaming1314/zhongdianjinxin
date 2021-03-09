<template>
  <div class="adetail">
    <el-row :gutter="10">
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
        <h3 class="title">客户积分账户三级子账户信息</h3>
      </el-col>
      <el-col style="textAlign: right" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <el-button size="small" @click="backTo" type="primary">关闭</el-button>
      </el-col>
    </el-row>
    <info :style="{'margin-bottom': 20+'px'}" :detailOption="detailOption"></info>
    <avue-crud :table-loading="tableLoading" :page.sync="page" @on-load="onLoad" :option="tableOption" :data="dataList" @current-change="currentChange">
      <template slot-scope="scope" slot="menu">
        <el-button type="text" size="small" @click="handleView(scope.row)">查看</el-button>
      </template>
    </avue-crud>
  </div>
</template>
<script>
import { thridLevelOption } from "@/const/crud/account/accumulatePoints";
import info from "@/components/info";
import { getYearRule } from "@/api/account/accumulatePoints";
export default {
  props: ["rowInfo"],
  data() {
    return {
      dataList: [{ actNo: "1" }],
      tableOption: thridLevelOption,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      detailOption: [
        { label: "客户号", value: "" },
        { label: "所属机构", value: "" },
        { label: "年份", value: "" },
        { label: "获取积分值", value: "" },
        { label: "已使用积分值", value: "" },
        { label: "调增积分值", value: "" },
        { label: "调减积分值", value: "" },
        { label: "剩余积分值", value: "" }
      ]
    };
  },
  components: {
    info
  },
  created() {
    this.fillInfo(this.rowInfo);
  },
  methods: {
    //列表加载
    onLoad(page, params) {
      this.tableLoading = true;
      if (this.rowInfo.custNo) {
        getYearRule(
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
    //填充数据
    async fillInfo(data) {
      // let response = await remoteDic("equity_type");
      // let equityTypes = response.data.data.equity_type;
      this.detailOption.map(item => {
        if (item.label == "客户号") {
          item.value = data.custNo;
        }
        if (item.label == "所属机构") {
          item.value = data.orgName;
        }
        if (item.label == "年份") {
          item.value = data.integralYear;
        }
        if (item.label == "获取积分值") {
          item.value = data.avaIntegral;
        }
        if (item.label == "已使用积分值") {
          item.value = data.usedIntegral;
        }
        if (item.label == "调增积分值") {
          item.value = data.cumulativeIncr;
        }
        if (item.label == "调减积分值") {
          item.value = data.cumulativeReduction;
        }
        if (item.label == "剩余积分值") {
          item.value = data.residueIntegral;
        }
      });
    },
    backTo() {
      this.$emit("fun", "list");
    },
    handleView(data) {
      this.$emit("fun", "detail");
      this.$emit("getRow", data);
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
