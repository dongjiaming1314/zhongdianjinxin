<template>
  <el-dialog
    title="商品详情"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="商品名称：">{{ form.inquireName }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品ID：">{{ form.contactPerson }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否为热门商品:">{{ form.phone }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否秒杀：">{{ form.trademark }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品单价(金额):">{{ form.creator }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品单价(积分):">{{ form.createTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品库存:">{{ form.registrationNumber }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务费:">{{ form.editor }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预警值:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品渠道:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属供货商:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品标签:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品类型:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品展示排序:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="展示主图：">
            <div class="demo-image__preview">
              <el-image
                style="width: 60px; height: 60px"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="展示详情图：">
            <div class="demo-image__preview">
              <el-image
                style="width: 60px; height: 60px"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="展示轮播图：">
            <div class="demo-image__preview">
              <el-image
                style="width: 60px; height: 60px"
                :src="url"
                :preview-src-list="srcList">
              </el-image>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品说明:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建人:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改人:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改时间:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核人:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核时间:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核状态:">{{ form.editTime }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注:">{{ form.editTime }}</el-form-item>
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
        form: {
          result: '0',
          remark: ''
        }
      }
    },
    methods: {
      openWin(row) {
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
        this.$refs['form'].resetFields();
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>

</style>
