<!--
  ~
  ~  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  ~
  -->

<template>
  <div class="execution">
    <!--工具条-->
    <el-form  :inline="true" :model="filters">
      <el-row>
        <el-col :span="4">
          <el-form-item>
            <el-input size="small" v-model="filters.name" placeholder="请输入关键字" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-form-item>
              <el-input size="small"
                        v-model="filters.fsName"
                        placeholder="请选择位置"
                        @focus="handleShowFsDialog"
                        clearable></el-input>
              <el-input v-model="filters.fsId" v-show="false"></el-input>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select size="small" v-model="filters.swiperFlag" placeholder="轮播标识">
              <el-option :label="'是'" :value="true"></el-option>
              <el-option :label="'否'" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
    <!-- 新增 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary"
                     @click="handleAdd"
                     size="small"
                     icon="el-icon-plus"
                     v-if="permissions.cms_ad_add">新 增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 列表 -->
    <el-table :data="tableData" highlight-current-row v-loading="tableLoading" style="width: 100%;">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="adId" label="编号" sortable></el-table-column>
      <el-table-column prop="name" label="名称" sortable></el-table-column>
      <el-table-column prop="fsName" label="位置" sortable></el-table-column>
      <el-table-column prop="swiperFlag" label="轮播标识" sortable>
        <template slot-scope="scope">
          <el-switch v-model="scope.row.swiperFlag" disabled></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" align="center" sortable></el-table-column>
      <el-table-column fixed="right" label="操作" width="270" align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     class="madp-link-style"
                     v-if="permissions.cms_ad_edit"
                     icon="el-icon-check"
                     size="small"
                     plain
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text"
                     class="madp-link-style"
                     v-if="permissions.cms_ad_del"
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

    <!--新增|编辑界面-->
    <el-dialog :title="formTitle"
               :visible.sync="formVisible"
               :close-on-click-modal="false"
               @close="handleCancle">
      <el-form :model="form" label-width="80px" :rules="formRules" ref="form">
        <el-form-item label="主键"
                      prop="adId"
                      v-if="formStatus === 'update'"
                      v-show="false">
          <el-input v-model="form.adId"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="位置" prop="fsId">
              <el-button type="text"
                         class="madp-link-style"
                         size="small"
                         plain
                         @click="handleShowFsDialog">{{form.fsName}}</el-button>
              <el-input v-model="form.fsId" v-show="false"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="轮播标识">
              <el-switch v-model="form.swiperFlag"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="宽度" prop="width">
              <el-input v-model="form.width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="高度" prop="height">
              <el-input v-model="form.height"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancle">取消</el-button>
        <el-button type="primary"
                   @click.native="handleUpdate"
                   v-if="formStatus === 'update'"
                   :loading="formLoading">提交</el-button>
        <el-button type="primary"
                   @click.native="handleSave"
                   v-if="formStatus === 'add'"
                   :loading="formLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 位置选择器界面 -->
    <el-dialog title="请选择" :visible.sync="fsFormVisible" :close-on-click-modal="false">
      <el-input v-model="fsFilterText"
                placeholder="输入关键字进行过滤"></el-input>
      <el-tree
        class="filter-tree"
        :data="treeData"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        ref="tree">
      </el-tree>
    </el-dialog>

  </div>
</template>

<script>
  import {
    fetchList,
    getObj,
    addObj,
    putObj,
    delObj
  } from '@/api/cms/ad'
  import {
    fetchTree
  } from '@/api/cms/functionsection'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'name',
    data() {
      return {
        filters:{
          name: undefined,
          swiperFlag: undefined,
          fsId: undefined,
          fsName: undefined
        },
        treeData: [],
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20 // 每页显示多少条
        },
        tableLoading: false,
        formStatus: undefined,
        formTitle: undefined,
        formVisible: false,//编辑界面是否显示
        formLoading: false,
        formRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          fsId: [
            { required: true, message: '请选择位置', trigger: 'blur' }
          ]
        },
        //编辑|添加界面数据
        form: {
          adId: undefined,
          name: undefined,
          fsId: undefined,
          fsName: undefined,   // 默认显示
          swiperFlag: undefined,
          width: undefined,
          height: undefined,
          description: undefined
        },
        fsFormVisible: false,
        fsFilterText: ''
      }
    },
    created() {
    },
    mounted() {
      this.getList(this.page)
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    methods: {
      /**
       * 获取广告位置数据
       **/
      getTree() {
        fetchTree().then(response => {
          this.treeData = response.data.data
        })
      },
      /**
       * 获取列表数据
       **/
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
       * @title 查询
       *
       **/
      handleFilter(){
        this.page.page = 1
        let para = Object.assign({}, this.filters)
        delete para['fsName']
        this.getList(this.page, para)
      },
      /**
       * @title 清空
       *
       **/
      handleEmpty(){
        for(let key in this.filters){
          this.filters[key] = undefined
        }
      },
      /**
       * @title 打开新增窗口
       *
       **/
      handleAdd() {
        this.formStatus = 'add'
        this.formTitle = '新增'
        this.formVisible = true
        this.form.fsName = '请选择'
      },
      /**
       * @index 要编辑的数据索引
       * @row 需要修改的数据
       *
       **/
      handleEdit(index, row) {
        this.formStatus = 'update'
        this.formTitle = '编辑'
        this.formVisible = true
        this.form = Object.assign({}, row)
      },
      handleDel(index, row) {
        let _this = this
        this.$confirm(`是否确认删除ID为${row.adId}的记录`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delObj(row.adId)
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
       * @title 数据更新
       * @param row 为当前的数据
       * @param index 为当前更新数据的行数
       *
       **/
      handleUpdate: function(row, index) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.formLoading = true
              let para = Object.assign({}, this.form)
              delete para['fsName']
              putObj(para).then(data => {
                this.tableData.splice(index, 1, Object.assign({}, row))
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.$refs['form'].resetFields()
                this.formVisible = false
                this.formLoading = false
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
      handleSave: function() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.formLoading = true
              let para = Object.assign({}, this.form)
              delete para['fsName']
              addObj(para).then((res) => {
                this.formLoading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['form'].resetFields()
                this.formVisible = false
                this.formLoading = false
                this.getList(this.page)
              })
            })
          }
        })
      },
      /**
       * @title 编辑|新增页面取消操作
       */
      handleCancle(){
        this.formStatus = undefined
        this.formTitle = undefined
        this.formVisible = false
        this.formLoading = false
        for(let key in this.form){
          this.form[key] = undefined
        }
      },
      /**
       * @title 改变每页记录条数触发查询
       **/
      handleSizeChange(pageSize) {
        this.page.pageSize = pageSize
        this.getList(this.page)
      },
      /**
       * @title 改变当前页码记录条数触发查询
       **/
      handleCurrentChange(currentPage) {
        this.page.currentPage = currentPage
        this.getList(this.page)
      },
      handleShowFsDialog(){
        this.getTree()
        this.fsFormVisible = true
      },
      /**
       * @title 关键字过滤
       **/
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      /**
       * @title 选择节点后操作
       **/
      handleNodeClick(data){
        this.fsFormVisible = false
        if(this.formVisible){
          this.form.fsId = data.id
          this.form.fsName = data.name
        }else{
          this.filters.fsId = data.id
          this.filters.fsName = data.name
        }
      }
    },
    watch: {
      fsFilterText(val){
        this.$refs.tree.filter(val);
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
