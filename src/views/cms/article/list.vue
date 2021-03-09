<!--
  -    Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  -list文章管理
  -->

<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <section>
        <!--工具条-->
        <el-row>
          <el-col>
            <el-form :inline="true" :model="filterForm">
              <el-form-item>
                <span class="madp-article-filter-input" @click="handleShowAcDialog">
                  <span>{{filterForm.name}}</span>
                  <i class="el-icon-arrow-down"></i>
                </span>
                <el-input v-model="filterForm.acId" v-show="false"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-search"
                  @click="handleFilter"
                >查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button size="small" icon="el-icon-delete" @click="handleEmpty">清空</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;height:40px;">
          <el-form :inline="true">
            <el-form-item>
              <el-button
                type="primary"
                @click="handleAdd"
                size="small"
                icon="el-icon-plus"
                v-if="permissions.cms_article_add"
              >新 增</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!--列表-->
        <el-table
          :data="tableData"
          highlight-current-row
          v-loading="tableLoading"
          style="width: 100%;"
          :row-style="rowstyle"
        >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="title" label="标题" width="300" sortable>
            <template slot-scope="scope">
              <router-link
                :to="{name: '文章详情', params:{articleId: scope.row.articleId}}"
              >{{scope.row.title}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="分类" sortable>
            <template slot-scope="scope">
              <el-tag>{{scope.row.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="publicationFlag" label="是否发布" align="center" sortable>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.publicationFlag" type="success">已发布</el-tag>
              <el-tag v-else type="warning">未发布</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="publicationTime" label="发布时间" width="180" align="center" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.publicationFlag">{{scope.row.publicationTime}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="madp-link-style"
                v-if="permissions.cms_article_edit"
                icon="el-icon-check"
                size="small"
                plain
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                class="madp-link-style"
                v-if="permissions.cms_article_del"
                icon="el-icon-delete"
                size="small"
                plain
                @click="handleDel(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                type="text"
                class="madp-link-style"
                v-if="!scope.row.publicationFlag"
                icon="el-icon-circle-check-outline"
                size="small"
                plain
                @click="handPublication(scope.$index, scope.row)"
              >发布</el-button>
              <el-button
                type="text"
                class="madp-link-style"
                v-else
                icon="el-icon-circle-close-outline"
                size="small"
                plain
                @click="handPublication(scope.$index, scope.row)"
              >草稿</el-button>
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
              style="float:right;"
            ></el-pagination>
          </el-col>
        </el-row>
        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
          <el-form :model="editForm" label-width="80px" :rules="formRules" ref="editForm">
            <el-form-item label="主键" prop="articleId" v-show="false">
              <el-input v-model="editForm.articleId"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="editForm.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="summary">
              <el-input v-model="editForm.summary" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="editForm.author" auto-complete="off"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="分类" prop="acId">
                  <el-button
                    type="text"
                    class="madp-link-style"
                    v-if="permissions.cms_article_edit"
                    size="small"
                    plain
                    @click="handleShowAcDialog"
                  >{{editForm.name}}</el-button>
                  <el-input v-model="editForm.acId" v-show="false"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否置顶">
                  <el-switch v-model="editForm.topFlag"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="标签" prop="tags">
              <el-checkbox-group v-model="editForm.tags" :disabled="!editFormVisible" size="mini">
                <el-checkbox
                  v-for="item in tagList"
                  :label="item.value"
                  :key="item.value"
                  border
                >{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="图片" prop="image">
              <el-upload
                action="/admin/file/upload"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="handleBeforeUpload"
              >
                <img
                  v-if="editForm.image"
                  :src="'https://dev.madp.xyz'+editForm.avatar"
                  class="madp-upload-img"
                  style="width:100%"
                />
                <i v-else class="el-icon-plus madp-upload-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <avue-ueditor v-model="editForm.content"></avue-ueditor>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="handleUpdate" :loading="editLoading">提交</el-button>
          </div>
        </el-dialog>
        <!-- 分类选择器 -->
        <el-dialog title="请选择" :visible.sync="acFormVisible" :close-on-click-modal="false">
          <el-input placeholder="输入关键字进行过滤" v-model="acFilterText"></el-input>
          <el-tree
            class="filter-tree"
            :data="acTreeData"
            :props="acDefaultProps"
            default-expand-all
            :filter-node-method="handleFilterNode"
            @node-click="handleNodeClick"
            ref="acTree"
          ></el-tree>
        </el-dialog>
        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
          <el-form :model="addForm" label-width="80px" :rules="formRules" ref="addForm">
            <el-form-item label="标题" prop="title">
              <el-input v-model="addForm.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="summary">
              <el-input v-model="addForm.summary" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="addForm.author" auto-complete="off"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="分类" prop="acId">
                  <el-button
                    type="text"
                    class="madp-link-style"
                    v-if="permissions.cms_article_add"
                    size="small"
                    plain
                    @click="handleShowAcDialog"
                  >{{addForm.name}}</el-button>
                  <el-input v-model="addForm.acId" v-show="false"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否置顶">
                  <el-switch v-model="addForm.topFlag"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="标签" prop="tags">
              <el-checkbox-group v-model="addForm.tags" :disabled="!addFormVisible" size="mini">
                <el-checkbox
                  v-for="item in tagList"
                  :label="item.value"
                  :key="item.value"
                  border
                >{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="图片" prop="image">
              <div style="width: 100%;">
                <el-upload
                  action="/admin/file/upload"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleUploadSuccess"
                  :before-upload="handleBeforeUpload"
                >
                  <img
                    v-if="addForm.image"
                    :src="addForm.avatar"
                    class="madp-upload-img"
                    style="width:100%"
                  />
                  <i v-else class="el-icon-plus madp-upload-icon"></i>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <avue-ueditor v-model="addForm.content"></avue-ueditor>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="handleSave" :loading="addLoading">提交</el-button>
          </div>
        </el-dialog>
      </section>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, getObj, addObj, putObj, delObj } from "@/api/cms/article";
import { fetchCategoryTree } from "@/api/cms/articlecategory";
import { fetchTagList } from "@/api/cms/articletag";
import { handleMfsPath } from "@/util/util";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "article",
  data() {
    return {
      headers: {
        Authorization: "Bearer " + store.getters.access_token
      },
      tableData: [],
      tagList: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      // 筛选查询表单
      filterForm: {
        acId: "",
        name: "请选择分类"
      },
      // 表单验证规则定义
      formRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        summary: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        acId: [{ required: true, message: "请选择分类", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      //编辑界面数据
      editForm: {
        articleId: undefined,
        acId: undefined,
        name: undefined,
        title: undefined,
        summary: undefined,
        author: undefined,
        topFlag: false,
        publicationFlag: false,
        publicationTime: undefined,
        image: undefined,
        avatar: undefined, //上传图片成功后本地图片的URL(提交操作要删除此属性)
        tags: [],
        content: undefined
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addForm: {
        articleId: undefined,
        acId: undefined,
        name: "请选择",
        title: undefined,
        summary: undefined,
        author: undefined,
        topFlag: false,
        publicationFlag: false,
        image: undefined,
        avatar: undefined, //上传图片成功后本地图片的URL(提交操作要删除此属性)
        tags: [],
        content: undefined
      },
      acFormVisible: false,
      acFilterText: "",
      acTreeData: undefined,
      acDefaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  created() {},
  mounted: function() {
    this.getList(this.page);
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  methods: {
    /**
     * @title 列表过滤查询
     *
     **/
    handleFilter() {
      let para = Object.assign({}, this.filterForm);
      delete para["name"];
      this.page.page = 1;
      this.getList(this.page, this.filterForm);
    },
    /**
     * @title 清空列表过滤查询过滤参数
     *
     **/
    handleEmpty() {
      this.filterForm.acId = "";
      this.filterForm.name = "请选择分类";
    },
    /**
     *  @title 改变每页记录条数触发查询
     **/
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getList(this.page);
    },
    /**
     *  @title 改变当前页码记录条数触发查询
     **/
    handleCurrentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.getList(this.page);
    },
    /**
     *  @title 查询文章分类数据
     **/
    getCategoryTree() {
      fetchCategoryTree().then(response => {
        this.acTreeData = response.data.data;
      });
    },
    /**
     *  @title 查询列表数据
     **/
    getList(page, params) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize
          },
          params
        )
      ).then(response => {
        // console.log("+++++++++++++++++++++++=");
        // console.log(response.data.data.total);
        // console.log(response.data.data);
        this.tableData = response.data.data.records;
        this.page.total = response.data.data.total;
        this.tableLoading = false;
      });
    },
    /**
     *  @title 获取文章标签
     **/
    getTagList() {
      fetchTagList().then(response => {
        this.tagList = response.data.data;
      });
    },
    handPublication(index, row) {
      let title = "确认正式发布？";
      if (row.publicationFlag) {
        title = "确认取消发布？";
      }
      this.$confirm(title, "提示", {})
        .then(() => {
          let para = Object.assign({}, row);
          para.publicationFlag = !para.publicationFlag;
          putObj(para).then(data => {
            this.tableData.splice(index, 1, Object.assign({}, row));
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
            this.getList(this.page);
          });
        })
        .catch(() => {});
    },
    /**
     * @title 打开新增窗口
     *
     **/
    handleAdd() {
      this.getTagList();
      this.addFormVisible = true;
    },
    /**
     * @title 打开编辑页面
     * @index 要编辑的数据索引
     * @row 需要修改的数据
     *
     **/
    handleEdit(index, row) {
      this.getTagList();
      row.isPublication = row.isPublication === "true" ? true : false;
      row.isTop = row.isTop === "true" ? true : false;
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      this.editForm.avatar = handleMfsPath(row.image);
    },
    handleDel(index, row) {
      let _this = this;
      this.$confirm(`是否确认删除ID为${row.articleId}的记录`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delObj(row.articleId);
        })
        .then(data => {
          _this.tableData.splice(index, 1);
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.getList(this.page);
        })
        .catch(function(err) {});
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     *
     **/
    handleUpdate(row, index) {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);
            delete para["updateTime"];
            delete para["avatar"];
            putObj(para).then(data => {
              this.tableData.splice(index, 1, Object.assign({}, row));
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.editLoading = false;
              this.getList(this.page);
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
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let para = Object.assign({}, this.addForm);
            delete para["avatar"];
            addObj(para).then(res => {
              this.addLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.addLoading = false;
              this.getList(this.page);
            });
          });
        }
      });
    },
    /**
     * 文件上传成功回调方法
     * @param res 返回数据
     * @param file  文件对象
     */
    handleUploadSuccess(res, file) {
      if (this.addFormVisible) {
        this.addForm.avatar = URL.createObjectURL(file.raw);
        this.addForm.image = `${res.data.bucketName}-${res.data.fileName}`;
      }
      if (this.editFormVisible) {
        this.editForm.avatar = URL.createObjectURL(file.raw);
        this.editForm.image = `${res.data.bucketName}-${res.data.fileName}`;
      }
    },
    /**
     * 文件上传之前回调方法
     * @param file  文件对象
     * @returns {boolean}
     */
    handleBeforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    /**
     * 打开文章分类选择框
     */
    handleShowAcDialog() {
      this.getCategoryTree();
      this.acFormVisible = true;
    },
    /**
     *
     * @param value
     * @param data
     */
    handleFilterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      this.acFormVisible = false;
      if (this.addFormVisible) {
        // 新增表单
        this.addForm.acId = data.id;
        this.addForm.name = data.name;
      } else if (this.editFormVisible) {
        // 编辑表单
        this.editForm.acId = data.id;
        this.editForm.name = data.name;
      } else {
        // 查询过滤表单
        this.filterForm.acId = data.id;
        this.filterForm.name = data.name;
      }
    },
    rowstyle(row, rowIndex) {
      return "height:30px";
    }
  },
  watch: {
    acFilterText(val) {
      this.$refs.acTree.filter(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.madp-article-filter-input {
  padding: 5px;
  border: 1px solid #dcdfe6;
  font-size: 12px;
  color: #909399;
  border-radius: 3px;
  span {
    padding: 0 25px 0 10px;
  }
}
.madp-article-filter-input:hover {
  border: 1px solid #c0c4cc;
  cursor: pointer;
}
.madp-article-upload-icon {
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.detailJump {
  color: #409eff;
  text-decoration: none;
  list-style-type: none;
}
</style>
