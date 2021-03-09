<template>
  <div>
    <el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="name" label="供应商名称" width="120">
      </el-table-column>
      <el-table-column prop="address" label="供应商编号" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData:[]
    };
  },
  methods: {
    handleSelectionChange(){}
  }
};
</script>

<style lang='scss' scoped>
</style>

