<template>
  <div>
    <avue-crud ref="crud" :page.sync="page" :data="tableData" :permission="permissionList" :table-loading="tableLoading" :option="tableOption" @search-change="searchChange" @search-reset="searchReset" @selection-change="selectionChange" @current-change="currentChange" @size-change="sizeChange">
      <template slot-scope="scope" slot="supplierName">
        <span class="link" @click="handleView(scope.row)">{{ scope.row.supplierName }}
        </span>
      </template>
      <template slot-scope="scope" slot="createdTimeSearch">
        <el-date-picker v-model="createdTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="活动开始时间" end-placeholder="活动结束时间">
        </el-date-picker>
      </template>
      <template slot="menuLeft">
        <el-button type="primary" size="small" @click.stop="handleAdd">
          新增
        </el-button>
        <!-- <el-button v-if="permissionList.delBtn" type="primary" size="small" @click.stop="handleDeleteMulti">
          删除
        </el-button> -->
        <!-- <el-button v-if="permissionList.stopBtn" type="primary" size="small" @click.stop="handleStop">
          停用
        </el-button>
        <el-button v-if="permissionList.useBtn" type="primary" size="small" @click.stop="handleUse">
          启用
        </el-button> -->
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text" size="small" @click.stop="handleEdit(scope.row, scope.index)">
          编辑
        </el-button>
        <!-- <el-button v-if="permissionList.editBtn" type="text" size="small" @click.stop="handleView(scope.row, scope.index)">
          查看
        </el-button> -->
        <el-button v-if="scope.row.supplierStatus === '0'" type="text" size="small" @click.stop="handleStop(scope.row)">
          停用
        </el-button>
        <el-button v-if="scope.row.supplierStatus === '1'" type="text" size="small" @click.stop="handleUse(scope.row)">
          启用
        </el-button>
        <el-button type="text" size="small" @click.stop="deleteInfo(scope.row)">
          删除
        </el-button>
      </template>

    </avue-crud>
    <add-form :supplierAddOrEdit="supplierAddOrEdit" v-if="supplierAdd" :supplierAdd.sync="supplierAdd" @refreshList="refreshList" :editForm="supplierForm"></add-form>
    <status-form v-if="supplierStatusDialog" :supplierStatusDialog.sync="supplierStatusDialog" :selectList="selectList" :stopOrUse="stopOrUse"></status-form>
    <view-detail v-if="view" :view.sync="view" :supplierForm="supplierForm" @edit="handleEdit"></view-detail>
  </div>
</template>
<script>
import { tableOption } from "@/const/crud/supmanage/info";
import {
  validatenull,
  validateEmail,
  isvalidatemobile,
  cardid
} from "@/util/validate";
import { formatDate } from "@/util/date";
import { deepClone } from "@/util/tag";
import AddForm from "./components/addForm";
import StatusForm from "./components/statusForm";
import ViewDetail from "./components/viewDetail";
import {
  fetchList,
  addObj,
  editObj,
  delObj,
  effectSup
} from "@/api/supmanage/info";

import { mapGetters } from "vuex";

export default {
  components: { AddForm, StatusForm, ViewDetail },
  data() {
    return {
      tableOption: tableOption,
      page: {
        // 当前页
        currentPage: 1,
        // 总条数
        total: 0,
        // 每页多少条
        pageSize: 10
      },
      tableData: [],
      tableLoading: false,
      supplierAdd: false,
      // 1是新增，2是编辑
      supplierAddOrEdit: 1,
      // 要编辑的信息的id
      editId: null,
      // 是否查看详情
      view: false,
      // 当前是停用还是启用 0停用 1启用
      stopOrUse: 0,
      supplierStatusDialog: false,
      supplierForm: {},
      selectList: [],
      searchForm: {},
      createdTime: []
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        // addBtn: this.vaildData(this.permissions.supmanage_info_add),
        // delBtn: this.vaildData(this.permissions.supmanage_info_del),
        // editBtn: this.vaildData(this.permissions.supmanage_info_edit),
        // checkBtn: this.vaildData(this.permissions.supmanage_info_check),
        // useBtn: this.vaildData(this.permissions.supmanage_info_use),
        // stopBtn: this.vaildData(this.permissions.supmanage_info_stop)
      };
    }
  },
  watch: {
    "permissionList.delBtn": {
      handler(val, oldVal) {
        this.tableOption.delBtn = Boolean(val);
      },
      immediate: true
    }
  },
  created() {
    this.getList(this.page);
  },
  methods: {
    // 初始加载数据
    getList(page, params, done) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          { current: page.currentPage, size: page.pageSize },
          params
        )
      ).then(res => {
        this.tableData = res.data.data.records;
        this.page.total = res.data.data.total;
        this.tableLoading = false;
        if (typeof done != "undefined") done();
      });
    },
    searchChange(form, done) {
      done()
      let middle = deepClone(this.filterForm(form));
       middle["startTime"] = this.createdTime[0]
       middle["endTime"] = this.createdTime[1]
      // if (typeof this.filterForm(form)["createTime"] == "object") {
      //   middle["startTime"] = formatDate(
      //     this.filterForm(form)["createTime"][0]
      //   ).replace(/\-/g, "/");
      //   middle["endTime"] = formatDate(
      //     this.filterForm(form)["createTime"][1]
      //   ).replace(/\-/g, "/");
      // }
      this.searchForm = middle;
      this.getList(this.page, this.searchForm, done);
    },
    searchReset() {
      this.searchForm = {};
      this.createdTime = [];
      this.getList(this.page, this.searchForm);
    },
    handleEdit(row, index) {
      this.view = false;
      this.$nextTick(() => {
        this.supplierAdd = true;
        this.supplierAddOrEdit = 2;
        this.editId = row.id;
        this.supplierForm = deepClone(row);
      });
    },
    deleteInfo(row) {
      // let ids;
      // if (row instanceof Array) {
      //   ids = row.map(r => r.id);
      // } else if (row instanceof Object) {
      //   ids = [row.id];
      // }
      this.$confirm("确认删除该供应商吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return editObj({
            supplierNumber: row.supplierNumber,
            checkType: "3"
          });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功，待审核！"
          });
          this.getList(this.page, this.searchForm);
        });
    },
    refreshList() {
      this.getList(this.page, this.searchForm);
    },
    selectionChange(row) {
      this.selectList = row;
    },
    // 点击新增按钮
    handleAdd() {
      this.supplierForm = {};
      this.supplierAdd = true;
      this.supplierAddOrEdit = 1;
    },
    // 批量删除
    handleDeleteMulti() {
      if (validatenull(this.selectList)) {
        this.$message.warning("请选择要删除的供应商");
        return;
      }
      this.deleteInfo(this.selectList);
    },

    // 点击停用
    handleStop(row) {
      this.selectList = [];
      this.selectList.push(row);
      this.supplierStatusDialog = true;
      this.stopOrUse = 0;
      // if (validatenull(this.selectList)) {
      //   this.$message.warning("请选择要停用的供应商");
      //   return;
      // }
    },
    // 展开启用
    handleUse(row) {
      this.selectList = [];
      this.selectList.push(row);
      this.supplierStatusDialog = true;
      this.stopOrUse = 1;
      // if (validatenull(this.selectList)) {
      //   this.$message.warning("请选择要启用的供应商");
      //   return;
      // }
    },
    currentChange(page) {
      this.page.currentPage = page;
      this.getList(this.page, this.searchForm);
    },
    sizeChange(size) {
      this.page.pageSize = size;
      this.getList(this.page, this.searchForm);
    },
    handleView(form) {
      this.view = true;
      this.supplierForm = form;
    }
  }
};
</script>
<style lang="scss" scoped>
.is-align-center {
  text-align: center;
}
.link {
  color: #409eff;
  text-decoration: underline;
  cursor: pointer;
}
.date-wrapper {
  display: flex;
  .to {
    padding: 0 10px;
  }
}
</style>
