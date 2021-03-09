<template>
  <el-dialog :title="id ? '修改配置' : '新增配置'" :visible.sync="dialogVisible" width="65%" :before-close="handleClose">
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="上升阈值:" prop="upAum">
            <el-input v-model="addForm.upAum" placeholder="请输入上升阈值" style="width: 80%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下降阈值:" prop="downAum">
            <el-input v-model="addForm.downAum" placeholder="请输入下降阈值" style="width: 80%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="上升标题:" prop="upTitle">
            <el-input v-model="addForm.upTitle" placeholder="请输入上升标题" style="width: 80%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下降标题:" prop="downTitle">
            <el-input v-model="addForm.downTitle" placeholder="请输入下降标题" style="width: 80%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="上升提醒话术:" prop="upWords">
            <el-input v-model="addForm.upWords" placeholder="请输入上升提醒话术" style="width: 80%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下降提醒话术:" prop="downWords">
            <el-input v-model="addForm.downWords" placeholder="请输入下降提醒话术" style="width: 80%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="上升跳转链接:" prop="upLink">
            <el-input v-model="addForm.upLink" placeholder="请输入上升跳转链接" style="width: 80%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下降跳转链接:" prop="downLink">
            <el-input v-model="addForm.downLink" placeholder="请输入下降跳转链接" style="width: 80%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="状态:" prop="changeStatus">
        <el-switch v-model="addForm.changeStatus" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" size="small" type="primary" @click="handleOn">提 交</el-button>
      <el-button size="small" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addInfo, editInfo } from "@/api/growthSystem/reminderSetting";
export default {
  name: "Add",
  data() {
    return {
      dialogVisible: false,
      id: "",
      addForm: {
        changeType: "",
        title: "",
        reminderWords: "",
        jumpLink: "",
        changeStatus: false
      }
    };
  },
  methods: {
    // 打开窗口
    openWin(row) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        if (row.id) {
          this.id = row.id;
          this.addForm.changeType = row.changeType;
          this.addForm.title = row.title;
          this.addForm.reminderWords = row.reminderWords;
          this.addForm.jumpLink = row.jumpLink;
          this.addForm.changeStatus = row.changeStatus === "1";
        }
      });
    },
    // 提交
    handleOn() {
      const subForm = this.addForm;
      subForm.changeStatus = subForm.changeStatus ? "1" : "0";
      if (this.id) {
        editInfo(Object.assign(subForm, { id: this.id }))
          .then(res => {
            this.$message.success(res.data.msg);
            this.$emit("getList");
            this.dialogVisible = false;
            this.$refs["addForm"].resetFields();
          })
          .catch(res => {
            this.$message.error(res);
          });
      } else {
        addInfo(subForm)
          .then(res => {
            this.$message.success(res.data.msg);
            this.$emit("getList");
            this.dialogVisible = false;
            this.$refs["addForm"].resetFields();
          })
          .catch(res => {
            this.$message.error(res);
          });
      }
    },
    // 取消
    handleClose() {
      this.$refs["addForm"].resetFields();
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
</style>
