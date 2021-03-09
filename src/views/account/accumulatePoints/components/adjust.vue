<template>
  <div>
    <info :detailOption="detailOption"></info>
    <el-form class="form" ref="form" :model="addForm" label-width="35%" :rules="rules">
      <el-col :span="12">
        <el-form-item label="调整类型：" prop="adjustType">
           <el-radio-group v-model="addForm.adjustType">
            <el-radio label="1">调增</el-radio>
            <el-radio label="2">调减</el-radio>
          </el-radio-group>
          <!-- <el-radio v-model="addForm.adjustType" label="1">调增</el-radio>
          <el-radio v-model="addForm.adjustType" label="2">调减</el-radio> -->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="调整额度：" prop="adjustValue">
          <el-input v-model="addForm.adjustValue"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="备注：" prop="name">
          <el-input type="textarea" v-model="addForm.adjustReason"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import Info from "@/components/info";
export default {
  props: {
    info: {
      type: Object,
      defaults: {}
    }
  },
  components: { Info },
  data() {
    return {
      visible: this.adjustVisible,
      addForm: {
        adjustReason: "", // 原因
        adjustType: "", // 1增加 2减少
        adjustValue: "", // 调整的积分值
        custNo: this.info.custNo
      },
      detailOption: [
        { label: "客户号", value: this.info.custNo },
        { label: "所属机构", value: this.info.orgName },
        { label: "积分总值", value: this.info.totalIntegral },
        { label: "已使用积分值", value: this.info.usedIntegral },
        { label: "剩余积分值", value: this.info.avaIntegral }
      ],
      rules: {
        adjustType: [
          { required: true, message: "请选择调整类型", trigger: "change" }
        ],
        adjustValue: [
          { required: true, message: "请输入调整额度", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {},
    cancel() {
      this.visible = false;
    },
    clearHandle() {
      this.addForm = {};
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  overflow: hidden;
}
</style>
