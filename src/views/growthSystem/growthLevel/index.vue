<template>
  <basic-container>
    <radio-button :activeName.sync="activeName" :tabs="ruleSettingTab"></radio-button>
    <component :is="componentName" mode="out-in"></component>
  </basic-container>
</template>

<script>
import RadioButton from '@/components/radioButton';
import levelSearch from "./components/levelSearch";
import applyList from "./components/applyList";
import auditList from "./components/auditList";
export default {
  data() {
    return {
      activeName: "成长等级查询",
      componentName: "levelSearch",
      tabType: 0
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
        name: 'levelSearch',
        label: '成长等级查询'
      }, {
        name: this.tabType == 0 ? 'applyList' : 'auditList',
        label: this.tabType == 0 ? '申请列表' : '审核列表'
      }]
    }
  },
  methods: {
    handleClick(val) {
      this.componentName = val.name;
    }
  },
  components: {
    levelSearch,
    applyList,
    auditList,
    RadioButton
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
