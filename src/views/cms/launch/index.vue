<!--
  -    Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  -
  -->

<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <section>
        <!--工具条-->
        <el-form  :inline="true" :model="filters">
          <el-row>
            <el-col :span="4">
              <el-form-item>
                <el-input size="small" v-model="filters.title" placeholder="请输入关键字"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select size="small"  v-model="filters.publicationFlag" placeholder="发布状态">
                  <el-option :label="'未发布'" :value="false"></el-option>
                  <el-option :label="'已发布'" :value="true"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-select size="small" v-model="filters.defaultFlag" placeholder="默认标识">
                  <el-option :label="'是'" :value="true"></el-option>
                  <el-option :label="'否'" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-date-picker
                  v-model="filters.beginTime"
                  size="small"
                  type="date"
                  placeholder="有效开始日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-date-picker
                  v-model="filters.endTime"
                  size="small"
                  type="date"
                  placeholder="有效结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary"
                         @click="handleAdd"
                         size="small"
                         icon="el-icon-plus"
                         v-if="permissions.cms_launch_add">新 增</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="tableData" highlight-current-row v-loading="tableLoading" style="width: 100%;">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="title" label="标题" sortable></el-table-column>
          <el-table-column prop="beginTime" label="开始时间" :formatter="dateFormat" sortable></el-table-column>
          <el-table-column prop="endTime" label="结束时间" :formatter="dateFormat" sortable></el-table-column>
          <el-table-column prop="publicationTime" label="发布时间" width="180" align="center" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.publicationFlag">{{scope.row.publicationTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="defaultFlag" label="默认标识" width="100" align="center" sortable>
            <template slot-scope="scope">
              <el-switch v-model="scope.row.defaultFlag" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         class="madp-link-style"
                         size="small"
                         plain
                         @click="handleView(scope.row)">查看</el-button>
              <el-button type="text"
                         class="madp-link-style"
                         v-if="permissions.cms_launch_edit"
                         size="small"
                         plain
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text"
                         class="madp-link-style"
                         v-if="permissions.cms_launch_del"
                         size="small"
                         plain
                         @click="handleDel(scope.$index, scope.row)">删除</el-button>
              <el-button type="text"
                         class="madp-link-style"
                         v-if="scope.row.publicationFlag"
                         size="small"
                         plain
                         @click="handPublication(scope.$index, scope.row)">草稿</el-button>
              <el-button type="text"
                         class="madp-link-style"
                         v-else
                         size="small"
                         plain
                         @click="handPublication(scope.$index, scope.row)">发布</el-button>
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

        <!--编辑界面-->
        <el-dialog title="编辑"
                   :visible.sync="editFormVisible"
                   :close-on-click-modal="false"
                   @close="handleCancle">
          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="主键" prop="launchId" v-show="false">
              <el-input v-model="editForm.launchId"></el-input>
            </el-form-item>
            <el-form-item label="主题" prop="ftId">
              <el-select v-model="editForm.ftId"
                         clearable
                         filterable
                         :disabled="editForm.defaultFlag"
                         placeholder="请选择主题"
                         @change="handleChangeTheme">
                <el-option-group v-for="theme in themeData"
                                 :key="theme.value"
                                 :label="theme.label">
                  <el-option v-for="item in theme.list"
                             :key="item.ftId"
                             :label="item.name"
                             :value="item.ftId">
                    <span style="float: left">{{item.name}}</span>
                    <span style="float: right; color: #8492a6; font-size: 12px">{{item.date}}</span>
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="editForm.title"
                        auto-complete="off"
                        :disabled="editForm.defaultFlag"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="开始日期">
                  <el-date-picker
                    v-model="editForm.beginTime"
                    :disabled="editForm.defaultFlag"
                    type="date"
                    placeholder="选择开始日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束日期">
                  <el-date-picker
                    v-model="editForm.endTime"
                    :disabled="editForm.defaultFlag"
                    type="date"
                    placeholder="选择结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型">
                  <el-radio-group v-model="editForm.type">
                    <el-radio class="radio" label="1">图片</el-radio>
                    <el-radio class="radio" label="2">视频</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否全屏">
                  <el-switch v-model="editForm.fullScreenFlag"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="内容" prop="path">
             <el-upload action="/admin/file/upload"
                        :headers="headers"
                        :show-file-list="false"
                        :on-success="handleUploadSuccess"
                        :before-upload="handleBeforeUpload">
               <img id="avatar"
                    v-if="editForm.path"
                    :src="editForm.avatar"
                    class="madp-upload-launch-img-container madp-upload-img" />
               <i v-else class="el-icon-plus madp-upload-icon"></i>
             </el-upload>
            </el-form-item>
            <el-form-item label="跳转链接" prop="url">
              <el-input v-model="editForm.url" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="handleCancle">取消</el-button>
            <el-button type="primary" @click.native="handleUpdate" :loading="editLoading">提交</el-button>
          </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增"
                   :visible.sync="addFormVisible"
                   :close-on-click-modal="false"
                   @close="handleCancle">
          <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
            <el-form-item label="主题" prop="ftId">
              <el-select v-model="addForm.ftId"
                         clearable
                         filterable
                         placeholder="请选择主题"
                         @change="handleChangeTheme">
                <el-option-group v-for="theme in themeData"
                                 :key="theme.value"
                                 :label="theme.label">
                  <el-option v-for="item in theme.list"
                             :key="item.ftId"
                             :label="item.name"
                             :value="item.ftId">
                    <span style="float: left">{{item.name}}</span>
                    <span style="float: right; color: #8492a6; font-size: 12px">{{item.date}}</span>
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="addForm.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="开始日期">
                  <el-date-picker
                    v-model="addForm.beginTime"
                    type="date"
                    placeholder="选择开始日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束日期">
                  <el-date-picker
                    v-model="addForm.endTime"
                    type="date"
                    placeholder="选择结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型">
                  <el-radio-group v-model="addForm.type">
                    <el-radio class="radio" label="1">图片</el-radio>
                    <el-radio class="radio" label="2">视频</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否全屏">
                  <el-switch v-model="addForm.fullScreenFlag"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="内容" prop="path">
              <el-upload action="/admin/file/upload"
                         :headers="headers"
                         :show-file-list="false"
                         :on-success="handleUploadSuccess"
                         :before-upload="handleBeforeUpload">
                <img id="addFormAvatar"
                     v-if="addForm.path"
                     :src="addForm.avatar"
                     class="madp-upload-launch-img-container madp-upload-img" />
                <i v-else class="el-icon-plus madp-upload-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="跳转链接" prop="url">
              <el-input v-model="addForm.url" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="handleCancle">取消</el-button>
            <el-button type="primary" @click.native="handleSave" :loading="addLoading">提交</el-button>
          </div>
        </el-dialog>

        <!--图片展示界面-->
        <el-dialog :visible.sync="viewFormVisible" :close-on-click-modal="false" @close="handleCancle">
          <img v-if="viewForm.path" :src="viewForm.avatar" style="width: 100%;height: auto;"/>
        </el-dialog>

      </section>
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
  } from '@/api/cms/launch'
  import {
    fetchSelect
  } from '@/api/cms/festivaltheme'
  import {
    handleMfsPath
  } from '@/util/util'
  import {
    format,
    formatDate,
    formatDatetime
  } from '@/util/date'
  import {
    validatenull
  } from '@/util/validate'
  import {
    mapGetters
  } from 'vuex'
  import store from '@/store'
  export default {
    name: 'launch',
    data() {
      return {
        headers: {
          Authorization: 'Bearer ' + store.getters.access_token
        },
        themeData: [],
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20 // 每页显示多少条
        },
        tableLoading: false,
        filters:{
          title: undefined,
          defaultFlag: undefined,
          publicationFlag: undefined,
          beginTime: undefined,
          endTime: undefined
        },
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          path: [
            { required: true, message: '请选择要上传内容', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          launchId: undefined,
          ftId: undefined,
          title: undefined,
          type: undefined,
          avatar: undefined,  //上传图片成功后本地图片的URL(提交操作要删除此属性)
          path: undefined,
          url: undefined,
          beginTime: undefined,
          endTime: undefined,
          defaultFlag: undefined,
          fullScreenFlag: false
        },
        addFormVisible: false,//编辑界面是否显示
        addLoading: false,
        addFormRules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          path: [
            { required: true, message: '请选择要上传内容', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          ftId: undefined,
          title: undefined,
          type: '1',
          avatar: undefined,  //上传图片成功后本地图片的URL(提交操作要删除此属性)
          path: undefined,
          url: undefined,
          beginTime: undefined,
          endTime: undefined,
          defaultFlag: undefined,
          fullScreenFlag: false
        },
        viewFormVisible:false,
        viewForm:{
          path: undefined,
          avatar: undefined
        }
      }
    },
    created() {
    },
    mounted: function() {
      this.getSelect()
      this.getList(this.page)
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    methods: {
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
       * 获取主题数据
       **/
      getSelect(){
        fetchSelect().then(response => {
          this.themeData = response.data.data
        })
      },
      /**
       * 处理主题切换
       * @value 当前选中的值
       **/
      handleChangeTheme(value){
        if(validatenull(value)){
          if(this.addFormVisible){
            this.addForm.title = undefined
            this.addForm.beginTime = undefined
            this.addForm.endTime = undefined
          }
          if(this.editFormVisible){
            this.editForm.title = undefined
            this.editForm.beginTime = undefined
            this.editForm.endTime = undefined
          }
        }else{
          // 1.0 数组合并
          let themeList = [...this.themeData[0].list, ...this.themeData[1].list]
          // 2.0 根据选中的值获取数组中的整个对象
          let themeSelected = themeList.filter(item => (item.ftId == value))
          // 3.0 处理标题
          let title =  `${themeSelected[0].name}（${formatDate(themeSelected[0].date, 'yyyy')}）`
            //formatDate(themeSelected[0].date, 'yyyy') + '-' + themeSelected[0].name
          let beginTime = validatenull(themeSelected[0].beginDay) ? undefined : themeSelected[0].beginDay
          let endTime = validatenull(themeSelected[0].endDay) ? undefined : themeSelected[0].endDay
          // 4.0 设置默认值
          if(this.addFormVisible){
            this.addForm.title = title
            this.addForm.beginTime = beginTime
            this.addForm.endTime = endTime
          }
          if(this.editFormVisible){
            this.editForm.title = title
            this.editForm.beginTime = beginTime
            this.editForm.endTime = endTime
          }
        }
      },
      /**
       * @title 查询
       *
       **/
      handleFilter(){
        this.page.page = 1
        let para = Object.assign({}, this.filters)
        para.beginTime = formatDatetime(para.beginTime)
        para.endTime = formatDatetime(para.endTime)
        this.getList(this.page, para)
      },
      /**
       * @title 清空
       *
       **/
      handleEmpty(){
        this.filters = {
          title: undefined,
          defaultFlag: undefined,
          publicationFlag: undefined,
          beginTime: undefined,
          endTime: undefined
        }
      },
      /**
       * 发布处理
       *
       **/
      handPublication(index, row){
        if(row.defaultFlag){
          this.$alert('默认主题不允许取消发布', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error',
            callback: action => {}
          })
          return
        }
        let title = '确认启动页正式发布？'
        if(row.publicationFlag){
          title = '确认启动页取消发布？'
         }
        this.$confirm(title, '提示', {})
          .then(() => {
            let para = Object.assign({}, row)
            para.publicationFlag = !para.publicationFlag
            putObj(para).then(data => {
              this.tableData.splice(index, 1, Object.assign({}, row))
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              this.getList(this.page)
            })
          })
          .catch(() => {})
      },
      /**
       * 改变每页记录条数触发查询
       **/
      handleSizeChange(pageSize) {
        this.page.pageSize = pageSize
        this.getList(this.page)
      },
      /**
       * 改变当前页码记录条数触发查询
       **/
      handleCurrentChange(currentPage) {
        this.page.currentPage = currentPage
        this.getList(this.page)
      },
      /**
       * @title 打开新增窗口
       *
       **/
      handleAdd: function() {
        this.addFormVisible = true
      },
      /**
       * @index 要编辑的数据索引
       * @row 需要修改的数据
       *
       **/
      handleEdit(index, row) {
        this.editFormVisible = true
        this.editForm = Object.assign({}, row)
        this.editForm.avatar = handleMfsPath(row.path)
      },
      /**
       * 删除操作
       **/
      handleDel(index, row) {
        if(row.defaultFlag){
          this.$alert('默认主题不允许删除', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error',
            callback: action => {}
          })
          return
        }
        let _this = this
        this.$confirm(`是否确认删除ID为${row.launchId}的记录`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
            return delObj(row.launchId)
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
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              let para = Object.assign({}, this.editForm)
              delete para['updateTime']
              delete para['avatar']
              para.beginTime = formatDatetime(para.beginTime)
              para.endTime = formatDatetime(para.endTime)
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
      handleSave: function() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true
              let para = Object.assign({}, this.addForm)
              delete para['avatar']
              para.beginTime = formatDatetime(para.beginTime)
              para.endTime = formatDatetime(para.endTime)
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
       * @title 编辑|新增|显示页面取消操作
       */
      handleCancle(){
        this.addFormVisible = false
        this.addForm.path = undefined
        this.addForm.avatar = undefined
        // 编辑视图隐藏
        this.editFormVisible = false
        this.editForm.path = undefined
        this.editForm.avatar = undefined
        // 展示图片视图
        this.viewFormVisible = false
        this.viewForm.path = undefined
        this.viewForm.avatar = undefined
      },
      /**
       * 搜索回调
       */
      searchChange(form) {
        this.getList(this.page, form)
      },
      /**
       * 刷新回调
       */
      refreshChange() {
        this.getList(this.page)
      },
      /**
       * 文件上传成功回调方法
       * @param res 返回数据
       * @param file  文件对象
       */
      handleUploadSuccess(res, file){
        if(this.addFormVisible){
          this.addForm.avatar = URL.createObjectURL(file.raw)
          this.addForm.path = `${res.data.bucketName}-${res.data.fileName}`
        }
        if(this.editFormVisible){
          this.editForm.avatar = URL.createObjectURL(file.raw)
          this.editForm.path = `${res.data.bucketName}-${res.data.fileName}`
        }
      },
      /**
       * 文件上传之前回调方法
       * @param file  文件对象
       * @returns {boolean}
       */
      handleBeforeUpload(file){
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      /**
       * 查看启动页图片
       * @param row
       */
      handleView(row){
        this.viewFormVisible = true
        this.viewForm.path = row.path
        this.viewForm.avatar = handleMfsPath(row.path)
        // fetchBlob(row.path).then(response => {
        //   this.viewForm.avatar = URL.createObjectURL(response.data)
        // })
        // fetchURL(row.path).then(response => {
        //   this.viewForm.avatar = response.data.data
        // })
      },
      /**
       * 日期数据格式化
       * @param row
       * @param column
       * @returns {*}
       */
      dateFormat(row, column){
       let date = row[column.property]
        if(date){
          return format(new Date(date))
        }
        return null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .madp-upload-launch-img-container {
    width: 187px;
    height: 333px;
  }
</style>
