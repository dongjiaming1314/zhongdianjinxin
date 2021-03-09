<template>
  <common-dialog
    labelPosition="right"
    :visible.sync="visible"
    size="large"
    :label-width="'100px'"
    title="客户积分账户解冻审核"
  >
    <info :detailOption="detailOption"></info>
    <el-form
      class="form"
      ref="form"
      :model="form"
      label-width="35%"
    >
      <el-col :span="12">
        <el-form-item label="申请结果：" prop="name">
          <el-radio v-model="form.type" label="1">审核通过</el-radio>
          <el-radio v-model="form.type" label="2">审核不通过</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="调整备注：" prop="name">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <template #footer>
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small">提交</el-button>
    </template>
  </common-dialog>
</template>

<script>
import Info from "@/components/info"
export default {
  components: {Info},
  props: {
    checkTrawVisible: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      visible: this.checkTrawVisible,
      detailOption: [
        {label: "客户号", value: "1000001"},
        {label: "所属机构", value: "北京分行"},
        {label: "积分总值", value: "20000"},
        {label: "已使用积分值", value: "5000"},
        {label: "剩余积分值", value: "15000"},
        {label: "操作模式", value: "解冻"},
        {label: "备注", value: ""},
        {label: "申请人", value: "张三"},
        {label: "申请时间", value: "2020-11-27 09:23:23"},
      ],
      form: {},
    }
  },
  watch: {
    checkTrawVisible(val, oldVal) {
      if (val === oldVal) return
      this.visible = val
    },
    visible(val, oldVal) {
      if (val === oldVal) return
      this.$emit("update:checkTrawVisible", val)
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  overflow: hidden;
  margin-top: 20px;
}
</style>

