<template>
  <div>
    <avue-crud
      :page.sync="page"
      :option="option"
      :search.sync="search"
      @cell-click="cellClick"
      :cell-style="cellStyle"
      :data="data"
      @search-change="searchChange"
    >
    </avue-crud>
  </div>
</template>
<script>
import { queryTableOption } from "@/const/crud/account/redEnvelopes";
export default {
  data() {
    return {
      page: {
          pageSize: 20,
          pagerCount:5,
          total:1,
      },
      search: {},
      data: [
        {
          namex: "张hfhhfhhfhfhhf三",
        },
      ],
      option: queryTableOption,
    };
  },
  methods: {
    //链接样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (column.property == "namex") {
        return {
            textDecoration:"underline",
            color: "#409EFF",
            cursor: "pointer"
        };
      }
    },
    //点击表格单元格进行详情跳转
    cellClick(row, column, cell, event) {
      if (column.property == "namex") {
        this.$emit("fun", "detail");
        //   console.log(row)
        //   this.$router.push('/acount/redEnvelopes/detail')
      }
    },
    searchSubmit(item) {
      // this.$message.success(JSON.stringify(item));
    },
    searchChange(params, done) {
      done();
      // this.$message.success(JSON.stringify(params));
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .avue-group {
  margin-top: 20px;
  .el-collapse-item {
    .el-collapse-item__arrow {
      display: none;
    }
  }
}
</style>
