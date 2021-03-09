<template>
    <div class="execution equityPacket">
        <basic-container>
          <template>
            <div style="text-align: center;margin-bottom: 15px;">
                <el-radio-group v-model="selectRadio" @change="selectTab" >
                    <el-radio-button label="first">红包池查询</el-radio-button>
                    <el-radio-button label="second">申请列表</el-radio-button>
                    <el-radio-button label="third">审核列表</el-radio-button>
                </el-radio-group>
            </div>
          </template>
          <template>
              <to-query 
                :permissionList="permissionList"
                v-if="selectRadio==='first'" />
          </template>
          <template>
              <to-apply 
                :permissionList="permissionList"
                v-if="selectRadio==='second'" />
          </template>
          <template>
            <to-verify
              :permissionList="permissionList"
              v-if="selectRadio==='second'" />
          </template>
       </basic-container>
    </div>
</template>

<script>
import {
    mapGetters
} from 'vuex'

import toQuery from './toQuery/index'
import toApply from './toApply/index'
import toVerify from './toVerify/index'
export default {
    name: 'equityPacket',
    components:{
      toQuery,
      toApply,
      toVerify
    },
    data() {
      return {
          selectRadio:'first', //红包池，申请切换
      }
    },
    computed: {
        ...mapGetters(['permissions']),
        permissionList() {
            return {
                addBtn: this.vaildData(this.permissions.equity_packet_add),
                delBtn: this.vaildData(this.permissions.equity_packet_del),
                editBtn: this.vaildData(this.permissions.equity_packet_edit),
                checkBtn: this.vaildData(this.permissions.equity_packet_check),
                transferBtn: this.vaildData(this.permissions.equity_packet_transfer),
                verifyBtn: this.vaildData(this.permissions.equity_packet_verify)
            }
        },
    },
    methods: {
        selectTab(val){
          this.selectRadio = val
        }
    }
  }
</script>


