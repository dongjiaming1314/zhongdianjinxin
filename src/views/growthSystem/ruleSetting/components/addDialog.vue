<template>
  <div class="add">
    <common-dialog
      labelPosition="right"
      :visible.sync="addVisible"
      size="large"
      :label-width="'100px'"
      :title="dialogTitle == 0 ? '新增' : '编辑'"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="规则名称：" prop="name">
            <el-input v-model="dialogParams.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生效时间起：">
            <el-date-picker
              v-model="dialogParams.time"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="生效时间止：">
            <el-date-picker
              v-model="dialogParams.time"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="奖励经验：">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <div class="px_10">
          <span class="inline_block tableText">条件列表</span>
          <span>
            <el-button size="mini" type="primary" @click="ruleAdd"
              >新增</el-button
            >
          </span>
        </div>
        <div>
          <el-table size="small" :data="dialogTable">
            <el-table-column label="序号" prop="index"></el-table-column>
            <el-table-column label="指标名称" prop="name"></el-table-column>
            <el-table-column label="公式" prop="formula"></el-table-column>
            <el-table-column label="值" prop="value"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  size="small"
                  type="text"
                  @click="dialogDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="条件关系：">
            <el-radio-group v-model="dialogParams.reletionShip">
              <el-radio :label="0">与</el-radio>
              <el-radio :label="1">或</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <div>规则限制</div>
        </el-col>
        <el-col :span="24">
          <el-form-item label-width="155px" label="每日获取最大经验值：">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label-width="155px" label="每周获取最大经验值：">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label-width="155px" label="每月获取最大经验值：">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-slot:footer>
        <el-button @click="addVisible = false" size="small">取消</el-button>
        <el-button @click="saveHandler" type="primary" size="small">保存草稿</el-button>
        <el-button @click="addHandler" type="primary" size="small">提交</el-button>
      </template>
    </common-dialog>

    <!-- 条件新增弹框 -->
    <ConditionDialog
      ref="condition"
      v-if="conditionVisible"
      :visible.sync="conditionVisible"
      :dialogTitle="dialogTitle"
      @save="save"
    ></ConditionDialog>
  </div>
</template>

<script>
import ConditionDialog from "./conditionsDialog";
export default {
  data() {
    return {
      addVisible: this.visible,
      dialogParams: {},
      dialogTable: [
        {
          index: 1,
          name: '111'
        }
      ],
      conditionVisible: false
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
    }
  },
  components: {
    ConditionDialog
  },
  watch: {
    visible(val, oldVal) {
      if (val == oldVal) return;
      this.addVisible = val;
    },
    addVisible(val, oldVal) {
      if (val == oldVal) return;
      this.$emit("update:visible", val);
    }
  },
  methods: {
    ruleAdd() {
      this.conditionVisible = true;
    },
    dialogDelete(row) {
      console.log(row)
    },
    saveHandler() {},
    addHandler() {},
    save() {
      this.dialogTable.push(form)
    }
  }
};
</script>

<style lang="scss" scoped>
.add {
  .el-table {
    width: 90%;
    margin: 10px auto;
  }
}
::v-deep .el-select,
::v-deep .el-date-editor.el-input,
::v-deep .el-date-editor.el-input__inner {
  width: 100%;
}
.tableText {
  margin-right: 10px;
  display: inline-block;
}
</style>
