<template>
    <common-dialog
        :visible.sync="showType"
        :label-width="'80px'" 
        :size="'small'" 
        :title='title'
        @close="closeFn"
        >
        <el-form ref="numForm" :rules="rules" :model="numForm" class="demo-form-inline" >
            <el-form-item label="展示类型：" prop="type">
                <el-radio-group v-model="numForm.type" placeholder="请选择展示类型" @change="changeRadio">
                    <el-radio label="1">输入框</el-radio>
                    <el-radio label="2">按钮</el-radio>
                    <el-radio label="3">图片</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="area" v-if="numForm.type==='1'" label="类型格式：">
                <el-select v-model="numForm.area" placeholder="请选择格式">
                    <el-option label="文本输入" value="1"></el-option>
                    <el-option label="段落输入" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="area" v-if="numForm.type==='2'" label="类型格式：">
                <el-select v-model="numForm.area" placeholder="请选择格式">
                    <el-option label="大按钮" value="large"></el-option>
                    <el-option label="中按钮" value="medium"></el-option>
                    <el-option label="小按钮" value="small"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="area" v-if="numForm.type==='3'" label="类型格式：">
                <el-select v-model="numForm.area" placeholder="请选择格式">
                    <el-option label="大图片" value="big"></el-option>
                    <el-option label="中图片" value="middle"></el-option>
                    <el-option label="小图片" value="little"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template v-slot:footer>
            <el-button  size="small" type="primary" @click="submitForm('numForm')">确定</el-button>
            <el-button size="small"  @click="resetForm('numForm')">取消</el-button>
        </template>
    </common-dialog>
</template>

<script>
export default {
    props: [
      'numForm',
      'showType',
      'rules',
    ],
    methods:{
        submitForm(val){
            this.$emit('submitForm',val)
        },
        resetForm(val){
            this.$emit('resetForm',val)
        },
        closeFn(){
            this.$emit('closeFn')
        },
        changeRadio(val){
            this.$emit('changeRadio')
        }
    }
    
}
</script>

<style>

</style>