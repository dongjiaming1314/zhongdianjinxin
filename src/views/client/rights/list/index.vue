<template>
    <div class="execution clientRights">
        
            <template>
                <div style="text-align: center; margin-bottom: 15px;">
                    <el-radio-group v-model="selectRadio" @change="selectTab" >
                        <el-radio-button label="first">客户权益查询</el-radio-button>
                        <el-radio-button label="second" v-if="permissionList.applyListBtn">申请列表</el-radio-button>
                        <el-radio-button label="third" v-if="permissionList.verifyListBtn">审核列表</el-radio-button>
                    </el-radio-group>
                </div>
            </template>
            <template>
                <to-check 
                    :permissionList='permissionList'
                    v-if='selectRadio==="first"' />
            </template>
            <template>
                <to-apply 
                    :permissionList='permissionList'
                    v-if='selectRadio==="second"' />
            </template>
            <template>
                <to-verify
                    :permissionList='permissionList' 
                    v-if='selectRadio==="third"' />
            </template>
        
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { dateFormat } from '@/util/date'
import toCheck from '../toCheck/index'
import toApply from '../toApply/index'
import toVerify from '../toVerify/index'
  
export default {
    name: 'clientRights',
    components:{
        toCheck,
        toApply,
        toVerify,
    },
    data() {
        return {
            // 客户权益查询
            selectRadio: 'first', //积分，申请，审核
        }
    },
    computed: {
        ...mapGetters(['permissions']),
        permissionList() {
            return {
                applyBtn: this.vaildData(this.permissions.client_score_apply),
                freezeBtn: this.vaildData(this.permissions.client_score_freeze),
                unfreezeBtn: this.vaildData(this.permissions.client_score_unfreeze),
                applyListBtn: this.vaildData(this.permissions.score_apply_list),
                applyBackBtn: this.vaildData(this.permissions.score_apply_back),
                applyEditBtn: this.vaildData(this.permissions.score_apply_edit),
                applyDelBtn: this.vaildData(this.permissions.score_apply_delete),
                verifyListBtn: this.vaildData(this.permissions.score_verify_list),
                verifyFunctionBtn: this.vaildData(this.permissions.score_verify_function),
            }
        }
    },
    created(){

    },
    methods: {
        selectTab(value) {
            this.selectRadio = value;
            console.log(value)
        },
    }
  }
</script>

<style lang="scss" scoped>
.clientRights{
    .coverName{
        color: #409EFF; 
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>
