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
          <el-tab-pane label="文章管理" name="listManager" />
          <el-tab-pane label="分类管理" name="categoryManager" />
          <el-tab-pane label="标签管理" name="tagManager" />
        </el-tabs>
      </template>
      <list v-if="switchStatus==='listManager'"></list>
      <category v-if="switchStatus==='categoryManager'"></category>
      <tag v-if="switchStatus==='tagManager'"></tag>
    </basic-container>
  </div>
</template>

<script>
import list from "./list";
import category from "./category";
import tag from "./tag";
export default {
  name: "article",
  components: {
    list,
    category,
    tag
  },
  data() {
    return {
      switchStatus: "listManager"
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
