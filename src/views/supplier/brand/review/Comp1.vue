<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="150px">
      <div v-if="val === '0'">
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item class="f4f4f5" label="品牌名称：">{{ form.inquireName }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="f4f4f5" label="品牌名称：">{{ form.contactPerson }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌状态:">{{ form.phone }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否审核：">{{ form.trademark }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="f4f4f5" label="申请人:">{{ form.creator }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="f4f4f5" label="申请时间:">{{ form.createTime }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请操作:">{{ form.registrationNumber }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核人:">{{ form.editor }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="f4f4f5" label="审核时间:">{{ form.editTime }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核备注:">{{ form.editTime }}</el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="审核结果:" prop="result">
              <el-radio v-model="form.result" label="0">通过</el-radio>
              <el-radio v-model="form.result" label="1">不通过</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核备注:" prop="remark">
              <el-input type="textarea" v-model="form.remark" placeholder="请输入审核备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

    </el-form>
    <span slot="footer" class="dialog-footer">
       <el-button v-if="val === '1'" :loading="loading" size="small" type="primary" @click="handleOn">确 定</el-button>
      <el-button size="small" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "Comp1",
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        val: '',
        dialogVisible: false,
        form: {
          result: '0',
          remark: ''
        }
      }
    },
    methods: {
      openWin(row, val) {
        this.val = val;
        this.title = val === '0' ? '查看详情' : '审核';
        this.form = row;
        this.dialogVisible = true;
      },
      // 确定
      handleOn() {
        this.$refs['form'].resetFields();
        this.dialogVisible = false;
      },
      // 关闭弹窗
      handleClose() {
        if (val === '1') {
          this.$refs['form'].resetFields();
        }
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>
  .f4f4f5 {
    background-color: #f4f4f5;
  }
  .el-form-item {
    margin-bottom: 0;
  }
</style>
