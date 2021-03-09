<!--
  ~
  ~  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  ~
  -->

<template>
  <div class="container">
    <!-- 行内容 -->
    <div>
      <el-row :gutter="26">
        <!-- 卡片内容 -->
        <el-col
          class="row-interval"
          :xs="8"
          :sm="8"
          :md="8"
          :lg="8"
          :xl="1"
          v-for="(item,index) in carContent"
          :key="(item,index)"
        >
          <div class="grid-content bg-purple">
            <el-card class="box-card" shadow="hover">
              <div class="card-header">
                <el-row :gutter="10">
                  <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
                    <div class="grid-content bg-purple">
                      <div class="card-header-avatar">
                        <i class="el-icon-mobile-phone"></i>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
                    <div class="grid-content bg-purple-light">
                      <div class="card-header-title">{{item.applicationName}}</div>
                    </div>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8">
                    <div class="grid-content bg-purple">
                      <div class="card-header-deleteBtn">
                        <i class="el-icon-close"></i>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-row :gutter="10">
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <div class="grid-content bg-purple">
                    <div class="card-content">
                      <div class="card-content-item">
                        <p class="card-content-title">登录账户</p>
                        <p class="card-content-value">{{item.loginNum}}</p>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <div class="grid-content bg-purple-light">
                    <div class="card-content">
                      <div class="card-content-item">
                        <p class="card-content-title">新增用户</p>
                        <p class="card-content-value">{{item.addNum}}</p>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <div class="grid-content bg-purple">
                    <div class="card-content">
                      <div class="card-content-item">
                        <p class="card-content-title">设备报活</p>
                        <p class="card-content-value">{{item.deviceNum}}</p>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="split-line"></div>
              <div class="card-footer">
                <el-row :gutter="10">
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="1">
                    <div class="grid-content bg-purple">
                      <div class="card-footer-link">
                        <el-tooltip class="item" effect="light" content="应用配置" placement="top">
                          <a href>
                            <img src="../../../../public/img/apl/config.png" alt />
                          </a>
                        </el-tooltip>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="11">
                    <div class="grid-content bg-purple-light">
                      <div class="card-footer-link">
                        <el-tooltip class="item" effect="light" content="内容管理" placement="top">
                          <a href>
                            <img src="../../../../public/img/apl/content.png" alt />
                          </a>
                        </el-tooltip>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="11">
                    <div class="grid-content bg-purple">
                      <div class="card-footer-link">
                        <el-tooltip class="item" effect="light" content="发布管理" placement="top">
                          <a href>
                            <img src="../../../../public/img/apl/release.png" alt />
                          </a>
                        </el-tooltip>
                      </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="1">
                    <div class="grid-content bg-purple-light">
                      <div class="card-footer-link">
                        <el-tooltip class="item" effect="light" content="应用分析" placement="top">
                          <a href>
                            <img src="../../../../public/img/apl/analysis.png" alt />
                          </a>
                        </el-tooltip>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>
        <!-- 添加应用 -->
        <div v-if="isChange" @click="jumpCard">
          <el-col class="row-interval" :xs="8" :sm="8" :md="8" :lg="8" :xl="1">
            <div class="grid-content bg-purple">
              <el-card class="box-card" shadow="hover">
                <div class="a">
                  <div class="trigger-upload">
                    <i class="el-icon-plus trigger-upload-add"></i>
                  </div>
                  <p class="add-description">创建应用</p>
                </div>
              </el-card>
            </div>
          </el-col>
        </div>
        <div v-if="!isChange">
          <el-col class="row-interval" :xs="8" :sm="8" :md="8" :lg="8" :xl="1">
            <div class="grid-content bg-purple">
              <el-card class="box-card" shadow="hover">
                <el-row :gutter="10">
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="grid-content bg-purple">
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>
                  </el-col>
                  <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <div class="grid-content bg-purple-light">
                      <div class="upload-tip">
                        上传icon: 大小不超过1M，
                        <br />长宽等比且范围在50px至200px之间，
                        <br />支持 jpg、png格式图片。
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-form class="application-form" ref="form" label-width="80px" size="mini">
                  <el-form-item label label-width="0">
                    <el-input v-model="enterName" placeholder="应用名称"></el-input>
                  </el-form-item>
                  <el-form-item size="mini" class="button-group">
                    <el-button class="add-button" type="primary" @click="onSubmit">确定</el-button>
                    <el-button class="cancel-button" @click="backPrevious">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "applicationManagement",
  data() {
    return {
      /**
       * @description 卡片内容
       *
       */
      carContent: [
        {
          applicationName: "应用名称",
          loginNum: "0",
          addNum: "0",
          deviceNum: "0"
        },
        {
          applicationName: "应用名称",
          loginNum: "0",
          addNum: "0",
          deviceNum: "0"
        },
        {
          applicationName: "应用名称",
          loginNum: "0",
          addNum: "0",
          deviceNum: "0"
        },
        {
          applicationName: "应用名称",
          loginNum: "0",
          addNum: "0",
          deviceNum: "0"
        }
      ],
      /**
       * @description 添加应用
       *
       */
      isChange: true,
      imageUrl: "",
      input: "",
      enterName: ""
    };
  },
  methods: {
    /**
     * @description 添加应用
     * @param jumpCard 为跳转到添加应用函数
     * @param backPrevious 为跳转到添加应用函数
     *
     */
    jumpCard() {
      this.isChange = !this.isChange;
    },
    backPrevious() {
      this.isChange = !this.isChange;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isLt1M;
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
$size: 50px;
$avatar-size: 30px;
$avatar-bg: #fff;
$avatar-shadow: #e9e9e9;
$i-color: #f0f0f0;
$title-color: #404040;
$content-title: #999999;
$split-line: #e9e9e9;
$upload-add: #d4d4d4;
$add-change: #5792e6;
$add-bgColor: #fbfbfb;
$change-color: #409eff;
$upload-icon: #8c939d;
$tip-color: #262626;
.container {
  width: 100%;
  height: 100%;
}

.row-interval {
  margin-top: 25px;
}

a {
  text-decoration: none;
}

.grid-content {
  position: relative;
}

.card-header {
  width: 100%;
  height: 40px;
  &-avatar {
    display: flex;
    position: absolute;
    bottom: 1px;
    width: $size;
    height: $size;
    justify-content: center;
    border: 1px solid $i-color;
    border-radius: 50px;
    background-color: $avatar-bg;
    box-shadow: 0px 0px 10px $avatar-shadow;
    & i {
      align-self: center;
      font-size: $avatar-size;
      color: $i-color;
    }
  }
  &-title {
    display: inline-block;
    width: 210px;
    color: $title-color;
  }
  &-deleteBtn {
    display: inline-block;
    margin-bottom: 15px;
    & i {
      position: absolute;
      font-size: 20px;
    }
  }
}

.card-content {
  display: inline-block;
  width: 100%;
  height: 85px;
  &-item {
    padding: 20px;
  }
  &-title {
    text-align: center;
    font-size: 12px;
    color: $content-title;
  }
  &-value {
    font-weight: 700;
    text-align: center;
    margin-top: 6px;
    color: $title-color;
  }
}

.split-line {
  width: 100%;
  height: 1px;
  background-color: $split-line;
}

.card-footer {
  width: 100%;
  height: 50px;
  &-link {
    display: inline-block;
    width: 20px;
    height: 20px;
    padding: 18px 20px;
    & img {
      width: 20px;
      height: 20px;
    }
  }
}

// @description 栅格布局
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

// @description 添加应用
.trigger-upload {
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: 15px;
  border: 1px dashed $upload-add;
  border-radius: 52px;
  &-add {
    align-self: center;
    font-size: 26px;
    font-weight: 500;
    color: $upload-add;
  }
}

.add-description {
  margin-top: 20px;
  text-align: center;
  padding-bottom: 17px;
  color: $upload-add;
}

.a:hover .trigger-upload {
  border-color: $add-change;
}

.a:hover .trigger-upload-add {
  color: $add-change;
}

.a:hover .add-description {
  color: $add-change;
}

.avatar-uploader,
.el-upload {
  display: inline-block;
  width: 58px;
  height: 58px;
  border: 1px dashed $upload-add;
  border-radius: 50px;
  cursor: pointer;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: $add-bgColor;
}

.avatar-uploader:hover {
  border-color: $change-color;
}

.avatar-uploader-icon {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: $upload-icon;
  line-height: 58px;
  text-align: center;
}

.avatar {
  display: block;
  width: 58px;
  height: 58px;
  border-radius: 50px;
}

.upload-tip {
  display: inline-block;
  width: 210px;
  font-size: 12px;
  color: $tip-color;
}

.application-content {
  width: 100%;
  height: 18px;
  font-size: 12px;
  margin-top: 20px;
}

.application-form {
  margin-top: 25px;
}

.button-group {
  margin-left: 0;
  margin-top: 22px;
  margin-bottom: 10px;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 7px;
}

.cancel-button {
  margin-left: 25px;
}
</style>
