<template>
  <div>
    <div class="btn-wrapper">
      <el-radio-group v-model="activeName" style="display: table;margin: 0 auto">
        <el-radio-button label="aquery">积分账户查询</el-radio-button>
<!--        <el-radio-button label="apply">申请列表</el-radio-button>-->
        <el-radio-button label="check">审核列表</el-radio-button>
      </el-radio-group>
    </div>
    <div :is="activeName" v-on="$listeners"></div>
  </div>
</template>
<script>
import check from "@/views/account/accumulatePoints/check";
import apply from "@/views/account/accumulatePoints/apply";
import aquery from "@/views/account/accumulatePoints/aquery";

export default {
  data() {
    return {
      activeName: "aquery",
    };
  },
  components: {
    check,
    aquery,
  },
  methods: {
    check(name) {
      this.activeName = name;
    }
  },
};
</script>
<style lang="scss" scoped>
.btn-wrapper {
  text-align: center;
}
::v-deep .avue-group {
  margin-top: 15px;
  .el-collapse-item {
    .el-collapse-item__arrow {
      display: none;
    }
  }
}
</style>
