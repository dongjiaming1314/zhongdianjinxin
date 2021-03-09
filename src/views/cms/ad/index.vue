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
          <el-tab-pane label='应用管理' name='themeManager'/>
          <el-tab-pane label='广告列表' name='adManager'/>
        </el-tabs>
      </template>
      <theme v-if="switchStatus==='themeManager'"></theme>
      <name v-if="switchStatus==='adManager'"></name>
    </basic-container>
  </div>
</template>

<script>
  import theme from './theme'
  import name from './name'
  export default {
    name: 'ad',
    components: {
      theme,
      name
    },
    data() {
      return {
        switchStatus: 'themeManager'
      }
    },
    methods: {
      /**
       * @title切换tab
       **/
      handleSwitchTab(tab, event) {
        this.switchStatus = tab.name
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
