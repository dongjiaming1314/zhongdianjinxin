<template>
  <basic-container>
    <radio-button :activeName.sync="activeName" :tabs="ruleSettingTab"></radio-button>
    <component :is="componentName" mode="out-in"></component>
  </basic-container>
</template>

<script>
import ruleSearch from "./components/ruleSearch";
import applyList from "./components/applyList";
import auditList from "./components/auditList";
import RadioButton from '@/components/radioButton';
export default {
  data() {
    return {
      activeName: "规则查询",
      componentName: "ruleSearch",
      // 0 显示申请列表 1显示审核列表
      tabType: 0,
    };
  },
  watch: {
    activeName(val, oldVal) {
      this.componentName = this.ruleSettingTab.find(item => item.label == val).name
    }
  },
  computed: {
    ruleSettingTab() {
      return [{
        name: 'ruleSearch',
        label: '规则查询'
      }, {
        name: this.tabType == 0 ? 'applyList' : 'auditList',
        label: this.tabType == 0 ? '申请列表' : '审核列表'
      }]
    }
  },
  components: {
    ruleSearch,
    applyList,
    auditList,
    RadioButton
  },
  methods: {
    handleClick(val) {
      this.componentName = val.name;
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.is-align-center {
  text-align: center;
}
::v-deep .avue-group {
  margin-top: 20px;
  .el-collapse-item {
    .el-collapse-item__arrow {
      display: none;
    }
  }
}
</style>
