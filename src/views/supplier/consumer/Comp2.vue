<template>
  <el-dialog
    title="供应商详情"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="员工姓名：">{{ form.userName }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="员工号：">{{ form.userNo }}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="手机号码：">{{ form.phone }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色:">{{ form.role }}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="员工状态：">{{ form.userState }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上次登陆时间:">{{ form.userName }}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="创建人：">{{ form.userName }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间：">{{ form.userName }}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="修改人：">{{ form.userName }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改时间：">{{ form.userName }}</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="备注：">{{ form.remark }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "Comp2",
    data() {
      return {
        dialogVisible: false,
        form: {}
      }
    },
    methods: {
      openWin(row) {
        this.form = row;
        this.dialogVisible = true;
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
  .el-row:nth-child(2n+1) .el-form-item {
    background: #f4f4f5;
    /*border-radius: 4px;*/
  }
  .el-form-item {
    margin-bottom: 0;
  }

</style>
