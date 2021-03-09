<template>
  <common-dialog labelPosition="right" :visible.sync="visible" size="large" :label-width="'100px'" title="客户积分账户调整审核">
    <info :detailOption="detailOption"></info>
    <el-form class="form" ref="checkForm" :model="form" label-width="35%" :rules="rules">
      <el-col :span="12">
        <el-form-item label="申请结果：" prop="checkStatus">
          <el-radio v-model="form.checkStatus" label="7">审核通过</el-radio>
          <el-radio v-model="form.checkStatus" label="5">审核不通过</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="调整备注：" prop="checkMark">
          <el-input type="textarea" v-model="form.checkMark"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <template #footer>
      <el-button type="primary" size="small" @click="checkSubmit">提交</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </template>
  </common-dialog>
</template>

<script>
import Info from "@/components/info";
import {
  saveAdjustAudit,
  saveFrzAudit,
  pointsJob
} from "@/api/account/accumulatePoints";
import { remoteDic } from "@/api/admin/dict";
export default {
  components: { Info },
  props: {
    checkAdjustVisible: {
      type: Boolean,
      default: () => false
    },
    rowInfo: Object,
    type: {
      type: String
    }
  },
  data() {
    return {
      visible: this.checkAdjustVisible,
      detailOption: [
        { label: "客户号", value: "" },
        { label: "所属机构", value: "" },
        { label: "积分总值", value: "" },
        { label: "已使用积分值", value: "" },
        { label: "剩余积分值", value: "" },
        { label: "操作模式", value: "" },
        { label: "备注", value: "" },
        { label: "", value: "" },
        { label: "申请人", value: "" },
        { label: "申请时间", value: "" }
      ],
      form: {
        checkStatus:"7"
      },
      rules: {
        checkStatus: [
          { required: true, message: "请选择审核结果", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    checkAdjustVisible(val, oldVal) {
      if (val === oldVal) return;
      this.visible = val;
    },
    visible(val, oldVal) {
      if (val === oldVal) return;
      this.$emit("update:checkAdjustVisible", val);
    },
    type: {
      handler(val, oldVal) {
        if (val === "1") {
          this.dialogTitle = "客户调整审核";
          this.detailOption.splice(6, 0, { label: "调整类型", value: "" });
          this.detailOption.splice(7, 0, { label: "调整额度", value: "" });
        } else if (val === "3") {
          this.dialogTitle = "客户权益冻结审核";
        } else if (val === "4") {
          this.dialogTitle = "客户权益解冻审核";
        }
      },
      immediate: true
    }
  },
  created() {
    console.log("type", this.type);
    this.fillInfo(this.rowInfo);
  },
  methods: {
    //填充数据
    async fillInfo(data) {
      let response = await remoteDic(
        "common_adjust_type,equity_account_operation"
      );
      let adjustTypes = response.data.data.common_adjust_type;
      let operations = response.data.data.equity_account_operation;
      this.detailOption.map(item => {
        if (item.label == "客户号") {
          item.value = data.custNo;
        }
        if (item.label == "所属机构") {
          item.value = data.orgName;
        }
        if (item.label == "积分总值") {
          item.value = data.totalIntegral;
        }
        if (item.label == "已使用积分值") {
          item.value = data.usedIntegral;
        }
        if (item.label == "剩余积分值") {
          item.value = data.avaIntegral;
        }
        if (item.label == "操作模式") {
          operations.map(ite => {
            if (ite.value == this.rowInfo.operation) {
              item.value = ite.label;
            }
          });
        }
        if (item.label == "调整类型") {
          adjustTypes.map(ite => {
            if (ite.value == this.rowInfo.adjustType) {
              item.value = ite.label;
            }
          });
        }
        if (item.label == "调整额度") {
          item.value = data.adjustValue;
        }
        if (item.label == "备注") {
          item.value = data.remark;
        }
        if (item.label == "申请人") {
          item.value = data.createdBy;
        }
        if (item.label == "申请时间") {
          item.value = data.createdTime;
        }
      });
    },
    checkSubmit() {
      this.$refs.checkForm.validate(valid => {
        if (valid) {
          this.form.adjustReason = this.rowInfo.adjustReason;
          this.form.adjustType = this.rowInfo.adjustType;
          this.form.adjustValue = this.rowInfo.adjustValue;
          this.form.custNo = this.rowInfo.custNo;
          if (this.rowInfo.operation == "1") {
            this.form.adjustApplyId = this.rowInfo.adjustApplyId;
            saveAdjustAudit(this.form).then(res => {
              this.$message({
                type: "success",
                message: "审核成功"
              });
              if (this.form.checkStatus == "7") {
                pointsJob();
              }
              this.cancel();
              this.$emit("refreshHandle");
            });
          } else if (this.rowInfo.operation == "3") {
            this.form.freezeApplyId = this.rowInfo.adjustApplyId;
            saveFrzAudit(
              Object.assign(this.form, {
                freezeFlag: "3"
              })
            ).then(res => {
              this.$message({
                type: "success",
                message: "审核成功"
              });
              this.cancel();
              this.$emit("refreshHandle");
            });
          } else if (this.rowInfo.operation == "4") {
            this.form.freezeApplyId = this.rowInfo.adjustApplyId;
            saveFrzAudit(
              Object.assign(this.form, {
                freezeFlag: "4"
              })
            ).then(res => {
              this.$message({
                type: "success",
                message: "审核成功"
              });
              this.cancel();
              this.$emit("refreshHandle");
            });
          }
        }
      });
    },
    cancel() {
      this.visible = false;
      this.form = {};
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  overflow: hidden;
  margin-top: 20px;
}
.table-container {
  width: 100%;
}
.table-item {
  position: relative;
  z-index: 0;
  display: inline-flex;
  width: 50%;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px 0;
  &:nth-child(2n-1) {
    border-right: 5px solid #fff;
  }
  &:nth-child(2n) {
    border-left: 5px solid #fff;
  }
  .label {
    text-align: right;
    display: inline-block;
    width: 35%;
    box-sizing: border-box;
    padding: 0 12px 0 0;
    font-size: 14px;
  }
  .value {
    text-align: left;
    word-break: break-all;
    display: inline-block;
    width: 65%;
    box-sizing: border-box;
    font-size: 14px;
  }
}
.table-item:nth-child(4n-3),
.table-item:nth-child(4n-2) {
  background-color: #f4f4f5;
}
</style>

