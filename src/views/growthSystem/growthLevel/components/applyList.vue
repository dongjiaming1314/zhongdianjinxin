<template>
  <div>
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      :search.sync="searchForm"
      @on-load="getList"
      @search-change="searchChange"
      @selection-change="selectionChange"
      @size-change="sizeChange"
      @cell-click="rowDetail"
    >
      <template #statusSearch>
        <el-select v-model="searchForm.status"></el-select>
      </template>

      <template #isOrNotSearch>
        <el-select v-model="searchForm.isOrNot"></el-select>
      </template>

      <template #menu="record">
        <el-button size="small" type="text">撤回</el-button>
        <el-button size="small" type="text">查看</el-button>
        <el-button size="small" type="text">编辑</el-button>
        <el-button size="small" type="text">删除</el-button>
      </template>
    </avue-crud>
  </div>
</template>
<script>
import { tableOption } from "@/const/crud/growthLevel/applyList";
export default {
  data() {
    return {
      page: {},
      tableData: [
        {
          ruleName: "11111"
        }
      ],
      tableLoading: false,
      tableOption,
      searchForm: {}
    };
  },
  methods: {
    getList() {},
    searchChange(val, done) {
      done();
    },
    selectionChange() {},
    sizeChange() {},
    rowDetail() {}
  },
  mounted() {}
};
</script>

<style></style>
