<template>
  <div>
    <avue-crud :page.sync="page" :option="option" :table-loading="tableLoading" :data="dataList" @selection-change="selectionChange" @search-change="searchChange" :search.sync="search" @current-change="currentChange">
      <!--<template slot="menuLeft">
        <el-button type="primary" @click="handleAdjustBatch" size="small">批量调整</el-button>
      </template>-->
      <template slot="acctStatus" slot-scope="scope">
        {{ scope.row.acctStatus | toAcctStatus}}
      </template>
      <template #menu="scoped">
        <el-button type="text" @click="handleView(scoped.row)" size="small">查看</el-button>
        <el-button type="text" @click="handleAdjust(scoped.row)" size="small">调整</el-button>
        <el-button v-if="scoped.row.acctStatus == '1'" type="text" @click="handleFrozen(scoped.row)" size="small">冻结</el-button>
        <el-button v-if="scoped.row.acctStatus == '2'" type="text" @click="handleTraw(scoped.row)" size="small">解冻</el-button>
      </template>
    </avue-crud>
    <!-- 解冻，冻结，余量调整弹框 -->
    <common-dialog labelPosition="right" :visible.sync="visible" size="large" :label-width="'100px'" :title="dialogTitle">
      <!-- 单项调整 -->
      <adjust v-if="type === 0" ref="ref_adjust" :info="info"></adjust>
      <!-- 批量调整 -->
      <batch-adjust v-if="type === 1"></batch-adjust>
      <!-- 冻结、解冻-->
      <frozen v-if="type===2 || type===3" ref="ref_frozen" :info="info" :type="type"></frozen>

      <template #footer>
        <el-button type="primary" @click="handelOn" size="small">提交</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </template>
    </common-dialog>
  </div>
</template>
<style scoped></style>
<script>
import {
  getEsIntegralAcct,
  applyEsIntegralAdjust,
  applyEsIntegralFrzorThaw
} from "@/api/account/accumulatePoints";
import { queryTableOption } from "@/const/crud/account/accumulatePoints";
import Adjust from "./components/adjust";
import BatchAdjust from "./components/batchAdjust";
import Frozen from "./components/frozen";

export default {
  filters: {
    toAcctStatus: function(val) {
      console.log(val);
      if (val === "1") {
        return "正常";
      } else if (val === "2") {
        return "冻结";
      }
    }
  },
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      info: {},
      //选中的list
      selectedlist: [],
      search: {},
      dataList: [],
      option: queryTableOption,
      visible: false,
      type: 0, // 0:调整,1:批量调整,2:冻结,3:解冻
      dialogTitle: ""
    };
  },
  components: {
    Adjust,
    BatchAdjust,
    Frozen
  },
  mounted() {
    // this.onLoad(this.page);
  },
  created() {
    this.onLoad(this.page);
  },
  methods: {
    //列表加载
    onLoad(page, params) {
      this.tableLoading = true;
      getEsIntegralAcct(
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
    handleView(row) {
      this.$emit("fun", "detailtwo");
      this.$emit("getRow", row);
    },
    handleAdjust(row) {
      this.info = row;
      this.visible = true;
      this.type = 0;
      this.dialogTitle = "客户积分账户调整";
    },
    //批量调整
    handleAdjustBatch() {
      if (this.selectedlist.length == 0) {
        this.$message.warning("请勾选积分账户");
      } else {
        this.visible = "true";
        this.type = 1;
        this.dialogTitle = "客户积分账户批量调整";
      }
    },
    handleFrozen(row) {
      this.info = row;
      this.visible = true;
      this.type = 2;
      this.dialogTitle = "客户积分账户冻结申请";
    },
    handleTraw(row) {
      this.info = row;
      this.visible = true;
      this.type = 3;
      this.dialogTitle = "客户积分账户解冻申请";
    },
    handelOn() {
      if (this.type === 0) {
        this.$refs.ref_adjust.$refs.form.validate(valid => {
          if (valid) {
            applyEsIntegralAdjust(
              Object.assign(this.$refs.ref_adjust.addForm, {
                checkStatus: "3",
                operation: "1"
              })
            )
              .then(res => {
                this.$message.success("调整成功");
                this.onLoad(this.page);
                this.cancel()
              })
              .catch(res => {
                this.$message.error(res);
              });
          } else {
            return false;
          }
        });
      } else if (this.type === 2) {
        applyEsIntegralFrzorThaw(
          Object.assign(this.$refs.ref_frozen.addForm, {
            freezeFlag: "3",
            checkStatus: "3"
          })
        )
          .then(res => {
            this.$message.success("冻结成功");
            this.onLoad(this.page);
            this.cancel()
          })
          .catch(res => {
            this.$message.error(res);
          });
      } else if (this.type === 3) {
        applyEsIntegralFrzorThaw(
          Object.assign(this.$refs.ref_frozen.addForm, {
            freezeFlag: "4",
            checkStatus: "3"
          })
        )
          .then(res => {
            this.$message.success("解冻成功");
            this.onLoad(this.page);
            this.cancel()
          })
          .catch(res => {
            this.$message.error(res);
          });
      }
    },
    cancel() {
      this.visible = false;
      if (this.type == 0) {
        this.$refs.ref_adjust.clearHandle();
        this.$refs.ref_adjust.$refs.form.resetFields();
      }
      if (this.type == 2) {
        this.$refs.ref_frozen.clearHandle();
      }
      if (this.type == 3) {
        this.$refs.ref_frozen.clearHandle();
      }
    },
    selectionChange(list) {
      this.selectedlist = list;
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  overflow: hidden;
}
</style>
