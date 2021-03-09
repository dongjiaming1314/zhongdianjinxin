<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-radio-group v-model="tabValue" style="display: table;margin: 0 auto">
        <el-radio-button label="1">品牌查询</el-radio-button>
        <el-radio-button label="2">申请列表</el-radio-button>
        <el-radio-button label="3">审核列表</el-radio-button>
      </el-radio-group>
      <div style="margin-top: 20px">
        <Inquire v-if="tabValue === '1'" ref="ref_inquire"></Inquire>
        <Application v-else-if="tabValue === '2'" ref="ref_application"></Application>
        <Review v-else-if="tabValue === '3'" ref="ref_review"></Review>
      </div>
    </basic-container>
  </div>
</template>

<script>
  import Inquire from "./inquire/Inquire";
  import Application from "./Application/Application";
  import Review from "./review/Review";
  export default {
    name: "index",
    components: { Inquire, Application, Review },
    data() {
      return {
        tabValue: '1'
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
