<template>
  <common-dialog
    :title="ifAdd === 1 ? '用户新增' : '用户修改'"
    :visible.sync="addFormVisible"
    v-if="addFormVisible"
    :size="'large'"
  >
    <el-form
      :rules="rules"
      :model="userForm"
      ref="userForm"
      label-width="110px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名：" prop="userName">
            <el-input
              v-model="userForm.userName"
              placeholder="请输入姓名"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登录账号：" prop="loginName">
            <el-input
              v-model="userForm.loginName"
              placeholder="请输入登录账号"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码：" prop="phoneNumber">
            <el-input
              v-model="userForm.phoneNumber"
              placeholder="请输入手机号码"
              size="small"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属供应商：" prop="supplierId">
            <el-select
              clearable
              v-model="userForm.supplierId"
              size="small"
              placeholder="请选择所属供应商"
            >
              <el-option label="11" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="登录密码：" prop="password">
            <el-input
              clearable
              size="small"
              v-model="userForm.password"
              placeholder="请输入登录密码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注：" prop="remark">
            <el-input
              clearable
              size="small"
              v-model="userForm.remark"
              placeholder="请输入"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button size="small" @click="cancelAdd">取消</el-button>
      <el-button size="small" type="primary" :loading="submitBtnLoading" @click="onSubmit">提交</el-button>
    </div>
  </common-dialog>
</template>
<script>
import Dialog from "@/components/Dialog";
import { validatePhoneNum } from "@/util/validateRules";
export default {
  components: { CommonDialog: Dialog },
  props: ["showDialog", "ifAdd", "editForm"],
  data() {
    return {
      addFormVisible: this.showDialog,
      submitBtnLoading: false,
      userForm: {},
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        userNo: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        phoneNum: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: validatePhoneNum,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        supId: [
          { required: true, message: "请选择所属供应商", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    showDialog(val, oldVal) {
      if (val == oldVal) return;
      this.addFormVisible = val;
    },
    addFormVisible(val, oldVal) {
      if (val == oldVal) return;
      this.$emit("update:showDialog", val);
    },
    editForm: {
      handler(val, oldVal) {
        if (val == oldVal || this.ifAdd == 1) return
        this.userForm = val
      },
      immediate: true
    }
  },
  methods: {
    // 新增
    onSubmit() {
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          this.submitBtnLoading = true
          if (this.ifAdd === 1) {
            addObj(this.userForm).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: "新增成功"
                });
                this.submitBtnLoading = false
                this.addFormVisible = false;
              }
            }).catch(err => {
              this.submitBtnLoading = false
            });
          } else if (this.ifAdd === 2) {
            this.userForm.id = this.editId;
            editObj(this.userForm).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.submitBtnLoading = false
                this.addFormVisible = false;
              }
            }).catch(err => {
              this.submitBtnLoading = false
            });
          }
        } else {
          return false;
        }
      });
    },
    cancelAdd() {
      this.showDialog = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.el-row {
  .el-col-12 {
    &:first-child {
      margin-left: -20px;
      margin-right: 20px;
    }
  }
}
</style>
