<template>
  <common-dialog
    labelPosition="right"
    :visible.sync="visible"
    size="large"
    :label-width="'100px'"
    :title="'客户等级' + (dialogTitle == 0 ? '新增' : '编辑')"
  >
    <el-form
      class="form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="130px"
    >
      <el-col :span="12">
        <el-form-item label="客户等级名称：" label-width="175px" prop="levelName">
          <el-input v-model="form.levelName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户等级编码：" prop="levelCode">
          <el-input v-model="form.levelCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="达标资产值(AUM)(万)：" label-width="175px" prop="aum">
          <el-input v-model="form.aum"></el-input>
        </el-form-item>
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
import {add, edit} from "@/api/growthSystem/customerRank"
import {validatenum, validatenumord, validateIntegerDecimal} from "@/util/validate"
export default {
  props: {
    addVisible: {
      type: Boolean,
      default: () => false
    },
    dialogTitle: {
      type: Number,
      default: () => 0
    },
    detail: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    // 验证是整数或小数必填
    const validateIntegerDecimalRequired = (rule, value, callback) => {
      if(!this.validatenull(value)) {
        if (validateIntegerDecimal(value)) {
          callback()
        } else {
          callback(new Error("请输入正确的整数或小数"))
        }
      } else {
        callback(new Error("请输入达标资产值"))
      }
    }
    return {
      visible: this.addVisible,
      dialogTitle: 0,
      form: {
        levelName: "",
        levelCode: "",
        aum: "",
        enabled: ""
      },
      rules: {
        levelName: [{required: true, message: "请输入客户名称", trigger: "change"}],
        levelCode: [{required: true, message: "请输入客户编码", trigger: "change"}],
        aum: [{required: true, validator: validateIntegerDecimalRequired, trigger: "change"}],
        enabled: [{required: true, message: "请选择是否启用", trigger: "change"}],
      }
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
    }
  },
  created() {
    if (this.isEdit) {
      const obj = this.deepClone(this.detail)
      this.form.id = obj.id
      Object.keys(this.form).forEach(item => {
        this.form[item] = obj[item]
      })
    }
  },
  methods: {
    cancel() {
      this.visible = false;
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.isEdit) {
            add(this.form).then(res => {
              this.$message.success("新增成功")
              this.visible = false;
              this.$emit("submitSuccess")
            })
          } else {
            edit(this.form).then(res => {
              this.$message.success("修改成功")
              this.visible = false;
              this.$emit("submitSuccess")
            })
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  overflow: hidden;
}
</style>
