<!--
  ~
  ~  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  ~
  -->

<template>
  <div class="madp-execution">
    <div v-show="isConfig">
      <el-button
        class="madp-add-config"
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="isConfig=false"
      >添加</el-button>
      <!-- 初始化表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background:'#FAFAFA',color:'#606266'}"
      >
        <el-table-column prop="identifi" label="标识" width="180"></el-table-column>
        <el-table-column prop="description" label="描述" width="180"></el-table-column>
        <el-table-column prop="dimension" label="维度"></el-table-column>
        <el-table-column prop="range" label="推送范围"></el-table-column>
        <el-table-column prop="persistence" label="持久化"></el-table-column>
        <el-table-column prop label="已上线" icon="el-icon-search" style="padding-top:100px;">
          <template slot-scope="scope">
            <span v-if="scope.row.online=='是'" class="madp-red-point"></span>
            <span v-else class="madp-green-point"></span>
            &nbsp;
            {{scope.row.online}}
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="	操作">
          <template slot-scope="scope">
            <div v-if="scope.row.isOnline">
              <el-button class="madp-clear-padding" type="text" @click="dialogFormVisible = true">
                <el-button
                  class="madp-clear-padding"
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                >操作</el-button>
              </el-button>
              <!-- 下线 -->
              <el-popover
                class="madp-popover"
                placement="left"
                width="120"
                v-model="scope.row.visible"
              >
                <p class="madp-popover-font-style">
                  <i class="el-icon-warning madp-popover-icon-style"></i> &nbsp;确定下线？
                </p>
                <div style="text-align: center; margin: 0;">
                  <el-button
                    class="madp-popover-cancel-style"
                    size="mini"
                    type="text"
                    @click="scope.row.visible = false"
                  >取消</el-button>
                  <el-button
                    class="madp-popover-determine-style"
                    type="primary"
                    size="mini"
                    @click="handleOnline(scope.row,visible,isOnline)"
                  >确定</el-button>
                </div>
                <el-button slot="reference" class="madp-dis-find">
                  <span class="madp-encryption-content-privateKey-message">下线</span>
                </el-button>
              </el-popover>
            </div>
            <!-- 上线 -->
            <div v-if="!scope.row.isOnline">
              <el-popover
                class="madp-popover"
                placement="left"
                width="120"
                v-model="scope.row.visible"
              >
                <p class="madp-popover-font-style">
                  <i class="el-icon-warning madp-popover-icon-style"></i> &nbsp;确定下线？
                </p>
                <div style="text-align: center; margin: 0;">
                  <el-button
                    class="madp-popover-cancel-style"
                    size="mini"
                    type="text"
                    @click="scope.row.visible = false"
                  >取消</el-button>
                  <el-button
                    class="madp-popover-determine-style"
                    type="primary"
                    size="mini"
                    @click="handleOutline(scope.row,visible,isOnline)"
                  >确定</el-button>
                </div>
                <el-button slot="reference" class="madp-dis-find">
                  <span class="madp-encryption-content-privateKey-message">上线</span>
                </el-button>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新建同步数据 -->
      <el-dialog title="新建同步" :visible.sync="dialogFormVisible">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          label-position="left"
          class="madp-demo-ruleForm"
        >
          <el-form-item label="用户ID：" prop="userId">
            <el-input class="madp-short-width" v-model="ruleForm.userId" size="small"></el-input>
          </el-form-item>
          <el-form-item label="数据内容：" prop="dataContent">
            <el-input
              class="madp-long-width"
              v-model="ruleForm.dataContent"
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 8}"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据唯一ID：" prop="onlyId">
            <el-input class="madp-short-width" v-model="ruleForm.onlyId" size="small"></el-input>
          </el-form-item>
          <el-form-item label="系统：" prop="type" :rules="{required:true}">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="Android" name="type"></el-checkbox>
              <el-checkbox label="iOS" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="版本区间：" prop="version">
            <el-input class="madp-small-width" v-model="ruleForm.startVersion" size="small"></el-input>&nbsp;&nbsp;
            <span>~</span>&nbsp;&nbsp;
            <el-input class="madp-small-width" v-model="ruleForm.endVersion" size="small"></el-input>
          </el-form-item>
          <el-form-item label="有效期：" prop="effictive">
            <el-input-number
              v-model="num"
              controls-position="right"
              :max="30"
              size="mini"
            >天</el-input-number>
          </el-form-item>
          <el-form-item style>
            <el-button class="madp-button-style" @click="resetForm('ruleForm')">取消</el-button>
            <el-button class="madp-button-style" type="primary" @click="submitForm('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 新建配置信息 -->
    <div v-show="!isConfig">
      <el-button
        class="madp-add-config"
        type="primary"
        icon="el-icon-arrow-left"
        size="mini"
        @click="isConfig=true"
      >返回</el-button>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="left"
        class="madp-demo-ruleForm"
      >
        <div class="basic-config">
          <div class="madp-basic-config-title">基础配置</div>
          <div class="madp-basic-config-distance">
            <div>
              <el-form-item
                class="madp-basic-config-sign"
                :rules="{required:true}"
                label="同步标识："
                prop="name"
                size="small"
              >
                <el-input class="madp-basic-config-sign-input" v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item
                class="madp-basic-config-range"
                label="推送范围："
                :rules="{required:true}"
                prop="resource"
              >
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="全局推送"></el-radio>
                  <el-radio class="madp-basic-config-range-aims" label="指定推送"></el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="推送说明：" :rules="{required:true}" prop="name" size="small">
                <el-input class="madp-basic-config-description" v-model="ruleForm.name"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="madp-basic-config">
          <div class="madp-basic-config-title">推送对象</div>
          <div class="madp-basic-config-distance">
            <el-form-item
              class="madp-basic-config-range"
              label="推送对象："
              :rules="{required:true}"
              prop="resource"
            >
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="用户"></el-radio>
                <el-radio class="madp-basic-config-range-aims" label="设备"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              class="madp-basic-config-range"
              label="多设备同步："
              :rules="{required:true}"
              prop="resource"
            >
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="是"></el-radio>
                <el-radio class="madp-basic-config-range-aims" label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="madp-basic-data">
          <div class="madp-basic-config-title">数据持久化</div>
          <div class="madp-basic-config-distance">
            <el-form-item
              class="madp-basic-config-range"
              label="多设备同步："
              :rules="{required:true}"
              prop="resource"
            >
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="是"></el-radio>
                <el-radio class="madp-basic-config-range-aims" label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              class="madp-basic-config-range"
              label="多设备同步："
              :rules="{required:true}"
              prop="resource"
            >
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="是"></el-radio>
                <el-radio class="madp-basic-config-range-aims" label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              class="madp-basic-config-range"
              label="重推阈值："
              :rules="{required:true}"
              prop="resource"
            >
              <el-input-number v-model="num" controls-position="right" :min="1" size="small"></el-input-number>
            </el-form-item>
          </div>
        </div>
        <div class="madp-basic-safe">
          <div class="madp-basic-config-title">安全控制</div>
          <div class="madp-basic-config-distance">
            <el-form-item
              class="madp-basic-config-range"
              label="用户一致性："
              :rules="{required:true}"
              prop="resource"
            >
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="是"></el-radio>
                <el-radio class="madp-basic-config-range-aims" label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="madp-basic-config-button">
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">确定</el-button>
          <el-button
            class="madp-basic-config-button-cancel"
            @click="resetForm('ruleForm')"
            size="mini"
          >取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      /**
       * @decription 表格数据
       */
      tableData: [
        {
          identifi: "DEVICE-LOCK_TEST	",
          description: "可以填写一些备注信息",
          dimension: "用户",
          range: "指定推送",
          persistence: "是",
          online: "是"
        },
        {
          identifi: "SYNC_DEVICE",
          description: "测试设备同步",
          dimension: "设备",
          range: "全局推送",
          persistence: "是",
          online: "是"
        },
        {
          identifi: "SYNC-DEVICE",
          description: "测试设备推送",
          dimension: "设备",
          range: "指定推送",
          persistence: "是",
          online: "否"
        },
        {
          identifi: "test",
          description: "test",
          dimension: "用户",
          range: "指定推送",
          persistence: "是",
          online: "否"
        }
      ],

      /**
       * @decription 新建同步信息弹出框
       * @param 判断是否出现新建同步信息的表单参数
       */
      dialogFormVisible: false,

      /**
       * @decription 新建同步信息数据表单
       */
      ruleForm: {
        userId: "",
        dataContent: "",
        onlyId: "",
        type: [],
        startVersion: "",
        endVersion: "",
        desc: ""
      },
      rules: {
        userId: [
          { required: true, message: "至少 6 个字符", trigger: "blur" },
          { min: 6, message: "至少 6 个字符", trigger: "blur" }
        ],
        dataContent: [
          { required: true, message: "至少 6 个字符", trigger: "blur" },
          { min: 6, message: "至少 6 个字符", trigger: "blur" }
        ],
        onlyId: [
          { required: true, message: "至少 6 个字符", trigger: "blur" },
          { min: 6, message: "至少 6 个字符", trigger: "blur" }
        ]
      },
      num: 30,

      /**
       * @decription 下线
       * @param visible 判断是否出现操作和下线按钮参数
       * @param isOnline 判断是否出现popover确认框参数
       */
      visible: false,
      isOnline: false,

      /**
       * @decription 新建配置信息
       * @param isConfig 判断是否出现新建配置信息的表单参数
       */
      isConfig: true
    };
  },

  methods: {
    /**
     * @decription 打印表格数据
     */
    handleClick(row) {
      // console.log(row);
    },

    /**
     * @decription 新建同步数据表单
     * @param submitForm 提交表单
     * @param resetForm 重置表单
     * 
     */
    submitForm(formName) {
      
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },

    /**
     * @param handleOnline 上线
     * @param handleOutline 下线
     * 
     */
    handleOnline(row, visible, isOnline) {
      row.visible = false;
      row.isOnline = false;
    },
    handleOutline(row, visible, isOnline) {
      row.visible = false;
      row.isOnline = true;
    },
  }
};
</script>

<style lang="scss">
.madp-execution {
  .madp-red-point {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background-color: #F04134;
  }

  .madp-green-point {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 5px;
    background-color: #00A854;
  }

  /**
   *  @decription 调整element-ui组件
   */
  .madp-demo-ruleForm {
    margin-left: 30px;
  }

  .madp-clear-padding {
    padding: 0;
  }

  .madp-short-width {
    width: 168px;
  }

  .madp-long-width {
    width: 450px;
  }

  .madp-small-width {
    width: 100px;
  }

  .madp-button-style {
    height: 32px;
    line-height: 8px;
  }

  .el-dialog {
    width: 50%;
  }

  .madp-offLine {
    & i {
      color: #ffbf00;
    }
  }

  .madp-add-config {
    font-size: 12px;
    margin-bottom: 20px;
  }

  /**
   * @description 查看弹出框
   */
  .madp-popover {
    &-icon-style {
      color: #ffbf31;
    }
    &-font-style {
      font-size: 12px;
      margin-bottom: 20px;
    }
    &-cancel-style {
      padding: 5px 10px;
      font-size: 12px;
      color: #595959;
      border-radius: 6px;
      border: 1px solid #d9d9d9;
      & span {
        font-size: 12px;
      }
    }
    &-cancel-style:hover {
      color: #239bf3;
      border: 1px solid #239bf3;
    }
    &-determine-style {
      padding: 5px 10px;
      font-size: 12px;
      border-radius: 6px;
      & span {
        font-size: 12px;
      }
    }
    & .madp-dis-find {
      border: 0;
      padding: 0;
      background-color: #f7f7f7;
    }
  }

  /**
   *  @decription 调整新建配置信息样式
   */
  .madp-basic-config {
    &-title {
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    &-distance {
      margin-left: 20px;
    }
    &-button {
      width: 35%;
      text-align: center;
      &-cancel {
        margin-left: 20px;
      }
    }
    &-sign {
      width: 33.3%;
      display: inline-block;
      &-input {
        width: 130px;
      }
    }
    &-range {
      width: 33.3%;
      display: inline-block;
      &-aims {
        margin-left: 10px;
      }
    }
    &-description {
      width: 530px;
    }
  }
}
</style>