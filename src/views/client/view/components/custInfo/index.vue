<template>
  <div class="custInfo">
    <div class="userInfo">
      <div class="userInfo-avatar">
        <img
          :src="custInfo.path"
          alt=""
        >
      </div>
      <div class="userInfo-wrap">
        <div>
          <div class="userInfo-userName">
            {{custInfo.cusName}}
          </div>
          <div class="userInfo-memberInfo">
            <div>{{custInfo.levelName}}</div>
            <div>青铜会员</div>
          </div>
        </div>
        <div class="userInfo-progress_wrap">
          <div>{{custInfo.levelName}}</div>
          <div class="progress">
            <el-progress
              :percentage="percentage"
              color="#F8B849"
              :show-text=false
            >
            </el-progress>
            <div
              class="progress-value"
              ref="progressValue"
              :style="{left:progressValue + 'px'}"
            >
              {{custInfo.asset}}
            </div>
          </div>
          <div v-if="nextLevel < 7">L{{nextLevel}}</div>
          <div v-else>max</div>
        </div>
      </div>
    </div>
    <div class="info-wrap">
      <el-row>
        <el-col
          :span="12"
          :offset="0"
          :xs="24"
          :sm="24"
          :md="12"
          style="margin-bottom:8px"
          v-for="(item,index) in infoList"
          :key="index"
        >
          <el-row>
            <el-col
              :span="8"
              class="title"
            >{{item.label}}：</el-col>
            <el-col
              :span="16"
              class="info"
            >{{item.value}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { remoteDic } from "@/api/admin/dict";
import { getCustInfo } from "@/api/client/view";
import { deepClone } from "@/util/util";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  // props: ["userInfo"],
  data() {
    return {
      idTypes: "",
      nextLevel: "",
      percentage: "",
      infoList: [
        {
          label: "客户号",
          value: "",
        },
        {
          label: "所属机构",
          value: "",
        },
        {
          label: "证件类型",
          value: "",
        },
        {
          label: "登录渠道",
          value: "",
        },
        {
          label: "证件号",
          value: "",
        },
        {
          label: "登录IP",
          value: "",
        },
        {
          label: "手机号",
          value: "",
        },
        {
          label: "上次登录时间",
          value: "",
        },
      ],
    };
  },
  computed: {
    ...mapState("view", ["custInfo"]),
    progressValue: function () {
      let val = (this.percentage / 100) * 235 - 25;
      return val;
    },
  },
  mounted() {},
  methods: {
    getPercentage() {
      let data = parseFloat(this.custInfo.aumValue) * 100;
      if (data >= 0) {
        if (data > 100) {
          this.percentage = 100;
        } else {
          this.percentage = data;
        }
      } else {
        this.percentage = 0;
      }
    },
    getNextLevel() {
      this.nextLevel = Number(this.custInfo.levelName.substring(1)) + 1;
    },
    getDicLabel(value) {
      let re = "";
      this.idTypes.forEach((obj) => {
        if (obj.value == value) {
          re = obj.label;
          return;
        }
      });
      return re;
    },
    async getInfoList() {
      let res = await remoteDic("id_type");
      this.idTypes = res.data.data.id_type;
      if (this.custInfo) {
        this.getPercentage();
        this.getNextLevel();
        let data = deepClone(this.custInfo);
        this.infoList.map((item) => {
          switch (item.label) {
            case "客户号":
              item.value = data.custNo;
              break;
            case "所属机构":
              item.value = data.affiliation;
              break;
            case "证件类型":
              item.value = this.getDicLabel(data.idType);
              break;
            case "登录渠道":
              item.value = data.custNo;
              break;
            case "证件号":
              item.value = data.idNumber;
              break;
            case "登录IP":
              item.value = data.lastLoginIpAddress;
              break;
            case "手机号":
              item.value = data.phoneNumber;
              break;
            case "上次登录时间":
              item.value = data.lastLoginTime;
              break;
          }
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.custInfo {
  box-sizing: border-box;
  width: 100%;
  // height: 278px;
  background-image: url("../../../../../static/custInfo.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 32px 33px 28px 33px;
  margin-bottom: 20px;
  .userInfo {
    display: flex;
    .userInfo-avatar {
      width: 78px;
      height: 78px;
      border-radius: 50%;
      background: #c0c4cc;
      margin-right: 20px;
      margin-bottom: 28px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .userInfo-wrap {
      flex: 1;
      > div:first-child {
        display: flex;
        margin-bottom: 30px;
        .userInfo-userName {
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #ffffff;
          margin-right: 20px;
          line-height: 20px;
        }
        .userInfo-memberInfo {
          display: flex;
          align-items: center;
          font-family: Helvetica-Bold;
          font-size: 12px;
          background: #f7dabe;
          color: #cba482;
          width: 80px;
          height: 20px;
          border-radius: 20px;
          > div {
            text-align: center;
            &:first-child {
              width: 18px;
              height: 18px;
              // display: inline-block;
              border-radius: 50%;
              background: #fff7e2;
              margin-right: 6px;
              text-align: center;
            }
          }
        }
      }
      .userInfo-progress_wrap {
        display: flex;
        align-items: center;
        .progress {
          margin: 0 4px;
          position: relative;

          ::v-deep .el-progress {
            width: 235px;
            .el-progress-bar__outer {
              background-color: rgba(255, 255, 255, 0.38);
              overflow: visible;
              .el-progress-bar__inner {
                &::before {
                  content: "";
                  display: block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: rgba(255, 255, 255, 0.8);
                  position: absolute;
                  top: -1.5px;
                  right: 0;
                }
                &::after {
                  content: "";
                  display: block;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background: rgba(248, 184, 73, 0.4);
                  position: absolute;
                  top: -5.5px;
                  right: -4px;
                }
              }
            }
          }
          .progress-value {
            width: 50px;
            text-align: center;
            position: absolute;
            top: -28px;
          }
        }
        > div {
          font-family: BebasNeue-Bold;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }

  .info-wrap {
    margin: 0 0 0 98px;
    .el-col {
      margin-bottom: 0;
    }
    .title {
      opacity: 0.7;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #ffffff;
    }
    .info {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #eef0ff;
    }
  }
}
</style>