<template>
    <common-dialog
    :visible.sync="visible"
    size="default"
    title="成长等级详情"
    labelWidth="100px"
  >
    <info :detailOption="detailList"></info>
    <template #footer>
      <el-button @click="visible = false" size="small">关闭</el-button>
    </template>
  </common-dialog>
</template>

<script>
import Info from "@/components/info"
export default {
  components: {Info},
  props: {
    detailVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.detailVisible,
      detailList: [
        {
          label: "等级名称",
          value: "一级"
        },
        {
          label: "升级经验值",
          value: "20"
        },
        {
          label: "可兑换权益",
          value: "迪斯尼三日游"
        },
        {
          label: "库存",
          value: "90"
        },
        {
          label: "备注",
          value: "90"
        },
        {
          label: "创建人",
          value: "张三"
        },
        {
          label: "创建时间",
          value: "2020/1/1 9:00:00"
        },
        {
          label: "修改人",
          value: "张三"
        },
        {
          label: "修改时间",
          value: "2020/1/1 9:00:00"
        },
        {
          label: "审核人",
          value: "张三"
        },
        {
          label: "审核时间",
          value: "2020/1/1 9:00:00"
        }
      ],
    }
  },
  watch: {
    detailVisible(val, oldVal) {
      if (val == oldVal) return
      this.visible = val
    },
    visible(val, oldVal) {
      if (val == oldVal) return
      this.$emit('update:detailVisible', val)
    }
  }
}
</script>

<style>

</style>
