<template>
    <common-dialog 
        :visible.sync="applyChange"
        :label-width="'160px'" 
        :size="'large'" 
        :title='applyTitle'
        @close="closeFn"
        >
        <div>{{numForm}}</div>
        <el-form ref="numForm"  :model="numForm" class="demo-form-inline" label-width="90px">
            <el-form-item label="客户姓名：" >
                <el-input type="number" v-model.number="numForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="客户号：" prop="number">
                <el-input type="number" v-model.number="numForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码："  prop="reason">
                <el-input v-model="numForm.reason"  type="textarea" placeholder="请输入调整原因"></el-input>
            </el-form-item>
            <el-form-item label="状态：" >
                <el-input type="number" v-model.number="numForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="申请操作：" prop="number">
                <el-input type="number" v-model.number="numForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="申请人："  prop="reason">
                <el-input v-model="numForm.reason"  type="textarea" placeholder="请输入调整原因"></el-input>
            </el-form-item>
             <el-form-item label="申请时间：" >
                <el-input type="number" v-model.number="numForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="审核人：" prop="number">
                <el-input type="number" v-model.number="numForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="审核时间："  prop="reason">
                <el-input v-model="numForm.reason"  type="textarea" placeholder="请输入调整原因"></el-input>
            </el-form-item>
            <el-form-item label="审核备注："  prop="reason">
                <el-input v-model="numForm.reason"  type="textarea" placeholder="请输入调整原因"></el-input>
            </el-form-item>
        </el-form>
        <template v-slot:footer>
            <el-button  size="small" type="primary" @click="submitForm('numForm')">提交</el-button>
            <el-button size="small"  @click="resetForm('numForm')">取消</el-button>
        </template>
    </common-dialog>
</template>

<script>
export default {
    name: 'applyElement',
    props: [
        'applyChange',
        'applyTitle',
        'numForm',
    ],
    data(){
        return{
            
        }
    },
    methods:{
        submitForm(val){
            this.$emit('submitForm',val)
        },
        resetForm(val){
            this.$emit('resetForm',val)
        },
        closeFn(){
            this.$emit('closeFn')
        }
    }
}
</script>

<style>

</style>