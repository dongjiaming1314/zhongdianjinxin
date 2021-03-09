<template>
  <common-dialog
    labelPosition="left"
    :visible.sync="ruleStopVisible"
    size="default"
    :label-width="'140px'"
    title="规则暂停"
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
        <el-form-item label="暂停原因">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <template #footer>
      <el-button size="small" @click="ruleStopVisible = !ruleStopVisible">取消</el-button>
      <el-button size="small">确认</el-button>
    </template>
  </common-dialog>
</template>

<script>
export default {
  data() {
    return {
      ruleStopVisible: this.visible,
    };
  },
  watch: {
    visible(val, oldVal) {
      if (val == oldVal) {
        return;
      }
      this.ruleStopVisible = val;
    },
    ruleStopVisible(val, oldVal) {
      if (val == oldVal) return;
      this.$emit("update:visible", val);
    },
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.mb_10 {
  margin-bottom: 10px;
}
</style>