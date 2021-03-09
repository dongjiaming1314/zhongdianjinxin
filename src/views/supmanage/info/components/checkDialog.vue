<template>
  <common-dialog
    :visible.sync="formVisible"
    v-if="formVisible"
    :size="'large'"
    :title="supplierForm.supplierName"
  >
    <info
      :detailOption="detailOption"
      :labelWidth="35"
    ></info>
    <el-form
      :model="checkForm"
      label-width="140px"
      ref="checkForm"
      :rules="rules"
      label-position="right"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="审核结果："
            prop="checkStatus"
          >
            <el-radio-group v-model="checkForm.checkStatus">
              <el-radio label="7">审核通过</el-radio>
              <el-radio label="5">审核不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="审核原因："
            prop="checkMark"
          >
            <el-input
              type='textarea'
              v-model="checkForm.checkMark"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div
      slot="footer"
      align="right"
    >
      <el-button
        size="small"
        type="primary"
        @click="submit"
      >确定</el-button>
      <el-button
        size="small"
        @click="close"
      >关闭</el-button>
    </div>
  </common-dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import info from "@/components/info";
import { checkHandle, fetchList } from "@/api/supmanage/check";
import { remoteDic } from "@/api/admin/dict";
export default {
  components: { commonDialog: Dialog, info },
  props: ["view", "supplierForm"],
  data() {
    return {
      formVisible: this.view,
      checkForm: {
        checkStatus: "",
        checkMark: "",
      },
      detailOption: [
        { label: "供应商名称", value: this.supplierForm.supplierName },
        { label: "供应商公司名称", value: this.supplierForm.companyName },
        { label: "税务代码", value: this.supplierForm.taxCode },
        { label: "纳税人登记号", value: this.supplierForm.taxpayerCode },
        { label: "法人代表", value: this.supplierForm.legalPerson },
        { label: "性别", value: "" },
        { label: "证件类型", value: "" },
        { label: "证件号码", value: this.supplierForm.idNumber },
        { label: "手机号码", value: this.supplierForm.telphone },
        { label: "开户行", value: this.supplierForm.openingBank },
        { label: "结算账号", value: this.supplierForm.closeAccount },
        { label: "电子邮箱", value: this.supplierForm.email },
        { label: "商户号", value: this.supplierForm.businessCode },
        { label: "省", value: this.supplierForm.privince },
        { label: "市", value: this.supplierForm.city },
        { label: "区/县", value: this.supplierForm.county },
        { label: "详细地址", value: this.supplierForm.address },
        { label: "供应商类型", value: "" },
        { label: "申请原因", value: this.supplierForm.applyReason },
      ],
    };
  },
  computed: {
    rules() {
      if (this.checkForm.checkStatus === "5") {
        return {
          checkStatus: [
            {
              required: true,
              message: "请选择审核结果",
              trigger: "change",
            },
          ],
          checkMark: [
            {
              min: 0,
              max: 3000,
            },
            {
              required: true,
              message: "请输入审核原因",
              trigger: "change",
            },
          ],
        };
      } else {
        return {
          checkStatus: [
            {
              required: true,
              message: "请选择审核结果",
              trigger: "change",
            },
          ],
          checkMark: [
            {
              min: 0,
              max: 3000,
            },
            {
              message: "请输入审核原因",
              trigger: "change",
            },
          ],
        };
      }
    },
  },
  mounted() {
    this.fillInfo();
  },
  watch: {
    view(val, oldVal) {
      if (val === oldVal) return;
      this.formVisible = val;
    },
    formVisible(val, oldVal) {
      if (val === oldVal) return;
      this.$emit("update:view", false);
    },
  },
  methods: {
    async fillInfo() {
      let response = await remoteDic("gender,id_type");
      let genders = response.data.data.gender;
      let idTypes = response.data.data.id_type;
      this.detailOption.map((item) => {
        if (item.label == "性别") {
          genders.map((ite) => {
            if (ite.value == this.supplierForm.sex) {
              item.value = ite.label;
            }
          });
        }
        if (item.label == "证件类型") {
          idTypes.map((ite) => {
            if (ite.value == this.supplierForm.idType) {
              item.value = ite.label;
            }
          });
        }
        if (item.label === "供应商类型") {
          const supplierTypes = this.supplierForm.supplierType.split("#");
          if (supplierTypes.length > 1)
            return (item.value = supplierTypes[0] + "," + supplierTypes[1]);
          if (supplierTypes.length === 1)
            return (item.value = supplierTypes[0]);
        }
      });
    },
    close() {
      this.formVisible = false;
      this.checkForm = {};
    },
    submit() {
      console.log(1, this.checkForm);
      this.$refs.checkForm.validate((valid) => {
        if (valid) {
          checkHandle(
            Object.assign(this.checkForm, {
              checkType: this.supplierForm.checkType,
              auditingId: this.supplierForm.businessAuditId,
            })
          ).then((res) => {
            this.$message.success("操作成功！");
            this.close();
            this.$emit("refreshHandle");
          });
        } else {
          this.$message.error("操作失败！");
          return;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  overflow: hidden;
  > .el-col {
    &:nth-child(2n + 1) {
      margin-left: -10px;
      margin-right: 10px;
      padding-left: 10px;
    }
    &:nth-child(4n + 1),
    &:nth-child(4n + 2) {
      background: #f5f5f5;
    }
    .el-row {
      .el-col {
        height: 40px;
        line-height: 40px;
        margin-bottom: 0;
        &:first-child {
          text-align: right;
        }
      }
    }
  }
}
</style>
