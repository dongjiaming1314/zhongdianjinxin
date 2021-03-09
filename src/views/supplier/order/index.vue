<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-radio-group v-model="tabValue" style="display: table;margin: 0 auto">
        <el-radio-button label="1">商品订单管理</el-radio-button>
        <el-radio-button label="2">权益订单管理</el-radio-button>
      </el-radio-group>
      <div style="margin-top: 20px">
        <Commodity v-if="tabValue === '1'" ref="ref_commodity"></Commodity>
        <Right v-else-if="tabValue === '2'" ref="ref_right"></Right>
      </div>
    </basic-container>
  </div>
</template>

<script>
  import Commodity from "./commodity/Commodity";
  import Right from "./right/Right";
  export default {
    name: "index",
    components: { Commodity, Right },
    data() {
      return {
        tabValue: '1'
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
