<template>
  <div>
    <el-row class="levelFormRow">
        <el-col :span="24">
          客户姓名：{{ levelForm.clientName }}
        </el-col>
      </el-row>
      <el-row class="levelFormRow">
        <el-col :span="24">
          成长等级：{{ levelForm.nowLevel }}
        </el-col>
      </el-row>
      <el-form ref="levelForm" :model="levelForm" label-width="120px">
        <el-form-item label="调整后成长等级:">
          <el-select v-model="levelForm.lastLevel" placeholder="请选择">
            <el-option label="白银" value="1"></el-option>
            <el-option label="黄金" value="2"></el-option>
            <el-option label="钻石" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调整原因:">
          <el-input type="textarea" v-model="levelForm.changeReason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="changeLevel">提交</el-button>
          <el-button size="small" @click="cancelChangeLevel">取消</el-button>
        </el-form-item>
      </el-form>

  </div>
</template>

<script>

  export default {
    name:'levelSet',
    props:[
      'levelForm'
    ],
    methods:{
      changeLevel() {
        this.$emit('changeLevel')
      },
      cancelChangeLevel() {
        this.$emit('cancelChangeLevel')
      }
    }
  }
</script>

<style>
</style>
