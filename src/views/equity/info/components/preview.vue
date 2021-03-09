<template>
    <common-dialog
        :visible.sync="visible"
        title="预览"
        :size="'large'"
        @close="closeFn"
    >
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
            <el-col :span="20"
                ><img :src="previewForm.detailUrl" alt="展示图片"
            /></el-col>
        </el-row>
        <!-- <template v-slot:footer>
            <el-button size="small" type="primary" @click="closeFn"
                >取消</el-button
            >
            <el-button size="small" type="primary" @click="sureFn"
                >确认</el-button
            >
        </template> -->
    </common-dialog>
</template>
<script>
export default {
    name: "addPreview",
    props: ["previewForm", "showDetail"],
    computed: {},
    data() {
        return {
          visible: this.showDetail
        };
    },
    methods: {},
    watch:{
      showDetail(val, oldVal) {
        if (val == oldVal) return;
        this.visible = val;
      },
      visible(val, oldVal) {
        if (val == oldVal) return;
        this.$emit("update:showDetail", val);
      }
    }
};
</script>
<style lang="scss" scoped>
// .previewEquity {
//     // min-width: 330px;
//     // min-height: 400px;
//     width: 400px;
//     padding: 10px;
//     // border: 1px solid grey;
//     // height: 60%;
//     margin: 0 auto;
//     .textCover {
//         text-align: center;
//         font-size: 16px;
//         line-height: 30px;
//         height: 30px;
//     }
//     .previewBtn {
//         margin: 10px 0;
//         text-align: center;
//     }
//     .imgCover {
//         width: 100%;
//         // min-height:100px;
//         overflow-y: auto;
//         // max-height: 200px;
//         height: 280px;
//         img {
//             width: 100%;
//             height: auto;
//         }
//     }
// }
// .playPictures {
   ::v-deep img {
        width: 100%;
        height: auto;
    }
// }
</style>