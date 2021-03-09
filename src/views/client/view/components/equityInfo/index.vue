<template>
  <div class="equityInfo">
    <div class="equityInfo-left_wrap">
      <div class="equityInfo-header">
        当前可选权益
      </div>
      <div class="equityInfo-content">
        <div
          class="content-wrap"
          v-for="(item,index) in fourDataList"
          :key="index"
        >
          <div class="content-wrap_img">
            <img
              :src="item.img"
              alt=""
            />
          </div>
          <div class="content-wrap_title">{{item.equityName}}</div>
        </div>
        <div
          class="more-wrap"
          v-if="dataList.length >4"
        >
          <div
            class="more-wrap_img"
            @click="moreEquity('当前可选权益',dataList,require('../../../../../static/warningGoods.png'))"
          >
            <i class="el-icon-more"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="equityInfo-right_wrap">
      <div class="equityInfo-header">
        下一等级可选权益
      </div>
      <div class="equityInfo-content">
        <div
          class="content-wrap"
          v-for="(item,index) in fourDataNextList"
          :key="index"
        >
          <div class="content-wrap_img">
            <img
              :src="item.img"
              alt=""
            />
          </div>
          <div class="content-wrap_title">{{item.equityName}}</div>
        </div>
        <div
          class="more-wrap"
          v-if="dataNextList.length>4"
        >
          <div
            class="more-wrap_img"
            @click="moreEquity('下一等级可选权益',dataNextList,require('../../../../../static/礼包权益.png'))"
          >
            <i class="el-icon-more"></i>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="equityInfo-content">
        <div
          class="content-wrap"
          style="flex: 0 0 20%; margin-bottom:38px"
          v-for="(item,index) in dialogVal"
          :key="index"
        >
          <div class="content-wrap_img">
            <img
              :src="src"
              alt=""
            />
          </div>
          <div class="content-wrap_title">{{item.equityName}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getEquityInfo, getNextEquityInfo } from "@/api/client/view";
import { mapState, mapMutations, mapActions } from "vuex";
import { deepClone } from "@/util/tag";
export default {
  data() {
    return {
      dataList: [],
      dataNextList: [],
      fourDataList: [],
      fourDataNextList: [],
      dialogVal: [],
      title: "",
      src: "",
      visible: false,
    };
  },
  computed: {
    ...mapState("view", ["custInfo"]),
  },
  mounted() {},
  methods: {
    getList() {
      //当前
      getEquityInfo({ levelId: this.custInfo.levelCode }).then((res) => {
        let data = res.data.data;
        this.dataList = data;
        this.fourDataList = data.slice(0, 4);
        this.fourDataList.forEach((item, index) => {
          if (index === 0)
            item.img = require("../../../../../static/礼包权益.png");
          if (index === 1)
            item.img = require("../../../../../static/选购权益.png");
          if (index === 2)
            item.img = require("../../../../../static/尊贵权益.png");
          if (index === 3)
            item.img = require("../../../../../static/福利权益.png");
        });
      });
      //下一级
      getNextEquityInfo({ levelId: this.custInfo.levelCode }).then((res) => {
        let nextData = res.data.data;
        this.dataNextList = nextData;
        this.fourDataNextList = nextData.slice(0, 4);
        this.fourDataNextList.forEach((item, index) => {
          if (index === 3)
            item.img = require("../../../../../static/礼包权益.png");
          if (index === 1)
            item.img = require("../../../../../static/选购权益.png");
          if (index === 2)
            item.img = require("../../../../../static/尊贵权益.png");
          if (index === 0)
            item.img = require("../../../../../static/福利权益.png");
        });
      });
    },
    moreEquity(title, data, src) {
      // this.visible = true;
      // this.title = title;
      // this.dialogVal = deepClone(data);
      // this.src = src;
    },
  },
};
</script>

<style lang='scss' scoped>
.equityInfo {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  .equityInfo-left_wrap {
    flex: 1;
    background: #ffffff;
    padding: 15px 14px 17px 17px;
    margin-right: 10px;
  }
  .equityInfo-right_wrap {
    flex: 1;
    background: #ffffff;
    padding: 15px 14px 17px 17px;
    margin-left: 10px;
  }

  .equityInfo-header {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #000000;
    text-align: center;
    margin-bottom: 18px;
  }
  .equityInfo-content {
    display: flex;
    flex-wrap: wrap;
    .content-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;

      .content-wrap_img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        // background: #c0c4cc;
        // &:last-child {
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   > div {
        //     width: 34px;
        //     height: 34px;
        //     border-radius: 50%;
        //     background: #f1f5f9;
        //     text-align: center;
        //     line-height: 34px;
        //   }
        // }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .content-wrap_title {
      width: 56px;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #303133;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .more-wrap {
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    .more-wrap_img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #f1f5f9;
      text-align: center;
      line-height: 34px;
      cursor: pointer;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30vh !important;
  }
}
</style>