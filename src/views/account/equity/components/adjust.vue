<template>
  <div>
    <info
      :detailOption="detailOption"
      :labelWidth="35"
    ></info>
    <el-form
      class="form"
      ref="form"
      :model="form"
      label-width="35%"
      :rules="rules"
    >
      <el-col :span="12">
        <el-form-item
          label="调整类型："
          prop="adjustType"
        >
          <el-radio-group v-model="form.adjustType">
            <el-radio label="1">调增</el-radio>
            <el-radio label="2">调减</el-radio>
          </el-radio-group>
          <!-- <el-radio v-model="form.adjustType" label="1">调增</el-radio>
          <el-radio v-model="form.adjustType" label="2">调减</el-radio> -->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="调整额度："
          prop="adjustValue"
        >
          <el-input
            type="text"
            maxlength="11"
            v-model="form.adjustValue"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="备注："
          prop="adjustReason"
        >
          <el-input
            type="textarea"
            v-model="form.adjustReason"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import Info from "@/components/info";
import { remoteDic } from "@/api/admin/dict";
export default {
  props: ["rowInfo"],
  components: { Info },
  data() {
    let checkNum = (rule, value, callback) => {
      const res = /^[0-9]*$/
      if (!value) {
        return callback(new Error("调整类型不能为空"));
      }
      if (!res.test(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    return {
      equityTypes: [],
      form: {},
      detailOption: [
        { label: "客户号", value: "" },
        { label: "权益类型", value: "" },
        { label: "权益编码", value: "" },
        { label: "权益名称", value: "" },
        { label: "权益次数", value: "" },
      ],
      rules: {
        adjustType: [
          { required: true, message: "请选择调整类型", trigger: "change" },
        ],
        adjustValue: [
          { required: true, validator: checkNum, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.fillInfo();
  },
  methods: {
    //填充数据
    async fillInfo() {
      let response = await remoteDic("equity_type");
      let equityTypes = response.data.data.equity_type;
      this.detailOption.map((item) => {
        if (item.label == "客户号") {
          item.value = this.rowInfo.custNo;
        }
        if (item.label == "权益类型") {
          equityTypes.map((ite) => {
            if (ite.value == this.rowInfo.equityType) {
              item.value = ite.label;
            }
          });
        }
        if (item.label == "权益编码") {
          item.value = this.rowInfo.equityId;
        }
        if (item.label == "权益名称") {
          item.value = this.rowInfo.equityName;
        }
         if (item.label == "权益次数") {
          item.value = this.rowInfo.remainTimes;
        }
      });
    },
    clearHandle() {
      this.form = {};
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .form {
  overflow: hidden;
  .el-col-12 {
    &:nth-child(2n-1) {
      border-right: 5px solid #fff;
    }
    &:nth-child(2n) {
      border-left: 5px solid #fff;
    }
  }
}
</style>
