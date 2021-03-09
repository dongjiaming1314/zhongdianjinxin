<template>
  <div v-loading="allLoading">
    <div class="cancelBtn">
      <p>库存管理</p>
      <div @click="cancel">
        <img src="../../../../../public/images/equity_close.png" alt="">
      </div>
    </div>
    <div class="supplierClass">
      <div>
        <div>
          <p>{{ dataForm.supplierName }}</p>
          <p>所属供应商</p>
        </div>
        <div>
          <p>{{ dataForm.equityName }}</p>
          <p>权益名称</p>
        </div>
      </div>
      <div>
        <el-button round @click="goTable">更多</el-button>
      </div>
    </div>
    <div class="cardClass">
      <!-- <div>
        <el-card class="box-card">
          <p>{{ cataName }}</p>
          <p>权益目录</p>
        </el-card>
      </div> -->
      <div>
        <el-card class="box-card">
          <p>{{ initRecord }}</p>
          <p>初始值</p>
        </el-card>
      </div>
      <div>
        <el-card class="box-card">
          <p>{{ totalDeliver }}</p>
          <p>累计发放</p>
        </el-card>
      </div>
      <div>
        <el-card class="box-card">
          <p>{{ dataForm.equityInventory }}</p>
          <p>当前库存</p>
        </el-card>
      </div>
      <div>
        <el-card class="box-card">
          <p>{{ sumIncrNum }}</p>
          <p>累计调增</p>
        </el-card>
      </div>
      <div>
        <el-card class="box-card">
          <p>{{ sumdecrNum }}</p>
          <p>累计调减</p>
        </el-card>
      </div>
    </div>
    <!-- <div class="goTable">
      <el-button type="primary" @click="goTable">更多</el-button>
    </div> -->
    <div class=""></div>
    <div class="timeLine">
      <el-timeline>
        <el-timeline-item color="#fff" v-for="(item, index) in showList" :key="index" placement="top">
          <!-- :timestamp="
            item[0].createdDate ? item[0].createdDate : item[1].createdDate ? item[1].createdDate:item[2].createdDate
          " -->
          <el-card :style="{
              visibility: item[2].adjustSumAmount ? 'visible' : 'hidden'
            }">
            <div class="clickClass" @click="goTablePage(item)">
              <!-- <p>总减量:{{item[1].adjustSumAmount}}</p> -->
              <p>
                &nbsp;&nbsp;
                <b>{{ item[2].createdBy }}</b>&nbsp;&nbsp;累计发放&nbsp;&nbsp;
                <b>{{ item[2].adjustSumAmount }}</b>&nbsp;&nbsp;权益
              </p>
            </div>
          </el-card>
          <el-card :style="{
              visibility: item[0].adjustSumAmount || item[1].adjustSumAmount ? 'visible' : 'hidden'
            }">
            <div class="clickClass" @click="goTableLeft(item)">
              <!-- <p>总增量:{{item[0].adjustSumAmount}}</p> -->
              <p>
                <span v-if="item[0].adjustSumAmount">
                  <b>{{ item[0].createdBy }}</b>&nbsp;&nbsp;累计调增&nbsp;&nbsp;
                  <b>{{ item[0].adjustSumAmount }}</b>&nbsp;&nbsp;权益</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="item[1].adjustSumAmount">
                  <b>{{ item[1].createdBy }}</b>&nbsp;&nbsp;累计调减&nbsp;&nbsp;
                  <b>{{ item[1].adjustSumAmount }}</b>&nbsp;&nbsp;权益</span>
              </p>
            </div>
          </el-card>
          <div class="timeClass">
            <div :class="item.day == nowDate ?'timeClass-active':''">{{ item.day}}</div>
            <div>{{ item.month}}</div>
          </div>
          <div v-if="item.flag" class="timeYear">{{item.year}}</div>
          <div :class="item.day == nowDate ?'timeCircle-active':'timeCircle'"></div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
import Bus from "@/util/bus";
import { adjustTotalDetailsPage } from "@/api/equity/pool";
import { formatDate } from "@/util/date";
export default {
  props: ["id"],
  data() {
    return {
      dataForm: this.id,
      equityId: "",
      supplierBusinessId: "",
      showList: [],
      incrList: [], // 增加的
      decrList: [], // 减少的
      sumIncrNum: "",
      sumdecrNum: "",
      initRecord: "",
      totalDeliver: "",
      cataName: "",
      nowDate: formatDate(new Date()).split("-")[2],
      allLoading: true
    };
  },
  mounted() {
    this.getAdjustDetailPage({
      equityId: this.dataForm.equityId,
      supplierBusinessId: this.dataForm.supplierBusinessId
    });
  },
  methods: {
    // 点击关闭
    cancel() {
      Bus.$emit("equityPool", {
        first: "list",
        third: "first"
      });
    },
    // 查看表格形式
    goTable() {
      Bus.$emit("equityPool", {
        first: "particularsTable",
        second: this.dataForm,
        five: "operation",
        six: "4"
      });
    },
    // 点击右边
    goTablePage(item) {
      if (!item[2].adjustSumAmount) {
        return;
      }
      Bus.$emit("equityPool", {
        first: "particularsTable",
        second: this.dataForm,
        four: item,
        five: "issue",
        six: "5"
      });
    },
    // 点击左边
    goTableLeft(item) {
      if (!item[0].adjustSumAmount && !item[1].adjustSumAmount) {
        return;
      }
      Bus.$emit("equityPool", {
        first: "particularsTable",
        second: this.dataForm,
        four: item,
        five: "operation",
        six: "4"
      });
    },
    // 得到数据
    getAdjustDetailPage(form) {
      adjustTotalDetailsPage(
        Object.assign({}, form, {
          current: 1,
          size: 99999
        })
      )
        .then(res => {
          res.data.data.result.map(item => {
            if (item.length == 1) {
              if (item[0].checkType == "4") {
                item.push({}, {});
              }
              if (item[0].checkType == "5") {
                item.push({}), item.unshift({});
              }
              if (item[0].checkType == "6") {
                item.unshift({}, {});
              }
            } else if (item.length == 2) {
              if (item[0].checkType == "4") {
                if (item[1].checkType == "5") {
                  item.push({});
                } else {
                  item.splice(1, 0, {});
                }
              } else if (item[0].checkType == "5") {
                item.unshift({});
              }
            }
          });
          this.showList = res.data.data.result;
          // this.showList[this.showList.length - 2][0].createdDate = "2020-7-7";
          // this.showList[this.showList.length - 1][0].createdDate = "2020-7-7";
          this.showList.map((item, index) => {
            item.flag = true;
            item.month = item[0].createdDate
              ? item[0].createdDate.split("-")[1]
              : item[1].createdDate
                ? item[1].createdDate.split("-")[1]
                : item[2].createdDate.split("-")[1];
            item.day = item[0].createdDate
              ? item[0].createdDate.split("-")[2]
              : item[1].createdDate
                ? item[1].createdDate.split("-")[2]
                : item[2].createdDate.split("-")[2];
            item.year = item[0].createdDate
              ? item[0].createdDate.split("-")[0]
              : item[1].createdDate
                ? item[1].createdDate.split("-")[0]
                : item[2].createdDate.split("-")[0];
            if (index > 0) {
              if (item.year === this.showList[index - 1].year) {
                item.flag = false;
              }
            }
          });
          this.sumIncrNum = res.data.data.totalIncrease;
          this.sumdecrNum = res.data.data.totalDecrease;
          this.totalDeliver = res.data.data.totalDeliver;
          this.cataName = res.data.data.cataName;
          this.initRecord = res.data.data.initRecord;
          this.allLoading = false;
        })
        .catch(err => {
          this.allLoading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.cancelBtn {
  // text-align: right;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 17px;
  p {
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    color: #15263A;
  }
  div {
    width: 16px;
    height: 16px;
    cursor: pointer;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
}
.supplierClass {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  & > div:nth-of-type(1) {
    display: flex;
  }
  & > div > div {
    &:nth-of-type(1) {
      padding-right: 20px;
      margin-right: 21px;
      position: relative;
      // border-right: 0.5px solid #DEDEDE;
      &::after{
        content: '';
        display: block;
        position: absolute;
        width: 1px;
        height: 68px;
        transform: scale(0.5);
        right: 0;
        top:-15px;
        background:#DEDEDE ;
      }
    }
    & > p:nth-of-type(1) {
      color: #15263a;
      font-size: 16px;
      line-height: 22px;
      font-weight: bold;
    }
    & > p:nth-of-type(2) {
      color: #999;
      font-size: 12px;
      line-height: 17px;
    }
  }
  /deep/ .el-button.is-round {
    color: #666;
  }
}
.cardClass {
  display: flex;
  margin-bottom: 120px;
  & > div {
    flex: 1;
    padding-right: 20px;
    & p:nth-of-type(1) {
      color: #323232;
      font-size: 32px;
      line-height: 38px;
    }
    & p:nth-of-type(2) {
      font-size: 14px;
      line-height: 20px;
      color: #999;
    }
  }
  & > div:nth-last-of-type(1) {
    & p:nth-of-type(1) {
      color: #fd5181;
    }
  }
  & > div:nth-last-of-type(2) {
    & p:nth-of-type(1) {
      color: #0780ff;
    }
  }
  /deep/ .el-card__body{
    padding-left: 40px;
  }
}
.showName {
  font-size: 16px;
  margin-left: 30px;
  color: #333;
  margin-top: 10px;
  margin-bottom: 10px;
  p {
    margin-bottom: 5px;
  }
  > div {
    display: flex;
    > p {
      flex: 0 0 25%;
    }
  }
}
.clickClass {
  cursor: pointer;
}
.showName p > span:nth-of-type(2) {
  font-weight: bold;
  color: rgb(92, 99, 255);
}
/* .goTable {
  text-align: center;
  margin-bottom: 10px;
} */
.timeLine {
  margin-top: 20px;
  padding-bottom: 30px;
  /deep/ .el-timeline-item__tail {
    border-left: 1px solid #eee;
    top: -80%;
    height: 300%;
  }
  & li:nth-last-of-type(1) {
    /deep/ .el-timeline-item__tail {
      height: 300%;
    }
  }
  /deep/ .el-timeline {
    margin-left: 50%;
  }
  /deep/ .el-timeline-item__wrapper {
    width: 80%;
  }
  // /deep/ .el-timeline-item__content
  /deep/ .el-timeline-item__timestamp.is-top {
    position: absolute;
    // top:10px;
    left: -68px;
    color: #999;
    // font-weight: bold;
    z-index: 999;
  }
  .el-timeline-item__content .el-card:nth-of-type(1) {
    & b {
      color: #fd5181;
    }
  }
  .el-timeline-item__content .el-card:nth-of-type(2) {
    position: absolute;
    top: 0;
    left: calc(-100% - 70px);
    z-index: 99;
    text-align: right;
    & b {
      color: #0780ff;
    }
  }
  .el-timeline-item__content .el-card:nth-of-type(2)::after {
    content: "";
    display: block;
    width: 4px;
    height: 100%;
    background: #0780ff;
    position: absolute;
    right: 0;
    top: 0;
  }
  .el-timeline-item__content .el-card:nth-of-type(1)::after {
    content: "";
    display: block;
    width: 4px;
    height: 100%;
    background: #fd5181;
    position: absolute;
    left: 28px;
    top: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  /deep/ .el-timeline-item__node--normal {
    /* border: 2px solid #999;
    width: 8px;
    height: 8px; */
    // z-index: 8888;
  }

  // 年份样式
  .timeClass {
    position: absolute;
    top: 0;
    left: -40px;
    color: #999;
    text-align: right;
    & > div:nth-of-type(1) {
      font-size: 16px;
      line-height: 22px;
    }
    & > div:nth-of-type(2) {
      font-size: 12px;
    }
    .timeClass-active {
      color: #323232;
    }
  }
  .timeYear {
    position: absolute;
    top: -40%;
    left: -60px;
    font-size: 12px;
    line-height: 17px;
    color: #999;
  }
  .timeCircle {
    position: absolute;
    left: -1px;
    top: 0;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    z-index: 9999;
    border: 2px solid #999;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
  }
  .timeCircle-active {
    position: absolute;
    left: -1px;
    top: 0;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    z-index: 9999;
    border: 2px solid #713bdb;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
  }
}
</style>
