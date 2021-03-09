<template>
  <common-dialog
    labelPosition="left"
    :visible.sync="visible"
    size="large"
    :label-width="'140px'"
    title="客户等级查询"
  >
    <info :detailOption="detailOption"  :labelWidth='50'></info>
    <template #footer>
      <el-button size="small" @click="close">关闭</el-button>
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
      default: () => false
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: this.detailVisible,
      detailOption: [
        {label: "客户等级名称", prop: "levelName", },
        {label: "客户等级编码", prop: "levelCode", },
        {label: "达标资产值（AUM）", prop: "aum",},
        {label: "是否启用", prop: "enabled",},
      ]
    }
  },
  created() {
    this.detailOption.forEach(item => {
      if (item.prop === 'enabled') {
        item.value = this.data[item.prop] == "0" ? "是" : "否"
        return
      }
      item.value = this.data[item.prop]
    })
  },
  watch: {
    detailVisible(val, oldVal) {
      if (val === oldVal) return
      this.visible = val
    },
    visible(val, oldVal) {
      if (val === oldVal) return
      this.$emit("update:detailVisible", val)
    }
  },
  methods: {
    close() {
      this.visible = false
    }
  }
}
</script>

<style>

</style>
