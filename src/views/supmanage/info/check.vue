<template>
  <div>
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      @search-change="searchChange"
      @search-reset="searchReset"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
      <template
        slot-scope="scope"
        slot="supplierName"
      >
        <span
          class="link"
          @click="handleView(scope.row)"
        >{{ scope.row.supplierName }}
        </span>
      </template>
      <template slot="examineTimeSearch">
        <div class="date-wrapper">
          <el-date-picker
            v-model="dateRange.startTime"
            type="date"
            placeholder="选择日期"
            :picker-options="startTimePicker"
          >
          </el-date-picker>
          <span class="to">至</span>
          <el-date-picker
            v-model="dateRange.endTime"
            type="date"
            placeholder="选择年日期"
            :picker-options="endTimePicker"
          >
          </el-date-picker>
        </div>
      </template>
      <template
        slot-scope="scope"
        slot="menu"
      >
        <el-button
          type="text"
          icon="el-icon-check"
          size="small"
          @click.stop="handleView(scope.row)"
        >查看</el-button>
        <el-button
          type="text"
          icon="el-icon-check"
          size="small"
          v-if="scope.row.checkStatus === '3' "
          @click.stop="handleCheck(scope.row, scope.index)"
        >审核</el-button>
      </template>
    </avue-crud>
    <view-detail
      v-if="supplierView"
      :view.sync="supplierView"
      :supplierForm="supplierForm"
    ></view-detail>
    <check-dialog
      v-if="checkView"
      :view.sync="checkView"
      :supplierForm="supplierForm"
      @refreshHandle="getList(page)"
    ></check-dialog>
  </div>
</template>
<script>
import { tableOption } from "@/const/crud/supmanage/check";
import { fetchList } from "@/api/supmanage/check";
import { deepClone } from "@/util/tag";
import { formatDate } from "@/util/date";
import { mapGetters } from "vuex";
import ViewDetail from "./components/viewDetail";
import checkDialog from "./components/checkDialog";
export default {
  components: { ViewDetail, checkDialog },
  data() {
    return {
      tableOption,
      tableData: [],
      tableLoading: false,
      supplierView: false,
      checkView: false,
      supplierForm: {},
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
      dateRange: {},
      searchForm: {},
      startTimePicker: {
        disabledDate: (time) => {
          const end =
            this.dateRange.endTime && this.dateRange.endTime.getTime();
          return time.getTime() > end - 24 * 60 * 60 * 1000;
        },
      },
      endTimePicker: {
        disabledDate: (time) => {
          const start =
            this.dateRange.startTime && this.dateRange.startTime.getTime();
          return time.getTime() < start + 24 * 60 * 60 * 1000;
        },
      },
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        reviewBtn: this.vaildData(this.permissions.supmanage_info_review),
      };
    },
  },
  watch: {
    "permissionList.reviewBtn": {
      handler(val, oldVal) {
        this.tableOption.menu = Boolean(val);
      },
      immediate: true,
    },
  },
  created() {
    this.getList(this.page);
  },
  methods: {
    getList(page, params, done) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          { current: page.currentPage, size: page.pageSize },
          // { checkStatus: 3 },
          params
        )
      ).then((res) => {
        this.tableData = res.data.data.records;
        this.page.total = res.data.data.total;
        this.tableLoading = false;
        if (typeof done != "undefined") done();
      });
    },
    searchChange(params, done) {
      let middle = deepClone(this.filterForm(params));
      if (typeof this.filterForm(this.dateRange)["startTime"] == "object") {
        middle["startTime"] = formatDate(
          this.filterForm(this.dateRange)["startTime"]
        ).replace(/\-/g, "/");
      }
      if (typeof this.filterForm(this.dateRange)["endTime"] == "object") {
        middle["endTime"] = formatDate(
          this.filterForm(this.dateRange)["endTime"]
        ).replace(/\-/g, "/");
      }
      this.searchForm = middle;
      this.getList(this.page, this.searchForm, done);
    },
    searchReset() {
      this.dateRange = {};
      this.searchForm = {};
      this.getList(this.page, this.searchForm);
    },
    handleCheck(row) {
      this.checkView = true;
      this.supplierForm = row;
      // row.flag = false;
      // examineSup({
      //   // checkMark: "string",
      //   checkStatus: "7",
      //   checkType: "1",
      // }).then(res => {});
    },
    currentChange(page) {
      this.page.currentPage = page;
      this.getList(this.page, this.searchForm);
    },
    sizeChange(size) {
      this.page.pageSize = size;
      this.getList(this.page, this.searchForm);
    },
    handleView(row) {
      this.supplierView = true;
      this.supplierForm = row;
    },
  },
};
</script>
<style lang="scss" scoped>
.date-wrapper {
  display: flex;
  .to {
    padding: 0 10px;
  }
}
.link {
  color: #409eff;
  text-decoration: underline;
  cursor: pointer;
}
::v-deep .avue-crud__tip {
  display: none;
}
</style>
