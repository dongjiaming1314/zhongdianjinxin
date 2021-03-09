<template>
  <common-dialog
    :title="supplierAddOrEdit == 1 ? '供应商新增' : '供应商编辑'"
    :visible.sync="formVisible"
    v-if="formVisible"
    :size="'large'"
  >
    <el-form
      :rules="rules"
      :model="supplierForm"
      ref="supplierForm"
      label-width="125px"
      style="overflow: hidden"
    >
      <el-col :span="12">
        <el-form-item
          label="供应商名称："
          prop="supplierName"
        >
          <el-input
            v-model.trim="supplierForm.supplierName"
            placeholder="请输入供应商名称"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="供应商公司名称："
          prop="companyName"
        >
          <el-input
            v-model="supplierForm.companyName"
            placeholder="请输入供应商公司名称"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="税务代码："
          prop="taxCode"
        >
          <el-input
            v-model="supplierForm.taxCode"
            placeholder="请输入税务代码"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="纳税人登记号："
          prop="taxpayerCode"
        >
          <el-input
            v-model="supplierForm.taxpayerCode"
            placeholder="请输入纳税人登记号"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="法人代表："
          prop="legalPerson"
        >
          <el-input
            v-model="supplierForm.legalPerson"
            placeholder="请输入法人代表"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="性别："
          prop="sex"
        >
          <el-select
            v-model="supplierForm.sex"
            placeholder="请选择性别"
            clearable
          >
            <el-option
              v-for="item in gender"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="证件类型："
          prop="idType"
        >
          <el-select
            v-model="supplierForm.idType"
            placeholder="请选择证件类型"
            clearable
          >
            <el-option
              v-for="item in certificateType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="证件号码："
          prop="idNumber"
        >
          <el-input
            v-model="supplierForm.idNumber"
            placeholder="请输入证件号码"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="手机号码："
          prop="telphone"
        >
          <el-input
            v-model="supplierForm.telphone"
            placeholder="请输入手机号码"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="开户行："
          prop="openingBank"
        >
          <el-input
            v-model="supplierForm.openingBank"
            placeholder="请输入开户行"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="结算账号："
          prop="closeAccount"
        >
          <el-input
            v-model="supplierForm.closeAccount"
            placeholder="请输入结算账号"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="电子邮箱："
          prop="email"
        >
          <el-input
            required="false"
            v-model="supplierForm.email"
            placeholder="请输入电子邮箱"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="商户号："
          prop="businessCode"
        >
          <el-input
            v-model="supplierForm.businessCode"
            placeholder="请输入商户号"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="省："
          prop="privince"
        >
          <el-select
            v-model="supplierForm.privince"
            placeholder="请选择省"
            @change="changeProvince"
            clearable
          >
            <el-option
              v-for="item in regionData"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="市："
          prop="city"
        >
          <el-select
            v-model="supplierForm.city"
            placeholder="请选择市"
            @change="changeCity"
            clearable
          >
            <el-option
              v-for="item in addressCity"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="区/县："
          prop="county"
        >
          <el-select
            v-model="supplierForm.county"
            placeholder="请选择区/县"
            clearable
          >
            <el-option
              v-for="item in addressArea"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="详细地址："
          prop="address"
        >
          <el-input
            v-model="supplierForm.address"
            placeholder="请输入详细地址"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="供应商类型："
          prop="supplierTypes"
        >
          <el-checkbox-group v-model="supplierForm.supplierTypes">
            <el-checkbox
              v-for="item in supplierTypeList"
              :label="item.label"
              :key="item.value"
            >{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-form>
    <div
      slot="footer"
      align="right"
    >
      <el-button
        size="small"
        @click="cancelAdd"
      >取消</el-button>
      <el-button
        size="small"
        v-if="supplierAddOrEdit === 1"
        type="primary"
        @click="onSave"
        :loading="saveBtnLoading"
      >保存草稿</el-button>
      <el-button
        size="small"
        type="primary"
        :loading="submitBtnLoading"
        @click="onSubmit"
      >提交</el-button>
    </div>
  </common-dialog>
</template>
<script>
import Dialog from "@/components/Dialog";
import { deepClone } from "@/util/tag";
import { regionData } from "element-china-area-data";
import { remoteDic } from "@/api/admin/dict";
import { cardid } from "@/util/validate";
import { validatePhoneNum, validateEmailRule } from "@/util/validateRules";
import { addObj, editObj, editDraft } from "@/api/supmanage/info";
export default {
  components: { CommonDialog: Dialog },
  props: ["supplierAddOrEdit", "supplierAdd", "editForm"],
  data() {
    // 验证身份证号
    const idNum = (rule, value, callback) => {
      if (
        this.supplierForm.certificateType == 1 ||
        this.supplierForm.certificateType == 1
      ) {
        const res = cardid(value);
        if (!res[1].length) {
          callback();
        } else {
          callback(new Error(res[1]));
        }
      }
    };
    return {
      saveBtnLoading: false,
      submitBtnLoading: false,
      regionData,
      addressCity: [],
      addressArea: [],
      supplierTypeList: [
        { label: "实物供应商", value: 0 },
        { label: "商品供应商", value: 1 },
      ],
      certificateType: [],
      gender: [],
      businessType: [{ label: "合伙", value: 1 }],
      supplierForm: {
        supplierName: "",
        companyName: "",
        taxCode: "",
        taxpayerCode: "",
        legalPerson: "",
        sex: "",
        idType: "",
        idNumber: "",
        telphone: "",
        openingBank: "",
        closeAccount: "",
        email: "",
        businessCode: "",
        privince: "",
        city: "",
        county: "",
        address: "",
        supplierTypes: [],
      },
      formVisible: this.supplierAdd,
      rules: {
        supplierName: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
        companyName: [
          { required: false, message: "请输入供应商公司名称", trigger: "blur" },
        ],
        taxCode: [
          { required: true, message: "请输入税务代码", trigger: "blur" },
        ],
        taxpayerCode: [
          { required: true, message: "请输入纳税人登记号", trigger: "blur" },
        ],
        legalPerson: [
          { required: true, message: "请输入法人代表", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        idType: [
          { required: true, message: "请选择证件类型", trigger: "change" },
        ],
        idNumber: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
          // { validator: idNum, trigger: "blur" }
        ],
        telphone: [
          { required: true, validator: validatePhoneNum, trigger: "blur" },
        ],
        openingBank: [
          { required: true, message: "请输入开户行", trigger: "blur" },
        ],
        closeAccount: [
          { required: true, message: "请输入结算账号", trigger: "blur" },
        ],
        email: [{ validator: validateEmailRule, trigger: "blur" }],
        businessCode: [
          { required: true, message: "请选择商户号", trigger: "change" },
        ],
        privince: [{ required: true, message: "请选择省", trigger: "change" }],
        city: [{ required: true, message: "请选择市", trigger: "change" }],
        county: [{ required: true, message: "请选择区/县", trigger: "change" }],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        supplierTypes: [
          { required: true, message: "请选择供应商类型", trigger: "change" },
        ],
      },
    };
  },
  watch: {
    supplierAdd(val, oldVal) {
      if (val == oldVal) return;
      this.formVisible = val;
    },
    formVisible(val, oldVal) {
      if (val == oldVal) return;
      this.$emit("update:supplierAdd", val);
    },
  },
  mounted() {
    this.getDic();
    this.editFormHandle();
  },
  methods: {
    //编辑填充数据
    editFormHandle() {
      if (this.supplierAddOrEdit === 2 || this.supplierAddOrEdit === 3) {
        const pick = (obj, arr) =>
          arr.reduce(
            (iter, val) => (val in obj && (iter[val] = obj[val]), iter),
            {}
          );
        const supplierForm = Object.keys(this.supplierForm);
        this.supplierForm = pick(this.editForm, supplierForm);
        const supplierTypes = this.editForm.supplierType.split("#").slice(0, 2);
        this.$set(this.supplierForm, "supplierTypes", supplierTypes);
      }
    },
    // 取消新增
    cancelAdd() {
      this.supplierForm = {};
      this.$emit("update:supplierAdd", false);
    },
    // 提交新增
    onSubmit() {
      // 新增
      if (this.supplierAddOrEdit === 1) {
        this.$refs["supplierForm"].validate((valid) => {
          if (valid) {
            this.submitBtnLoading = true;
            this.supplierForm.flag = "insert";
            addObj(
              Object.assign(this.supplierForm, {
                checkType: "1",
                supplierStatus: "1",
              })
            )
              .then((res) => {
                if (res.data.code === 0) {
                  this.$message({
                    type: "success",
                    message: "新增成功",
                  });
                  this.submitBtnLoading = false;
                  this.cancelAdd();
                  this.$emit("refreshList");
                }
              })
              .catch((res) => {
                this.submitBtnLoading = false;
              });
          } else {
            return false;
          }
        });
      } else if (this.supplierAddOrEdit === 2) {
        // 编辑
        // this.supplierForm.id = this.editId;
        this.$refs["supplierForm"].validate((valid) => {
          if (valid) {
            editObj(Object.assign(this.supplierForm, { checkType: "2" ,supplierNumber:this.editForm.supplierNumber}))
              .then((res) => {
                if (res.data.code === 0) {
                  this.$message({
                    type: "success",
                    message: "修改成功",
                  });
                  this.cancelAdd();
                  this.$emit("refreshList");
                }
              })
              .catch((res) => {
              });
          }
        });
      } else if (this.supplierAddOrEdit === 3) {
        // 编辑草稿
        this.$refs["supplierForm"].validate((valid) => {
          if (valid) {
            editDraft(Object.assign(this.supplierForm, { checkStatus: "3" ,supplierNumber:this.editForm.supplierNumber,businessAuditId:this.editForm.businessAuditId}))
              .then((res) => {
                if (res.data.code === 0) {
                  this.$message({
                    type: "success",
                    message: "修改成功",
                  });
                  this.cancelAdd();
                  this.$emit("refreshList");
                }
              })
              .catch((res) => {
              });
          }
        });
      }
    },
    // 保存新增
    onSave() {
      this.$refs["supplierForm"].validate((valid) => {
        if (valid) {
          this.saveBtnLoading = true;
          this.supplierForm.flag = "save";
          addObj(
            Object.assign(this.supplierForm, {
              checkType: "1",
              supplierStatus: "1",
              checkStatus: "1",
            })
          )
            .then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: "保存成功",
                });
                this.saveBtnLoading = false;
                this.cancelAdd();
                this.$emit("refreshList");
              }
            })
            .catch((res) => {
              this.saveBtnLoading = false;
              this.cancelAdd();
            });
        } else {
          return false;
        }
      });
    },
    getDic() {
      // remoteDic("id_type").then(res => {
      //   this.certificateType = res.data.data;
      // });
      remoteDic("gender,id_type").then((res) => {
        this.gender = res.data.data.gender;
        this.certificateType = res.data.data.id_type;
      });
    },
    changeProvince(value) {
      regionData.forEach((item, index) => {
        if (item.label === value) {
          this.addressCity = item.children;
        }
      });
    },
    changeCity(value) {
      this.addressCity.forEach((item, index) => {
        if (item.label === value) {
          this.addressArea = item.children;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
::v-deep .el-checkbox__label {
  font-weight: normal;
}
.el-col-12 {
  &:nth-child(2n - 1) {
    margin-left: -20px;
    margin-right: 20px;
  }
}
</style>
