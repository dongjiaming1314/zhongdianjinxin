<template>
  <el-dialog
    title="配置详情"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-form ref="viewForm" :model="viewForm" :rules="rules" label-width="100px">
      <el-form-item label="变更类型:" prop="changeType">{{ viewForm.changeType }}
<!--        <el-select v-model="viewForm.changeType" placeholder="请选择变更类型" style="width: 80%">-->
<!--          <el-option key="1" value="1" label="等级提升"></el-option>-->
<!--          <el-option key="2" value="2" label="等级下降"></el-option>-->
<!--        </el-select>-->
      </el-form-item>
      <el-form-item label="标题:" prop="changeType">{{ viewForm.title }}</el-form-item>
      <el-form-item label="提醒话术:" prop="remark">{{ viewForm.reminderWords }}</el-form-item>
      <el-form-item label="跳转链接:" prop="changeType">{{ viewForm.jumpLink }}</el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-switch v-model="viewForm.changeStatus" active-color="#13ce66" inactive-color="#ff4949" disabled></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        dialogVisible: false,
        id: '',
        viewForm: {
          changeType: '',
          title: '',
          remark: '',
          url: '',
          status: false
        }
      }
    },
    methods: {
      // 打开窗口
      openWin(row) {
        this.dialogVisible = true
        this.viewForm.changeType = row.changeType;
        this.viewForm.title = row.title;
        this.viewForm.reminderWords = row.reminderWords;
        this.viewForm.jumpLink = row.jumpLink;
        this.viewForm.changeStatus = row.changeStatus === '1';
      },
      // 取消
      handleClose() {
        // this.$refs['viewForm'].resetFields();
        this.dialogVisible = false
      },
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .el-form-item__content {
    color: #606266
  }
</style>
