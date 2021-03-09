// create by yueyao
<template>
    <div class="block">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPageNum"
            :page-size="currentPageSize"
            :page-sizes="pageSizes"
            :pager-count="pagerCount"
            layout="total, sizes, prev, pager, next, slot, jumper"
            :total="total">
            <span class="totalPage">共{{totalPages}}页</span>
        </el-pagination>
  </div>
</template>
<script>
  export default {
   props: {
       // 当前页数
       currentPageNum: {
           type: Number
       },
        // 每页显示条目个数
        currentPageSize: {
            type: Number
        },
        // 页码按钮的数量
        pagerCount: {
            type: Number,
            default: 7
        },
        // 总条目数
        total: {
            type: Number
        }
   },
    data() {
      return {
        // 每页显示个数选择器的选项设置
        pageSizes: [10, 25, 50, 100],
        page: {
            limit: this.currentPageSize,
            page: this.currentPageNum,
        }
      };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total/this.currentPageSize)
        }
    },
     methods: {
        // 每页条数变更
        handleSizeChange(val) {
            this.page.limit = val;
            this.$emit('pageChange', this.page)
        },
        // 当前页码变更
        handleCurrentChange(val) {
            this.page.page = val;
            this.$emit('pageChange', this.page)
        }
    },
  }
</script>
<style lang="scss" scoped>
    .block {
        text-align: right;
        ::v-deep .el-pagination {
            padding-top: 24px;
            padding-bottom: 44px;
        };
       ::v-deep .el-pagination__total,  ::v-deep .el-pagination__sizes{
           float: left;
        };
        .totalPage {
            font-size: 13px;
            font-weight: 400;
        }
    }
</style>