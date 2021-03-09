<template>
  <el-dialog
    :title="id?'修改供应商商品':'新增供应商商品'"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="商品名称:" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入商品名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品库存:" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入商品库存"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属供应商:" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入所属供应商"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否参加秒杀活动:" prop="roleName">
            <el-select v-model="form.roleName" placeholder="请选择所属供应商">
              <el-option value="0" label="是"></el-option>
              <el-option value="1" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品单价(金额):" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入商品单价(金额)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品单价(积分):" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入商品单价(积分)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预警值:" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入预警值"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务费:" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入服务费"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图片类型:" prop="remark">
            <el-select v-model="form.roleName" placeholder="请选择图片类型">
              <el-option value="0" label="是"></el-option>
              <el-option value="1" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品类型:" prop="remark">
            <el-select v-model="form.roleName" placeholder="请选择商品类型">
              <el-option value="0" label="是"></el-option>
              <el-option value="1" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图片品牌:" prop="remark">
            <el-select v-model="form.roleName" placeholder="请选择商品品牌">
              <el-option value="0" label="是"></el-option>
              <el-option value="1" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品类别:" prop="remark">
            <el-select v-model="form.roleName" placeholder="请选择商品类别">
              <el-option value="0" label="是"></el-option>
              <el-option value="1" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品标签:" prop="remark">
            <el-select v-model="form.roleName" placeholder="请选择商品标签">
              <el-option value="0" label="是"></el-option>
              <el-option value="1" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品展示排序:" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入商品展示排序"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="展示轮播图:" prop="logo">
            <Upload ref="ref_upload1"></Upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="展示主图:" prop="logo">
            <Upload ref="ref_upload2"></Upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="展示详情图:" prop="logo">
            <Upload ref="ref_upload3"></Upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品说明:" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入商品说明"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" :loading="loading" type="primary" @click="handleOn">保 存</el-button>
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
              message: "请输入员工姓名"
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
  .el-form-item > .el-form-item__content {
    .el-input {
      min-width: 260px;
    }

    .el-select {
      width: 100%;
      min-width: 260px;
    }
  }
</style>
