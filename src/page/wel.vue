<template>
  <div style="padding: 10px">
    <!--    <h3 style="padding-left: 10px">数量统计</h3>-->
    <div>
      <el-row :gutter="20" style="margin: 0">
        <el-col :span="16" style="min-width: 626px">
          <el-row :gutter="20" style="margin: 0">
            <el-col :span="12" style="padding-left: 0">
              <basic-container>
                <div class="order">
                  <div style="flex: 2;text-align: center;border-right: 1px solid #d5d8de">
                    <div style="font-family: fantasy;color: #fff;font-size: 20px">{{ equityTotal }}</div>
                    <div style="color: #d5d8de">权益订单总数</div>
                  </div>
                  <div style="flex: 3;margin-left: 10px">
                    <div style="font-family: fantasy;color: #fff;font-size: 20px">{{ dayTotal }}</div>
                    <div style="color: #d5d8de">当天总数</div>
                  </div>
                </div>
              </basic-container>
            </el-col>
            <el-col :span="12" style="padding-right: 0">
              <basic-container>
                <div class="startUp">
                  <div style="flex: 2;text-align: center">
                    <div style="font-family: fantasy;color: #fff;font-size: 20px">{{ startUp }}</div>
                    <div style="color: #d5d8de">权益启用个数</div>
                  </div>
                  <div style="flex: 3;"></div>
                </div>
              </basic-container>
            </el-col>
            <el-col :span="12" style="padding-left: 0">
              <basic-container>
                <div style="padding: 10px 20px;border-bottom: 1px solid #dae2ea">
                  <h3 style="display: inline-block">活动到期提醒</h3>
                  <span class="icon-span">
                    <i class="el-icon-arrow-right"></i>
                  </span>
                </div>
                <div style="height: 200px;display: flex">
                  <div style="flex: 1;font-size: 36px;font-family: fantasy;color: #a9b3bd;text-align: center"> 0
                  </div>
                  <div style="flex: 4;">
                    <!-- <el-scrollbar style="height: 220px">
                      <div class="remind" v-for="item in remindList" :key="item.id">
                        <div>
                          <span :title="item.actName">{{ item.actName | toActName }}</span>
                          <span style="float: right;color: #b0b2b6">
                           <i class="el-icon-switch-button"></i>
                          {{ item.actEndTime }}
                        </span>
                        </div>
                        <div class="remind-pa">
                          <div class="remind-ch" :style="{width: item.width + '%'}"></div>
                        </div>
                      </div>
                    </el-scrollbar> -->
                  </div>
                </div>
              </basic-container>
            </el-col>
            <el-col :span="12" style="padding-right: 0">
              <basic-container>
                <div style="padding: 10px 20px;border-bottom: 1px solid #dae2ea">
                  <h3 style="display: inline-block">权益库存预警</h3>
                  <span class="icon-span">
                    <i class="el-icon-arrow-right"></i>
                  </span>
                </div>
                <div style="height: 200px;position: relative">
                  <div style="position:absolute;;font-size: 36px;font-family: fantasy;color: #a9b3bd;left: 5%">{{
                    warningNum }}
                  </div>
                  <div class="block">
                    <el-carousel trigger="click" height="220px">
                      <el-carousel-item v-for="item in warningList" :key="item">
                        <div v-for="(item1, index) in item" class="carousel-item" :key="index"
                             :style="{top: index === 0 ? '20%' : (index === 1 ? '30%' : '40%'), left: index === 0 ? '42%' : (index === 1 ? '15%' : '68%')}">
                          <div class="icon-rang">
                            <img
                              style="display: block;width: 32px;height: 32px;padding: 5px 0;margin: 0 auto;line-height: 50px"
                              :src="item1.displayIcon.url" alt="">
                          </div>
                          <div>剩余：{{ item1.equityInventory }}</div>
                        </div>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
              </basic-container>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" style="min-width: 313px">
          <basic-container>
            <div style="padding: 10px 20px;border-bottom: 1px solid #dae2ea">
              <el-badge :value="16" :max="99">
                <h3 style="display: inline-block">任务栏</h3>
              </el-badge>
              <span class="icon-span">
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
            <div style="height: 308px">
              <div class="flex-div" style="border-bottom: 1px solid #dae2ea">
                <div style="flex: 1.5">
                  <div class="hdsj"></div>
                </div>
                <div style="flex: 4">
                  <div>活动上架</div>
                  <div style="font-size: 12px;color: #79838d">待办事项</div>
                </div>
                <div style="flex: 1">
                  <el-badge :value="8" :max="99"></el-badge>
                </div>
              </div>
              <div class="flex-div" style="border-bottom: 1px solid #dae2ea">
                <div style="flex: 1.5">
                  <div class="hdgl"></div>
                </div>
                <div style="flex: 4">
                  <div>活动管理</div>
                  <div style="font-size: 12px;color: #79838d">待办事项</div>
                </div>
                <div style="flex: 1">
                  <el-badge :value="5" :max="99"></el-badge>
                </div>
              </div>
              <div class="flex-div" style="border-bottom: 1px solid #dae2ea">
                <div style="flex: 1.5">
                  <div class="gys"></div>
                </div>
                <div style="flex: 4">
                  <div>供应商管理</div>
                  <div style="font-size: 12px;color: #79838d">待办事项</div>
                </div>
                <div style="flex: 1">
                  <el-badge :value="3" :max="99"></el-badge>
                </div>
              </div>
              <div class="flex-div">
                <div style="flex: 1.5">
                  <div class="cztx"></div>
                </div>
                <div style="flex: 4">
                  <div>成长体系</div>
                  <div style="font-size: 12px;color: #79838d">待办事项</div>
                </div>
                <div style="flex: 1">
                  <el-badge :value="0" :max="99"></el-badge>
                </div>
              </div>
            </div>
          </basic-container>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-row :gutter="20" style="margin: 0">
        <el-col :span="16" style="min-width: 626px">
          <basic-container>
            <div style="padding: 10px 20px;border-bottom: 1px solid #dae2ea">
              <h3 style="display: inline-block">权益明细统计</h3>
              <span class="icon-span">
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
            <div style="display: flex">
              <div style="flex: 1">
                <RadioText
                  style="float: right"
                  :options="statusOptions"
                  newName=" "
                  @change="switchStatus"
                ></RadioText>
              </div>
              <div style="flex: 1;padding: 5px 10px">
                <el-date-picker
                  style="float: right"
                  v-model="timeList"
                  type="daterange"
                  size="small"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="switchStatus">
                </el-date-picker>
              </div>
            </div>
            <div id="ref_bar" style="height: 305px"></div>
          </basic-container>
        </el-col>
        <el-col :span="8" style="min-width: 313px">
          <basic-container>
            <div style="padding: 10px 20px;border-bottom: 1px solid #dae2ea">
              <h3 style="display: inline-block">成长等级</h3>
              <span class="icon-span">
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
            <div class="rang">
              <div style="position:absolute;top: 60px">
                <el-row :gutter="20" style="margin: 0 auto;width: 80%;background: #eff3f8">
                  <el-col :span="12" class="charts-col">
                    <span></span>
                    <span>客户数量</span>
                    <span style="color: #5B45FF">{{ custAmount }}</span>
                  </el-col>
                  <el-col :span="12" class="charts-col">
                    <span></span>
                    <span>权益数量</span>
                    <span style="color: #5B45FF">{{ equityAmount }}</span>
                  </el-col>
                  <el-col :span="12" class="charts-col">
                    <span></span>
                    <span>领取量</span>
                    <span style="color: #5B45FF">{{ acquireAmount }}</span>
                  </el-col>
                  <el-col :span="12" class="charts-col">
                    <span></span>
                    <span>使用量</span>
                    <span style="color: #5B45FF">{{ useAmount }}</span>
                  </el-col>
                </el-row>
              </div>
              <div id="ref_chart" ref="ref_chart" style="height: 354px;width: 293px;margin: 0 auto"></div>
              <div style="width: 293px;margin: auto">
                <svg
                  class="rect"
                  width="293px"
                  height="40px"
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
                    points="30,0  265,0  200,40 100,40"
                    fill="url(#myLinear)"
                    opacity="1"
                  />
                </svg>
                <div style="position: absolute;bottom: 58px;color: #fff;width: 293px;text-align: center">成长体系管理</div>
              </div>
            </div>
          </basic-container>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import echarts from "echarts";
  import RadioText from '@/components/RadioText'
  import {getInfoList} from "@/api/growthSystem/reminderSetting";
  import {
    getActiveEquityAmount,
    getInventory,
    getStatistics,
    getCustLevelDetail,
    getDueActivities
  } from '@/api/homePage/index'

  export default {
    filters: {
      toActName: function (val) {
        return val.length < 7 ? val : val.substr(0,7)+'...'
      }
    },
    components: {RadioText},
    data() {
      return {
        equityTotal: 58795,
        dayTotal: 75,
        startUp: 0,
        remindNum: 0,
        timeList: [],
        remindList: [],
        warningList: [],
        warningNum: 0,
        echartsBar: null,
        chart: null,
        custAmount: 0,
        equityAmount: 0,
        acquireAmount: 0,
        useAmount: 0,
        searchForm: {
          datePeriod: '',
          startTime: '',
          endTime: ''
        },
        statusOptions: [{
          id: '1',
          label: '全年'
        }, {
          id: '2',
          label: '本月'
        }, {
          id: '3',
          label: '本周'
        }],
      };
    },
    mounted() {
      this.equityTotal = this.equityTotal.toLocaleString();
      this.dayTotal = this.dayTotal.toLocaleString();
      window.addEventListener("resize", () => {
        if (this.echartsBar) {
          this.echartsBar.resize();
        }
        // if (this.chart) {
        //   this.chart.resize();
        // }
      })
      this.initChartBar()
      this.initChart()
      this.getInfo()
    },
    methods: {
      switchStatus(val) {
        if (val.length === 2) {
          this.searchForm.datePeriod = '';
          this.searchForm.startTime = val[0];
          this.searchForm.endTime = val[1];
        } else {
          this.timeList = [];
          this.searchForm.startTime = '';
          this.searchForm.endTime = '';
          this.searchForm.datePeriod = val
        }
        this.initChartBar()
      },
      getInfo() {
        // 获取启用个数
        getActiveEquityAmount().then(res => {
          this.startUp = res.data.data.toLocaleString()
        }).catch(res => {
          this.$message.error(res)
        })
        // 获取权益库存预警
        getInventory().then(res => {
          res.data.data.forEach(item => {
            this.warningNum += item.length
          })
          this.warningList = res.data.data
        }).catch(res => {
          this.$message.error(res)
        })
        // 获取活动到期提醒
        getDueActivities().then(res => {
          this.remindNum = res.data.data.length.toLocaleString()
          res.data.data.forEach(item => {
            this.remindList.push({
              actName: item.actName,
              actEndTime: item.actEndTime,
              width: item.dueRotate > 1 ? '100' : (item.dueRotate*100).toString()
            })
          })
        }).catch(res => {
          this.$message.error(res)
        })
      },
      initChartBar() {
        let equityName = []
        let equityInventory = []
        let releasedEquityAmount = []
        let usedEquityAmount = []
        // 获取权益库存告警量
        getStatistics(this.searchForm).then(res => {
          const newList = res.data.data
          if (res.data.data.length > 8) {
            for (let i = 0; i < 8; i++) {
              equityName.push(newList[i].equityName ? newList[i].equityName : '')
              equityInventory.push(newList[i].equityInventory ? newList[i].equityInventory : 0)
              releasedEquityAmount.push(newList[i].releasedEquityAmount ? newList[i].releasedEquityAmount : 0)
              usedEquityAmount.push(newList[i].usedEquityAmount ? newList[i].usedEquityAmount : 0)
            }
          } else {
            for (let i = 0; i < newList.length; i++) {
              equityName.push(newList[i].equityName ? newList[i].equityName : '')
              equityInventory.push(newList[i].equityInventory ? newList[i].equityInventory : 0)
              releasedEquityAmount.push(newList[i].releasedEquityAmount ? newList[i].releasedEquityAmount : 0)
              usedEquityAmount.push(newList[i].usedEquityAmount ? newList[i].usedEquityAmount : 0)
            }
          }
          this.echartsBar = echarts.init(document.getElementById('ref_bar'))
          const optionBar = {
            color: ['#496DFF', '#993DFF', '#3DE2FF'],
            legend: {
              right: 20
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '5%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: equityName,
                axisTick: false,
                // axisLine: {
                //   lineStyle: {
                //     color: 'rgb(140,140,141)',
                //   }
                // },
                axisLabel: {
                  interval: 0,
                  // rotate:40,
                  formatter: function (value) {
                    return value.length < 3 ? value : value.substr(0, 3) + '...'
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisTick: false,
                splitLine: false,
                axisLine: {
                  show: false //y轴线消失
                },
              }
            ],
            series: [
              {
                name: '权益库存',
                type: 'bar',
                barWidth: 12,
                data: equityInventory,
                itemStyle: {
                  emphasis: {
                    barBorderRadius: 10
                  },
                  // normal: {
                  //   barBorderRadius: [5, 5, 0, 0],
                  //   color: function (params) {
                  //     const colorList = ['#fb5081', '#fb5081', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe'];
                  //     return colorList[params.dataIndex]
                  //   }
                  // }
                }
              }, {
                name: '权益发放',
                type: 'bar',
                barWidth: 10,
                data: releasedEquityAmount,
                itemStyle: {
                  emphasis: {
                    barBorderRadius: 10
                  },
                  // normal: {
                  //   barBorderRadius: [5, 5, 0, 0],
                  //   color: function (params) {
                  //     const colorList = ['#fb5081', '#fb5081', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe'];
                  //     return colorList[params.dataIndex]
                  //   }
                  // }
                }
              }, {
                name: '权益使用',
                type: 'bar',
                barWidth: 10,
                data: usedEquityAmount,
                itemStyle: {
                  emphasis: {
                    barBorderRadius: 10
                  },
                  // normal: {
                  //   barBorderRadius: [5, 5, 0, 0],
                  //   color: function (params) {
                  //     const colorList = ['#fb5081', '#fb5081', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe', '#486cfe'];
                  //     return colorList[params.dataIndex]
                  //   }
                  // }
                }
              }
            ]
          };
          this.echartsBar.setOption(optionBar)
        }).catch(res => {
          this.$message.error(res)
        })

      },
      initChart() {
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
                  colorList.push(`rgb(76, 249, 255)`);

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
                        label: {position: "end", color: "#666666"},
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
                        label: {color: "#fff", fontSize: 18},
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
                        label: {position: "end", color: "#666666"},
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
                        label: {position: "start", color: "#666666"},
                        lineStyle: {color: "#fff"},
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
                        label: {color: "#fff", fontSize: 18},
                      },
                    ]
                  );
                }

                dataList.push({
                  value: (1 + index) * 10,
                  name: item.levelName,
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
              colorList.push(`rgb(85, 141, 255)`);
            }
            const _this = this;
            this.chart = echarts.init(document.getElementById("ref_chart"));
            const option = {
              color: colorList,
              // title: {
              //   text: "AUM（万元）",
              //   textAlign: "center",
              //   top: 575,
              //   left: 130,
              //   textStyle: {
              //     color: "rgba(255,255,255,0.7)",
              //     fontWeight: "normal",
              //     fontSize: 12,
              //   },
              //   // backgroundColor: '#fff',
              //   // shadowColor: '#00F8FF',
              //   // shadowBlur: 10,
              //   // subtext: '纯属虚构'
              // },
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
                  left: '10%',
                  right: '10%',
                  top: '30%',
                  bottom: '20%',
                  width: "80%",
                  min: 0,
                  max: dataList[dataList.length - 1].value,
                  minSize: "0%",
                  maxSize: "100%",
                  sort: "ascending",
                  gap: 0,
                  label: {
                    show: true,
                    position: "inside",
                    color: "#fff",
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
                  // markLine: {
                  //   silent: true,
                  //   symbol: "none",
                  //   // label: {
                  //   //   position: 'middle',
                  //   // },
                  //   lineStyle: {
                  //     type: "dashed",
                  //     color: "#666666",
                  //   },
                  //   data: markLineList,
                  // },
                },
              ],
            };
            this.chart.setOption(option);
            this.chart.on('click', function (param) {
              getCustLevelDetail({levelId: param.data.id}).then(res => {
                _this.custAmount = res.data.data.custAmount
                _this.equityAmount = res.data.data.equityAmount
                _this.acquireAmount = res.data.data.acquireAmount
                _this.useAmount = res.data.data.useAmount
              }).catch(res => {
                this.$message.error(res)
              })
            })
          })
          .catch((res) => {
            this.loading = false;
            this.$message.error(res);
          });
      },
    },
  };
</script>

<style lang='scss' scoped>
  .basic-container {
    padding: 0;

    ::v-deep .el-card__body {
      padding: 0;
    }
  }

  .order {
    height: 90px;
    background-image: url("../assets/images/order.png");
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    align-items: center
  }

  .startUp {
    height: 90px;
    background-image: url("../assets/images/startUp.png");
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    align-items: center
  }

  .icon-span {
    display: inline-block;
    line-height: 24px;
    width: 24px;
    height: 24px;
    background-color: #F1F5F9;
    border-radius: 50%;
    float: right;
    cursor: pointer;
    text-align: center;

    .el-icon-arrow-right {
      color: #9e9fa0
    }
  }

  .hdsj {
    background-image: url("../assets/images/hdsj.png");
    background-repeat: no-repeat;
    background-size: 100%;
    height: 40px;
    width: 40px;
  }

  .hdgl {
    background-image: url("../assets/images/hdgl.png");
    background-repeat: no-repeat;
    background-size: 100%;
    height: 40px;
    width: 40px;
  }

  .gys {
    background-image: url("../assets/images/gys.png");
    background-repeat: no-repeat;
    background-size: 100%;
    height: 40px;
    width: 40px;
  }

  .cztx {
    background-image: url("../assets/images/cztx.png");
    background-repeat: no-repeat;
    background-size: 100%;
    height: 40px;
    width: 40px;
  }

  ::v-deep .el-badge__content.is-fixed {
    top: 13px;
    right: -6px;
  }

  .flex-div {
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 18px 20px;
    margin: 0 15px;
  }

  .remind {
    margin: 8px 10px 0 0;
    padding: 10px;
    background-color: #f4f6fb;
    border-radius: 3px;

    .remind-pa {
      height: 6px;
      background-color: #e2e4e7;
      border-radius: 3px;
      margin-top: 8px;

      .remind-ch {
        float: right;
        height: 6px;
        background-color: #496DFF;
        border-radius: 3px
      }
    }
  }

  .carousel-item {
    position: absolute;
    animation: move 5s infinite;
    -webkit-animation: 5s move infinite;

    @-webkit-keyframes move {
      0% {
        margin-top: 0;
      }
      50% {
        margin-top: 20px;
      }
      100% {
        margin-top: 0;
      }
    }

    .icon-rang {
      background-image: url("../assets/images/icon-rang.png");
      background-repeat: no-repeat;
      background-size: 100%;
      height: 45px;
      width: 45px;
      margin: auto
    }
  }

  .rang {
    background-image: url("../assets/images/rang.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .rect {
    position: absolute;
    bottom: 48.5px;
  }

  .charts-col {
    margin: 3px 0;

    span:first-child {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #808eae;
      margin-right: 5px
    }

    span:nth-child(2) {
      display: inline-block;
      width: 70px
    }
  }
</style>
