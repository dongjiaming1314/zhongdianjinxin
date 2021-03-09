<!--
  -    Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  -
  -->

<template>
  <div class="execution">
    <basic-container>
      <div class="filter-container">
        <el-button-group>
          <el-button type="primary"
                     v-if="permissions.cms_articlecategory_add"
                     size="small"
                     icon="el-icon-plus"
                     @click="handleAdd">添加
          </el-button>
          <el-button type="primary"
                     v-if="permissions.cms_articlecategory_edit"
                     icon="el-icon-check"
                     size="small"
                     @click="handleEdit">编辑
          </el-button>
          <el-button type="primary"
                     v-if="permissions.cms_articlecategory_del"
                     icon="el-icon-delete"
                     size="small"
                     @click="handleDel">删除
          </el-button>
        </el-button-group>
      </div>

      <el-row>
        <el-col :span="4"
                style='margin-top:15px;'>
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
        <el-col :span="20"
                style='margin-top:15px;'>
          <el-card class="box-card">
            <el-form :label-position="labelPosition"
                     label-width="80px"
                     :model="form"
                     ref="form">
              <el-form-item label="父级节点"
                            prop="parentId">
                <el-input v-model="form.parentId"
                          :disabled="true"
                          placeholder="请输入父级节点"></el-input>
              </el-form-item>
              <el-form-item label="节点ID"
                            prop="menuId">
                <el-input v-model="form.acId"
                          :disabled="formEdit"
                          placeholder="请输入节点ID"></el-input>
              </el-form-item>
              <el-form-item label="名称"
                            prop="name">
                <el-input v-model="form.name"
                          :disabled="formEdit"
                          placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="排序"
                            prop="sort">
                <el-input type="number"
                          v-model="form.sort"
                          :disabled="formEdit"
                          placeholder="请输入排序"></el-input>
              </el-form-item>
              <el-form-item label="描述"
                            prop="name">
                <el-input v-model="form.seoDescription"
                          :disabled="formEdit"
                          placeholder="请输入描述"></el-input>
              </el-form-item>
              <el-form-item label="关键字"
                            prop="name">
                <el-input v-model="form.seoKeywords"
                          :disabled="formEdit"
                          placeholder="请输入关键字"></el-input>
              </el-form-item>
              <el-form-item label="标题"
                            prop="name">
                <el-input v-model="form.seoTitle"
                          :disabled="formEdit"
                          placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item v-if="formStatus == 'update'">
                <el-button type="primary"
                           @click="update">更新
                </el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus == 'create'">
                <el-button type="primary"
                           @click="create">保存
                </el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
  import { fetchCategoryTree, fetchList, getObj, addObj, putObj, delObj } from '@/api/cms/articlecategory'
  import { tableOption } from '@/const/crud/cms/articlecategory'
  import { mapGetters } from 'vuex'
  export default {
    name: 'articlecategory',
    data() {
      return {
        formEdit: true,
        formAdd: true,
        formStatus: '',
        showElement: false,
        listQuery: {
          name: undefined
        },
        treeData: [],
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
          permission: undefined,
          name: undefined,
          acId: undefined,
          parentId: undefined,
          seoDescription: undefined,
          seoKeywords: undefined,
          seoTitle: undefined,
          sort: undefined
        },
        currentId: -1,
      }
    },
    created() {
      this.getList()
    },
    mounted: function() { },
    computed: {
      ...mapGetters(['permissions'])
    },
    methods: {
      getList() {
        fetchCategoryTree(this.listQuery).then(response => {
          this.treeData = response.data.data
        })
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
      /**
       * @title 打开新增窗口
       * @detail 调用crud的handleadd方法即可
       *
       **/
      handleAdd: function() {
        this.resetForm()
        this.formEdit = false
        this.formStatus = 'create'
      },
      handleEdit() {
        if (this.form.acId) {
          this.formEdit = false
          this.formStatus = 'update'
        }
      },
      handleDel() {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(this.currentId).then(() => {
            this.getList()
            this.resetForm()
            this.onCancel()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        }).catch(() => {})
      },
      update() {
        putObj(this.form).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      create() {
        addObj(this.form).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      onCancel() {
        this.formEdit = true
        this.formStatus = ''
      },
      resetForm() {
        this.form = {
          permission: undefined,
          name: undefined,
          acId: undefined,
          parentId: this.currentId,
          seoDescription: undefined,
          seoKeywords: undefined,
          seoTitle: undefined,
          sort: undefined
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
