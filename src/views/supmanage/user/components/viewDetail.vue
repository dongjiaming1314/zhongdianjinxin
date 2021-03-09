<template>
  <common-dialog
    :visible.sync="formVisible"
    v-if="formVisible"
    :size="'large'"
    :title="userForm.userName"
  >
    <div class="wrap">
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="8">姓名：</el-col>
            <el-col :span="16">{{ userForm.userName }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8">登录账号：</el-col>
            <el-col :span="16">{{ userForm.loginName }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="8">手机号码：</el-col>
            <el-col :span="16">{{ userForm.phoneNumber }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8">所属供应商：</el-col>
            <el-col :span="16">{{ userForm.supplierId }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="8">登录密码：</el-col>
            <el-col :span="16">{{ userForm.password }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="8">备注：</el-col>
            <el-col :span="16">{{ userForm.remark }}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" align="center">
      <el-button size="small" @click="close">关闭</el-button>
      <!-- <el-button size="small" type="primary" @click="clickEdit">编辑</el-button> -->
    </div>
  </common-dialog>
</template>

<script>
import Dialog from "@/components/Dialog";

export default {
  components: { commonDialog: Dialog },
  props: {
    view: {
      type: Boolean,
      required: true
    },
    userForm: {
      type: Object
    }
  },
  data() {
    return {
      formVisible: this.view
    };
  },
  watch: {
    view(val, oldVal) {
      console.log(val, oldVal);
      if (val === oldVal) return;
      this.formVisible = val;
    },
    formVisible(val, oldVal) {
      if (val === oldVal) return;
      this.$emit("update:view", false);
    }
  },
  mounted() {
    console.log(this.view);
  },
  methods: {
    close() {
      this.formVisible = false;
    },
    clickEdit() {
      this.$emit("edit", this.supplierForm);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  overflow: hidden;
  > .el-row {
    &:nth-child(2n+1) {
      .el-col {
        background: #f5f5f5;
      }
    }
    > .el-col {
      &:nth-child(2n + 1) {
        border-right: 5px solid #fff;
        // margin-right: 10px;
        // margin-left: -10px;
      }
      &:nth-child(2n) {
        border-left: 5px solid #fff;
      }
      .el-row {
        .el-col {
          min-height: 40px;
          padding: 10px 0;
          line-height: 20px;
          margin-bottom: 0;
          &:first-child {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
