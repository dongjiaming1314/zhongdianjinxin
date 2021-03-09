<template>
    <el-form
    :model="form"
    ref="Form"
    label-width="100px"
    class="demo-ruleForm"
    >
    <el-form-item
    v-show="dialog.direction"
    label="调整方向:"
    prop="direction"
    >
        <el-radio v-model="form.direction" label="1">增加</el-radio>
        <el-radio v-model="form.direction" label="2">减少</el-radio>
    </el-form-item>
    <el-form-item
        :label="dialog.numberlabel+':'"
        prop="number"
        >
        <el-input 
        type="age" 
        v-model="form.number" 
        autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item :label="dialog.resultlabel+':'">
        <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="form.result"
        maxlength="30"
        show-word-limit
        >
        </el-input>
    </el-form-item>
    <!-- <el-form-item class="buttonGroup">
        <el-button
        :loading="submitload"
        type="primary" 
        @click="submitForm('Form')"
        size="small">提交</el-button>
        <el-button 
        @click="resetForm('Form')"
        size="small">重置</el-button>
    </el-form-item> -->
    </el-form>
</template>
<style scoped>
.buttonGroup {
    text-align: right;
}
</style>
<script>
const dialogdefault={
    direction:false,
    title:'权益冻结',
    numberlabel:'冻结数量',
    resultlabel:'冻结原因'

}
export default {
    data(){
        return {
            
        }
    },
    methods:{
      //提交调整，解冻，冻结表单
      submitForm(formName="Form") {  
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('submit')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName="Form"){
          this.$emit('update:form',{})
      }
    },
    props:{
        // submitload: {
        //     type: Boolean,
        //     default: false
        // },
        dialog:{
            type:Object,
            default:()=>{
                return dialogdefault
            }
        },
        form:{
            type:Object,
            default:()=>{}
        }
    }
}
</script>