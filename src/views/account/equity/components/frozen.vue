<template>
  <div>
    <info :detailOption="detailOption" :labelWidth="35"></info>
    <el-row class="m-top-20">
      <el-form class="form" ref="form" :model="form" label-width="35%">
        <el-col :span="12">
          <el-form-item label="备注：" prop="applyReason">
            <el-input type="textarea" v-model="form.applyReason"></el-input>
          </el-form-item>
        </el-col>
      </el-form>

    </el-row>
  </div>
</template>

<script>
import Info from "@/components/info";
import { remoteDic } from "@/api/admin/dict";
export default {
  components: { Info },
  props: {
    type: {
      type: Number,
      default: () => 2
    },
    rowInfo: {}
  },
  data() {
    return {
      detailOption: [
        { label: "客户号", value: "" },
        { label: "权益类型", value: "" },
        { label: "权益编码", value: "" },
        { label: "权益名称", value: "" },
        { label: "操作模式", value: "" }
      ],
      form: {}
    };
  },
  watch: {
    type: {
      handler(val, oldVal) {
        if (val === oldVal) return;
        if (val === 2) {
          this.detailOption[4].value = "冻结";
        } else if (val === 3) {
          this.detailOption[4].value = "解冻";
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.fillInfo();
  },
  methods: {
    //填充数据
    async fillInfo() {
      let response = await remoteDic("equity_type");
      let equityTypes = response.data.data.equity_type;
      this.detailOption.map(item => {
        if (item.label == "客户号") {
          item.value = this.rowInfo.custNo;
        }
        if (item.label == "权益类型") {
          equityTypes.map(ite => {
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
      });
    },
    clearHandle() {
      this.form = {};
    }
  }
};
</script>

<style>
</style>
