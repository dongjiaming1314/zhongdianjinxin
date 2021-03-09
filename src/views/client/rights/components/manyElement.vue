<template>
    <common-dialog 
        :visible.sync="numChange"
        :label-width="'160px'" 
        :size="'large'" 
        :title='title'
        @close="closeFn"
        >
        <el-dialog
            width="30%"
            :title="whichTitle"
            :visible.sync="innerVisible"
            append-to-body>
            <el-table
                @selection-change="handleSelectionChange"
                :data="unUsedList"
                border
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                </el-table-column>
                <el-table-column
                    label="权益名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="权益编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="权益类型">
                </el-table-column>
                <el-table-column
                    label="权益到期日">
                </el-table-column>
                <el-table-column
                    label="数量">
                </el-table-column>
            </el-table>
            <el-row>
                    <el-button size="small" type="primary" @click="sureToChoose"> 确定</el-button>
                    <el-button size="small" @click="innerVisible=false"> 取消</el-button>
            </el-row>
        </el-dialog>
        <el-row>
            <el-col :span="5" v-if="whichOne === 3">冻结权益列表:</el-col>  
            <el-col :span="5" v-else>未使用权益列表:</el-col>  
            <el-col :span="3" >     
                <el-button size="small"  @click="chooseFn">选择</el-button>
            </el-col> 
        </el-row>
        <el-table
            :data="choosedList"
            border
            style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                label="权益名称"
                width="180">
            </el-table-column>
            <el-table-column
                label="权益编号"
                width="180">
            </el-table-column>
            <el-table-column
                label="权益类型">
            </el-table-column>
            <el-table-column
                label="权益到期日">
            </el-table-column>
            <el-table-column
                label="数量">
            </el-table-column>
        </el-table>
        <el-form v-if="whichOne === 1" ref="numForm" :rules="numRules" :model="numForm" class="demo-form-inline" label-width="90px">
            <el-form-item label="调整方向：" prop="calculation">
                <el-radio-group v-model="numForm.calculation">
                    <el-radio label="增加"></el-radio>
                    <el-radio label="减少"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="调整数量：" prop="number">
                <el-input type="number" v-model.number="numForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="调整原因："  prop="reason">
                <el-input v-model="numForm.reason"  type="textarea" placeholder="请输入调整原因"></el-input>
            </el-form-item>
        </el-form>
        <el-form v-if="whichOne === 2" ref="numForm" :rules="numRules" :model="numForm" class="demo-form-inline" label-width="90px">
            <el-form-item label="冻结原因："  prop="reason">
                <el-input v-model="numForm.reason"  type="textarea" placeholder="请输入调整原因"></el-input>
            </el-form-item>
        </el-form>
        <el-form v-if="whichOne === 3" ref="numForm" :rules="numRules" :model="numForm" class="demo-form-inline" label-width="90px">
            <el-form-item label="解冻数量：" prop="number">
                <el-input type="number" v-model.number="numForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="解冻原因："  prop="reason">
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
    name: 'manyElement',
    props: [
        'numChange',
        'selectedList',
        'title',
        'numForm',
        'whichOne',
        'numRules',
    ],
    data(){
        return{
            innerVisible:false,
            unUsedList:[{
                type: '1',
                name: 'hah'
            }],
            choosedList:[],
            
        }
    },
    computed:{
        whichTitle(){
            if(this.whichOne == 3 ){
                return '冻结权益列表'
            }else{
                return '未使用权益列表'
            }
        }
    },
    created(){
        // 通过选择客户，获取属于用户的未使用权益列表selectedList
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
        },
        chooseFn(){
            this.innerVisible = true
            // 调取后台接口
        },
        sureToChoose(){
            this.innerVisible = false
            console.log(this.choosedList)
        },
        handleSelectionChange(val){
            console.log(val)
            this.choosedList = val
        }
    }
}
</script>

<style>

</style>