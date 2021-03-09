  <!--
  ~
  ~  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  ~
  -->

<template>
  <div class="execution">
    <basic-container>
      <template>
        <el-tabs @tab-click="handleSwitchTab" v-model="switchStatus">
          <el-tab-pane label="动态路由" name="routeManager" />
          <el-tab-pane label="网关管理" name="gatewayManager" />
          <el-tab-pane label="移动同步" name="synchronizeManager" />
        </el-tabs>
      </template>
      <gateway v-if="switchStatus==='gatewayManager'"></gateway>
      <route v-if="switchStatus==='routeManager'"></route>
      <synchronize v-if="switchStatus==='synchronizeManager'"></synchronize>
    </basic-container>
  </div>
</template>

<script>
import gateway from "./gateway";
import route from "./route";
import synchronize from "./synchronize";
export default {
  name: "routeGatewaySynchronize",
  components: {
    gateway,
    route,
    synchronize
  },
  data() {
    return {
      switchStatus: "synchronizeManager"
    };
  },
  methods: {
    /**
     * @title切换tab
     **/
    handleSwitchTab(tab, event) {
      this.switchStatus = tab.name;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
