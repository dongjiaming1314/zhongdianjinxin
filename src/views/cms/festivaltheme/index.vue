<!--
  ~
  ~  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  ~
  -->

<template>
  <div class="execution">
    <basic-container>
      <!-- 工具条 -->
      <el-row>
        <el-col>
          <el-form :inline="true" :model="filterForm">
            <el-row>
              <el-col :span="4">
                <el-form-item>
                  <el-input size="small" v-model="filterForm.name" placeholder="请输入关键字"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item>
                  <el-select size="small"  v-model="filterForm.type" placeholder="节日类型">
                    <el-option :label="'阳历'" :value="'1'"></el-option>
                    <el-option :label="'阴历'" :value="'2'"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="17">
                <el-form-item>
                  <el-button size="small"
                             type="primary"
                             icon="el-icon-search" @click="handleFilter">查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button size="small"
                             icon="el-icon-delete"
                             @click="handleEmpty">清空</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <!-- 新增 -->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary"
                       @click="handleAdd"
                       size="small"
                       icon="el-icon-plus"
                       v-if="permissions.cms_festivaltheme_add">新 增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 列表 -->
      <el-table :data="tableData" highlight-current-row v-loading="tableLoading" style="width: 100%;">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称" sortable></el-table-column>
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === '1'" type="success">阳历</el-tag>
            <el-tag v-else type="danger">阴历</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="orders" label="排序" sortable></el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       class="madp-link-style"
                       v-if="permissions.cms_festivaltheme_edit"
                       icon="el-icon-check"
                       size="small"
                       plain
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text"
                       class="madp-link-style"
                       v-if="permissions.cms_festivaltheme_del"
                       icon="el-icon-delete"
                       size="small"
                       plain
                       @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 工具条 -->
      <el-row>
        <el-col :span="24" class="toolbar">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10, 20, 30, 40,50,60,100]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            style="float:right;">
          </el-pagination>
        </el-col>
      </el-row>
      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="formRules" ref="addForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="图标" prop="icon">
                <avue-icon-select v-model="addForm.icon"
                                       :iconList="iconList"
                                       placeholder="请输入图标"></avue-icon-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序"
                            prop="orders">
                <el-input type="number"
                          v-model="addForm.orders"
                          placeholder="请输入排序"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型" prop="type">
                <el-radio-group v-model="addForm.type">
                  <el-radio class="radio" label="1">阳历</el-radio>
                  <el-radio class="radio" label="2">阴历</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期" prop="date">
                <el-input v-model="addForm.date"
                          placeholder="请输入日期"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始天数" prop="beginDays">
                <el-input type="number"
                          v-model="addForm.beginDays"
                          :min="0"
                          placeholder="请输入开始天数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束天数" prop="endDays">
                <el-input type="number"
                          v-model="addForm.endDays"
                          placeholder="请输入结束天数"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="handleSave" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

      <!--编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="formRules" ref="editForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="图标" prop="icon">
                <avue-icon-select v-model="editForm.icon"
                                       :iconList="iconList"
                                       placeholder="请输入图标"></avue-icon-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序"
                            prop="orders">
                <el-input type="number"
                          v-model="editForm.orders"
                          placeholder="请输入排序"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型" prop="type">
                <el-radio-group v-model="editForm.type">
                  <el-radio class="radio" label="1">阳历</el-radio>
                  <el-radio class="radio" label="2">阴历</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期" prop="date">
                <el-input v-model="editForm.date"
                          placeholder="请输入日期"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始天数" prop="beginDays">
                <el-input type="number"
                          v-model="editForm.beginDays"
                          :min="0"
                          placeholder="请输入开始天数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束天数" prop="endDays">
                <el-input type="number"
                          v-model="editForm.endDays"
                          placeholder="请输入结束天数"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="handleUpdate" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
  import {
    fetchList,
    getObj,
    addObj,
    putObj,
    delObj
  } from '@/api/cms/festivaltheme'
  import {
    mapGetters
  } from 'vuex'
  import iconList from "@/const/iconList"

  export default {
    name: 'festivaltheme',
    data() {
      return {
        iconList: iconList,
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20 // 每页显示多少条
        },
        tableLoading: false,
        filterForm:{
          type: undefined,
          name: undefined
        },
        // 表单验证规则定义
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请输入日期', trigger: 'blur' }
          ]
        },
        addFormVisible:false, //新增界面是否显示
        addLoading: false,
        addForm:{
          name: undefined,
          icon: undefined,
          type: '1',
          date: undefined,
          beginDays: undefined,
          endDays: undefined,
          orders: undefined
        },
        editFormVisible:false, //编辑界面是否显示
        editLoading: false,
        editForm:{
          name: undefined,
          icon: undefined,
          type: undefined,
          date: undefined,
          beginDays: undefined,
          endDays: undefined,
          orders: undefined
        }
      }
    },
    created() {
    },
    mounted: function() {
      this.getList(this.page)
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    methods: {
      getList(page, params) {
        this.tableLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        })
      },
      /**
       * @title 列表过滤查询
       *
       **/
      handleFilter(){
        let para = Object.assign({}, this.filterForm)
        this.page.page = 1
        this.getList(this.page, para)
      },
      /**
       * @title 清空列表过滤查询过滤参数
       *
       **/
      handleEmpty(){
        this.filterForm.name = undefined
        this.filterForm.type = undefined
      },
      /**
       *  @title 改变每页记录条数触发查询
       **/
      handleSizeChange(pageSize) {
        this.page.pageSize = pageSize
        this.getList(this.page)
      },
      /**
       *  @title 改变当前页码记录条数触发查询
       **/
      handleCurrentChange(currentPage) {
        this.page.currentPage = currentPage
        this.getList(this.page)
      },
      /**
       * @title 数据更新
       * @param row 为当前的数据
       * @param index 为当前更新数据的行数
       *
       **/
      handleUpdate(row, index) {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              let para = Object.assign({}, this.editForm)
              delete para['updateTime']
              putObj(para).then(data => {
                this.tableData.splice(index, 1, Object.assign({}, row))
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.editFormVisible = false
                this.editLoading = false
                this.getList(this.page)
              })
            })
          }
        })
      },
      /**
       * @title 数据添加
       *
       **/
      handleSave: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true
              let para = Object.assign({}, this.addForm)
              addObj(para).then((res) => {
                this.addLoading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields()
                this.addFormVisible = false
                this.addLoading = false
                this.getList(this.page)
              })
            })
          }
        })
      },
      /**
       * @title 打开编辑页面
       * @index 要编辑的数据索引
       * @row 需要修改的数据
       *
       **/
      handleEdit(index, row) {
        this.editFormVisible = true
        this.editForm = Object.assign({}, row)
      },
      /**
       * @title 处理删除操作
       * @index 要删除的数据索引
       * @row 需要删除的数据
       *
       **/
      handleDel(index, row) {
        let _this = this
        this.$confirm(`是否确认删除ID为${row.ftId}的记录`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delObj(row.ftId)
        }).then(data => {
          _this.tableData.splice(index, 1)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getList(this.page)
        }).catch(function(err) { })
      },
      /**
       * @title 打开新增窗口
       *
       **/
      handleAdd() {
        this.addFormVisible = true
      },

    }
  }
</script>

<style lang="scss" scoped>
</style>
