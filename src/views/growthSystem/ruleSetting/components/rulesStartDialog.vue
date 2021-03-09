<template>
  <common-dialog
    labelPosition="left"
    :visible.sync="ruleStartVisible"
    size="default"
    :label-width="'140px'"
    title="规则生效"
  >
    <el-row class="mb_10">
      <div>已选规则</div>
      <div>
        <el-table :data="stopTable">
          <el-table-column label="规则名称" prop></el-table-column>
          <el-table-column label="规则状态" prop></el-table-column>
          <el-table-column label="生效开始时间" prop></el-table-column>
          <el-table-column label="生效结束时间" prop></el-table-column>
        </el-table>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="生效原因">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <template #footer>
      <el-button size="small" @click="ruleStartVisible = !ruleStartVisible">取消</el-button>
      <el-button size="small">确认</el-button>
    </template>
  </common-dialog>
</template>

<script>
export default {
  data() {
    return {
      ruleStartVisible: this.visible,
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  watch: {
    visible(val, oldVal) {
      if (val == oldVal) return;
      this.ruleStartVisible = val;
    },
    ruleStartVisible(val, oldVal) {
      if (val == oldVal) return;
      this.$emit("update:visible", val);
    },
  },
};
</script>
 
<style lang="scss" scoped>
.mb_10 {
  margin-bottom: 10px;
}
</style>