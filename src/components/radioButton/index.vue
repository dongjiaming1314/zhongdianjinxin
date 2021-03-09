<template>
  <div style="text-align: center">
    <el-radio-group v-model="activeName">
      <el-radio-button
        v-for="item in tabs"
        :key="item.name"
        :label="item.label"
      ></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    activeName: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    }
  },
  watch: {
    activeName(val, oldVal) {
      this.$emit("update:activeName", val)
    }
  },
  data() {}
};
</script>

<style></style>
