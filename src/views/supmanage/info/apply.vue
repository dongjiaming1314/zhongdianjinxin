<template>
  <div>
    <avue-crud
      ref="crud"
      :page="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      @search-change="searchChange"
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
      <template
        slot-scope="scope"
        slot="menu"
      >
        <!-- <el-button type="text" size="small" @click.stop="handleEdit(scope.row, scope.index)">编辑</el-button>
        <el-button type="text" size="small" @click.stop="handleDelete(scope.row, scope.index)">删除</el-button> -->

        <el-button
          type="text"
          size="small"
          @click.stop="handleView(scope.row, scope.index)"
        >查看</el-button>
        <el-button
          v-if="scope.row.checkStatus ==='3'"
          type="text"
          size="small"
          @click.stop="handleRecall(scope.row, scope.index)"
        >撤回</el-button>
        <el-button
          v-if="scope.row.checkStatus ==='1'"
          type="text"
          size="small"
          @click.stop="handleEdit(scope.row, scope.index)"
        >编辑</el-button>
      </template>
    </avue-crud>
    <add-form
      :supplierAddOrEdit="3"
      v-if="supplierEdit"
      :supplierAdd.sync="supplierEdit"
      @refreshList="refreshList"
      :editForm="supplierForm"
    ></add-form>
    <view-detail
      v-if="supplierView"
      :view.sync="supplierView"
      :supplierForm="supplierForm"
    ></view-detail>
  </div>
</template>
<script>
import {
  // fetchList,
  addObj,
  editObj,
  delObj,
  effectSup,
  editDraft,
} from "@/api/supmanage/info";
import { fetchList } from "@/api/supmanage/apply";
import { tableOption } from "@/const/crud/supmanage/apply";
import { deepClone } from "@/util/tag";
import AddForm from "./components/addForm";
import { mapGetters } from "vuex";
import ViewDetail from "./components/viewDetail";

export default {
  components: { AddForm, ViewDetail },
  data() {
    return {
      tableOption,
      tableData: [],
      tableLoading: false,
      page: {
        // 当前页
        currentPage: 1,
        // 总条数
        total: 0,
        // 每页多少条
        pageSize: 10,
      },
      supplierEdit: false,
      supplierForm: {},
      searchForm: {},
      businessType: [{ label: "合伙", value: 1 }],
      editId: null,
      supplierView: false,
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        editBtn: this.vaildData(this.permissions.supmanage_info_edit),
        delBtn: this.vaildData(this.permissions.supmanage_info_del),
        withdrawBtn: this.vaildData(this.permissions.supmanage_info_withdraw),
        viewBtn: this.vaildData(this.permissions.supmanage_info_view),
      };
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
      this.searchForm = middle;
      this.getList(this.page, middle, done);
    },
    // 编辑
    handleEdit(row) {
      this.$nextTick(() => {
        this.supplierAdd = true;
        this.supplierEdit = true;
        this.editId = row.id;
        this.supplierForm = deepClone(row);
      });
    },
    refreshList() {
      this.getList(this.page, this.searchForm);
    },
    // 删除
    handleDelete(row) {
      this.deleteInfo(row);
    },
    deleteInfo(row) {
      let ids;
      if (row instanceof Array) {
        ids = row.map((r) => r.id);
      } else if (row instanceof Object) {
        ids = [row.id];
      }
      this.$confirm("确认删除该供应商吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((row) => {
          console.log(row);
          return delObj(ids);
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList(this.page, this.searchForm);
        });
    },
    handleRecall(row) {
      editDraft({
        businessAuditId: row.businessAuditId,
        checkStatus: "1",
      }).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "撤回成功!",
          });
          this.getList(this.page, this.searchForm);
        }
      });
    },
    handleView(row) {
      this.supplierView = true;
      this.supplierForm = row;
    },
    // 提交编辑
    onSubmit(row) {
      editObj(this.supplierForm).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.supplierEdit = false;
          this.getList(this.page, this.searchForm);
        }
      });
    },
    currentChange(page) {
      this.page.currentPage = page;
      this.getList(this.page, this.searchForm);
    },
    sizeChange(size) {
      this.page.pageSize = size;
      this.getList(this.page, this.searchForm);
    },
  },
};
</script>
<style scoped>
::v-deep .avue-crud__tip {
  display: none;
}
.link {
  color: #409eff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
