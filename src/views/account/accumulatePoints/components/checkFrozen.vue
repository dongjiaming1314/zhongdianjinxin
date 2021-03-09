<template>
  <common-dialog labelPosition="right" :visible.sync="visible" size="large" :label-width="'100px'" title="客户积分账户冻结审核">
    <info :detailOption="detailOption"></info>
    <el-form class="form" ref="form" :model="form" label-width="35%">
      <el-col :span="12">
        <el-form-item label="申请结果：" prop="name">
          <el-radio v-model="form.type" label="7">审核通过</el-radio>
          <el-radio v-model="form.type" label="5">审核不通过</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="调整备注：" prop="name">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <template #footer>
      <el-button type="primary" size="small">提交</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </template>
  </common-dialog>
</template>

<script>
import Info from "@/components/info";
export default {
  components: { Info },
  props: {
    checkFrozenVisible: {
      type: Boolean,
      default: () => false
    },
     rowInfo: Object
  },
  data() {
    return {
      visible: this.checkFrozenVisible,
      detailOption: [
        { label: "客户号", value: "" },
        { label: "所属机构", value: "" },
        { label: "积分总值", value: "" },
        { label: "已使用积分值", value: "" },
        { label: "剩余积分值", value: "" },
        { label: "操作模式", value: "" },
        { label: "备注", value: "" },
        { label: "申请人", value: "" },
        { label: "申请时间", value: "" }
      ],
      form: {}
    };
  },
  watch: {
    checkFrozenVisible(val, oldVal) {
      if (val === oldVal) return;
      this.visible = val;
    },
    visible(val, oldVal) {
      if (val === oldVal) return;
      this.$emit("update:checkFrozenVisible", val);
    }
  },
  created() {
    this.fillInfo(this.rowInfo);
  },
};
</script>

<style lang="scss" scoped>
.form {
  overflow: hidden;
  margin-top: 20px;
}
</style>

