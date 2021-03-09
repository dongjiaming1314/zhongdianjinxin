<template>
  <el-dialog
    :title="id?'修改供应商品牌':'新增供应商品牌'"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="150px">
      <el-form-item label="品牌名称:" prop="inquireName">
        <el-input v-model="form.inquireName" placeholder="请输入品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌logo:" prop="logo">
        <Upload ref="ref_upload"></Upload>
      </el-form-item>
      <el-form-item label="品牌联系人:" prop="contactPerson">
        <el-input v-model="form.contactPerson" placeholder="请输入品牌联系人名称"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话:" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系人电话"></el-input>
      </el-form-item>
      <el-form-item label="商标注册证:" prop="trademark">
        <el-input v-model="form.trademark" placeholder="请输入商标注册证"></el-input>
      </el-form-item>
      <el-form-item label="工商营业照注册号:" prop="registrationNumber">
        <el-input v-model="form.registrationNumber" placeholder="请输入工商营业照注册号"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" size="small" type="primary" @click="handleOn">提 交</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="handleOn">保 存</el-button>
      <el-button size="small" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Upload from "../../components/Upload";
  export default {
    name: "Comp1",
    components: {Upload},
    data() {
      return {
        dialogVisible: false,
        loading: false,
        id: '',
        form: {
          inquireName: '',
          logo: '',
          contactPerson: '',
          phone: '',
          trademark: '',
          registrationNumber: ''
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
        if (row) {
          this.id = row.id
        } else {
          this.id = ''
        }
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

  /deep/ .el-form-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
    width: 48%;
    min-width: 350px;
  }

  /deep/ .el-form-item__content {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 150px);
  }

  .el-input {
    width: 100%;
  }

  .el-select {
    width: 100%;
  }
</style>
