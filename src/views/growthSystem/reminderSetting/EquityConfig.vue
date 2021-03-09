<template>
  <!-- <common-dialog labelPosition="right" :visible.sync="visible" size="large" :label-width="'100px'" :title="'权益领取配置'"> -->
  <el-dialog
    style="z-index: 2066"
    title="权益领取"
    :visible.sync="visible"
    width="65%"
    :before-close="handleClose"
  >
    <div style="text-align: right;margin-bottom: 15px">
      <el-button
        size="small"
        type="primary"
        @click="handleEdit"
        v-if="!isEdit"
      >{{addOrUpdate === 'add' ? '新增':'编辑'}}</el-button>
      <el-button
        size="small"
        @click="handleDel"
        v-if="!isEdit &&  this.addOrUpdate ==='update'"
      >删除</el-button>
      <el-button
        size="small"
        type="primary"
        @click="comeBack"
        v-if="isEdit"
      >返回</el-button>
    </div>
    <!--详情-->
    <div
      class="wrap"
      v-if="!isEdit"
    >
      <el-form
        :model="viewForm"
        label-width="130px"
      >
        <el-col :span="12">
          <el-form-item label="客户等级：">
            {{ viewForm.levelName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权益类型：">
            {{ viewForm.equityType | type }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权益列表：">
            <div
              v-for="item in viewForm.equityLists"
              :key="item.equityId"
            >
              <span class="equity-label">{{item.equityName}}</span>
              <span class="equity-number">领取次数：{{item.number}}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否启用：">
            {{ viewForm.enabled | enabled}}
          </el-form-item>
        </el-col>
      </el-form>
      <div class="clear"></div>
    </div>

    <!-- <div v-if="!isEdit" class="wrap">
      <el-col :span="12">
        <el-row>
          <el-col :span="8">客户等级：</el-col>
          <el-col :span="16">{{ viewForm.levelName }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="8">权益类型：</el-col>
          <el-col :span="16">{{ viewForm.equityType | type }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="8">权益列表：</el-col>
          <el-col style="height:auto" :span="16">
            <div v-for="item in viewForm.equityLists" :key="item.equityId">
              <span class="equity-label">{{item.equityName}}</span>
              <span class="equity-number">领取次数：{{item.number}}</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="8">是否启用：</el-col>
          <el-col :span="16">{{ viewForm.enabled | enabled}}</el-col>
        </el-row>
      </el-col>
      <div class="clear"></div>
    </div> -->
    <!-- 编辑 -->
    <el-form
      class="form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="130px"
      v-if="isEdit"
    >
      <el-col :span="12">
        <el-form-item
          label="客户等级："
          prop="levelName"
        >
          <el-input
            v-model="form.levelName"
            disabled
          ></el-input>
          <!-- <el-select v-model="form.levelCode" placeholder="请选择" disabled>
            <el-option  :label="form.levelName" :value="form.levelCode"></el-option>
            <div style="bottom: 0;width: 100%;background: #fff">
              <el-pagination small @current-change="handleRankCurrentChange" :current-page="rankPage.current" layout="prev, pager,next,total" :page-size="rankPage.size" :total="rankTotal">
              </el-pagination>
            </div>
          </el-select> -->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="权益类型："
          prop="equityType"
        >
          <el-select
            v-model="form.equityType"
            placeholder="请选择"
            clearable
            @change="handleChangeEquityType"
          >
            <el-option
              v-for="item in equityTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="权益列表："
          prop="equitySelectedList"
        >
          <el-select
            v-model="form.equitySelectedList"
            multiple
            placeholder="请选择"
            @change="equityHandle"
            @remove-tag="removeTag"
          >
            <el-option
              v-for="(item,index) in equityList"
              :key="index"
              :label="item.equityName"
              :value="item.equityName"
            ></el-option>
            <div style="bottom: 0;width: 100%;background: #fff">
              <el-pagination
                small
                @current-change="handleEquityCurrentChange"
                :current-page="equityPage.current"
                layout="prev, pager,next"
                :page-size="equityPage.size"
                :total="equityPage.total"
              >
              </el-pagination>
            </div>
          </el-select>
        </el-form-item>
        <el-checkbox-group
          style="margin-left: 130px;"
          v-model="form.equitySelectedList"
        >
          <div
            class="selected-equity"
            v-for="item in form.equitySelectedList"
            :key="item"
          >
            <el-checkbox
              @change="removeTag(item)"
              :label="item"
            ></el-checkbox>
            <el-form
              :model="rubbish"
              :ref="item"
              label-width="100px"
            >
              <el-form-item
                label="领取次数："
                :prop="item"
                :rules="{required: true, message: '请输入领取次数', trigger: 'change'}"
              >
                <el-input
                  style="width:90px"
                  size="mini"
                  v-model.number="rubbish[item]"
                  @change="(val) => handleNumberChange(val, item)"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
            <!-- </div> -->
          </div>
        </el-checkbox-group>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="是否启用："
          prop="enabled"
        >
          <el-radio
            v-model="form.enabled"
            label="1"
          >否</el-radio>
          <el-radio
            v-model="form.enabled"
            label="0"
          >是</el-radio>
        </el-form-item>
      </el-col>
    </el-form>
    <!-- <template #footer>
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="submit">提交</el-button>
    </template> -->
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        :loading="loading"
        size="small"
        type="primary"
        @click="submit"
        v-if="isEdit"
      >提 交</el-button>
      <el-button
        size="small"
        @click="handleClose"
      >取 消</el-button>
    </span>
  </el-dialog>
  <!-- </common-dialog> -->
</template>

<script>
import { fetchList } from "@/api/growthSystem/customerRank";
import { add, edit, fetchEquityList } from "@/api/growthSystem/getEquityConfig";
import {
  getLevelEquityDetail,
  addLevelEquity,
  updateLevelEquity,
  deleteLevelEquity,
} from "@/api/growthSystem/reminderSetting";
import { remote } from "@/api/admin/dict";
import { deepClone } from "@/util/util";

export default {
  // props: {
  //   addVisible: {
  //     type: Boolean,
  //     default: () => false
  //   },
  //   isEdit: {
  //     type: Number,
  //     default: () => 0
  //   },
  //   batchNumber: {
  //     type: String
  //   }
  // },
  data() {
    const validNumber = (rule, value, callback) => {
      if (this.validatenull(value)) {
        return callback(new Error("请输入领取次数"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      isEdit: false,
      addOrUpdate: "add",
      equityData: [],
      viewForm: {
        levelName: "",
        equityType: "",
        equityLists: [],
        enabled: "",
      },
      form: {
        levelCode: "",
        levelName: "",
        equityType: "",
        enabled: "",
        equitySelectedList: [],
        levelEquityList: [],
      },
      rubbish: {},
      rules: {
        levelCode: [
          { required: true, message: "请选择客户等级", trigger: "change" },
        ],
        equityType: [
          { required: true, message: "请选择权益类型", trigger: "change" },
        ],
        equitySelectedList: [
          { required: true, message: "请选择权益", trigger: "change" },
        ],
        enabled: [
          { required: true, message: "请选择是否启用", trigger: "change" },
        ],
      },
      checkNumberRule: {
        paramValue: [
          { required: true, validator: validNumber, trigger: "change" },
        ],
      },
      // 客户等级列表
      levelList: [],
      // 权益类型列表
      equityTypeList: [],
      // 根据权益类型获得的权益列表
      equityList: [],
      rankPage: {
        current: 1,
        size: 5,
      },
      rankTotal: 0,
      equityPage: {
        current: 1,
        size: 5,
        total: 0,
      },
      equityTotal: 0,
      batchNumber: "",
    };
  },
  filters: {
    type: function (val) {
      if (val === "1") return "票务类";
      if (val === "2") return "预约类";
      if (val === "3") return "展示类";
    },
    enabled: function (val) {
      if (val === "1") return "否";
      if (val === "0") return "是";
    },
  },
  watch: {
    // addVisible(val, oldVal) {
    //   if (val === oldVal) return;
    //   this.visible = val;
    // },
    // visible(val, oldVal) {
    //   if (val === oldVal) return;
    //   this.$emit("update:addVisible", val);
    // },
    "form.equityType": {
      handler(val, oldVal) {
        this.getEquityList();
      },
      deep: true,
    },
    // "form.equitySelectedList": {
    //   handler(val, oldVal) {
    //     console.log("watch", val);
    //     console.log(" this.equityList", this.equityList);
    //     // this.form.levelEquityList = [];
    //     val.forEach((item) => {
    //       this.equityList.forEach((equity) => {
    //         if (equity.equityName == item) {
    //           // 根据选中的权益名称获取详细的权益信息
    //           this.form.levelEquityList.unshift(equity);
    //         }
    //       });
    //     });
    //     //去重
    //     const res = new Map();
    //     this.form.levelEquityList = this.form.levelEquityList.filter(
    //       (a) => !res.has(a.equityId) && res.set(a.equityId, 1)
    //     );
    //     console.log("watch里填充的表单", this.form.levelEquityList);
    //   },
    //   deep: true,
    // },
  },
  created() {
    // 获取客户等级
    this.getCustomerRank();
    // 获取权益类型 字典项
    this.getEquityType();
    // if (this.isEdit == 1) {
    //   this.getDetail();
    // }
  },
  methods: {
    //编辑删除
    removeTag(val) {
      let levelEquityList = deepClone(this.form.levelEquityList);
      levelEquityList.forEach((item, index) => {
        if (item.equityName === val) {
          levelEquityList.splice(index, 1);
        }
      });
      this.form.levelEquityList = deepClone(levelEquityList);
    },
    //权益改变
    equityHandle(val) {
      val.forEach((item) => {
        this.equityList.forEach((equity) => {
          if (equity.equityName == item) {
            // 根据选中的权益名称获取详细的权益信息
            this.form.levelEquityList.unshift(equity);
          }
        });
      });
      //去重
      const res = new Map();
      this.form.levelEquityList = this.form.levelEquityList.filter(
        (a) => !res.has(a.equityId) && res.set(a.equityId, 1)
      );
    },
    openWin(_id, code, name) {
      this.visible = true;
      this.isEdit = false;
      this.id = _id;
      this.form.levelName = name;
      this.getLevelEquityDetail(_id, name);
    },
    //获取详情页面
    getLevelEquityDetail(id, name) {
      getLevelEquityDetail(id).then((res) => {
        if (res.data.data.records.length === 0) {
          this.addOrUpdate = "add";
          this.viewForm.levelName = name;
        } else {
          this.addOrUpdate = "update";
          this.batchNumber = res.data.data.records[0].batchNumber;
          this.equityData = res.data.data.records;
          this.viewForm.equityLists = res.data.data.records;
          this.viewForm.equityType = res.data.data.records[0].equityType;
          this.viewForm.enabled = res.data.data.records[0].enabled;
          this.viewForm.levelName = name;
        }
      });
    },
    //删除事件
    handleDel() {
      deleteLevelEquity(this.id).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("删除成功！");
          this.handleClose();
        }
      });
    },
    submit() {
      let validAll = true;
      this.$refs.form.validate((valid) => {
        if (!valid) validAll = valid;
      });
      this.form.equitySelectedList.forEach((item) => {
        this.$refs[item][0].validate((valid) => {
          if (!valid) validAll = valid;
        });
      });
      if (validAll) {
        const obj = deepClone(this.form);
        // 删除不需要传递的数组，
        delete obj.equitySelectedList;
        obj.levelEquityList = obj.levelEquityList.map((item) => {
          let number;
          Object.keys(this.rubbish).forEach((i) => {
            if (item.equityName == i) {
              number = this.rubbish[i];
            }
          });
          return { equityId: item.equityId, number };
        });
        if (this.addOrUpdate === "add") {
          addLevelEquity(Object.assign(obj, { levelId: this.id })).then(
            (res) => {
              this.$message.success("新增成功！");
              this.isEdit = false;
              this.handleClose();
            }
          );
        } else {
          updateLevelEquity(Object.assign(obj, { levelId: this.id })).then(
            (res) => {
              this.$message.success("修改成功！");
              this.isEdit = false;
              this.handleClose();
            }
          );
        }
      }
    },
    getDetail(data) {
      // getDetail({ batchNumber: this.batchNumber }).then(res => {
      // const data = res.data.data.records;
      if (!this.validatenull(data)) {
        // 获取数组中的一条数据的基本信息，数据是作为列表传过来的，但只有关于权益列表的数据不一样
        const result = deepClone(data[0]);
        // Object.keys(result).map(item => {
        //   if (item == "equityType") {
        //     // 字典转换
        //     remote("equity_type").then(res => {
        //       res.data.data.map(i => {
        //         if (i.value == result[item]) {
        //           result[item] = i.label;
        //           return;
        //         }
        //       });
        //     });
        //   }
        // });
        const equitySelectedList = [];
        const arr = [];
        data.map((item) => {
          // 存入已选择的权益id
          equitySelectedList.push(item.equityName);
          // 存储权益id和对应的领取次数
          this.$set(this.rubbish, item.equityName, item.number);
          arr.push(item);
        });
        this.$set(result, "equitySelectedList", equitySelectedList);
        this.$set(result, "levelEquityList", arr);
        // 赋值给form反显
        this.form = deepClone(result);
      }
      // });
    },
    getCustomerRank() {
      // fetchList({ ...this.rankPage }).then(res => {
      //   const data = res.data.data;
      //   this.levelList = data.records;
      //   this.rankTotal = data.total;
      // });
    },
    handleChangeEquityType() {
      this.form.equitySelectedList = [];
    },
    getEquityList() {
      fetchEquityList({
        ...this.equityPage,
        equityType: this.form.equityType,
        checkStatus: "7",
      }).then((res) => {
        this.equityList = res.data.data.records;
        this.equityPage.total = res.data.data.total;
        this.equityPage.currentPage = res.data.data.current;
      });
      this.form.levelEquityList = [];
    },
    getEquityType() {
      remote("equity_type").then((res) => {
        this.equityTypeList = res.data.data;
      });
    },
    handleEquityCurrentChange(current) {
      this.equityPage.current = current;
      this.$nextTick(() => {
        this.getEquityList();
      });
    },
    handleRankCurrentChange(current) {
      this.rankPage.current = current;
      this.getCustomerRank();
    },
    // 插入领取次数到列表中
    handleNumberChange(val, item) {
      if (!val) {
        return;
      }
      this.form.levelEquityList.forEach((equity) => {
        if (equity.equityName == item) {
          equity.number = val;
        }
      });
    },
    handleEdit() {
      this.isEdit = true;
      //编辑插入数据
      if (this.addOrUpdate === "update") {
        this.getDetail(this.equityData);
      }
    },
    handleClose() {
      this.visible = false;
      this.viewForm = {
        levelName: "",
        equityType: "",
        equityLists: [],
        enabled: "",
      };
      this.form = {
        levelCode: "",
        levelName: "",
        equityType: "",
        enabled: "",
        equitySelectedList: [],
        levelEquityList: [],
      };
      (this.equityPage = {
        current: 1,
        size: 5,
        total: 0,
      }),
        (this.rubbish = {});
      this.equityList = [];
      this.$emit("getList");
    },
    comeBack() {
      this.isEdit = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  //   // overflow: hidden;
  //   height: 100%;
  //   > .el-col {
  //     &:nth-child(2n + 1) {
  //       margin-left: -10px;
  //       margin-right: 10px;
  //       padding-left: 10px;
  //     }
  //     .el-row {
  //       .el-col {
  //         height: 40px;
  //         line-height: 40px;
  //         margin-bottom: 0;
  //         &:first-child {
  //           text-align: right;
  //         }
  //       }
  //     }
  //   }
  //   .equity-label {
  //     display: inline-block;
  //     width: 140px;
  //   }

  .equity-label {
    display: inline-block;
    width: 140px;
  }
  .clear {
    clear: both;
  }
}

::v-deep .form {
  overflow: hidden;
  .el-select {
    width: 100%;
  }
  .input-error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
  .selected-equity {
    height: 35px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__error {
      padding-top: 0;
      margin-top: -5px;
    }
  }
  .el-checkbox__label {
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: top;
  }
}
</style>
