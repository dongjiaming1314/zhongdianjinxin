<template>
  <common-dialog
    labelPosition="right"
    :visible.sync="visible"
    size="large"
    :label-width="'100px'"
    title="客户积分账户批量调整审核"
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
    checkBatchAdjustVisible: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      visible: this.checkBatchAdjustVisible,
      detailOption: [
        {label: "调整类型", value: "调增"},
        {label: "调整额度", value: "1000"},
        {label: "客户列表", value: "20201127.txt", type: "link"},
        {label: "备注", value: ""},
        {label: "申请人", value: "张三"},
        {label: "申请时间", value: "2020-11-27 09:23:23"},
      ],
      form: {},
    }
  },
  watch: {
    checkBatchAdjustVisible(val, oldVal) {
      if (val === oldVal) return
      this.visible = val
    },
    visible(val, oldVal) {
      if (val === oldVal) return
      this.$emit("update:checkBatchAdjustVisible", val)
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

