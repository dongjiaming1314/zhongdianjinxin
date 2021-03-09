<template>
    <div class="execution poolCompose">
        <template>
            <div style="text-align: center;margin-bottom:15px;">
                <el-radio-group v-model="selectRadio" @change="selectTab" >
                    <el-radio-button label="first">权益组合查询</el-radio-button>
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
            <to-audit 
                :permissionList='permissionList'
                v-if='selectRadio==="third"' />
        </template>
    </div>
</template>

<script>

import {
    mapGetters
} from 'vuex'

import toCheck from './query'
import toApply from './apply'
import toAudit from './audit'
export default {
    name: 'poolCompose',
    components:{
        toCheck,
        toApply,
        toAudit
    },
    data() {
        return {
            selectRadio: 'first', 
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

</style>
