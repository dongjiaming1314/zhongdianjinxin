<template>
  <common-dialog
    labelPosition="left"
    :visible.sync="detailVisible"
    size="large"
    :label-width="'140px'"
    title="规则详情"
  >
    <info :detailOption="detailOption1"></info>
    <el-row class="mb_10">
      <el-col :span="24">
        <label for class="inline_block width_120">条件列表</label>
      </el-col>
      <el-col :span="24">
        <el-table :data="detailTable" size="small">
          <el-table-column label="序号" prop="index"></el-table-column>
          <el-table-column label="指标名称" prop="name"></el-table-column>
          <el-table-column label="公式" prop="formula"></el-table-column>
          <el-table-column label="值" prop="value"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row class="mb_10">
      <el-col :span="24">
        <label for class="inline_block width_120">条件关系</label>
        <span>与</span>
      </el-col>
    </el-row>

    <el-row class="mb_10">
      <el-col :span="24">
        <label for class="inline_block width_120">规则限制</label>
      </el-col>
    </el-row>
    <info :detailOption="detailOption2"></info>

    <template #footer>
      <el-button size="small" @click="detailVisible = !detailVisible">关闭</el-button>
    </template>
  </common-dialog>
</template>

<script>
import Info from "@/components/info"
export default {
  components: {Info},
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      detailVisible: this.visible,
      detailOption1: [
        {label: "规则名称", prop: "name", value: "交易规则"},
        {label: "生效时间起", prop: "dateStart", value: "交易规则"},
        {label: "生效时间止", prop: "dateEnd", value: "交易规则"},
        {label: "奖励经验", value: "交易规则"},
        {label: "创建时间", value: "交易规则"},
        {label: "创建人", value: "交易规则"},
        {label: "修改时间", value: "交易规则"},
        {label: "修改人", value: "交易规则"},
        {label: "审核时间", value: "交易规则"},
        {label: "审核人", value: "交易规则"},
        {label: "备注", value: "交易规则"},
      ],
      detailOption2: [
        {label: "每日获取经验最大值", value: "30"},
        {label: "每周获取经验最大值", value: "30"},
        {label: "每月获取经验最大值", prop: "mouthMax", value: "30"},
      ],
      detailTable: [
        {index: 1, name: 'kk'}
      ],
      data: {
        name: "规则。。。",
        dateStart: "2000-1-10",
        dateEnd: "2020-12-02",
        mouthMax: "50"
      }
    };
  },
  watch: {
    visible(val, oldVal) {
      if (val == oldVal) {
        return;
      }
      this.detailVisible = val;
    },
    detailVisible(val, oldVal) {
      if (val == oldVal) {
        return;
      }
      this.$emit("update:visible", val);
    },
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      let idx = -1
      Object.keys(this.data).forEach(key => {
        if ((idx = this.detailOption1.findIndex(item => item.prop == key)) > -1) {
          this.detailOption1[idx].value = this.data[key]
        } else if ((idx = this.detailOption2.findIndex(item => item.prop == key)) > -1) {
          this.detailOption2[idx].value = this.data[key]
        }
      })
    }
  }
};
</script>

<style>
</style>
