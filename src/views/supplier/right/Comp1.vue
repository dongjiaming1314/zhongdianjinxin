<template>
  <el-dialog
    :title="id?'供应商权益修改':'供应商权益新增'"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="150px">
      <el-form-item label="权益名称:" prop="inquireName">
        <el-input v-model="form.inquireName" placeholder="请输入权益名称"></el-input>
      </el-form-item>
      <el-form-item label="权益信息类型:" prop="inquireName">
        <el-select v-model="form.inquireName" placeholder="请选择权益信息类型"></el-select>
      </el-form-item>
      <el-form-item label="收费类型:" prop="inquireName">
        <el-select v-model="form.inquireName" placeholder="请选择收费类型"></el-select>
      </el-form-item>
      <el-form-item label="单价:" prop="inquireName">
        <el-input v-model="form.inquireName" placeholder="请输入单价"></el-input>
      </el-form-item>
      <el-form-item label="核销方式:" prop="checkList">
        <el-checkbox-group v-model="checkList" style="height: 80px">
          <el-checkbox value="0" label="发放/领用核销"></el-checkbox>
          <el-checkbox value="1" label="使用核销"></el-checkbox>
          <el-checkbox value="2" label="过期核销"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="权益使用有效期始:" prop="startDate">
        <el-date-picker
          v-model="form.startDate"
          type="date"
          placeholder="开始日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="权益使用有效期止:" prop="endDate">
        <el-date-picker
          v-model="form.endDate"
          type="date"
          placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="库存:" prop="inquireName">
        <el-input v-model="form.inquireName" placeholder="请输入库存"></el-input>
      </el-form-item>
      <el-form-item label="说明:" prop="inquireName">
        <el-input v-model="form.inquireName" placeholder="请输入说明"></el-input>
      </el-form-item>
      <el-form-item label="介绍资料:" prop="inquireName">
        <Upload ref="ref_upload"></Upload>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" size="small" type="primary" @click="handleOn">提 交</el-button>
      <el-button size="small" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Upload from "../components/Upload";

  export default {
    name: "Comp1",
    components: {Upload},
    data() {
      return {
        dialogVisible: false,
        loading: false,
        id: '',
        checkList: [],
        form: {
          inquireName: '',
          logo: '',
          contactPerson: '',
          phone: '',
          trademark: '',
          startDate: '',
          endDate: ''
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

  .el-date-editor {
    width: 100%;
  }
</style>
