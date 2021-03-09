<template>
  <el-dialog
    title="供应商品牌详情"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="品牌logo：">
            <div class="demo-image__preview">
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item class="f4f4f5" label="品牌名称：">{{ form.inquireName }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="f4f4f5" label="品牌联系人：">{{ form.contactPerson }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人电话:">{{ form.phone }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商标注册证：">{{ form.trademark }}</el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item class="f4f4f5" label="工商营业照注册号:">{{ form.registrationNumber }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="f4f4f5" label="创建人:">{{ form.creator }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="f4f4f5" label="创建时间:">{{ form.createTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="f4f4f5" label="修改人:">{{ form.editor }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="f4f4f5" label="修改时间:">{{ form.editTime }}</el-form-item>
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
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
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
  .f4f4f5 {
    background-color: #f4f4f5;
  }
  .el-form-item {
    margin-bottom: 0;
  }
</style>
