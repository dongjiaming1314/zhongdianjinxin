<template>
  <common-dialog labelPosition="right" :visible.sync="visible" size="large" :label-width="'100px'" :title="dialogTitle">
    <info :detailOption="detailOption1"></info>
    <!-- <div v-if="type === 1" :class="`remark remark${type}`">
      <span :class="`label`">备注{{type}}：</span>
      <span :class="`content`">kkklalala啦啦啦</span>
    </div> -->
    <info :detailOption="detailOption2"></info>
    <el-form class="form" ref="checkForm" :model="form" label-width="35%" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请结果：" prop="checkStatus">
            <el-radio v-model="form.checkStatus" label="7">审核通过</el-radio>
            <el-radio v-model="form.checkStatus" label="5">审核不通过</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="调整备注：" prop="checkMark">
            <el-input type="textarea" v-model="form.checkMark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <template #footer>
      <el-button type="primary" size="small" @click="checkSubmit">提交</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </template>
  </common-dialog>
</template>

<script>
import Info from "@/components/info";
import { saveAdjustAudit, saveFrzAudit, equityJob } from "@/api/account/equity";
import { remoteDic } from "@/api/admin/dict";
export default {
  components: { Info },
  props: {
    checkVisible: {
      type: Boolean,
      default: () => false
    },
    type: Number,
    rowInfo: Object
  },
  data() {
    return {
      visible: this.checkVisible,
      detailOption1: [
        { label: "客户号", value: "" },
        { label: "权益类型", value: "" },
        { label: "权益编码", value: "" },
        { label: "权益名称", value: "" },
        { label: "操作模式", value: "" },
        { label: "", value: "", bgColor: "#fff" },
        { label: "申请备注", value: "" }
      ],
      detailOption2: [
        { label: "申请人", value: "", bgColor: "#fff" },
        { label: "申请时间", value: "", bgColor: "#fff" }
      ],
      form: {
        checkStatus:"7"
      },
      dialogTitle: "申请审核",
      rules: {
        checkStatus: [
          { required: true, message: "请选择审核结果", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    checkVisible(val, oldVal) {
      if (val === oldVal) return;
      this.visible = val;
    },
    visible(val, oldVal) {
      if (val === oldVal) return;
      this.$emit("update:checkVisible", val);
    },
    type: {
      handler(val, oldVal) {
        if (val === "1") {
          this.dialogTitle = "客户调整审核";
          this.detailOption1.splice(5, 0, { label: "调整类型", value: "" });
          this.detailOption1.splice(6, 0, { label: "调整额度", value: "" });
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
    this.fillInfo();
  },
  methods: {
    //填充数据
    async fillInfo() {
      let response = await remoteDic(
        "equity_type,equity_account_operation,common_adjust_type"
      );
      let equityTypes = response.data.data.equity_type;
      let operations = response.data.data.equity_account_operation;
      let adjustTypes = response.data.data.common_adjust_type;
      this.detailOption1.map(item => {
        if (item.label == "客户号") {
          item.value = this.rowInfo.custNo;
        }
        if (item.label == "权益类型") {
          equityTypes.map(ite => {
            if (ite.value == this.rowInfo.equityType) {
              item.value = ite.label;
            }
          });
        }
        if (item.label == "权益编码") {
          item.value = this.rowInfo.equityId;
        }
        if (item.label == "权益名称") {
          item.value = this.rowInfo.equityName;
        }
        if (item.label == "操作模式") {
          operations.map(ite => {
            if (ite.value == this.rowInfo.operation) {
              item.value = ite.label;
            }
          });
        }
        if (item.label == "申请备注") {
          item.value = this.rowInfo.applyReason;
        }
        if (item.label == "调整类型") {
          adjustTypes.map(ite => {
            if (ite.value == this.rowInfo.adjustType) {
              item.value = ite.label;
            }
          });
        }
        if (item.label == "调整额度") {
          item.value = this.rowInfo.adjustValue;
        }
      });
      this.detailOption2.map(item => {
        if (item.label == "申请人") {
          item.value = this.rowInfo.createdBy;
        }
        if (item.label == "申请时间") {
          item.value = this.rowInfo.createdTime;
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
          this.form.equityId = this.rowInfo.equityId;
          if (this.rowInfo.operation == "1") {
            this.form.adjustApplyId = this.rowInfo.id;
            saveAdjustAudit(this.form).then(res => {
              this.$message({
                type: "success",
                message: "审核成功"
              });
              if (this.form.checkStatus == "7") {
                equityJob();
              } else {
                return;
              }
              this.cancel();
              this.$emit("refreshHandle");
            });
          } else if (this.rowInfo.operation == "3") {
            this.form.freezeApplyId = this.rowInfo.id;
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
            this.form.freezeApplyId = this.rowInfo.id;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.remark {
  display: inline-flex;
  padding: 10px 0;
  width: 100%;
  span {
    display: inline-block;
  }
  .label {
    text-align: right;
    box-sizing: border-box;
    padding-right: 12px;
    width: 17%;
  }
  .content1 {
    width: 83%;
  }
}
.form {
  overflow: hidden;
  margin-top: 20px;
}
::v-deep .el-checkbox-button__inner,
.el-radio {
  font-weight: normal;
}
</style>
