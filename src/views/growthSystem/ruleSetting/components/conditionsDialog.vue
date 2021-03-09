<template>
  <common-dialog
    labelPosition="right"
    :visible.sync="ruleVisible"
    size="small"
    :label-width="'140px'"
    title="条件新增"
  >
    <el-form ref="form" :model="formData" :rules="rule" label-width="100px" label-position="right">
      <el-form-item label="指标类型：" prop="type">
        <el-radio-group @change="onChangeType" v-model="formData.type">
          <el-radio label="0">行为</el-radio>
          <el-radio label="1">交易</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="指标名：" prop="name">
        <el-select v-model="formData.name" placeholder="请选择" clearable>
          <el-option v-for="item in (formData.type == 0 ? quotaNameDaily : quotaNameCost)" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公式：" prop="formula">
        <el-select v-model="formData.formula" placeholder="请选择" clearable>
          <el-option v-for="item in formulaMap" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="值：" prop="value">
        <el-input v-model="formData.value" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="uploadBtnShow">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="mini" @click="ruleVisible = !ruleVisible"
        >取消</el-button
      >
      <el-button size="mini" @click="onSave">保存</el-button>
    </template>
  </common-dialog>
</template>

<script>
export default {
  data() {
    return {
      ruleVisible: this.visible,
      formData: {
        type: '0',
        name: ''
      },
      quotaNameDaily: [
        {
          label: "登陆",
          value: "login"
        },
        {
          label: "完善资料",
          value: "login1"
        },
        {
          label: "分享",
          value: "login2"
        },
        {
          label: "拉客",
          value: "login3"
        },
        {
          label: "打卡",
          value: "login4"
        },
        {
          label: "商品评论",
          value: "login5"
        },
        {
          label: "图片上传",
          value: "login6"
        },
        {
          label: "资产",
          value: "login7"
        },
      ],
      quotaNameCost: [
        {
          label: "交易笔数",
          value: "login8"
        },
        {
          label: "交易总金额",
          value: "login9"
        },
        {
          label: "单笔交易金额",
          value: "login11"
        },
        {
          label: "商户号",
          value: "login12"
        },
        {
          label: "MCC",
          value: "login13"
        },
        {
          label: "交易日期",
          value: "login14"
        },
        {
          label: "商品编号",
          value: "login15"
        },
      ],
      formulaMap: [
        {
          label: "大于",
          value: "1"
        },
        {
          label: "小于",
          value: "2"
        },
        {
          label: "等于",
          value: "3"
        },
        {
          label: "大于等于",
          value: "4"
        },
        {
          label: "小于等于",
          value: "5"
        },
        {
          label: "包含",
          value: "6"
        },
        {
          label: "不包含",
          value: "7"
        }
      ],
      rule: {
        type: [{required: true, message: "请选择指标类型", trigger: 'change'}],
        name: [{required: true, message: "请输入指标名称", trigger: 'change'}],
        formula: [{required: true, message: "请选择公式", trigger: 'change'}],
        value: [{required: true, message: "请输入值", trigger: 'change'}],
      }
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    dialogTitle: {
      type: [String | Number],
      default: () => {
        return 0;
      }
    },
  },
  computed: {
    uploadBtnShow() {
      return this.formData.name == 'login12' || this.formData.name == 'login13' || this.formData.name == 'login15'
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val == oldVal) return;
      this.ruleVisible = val;
    },
    ruleVisible(val, oldVal) {
      if (val == oldVal) return;
      this.$emit("update:visible", val);
    },
  },
  methods: {
    onChangeType(value) {
      this.formData.name = ''
    },
    onSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
            this.$emit('save', this.formData)
            this.$emit("update:visible", false);
        }
      })
    }
  }
};
</script>

<style></style>
