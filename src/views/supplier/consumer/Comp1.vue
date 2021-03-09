<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="150px">


      <el-form-item label="员工姓名:" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="员工编号:" prop="userNo">
        <el-input v-model="form.userNo" disabled placeholder="请输入员工编号"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop="role">
        <el-select v-model="form.role" placeholder="请选择角色">
          <el-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工状态:" prop="userState">
        <el-select v-model="form.userState" placeholder="请选择员工状态">
          <el-option
            key="0"
            label="在职"
            value="0">
          </el-option>
          <el-option
            key="1"
            label="离职"
            value="1">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>

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
        title: '新增供应商',
        id: '',
        form: {
          userName: '',
          phone: '',
          role: '',
          password: '',
          userState: '',
          remark: ''
        },
        rules: {
          userName: [
            {
              required: true,
              max: 32,
              message: "请输入员工姓名"
            }
          ],
          userNo: [
            {
              required: true,
              max: 32,
              message: "请输入员工编号"
            }
          ],
          phone: [
            {
              required: true,
              pattern: /^((\d{7,8})|(0\d{2,3}-\d{7,8})|(1[3|6|4|5|7|8|9]\d{9}))$/,
              message: "请输入手机号码"
            }
          ],
          password: [
            {
              required: true,
              max: 32,
              message: "请输入密码"
            }
          ],
          role: [
            {
              required: true,
              message: "请选择角色"
            }
          ],
          userState: [
            {
              required: true,
              message: "请选择员工状态"
            }
          ],
          remark: [
            {
              max: 200,
              message: "请输入备注，最大值为200"
            }
          ]
        },
        roleOptions: [{
          id: 'id',
          label: '平台管理员'
        }]
      }
    },
    methods: {
      // 打开弹窗
      openWin(row) {
        if (row) {
          this.id = row.id;
          this.title = '修改'
        } else {
          this.id = '';
          this.title = '新增'
        }
        this.dialogVisible = true;
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
