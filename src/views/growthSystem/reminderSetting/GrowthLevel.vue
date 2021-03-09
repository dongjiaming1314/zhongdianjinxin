<template>
  <!--成长等级-->
  <el-dialog
    style="z-index: 2066"
    title="成长等级"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose"
  >
    <div style="text-align: right;;margin-bottom: 15px">
      <el-button
        size="small"
        type="primary"
        @click="handleAdd"
        v-if="isAdd"
      >新 增</el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleEdit"
        v-if="!isEdit"
      >编 辑</el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleDel"
        v-if="!isEdit"
      >删 除</el-button>
      <el-button
        size="small"
        type="primary"
        @click="comeBack"
        v-if="isEdit"
      >返 回</el-button>
    </div>
    <!--详情-->
    <div v-if="!isEdit">
      <el-form
        ref="viewForm"
        :model="viewForm"
        label-width="120px"
      >
        <el-col :span="12">
          <el-form-item
            label="客户等级名称："
            label-width="175px"
          >{{ viewForm.levelName }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户等级编码：">{{ viewForm.levelCode }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="达标资产值(AUM)(万)："
            label-width="175px"
          >{{ viewForm.aum }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否启用：">{{ viewForm.enabled }}</el-form-item>
        </el-col>
      </el-form>
    </div>
    <!--编辑-->
    <el-form
      ref="addForm"
      :model="addForm"
      :rules="rules"
      label-width="120px"
      v-if="isEdit"
    >
      <el-col :span="12">
        <el-form-item
          label="客户等级名称："
          label-width="175px"
          prop="levelName"
        >
          <el-input v-model="addForm.levelName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="客户等级编码："
          prop="levelCode"
        >
          <el-input v-model="addForm.levelCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="达标资产值(AUM)(万)："
          label-width="175px"
          prop="aum"
        >
          <el-input v-model="addForm.aum"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="是否启用："
          prop="enabled"
        >
          <el-switch
            v-model="addForm.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-col>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        :loading="loading"
        size="small"
        type="primary"
        @click="handleOn"
        v-if="isEdit"
      >提 交</el-button>
      <el-button
        size="small"
        @click="handleClose"
      >取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  addLevel,
  editLevel,
  getLevelDetail,
  delLevel,
} from "@/api/growthSystem/reminderSetting";

export default {
  name: "GrowthLevel",
  data() {
    return {
      dialogVisible: false,
      id: "",
      isAdd: true,
      isEdit: false,
      loading: false,
      addForm: {
        levelName: "",
        levelCode: "",
        aum: "",
        enabled: false,
      },
      viewForm: {
        levelName: "",
        levelCode: "",
        aum: "",
        enabled: false,
      },
      rules: {
        levelName: [
          {
            required: true,
            message: "请输入客户等级名称",
            trigger: "change",
          },
        ],
        levelCode: [
          {
            required: true,
            message: "请输入客户等级编码",
            trigger: "change",
          },
        ],
        aum: [
          {
            required: true,
            message: "请输入达标资产值(AUM)",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    openWin(_id) {
      this.isEdit = false;
      this.isAdd = true;
      this.$nextTick(() => {
        this.dialogVisible = true;
        if (_id) {
          this.id = _id;
          getLevelDetail(this.id)
            .then((res) => {
              // this.addForm.levelName = res.data.data.levelName;
              // this.addForm.levelCode = res.data.data.levelCode;
              // this.addForm.aum = res.data.data.aum;
              // this.addForm.enabled = res.data.data.enabled === "0";
              this.viewForm.levelName = res.data.data.levelName;
              this.viewForm.levelCode = res.data.data.levelCode;
              this.viewForm.aum = res.data.data.aum;
              this.viewForm.enabled =
                res.data.data.enabled === "0" ? "启用" : "不启用";
            })
            .catch((res) => {
              this.$message.error(res);
            });
        }
      });
    },
    handleAdd() {
      this.isAdd = false;
      this.isEdit = true;
      this.addForm = {
        levelName: "",
        levelCode: "",
        aum: "",
        enabled: false,
      };
    },
    handleEdit() {
      this.isEdit = true;
      this.isAdd = false;
      getLevelDetail(this.id)
        .then((res) => {
          this.addForm.levelName = res.data.data.levelName;
          this.addForm.levelCode = res.data.data.levelCode;
          this.addForm.aum = res.data.data.aum;
          this.addForm.enabled = res.data.data.enabled === "0";
        })
        .catch((res) => {
          this.$message.error(res);
        });
    },
    comeBack() {
      this.isAdd = true;
      this.isEdit = false;
      this.addForm = {
        levelName: "",
        levelCode: "",
        aum: "",
        enabled: false,
      };
    },
    handleOn() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          const subForm = this.addForm;
          subForm.enabled = subForm.enabled ? "0" : "1";
          this.loading = true;
          if (!this.isAdd) {
            editLevel(Object.assign({}, subForm, { id: this.id }))
              .then((res) => {
                this.$message.success(res.data.msg);
                this.$refs["addForm"].resetFields();
                this.loading = false;
                this.handleClose();
                this.$emit("getList");
              })
              .catch((res) => {
                this.loading = false;
                this.$message.error(res);
              });
          } else {
            addLevel(subForm)
              .then((res) => {
                this.$message.success(res.data.msg);
                this.$refs["addForm"].resetFields();
                this.loading = false;
                this.handleClose();
                this.$emit("getList");
              })
              .catch((res) => {
                this.loading = false;
                this.$message.error(res);
              });
          }
        }
      });
    },
    handleDel() {
      this.$confirm("此操作将永久删除该数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delLevel(this.id)
          .then((res) => {
            this.$message.success(res.data.msg);
            this.handleClose();
            this.$emit("getList");
          })
          .catch((res) => {
            this.$message.error(res);
          });
      });
    },
    handleClose() {
      this.isEdit = false;
      this.dialogVisible = false;
      this.addForm = {
        levelName: "",
        levelCode: "",
        aum: "",
        enabled: false,
      };
    },
  },
};
</script>

<style scoped>
</style>
