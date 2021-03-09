<template>
  <common-dialog labelPosition="right" :visible.sync="visible" size="large" :label-width="'100px'" :title="dialogTitle">
    <info :detailOption="detailOption" :labelWidth="35"></info>
    <el-form class="form" ref="form" :model="form" label-width="35%">
      <el-row>
        <el-col :span="12">
          <el-form-item label="调整类型：" prop="adjustType">
            <el-radio v-model="form.adjustType" label="1">调增</el-radio>
            <el-radio v-model="form.adjustType" label="2">调减</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="调整额度：" prop="adjustValue">
            <el-input v-model="form.adjustValue"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备注：" prop="adjustReason">
            <el-input type="textarea" v-model="form.adjustReason"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button type="primary" size="small" @click="applySubmit">提交</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </template>
  </common-dialog>
</template>

<script>
import Info from "@/components/info";
import { remoteDic } from "@/api/admin/dict";
import { updateAdjustApply } from "@/api/account/equity";
export default {
  components: { Info },
  props: {
    applyVisible: {
      type: Boolean,
      default: () => false
    },
    rowInfo: Object
  },
  data() {
    return {
      visible: this.applyVisible,
      detailOption: [
        { label: "客户号", value: "" },
        { label: "权益类型", value: "" },
        { label: "权益编码", value: "" },
        { label: "权益名称", value: "" }
      ],
      form: {
        adjustType: "",
        adjustValue: "",
        adjustReason: ""
      },
      dialogTitle: ""
    };
  },
  watch: {
    applyVisible(val, oldVal) {
      if (val === oldVal) return;
      this.visible = val;
    },
    visible(val, oldVal) {
      if (val === oldVal) return;
      this.$emit("update:applyVisible", val);
    }
  },
  created() {
    this.fillInfo();
  },
  methods: {
    //填充数据
    async fillInfo() {
      let response = await remoteDic("equity_type");
      let equityTypes = response.data.data.equity_type;
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
      });
      this.form.adjustType = this.rowInfo.adjustType;
      this.form.adjustValue = this.rowInfo.adjustValue;
      this.form.adjustReason = this.rowInfo.applyReason;
    },
    applySubmit() {
      updateAdjustApply(
        Object.assign(this.form, { adjustApplyId: this.rowInfo.id })
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.cancel();
          this.$emit("refreshHandle");
        }
      });
    },
    cancel() {
      this.visible = !this.visible;
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
