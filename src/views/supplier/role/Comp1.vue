<template>
  <el-dialog
    :title="id?'修改供应商角色':'新增供应商角色'"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="150px">
      <el-form-item label="角色名称:" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="敏感状态控制:" prop="SensitiveControl">
        <el-select v-model="form.SensitiveControl" placeholder="请选择敏感状态控制">
          <el-option
            key="0"
            label="是"
            value="0">
          </el-option>
          <el-option
            key="1"
            label="否"
            value="1">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" :loading="loading" type="primary" @click="handleOn">提 交</el-button>
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
          roleName: '',
          SensitiveControl: '',
          remark: ''
        },
        rules: {
          roleName: [
            {
              required: true,
              max: 100,
              message: "请输入角色名称"
            }
          ],
          SensitiveControl: [
            {
              required: true,
              message: "请选择敏感状态控制"
            }
          ],
          remark: [
            {
              max: 200,
              message: "请输入备注，最大值为200"
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
