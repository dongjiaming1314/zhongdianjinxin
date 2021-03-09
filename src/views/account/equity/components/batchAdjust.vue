<template>
  <el-form
      class="form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <el-col :span="12">
        <el-form-item label="权益类型：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="权益名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="调整类型：" prop="name">
          <el-radio v-model="form.type" label="1">调增</el-radio>
          <el-radio v-model="form.type" label="2">调减</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="调整额度：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户列表：" prop="name">
          <el-input v-model="form.name">
            <!-- <el-button slot="append">上传文件</el-button> -->
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              slot="append"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="备注：" prop="name">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        name: [{required: true,}]
      }
    }
  },

}
</script>

<style>

</style>
