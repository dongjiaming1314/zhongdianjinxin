<template>
  <el-upload
    class="upload-demo"
    :action="action"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    multiple
    :limit="limit"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
  </el-upload>
</template>

<script>
  export default {
    name: "Upload",
    model: { prop: "value", event: "change" },
    props: {
      action: {
        type: String,
        default: ''
      },
      value: {
        type: Array,
        default: () => []
      },
      limit: Number,
      size: Number
    },
    data() {
      return {
        fileList: this.value
      };
    },
    watch: {
      value(val) {
        this.fileList = val;
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        console.log(files, fileList);
      },
      beforeUpload(file) {
        console.log(file)
      }
    }
  }
</script>

<style scoped>

</style>
