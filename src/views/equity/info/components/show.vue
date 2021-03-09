<template>
    <div class="detailInfo">
        <el-row class="imgsCover">
            <el-col :span="4" class="labelText">展示名称：</el-col>
            <el-col :span="20"> {{ previewForm.displayName }}</el-col>
        </el-row>
        <el-row v-for="item in previewForm.playData" :key="item.url">
            <el-col :span="4" class="labelText">展示图片：</el-col>
            <el-col :span="20" class="playPictures">
                <img :src="item.url" alt="展示图片" />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" class="labelText">展示全称：</el-col>
            <el-col :span="20"> {{ previewForm.displayFullName }}</el-col>
        </el-row>
        <el-row>
            <el-col :span="4" class="labelText">详情图：</el-col>
            <el-col :span="20"><img :src="previewForm.detailUrl" alt="展示图片" /></el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  name: "equityShowInfo",
  props: ["previewForm"],
  data() {
    return {};
  },
  methods: {}
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
  .imgCover {
    width: 400px;
    height: 250px;
    img {
      width: 100%;
      height: auto;
    }
  }
}
// .playPictures {
::v-deep img {
  // width: 100%;
  // height: auto;
  width: 200px;
  height: 200px;
}
// }
</style>