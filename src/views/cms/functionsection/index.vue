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
          <el-tab-pane label='主题图标' name='themeManager'/>
          <el-tab-pane label='基本版块' name='basicManager'/>
          <el-tab-pane label='默认排序' name='ordersManager'/>
        </el-tabs>
      </template>
      <theme v-if="switchStatus==='themeManager'"></theme>
      <basic v-if="switchStatus==='basicManager'"></basic>
      <orders v-if="switchStatus==='ordersManager'"></orders>
    </basic-container>
  </div>
</template>

<script>
  import theme from './theme'
  import basic from './basic'
  import orders from './orders'
  export default {
    name: 'functionsection',
    components: {
      theme,
      basic,
      orders
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
