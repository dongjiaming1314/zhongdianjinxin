<template>
  <div class="equityDetail">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="已领取权益"
        name="first"
      >
        <div
          class="item-wrap"
          v-for="(item,index) in dataList"
          :key="index"
        >
          <div class="img-wrap">
            <img
              :src="item.fileUrl"
              alt=""
            >
          </div>
          <div class="info-wrap">
            <div class="info-name">{{item.equityName}}</div>
            <div class="info-detail">{{item.createdTime}} - {{item.dateOfValidity}}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="已使用权益"
        name="second"
      >
        <div
          class="item-wrap"
          v-for="(item,index) in usedDataList"
          :key="index"
        >
          <div class="img-wrap">
            <img
              :src="item.fileUrl"
              alt=""
            >
          </div>
          <div class="info-wrap">
            <div class="info-name">{{item.equityName}}</div>
            <div class="info-detail">{{item.createdTime}} - {{item.dateOfValidity}}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="已过期权益"
        name="third"
      >
        <div
          class="item-wrap"
          v-for="(item,index) in pastDataList"
          :key="index"
        >
          <div class="img-wrap">
            <img
              :src="item.fileUrl"
              alt=""
            >
          </div>
          <div class="info-wrap">
            <div class="info-name">{{item.equityName}}</div>
            <div class="info-detail">{{item.createdTime}} - {{item.dateOfValidity}}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getReceiveEquity } from "@/api/client/view";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      page: {
        current: 1,
        size: 9999,
      },
      dataList: [],
      usedDataList: [],
      pastDataList: [],
    };
  },
  computed: {
    ...mapState("view", ["custInfo"]),
  },
  mounted() {
  },
  methods: {
    getList() {
      getReceiveEquity(
        Object.assign(this.page, { way: 1, custNo: this.custInfo.custNo })
      ).then((res) => {
        let data = res.data.data.records;
        data.forEach((item, index) => {
          if (index < 5) {
            this.dataList.push(item);
          }
          if (item.equityUseStatus === 1) {
            this.usedDataList.push(item);
          }
          if (item.equityUseStatus === 2 || item.equityUseStatus === 3) {
            this.pastDataList.push(item);
          }
        });
      });
    },
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
  },
};
</script>

<style lang='scss' scoped>
.equityDetail {
  height: 880px;
  background: #ffffff;
  padding: 36px 20px 0 20px;
  display: flex;
  justify-content: center;
  ::v-deep .el-tabs {
    width: 100%;
    .el-tabs__nav {
      width: 100%;
      display: flex;
      .is-top {
        flex: 1;
        text-align: center;
      }
      .el-tabs__active-bar {
        // width: 28px !important;
      }
    }
  }
  .item-wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 18px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    display: flex;
    margin-bottom: 20px;

    .img-wrap {
      box-sizing: border-box;
      width: 95px;
      height: 95px;
      background: #f8f8f8;
      border-radius: 6px;
      padding: 22px 10px;
      margin-right: 14px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .info-name {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #000000;
        margin-bottom: 8px;
      }
      .info-detail {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #000000;
      }
    }
  }
}
</style>