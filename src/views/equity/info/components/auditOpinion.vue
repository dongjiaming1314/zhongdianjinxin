<template>
  <common-dialog :visible.sync="showDetail" title="审核" :size="'large'" @close="closeFn">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="审核意见：" prop="checkStatus">
        <el-radio-group v-model="form.checkStatus">
          <el-radio v-for="item in this.radioList" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核备注：" prop="checkMark">
        <el-input type="textarea" v-model="form.checkMark"></el-input>
      </el-form-item>
    </el-form>

    <template v-slot:footer>
      <el-button size="small" type="primary" @click="closeFn">取消</el-button>
      <el-button size="small" type="primary" @click="sureFn">确认</el-button>
    </template>
  </common-dialog>
</template>
<script>
import { verifyObj } from "@/api/equity/info";

import { mapGetters } from "vuex";
export default {
  name: "auditOpinion",
  props: ["checkStatusList", "page", "showDetail", "equityId", "checkType"],
  computed: {
    radioList() {
      return this.checkStatusList.filter(
        item => item.label === "审核不通过" || item.label === "审核通过"
      );
    },

    ...mapGetters(["tag"]),
    rules() {
      if (this.form.checkStatus === "5") {
        return {
          checkStatus: [
            {
              required: true,
              message: "请选择",
              trigger: "change"
            }
          ],
          checkMark: [
            {
              min: 0,
              max: 3000
            },
            {
              required: true,
              message: "请输入",
              trigger: "change"
            }
          ]
        };
      } else {
        return {
          checkStatus: [
            {
              required: true,
              message: "请选择",
              trigger: "change"
            }
          ],
          checkMark: [
            {
              min: 0,
              max: 3000
            },
            {
              message: "请输入",
              trigger: "change"
            }
          ]
        };
      }
    }
  },
  data() {
    return {
      radio: "",
      form: {
        checkMark: "",
        checkStatus: ""
      }
    };
  },
  methods: {
    closeFn() {
      this.$refs["form"].resetFields();
      this.$emit("closeFn");
    },
    sureFn() {
      verifyObj(
        Object.assign(this.form, {
          gid: this.tag.query.menuId,
          equityId: this.equityId,
          checkType: this.checkType
        })
      )
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.closeFn();
          this.$emit("getList", this.page);
        })
        .catch(response => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.detailInfo {
  .labelText {
    text-align: right;
  }
  .el-row > .el-col {
    padding: 0 4px 4px;
    margin-bottom: 0;
    .el-row {
      line-height: 40px;
      border-radius: 4px;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.8);
      font-family: PingFangSC-Regular;
      // font-weight: bolder;
      .el-col {
        margin-bottom: 0;
        padding: 0;
      }
    }
  }
  .el-row:nth-child(odd) > .el-col {
    .el-row {
      background-color: #f4f4f5;
    }
  }
}
</style>