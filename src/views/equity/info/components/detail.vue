<template>
    <div class="indexDetail">
        <el-row>
            <el-col :span="24">
                <h3 class="title buttonCover">
                    <span>权益信息详情</span>
                    <el-button type="primary" size="small" @click="closeFn">关闭</el-button>
                </h3>
            </el-col>
        </el-row>
        <div>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="权益基本信息" name="first" class="leftCover">
                    <detail-info :detailData="detailData" />
                </el-tab-pane>
                <el-tab-pane label="权益展示配置" name="second" class="rightCover">
                    <show-info :previewForm="previewForm"></show-info>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Bus from "@/util/bus.js";
import detailInfo from "./info";
import showInfo from "./show";
import { remoteDic } from "@/api/admin/dict";
import { fetchList } from "@/api/equity/info";
export default {
  name: "equityDetail",
  props: ["id", "selectRadio", "checkStatus"],
  components: {
    detailInfo,
    showInfo
  },
  data() {
    return {
      equityTypeList: [],
      channelList: [],
      activeName: "first",
      previewForm: {
        displayName: "",
        displayFullName: "",
        useIntroduction: "",
        playData: [],
        detailUrl: ""
      },
      detailData: {} //权益详情
    };
  },
  created() {
    this.getDetail();
    console.log(this.id,this.selectRadio)
  },
  computed: {
    // checkStatus() {
    //     let middle = "";
    //     if (this.selectRadio === "first") {
    //         middle = "7"; //查询列表编辑
    //     } else if (this.selectRadio === "second") {
    //         middle = "1"; //申请列表编辑
    //     }
    //     return middle;
    // },
  },
  methods: {
    // 获取权益详情
    getDetail() {
      // 获取权益类型
      remoteDic("equity_type,equity_available_channels").then(res => {
        this.equityTypeList = res.data.data.equity_type;
        this.channelList = res.data.data["equity_available_channels"];
        fetchList(
          Object.assign({
            equityId: this.id,
            checkStatus: this.checkStatus
          })
        ).then(res => {
          this.detailData = res.data.data.records[0];
          // 单独处理权益类型
          // 单独处理可用渠道
          if (res.data.data.records[0]["equityType"]) {
            let middle = this.equityTypeList.filter(
              item => item.value === res.data.data.records[0]["equityType"]
            );
            this.detailData["type"] = middle.length
              ? middle[0]["label"]
              : res.data.data.records[0]["equityType"];
          }
          if (res.data.data.records[0]["availChan"]) {
            let middle = this.channelList.filter(
              item => item.value === res.data.data.records[0]["availChan"]
            );
            this.detailData["availChanType"] = middle.length
              ? middle[0]["label"]
              : res.data.data.records[0]["availChan"];
          }
          this.previewForm = res.data.data.records[0];
          this.previewForm["detailUrl"] = res.data.data.records[0][
            "detailPicture"
          ]
            ? res.data.data.records[0]["detailPicture"]["url"]
            : "";
          this.previewForm["iconUrl"] = res.data.data.records[0]["displayIcon"]
            ? res.data.data.records[0]["displayIcon"]["url"]
            : "";
          this.previewForm["playData"] = res.data.data.records[0][
            "displayPictures"
          ].length
            ? res.data.data.records[0]["displayPictures"]
            : [];
        });
      });
    },
    // 关闭详情页
    closeFn() {
      Bus.$emit("equityInfo", {
        first: "list",
        second: null,
        third: this.selectRadio,
        fourth: null
      });
    }
  }
};
</script>

<style scoped lang="scss">
.indexDetail {
  > .avue-crud {
    ::v-deep .avue-crud__menu {
      min-height: 0;
      margin-bottom: 0;
    }
  }

  .title {
    border-left: 4px solid #0780ff;
    padding-left: 8px;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .buttonCover {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: none;
    margin: 0;
    height: 56px;
    span {
      border-left: 4px solid #0780ff;
      padding-left: 8px;
    }
  }
}
</style>