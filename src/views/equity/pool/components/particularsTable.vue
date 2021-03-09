<template>
  <div>
    <div class="cancelBtn">
      <el-button type="primary" size="small" @click="cancel">关闭</el-button>
    </div>
    <div style="text-align: center; margin-bottom: 15px">
      <el-radio-group v-model="selectRadioTable" @change="selectTab">
        <el-radio-button label="operation">操作历史</el-radio-button>
        <el-radio-button label="issue">发放历史</el-radio-button>
      </el-radio-group>
    </div>
    <template>
      <div v-if="selectRadioTable == 'operation'">
        <avue-crud
          ref="crud"
          :page.sync="page"
          :data="tableData"
          :permission="permissionList"
          :table-loading="tableLoading"
          :option="particularsOption"
          @search-change="searchChange"
          @current-change="currentChange"
          @size-change="sizeChange"
          @selection-change="selectionChange"
          @search-reset="searchReset"
        ></avue-crud>
      </div>
    </template>
    <template>
      <div v-if="selectRadioTable == 'issue'">
        <avue-crud
          ref="crud"
          :page.sync="issuePage"
          :data="issueTableData"
          :permission="permissionList"
          :table-loading="issuetableLoading"
          :option="issueOption"
          @search-change="issueSearchChange"
          @current-change="issueCurrentChange"
          @size-change="issueSizeChange"
          @search-reset="issueSearchReset"
        ></avue-crud>
      </div>
    </template>
  </div>
</template>
<script>
import Bus from "@/util/bus";
import { particularsOption, issueOption } from "@/const/crud/equity/pool";
import { adjustDetailPage } from "@/api/equity/pool";
import { deepClone } from "@/util/tag";
import { formatDate } from "@/util/date";
export default {
  props: ["id", "everyTable", "selectRadioTable", "six"],
  data() {
    return {
      particularsOption: particularsOption,
      issueOption: issueOption,
      tableData: [],
      issueTableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 //  每页显示多少条
      },
      issuePage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 //  每页显示多少条
      },
      tableLoading: false,
      issuetableLoading: false,
      searchForm: {},
      searchFormRight: {},
      checkTypeRecord: this.six,
    };
  },
  mounted() {
    if (this.everyTable == undefined) {
      this.getAdjustDetailPage({
        equityId: this.id.equityId,
        supplierBusinessId: this.id.supplierBusinessId,
        checkType: this.checkTypeRecord
      });
    } else {
      this.getAdjustDetailPage({
        equityId: this.id.equityId,
        supplierBusinessId: this.id.supplierBusinessId,
        createdDate: this.everyTable[0].createdDate
          ? this.everyTable[0].createdDate
          : this.everyTable[1].createdDate,
        checkType: this.six
      });
    }
  },
  methods: {
    // 关闭
    cancel() {
      Bus.$emit("equityPool", {
        first: "particulars",
        second: this.id
      });
    },
    // 查询
    getAdjustDetailPage(form) {
      this.tableLoading = true;
      adjustDetailPage(
        Object.assign({}, form, {
          current: this.page.currentPage,
          size: this.page.pageSize
        })
      )
        .then(res => {
          this.tableLoading = false;
          let tableOne = deepClone(res.data.data.records);
          let tableTwo = deepClone(res.data.data.records);
          tableOne.map(item => {
            if (item.checkType == "4") {
              item.checkTypeNo = "调增";
              item.incrNumber = item.adjustAmount;
            } else {
              item.checkTypeNo = "";
              item.decrNumber = item.adjustAmount;
            }
          });
          tableTwo.map(item => {
            if (item.checkType == "5") {
              item.checkTypeNo = "调减";
              item.incrNumber = item.adjustAmount;
            } else {
              item.checkTypeNo = "";
              item.decrNumber = item.adjustAmount;
            }
          });
          this.tableData = tableOne;
          this.issueTableData = tableTwo;
          this.page.total = res.data.data.total;
          this.issuePage.total = res.data.data.total;
        })
        .catch(err => {
          this.tableLoading = false;
        });
    },
    searchChange(form, done) {
      // this.searchForm = deepClone(form);
      let middle = this.deepClone(this.filterForm(form));
      if (typeof this.filterForm(form)["createdTime"] == "object") {
        middle["startTime"] = formatDate(
          this.filterForm(form)["createdTime"][0],
          "yyyy-MM-dd hh:mm:ss"
        );
        middle["endTime"] = formatDate(
          this.filterForm(form)["createdTime"][1],
          "yyyy-MM-dd hh:mm:ss"
        );
      }
      this.searchForm = deepClone(middle);
      if (this.everyTable == undefined) {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          startTime: middle.startTime,
          endTime: middle.endTime,
          checkType: this.checkTypeRecord
        });
      } else {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          createdDate: this.everyTable[0].createdDate
            ? this.everyTable[0].createdDate
            : this.everyTable[1].createdDate,
          checkType: this.six,
          startTime: middle.startTime,
          endTime: middle.endTime,
          checkType: this.checkTypeRecord
        });
      }
      done();
    },
    issueSearchChange(form, done) {
      let middle = this.deepClone(this.filterForm(form));
      if (typeof this.filterForm(form)["createdTime"] == "object") {
        middle["startTime"] = formatDate(
          this.filterForm(form)["createdTime"][0],
          "yyyy-MM-dd hh:mm:ss"
        );
        middle["endTime"] = formatDate(
          this.filterForm(form)["createdTime"][1],
          "yyyy-MM-dd hh:mm:ss"
        );
      }
      this.searchFormRight = deepClone(middle);
      if (this.everyTable == undefined) {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          startTime: middle.startTime,
          endTime: middle.endTime,
          cusName: middle.cusName,
          actName: middle.actName,
          checkType: this.checkTypeRecord
        });
      } else {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          createdDate: this.everyTable[0].createdDate
            ? this.everyTable[0].createdDate
            : this.everyTable[1].createdDate,
          // checkType: this.six,
          startTime: middle.startTime,
          endTime: middle.endTime,
          cusName: middle.cusName,
          actName: middle.actName,
          checkType: this.checkTypeRecord
        });
      }
      done();
    },
    // 当前页
    currentChange(page) {
      this.page.currentPage = page;
      if (this.everyTable == undefined) {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          checkType: this.checkTypeRecord
        });
      } else {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          createdDate: this.everyTable[0].createdDate
            ? this.everyTable[0].createdDate
            : this.everyTable[1].createdDate,
          // checkType: this.six,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          checkType: this.checkTypeRecord
        });
      }
    },
    // 每页条数
    sizeChange(pagesize) {
      this.page.currentPage = 1;
      this.page.pageSize = pagesize;
      if (this.everyTable == undefined) {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          checkType: this.checkTypeRecord
        });
      } else {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          createdDate: this.everyTable[0].createdDate
            ? this.everyTable[0].createdDate
            : this.everyTable[1].createdDate,
          // checkType: this.six,
          startTime: this.searchForm.startTime,
          endTime: this.searchForm.endTime,
          checkType: this.checkTypeRecord
        });
      }
    },
    // 当前页
    issueCurrentChange(page) {
      this.issuePage.currentPage = page;
      if (this.everyTable == undefined) {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          startTime: this.searchFormRight.startTime,
          endTime: this.searchFormRight.endTime,
          cusName: this.searchFormRight.cusName,
          actName: this.searchFormRight.actName,
          checkType: this.checkTypeRecord
        });
      } else {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          createdDate: this.everyTable[0].createdDate
            ? this.everyTable[0].createdDate
            : this.everyTable[1].createdDate,
          // checkType: this.six,
          startTime: this.searchFormRight.startTime,
          endTime: this.searchFormRight.endTime,
          cusName: this.searchFormRight.cusName,
          actName: this.searchFormRight.actName,
          checkType: this.checkTypeRecord
        });
      }
    },
    // 每页条数
    issueSizeChange(pagesize) {
      this.issuePage.currentPage = 1;
      this.issuePage.pageSize = pagesize;
      if (this.everyTable == undefined) {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          startTime: this.searchFormRight.startTime,
          endTime: this.searchFormRight.endTime,
          cusName: this.searchFormRight.cusName,
          actName: this.searchFormRight.actName,
          checkType: this.checkTypeRecord
        });
      } else {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          createdDate: this.everyTable[0].createdDate
            ? this.everyTable[0].createdDate
            : this.everyTable[1].createdDate,
          // checkType: this.six,
          startTime: this.searchFormRight.startTime,
          endTime: this.searchFormRight.endTime,
          cusName: this.searchFormRight.cusName,
          actName: this.searchFormRight.actName,
          checkType: this.checkTypeRecord
        });
      }
    },
    // 点击tab切换
    selectTab(val) {
      this.$emit("selectTable", val);
      this.checkTypeRecord = val == "operation" ? "4" : "5";
      if (this.everyTable == undefined) {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          checkType: this.checkTypeRecord
        });
      } else {
        this.getAdjustDetailPage({
          equityId: this.id.equityId,
          supplierBusinessId: this.id.supplierBusinessId,
          createdDate: this.everyTable[0].createdDate
            ? this.everyTable[0].createdDate
            : this.everyTable[1].createdDate,
          checkType: this.checkTypeRecord
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cancelBtn {
  text-align: right;
}
</style>
