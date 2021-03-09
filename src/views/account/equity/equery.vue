<template>
  <div>
    <avue-crud
      :table-loading="tableLoading"
      :page.sync="page"
      @cell-click="cellClick"
      :cell-style="cellStyle"
      :option="option"
      :search.sync="search"
      :data="dataList"
      @selection-change="selectionChange"
      @search-change="searchChange"
      @current-change="currentChange"
    >
      <template slot="menuLeft">
        <!-- <el-button type="primary" @click="handleAdjustBatch" size="small">批量调整</el-button> -->
      </template>
      <template
        slot-scope="scope"
        slot="menu"
      >
        <!-- <el-button type="text" size="small" @click="handleView">查看</el-button> -->
        <el-button
          type="text"
          size="small"
          @click="handleAdjust(scope.row)"
        >调整</el-button>
        <el-button
          v-if="scope.row.status == '1'"
          type="text"
          size="small"
          @click="handleFrozen(scope.row)"
        >冻结</el-button>
        <el-button
          v-if="scope.row.status == '2'"
          type="text"
          size="small"
          @click="handleThow(scope.row)"
        >解冻</el-button>
      </template>
    </avue-crud>
    <!-- 解冻，冻结，余量调整弹框 -->
    <common-dialog
      labelPosition="right"
      :visible.sync="visible"
      size="large"
      :label-width="'100px'"
      :title="dialogTitle"
    >
      <!-- 单项调整 -->
      <adjust
        ref="adjustForm"
        v-if="type === 0"
        :rowInfo="rowInfo"
      ></adjust>
      <!-- 批量调整 -->
      <batch-adjust v-if="type === 1"></batch-adjust>
      <!-- 冻结、解冻-->
      <frozen
        ref="frozenForm"
        v-if="type===2 || type===3"
        :type="type"
        :rowInfo="rowInfo"
      ></frozen>
      <!-- 查看详情 -->
      <detail v-if="type===4"></detail>

      <template #footer>
        <el-button
          type="primary"
          size="small"
          @click="submit"
        >保存</el-button>
        <el-button
          size="small"
          @click="cancel"
        >取消</el-button>
      </template>
    </common-dialog>

  </div>
</template>
<style scoped></style>
<script>
import { queryTableOption } from "@/const/crud/account/equity";
import Adjust from "./components/adjust";
import BatchAdjust from "./components/batchAdjust";
import Frozen from "./components/frozen";
import Detail from "./components/detail";
import { getList, saveAdjustApply, saveFrzApply } from "@/api/account/equity";
import { remoteDic } from "@/api/admin/dict";
export default {
  components: { Adjust, BatchAdjust, Frozen, Detail },
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      tableLoading: false,
      option: queryTableOption,
      selectedlist: [], //选中的list
      search: {},
      dataList: [],
      visible: false,
      dialogTitle: "客户权益账户调整",
      type: 0, // 0:调整,1:批量调整,2:冻结,3:解冻 4:查看
      rowInfo: {},
    };
  },
  created() {
    this.onLoad(this.page);
  },
  methods: {
    //列表加载
    onLoad(page, params) {
      this.tableLoading = true;
      getList(
        Object.assign({}, params, {
          size: page.pageSize,
          current: page.currentPage,
        })
      )
        .then((res) => {
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
    submit() {
      let info = {};
      info.equityId = this.rowInfo.equityId;
      info.custNo = this.rowInfo.custNo;
      info.checkStatus = "3";
      if (this.type === 0) {
        let formInfo = this.$refs.adjustForm.$refs.form.model;
        info.adjustType = formInfo.adjustType;
        info.adjustReason = formInfo.adjustReason;
        info.adjustValue = parseInt(formInfo.adjustValue);
        info.operation = "1";
        this.$refs.adjustForm.$refs.form.validate((valid) => {
          if (valid) {
            console.log(info, "info");
            console.log(this.rowInfo, "this.rowInfo");
            if (info.adjustValue <= this.rowInfo.remainTimes) {
              saveAdjustApply(info).then(res => {
                if (res.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: "调整成功"
                  });
                  this.cancel();
                  this.onLoad(this.page);
                }
              });
            }else{
              this.$message.warning('不得大于权益次数！')
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
      if (this.type === 2) {
        let formInfo = this.$refs.frozenForm.$refs.form.model;
        info.freezeFlag = "3";
        info.applyReason = formInfo.applyReason;
        saveFrzApply(info).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "冻结成功",
            });
            this.cancel();
            this.formInfo = {};
            this.onLoad(this.page);
          }
        });
      }
      if (this.type === 3) {
        let formInfo = this.$refs.frozenForm.$refs.form.model;
        info.freezeFlag = "4";
        info.applyReason = formInfo.applyReason;
        saveFrzApply(info).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "解冻成功",
            });
            this.cancel();
            this.onLoad(this.page);
          }
        });
      }
    },
    //冻结按钮
    handleFrozen(data) {
      this.rowInfo = data;
      this.visible = "true";
      this.type = 2;
      this.dialogTitle = "客户权益冻结申请";
    },
    //解冻选择
    handleThow(data) {
      this.rowInfo = data;
      this.visible = "true";
      this.type = 3;
      this.dialogTitle = "客户权益解冻申请";
    },
    //批量调整
    handleAdjustBatch() {
      if (this.selectedlist.length == 0) {
        this.$message.warning("请勾选权益账户");
      } else {
        this.visible = "true";
        this.type = 1;
        this.dialogTitle = "客户权益账户批量调整";
      }
    },
    handleAdjust(data) {
      this.rowInfo = data;
      this.visible = "true";
      this.type = 0;
      this.dialogTitle = "客户权益账户调整";
    },

    //多选列表选择
    selectionChange(list) {
      this.selectedlist = list;
    },
    //链接样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (column.property == "name") {
        return {
          textDecoration: "underline",
          color: "#409EFF",
          cursor: "pointer",
        };
      }
    },
    //点击表格单元格进行详情跳转
    cellClick(row, column, cell, event) {
      if (column.property == "name") {
      }
    },
    //查看按钮
    handleView() {
      this.visible = "true";
      this.type = 4;
      this.dialogTitle = "查看权益账户";
    },
    cancel() {
      this.visible = false;
      if (this.type == 0) {
        this.$refs.adjustForm.clearHandle();
        this.$refs.adjustForm.$refs.form.resetFields();
      }
      if (this.type == 2) {
        this.$refs.frozenForm.clearHandle();
      }
      if (this.type == 3) {
        this.$refs.frozenForm.clearHandle();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  overflow: hidden;
}
</style>
