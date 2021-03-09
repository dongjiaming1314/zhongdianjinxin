<template>
  <el-dialog
    title="订单回执"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="物流单号:" prop="inquireName">
            <el-input v-model="form.inquireName" placeholder="请输入物流单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="物流公司名称:" prop="inquireName">
            <el-input v-model="form.inquireName" placeholder="请输入物流公司名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" size="small" type="primary" @click="handleOn">提 交</el-button>
      <el-button size="small" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>

  export default {
    name: "Comp1",
    data() {
      return {
        dialogVisible: false,
        loading: false,
        id: '',
        form: {
          inquireName: '',
          logo: ''
        },
        rules: {
          inquireName: [
            {
              required: true,
              max: 100,
              message: "请输入品牌名称"
            }
          ],
          logo: [{
            required: true,
            message: "请上传品牌logo"
          }],
          contactPerson: [
            {
              required: true,
              max: 50,
              message: "请输入品牌联系人"
            }
          ],
          phone: [
            {
              required: true,
              pattern: /^((\d{7,8})|(0\d{2,3}-\d{7,8})|(1[3|6|4|5|7|8|9]\d{9}))$/,
              message: "请输入联系人电话"
            }
          ],
          trademark: [
            {
              required: true,
              message: "请输入商标注册证"
            }
          ],
          registrationNumber: [
            {
              required: true,
              message: "请输入工商营业照注册号"
            }
          ]
        }
      }
    },
    methods: {
      // 打开弹窗
      openWin(row) {
        this.dialogVisible = true;
        this.id = row.id
      },
      // 确定
      handleOn() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$refs['form'].resetFields();
            this.dialogVisible = false;
            this.$emit('getList')
          }
        });
      },
      // 关闭弹窗
      handleClose() {
        this.$refs['form'].resetFields();
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-form-item > .el-form-item__content {
    .el-input {
      min-width: 205px;
    }

    .el-select {
      width: 100%;
      min-width: 205px;
    }

    .el-date-editor {
      width: 100%;
      min-width: 205px;
    }
  }
</style>
