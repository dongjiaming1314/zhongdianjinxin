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
    <div
      slot="footer"
      align="right"
    >
      <el-button
        size="small"
        @click="close"
      >关闭</el-button>
      <!-- <el-button size="small" type="primary" @click="clickEdit">编辑</el-button> -->
    </div>
  </common-dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import info from "@/components/info";
import { remoteDic } from "@/api/admin/dict";

export default {
  components: { commonDialog: Dialog, info },
  props: ["view", "supplierForm"],
  data() {
    return {
      formVisible: this.view,
      gender: "",
      type: "",
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
      ],
    };
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
        if (item.label === "性别") {
          genders.map((ite) => {
            if (ite.value == this.supplierForm.sex) {
              item.value = ite.label;
            }
          });
        }
        if (item.label === "证件类型") {
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
    },
    clickEdit() {
      this.$emit("edit", this.supplierForm);
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
