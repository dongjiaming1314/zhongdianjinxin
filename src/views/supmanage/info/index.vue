<template>
  <basic-container>
    <div class="btn-wrapper">
      <el-radio-group v-model="activeName" @change="onRadioChange">
        <el-radio-button label="query">供应商信息查询</el-radio-button>
        <el-radio-button label="apply">申请列表</el-radio-button>
        <el-radio-button label="check">审核列表</el-radio-button>
        <!-- <el-radio-button :label="role === 1 ? '申请列表' : '审核列表'"></el-radio-button> -->
      </el-radio-group>
    </div>
    <div :is="activeName"></div>
    <!-- <query v-if="isQuery"></query>
    <template v-else>
      <apply v-if="role === 1"></apply>
      <check v-else-if="role === 2"></check>
    </template> -->
  </basic-container>
</template>
<script>
import Query from "./query.vue";
import Apply from "./apply.vue";
import Check from "./check.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Query,
    Apply,
    Check
  },
  data() {
    return {
      isQuery: true,
      // 1申请人员 2审核人员
      role: 2,
      activeName: "query"
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  methods: {
    onRadioChange(label) {
      this.activeName = label;
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-wrapper {
  text-align: center;
  margin-bottom: 15px;
}
.is-align-center {
  text-align: center;
}
::v-deep .el-input__inner {
  padding-right: 0;
}
::v-deep .el-table__row {
  .el-button {
    i {
      display: none;
    }
  }
}

::v-deep .avue-group {
  .el-collapse-item__header {
    visibility: hidden;
  }
}
::v-deep .avue-crud__pagination {
  text-align: center;
  margin-bottom: 5px;
}
</style>
