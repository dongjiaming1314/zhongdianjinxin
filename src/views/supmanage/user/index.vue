<template>
  <basic-container>
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      @on-load="getList"
      @search-change="searchChange"
      @selection-change="selectionChange"
    >
      <template slot-scope="scope" slot="userName">
        <span class="link" @click="handleView(scope.row)">{{scope.row.userName}}</span>
      </template>
      <template slot="menuLeft">
        <el-button
          v-if="permissionList.addBtn"
          type="primary"
          size="small"
          @click.stop="handleAdd"
        >
          新增
        </el-button>
        <el-button
          v-if="permissionList.delBtn"
          type="primary"
          size="small"
          @click.stop="handleDeleteMulti"
        >
          删除
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button
          v-if="permissionList.editBtn"
          type="text"
          size="small"
          @click.stop="handleEdit(scope.row, scope.index)"
        >
          编辑
        </el-button>
        <el-button
          v-if="permissionList.delBtn"
          type="text"
          size="small"
          @click.stop="handleView(scope.row, scope.index)"
        >
          删除
        </el-button>
        <el-button
          v-if="permissionList.delBtn"
          type="text"
          size="small"
          @click.stop="handleDelete(scope.row, scope.index)"
        >
          查看
        </el-button>
      </template>
    </avue-crud>
    <add-form v-if="showDialog" :showDialog.sync="showDialog" :ifAdd="ifAdd" :editForm="userForm"></add-form>
    <view-detail v-if="view" :view.sync="view" :userForm="detail"></view-detail>
  </basic-container>
</template>
<script>
import { tableOption } from "@/const/crud/supmanage/user";
import { fetchList, addObj, editObj, delObj } from "@/api/supmanage/user";
import { mapGetters } from "vuex";
import { deepClone } from "@/util/tag";
import { validatenull, isvalidatemobile } from "@/util/validate";
import AddForm from "./components/addForm"
import ViewDetail from "./components/viewDetail"

export default {
  components: {AddForm, ViewDetail},
  data() {
    // 验证手机号码
    const validatePhoneNum = (rule, value, callback) => {
      const res = isvalidatemobile(value);
      if (!res[1].length) {
        callback();
      } else {
        callback(new Error(res[1]));
      }
    };
    return {
      tableOption,
      tableData: [{name: '111'}],
      tableLoading: false,
      page: {
        // 当前页
        currentPage: 1,
        // 总条数
        total: 0,
        // 每页多少条
        pageSize: 20
      },
      addDialog: false,
      userForm: {},
      showDialog: false,
      // 1 新增，2 编辑
      ifAdd: 1,
      selectList: [],
      editId: null,
      view: false,
      detail: {}
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.supmanage_user_add),
        delBtn: this.vaildData(this.permissions.supmanage_user_del),
        editBtn: this.vaildData(this.permissions.supmanage_user_edit),
        checkBtn: this.vaildData(this.permissions.supmanage_user_query)
      };
    }
  },
  methods: {
    // 查询
    getList(page, params, done) {
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
    // 搜索
    searchChange(data, done) {
      this.getList(this.page, data, done);
    },
    selectionChange(row) {
      this.selectList = row;
    },
    resetForm() {},
    handleAdd() {
      this.ifAdd = 1;
      this.showDialog = true;
      this.resetForm()
    },
    handleEdit(row) {
      this.ifAdd = 2;
      this.showDialog = true;
      this.editId = row.id;
      this.userForm = deepClone(row);
    },
    handleDelete(row) {
      this.deleteUser(row);
    },
    handleDeleteMulti() {
      if (!this.selectList.length) {
        this.$message({
          message: '请选择要删除的用户',
          type: 'info'
        })
        return
      }
      this.deleteUser(this.selectList);
    },
    deleteUser(row) {
      let ids;
      if (row instanceof Array) {
        ids = row.map(r => r.id);
      } else if (row instanceof Object) {
        ids = [row.id];
      }
      this.$confirm("确认删除该供应商吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(row => {
          return delObj(ids);
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList(this.page)
        })
    },
    handleView(val) {
      this.view = true
      this.detail = val

    }
  }
};
</script>
<style lang="scss" scoped>
.is-align-center {
  text-align: center;
}
::v-deep .avue-group {
  .el-collapse-item__header {
    visibility: hidden;
  }
}
::v-deep .avue-crud__pagination {
  text-align: center;
  margin-bottom: 5px;
}
.link {
  color: #409eff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
