<template>
  <div class="indexDetail">
    <el-row>
      <el-col :span="24">
        <h3 class="title buttonCover">
          <span>{{ editNow ? "权益信息编辑" : "权益信息新增" }}</span>
          <el-button
            type="primary"
            size="small"
            @click="cancelInfo"
          >关闭</el-button>
        </h3>
      </el-col>
    </el-row>
    <div>
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="权益基本信息"
          name="first"
          class="leftCover"
        >
          <el-form
            :inline="true"
            :rules="rules"
            ref="infoForm"
            :model="infoForm"
            class="demo-form-inline"
            label-width="150px"
          >
            <el-row>
              <el-col :span="11">
                <el-form-item
                  label="权益名称："
                  prop="equityName"
                >
                  <el-input
                    v-model="infoForm.equityName"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="11">
                <el-form-item
                  label="权益目录："
                  prop="equityCataId"
                >
                  <avue-input-tree
                    v-model="infoForm.equityCataId"
                    placeholder="请选择权益目录"
                    type="tree"
                    :dic="equityList"
                    :props="defaultProps"
                  >
                  </avue-input-tree>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item
                  label="权益成本："
                  prop="equityCost"
                >
                  <el-input
                    v-model="infoForm.equityCost"
                    type="text"
                    minlength='0'
                    maxlength='11'
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="11">
                <!-- <el-form-item label="所属商户：" prop="clientId">
                            <el-input v-model="infoForm.clientId" placeholder="请输入"></el-input>
                          </el-form-item> -->
                <el-form-item
                  label="权益可用渠道："
                  prop="availChan"
                >
                  <el-select
                    v-model="infoForm.availChan"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in channelList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item
                  label="权益库存："
                  prop="equityInventory"
                >
                  <!-- 审核通过的进行编辑时，权益库存不可修改 -->
                  <el-input
                    :disabled="checkType!=='1'"
                    v-model="infoForm.equityInventory"
                    type="text"
                    minlength='0'
                    maxlength='11'
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="11">
                <el-form-item
                  label="库存预警："
                  prop="inventoryWarning"
                >
                  <el-input
                    v-model="infoForm.inventoryWarning"
                    placeholder="请输入"
                    type="text"
                    minlength='0'
                    maxlength='11'
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item
                  label="权益类型："
                  prop="equityType"
                >
                  <el-select
                    v-model="infoForm.equityType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in equityChoice"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="11">
                <el-form-item
                  label="权益有效期(天)："
                  prop="equityValidity"
                >
                  <el-input
                    v-model="infoForm.equityValidity"
                    placeholder="请输入"
                    type="text"
                    minlength='0'
                    maxlength='6'
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item
                  label="供应商："
                  prop="supplierBusinessId"
                >
                  <el-select
                    v-model="infoForm.supplierBusinessId"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in suppliers"
                      :key="item.value"
                      :label="item.supplierName"
                      :value="item.supplierNumber"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="11">
                <el-form-item
                  label="备注："
                  prop="remark"
                >
                  <el-input
                    v-model="infoForm.remark"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row style="text-align: right">
            <el-button
              size="small"
              type="primary"
              @click="cancelInfo"
            >取消</el-button>
            <el-button
              size="small"
              type="primary"
              @click="basicOnSubmit('infoForm')"
            >保存草稿</el-button>
            <el-button
              size="small"
              type="primary"
              @click="nextStep"
            >下一步</el-button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="权益展示配置"
          name="second"
          class="rightCover"
        >
          <!-- <el-row>
                        <el-col :span="6">
                            <div class="previewEquity">
                                <div class="textCover">
                                    {{ previewForm.displayName }}
                                </div>
                                <div class="imgCover">
                                    <img
                                        :src="previewForm.playUrl"
                                        alt="展示图片"
                                    />
                                </div>
                                <div class="textCover">
                                    {{ previewForm.displayFullName }}
                                </div>
                                <div class="textCover">
                                    {{ previewForm.useIntroduction }}
                                </div>
                                <div class="imgCover">
                                    <img
                                        :src="previewForm.detailUrl"
                                        alt="详情图"
                                    />
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="1"></el-col>
                        <el-col :span="17"> -->
          <div class="equityFlex">
            <el-form
              ref="setForm"
              :rules="uploadRules"
              :model="setForm"
              label-width="100px"
            >
              <el-form-item
                label="展示图标："
                prop="backChoice"
              >
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/upload"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="showData.url"
                    :src="showData.url"
                    class="avatar"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
              </el-form-item>
              <el-form-item
                label="展示名称："
                prop="displayName"
              >
                <el-input v-model="setForm.displayName"></el-input>
              </el-form-item>
              <el-form-item
                label="展示全称："
                prop="displayFullName"
              >
                <el-input v-model="setForm.displayFullName"></el-input>
              </el-form-item>
              <el-form-item
                label="详情图："
                prop="backChoice"
              >
                <el-upload
                  class="avatar-uploader"
                  action="/admin/file/upload"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleDetailSuccess"
                  :before-upload="beforeDetailUpload"
                >
                  <img
                    id="detailImage"
                    v-if="detailData.url"
                    :src="detailData.url"
                    class="avatar"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
              </el-form-item>
              <el-form-item
                label="展示图片："
                prop="backChoice"
              >
                <el-upload
                  class="upload-demo"
                  action="/admin/file/upload"
                  :headers="headers"
                  :on-preview="handlePreview"
                  :show-file-list="false"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :on-success="handleTableSuccess"
                  :before-upload="beforeDetailUpload"
                  :file-list="fileList"
                >
                  <el-button
                    size="small"
                    type="primary"
                  >新增</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div> -->
                </el-upload>
              </el-form-item>

              <el-row>
                <el-col :span="24">
                  <el-table
                    :data="tableData"
                    border
                    style="width: 300px"
                  >
                    <el-table-column
                      type="index"
                      label="序号"
                      width="50"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="original"
                      label="图片"
                      width="190"
                    >
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="60"
                    >
                      <template slot-scope="scope">
                        <el-button
                          @click=" deletePicture(  scope.row,scope.$index)"
                          type="text"
                          size="small"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
              <el-form-item
                label="使用介绍："
                prop="useIntroduction"
              >
                <el-input
                  type="textarea"
                  v-model="setForm.useIntroduction"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <!-- </el-col>
                    </el-row> -->

          <div style="text-align: right">
            <el-button
              type="primary"
              size="small"
              @click="previewShow"
            >预览</el-button>
            <el-button
              type="primary"
              size="small"
              @click="cancelInfo"
            >取消</el-button>
            <el-button
              type="primary"
              size="small"
              @click="displayOnSubmit"
            >保存草稿</el-button>
            <el-button
              type="primary"
              size="small"
              @click="setSubmit"
            >提交</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <preview-page
      v-if="previewNow"
      :showDetail.sync="previewNow"
      :previewForm="previewForm"
      v-on:closeFn="closeFn($event)"
    ></preview-page>
  </div>
</template>

<script>
import Bus from "@/util/bus.js";
import { fetchList, putObj, getSupplier } from "@/api/equity/info";
import { remoteDic } from "@/api/admin/dict";
import { mapGetters } from "vuex";
import { getAllList } from "@/api/equity/catalogue";
import { validatenull } from "@/util/validate";
import { rule } from "@/util/validateRules";
import { handleImg } from "@/util/util";
import previewPage from "./preview";
export default {
  name: "equityDetail",
  props: ["id", "selectRadio", "checkType", "checkStatus"],
  // checkType: "", // checkType 1 新增 2修改 3 删除

  components: {
    previewPage,
  },
  computed: {
    ...mapGetters(["access_token", "tag"]),
    headers() {
      return {
        Authorization: "Bearer " + this.access_token,
      };
    },
    editNow() {
      return !!this.id; //true 新增 false 编辑
    },
  },
  data() {
    return {
      channelList: [],
      departmentNo: "",
      defaultProps: {
        label: "cataName",
        value: "id",
        children: "children",
      },
      deptObj: {
        id: "",
        cataName: "",
      },
      firstOpen: false,
      equityList: [],
      // 权益类型
      equityChoice: [],
      tableData: [
        // {
        //   // date: '2016-05-02',
        //   name: '王小虎',
        //   // address: '上海市普陀区金沙江路 1518 弄'
        // }
      ],
      activeName: "first", //权益信息，权益展示配置切换
      // 添加
      rules: {
        equityName: [
          {
            required: true,
            message: "请输入权益名称",
            trigger: "blur",
          },
          {
            min: 0,
            max: 100,
            message: "长度在 0 到 100 个字符",
            trigger: "blur",
          },
        ],
        equityCataId: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        equityCost: [
          {
            required: false,
            trigger: "blur",
            validator: rule.validateNegaNum,
          },
        ],
        equityInventory: [
          {
            required: true,
            validator: rule.validateNegaIntNumReq,
            trigger: "blur",
          },
        ],
        inventoryWarning: [
          {
            required: false,
            validator: rule.validateNegaIntNum,
            trigger: "blur",
          },
        ],
        equityType: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        // availChan: [
        //     {
        //         type: "number",
        //         required: true,
        //         message: "请输入",
        //         trigger: "blur",
        //     },
        // ],
        equityValidity: [
          {
            required: true,
            validator: rule.validateNegaIntNumReq,
            trigger: "blur",
          },
        ],
        supplierBusinessId: [
          {
            required: true,
            message: "请输入",
            trigger: "change",
          },
        ],
      },
      //权益新增表单
      infoForm: {
        equityName: "",
        equityCataId: "",
        equityCost: "",
        availChan: "",
        equityInventory: "",
        inventoryWarning: "",
        equityType: "",
        equityValidity: "",
        remark: "",
      },
      setForm: {
        //权益展示设置
        displayName: "",
        displayFullName: "",
        useIntroduction: "",
      },
      uploadRules: {
        displayName: [
          {
            min: 0,
            max: 100,
          },
          {
            required: true,
            message: "请输入展示名称",
            trigger: "change",
          },
        ],
        displayFullName: [
          {
            min: 0,
            max: 100,
          },
          {
            required: true,
            message: "请输入展示全称",
            trigger: "change",
          },
        ],
        useIntroduction: [
          {
            min: 0,
            max: 30000,
          },
          {
            required: true,
            message: "请输入说明",
            trigger: "change",
          },
        ],
      },
      // 展示图片
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }, {
        //   name: 'food2.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        //   }
      ],
      previewForm: {
        displayName: "",
        displayFullName: "",
        useIntroduction: "",
        playData: [],
        detailUrl: "",
      },
      previewNow: false,
      //权益详情
      detailData: {
        // url: require("@/static/detailPic.jpg"),
        url: "",
        original: "", //文件名
        fileName: "", //返回文件名
      },
      showData: {
        // url: require("@/static/showPic.jpg"),
        url: "",
        original: "", //文件名
        fileName: "", //返回文件名
      },
      suppliers: [], //供应商
    };
  },
  created() {
    // 获取权益类型，权益有效渠道
    remoteDic("equity_type,equity_available_channels").then((response) => {
      // getType('equity_type').then(response=>{
      this.equityChoice = response.data.data["equity_type"];
      this.channelList = response.data.data["equity_available_channels"];
    });

    // 获取权益目录
    getAllList(1).then((response) => {
      this.equityList = response.data.data;
    });
    // 编辑获取信息
    if (!!this.id) {
      this.getEditInfo();
    }
    //获取供应商
    getSupplier({ supplierStatus: "0" }).then((res) => {
      this.suppliers = res.data.data.records;
    });

    // console.log(this.menu)
  },

  methods: {
    // 获取编辑信息
    getEditInfo() {
      fetchList(
        Object.assign({
          equityId: this.id,
          checkStatus: this.checkStatus,
        })
      ).then((response) => {
        this.infoForm = response.data.data.records[0];
        this.setForm = response.data.data.records[0];
        this.showData = response.data.data.records[0].displayIcon
          ? response.data.data.records[0].displayIcon
          : {
              //   url: require("@/static/showPic.jpg"),
              url: "",
              original: "", //文件名
              fileName: "", //返回文件名
            };
        this.detailData = response.data.data.records[0].detailPicture
          ? response.data.data.records[0].detailPicture
          : {
              //   url: require("@/static/showPic.jpg"),
              url: "",
              original: "", //文件名
              fileName: "", //返回文件名
            };
        this.tableData = response.data.data.records[0].displayPictures.length
          ? response.data.data.records[0].displayPictures
          : [];
        // 将编辑信息展现在页面中
        // this.editData = response.data.data.records[0]
      });
    },
    // 检测必填项
    async checkNecessary() {
      if (!this.showData.fileName) {
        this.$message({
          message: "请上传展示图标",
          type: "warning",
        });
        return false;
      }
      if (!this.detailData.fileName) {
        this.$message({
          message: "请上传详情图",
          type: "warning",
        });
        return false;
      }
      if (!this.tableData.length) {
        this.$message({
          message: "请上传展示图片",
          type: "warning",
        });
        return false;
      }
      return true;
    },

    // 展示图片
    handlePreview(file) {
      // console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 详情图
    handleDetailSuccess(res, file) {
      // console.log(file)
      if (res.code === 0) {
        this.detailData = {
          // url: URL.createObjectURL(file.raw),
          url: res.data.url,
          //     url:
          // 'http://localhost:8081/admin/file/0b208f9c4f8747398b62c8ac76e7889b.jpg',
          fileName: res.data.fileName,
          original: res.data.original,
        };
        // handleImg('0b208f9c4f8747398b62c8ac76e7889b.jpg','detailImage')
      } else {
        this.$message.error("详情图片上传失败！");
      }
    },
    beforeDetailUpload(file) {
      // console.log(file.type)
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleTableSuccess(res, file) {
      if (res.code === 0) {
        this.tableData.push({
          url: URL.createObjectURL(file.raw),
          fileName: res.data.fileName,
          original: res.data.original,
        });
        this.fileList = [];
      } else {
        this.fileList = [];
        this.$message.error("展示图片上传失败！");
      }
    },
    // 图标
    handleAvatarSuccess(res, file) {
      if (res.code === 0) {
        this.showData = {
          url: URL.createObjectURL(file.raw),
          fileName: res.data.fileName,
          original: res.data.original,
        };
      } else {
        this.$message.error("图标上传失败！");
      }
    },
    beforeAvatarUpload(file) {
      // console.log(file.type)
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 删除展示图片
    deletePicture(row, index) {
      this.tableData.splice(index, 1);
    },
    // 上传展示图片
    uploadFn() {},
    // 权益新增进入权益展示配置
    nextStep() {
      this.activeName = "second";
    },
    // 权益基本信息新增草稿
    async basicOnSubmit() {
      // 检测数据
      this.$refs["infoForm"].validate((valid) => {
        if (valid) {
          let params = Object.assign(this.infoForm, this.setForm);
          this.showData["filePurposes"] = "1";
          this.showData["checkStatus"] = "1";
          this.detailData["filePurposes"] = "2";
          this.detailData["checkStatus"] = "1";
          this.tableData = this.tableData.map((item) => {
            item["filePurposes"] = "3";
            item["checkStatus"] = "1";
            return item;
          });
          let middleArr = new Array(0);
          middleArr.push(this.showData, this.detailData);
          let annexPictures = middleArr.concat(this.tableData);

          params["annexPictures"] = annexPictures;
          params["checkStatus"] = "1";
          params["checkType"] = this.checkType;
          params["gid"] = this.tag.query.menuId;
          let that = this;
          putObj(params)
            .then((response) => {
              // this.infoAdd = false
              // 清空数据
              that.clearInfo();
              that.clearShow();
              // this.getList(this.page)
              that.$message.success(response.data.msg);
              // 回到列表页
              Bus.$emit("equityInfo", {
                first: "list",
                second: null,
                third: "second",
                fourth: null,
              });
            })
            .catch(() => {
              that.$message.error(response.data.msg);
            });
        } else {
          this.$message.warning("请填写权益信息的必输项");
          return false;
        }
      });
    },
    //展示信息保存草稿
    async displayOnSubmit() {
      let checkNecessary = await this.checkNecessary();
      if (checkNecessary) {
        // 检测数据
        this.$refs["setForm"].validate((valid) => {
          if (valid) {
            let params = Object.assign(this.infoForm, this.setForm);
            this.showData["filePurposes"] = "1";
            this.showData["checkStatus"] = "1";
            this.detailData["filePurposes"] = "2";
            this.detailData["checkStatus"] = "1";
            this.tableData = this.tableData.map((item) => {
              item["filePurposes"] = "3";
              item["checkStatus"] = "1";
              return item;
            });
            let middleArr = new Array(0);
            middleArr.push(this.showData, this.detailData);
            let annexPictures = middleArr.concat(this.tableData);

            params["annexPictures"] = annexPictures;
            params["checkStatus"] = "1";
            params["checkType"] = this.checkType;
            params["gid"] = this.tag.query.menuId;
            console.log(params);
            let that = this;
            putObj(params)
              .then((response) => {
                // this.infoAdd = false
                // 清空数据
                that.clearInfo();
                that.clearShow();
                // this.getList(this.page)
                that.$message.success(response.data.msg);
                // 回到列表页
                Bus.$emit("equityInfo", {
                  first: "list",
                  second: null,
                  third: "second",
                  fourth: null,
                });
              })
              .catch(() => {
                that.$message.error(response.data.msg);
              });
          } else {
            this.$message.warning("请填写权益展示配置的必输项");
            return false;
          }
        });
      }
    },
    // onSubmit(formName) {
    //   // 提交数据
    //   // 到申请页面

    //   // this.infoForm
    //   // this.setForm
    //   let params = Object.assign(this.infoForm, this.setForm);
    //   let annexPictures = new Array(0);
    //   // let annexPictures =
    //   // showData.url 图标
    //   // detailData.url 详情
    //   // this.tableData 展示图片
    //   // 合并图片
    //   // checkStatus 1 草稿 3待审核
    //   // filePurposes1.展示图标 2.详情图 3.展示图片
    //   if (this.showData.fileName) {
    //     this.showData["filePurposes"] = "1";
    //     this.showData["checkStatus"] = "1";
    //     annexPictures.push(this.showData);
    //   }
    //   if (this.detailData.fileName) {
    //     this.detailData["filePurposes"] = "2";
    //     this.detailData["checkStatus"] = "1";
    //     annexPictures.push(this.detailData);
    //   }
    //   if (this.tableData.length) {
    //     this.tableData = this.tableData.map(item => {
    //       item["filePurposes"] = "3";
    //       item["checkStatus"] = "1";
    //       return item;
    //     });

    //     annexPictures = annexPictures.concat(this.tableData);
    //   }

    //   params["annexPictures"] = annexPictures;
    //   params["checkStatus"] = "1";

    //   params["checkType"] = this.checkType;
    //   params["gid"] = this.tag.query.menuId;
    //   putObj(params)
    //     .then(response => {
    //       // 清空数据
    //       this.clearInfo();
    //       this.clearShow();
    //       // 回到列表页
    //       Bus.$emit("equityInfo", {
    //         first: "list",
    //         second: null,
    //         third: "second",
    //         fourth: null
    //       });
    //       this.$message.success(response.data.msg);
    //     })
    //     .catch(() => {
    //       this.$message.error(response.data.msg);
    //     });
    // },
    // 提交展示配置
    async setSubmit() {
      let checkNecessary = await this.checkNecessary();
      if (checkNecessary) {
        // 检测数据
        this.$refs["infoForm"].validate((valid) => {
          if (valid) {
            this.$refs["setForm"].validate((valid) => {
              if (valid) {
                let params = Object.assign(this.infoForm, this.setForm);
                // let annexPictures =
                // showData.url 图标
                // detailData.url 详情
                // this.tableData 展示图片
                // 合并图片
                // checkStatus 1 草稿 3待审核
                // checkType 1 新增 2修改 3 删除
                // filePurposes1.展示图标 2.详情图 3.展示图片
                this.showData["filePurposes"] = "1";
                this.showData["checkStatus"] = "3";
                this.detailData["filePurposes"] = "2";
                this.detailData["checkStatus"] = "3";
                this.tableData = this.tableData.map((item) => {
                  item["filePurposes"] = "3";
                  item["checkStatus"] = "3";
                  return item;
                });
                let middleArr = new Array(0);
                middleArr.push(this.showData, this.detailData);
                let annexPictures = middleArr.concat(this.tableData);

                params["annexPictures"] = annexPictures;
                params["checkStatus"] = "3";
                params["checkType"] = this.checkType;
                params["gid"] = this.tag.query.menuId;
                console.log(params);
                let that = this;
                putObj(params)
                  .then((response) => {
                    // this.infoAdd = false
                    // 清空数据
                    that.clearInfo();
                    that.clearShow();
                    // this.getList(this.page)
                    that.$message.success(response.data.msg);
                    // 回到列表页
                    Bus.$emit("equityInfo", {
                      first: "list",
                      second: null,
                      third: "third",
                      fourth: null,
                    });
                  })
                  .catch(() => {
                    that.$message.error(response.data.msg);
                  });
              } else {
                this.$message.warning("请填写权益展示配置的必输项");
                return false;
              }
            });
          } else {
            this.$message.warning("请填写权益信息的必输项");
            return false;
          }
        });
      }
    },
    // 清空信息表单
    clearInfo() {
      this.$refs["infoForm"].resetFields();
    },
    // 清空展示配置表单
    clearShow() {
      this.$refs["setForm"].resetFields();
      this.tableData = [];
      this.showData = {};
      this.detailData = {};
    },
    // 取消新增
    cancelInfo() {
      // 清空表单
      this.clearInfo();
      this.clearShow();
      // 回到查询列表页
      Bus.$emit("equityInfo", {
        first: "list",
        second: null,
        third: this.selectRadio,
        fourth: null,
      });
    },
    // 权益展示，新增切换
    handleClick() {},
    // 权益展示配置预览
    previewShow() {
      // 写个预览弹框
      this.checkNecessary();
      // this.previewNow = true;
      this.previewForm = this.setForm;
      this.previewForm.detailUrl = this.detailData.url;
      // console.log(this.tableData)
      // 需讨论需求，这里只展示一张展示图片？？？？
      this.previewForm.playData = this.tableData;
      this.previewNow = true;
    },
  },
};
</script>

<style scoped lang="scss">
.indexDetail {
  // 上传图片样式
  .avatar-uploader {
    ::v-deep .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    ::v-deep .el-upload:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  // 分区样式
  > .avue-crud {
    ::v-deep .avue-crud__menu {
      min-height: 0;
      margin-bottom: 0;
    }
  }

  .title {
    border-left: 4px solid #0780ff;
    padding-left: 8px;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .buttonCover {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: none;
    margin: 0;
    height: 56px;
    span {
      border-left: 4px solid #0780ff;
      padding-left: 8px;
    }
  }
  .el-input {
    width: 100%;
  }

  .el-select {
    width: 100%;
  }
  .leftCover {
    ::v-deep .el-form-item__content {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 150px);
    }
    ::v-deep .el-form-item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: top;
      width: 48%;
      min-width: 430px;
    }
    // 表单样式
    .el-col {
      margin-bottom: 0;
    }
  }
  .rightCover {
    ::v-deep .el-form-item {
      width: 48%;
      min-width: 430px;
    }
  }
  // 展示配置样式

  ::v-deep .el-icon-delete {
    display: none;
  }
  .previewEquity {
    // min-width: 330px;
    // min-height: 400px;
    width: 100%;
    padding: 10px;
    // border: 1px solid grey;
    // height: 60%;
    margin: 0 auto;
    .textCover {
      text-align: center;
      font-size: 16px;
      line-height: 30px;
      height: 30px;
    }
    .previewBtn {
      margin: 10px 0;
      text-align: center;
    }
    .imgCover {
      width: 100%;
      // min-height:100px;
      overflow-y: auto;
      // max-height: 200px;
      height: 280px;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>