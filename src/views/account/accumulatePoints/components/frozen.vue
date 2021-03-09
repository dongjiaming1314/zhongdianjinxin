<template>
  <div>
    <info :detailOption="detailOption" :labelWidth="35"></info>
    <el-row class="m-top-20">
      <el-col :span="12">
        <el-form-item label="备注：" prop="applyReason">
          <el-input type="textarea" v-model="addForm.applyReason"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Info from "@/components/info";
export default {
  components: { Info },
  props: {
    type: {
      type: Number,
      default: () => 2
    },
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      addForm: {
        applyReason: "",
        custNo: this.info.custNo
      },
      detailOption: [
        { label: "客户号", value: this.info.custNo },
        { label: "所属机构", value: this.info.orgName },
        { label: "积分总值", value: this.info.totalIntegral },
        { label: "已使用积分值", value: this.info.usedIntegral },
        { label: "剩余积分值", value: this.info.avaIntegral },
        { label: "操作模式", value: "" }
      ]
    };
  },
  watch: {
    type: {
      handler(val, oldVal) {
        if (val === oldVal) return;
        console.log(val);
        if (val === 2) {
          this.detailOption[5].value = "冻结";
        } else if (val === 3) {
          this.detailOption[5].value = "解冻";
        }
      },
      immediate: true
    }
  },
  methods:{
    clearHandle() {
      this.addForm = {};
    }
  }
};
</script>

<style>
</style>
