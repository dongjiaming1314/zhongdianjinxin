<template>
    <common-dialog
        :visible.sync='verifyVisible' 
        :label-width="'160px'" 
        :size="'large'" 
        :title='"积分审核"'
        @close="closeFn">
        <div>
            {{verifyObj}}
        </div>
        <el-form ref="numForm" :rules="numRules" :model="numForm" class="demo-form-inline" label-width="90px">
            <el-form-item label="审核结果：" prop="calculation">
                <el-radio-group v-model="numForm.calculation">
                    <el-radio label="通过"></el-radio>
                    <el-radio label="失败"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="审核备注："  prop="reason">
                <el-input v-model="numForm.reason"  type="textarea" placeholder="请输入"></el-input>
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
    name: 'verifyElement',
    props: [
        'verifyVisible',
        'numForm',
        'numRules',
        'verifyObj',
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