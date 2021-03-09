<template>
  <div class="listInfo">
    <div class="listInfo-header">
      <div
        class="list-header_button"
        :class="{isActive:this.which === 'equityList'}"
        @click="change('equityList')"
      >权益信息</div>
      <div
        class="list-header_button"
        :class="{isActive:this.which === 'pointsList'}"
        @click="change('pointsList')"
      >积分信息</div>
      <div
        class="list-header_button"
        :class="{isActive:this.which === 'activeList'}"
        @click="change('activeList')"
      >活动信息</div>
    </div>
    <div class="listInfo-content">
      <div
        :is="which"
        :equityList="equityList"
      ></div>
    </div>

  </div>
</template>

<script>
import equityList from "./equityList";
import pointsList from "./pointsList";
import activeList from "./activeList";
import { getReceiveEquity } from "@/api/client/view";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: { equityList, pointsList, activeList },
  data() {
    return {
      radio: "权益信息",
      which: "equityList",
      page: { current: 1, size: 10, total: 0 },
      equityList: [],
    };
  },
  mounted() {},
  computed: {
    ...mapState("view", ["custInfo"]),
  },
  methods: {
    getList() {
      getReceiveEquity(
        Object.assign(this.page, { way: 1, custNo: this.custInfo.custNo })
      ).then((res) => {
        this.equityList = res.data.data.records;
        console.log('   this.equityList ',   this.equityList );
      });
    },
    change(val) {
      this.which = val;
    },
  },
};
</script>

<style lang='scss' scoped>
.listInfo {
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  padding: 30px 17px 0 17px;
  .listInfo-header {
    display: flex;
    margin-bottom: 24px;
    .list-header_button {
      width: 116px;
      height: 36px;
      background: #f1f5f9;
      border-radius: 4px;
      text-align: center;
      line-height: 36px;
      margin-right: 7px;
      cursor: pointer;
    }
    .isActive {
      background: #3569ff;
      color: #ffffff;
    }
  }
  ::v-deep .avue-crud__menu {
    display: none;
  }
}
</style>