<template>
  <common-dialog labelPosition="right" :visible.sync="visible" size="large" :label-width="'100px'" :title="dialogTitle">
    <div>
      <info :detailOption="detailOption" :labelWidth="35"></info>
    </div>
    <template #footer>
      <el-button size="small" @click="cancel">关闭</el-button>
    </template>
  </common-dialog>

</template>

<script>
import Info from "@/components/info";
import { remoteDic } from "@/api/admin/dict";
export default {
  components: { Info },
  props: {
    detailVisible: {
      type: Boolean,
      default: () => false
    },
    rowInfo: Object
  },
  data() {
    return {
      visible: this.detailVisible,
      detailOption: [
        { label: "客户号", value: "" },
        { label: "权益类型", value: "" },
        { label: "权益编码", value: "" },
        { label: "权益名称", value: "" },
        { label: "当前周期", value: "" },
        { label: "权益次数", value: "" },
        { label: "操作模式", value: "" },
        { label: "调整类型", value: "" },
        { label: "账户状态", value: "" },
        { label: "申请备注", value: "" }
      ]
    };
  },
  watch: {
    detailVisible(val, oldVal) {
      if (val === oldVal) return;
      this.visible = val;
    },
    visible(val, oldVal) {
      if (val === oldVal) return;
      this.$emit("update:detailVisible", val);
    }
  },
  created() {
    this.fillInfo();
  },
  methods: {
    //填充数据
    async fillInfo() {
      let response = await remoteDic(
        "equity_type,equity_account_operation,common_adjust_type,common_account_status"
      );
      let equityTypes = response.data.data.equity_type;
      let operations = response.data.data.equity_account_operation;
      let adjustTypes = response.data.data.common_adjust_type;
      let status = response.data.data.common_account_status;
      this.detailOption.map(item => {
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
        if (item.label == "当前周期") {
          item.value = this.rowInfo.period;
        }
        if (item.label == "权益次数") {
          item.value = this.rowInfo.remainTimes;
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
        if (item.label == "账户状态") {
          status.map(ite => {
            if (ite.value == this.rowInfo.status) {
              item.value = ite.label;
            }
          });
        }
        if (item.label == "申请备注") {
          item.value = this.rowInfo.applyReason;
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
::v-deep .form {
  overflow: hidden;
  .el-col-12 {
    &:nth-child(2n-1) {
      border-right: 5px solid #fff;
    }
    &:nth-child(2n) {
      border-left: 5px solid #fff;
    }
  }
}
</style>
