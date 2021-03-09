<template>
    <div>
      <div class="btn-wrapper">
      <el-radio-group v-model="activeName" @change="change" style="display: table;margin: 0 auto">
        <el-radio-button label="equery">权益账户查询</el-radio-button>
        <!-- <el-radio-button label="apply">申请列表</el-radio-button> -->
        <el-radio-button label="check">审核列表</el-radio-button>
      </el-radio-group>
    </div>
    <!-- v-on="$listeners" 作为主孙主键通讯中间 -->
    <div :is="activeName" v-on="$listeners"></div>
    </div>
</template>
<script>
import equery from '@/views/account/equity/equery'
import apply from '@/views/account/equity/apply'
import check from '@/views/account/equity/check'
export default {
  data(){
    return {
       activeName: 'equery',
    }
  },
  components:{
    equery,apply,check
  },
  methods:{
    change(name){
      this.activeName=name
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-wrapper {
  text-align: center;
}
::v-deep .avue-group {
  margin-top: 15px;
  .el-collapse-item {
    .el-collapse-item__arrow {
      display: none;
    }
  }
}
</style>
