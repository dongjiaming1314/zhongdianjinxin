<template>
  <common-dialog :visible.sync="dialogShow" :title="stopOrUse == 0 ? '停用' : '启用'">
    <p class="title">已选供应商</p>
    <el-table :data="selectList" border style="width: 100%">
      <el-table-column prop="supplierName" label="供应商名称" width="180"></el-table-column>
      <el-table-column prop="supplierStatus" label="状态">
        <template slot-scope="scope">
          {{ scope.row.supplierStatus | transStatus }}
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间"></el-table-column>
      <el-table-column prop="legalPerson" label="法人代表"></el-table-column>
      <el-table-column prop="telphone" label="手机号码"></el-table-column>
    </el-table>
    <el-form :rules="rules" ref="submitForm" :model="submitForm">
      <el-form-item prop="applyReason" :label="stopOrUse == 0 ? '停用原因' : '启用原因'">
        <el-input :autosize="{ minRows: 5 }" type="textarea" v-model="submitForm.applyReason"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" size="small" @click="cancelDialog">取消</el-button>
      <el-button type="primary" size="small" :loading="submitBtnLoading" @click="submitReason">提交</el-button>
    </div>
  </common-dialog>
</template>
<script>
import Dialog from "@/components/Dialog";
import { statusMap } from "@/const/crud/supmanage/info";
import { editObj } from "@/api/supmanage/info";

export default {
  components: { commonDialog: Dialog },
  props: ["selectList", "supplierStatusDialog", "stopOrUse"],
  data() {
    return {
      submitForm: {},
      submitBtnLoading: false,
      dialogShow: true,
      rules: {
        applyReason: [
          { required: true, message: this.stopOrUse=='0' ? '请填写停用原因' : '请填写启用原因', trigger: "blur" }
        ]
      }
    };
  },
  filters: {
    transStatus: function(data) {
      let res;
      statusMap.forEach((item, index) => {
        if (item.value == data) {
          res = item.label;
        }
      });
      return res;
    }
  },
  watch: {
    supplierStatusDialog(val, oldVal) {
      if (val == oldVal) return;
      this.dialogShow = val;
    },
    dialogShow(val, oldVal) {
      if (val == oldVal) return;
      this.$emit("update:supplierStatusDialog", false);
    }
  },
  methods: {
    // 取消停用
    cancelDialog() {
      this.supplierStatusDialog = false;
      this.submitForm.applyReason = ""
    },
    submitReason() {
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          // 停用
          if (this.stopOrUse === 0) {
            editObj(
              Object.assign(
                {
                  supplierNumber: this.selectList[0].supplierNumber,
                  supplierStatus: "1",
                  checkType: "6"
                },
                this.submitForm
              )
            ).then(res => {
              this.$message.success("操作成功，请审核！");
              this.cancelDialog()
            });
          } else if (this.stopOrUse === 1) {
            //启用
            editObj(
              Object.assign(
                {
                  supplierNumber: this.selectList[0].supplierNumber,
                  supplierStatus: "0",
                  checkType: "5"
                },
                this.submitForm
              )
            ).then(res => {
              this.$message.success("操作成功，请审核！");
              this.cancelDialog()
            });
          }
        }
      });
    }
    // 批量操作提交启用停用原因
    // submitReason() {
    //   this.$refs.submitForm.validate(valid => {
    //     if (valid) {
    //       let ids;
    //       // 停用
    //       if (this.stopOrUse === 0) {
    //         ids = this.selectList.map(row => {
    //           return {
    //             id: row.id,
    //             applyReason: this.submitForm[0].applyReason,
    //             flag: "close"
    //           };
    //         });
    //         console.log(ids)
    //         effectSup(ids).then(res => {
    //           if (res.data.code === 0) {
    //             this.$message({
    //               type: "success",
    //               message: "停用成功"
    //             });
    //             this.supplierStatusDialog = false;
    //             this.submitForm.applyReason = "";
    //             this.getList(this.page);
    //           }
    //         });
    //       } else if (this.stopOrUse === 1) {
    //         //启用
    //         ids = this.selectList.map(row => {
    //           return {
    //             id: row.id,
    //             applyReason: this.submitForm.applyReason,
    //             flag: "effect"
    //           };
    //         });
    //         effectSup(ids).then(res => {
    //           if (res.data.code === 0) {
    //             this.$message({
    //               type: "success",
    //               message: "启用成功"
    //             });
    //             this.supplierStatusDialog = false;
    //             this.submitForm.applyReason = "";
    //             this.getList(this.page);
    //           }
    //         });
    //       }
    //     }
    //   });
    // }
  }
};
</script>
<style scoped>
.title {
  line-height: 40px;
}
</style>
