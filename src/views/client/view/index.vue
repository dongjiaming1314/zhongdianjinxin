<template>
  <div
    class="view"
    v-loading="loading"
  >
    <div class="right">
      <cust-info ref="custInfo"></cust-info>
      <equity-info ref="equityInfo"></equity-info>
      <list-info ref="listInfo"></list-info>
    </div>
    <div class="left">
      <equity-detail ref="equityDetail"></equity-detail>
    </div>
  </div>
</template>

<script>
import custInfo from "./components/custInfo/index";
import equityInfo from "./components/equityInfo/index";
import listInfo from "./components/listInfo/index";
import equityDetail from "./components/equityDetail/index";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: { custInfo, equityInfo, listInfo, equityDetail },
  data() {
    return {};
  },
  watch: {
    $route(to, from) {
      this.onLoad();
    },
  },
  created() {
    this.onLoad();
  },
  computed: {
    ...mapState("view", ["custInfo", "loading"]),
  },
  methods: {
    ...mapActions("view", ["getList"]),
    onLoad() {
      this.loading = true;
      if (this.$route.query.custNo) {
        this.getList(this.$route.query.custNo).then((res) => {
          this.$refs.custInfo.getInfoList();
          this.$refs.equityInfo.getList();
          this.$refs.equityDetail.getList();
          this.$refs.listInfo.getList();
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.view {
  padding: 10px 20px 28px 20px;
  display: flex;
  .right {
    flex: 64%;
    margin-right: 20px;
  }
  .left {
    flex: 31%;
  }
}
::v-deep .el-loading-spinner {
  top: 30%;
}
</style>