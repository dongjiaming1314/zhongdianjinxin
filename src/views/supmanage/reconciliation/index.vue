<template>
  <basic-container>
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      @search-change="searchChange"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
      <template slot-scope="scope" slot="menu">
        <el-button
          v-if="permissionList.downBtn"
          type="text"
          size="small"
          @click.stop="handleDown(scope.row, scope.index)"
        >
          下载
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>
<script>
import {tableOption} from "@/const/crud/supmanage/reconciliation"
import {mapGetters} from "vuex"
import {fetchList, reconciliation, downLoad} from "@/api/supmanage/reconciliation"
export default {
  data() {
    return {
      tableOption: tableOption,
      tableData: [],
      tableLoading: false,
      page: {
        currentPage: 1,
        total: 1,
        pageSize: 20
      }
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    permissionList() {
      return {
        downBtn: this.vaildData(this.permissions.supmanage_reconciliation_down)
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.tableData = [{id: 1, userName: 111}]
      fetchList().then(res => {

      }).catch(({data}) => {
        console.log(data)
      })
    },
    // 对账
    searchChange(form, done) {
      reconciliation().then(res => {

      })
    },
    handleDown() {
      downLoad().then(res => {

      }).catch(err => {
        console.log(err)
      })
    },
    currentChange(val) {
      this.page.currentPage = val
      this.getList(this.page)
    },
    sizeChange(val) {
      this.psge.pageSize = val
      this.getList(this.page)
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .avue-group {
  .el-collapse-item__header {
    visibility: hidden;
  }
}
::v-deep .avue-crud__pagination {
  text-align: center;
  margin-bottom: 5px;
}
</style>
