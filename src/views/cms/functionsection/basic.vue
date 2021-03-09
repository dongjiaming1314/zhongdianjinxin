<!--
  ~
  ~  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  ~
  ~ 基础版块
  ~
  -->
<template>
  <div>
    <div class="filter-container">
      <el-button-group>
        <el-button type="primary"
                   v-if="permissions.cms_functionsection_add"
                   size="small"
                   icon="el-icon-plus"
                   @click="handleAdd">添加
        </el-button>
        <el-button type="primary"
                   v-if="permissions.cms_functionsection_edit"
                   icon="el-icon-check"
                   size="small"
                   @click="handleEdit">编辑
        </el-button>
        <el-button type="primary"
                   v-if="permissions.cms_functionsection_del"
                   icon="el-icon-delete"
                   size="small"
                   @click="handleDel">删除
        </el-button>
      </el-button-group>
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
                     :model="form"
                     :rules="formRules"
                     ref="form">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="父级节点"
                                prop="parentId">
                    <el-input v-model="form.parentId"
                              :disabled="true"
                              placeholder="请输入父级节点"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="节点ID"
                                prop="fsId">
                    <el-input v-model="form.fsId"
                              :disabled="formEdit"
                              placeholder="请输入节点ID"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="名称"
                            prop="name">
                <el-input v-model="form.name"
                          :disabled="formEdit"
                          placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="类型"
                                prop="type">
                    <el-select class="filter-item"
                               v-model="form.type"
                               :disabled="formEdit"
                               placeholder="请选择版块类型">
                      <el-option v-for="item in  typeOptions"
                                 :key="item"
                                 :label="item | typeFilter"
                                 :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="排序"
                                prop="sort">
                    <el-input type="number"
                              v-model="form.orders"
                              :disabled="formEdit"
                              placeholder="请输入排序"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <div v-if="form.grade === 2">
                <el-form-item label="默认显示"
                              prop="defaultIcon">
                  <el-checkbox-group v-model="form.defaultIcon"
                                     :disabled="formEdit"
                                     size="mini">
                    <el-checkbox v-for="item in mainNavData"
                                 :key="item.id"
                                 :label="item.id">
                      {{item.name}}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="跳转类型"
                                  :rules="{
                                    required: true, message: '请选择跳转类型', trigger: 'blur'
                                  }"
                                  prop="jumpType">
                      <el-select class="filter-item"
                                 v-model="form.jumpType"
                                 :disabled="formEdit"
                                 placeholder="请选择版块类型">
                        <el-option v-for="item in jumpTypeOptions"
                                   :key="item"
                                   :label="item | jumpTypeFilter"
                                   :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="离线包"
                                  v-if="form.jumpType === '2'"
                                  :rules="{
                                    required: true, message: '请输入离线包编号', trigger: 'blur'
                                  }"
                                  prop="offlineCode">
                      <el-input v-model="form.offlineCode"
                                :disabled="formEdit"
                                placeholder="请输入离线包编号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="跳转地址"
                              :rules="{
                                required: true, message: '请输入跳转地址', trigger: 'blur'
                              }"
                              prop="url">
                  <el-input v-model="form.url"
                            :disabled="formEdit"
                            placeholder="请输入跳转地址"></el-input>
                </el-form-item>
              </div>
              <el-form-item v-if="formStatus == 'update'">
                <el-button type="primary" size="small"
                           @click="handleUpdate">更新
                </el-button>
                <el-button size="small" @click="handleCancel">取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus == 'create'">
                <el-button size="small" type="primary"
                           @click="handleSave">保存
                </el-button>
                <el-button size="small" @click="handleCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {
    fetchTree,
    getObj,
    putObj,
    addObj,
  } from '@/api/cms/functionsection'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'basic',
    data() {
      return {
        formEdit: true,
        formAdd: true,
        formStatus: '',
        showElement: false,
        typeOptions: ['1', '2'],
        jumpTypeOptions: ['1', '2', '3'],
        treeData: [],
        mainNavData: [],      //主导航版块数据
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
        },
        labelPosition: 'right',
        form: {
          fsId: undefined,
          grade: undefined,
          parentId: undefined,
          orders: undefined,
          name: undefined,
          type: undefined,
          jumpType: undefined,
          offlineCode:undefined,
          url: undefined,
          defaultIcon: []
        },
        formRules: {
          fsId: [
            { required: true, message: '请输入节点ID', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'blur' }
          ]
        },
        currentId: 0,
        currentGrade: 0   // 当前版块菜单层级
      }
    },
    filters: {
      typeFilter(type) {
        const typeMap = {
          1: '导航',
          2: '功能'
        }
        return typeMap[type]
      },
      jumpTypeFilter(type) {
        const typeMap = {
          1: 'URL',
          2: '离线包',
          3: '原生'
        }
        return typeMap[type]
      }
    },
    created() {
      this.getTree()
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    methods: {
      getTree() {
        fetchTree().then(response => {
          this.treeData = response.data.data
          this.treeData.forEach(item => this.mainNavData.push({id: item.id, name: item.name}))
        })
      },
      /**
       * @title 触发新增
       *
       **/
      handleAdd(){
        if(this.currentGrade === 2){
          this.$alert('不能在选择的版块下添加子版块', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error',
            callback: action => {
              this.formEdit = true
            }
          })
          return
        }
        this.handleReset()
        this.handleGrade()
        this.formEdit = false
        this.formStatus = 'create'
      },
      /**
       * @title 触发编辑
       *
       **/
      handleEdit() {
        if (this.form.fsId) {
          this.formEdit = false
          this.formStatus = 'update'
        }
      },
      /**
       * @title 触发删除
       *
       **/
      handleDel() {

      },
      /**
       * @title 数据更新
       *
       **/
      handleUpdate(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let para = Object.assign({}, this.form)
              delete para['treePath']
              delete para['updateTime']
              putObj(para).then(() => {
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
      /**
       * @title 数据添加
       *
       **/
      handleSave(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              console.log(this.form)
              addObj(this.form).then(() => {
                this.getTree()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
            })
          }
        })
      },
      /**
       * @title 操作取消
       *
       **/
      handleCancel(){
        this.formEdit = true
        this.formStatus = ''
      },
      /**
       * @title 处理版块层级
       *
       **/
      handleGrade(){
        if((this.form.parentId + '').endsWith('00')){
          this.currentGrade = 2
        }
        if ((this.form.parentId + '').endsWith('000')) {
          this.currentGrade = 1
        }
        if(this.form.parentId == 0){
          this.currentGrade = 0
        }
        this.form.grade = this.currentGrade
      },
      /**
       * @title 重置表单
       *
       **/
      handleReset(){
        this.form = {
          fsId: undefined,
          grade: this.currentGrade,
          parentId: this.currentId,
          orders: undefined,
          name: undefined,
          type: undefined,
          jumpType: undefined,
          offlineCode:undefined,
          url: undefined,
          defaultIcon: []
        }
      },
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
        if (!this.formEdit) {
          this.formStatus = 'update'
        }
        getObj(data.id).then(response => {
          this.form = response.data.data
          this.handleGrade()
        })
        this.currentId = data.id
        this.showElement = true
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
    }
  }
</script>

<style lang="scss" scoped>
  .madp-basic-container{
    .madp-main-margin{
      margin-top:10px;
    }
    .mapd-form-checkbox{
      padding-right: 5px;
    }
  }

</style>
