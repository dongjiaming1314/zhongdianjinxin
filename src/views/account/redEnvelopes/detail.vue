<template>
  <div class="rdetail">
      <el-row :gutter="10">
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <h3 class="title">红包账户详情</h3>
        </el-col>
        <el-col style="textAlign: right" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <el-button
          size="small"
          @click="backTo"
          type="primary">关闭</el-button>
        </el-col>
      </el-row>
      <info :detailOption="detailOption"></info>
      <p class="title">红包列表</p>
      <avue-crud
      :data="equityData"
      :option="equityOption1"></avue-crud>
  </div>
</template>
<script>
import info from '@/components/info'
import { equityOption } from '@/const/crud/account/redEnvelopes'
export default {
  data() {
    return {
      equityData: [],
      equityOption1:equityOption,
      detailOption: [
        { label: "姓名", value: "hahha" },
        { label: "账户ID", value: "ddd" },
        { label: "证件类型", value: "dd" },
        { label: "证件号码", value: "dd" },
        { label: "手机号码", value: "34d" },
        { label: "性别", value: "ddd" },
        { label: "所属机构", value: "ddd" },
        { label: "上次登陆时间", value: "2dd" },
        { label: "登陆IP", value: "d33d" },
        { label: "登陆渠道", value: "d4ff" },
      ],
    };
  },
  components:{
    info
  },
  methods: {
    backTo(){
      this.$emit('fun','list')
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  border-left: 4px solid #0780ff;
  padding-left: 8px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 20px;
}
.rdetail ::v-deep{
  .avue-crud__menu {
    display: none;
   }
}
</style>
