<!--
  ~
  ~  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  ~
  -->

<template>
  <div class="madp-execution">
    <el-alert class="madp-message-tip" title="功能开关是全局的，可以根据需要暂时地开启或者关闭所有的 API 相关功能" type="info"></el-alert>
    <!-- 签名校验 -->
    <section class="madp-signature">
      <div class="madp-signature-title">签名校验</div>
      <div>
        <span class="madp-signature-description">对客户端到移动网关的请求进行验签，以验证调用者身份，保证安全</span>
        <span class="madp-signature-switch">
          <el-switch v-model="value"></el-switch>
        </span>
      </div>
    </section>
    <!-- 数据加密 -->
    <section class="madp-encryption">
      <div class="madp-signature-title">数据加密</div>
      <div>
        <span class="madp-encryption-description">从客户端到移动网关的请求进行加密，确保数据在传输过程中的安全性</span>
        <span class="madp-encryption-switch">
          <el-switch v-model="encryptionValue"></el-switch>
        </span>
      </div>
      <div class="madp-encryption-content">
        <div class="madp-encryption-content-algorithm">
          <el-row :gutter="20">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <label class="madp-encryption-content-algorithm-arrow">加密算法:</label>
              </div>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple">
                <span
                  class="madp-encryption-content-algorithm-message"
                >{{dataValue.encryptionAlgorithm}}</span>
              </div>
            </el-col>
            <el-col :span="1">
              <div class="grid-content bg-purple madp-bg-style">
                <el-button type="text" @click="dialogFormVisible = true">
                  <img src="../../../../public/img/gateway/signature.png" alt />
                </el-button>
                <!-- 配置信息 -->
                <el-dialog title="配置加密算法" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item
                      label="加密算法："
                      :label-width="formLabelWidth"
                      :rules="{required:true}"
                    >
                      <el-radio-group v-model="radio">
                        <el-radio :label="3" v-model="dataValue.encryptionAlgorithm">ECC</el-radio>
                        <el-radio :label="6" v-model="dataValue.encryptionAlgorithm">RSA</el-radio>
                        <el-radio :label="9" v-model="dataValue.encryptionAlgorithm">国密</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div v-if="radio==3">
                      <el-form-item
                        label="密钥内容："
                        :label-width="formLabelWidth"
                        :rules="{required:true}"
                      >
                        <el-input
                          class="madp-frame-width"
                          type="textarea"
                          :autosize="{ minRows: 7, maxRows: 7}"
                          placeholder="加密算法为：ECC、国密必输"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div v-if="radio==6">
                      <el-form-item
                        label="公钥内容："
                        :label-width="formLabelWidth"
                        :rules="{required:true}"
                      >
                        <el-input
                          class="madp-frame-width"
                          type="textarea"
                          :autosize="{ minRows: 7, maxRows: 7}"
                          placeholder="加密算法为：ECC、国密必输"
                          v-model="dataValue.publicKeyMessage"
                        ></el-input>
                      </el-form-item>
                      <el-form-item
                        label="私钥内容："
                        :label-width="formLabelWidth"
                        :rules="{required:true}"
                      >
                        <el-input
                          class="madp-frame-width"
                          type="textarea"
                          :autosize="{ minRows: 8, maxRows: 8}"
                          placeholder="加密算法为：ECC、国密必输"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div v-if="radio==9">
                      <el-form-item
                        label="密钥内容："
                        :label-width="formLabelWidth"
                        :rules="{required:true}"
                      >
                        <el-input
                          class="madp-frame-width"
                          type="textarea"
                          :autosize="{ minRows: 7, maxRows: 7}"
                          placeholder="加密算法为：ECC、国密必输"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </el-form>
                  <div slot="footer" class="madp-dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="madp-encryption-content-publicKey">
          <el-row :gutter="20">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <label class="madp-encryption-content-publicKey-arrow">公钥内容:</label>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <span
                  class="madp-encryption-content-publicKey-message"
                >{{dataValue.publicKeyMessage}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="madp-encryption-content-privateKey">
          <el-row :gutter="20">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <label class="madp-encryption-content-privateKey-arrow">私钥内容:</label>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <el-popover class="madp-popover" placement="top" width="250" v-model="visible">
                  <p class="madp-popover-font-style">
                    <i class="el-icon-warning madp-popover-icon-style"></i> &nbsp;该行为将被记录并上报，是否继续？
                  </p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      class="madp-popover-cancel-style weights"
                      size="mini"
                      type="text"
                      @click="visible = false"
                    >取消</el-button>
                    <el-button
                      class="madp-popover-determine-style"
                      type="primary"
                      size="mini"
                      @click="visible = false"
                    >确定</el-button>
                  </div>
                  <el-button slot="reference" class="madp-dis-find">
                    <span class="madp-encryption-content-privateKey-message">查看</span>
                  </el-button>
                </el-popover>
                <span class="madp-encryption-content-privateKey-privateInfo">{{findValue}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      /**
       * 开关属性
       */
      value: true,
      encryptionValue: true,
      isFind: true,

      findValue: "",

      /**
       * 数据加密值
       */
      dataValue: {
        encryptionAlgorithm: "RSA",
        publicKeyMessage:
          "-----BEGIN PUBLIC KEY-----" +
          "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApO68svD8fICnDbkJH6Jv" +
          "OEVe3SWOQ82Bwc/iVOoXPG+e3+u5w6Qk9rzff1+nzZNOh1EmNZSBJle1RTaZliqu" +
          "rk17UiDmqH7DzQzxnat/KWeX71u5IV77KGtVOJYvKJ3HG2pWDwHjUJ+/ztVp28qP" +
          "1TkeeJ74JlsGKNKvsnTicCVSfUc/o2+MrZEJhYOaMGm5KkFwa5GIfRIVpsR8X4ZB" +
          "j0mixGFBtUDnFrifg0XoZZxGq/1v7cEgEj4f4KNBQaD5v1UZie3VdNz3hpYHhZ8G" +
          "eiXYCnXLT2bqX8fOYYOcSJ7PoPpcDZKTNOg8VhL6PWRSwI/pKhhTUjOqTiJlJnjT" +
          "swIDAQAB" +
          " -----END PUBLIC KEY-----",
        privateKyeyMessage:
          "-----BEGIN PRIVATE KEY-----" +
          "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCk7ryy8Px8gKcN" +
          "uQkfom84RV7dJY5DzYHBz+JU6hc8b57f67nDpCT2vN9/X6fNk06HUSY1lIEmV7VF" +
          "NpmWKq6uTXtSIOaofsPNDPGdq38pZ5fvW7khXvsoa1U4li8onccbalYPAeNQn7/O" +
          "1Wnbyo/VOR54nvgmWwYo0q+ydOJwJVJ9Rz+jb4ytkQmFg5owabkqQXBrkYh9EhWm" +
          "xHxfhkGPSaLEYUG1QOcWuJ+DRehlnEar/W/twSASPh/go0FBoPm/VRmJ7dV03PeG" +
          "lgeFnwZ6JdgKdctPZupfx85hg5xIns+g+lwNkpM06DxWEvo9ZFLAj+kqGFNSM6pO" +
          "ImUmeNOzAgMBAAECggEAHzdgV63s29Otypce9vHTgx7+GXUmPAcFbB1ghRnZVAL8" +
          "Wv1Op4zFwj11P7JnHC2pS0s8pB97YjpvgK4Y26cwcKURljXL8lAr1v+AK4tuAfQt" +
          "eYwuufY0Ky5FbvRd8J4MNVAnAagl0fiqYQdbhdIM7xpkfgf4h6nqvIdD4c7lnLvl" +
          "3B1oe12Hlw1vlIjHzvZ1JF0EpTORWmqWiqMY/oYw3YW+aBKI4U4EIdsVHi3Vra3D" +
          "C3KzycgDfSIY2gC2TTjgJ4i9mYFHzaVRqOP4J6CFhjifOGeRho53xXZRM3a67WRR" +
          "fy767wgdjvTO1aoNUUY5C3REoXwRXXIfL+eN8Hs4gQKBgQDOxnAYgvqaC++v1VDO" +
          "Y0hi3WydjioX7vDLkoOfsz6z+ypr7P0LUBB/p+vxIgtJD0Rp6fRqq0Bcc29dGXVt" +
          "E6Uev5MF5RdWKXslWEWM1cma6UKMU0C2j5+vt9jBJJQAY800YY81pTJKKjwuBYkn" +
          "P1cpjHwZQ2jbigzv1vSXr82ewwKBgQDMMkYX1pythYpttU8wBvQtivMuyMLbVtHv" +
          "aNZf+6F3iueTBEgKuj4UDk9iptf5KoTBvOF+MQFwjB4jCLHTj9PJ0cHOQI7QODTX" +
          "6gIyS5lhMKsL9nf+FeHYlVDn4wk74Yg9JXybl8ggR3cvM9+zjZ9Q9bjV+VQFlBH+" +
          "h+F8EIaIUQKBgQCuySLcNWtsaAaV1XVW4KnBmHZFwHRogrvc+N52UmgAb6FuVYeY" +
          "1nb70ZAp5qMvgM5N0UugF15yR8mtIuYV6/M5yKqY4wwU8z97U+CGqfifD+oHACDF" +
          "sSZEvN1mdmr84WAGlSkfKaMW+higtmE3Yd1l67DDEi5C1bEV09gxmJPxTQKBgFUY" +
          "Eku23N4XC4QCjbh2/WTJReRWN5XOTXhWmRewti4qDa0fmKIX0OzstbpnyxMD3AUc" +
          "oF/FLlNnoNt6sRh4FItDRV+dWaZ99c+Qrk+lX4q4DF/U21ZgahimyOuJmnyA1RSe" +
          "PZpdm0GQZqOeG3go6Z6Ed/17hL86YHFQ0O+xt06xAoGBAIoGrmGUWYJsrQWYx66/" +
          "ztlv4KbAE/HOa0muBjGO9ul/9KIAMMd1G3oFVlhoB/HPGzmmBR1vWJlvRTwehUq4" +
          "t7yQPh1IEdjnrp1TuGSBZ/I83fc4a1NhsIfHnzxCqrzYHDaAjCC+Sh9dK234hXwA" +
          "ZO6g/r8qVJdcJbWL+fmRnzNV" +
          "-----END PRIVATE KEY-----"
      },

      /**
       * 配置信息
       *
       */
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      radio: undefined
    };
  },
  created() {},
  mounted() {
    this.radioValue();
  },
  methods: {
    radioValue() {
      if ((this.dataValue.encryptionAlgorithm = "RSA")) {
        this.radio = 6;
      } else if ((this.dataValue.encryptionAlgorithm = "ECC")) {
        this.radio = 3;
      } else if ((this.dataValue.encryptionAlgorithm = "国密")) {
        this.radio = 9;
      }
    },

    /**
     * 查看私钥内容提示
     */

    open() {
      var _this = this;
      this.$confirm("该行为将被记录并上报，是否继续？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(function() {
          _this.isFind = false;
          _this.findValue = _this.dataValue.privateKyeyMessage;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "查询失败"
          });
        });
    }
  }
};
</script>
<style lang="scss">
.madp-message-tip {
  font-weight: 700;
  color: #616366;
}

/** @title 签名校验 */
.madp-signature {
  width: 95%;
  height: 60px;
  padding: 25px 20px 5px;
  border-bottom: 1px solid #e9e9e9;
  color: #666666;
  &-title {
    margin-bottom: 6px;
  }
  &-description {
    font-size: 12px;
  }
  &-switch {
    float: right;
  }
}

/** @title 数据加密 */
.madp-encryption {
  width: 95%;
  padding: 25px 20px 5px;
  border-bottom: 1px solid #e9e9e9;
  color: #666666;
  &-title {
    margin-bottom: 6px;
  }
  &-description {
    font-size: 12px;
  }
  &-switch {
    float: right;
  }
  &-content {
    font-size: 12px;
    margin-top: 12px;
    padding: 16px;
    border-radius: 4px;
    background-color: #f7f7f7;
    &-algorithm {
      margin-bottom: 10px;
      &-arrow {
        font-weight: 700;
      }
      & img {
        width: 24px;
        height: 24px;
      }
    }
    &-publicKey {
      font-size: 12px;
      margin-bottom: 10px;
      &-arrow {
        font-weight: 700;
      }
      &-message {
        display: block;
        width: 60%;
        word-wrap: break-word;
      }
    }
    &-privateKey {
      &-arrow {
        font-weight: 700;
      }
      &-message {
        color: #409eff;
      }
      &-privateInfo {
        display: block;
        font-size: 12px;
        width: 60%;
        padding: 0;
        word-wrap: break-word;
        color: #666666;
      }
      & .madp-dis-find {
        border: 0;
        padding: 0;
        background-color: #f7f7f7;
      }
    }
  }
}

/**
 * @description 查看弹出框
 */
.madp-popover {
  &-icon-style {
    color: #ffbf31;
  }
  &-font-style {
    font-size: 12px;
    margin-bottom: 15px;
  }
  &-cancel-style {
    padding: 5px 10px;
    font-size: 12px;
    color: #d9d9d9;
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    & span {
      font-size: 12px;
    }
  }
  &-cancel-style:hover {
    color: #239bf3;
    border: 1px solid #239bf3;
  }
  &-determine-style {
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 6px;
    & span {
      font-size: 12px;
    }
  }
}

.el-button {
  font-size: 12px;
}

.madp-frame-width {
  width: 93%;
}

.madp-bg-style {
  height: 20px;
}

.madp-find-button {
  padding: 0;
}

/**
 * 修改element-ui样式
 */

.el-dialog__title {
  line-height: 24px;
  font-size: 15px;
  color: #303133;
}

.el-dialog {
  width: 50%;
}

.el-textarea__inner {
  font-size: 10px;
}

.el-radio__label {
  font-size: 12px;
}

.el-form-item__label {
  font-size: 12px;
}

.el-message-box {
  width: 318px;
}

.el-button {
  font-size: 13px;
}
</style>