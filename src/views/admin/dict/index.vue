<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @search-change="searchChange"
        @row-del="rowDel"
      >
        <template slot-scope="scope" slot="menu">
          <el-button
            type="text"
            v-if="permissions.sys_dict_create"
            size="mini"
            @click="handleItem(scope.row,scope.index)"
          >
            字典项
            <!-- <button @click="find(scope.row)">hahahah</button> -->
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog
      title="字典项管理"
      :visible.sync="dialogFormVisible"
      width="90%"
      :table-loading="tableLoading"
      @close="dialogFormVisible=false"
    >
      <avue-crud
        ref="crudItem"
        :data="tableDictItemData"
        :permission="permissionList"
        v-model="form"
        @row-update="handleItemUpdate"
        @row-save="handleItemSave"
        @row-del="rowItemDel"
        :before-open="handleBeforeOpen"
        :option="tableDictItemOption"
        :table-loading="tableLoading"
      ></avue-crud>
    </el-dialog>
  </div>
</template>

<script>
import {
  addItemObj,
  addObj,
  delItemObj,
  delObj,
  fetchItemList,
  fetchList,
  putItemObj,
  putObj,
  getAllDict,
  getDictItem
} from "@/api/admin/dict"
import { tableDictItemOption, tableOption } from "@/const/crud/admin/dict"
import { mapGetters } from "vuex"

export default {
  name: "dict",
  data() {
    return {
      form: {},
      dictType: undefined,
      dictId: undefined,
      dialogFormVisible: false,
      tableData: [],
      tableDictItemData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      tableDictItemOption: tableDictItemOption
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.sys_dict_add),
        createBtn: this.vaildData(this.permissions.sys_dict_create),
        delBtn: this.vaildData(this.permissions.sys_dict_del),
        editBtn: this.vaildData(this.permissions.sys_dict_edit)
      }
    }
  },
  methods: {
    getList(page, params,done) {
      this.tableLoading = true
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize
          },
          params
        )
      ).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
        if( typeof(done) != 'undefined' ) done()
      }).catch(()=>{
        if( typeof(done) != 'undefined' ) done()
      })
    },

    getDictItemList(dictId, type) {
      this.dictType = type
      this.dictId = dictId
      this.dialogFormVisible = true
      this.tableLoading = true
      fetchItemList(
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize
          },
          { dictId: dictId }
        )
      ).then(response => {
        this.tableDictItemData = response.data.data.records
        this.tableLoading = false
      })
    },
    handleBeforeOpen(done) {
      this.form.type = this.dictType
      this.form.dictId = this.dictId
      done()
    },
    rowDel: function(row) {
      var _this = this
      this.$confirm(
        '是否确认删除数据类型为"' + row.type + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delObj(row)
        })
        .then(() => {
          this.getList(this.page)
          _this.$message({
            message: "删除成功",
            type: "success"
          })
        })
        .catch(function() {})
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function(row, index, done) {
      let oldType
      oldType = row.type
      row.oldType = oldType
      putObj(this.filterForm(row)).then(() => {
        this.tableData.splice(index, 1, Object.assign({}, row))
        let oldType
        oldType = row.type
        this.$message({
          message: "修改成功",
          type: "success"
        })
        this.getList(this.page)
        done()
      })
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function(row, done) {
      addObj(this.filterForm(row)).then(() => {
        this.tableData.push(Object.assign({}, row))
        this.$message({
          message: "添加成功",
          type: "success"
        })
        this.getList(this.page)
        done()
      })
    },
    handleItemSave: function(row, done) {
      addItemObj(row).then(() => {
        this.tableDictItemData.push(Object.assign({}, row))
        this.$message({
          message: "添加成功",
          type: "success"
        })
        this.getList(this.page)
        done()
      })
    },
    handleItemUpdate: function(row, index, done) {
      let oldValue
      let oldType
      oldValue = row.value
      oldType = row.type
      row.oldValue = oldValue
      row.oldType = oldType
      putItemObj(row).then(() => {
        this.tableData.splice(index, 1, Object.assign({}, row))
        this.$message({
          message: "修改成功",
          type: "success"
        })
        this.getDictItemList(row.dictId, row.type)
        done()
      })
    },
    searchChange(form,done) {
      this.getList(this.page, this.filterForm(form),done)
    },
    /**
     * 加载 字典项
     * @param row
     */
    handleItem: function(row) {
      this.getDictItemList(row.id, row.type)
    },

    // find: function(row) {
    //   getDictItem({
    //     type: "lsocial_type",
    //     value: 0
    //   }).then(response => {
    //     console.log(response)
    //   })
    // },
    rowItemDel: function(row) {
      var _this = this
      this.$confirm('是否确认删除数据为"' + row.label + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delItemObj({
            value: row.value,
            type: row.type
          })
        })
        .then(() => {
          this.getDictItemList(row.dictId, row.type)
          _this.$message({
            message: "删除成功",
            type: "success"
          })
        })
        .catch(function() {})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

