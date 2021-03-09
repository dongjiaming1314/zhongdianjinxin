<template>
  <div class="execution">
    <basic-container>
      <div class="select_button">
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="查询方式:">
                <!-- 输入框1 -->
                <el-input placeholder="请输入查询方式" v-model="form.way" class="selet_menu"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备平台:">
                <!-- 搜索框1 -->
                <el-select v-model="form.Platform" placeholder="请选择设备平台" class="selet_menu">
                  <el-option
                    v-for="(item , index) in options_one"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="运营商:">
                <!-- 搜索框2 -->
                <el-select v-model="form.Operator" placeholder="请选择运营商" class="selet_menu">
                  <el-option
                    v-for="(item , index) in options_two"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="选择是否绑定:">
                <!-- 搜索框3 -->
                <el-select v-model="form.Binding" placeholder="请选择是否绑定" class="selet_menu">
                  <el-option
                    v-for="(item , index) in options_three"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align: right;">
            <!-- 按钮 -->
            <el-button type="primary" size="small">查&nbsp;询</el-button>
            <el-button
              type="default"
              size="small"
              @click="handEmpty"
            >重&nbsp;置</el-button>
        </div>
        
      </div>
      <!-- 表格 tableData -->
      <div class="table_content">
        <el-table
          v-loading="deviceloading"
          :data="tableData"
          :stripe="true"
          :header-cell-style="{background:'#FAFAFA',color:'#606266'}"
          :row-style="rowstyle"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="60"
            size="mini"
            align="center"
          ></el-table-column>
          <el-table-column prop="deviceMark" width="200" label="设备标识" align="center"></el-table-column>
          <el-table-column prop="deviceModel" width="100" label="设备型号" align="center"></el-table-column>
          <el-table-column prop="deviceType" width="90" label="设备平台" align="center"></el-table-column>
          <el-table-column prop="manufacture" label="设备制造商" width="120" align="center"></el-table-column>
          <el-table-column prop="operatorName" label="运营商" align="center"></el-table-column>
          <el-table-column prop="bindingFlag" label="是否绑定" align="center"></el-table-column>
          <el-table-column prop="safeType" label="安全状态" align="center"></el-table-column>
          <el-table-column prop="lastUseTime" label="最后一次运行时间" width="140" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="findInfo(scope.row.deviceId)">查看
              </el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 弹出框 -->
        <el-dialog
          title="查看"
          class="tan"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose"
        >
          <el-tabs style="height: 270px;" label="top">
            <el-tab-pane label="基本信息">
              <!-- form组1 -->
              <!-- 1 -->
              <el-form label-width="80px" class="demo-ruleForm" v-loading="formloading">
                <el-row class="fistRow">
                  <el-col :span="11">
                    <el-form-item label="设备标识" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.deviceMark" disabled type="textarea" :rows="2"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="2">
                    <el-form-item label="设备型号" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.deviceModel" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 2 -->
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="设备平台" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.deviceType" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="2">
                    <el-form-item label="制造商" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.manufacture" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 3 -->
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="安全状态" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.safeType" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :offset="1">
                    <el-form-item label="最后一次使用时间" label-width="150px" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.lastUseTime" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 4 -->
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="最后一次登录时间" label-width="125px">
                      <el-input size="small" v-model="currentData.lastLoginTime" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="2">
                    <el-form-item label="最后一次登录IP" label-width="120px">
                      <el-input size="small" v-model="currentData.lastLoginAddr" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="屏幕信息">
              <!-- form组2 -->
              <!-- 1 -->
              <el-form label-width="80px" class="demo-ruleForm">
                <el-row class="secondRow">
                  <el-col :span="11">
                    <el-form-item label="屏幕宽度" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.scrnWidth" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="2">
                    <el-form-item label="屏幕高度" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.scrnHeight" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 2 -->
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="屏幕分辨率" :rules="{ required: true}" label-width="95px">
                      <el-input size="small" v-model="currentData.scrnResolution" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="2">
                    <el-form-item label="屏幕dpi" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.scrnDpie" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 3 -->
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="屏幕比率" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.scrnRate" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="系统信息">
              <!-- form组3 -->
              <!-- 1 -->
              <el-form label-width="80px" class="demo-ruleForm">
                <el-row class="threeRow">
                  <el-col :span="11">
                    <el-form-item label="系统名称" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.systemName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="2">
                    <el-form-item label="系统版本" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.systemVersion" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 2 -->
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="系统引擎" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.systemAgent" disabled type="textarea" :rows="2"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="2">
                    <el-form-item label="MAC地址">
                      <el-input size="small" v-model="currentData.macAddr" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 3 -->
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="唯一标识" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.identification" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="2">
                    <el-form-item label="序列号" label-width="80px">
                      <el-input size="small" v-model="currentData.serial" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 4 -->
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="设备名称" label-width="82px" :rules="{ required: true}">
                      <el-input size="small" v-model="currentData.deviceName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="运营商信息">
              <!-- form组4 -->
              <!-- 1 -->
              <el-form label-width="80px" class="demo-ruleForm">
                <el-row class="fourRow">
                  <el-col :span="11">
                    <el-form-item label="手机号码">
                      <el-input size="small" v-model="currentData.mobileNumber" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="2">
                    <el-form-item label="运营商名称" label-width="90px">
                      <el-input size="small" v-model="currentData.operatorName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 2 -->
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="运营商代码" label-width="85px">
                      <el-input size="small" v-model="currentData.operatorCode" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="其他信息">
              <!-- form组5 -->
              <!-- 1 -->
              <el-form label-width="80px" class="demo-ruleForm">
                <el-row class="fiveRow">
                  <el-col :span="11" :offset="1">
                    <el-form-item label="是否模拟器" :rules="{ required: true}" label-width="120px">
                      <el-switch v-model="currentData.simulatorFlag" disabled></el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9" :offset="3">
                    <el-form-item label="是否竖屏" :rules="{ required: true}">
                      <el-switch v-model="currentData.landscapeFlag" disabled></el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 2 -->
                <el-row>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="是否平板" :rules="{ required: true}" label-width="120px">
                      <el-switch v-model="currentData.tabletFlag" disabled></el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="是否设置登录标识" label-width="135px" :rules="{ required: true}">
                      <el-switch v-model="currentData.setPinNumberFlag" disabled></el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 3 -->
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="是否设置指纹标识" :rules="{ required: true}" label-width="150px">
                      <el-switch v-model="currentData.setFingerPrintFlag" disabled></el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="是否设置面容标识" label-width="162px" :rules="{ required: true}">
                      <el-switch v-model="currentData.setFacePrintFlag" disabled></el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" type="primary" size="small">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 分页 -->
      <el-pagination
          background
          v-if="page.total"
          :page-size="page.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[3, 4]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
      ></el-pagination>
    </basic-container>
  </div>
</template>

<script>
// 解构赋值
import { fetchList, getObj } from "@/api/admin/device";
export default {
  name: "device",
  data() {
    return {
      // 基本信息加载
      deviceloading:false,
      // 详细信息加载
      formloading:false,
      // 分页
      page: {
        total: undefined, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 3 // 每页显示多少条
      },
      // 表单
      currentData: {},
      // 弹出框
      dialogVisible: false,
      tabPosition: "left",
      form:{
        way: "",
        Platform: "",
        Operator: "",
        Binding: "",
      },
      
      // 选择框1
      options_one: [
        {
          value: "iOS",
          label: "iOS"
        },
        {
          value: "Android",
          label: "Android"
        }
      ],
      
      // 选择框2
      options_two: [
        {
          value: "中国移动",
          label: "中国移动"
        },
        {
          value: "中国联通",
          label: "中国联通"
        },
        {
          value: "中国电信",
          label: "中国电信"
        }
      ],
      
      // 选择框3
      options_three: [
        {
          value: "false",
          label: "否"
        },
        {
          value: "true",
          label: "是"
        }
      ],
      
      // 表格
      tableData: []
    };
  },
  created() {},
  mounted: function() {
    this.GetfetchList(this.page);
  },
  computed: {},
  methods: {
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.GetfetchList(this.page);
      // console.log(`每页 ${pageSize} 条`);
    },
    handleCurrentChange(currentPage) {
      this.page.currentPage = currentPage
      this.GetfetchList(this.page);
      // console.log(`当前页: ${currentPage}`);
    },

    // 表格
    indexMethod(index) {
      return index * 1 + 1;
    },

    // 弹出框
    handleClose(done) {
      done();
    },

    // 清空
    handEmpty() {
      this.form = {
        way : "",
        Platform : "",
        Operator :"",
        Binding :""
      }
    },

    // 调用设备管理信息接口
    GetfetchList(page, params) {
      this.deviceloading = true;
      fetchList(
        Object.assign({
          current: page.currentPage,
          size: page.pageSize
        },params)
      ).then(
        response => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.deviceloading = false
        },
        err => {
          console.log("获取设备信息失败！");
        }
      );
    },
    // 调用设备管理详细信息接口
    findInfo(data) {
      // console.log(data);
      this.dialogVisible = true;
      this.formloading = true;
      getObj(Object.assign(data)).then(
        response => {
          this.currentData = response.data.data;
          this.formloading = false;
        },
        err => {
          console.log("获取设备详细信息失败！");
        }
      );
    },
    rowstyle() {
      return "height:30px";
    }
  }
};
</script>

<style lang="scss" scoped>
.selet_menu:nth-child(2) {
  margin-left: 10px;
}

.selet_menu:nth-child(3) {
  margin-left: 10px;
}

.selet_menu:nth-child(4) {
  margin-left: 10px;
}

.button_one {
  width: 82px;
  height: 36px;
  text-align: center;
  font-size: 12px;
  margin-left: 20px;
}

.button_two {
  width: 82px;
  height: 36px;
  text-align: center;
  font-size: 12px;
  margin-left: 13px;
}

.table_content {
  margin-top: 20px;
}

.el-table th > .cell {
  position: relative;
  word-wrap: normal;
  text-overflow: ellipsis;
  vertical-align: middle;
  width: 100%;
  box-sizing: border-box;
  text-align: center !important;
}

.el-table .cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  text-align: center !important;
}

.tan {
  height: 90% !important;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-col {
  margin-bottom: 0;
  .el-input{
    font-size: 13px;
    ::v-deep .el-input__inner{
        height: 32px;
        line-height: 32px;
    }
  }
  .el-select{
    width: 100%;
    ::v-deep .el-input{
      font-size: 13px;
      .el-input__inner{
          height: 32px;
          line-height: 32px;
      }
    }
  } 
}

.el-form-item {
  margin-bottom: 8px;
}

.el-rowt:nth-child(1) {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.fistRow {
  margin-top: 10px;
}

.threeRow {
  margin-top: 15px;
}

.fourRow {
  margin-top: 30px;
}

.fiveRow {
  margin-top: 30px;
}
.el-pagination{
  text-align: center;
  margin: 15px auto;
}
</style>

