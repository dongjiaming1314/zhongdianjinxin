<template>
  <common-dialog labelPosition="right" :visible.sync="visible" size="large" :label-width="'100px'" :title="'权益领取配置'">
    <el-form class="form" ref="form" :model="form" :rules="rules" label-width="130px">
      <el-col :span="12">
        <el-form-item label="客户等级：" prop="levelCode">
          <el-select v-model="form.levelCode" placeholder="请选择" clearable>
            <el-option v-for="item in levelList" :key="item.id" :label="item.levelName" :value="item.levelCode"></el-option>
            <div style="bottom: 0;width: 100%;background: #fff">
              <el-pagination small @current-change="handleRankCurrentChange" :current-page="rankPage.current" layout="prev, pager,next,total" :page-size="rankPage.size" :total="rankTotal">
              </el-pagination>
            </div>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="权益类型：" prop="equityType">
          <el-select v-model="form.equityType" placeholder="请选择" clearable @change="handleChangeEquityType">
            <el-option v-for="item in equityTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="权益列表：" prop="equitySelectedList">
          <el-select v-model="form.equitySelectedList" multiple placeholder="请选择" clearable>
            <el-option v-for="item in equityList" :key="item.equityId" :label="item.equityName" :value="item.equityName"></el-option>
            <div style="bottom: 0;width: 100%;background: #fff">
              <el-pagination small @current-change="handleEquityCurrentChange" :current-page="equityPage.current" layout="prev, pager,next" :page-size="equityPage.size" :total="equityTotal">
              </el-pagination>
            </div>
          </el-select>
        </el-form-item>
        <el-checkbox-group style="margin-left: 130px;" v-model="form.equitySelectedList">
          <div class="selected-equity" v-for="(item, index) in form.equitySelectedList" :key="item">
            <el-checkbox :label="item"></el-checkbox>
            <el-form :model="rubbish" :ref="item" label-width="100px">
              <el-form-item label="领取次数：" :prop="item" :rules="{required: true, message: '请输入领取次数', trigger: 'change'}">
                <el-input style="width:90px" size="mini" v-model.number="rubbish[item]" @change="(val) => handleNumberChange(val, item)" clearable></el-input>
              </el-form-item>
            </el-form>
            <!-- </div> -->
          </div>
        </el-checkbox-group>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否启用：" prop="enabled">
          <el-radio v-model="form.enabled" label="1">否</el-radio>
          <el-radio v-model="form.enabled" label="0">是</el-radio>
        </el-form-item>
      </el-col>
    </el-form>
    <template #footer>
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="submit">提交</el-button>
    </template>
  </common-dialog>
</template>

<script>
import { fetchList } from "@/api/growthSystem/customerRank";
import { add, edit, fetchEquityList } from "@/api/growthSystem/getEquityConfig";
import { remote } from "@/api/admin/dict";
import { getDetail } from "@/api/growthSystem/getEquityConfig";

export default {
  props: {
    addVisible: {
      type: Boolean,
      default: () => false
    },
    isEdit: {
      type: Number,
      default: () => 0
    },
    batchNumber: {
      type: String
    }
  },
  data() {
    const validNumber = (rule, value, callback) => {
      if (this.validatenull(value)) {
        return callback(new Error("请输入领取次数"));
      } else {
        callback();
      }
    };
    return {
      visible: this.addVisible,
      form: {
        levelEquityList: [],
        //
        equitySelectedList: []
      },
      rubbish: {},
      rules: {
        levelCode: [
          { required: true, message: "请选择客户等级", trigger: "change" }
        ],
        equityType: [
          { required: true, message: "请选择权益类型", trigger: "change" }
        ],
        equitySelectedList: [
          { required: true, message: "请选择权益", trigger: "change" }
        ],
        enabled: [
          { required: true, message: "请选择是否启用", trigger: "change" }
        ]
      },
      checkNumberRule: {
        paramValue: [
          { required: true, validator: validNumber, trigger: "change" }
        ]
      },
      // 客户等级列表
      levelList: [],
      // 权益类型列表
      equityTypeList: [],
      // 根据权益类型获得的权益列表
      equityList: [],
      rankPage: {
        current: 1,
        size: 5
      },
      rankTotal: 0,
      equityPage: {
        current: 1,
        size: 5
      },
      equityTotal: 0
    };
  },
  watch: {
    addVisible(val, oldVal) {
      if (val === oldVal) return;
      this.visible = val;
    },
    visible(val, oldVal) {
      if (val === oldVal) return;
      this.$emit("update:addVisible", val);
    },
    "form.equityType": {
      handler(val, oldVal) {
        this.getEquityList();
      },
      deep: true
    },
    "form.equitySelectedList": {
      handler(val, oldVal) {
        this.form.levelEquityList = [];
        val.forEach(item => {
          fetchEquityList({
            ...this.equityPage,
            equityType: this.form.equityType
          }).then(res => {
            this.equityList = res.data.data.records;
            this.equityList.forEach(equity => {
              if (equity.equityName == item) {
                // 根据选中的权益名称获取详细的权益信息
                this.form.levelEquityList.unshift(equity);
              }
            });
          });
        });
      },
      deep: true
    }
  },
  created() {
    // 获取客户等级
    this.getCustomerRank();
    // 获取权益类型 字典项
    this.getEquityType();
    if (this.isEdit == 1) {
      this.getDetail();
    }
  },
  methods: {
    submit() {
      let validAll = true;
      this.$refs["form"].validate(valid => {
        if (!valid) validAll = valid;
      });
      this.form.equitySelectedList.forEach(item => {
        this.$refs[item][0].validate(valid => {
          if (!valid) validAll = valid;
        });
      });

      if (validAll) {
        const obj = this.deepClone(this.form);
        // 删除不需要传递的数组，
        delete obj.equitySelectedList;

        obj.levelEquityList = obj.levelEquityList.map(item => {
          let number;
          Object.keys(this.rubbish).forEach(i => {
            if (item.equityName == i) {
              number = this.rubbish[i];
            }
          });
          return { equityId: item.equityId, number };
        });
        if (!this.isEdit) {
          add(obj).then(res => {
            this.visible = false;
            this.$emit("submitSuccess");
          });
        } else {
          edit(obj).then(res => {
            this.visible = false;
            this.$emit("submitSuccess");
          });
        }
      }
    },
    getDetail() {
      getDetail({ batchNumber: this.batchNumber }).then(res => {
        const data = res.data.data.records;
        if (!this.validatenull(data)) {
          // 获取数组中的一条数据的基本信息，数据是作为列表传过来的，但只有关于权益列表的数据不一样
          const result = data[0];
          Object.keys(result).map(item => {
            if (item == "equityType") {
              // 字典转换
              remote("equity_type").then(res => {
                res.data.data.map(i => {
                  if (i.value == result[item]) {
                    result[item] = i.label;
                    return;
                  }
                });
              });
            }
          });
          const equitySelectedList = [];
          data.map(item => {
            // 存入已选择的权益id
            equitySelectedList.push(item.equityName);
            // 存储权益id和对应的领取次数
            this.$set(this.rubbish, item.equityName, item.number);
          });
          result.equitySelectedList = equitySelectedList;
          // 赋值给form反显
          this.form = this.deepClone(result);
        }
      });
    },
    getCustomerRank() {
      fetchList({ ...this.rankPage }).then(res => {
        const data = res.data.data;
        this.levelList = data.records;
        this.rankTotal = data.total;
      });
    },
    handleChangeEquityType() {
      this.form.equitySelectedList = [];
    },
    getEquityList() {
      fetchEquityList({
        ...this.equityPage,
        equityType: this.form.equityType
      }).then(res => {
        this.equityList = res.data.data.records;
      });
    },
    getEquityType() {
      remote("equity_type").then(res => {
        this.equityTypeList = res.data.data;
      });
    },
    handleEquityCurrentChange(current) {
      this.equityPage.current = current;
      this.getEquityList();
    },
    handleRankCurrentChange(current) {
      this.rankPage.current = current;
      this.getCustomerRank();
    },
    // 插入领取次数到列表中
    handleNumberChange(val, item) {
      console.log(val);
      console.log(this.rubbish);
      if (!val) {
        return;
      }
      this.form.levelEquityList.forEach(equity => {
        if (equity.equityName == item) {
          equity.number = val;
        }
      });
    },
    cancel() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
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
