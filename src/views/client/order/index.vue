<template>
    <basic-container>
        <div class="btn-wrapper">
            <el-radio-group v-model="radio">
                <el-radio-button label="first" v-if="permissionList.interestsBtn" @click="checkInterests">客户权益订单管理</el-radio-button>
                <el-radio-button label="second"  v-if="permissionList.goodsBtn" @click="checkGoods">客户商城订单管理</el-radio-button>
            </el-radio-group>
        </div>
        <client-interests
            :permissionList="permissionList" 
            v-if="radio==='first'" />
        <client-goods v-if="radio==='second'" />
    </basic-container>
</template>
<script>
import clientInterests from "./clientInterests/index"
import clientGoods from "./clientGoods/index"
import { mapGetters } from "vuex"

export default {
    name:'clientInteretsGoods',
    components:{
        clientInterests,
        clientGoods
    },
    data() {
    return {
      // which:'first',
      radio: 'first',
    }
  },
  computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          interestsBtn: this.vaildData(this.permissions.client_interests_check),
          goodsBtn: this.vaildData(this.permissions.client_goods_check),
          exportInterestsBtn: this.vaildData(this.permissions.client_goods_check),
          closeInterestsBtn: this.vaildData(this.permissions.client_goods_check),
        }
      },
    },
  methods: {
    checkInterests() {
      this.radio = "first"
    },
    checkGoods() {
      this.radio = "second"
    //   this.isQuery = true
    },
  }
};
</script>
<style lang="scss" scoped>
.btn-wrapper{
    text-align: center;
    margin-bottom: 15px;
}
</style>
