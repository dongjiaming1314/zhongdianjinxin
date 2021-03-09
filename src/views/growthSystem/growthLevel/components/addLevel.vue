<template>
  <common-dialog
      :visible.sync="addVisible"
      size="default"
      :title="title == 0 ? '成长等级新增' : '成长等级修改'"
      labelWidth="100px"
    >
      <el-form-item label="等级名称：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="升级经验值：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="可兑换权益：">
        <el-input>
          <el-button slot="append">选择</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="库存：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="升级经验值：">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <template #footer>
        <el-button size="small" @click="visible = false">取消</el-button>
        <el-button size="small" type="primary" @click="submit">提交</el-button>
      </template>
    </common-dialog>
</template>

<script>
export default {
  props: {
    addVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: this.addVisible
    }
  },
  watch: {
    addVisible(val, oldVal) {
      if (val == oldVal) return
      this.visible = val
    },
    visible(val, oldVal) {
      if (val == oldVal) return
      this.$emit("update:addVisible", val)
    }
  },
  methods: {
    submit() {
      this.visible = false
    }
  }
}
</script>

<style>

</style>
