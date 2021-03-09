<!-- 
  ~
  ~  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  ~
  -->
<template>
  <div class="execution">
    <basic-container>
      <div class="filter-container">
        <el-button-group>
          <el-button
            type="primary"
            v-if="helpcenter_btn_add"
            size="small"
            icon="el-icon-plus"
            @click="handleAdd"
          >添加</el-button>
          <el-button
            type="primary"
            v-if="helpcenter_btn_edit"
            icon="el-icon-check"
            size="small"
            @click="handleEdit"
          >编辑</el-button>
          <el-button
            type="primary"
            v-if="helpcenter_btn_del"
            icon="el-icon-delete"
            size="small"
            @click="handleDel"
          >删除</el-button>
        </el-button-group>
      </div>
      <!-- 菜单 -->
      <el-row>
        <el-col :span="8" style="margin-top:15px;">
          <el-tree
            class="filter-tree"
            node-key="id"
            highlight-current
            :data="treeData"
            :default-expanded-keys="aExpandedKeys"
            :filter-node-method="filterNode"
            :props="defaultProps"
            @node-click="getNodeData"
            @node-expand="nodeExpand"
            @node-collapse="nodeCollapse"
          ></el-tree>
        </el-col>
        <!-- 表单 -->
        <el-col :span="16" style="margin-top:15px;">
          <el-card class="box-card">
            <el-form
              :label-position="labelPosition"
              label-width="80px"
              :model="form"
              :rules="formRules"
              ref="form"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="父级节点" prop="parentId">
                    <el-input v-model="form.parentId" :disabled="true" placeholder="请输入父级节点"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="节点ID" prop="hcId">
                    <el-input v-model="form.hcId" :disabled="formEdit" placeholder="请输入节点ID"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" :disabled="formEdit" placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="排序" prop="sort">
                <el-input
                  type="number"
                  v-model="form.orders"
                  :disabled="formEdit"
                  placeholder="请输入排序"
                ></el-input>
              </el-form-item>
              <el-form-item
                v-if="currentTire == 1"
                label="图标"
                :rules="{
                                  required: true, message: '请选择要上传的图标', trigger: 'blur'
                                }"
                prop="icon"
              >
                <el-upload
                  action="/admin/file/upload"
                  :headers="headers"
                  :show-file-list="false"
                  :disabled="formEdit"
                  :on-success="handleUploadSuccess"
                  :before-upload="handleBeforeUpload"
                >
                  <img v-if="form.icon" :src="form.avatar" class="madp-upload-img" />
                  <i v-else class="el-icon-plus madp-upload-icon"></i>
                </el-upload>
              </el-form-item>
              <div v-if="currentTire == 2">
                <el-form-item label="关键字" prop="keywords">
                  <el-input v-model="form.keywords" :disabled="formEdit" placeholder="请输入关键字"></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="是否热门" prop="hotFlag">
                      <el-switch
                        v-model="form.hotFlag"
                        :disabled="formEdit"
                        :active-value="1"
                        :inactive-value="0"
                      ></el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="答案类型"
                      :rules="{
                                  required: true, message: '请选择答案类型', trigger: 'change'
                                }"
                      prop="mold"
                    >
                      <el-select
                        class="filter-item"
                        v-model="form.mold"
                        :disabled="formEdit"
                        placeholder="请选择类型"
                      >
                        <el-option
                          v-for="item in  moldOptions"
                          :key="item"
                          :label="item | moldFilter"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item v-if="form.mold === '0'" label="文本答案" prop="content">
                  <el-input
                    v-model="form.content"
                    type="textarea"
                    :disabled="formEdit"
                    placeholder="请输入答案"
                  ></el-input>
                </el-form-item>
                <el-form-item v-if="form.mold === '1'" label="链接答案" prop="url">
                  <el-input v-model="form.url" :disabled="formEdit" placeholder="请输入跳转地址"></el-input>
                </el-form-item>
              </div>
              <el-form-item v-if="formStatus == 'update'">
                <el-button type="primary" size="small" @click="handleUpdate">更新</el-button>
                <el-button size="small" @click="handleCancel">取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus == 'create'">
                <el-button size="small" type="primary" @click="handleSave">保存</el-button>
                <el-button size="small" @click="handleCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import {
  fetchTree,
  fetchList,
  getObj,
  addObj,
  putObj,
  delObj
} from "@/api/cms/helpcenter";
import { mapGetters } from "vuex";
import { handleMfsPath } from "@/util/util";
import store from "@/store";

export default {
  name: "helpcenter",
  data() {
    return {
      headers: {
        Authorization: "Bearer " + store.getters.access_token
      },
      formEdit: true,
      formStatus: "",
      showElement: false,
      listQuery: {
        name: undefined
      },
      oExpandedKey: {
        // key (from tree id) : expandedOrNot boolean
      },
      oTreeNodeChildren: {
        // id1 : [children] (from tree node id1)
        // id2 : [children] (from tree node id2)
      },
      aExpandedKeys: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      helpcenter_btn_add: false,
      helpcenter_btn_del: false,
      helpcenter_btn_edit: false,
      labelPosition: "right",
      moldOptions: ["0", "1"],
      currentId: -1,
      currentTire: 1, // 当前版块菜单层级
      treeData: [],
      form: {
        hcId: undefined,
        parentId: undefined,
        orders: undefined,
        name: undefined,
        avatar: undefined, // 图标的真实链接地址
        icon: undefined,
        type: undefined,
        keywords: undefined,
        hotFlag: 0,
        mold: "0",
        content: undefined,
        url: undefined
      },
      formRules: {
        hcId: [{ required: true, message: "请输入节点ID", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  filters: {
    moldFilter(mold) {
      const moldMap = {
        0: "文本",
        1: "链接"
      };
      return moldMap[mold];
    }
  },
  created() {
    this.getList();
    this.helpcenter_btn_add = this.permissions["cms_helpcenter_add"];
    this.helpcenter_btn_del = this.permissions["cms_helpcenter_del"];
    this.helpcenter_btn_edit = this.permissions["cms_helpcenter_edit"];
  },
  mounted: function() {},
  computed: {
    ...mapGetters(["elements", "permissions"])
  },
  methods: {
    getList() {
      fetchTree(this.listQuery).then(response => {
        this.treeData = response.data.data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    nodeExpand(data) {
      let aChildren = data.children;
      if (aChildren.length > 0) {
        this.oExpandedKey[data.id] = true;
        this.oTreeNodeChildren[data.id] = aChildren;
      }
      this.setExpandedKeys();
    },
    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = "update";
      }
      getObj(data.id).then(response => {
        this.form = response.data.data;
        this.handleTire();
      });
      this.currentId = data.id;
      this.showElement = true;
    },
    nodeCollapse(data) {
      this.oExpandedKey[data.id] = false;
      // 如果有子节点
      this.treeRecursion(this.oTreeNodeChildren[data.id], oNode => {
        this.oExpandedKey[oNode.id] = false;
      });
      this.setExpandedKeys();
    },
    setExpandedKeys() {
      let oTemp = this.oExpandedKey;
      this.aExpandedKeys = [];
      for (let sKey in oTemp) {
        if (oTemp[sKey]) {
          this.aExpandedKeys.push(parseInt(sKey));
        }
      }
    },
    treeRecursion(aChildren, fnCallback) {
      if (aChildren) {
        for (let i = 0; i < aChildren.length; ++i) {
          let oNode = aChildren[i];
          fnCallback && fnCallback(oNode);
          this.treeRecursion(oNode.children, fnCallback);
        }
      }
    },
    /**
     * @title 触发新增
     *
     **/
    handleAdd: function() {
      if (this.currentTire === 2) {
        this.$alert("不能在选择的问题下添加子问题", "温馨提示", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {
            this.formEdit = true;
          }
        });
        return;
      }
      this.handleReset();
      this.handleTire();
      this.formEdit = false;
      this.formStatus = "create";
    },
    /**
     * @title 触发编辑
     *
     **/
    handleEdit() {
      if (this.form.hcId) {
        this.formEdit = false;
        this.formStatus = "update";
      }
    },
    /**
     * @title 触发删除
     *
     **/
    handleDel() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList();
          this.handleReset();
          this.handleCancel();
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
        });
      });
    },
    /**
     * @title 数据更新
     *
     **/
    handleUpdate: function() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            putObj(this.form).then(() => {
              this.getList();
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000
              });
            });
          });
        }
      });
    },

    /**
     * @title 数据添加
     *
     **/
    handleSave: function() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            addObj(this.form).then(() => {
              this.getList();
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000
              });
            });
          });
        }
      });
    },

    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList(this.page);
    },
    /**
     * @title 表单数据重置
     */
    handleReset() {
      this.form = {
        hcId: undefined,
        parentId: this.currentId,
        orders: undefined,
        name: undefined,
        icon: undefined,
        type: undefined,
        hotFlag: 0,
        keywords: undefined,
        mold: "0",
        content: undefined,
        url: undefined
      };
    },
    /**
     * @title 取消操作
     */
    handleCancel() {
      this.formEdit = true;
      this.formStatus = "";
    },
    /**
     * @title 处理帮助中心问题层级和帮助类型
     */
    handleTire() {
      if (this.form.parentId == -1) {
        this.currentTire = 1;
        this.form.type = "0";
        this.form.avatar = handleMfsPath(this.form.icon);
      } else {
        this.currentTire = 2;
        this.form.type = "1";
      }
    },
    /**
     * 文件上传成功回调方法
     * @param res 返回数据
     * @param file  文件对象
     */
    handleUploadSuccess(res, file) {
      this.form.avatar = URL.createObjectURL(file.raw);
      this.form.icon = `${res.data.bucketName}-${res.data.fileName}`;
    },
    /**
     * 文件上传之前回调方法
     * @param file  文件对象
     * @returns {boolean}
     */
    handleBeforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("上传图标大小不能超过 1MB!");
      }
      return isLt1M;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>