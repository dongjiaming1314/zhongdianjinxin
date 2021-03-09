<template>
  <basic-container
    style="position: relative;"
    v-loading="loading"
  >
    <!--    <div style="border: 2px solid #5943fd;position: absolute;height: 94%;width: 95%;">-->
    <!--      <div style="border-left: 2px solid #fff;position: absolute;left: -2px;top: 10%;height: 80%"></div>-->
    <!--      <div style="border-top: 2px solid #fff;position: absolute;top: -2px;left: 10%;width: 80%"></div>-->
    <!--      <div style="border-right: 2px solid #fff;position: absolute;right: -2px;top: 10%;height: 80%"></div>-->
    <!--      <div style="border-bottom: 2px solid #fff;position: absolute;bottom: -2px;left: 10%;width: 80%"></div>-->
    <!--    </div>-->
    <div class="img">
      <div class="itemWrapper">
        <div class="tips">
          <div class="tip-item">
            <div
              class="line"
              style="color:#ffffff"
            > ---- </div>
            <div>升级阈值</div>
          </div>
          <!-- <div class="tip-item">
            <div
              class="line"
              style="color:#8AC0FF"
            > —— </div>
            <div>等级上限值</div>
          </div> -->
          <div class="tip-item">
            <div class="line"> ---- </div>
            <div>降级阈值</div>
          </div>
        </div>
        <div
          id="ref_chart"
          style="width: 750px;height: 800px;margin:0 auto;z-index: 20;"
        >
        </div>
      </div>
      <div style="position:relative;height:100px;top:-202px">
        <div class="box">
          <div class="arrow-up"></div>
          <div class="arrow-down"></div>
          <svg
            class="rect"
            width="100%"
            height="100%"
          >
            <defs>
              <linearGradient
                id="myLinear"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
                spreadMethod="pad"
              >
                <stop
                  offset="80%"
                  stop-color="#644BFF"
                  stop-opacity="1"
                />
                <stop
                  offset="100%"
                  stop-color="#459aff"
                  stop-opacity="1"
                />
              </linearGradient>
              <filter
                id="filt"
                x="0"
                y="0"
                width="200%"
                height="200%"
              >
                <feoffset
                  result="offOut"
                  in="SourceGraphic"
                  dx="20"
                  dy="20"
                ></feoffset>
                <fegaussianblur
                  result="blurOut"
                  in="offOut"
                  stddeviation="10"
                ></fegaussianblur>
                <feblend
                  in="SourceGraphic"
                  in2="blurOut"
                  mode="normal"
                ></feblend>
              </filter>
            </defs>
            <!-- filter="url(#filt)" -->
            <polygon
              points="0,0  600,0  400,100 200,100"
              fill="url(#myLinear)"
              opacity="1"
            />
          </svg>
          <div class="title">
            <div style="color: #ffffff;width: 100%;text-align: center;">
              成长体系管理
            </div>
            <div style="color: rgba(232,234,239,0.68);width: 100%;text-align: center;">
              Growth management system
            </div>
          </div>
        </div>
      </div>
      <div class="bottomWrapper">
        <span>点击图片查询信息</span>
      </div>
      <GrowthLevel
        ref="ref_growthLevel"
        @getList="initChart"
      ></GrowthLevel>
      <EquityConfig
        ref="ref_equityConfig"
        @getList="initChart"
      ></EquityConfig>
      <ThresholdSetting
        ref="ref_thresholdSetting"
        @getList="initChart"
      ></ThresholdSetting>
    </div>
  </basic-container>
</template>

<script type="text/jsx">
import echarts from "echarts";
import GrowthLevel from "./GrowthLevel";
import EquityConfig from "./EquityConfig";
import ThresholdSetting from "./ThresholdSetting";
import { getInfoList } from "@/api/growthSystem/reminderSetting";

export default {
  name: "index",
  components: { GrowthLevel, EquityConfig, ThresholdSetting },
  data() {
    return {
      isShow: false,
      chart: null,
      valueName: "",
      loading: true,
    };
  },
  // computed: {
  //   ...mapGetters(['permissions']),
  //   permissionList() {
  //     return {
  //       viewBtn: this.vaildData(this.permissions.growth_reminderSetting_view),
  //       addBtn: this.vaildData(this.permissions.growth_reminderSetting_add),
  //       editBtn: this.vaildData(this.permissions.growth_reminderSetting_edit),
  //       delBtn: this.vaildData(this.permissions.growth_reminderSetting_del),
  //     };
  //   }
  // },
  mounted() {
    window.addEventListener("resize", () => {
      if (this.chart) {
        this.chart.resize();
      }
    });
    this.initChart();
    window.levelClick = this.levelClick;
    window.equityClick = this.equityClick;
    window.thresholdClick = this.thresholdClick;
    window.delClick = this.delClick;
  },
  methods: {
    // const dataList = [
    //   {value: 10, name: 'value1', id: '1',up: '12', down: '25'},
    //   {value: 20, name: 'value2', id: '2',up: '23', down: '26'},
    //   {value: 30, name: 'value3', id: '3',up: '33', down: '36'},
    //   {value: 40, name: 'value4', id: '4',up: '45', down: '49'},
    //   {value: 50, name: 'value5', id: '5',up: '51', down: '56'},
    //   {value: 60, name: 'value6', id: '6',up: '62', down: '68'}
    // ];
    initChart() {
      this.loading = true;
      getInfoList()
        .then((res) => {
          const dataList = [];
          const markLineList = [];
          const colorList = [];
          const markPointList = [];
          if (res.data.data.length) {
            const dataListCopy = res.data.data;
            /**
             * 漏斗图三角形底宽600，向右偏移了75，高520，向下偏移80
             * d为漏斗图每条数据的宽度 在除以 2
             */
            const d = 520 / dataListCopy.length / 2;
            dataListCopy.forEach((item, index) => {
              if (index === 0) {
                colorList.push(`rgb(76,249,255)`);

                markLineList.push(
                  /**
                   * 右边线条位置，以漏斗图最高点中心点为基准（375,80）,漏斗图近似为等边三角形
                   * x = 漏斗图基准点x轴 到 每条数据右边顶点的距离 + 每条数据底边的一半与上条数据底边的一半 之差 除以 2
                   * y = 基准点到每条数据的底边距离 - d/4
                   */
                  [
                    {
                      // 根号3 = 1.73
                      x: 375 + (2 * d * index) / 1.73 + d / 1.73,
                      y: 80 + 2 * d * (index + 1) - d / 4,
                    },
                    {
                      x: 375 + (2 * d * (index + 1)) / 1.73,
                      y: 80 + 2 * d * (index + 1) - d / 4,
                      value: item.downAum,
                      label: { position: "end", color: "#666666" },
                    },
                  ],
                  //第一项不显示上升阈值
                  [
                    {
                      x: 0,
                      y: 0,
                    },
                    {
                      x: 0,
                      y: 0,
                    },
                  ],
                  [
                    {
                      x: "50%",
                      y: 80 + d * (2 * (index + 1) - 1),
                    },
                    {
                      x: "50%",
                      y: 80 + d * (2 * (index + 1) - 1),
                      value: item.levelName,
                      label: { color: "#fff", fontSize: 18 },
                    },
                  ]
                );
              } else {
                //最后一项 ：rgb(91,69,255)  第一项：rgb(76,249,255)
                let R = 76 + (15 / dataListCopy.length) * (index + 1);
                let G = 249 - (180 / dataListCopy.length) * (index + 1);
                let B = 255;
                colorList.push(`rgb(${R},${G},${B})`);

                markLineList.push(
                  /**
                   * 右边线条位置，以漏斗图最高点中心点为基准（375,80）,漏斗图近似为等边三角形
                   * x = 漏斗图基准点x轴 到 每条数据右边顶点的距离 + 每条数据底边的一半与上条数据底边的一半 之差 除以 2
                   * y = 基准点到每条数据的底边距离 - d/4
                   */
                  [
                    {
                      // 根号3 = 1.73
                      x: 375 + (2 * d * index) / 1.73 + d / 1.73,
                      y: 80 + 2 * d * (index + 1) - d / 4,
                    },
                    {
                      x: 375 + (2 * d * (index + 1)) / 1.73,
                      y: 80 + 2 * d * (index + 1) - d / 4,
                      value: item.downAum,
                      label: { position: "end", color: "#666666" },
                    },
                  ],
                  [
                    {
                      x: 375 - (2 * d * (index + 1)) / 1.73 + d / 1.73,
                      y: 80 + 2 * d * (index + 1) - 1.5 * d,
                    },
                    {
                      x: 375 - (2 * d * index) / 1.73,
                      y: 80 + 2 * d * (index + 1) - 1.5 * d,
                      value: item.upAum,
                      label: { position: "start", color: "#666666" },
                      lineStyle: { color: "#fff" },
                    },
                  ],
                  [
                    {
                      x: "50%",
                      y: 80 + d * (2 * (index + 1) - 1),
                    },
                    {
                      x: "50%",
                      y: 80 + d * (2 * (index + 1) - 1),
                      value: item.levelName,
                      label: { color: "#fff", fontSize: 18 },
                    },
                  ]
                );
              }

              dataList.push({
                value: (1 + index) * 10,
                name: item.aum,
                id: item.id,
                levelCode: item.levelCode,
                levelName: item.levelName,
              });
            });
          } else {
            dataList.push({
              value: "100",
              name: "0",
              id: "",
            });
            markLineList.push(
              [
                {
                  x: "50%",
                  y: "60%",
                },
                {
                  x: "85%",
                  y: "60%",
                  value: 0,
                },
              ],
              [
                {
                  x: "50%",
                  y: "30%",
                },
                {
                  x: "15%",
                  y: "30%",
                  value: 0,
                },
              ]
            );
            colorList.push(`rgb(85,141,255)`);
          }
          this.chart = echarts.init(document.getElementById("ref_chart"));
          // this.chart.on('click', function (param) {
          //   console.log(param.event.offsetX, param.event.offsetX);
          // })
          const option = {
            color: colorList,
            title: {
              text: "AUM（万元）",
              textAlign: "center",
              top: 575,
              left: 130,
              textStyle: {
                color: "rgba(255,255,255,0.7)",
                fontWeight: "normal",
                fontSize: 12,
              },
              // backgroundColor: '#fff',
              // shadowColor: '#00F8FF',
              // shadowBlur: 10,
              // subtext: '纯属虚构'
            },
            tooltip: {
              trigger: "item",
              extraCssText: "z-index: 2000",
              triggerOn: "click",
              enterable: true,
              hideDelay: 500,
              backgroundColor: "transparent",
              position: "inside",
              formatter: (param) => {
                // param = JSON.stringify(param)
                // param = JSON.parse(param)
                return (
                  '<div style="background-image: linear-gradient(to right, #47e5ee , #3f98fe);padding: 2px;border-radius: 3px"><div style="display: inline-block;color: #fff;pointer-events: all;cursor: pointer;text-align: center;padding: 5px 8px;border-right: 1px solid #a1a0a0" onclick="window.levelClick(\'' +
                  param.data.id +
                  "')\">客户等级</div>" +
                  '<div style="display: inline-block;color: #fff;pointer-events: all;cursor: pointer;text-align: center;padding: 5px 8px;border-right: 1px solid #a1a0a0" onclick="window.equityClick(\'' +
                  param.data.id +
                  "," +
                  param.data.levelCode +
                  "," +
                  param.data.levelName +
                  "')\">权益发放</div>" +
                  '<div style="display: inline-block;color: #fff;pointer-events: all;cursor: pointer;text-align: center;padding: 5px 8px;border-right: 1px solid #a1a0a0" onclick="window.thresholdClick(\'' +
                  param.data.id +
                  "')\">阈值设置</div>"
                );
              },
            },
            // toolbox: {
            //   feature: {
            //     dataView: {readOnly: false},
            //     restore: {},
            //     saveAsImage: {}
            //   }
            // },
            xAxis: {
              axisLine: {
                show: false,
              },
            },
            yAxis: {
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
            },
            series: [
              {
                name: "漏斗图",
                type: "funnel",
                left: 75,
                top: 80,
                bottom: 200,
                width: "80%",
                min: 0,
                max: dataList[dataList.length - 1].value,
                minSize: "0%",
                maxSize: "100%",
                sort: "ascending",
                gap: 0,
                label: {
                  show: true,
                  position: "leftTop",
                  color: "#009AFF",
                },
                labelLine: {
                  length: 10,
                  lineStyle: {
                    width: 1,
                    type: "solid",
                  },
                },
                itemStyle: {
                  borderWidth: 0,
                  shadowBlur: 50,
                  shadowColor: "#5681FF",
                  shadowOffsetX: 10,
                  shadowOffsetY: 10,
                  opacity: 1,
                },
                // silent:true,
                emphasis: {
                  label: {
                    fontSize: 20,
                  },
                },
                xAxis: {
                  show: false,
                  splitLine: {
                    show: false,
                  },
                },
                yAxis: {
                  show: false,
                  axisLine: {
                    show: false,
                  },
                  axisTick: {
                    show: false,
                  },
                },
                data: dataList,
                markLine: {
                  silent: true,
                  symbol: "none",
                  // label: {
                  //   position: 'middle',
                  // },
                  lineStyle: {
                    type: "dashed",
                    color: "#666666",
                  },
                  data: markLineList,
                },
              },
            ],
          };
          this.chart.setOption(option);
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res);
        });
    },
    levelClick(_id) {
      this.$refs["ref_growthLevel"].openWin(_id);
    },
    equityClick(id) {
      let _id = "";
      let _code = "";
      let _name = "";
      _id = id.split(",")[0];
      _code = id.split(",")[1];
      _name = id.split(",")[2];
      this.$refs["ref_equityConfig"].openWin(_id, _code, _name);
    },
    thresholdClick(_id) {
      this.$refs["ref_thresholdSetting"].openWin(_id);
    },
    // delClick(_id) {
    //   this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     delLevel(_id).then(res => {
    //       this.$message.success(res.data.msg)
    //       this.initChart()
    //     }).catch(res => {
    //       this.$message.error(res)
    //     })
    //   })
    // }
  },
};
</script>

<style scoped lang="scss">
.itemWrapper {
  position: relative;
  .tips {
    position: absolute;
    top: 30px;
    left: 220px;
    .tip-item {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #666666;
      width: 150px;
      display: flex;
      align-items: center;
      .line {
        background: #3bf9fe;
        border-radius: 4px;
        width: 40px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        margin-right: 10px;
      }
    }
  }
  #ref_chart {
    background-image: url("../../../static/growth.svg");
    background-repeat: no-repeat;
    background-position: 100% 52%;
  }
}
.box {
  position: absolute;
  width: 600px;
  height: 100px;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  margin: auto;
  .arrow-up {
    width: 280px;
    height: 1px;
    background: linear-gradient(135deg, #5e48ff 0, #4afbff 100%);
    position: relative;
    transform: rotate(-60deg);
    top: -390px;
    left: 20px;
    opacity: 0.7;
    &::after {
      content: "";
      position: absolute;
      right: -8px;
      top: -3.5px;
      border: 4px solid transparent;
      border-left-color: #47c8f6;
      border-left: 8px solid #47c8f6;
      opacity: 0.7;
    }
  }
  .arrow-down {
    width: 280px;
    height: 1px;
    background: linear-gradient(135deg, #4afbff 0, #5e48ff 100%);
    position: relative;
    transform: rotate(60deg);
    top: -150px;
    left: 420px;
    opacity: 0.7;
    &::after {
      content: "";
      position: absolute;
      right: -8px;
      top: -3.5px;
      border: 4px solid transparent;
      border-left-color: #5e48ff;
      border-left: 8px solid #5e48ff;
    }
  }
  .title {
    z-index: 100;
    position: absolute;
    left: 0;
    top: 25px;
    right: 0;
    margin: auto;
  }
}

.img {
  position: relative;
  height: 100%;
  width: 100%;
  display: block;
  // animation: anim 5s ease-out infinite;
  // -webkit-animation: anim 5s ease-out infinite; /*Safari and Chrome*/
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("../../../assets/images/rang.png");
    background-size: 100%;
    background-repeat: no-repeat;
    opacity: 0.7;
  }
}

@keyframes anim {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.bottomWrapper {
  margin: 0 auto;
  width: 369px;
  height: 70px;
  background: linear-gradient(135deg, #48eaef 0, #459aff 100%);
  box-shadow: 0 5px 20px 0 #48eaef;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #ffffff;
  line-height: 70px;
  text-align: center;
  border-radius: 8px;
  position: relative;
  top: -120px;
  &::after {
    position: absolute;
    content: "";
    top: -20px;
    left: calc(50% - 5px);
    border: 10px solid transparent;
    border-bottom-color: #47c8f6;
  }
}
</style>
