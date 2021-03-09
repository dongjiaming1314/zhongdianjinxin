<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <!-- <el-form  :inline="true" ref="formSearch" :model="formSearch" label-width="100px"> -->
      <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="目录名称：">
              <el-input v-model="formSearch.cataName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" size="small" @click="searchFn">查询</el-button>
              <el-button type="primary" size="small" @click="resetFn">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->

      <!-- </el-form> -->
      <div class="filter-container">
        <el-button-group>
          <el-button
            type="primary"
            v-if="menuManager_btn_add"
            @click="handlerAdd"
          >添加
          </el-button>
          <el-button
            type="primary"
            v-if="menuManager_btn_edit"
            @click="handlerEdit"
          >编辑
          </el-button>
          <el-button
            type="primary"
            v-if="menuManager_btn_del"
            @click="handleDelete"
          >删除
          </el-button>
        </el-button-group>
      </div>

      <el-row>
        <el-col
          :span="8"
          style="margin-top: 15px"
        >
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
          >
          </el-tree>
        </el-col>
        <el-col
          :span="16"
          style="margin-top: 15px"
        >
          <el-card class="box-card">
            <el-form
              :label-position="labelPosition"
              label-width="95px"
              :model="form"
              :rules="rules"
              ref="form"
            >
              <el-form-item
                label="目录名称："
                prop="cataName"
              >
                <el-input
                  v-model="form.cataName"
                  :disabled="formEdit"
                  placeholder="请输入目录名称"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="目录级别："
                prop="cataLevel"
              >
                <el-select
                  class="filter-item"
                  v-model="form.cataLevel"
                  :disabled="changeLevel"
                  @change="chooseLevel"
                  placeholder="请选择目录级别"
                >
                  <el-option
                    label="一级"
                    value="1"
                  ></el-option>
                  <el-option
                    label="二级"
                    value="2"
                  ></el-option>
                  <el-option
                    label="三级"
                    value="3"
                  ></el-option>
                  <el-option
                    label="四级"
                    value="4"
                  ></el-option>
                  <el-option
                    label="五级"
                    value="5"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="上级目录："
                prop="parentCataId"
                v-show="form.parentCataId !== '0'"
              >
                <el-select
                  class="filter-item"
                  v-model="form.parentCataId"
                  :disabled="parentLevel"
                  placeholder="请选择上级目录"
                >
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.id"
                    :label="item.cataName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="formStatus === 'update'">
                <el-button
                  type="primary"
                  size="small"
                  @click="update"
                >更新
                </el-button>
                <el-button
                  size="small"
                  @click="onCancel"
                >取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus === 'create'">
                <el-button
                  type="primary"
                  size="small"
                  @click="create"
                >保存
                </el-button>
                <el-button
                  size="small"
                  @click="onCancel"
                >取消</el-button>
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
  delObj,
  getAllList,
  getObj,
  getParent,
  addObj,
  putObj,
  fetchNextList,
} from "@/api/equity/catalogue";
import { mapGetters } from "vuex";
import { deepClone } from "@/util/tag";
export default {
  name: "equityCatalogue",
  data() {
    return {
      formEdit: true, //名称是否可以编辑
      changeLevel: true, //目录是否可以编辑
      parentLevel: true, //父级目录是否可以修改
      formAdd: true,
      formStatus: "", //当前的状态
      typeOptions: [],
      treeData: [],
      levelOneList: [], //第一件
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
        label: "cataName",
      },
      labelPosition: "right",
      form: {
        cataLevel: undefined,
        cataName: undefined,
        parentName: undefined,
      },
      formSearch: {
        cataName: "",
      },
      currentId: -1,
      menuManager_btn_add: false,
      menuManager_btn_edit: false,
      menuManager_btn_del: false,
      rules: {
        cataName: [
          {
            min: 0,
            max: 100,
            message: "名称需控制到100个字符内",
            trigger: "change",
          },
          {
            required: true,
            message: "请输入目录名称",
            trigger: "change",
          },
        ],
        cataLevel: [
          {
            required: true,
            message: "请选择目录级别",
            trigger: "change",
          },
        ],
        // type: [{required: true, message: '标题不合法', trigger: 'change'}],
      },
    };
  },
  created() {
    this.getList();
    this.menuManager_btn_add = this.permissions["equity_catalogue_add"];
    this.menuManager_btn_edit = this.permissions["equity_catalogue_edit"];
    this.menuManager_btn_del = this.permissions["equity_catalogue_del"];
  },
  computed: {
    ...mapGetters(["elements", "permissions"]),
  },
  methods: {
    // 查询
    searchFn() {
      // 前台查询
      // this.treeData=[{
      //   cataName: '韩飞',
      //   cataLevel: 1,
      //   children: [{
      //     cataLevel: 2,
      //     cataName:'zhege',
      //     children:[
      //       {
      //         cataName: 'toy',
      //         cataLevel: 4,
      //         children:[]

      //       }
      //     ]
      //   }]
      // }]
      let str = this.formSearch.cataName.trim();
      if (!str) return;
      let m = [];
      function searchOne(arr) {
        arr.forEach((item) => {
          if (item.children.length) {
            searchOne(item.children);
          }
          if (item.cataName.indexOf(str) != -1) m.push(item);
        });
      }
      searchOne(this.treeData);
      console.log(m);

      // 有个查询条件，有个终止条件
    },
    getList() {
      getAllList(1).then((response) => {
        this.treeData = response.data.data;
        response.data.data.forEach((item) => {
          this.levelOneList.push(item.cataName);
        });
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
    nodeCollapse(data) {
      this.oExpandedKey[data.id] = false;
      // 如果有子节点
      this.treeRecursion(this.oTreeNodeChildren[data.id], (oNode) => {
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
    getNodeData(data) {
      this.formEdit = true;
      this.changeLevel = true;
      getObj(data.id).then((response) => {
        this.form = response.data.data;
        if (this.form.cataLevel)
          this.form.cataLevel = this.form.cataLevel.toString();
        // 一级目录不需要调父级
        if (this.form.parentCataId === "0") return;
        getParent(this.form.cataLevel).then((res) => {
          this.typeOptions = res.data.data;
          this.parentLevel = true;
        });
      });
      this.currentId = data.id;
    },
    handlerEdit() {
      this.formEdit = false;
      this.changeLevel = true;
      this.formStatus = "update";
      if (this.form.parentCataId) {
        getParent(this.form.cataLevel).then((res) => {
          this.typeOptions = res.data.data;
          this.parentLevel = false;
        });
      }
    },
    handlerAdd() {
      this.formEdit = false;
      this.changeLevel = true;
      this.formStatus = "create";

      // 在原有目录基础上建下一级目录，可以获取新建目录级别和新建目录的上级目录即为原有目录
      if (this.currentId != -1) {
        getObj(this.currentId).then((response) => {
          this.form = response.data.data;
          if (this.form.cataLevel)
            this.form.cataLevel = (Number(this.form.cataLevel) + 1).toString();
          this.form.parentCataId = this.currentId;
          this.form.cataName = "";
          getParent(this.form.cataLevel).then((res) => {
            this.typeOptions = res.data.data;
            this.parentLevel = true;
          });
        });
      } else {
        this.parentLevel = true;
        this.form = {
          cataLevel: "1",
          cataName: "",
          parentCataId: "0",
        };
      }
    },
    handleDelete() {
      if (this.currentId == -1) {
        this.$message({
          message: "请选择要删除的目录",
          type: "warning",
        });
        return;
      }
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delObj(this.currentId)
          .then((res) => {
            this.$refs.form.resetFields();
            this.currentId = -1;
            this.getList();
            this.resetForm();
            this.onCancel();
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          })
          .catch(() => {
            this.currentId = -1;
          });
      });
    },
    // 更新
    update() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //  对级别深拷贝 deepClone
          let obj = deepClone(this.form);
          obj.cataLevel = Number(this.form.cataLevel);
          putObj(this.form).then((res) => {
            this.formEdit = true;
            this.formStatus = "";
            this.getList();
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          });
        }
      });
    },
    // 新增
    create() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //  对级别深拷贝 deepClone
          let obj = deepClone(this.form);
          obj.cataLevel = Number(this.form.cataLevel);
          // 清空原目录的id
          obj.id = "";
          let arr = [];
          fetchNextList({ parentCataId: obj.parentCataId }).then((res) => {
            let nextList = res.data.data;
            nextList.forEach((item) => {
              arr.push(item.cataName);
            });
            if (
              arr.indexOf(obj.cataName) > -1 ||
              this.levelOneList.indexOf(obj.cataName) > -1
            ) {
              this.$message.error("含有相同名称目录，请重新输入！");
            } else {
              addObj(obj).then((res) => {
                this.formEdit = true;
                this.formStatus = "";
                this.getList();
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
              });
            }
          });
        }
      });
    },
    onCancel() {
      this.formEdit = true;
      this.parentLevel = true;
      this.changeLevel = true;
      this.formStatus = "";
    },
    resetForm() {
      this.form = {
        cataName: undefined,
        parentCataId: undefined,
        cataLevel: undefined,
      };
    },
    chooseLevel(val) {
      if (Number(this.form.cataLevel) <= 1) return;
      getParent(this.form.cataLevel).then((res) => {
        this.typeOptions = res.data.data;
        this.parentLevel = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>

