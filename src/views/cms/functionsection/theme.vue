<template>
  <div class="execution">
    <!-- 新增 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary"
                     @click="handleAdd"
                     size="small"
                     icon="el-icon-plus"
                     v-if="permissions.cms_functiontheme_add">新 增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 列表 -->
    <el-table :data="tableData" highlight-current-row v-loading="tableLoading" style="width: 100%;">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" sortable></el-table-column>
      <el-table-column prop="beginTime" label="开始时间" :formatter="dateFormat" sortable></el-table-column>
      <el-table-column prop="endTime" label="结束时间" :formatter="dateFormat" sortable></el-table-column>
      <el-table-column prop="publicationTime" label="发布时间" width="180" align="center" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.publicationFlag">{{scope.row.publicationTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="defaultFlag" label="默认标识" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.defaultFlag" disabled></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="270" align="center">
        <template  slot-scope="scope">
          <el-button type="text"
                     class="madp-link-style"
                     icon="el-icon-check"
                     size="small"
                     plain
                     v-if="permissions.cms_functiontheme_edit"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text"
                     class="madp-link-style"
                     icon="el-icon-delete"
                     size="small"
                     plain
                     v-if="permissions.cms_functiontheme_del"
                     @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button type="text"
                     class="madp-link-style"
                     icon="el-icon-plus"
                     size="small"
                     plain
                     @click="handleIcon(scope.$index, scope.row)">图标</el-button>
          <el-button type="text"
                     class="madp-link-style"
                     v-if="scope.row.publicationFlag"
                     icon="el-icon-circle-close-outline"
                     size="small"
                     plain
                     @click="handPublication(scope.$index, scope.row)">草稿</el-button>
          <el-button type="text"
                     class="madp-link-style"
                     v-else
                     icon="el-icon-circle-check-outline"
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
    <!-- 新增界面 -->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="formRules" ref="addForm">
        <el-form-item label="主题" prop="themeId">
          <el-select v-model="addForm.themeId"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancle">取消</el-button>
        <el-button type="primary" @click.native="handleSave" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="formRules" ref="editForm">
        <el-form-item label="主键" prop="ftId" v-show="false">
          <el-input v-model="editForm.ftId"></el-input>
        </el-form-item>
        <el-form-item label="主题" prop="themeId">
          <el-select v-model="editForm.themeId"
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
          <el-input v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始日期">
              <el-date-picker
                v-model="editForm.beginTime"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束日期">
              <el-date-picker
                v-model="editForm.endTime"
                type="date"
                placeholder="选择结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancle">取消</el-button>
        <el-button type="primary" @click.native="handleUpdate" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--图标界面-->
    <el-dialog title="图标"
               :visible.sync="iconFormVisible"
               :close-on-click-modal="false"
               @close="handleIconCancle">
      <el-row class="madp-basic-container">
        <el-col :span="6"
                class="madp-main-margin">
          <el-tree class="filter-tree"
                   node-key="id"
                   highlight-current
                   :data="treeData"
                   :default-expanded-keys="aExpandedKeys"
                   :filter-node-method="filterNode"
                   :props="defaultProps"
                   @node-click="getNodeData"
                   @node-expand="nodeExpand"
                   @node-collapse="nodeCollapse">
          </el-tree>
        </el-col>
        <el-col :span="18"
                class="madp-main-margin">
          <el-card class="box-card">
            <el-form :label-position="labelPosition"
                     label-width="80px"
                     :model="iconForm"
                     ref="iconForm">
              <el-row v-show="false">
                <el-col :span="12">
                  <el-form-item label="主题编号" prop="ftId">
                    <el-input v-model="iconForm.ftId"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="版块编号" prop="fsId">
                    <el-input v-model="iconForm.fsId"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="选中版块">
                <el-input v-model="currentName" readonly></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="高亮图标" v-if="currentGrade != 1"
                                :rules="{
                                  required: true, message: '请选择要上传的高亮图标', trigger: 'blur'
                                }"
                                prop="highlightIcon">
                    <el-upload action="/admin/file/upload"
                               :show-file-list="false"
                               :headers="headers"
                               :on-success="handleHighlightIconUploadSuccess"
                               :before-upload="handleBeforeUpload">
                      <img v-if="iconForm.highlightIcon"
                           :src="iconForm.highlightAvatar"
                           class="madp-upload-img" />
                      <i v-else class="el-icon-plus madp-upload-icon"></i>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="高亮图标" v-else
                                prop="highlightIcon">
                    <el-upload action="/admin/file/upload"
                               :show-file-list="false"
                               :headers="headers"
                               :on-success="handleHighlightIconUploadSuccess"
                               :before-upload="handleBeforeUpload">
                      <img v-if="iconForm.highlightIcon"
                           :src="iconForm.highlightAvatar"
                           class="madp-upload-img" />
                      <i v-else class="el-icon-plus madp-upload-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <!-- 当且仅当层级为0显示 -->
                  <el-form-item label="普通图标"
                                v-if="currentGrade === 0"
                                :rules="{
                                  required: true, message: '请选择要上传的普通图标', trigger: 'blur'
                                }"
                                prop="normalIcon">
                    <el-upload action="/admin/file/upload"
                               :show-file-list="false"
                               :headers="headers"
                               :on-success="handleUploadNormalIconSuccess"
                               :before-upload="handleBeforeUpload">
                      <img v-if="iconForm.normalIcon"
                           :src="iconForm.normalAvatar"
                           class="madp-upload-img" />
                      <i v-else class="el-icon-plus madp-upload-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item >
                <el-button type="primary" size="small" @click="handleIconUpdate">更新</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import {
    fetchTree,
    getObj as getFuncObj
  } from '@/api/cms/functionsection'
  import {
    fetchList,
    getObj,
    addObj,
    putObj,
    delObj
  } from '@/api/cms/functiontheme'
  import {
    fetchIcon,
    putObj as putIconObj
  } from '@/api/cms/functionicon'
  import {
    fetchSelect
  } from '@/api/cms/festivaltheme'
  import {
    mapGetters
  } from 'vuex'
  import {
    validatenull
  } from '@/util/validate'
  import {
    handleMfsPath
  } from '@/util/util'
  import {
    format,
    formatDate,
    formatDatetime
  } from '@/util/date'
  import store from '@/store'

  export default {
    name: 'theme',
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
        formRules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ]
        },
        addFormVisible:false, //新增界面是否显示
        addLoading: false,
        addForm:{
          ftId: undefined,
          themeId: undefined,
          title: undefined,
          beginTime: undefined,
          endTime: undefined,
        },
        editFormVisible:false, //编辑界面是否显示
        editLoading: false,
        editForm:{
          ftId: undefined,
          themeId: undefined,
          title: undefined,
          beginTime: undefined,
          endTime: undefined,
        },
        iconFormVisible:false, //编辑界面是否显示
        iconLoading: false,
        treeData: [],
        iconFormStatus: '',
        iconForm: {
          ftId: undefined,
          fsId: undefined,
          highlightIcon: undefined,
          normalIcon: undefined,
          highlightAvatar: undefined,
          normalAvatar: undefined
        },
        labelPosition: 'right',
        currentName: undefined,  // 选中版块名称
        currentGrade: 0, // 选中版块层级
        // ---------------------------
        // 树结构属性定义开始
        oExpandedKey: {
          // key (from tree id) : expandedOrNot boolean
        },
        oTreeNodeChildren: {
          // id1 : [children] (from tree node id1)
          // id2 : [children] (from tree node id2)
        },
        aExpandedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
        // 树结构属性定义结束
        // ---------------------------
      }
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    mounted: function() {
      this.getSelect()
      this.getList(this.page)
    },
    methods: {
      /**
       * 查询表格数据
       * @param page
       * @param params
       */
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
       *
       * @title 通过主键获取版块图标
       *
       **/
      getIcon(params){
        fetchIcon(params).then(response => {
          if(!validatenull(response.data.data)){
            this.iconForm.highlightAvatar = handleMfsPath(response.data.data.highlightIcon)
            this.iconForm.normalAvatar = handleMfsPath(response.data.data.normalIcon)
            this.iconForm.highlightIcon = response.data.data.highlightIcon
            this.iconForm.normalIcon = response.data.data.normalIcon
          }else{
            this.iconForm.highlightAvatar = undefined
            this.iconForm.normalAvatar = undefined
            this.iconForm.highlightIcon = undefined
            this.iconForm.normalIcon = undefined
          }
        })
      },
      /**
       *
       * @title 获取基础版本树结构
       **/
      getTree() {
        fetchTree().then(response => {
          this.treeData = response.data.data
        })
      },
      /**
       * @title 打开新增窗口
       *
       **/
      handleAdd() {
        this.addFormVisible = true
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
       * @title 打开编辑页面
       * @index 要编辑的数据索引
       * @row 需要修改的数据
       *
       **/
      handleEdit(index, row) {
        if(row.defaultFlag){
          this.$alert('默认主题不允许编辑', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error',
            callback: action => {}
          })
          return
        }
        this.editFormVisible = true
        this.editForm = Object.assign({}, row)
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
       * @title 处理删除操作
       * @index 要删除的数据索引
       * @row 需要删除的数据
       *
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
       * @title 处理图标操作
       * @index 要设置的数据索引
       * @row 需要设置的数据
       *
       **/
      handleIcon(index, row) {
        // 设置主题ID
        this.iconForm.ftId = row.ftId
        this.iconFormVisible = true
        this.getTree()
      },
      /**
       * @title 处理发布操作
       * @index 要发布的数据索引
       * @row 需要发布的数据
       *
       **/
      handPublication(index, row) {
        if(row.defaultFlag){
          this.$alert('默认主题不允许取消发布', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error',
            callback: action => {}
          })
          return
        }
        let title = '确认正式主题发布？'
        if(row.publicationFlag){
          title = '确认取消主题发布？'
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
       * @title 数据更新
       *
       **/
      handleIconUpdate(){
        this.$refs.iconForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let para = Object.assign({}, this.iconForm)
              delete para['highlightAvatar']
              delete para['normalAvatar']
              putIconObj(para).then(() => {
                this.getTree()
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              })
            })
          }
        })
      },
      handleIconCancle(){
        this.iconForm.fsId = undefined
        this.iconForm.ftId = undefined
        this.iconForm.highlightAvatar = undefined
        this.iconForm.highlightIcon = undefined
        this.iconForm.normalAvatar = undefined
        this.iconForm.normalIcon = undefined
        this.currentName = undefined
        this.currentGrade = 0
      },
      /**
       *  @title 改变主题
       *
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
       * @title 编辑|新增|显示页面取消操作
       */
      handleCancle(){
        this.addFormVisible = false
        // 编辑视图隐藏
        this.editFormVisible = false
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
      },
      /**********************************/
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      nodeExpand(data) {
        let aChildren = data.children
        if (aChildren.length > 0) {
          this.oExpandedKey[data.id] = true
          this.oTreeNodeChildren[data.id] = aChildren
        }
        this.setExpandedKeys()
      },
      getNodeData(data) {
        getFuncObj(data.id).then(response => {
          this.iconForm.fsId = response.data.data.fsId
          this.currentName = response.data.data.name
          this.currentGrade = response.data.data.grade
          this.getIcon(this.iconForm)
        })
      },
      nodeCollapse(data) {
        this.oExpandedKey[data.id] = false
        // 如果有子节点
        this.treeRecursion(this.oTreeNodeChildren[data.id], (oNode) => {
          this.oExpandedKey[oNode.id] = false
        });
        this.setExpandedKeys()
      },
      setExpandedKeys() {
        let oTemp = this.oExpandedKey
        this.aExpandedKeys = []
        for (let sKey in oTemp) {
          if (oTemp[sKey]) {
            this.aExpandedKeys.push(parseInt(sKey));
          }
        }
      },
      treeRecursion(aChildren, fnCallback) {
        if (aChildren) {
          for (let i = 0; i < aChildren.length; ++i) {
            let oNode = aChildren[i]
            fnCallback && fnCallback(oNode)
            this.treeRecursion(oNode.children, fnCallback)
          }
        }
      },
      /**********************************/
      /**
       * 文件上传成功回调方法
       * @param res 返回数据
       * @param file  文件对象
       */
      handleUploadNormalIconSuccess(res, file){
        this.iconForm.normalAvatar = URL.createObjectURL(file.raw)
        this.iconForm.normalIcon = `${res.data.bucketName}-${res.data.fileName}`
      },
      /**
       * 文件上传成功回调方法
       * @param res 返回数据
       * @param file  文件对象
       */
      handleHighlightIconUploadSuccess(res, file){
        this.iconForm.highlightAvatar = URL.createObjectURL(file.raw)
        this.iconForm.highlightIcon = `${res.data.bucketName}-${res.data.fileName}`
      },
      /**
       * 文件上传之前回调方法
       * @param file  文件对象
       * @returns {boolean}
       */
      handleBeforeUpload(file){
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return isLt1M
      }
      /**********************************/
    }
  }
</script>

<style scoped>

</style>
