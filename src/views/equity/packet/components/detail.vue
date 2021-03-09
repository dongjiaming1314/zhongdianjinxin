<template>
    <common-dialog
        :visible.sync="showDetail"
        title="红包池详情"
        :size="'large'"
        @close="closeFn"
        >
        <div class="detailInfo">
            <el-row>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="8" class="labelText">红包池名称：</el-col>
                        <el-col :span="16">{{ detailData.redPackName }}</el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="8" class="labelText">红包池类型：</el-col>
                        <el-col :span="16">{{ detailData.redlogbundlType }}</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="8" class="labelText">生效开始时间：</el-col>
                        <el-col :span="16">{{ detailData.startTime }}</el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="8" class="labelText">生效结束时间：</el-col>
                        <el-col :span="16">{{ detailData.endTime }}</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="8" class="labelText">红包有效期：</el-col>
                        <el-col :span="16"> <span>{{ detailData.redPackValdity }}</span><span>{{detailData.valdityType}}</span></el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="8" class="labelText">红包个数：</el-col>
                        <el-col :span="16">{{ detailData.number }}</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-row v-if="detailData.redlogbundlType==='2'">
                        <el-col :span="8" class="labelText">红包池总金额：</el-col>
                        <el-col :span="16">{{ detailData.totalAmount }}</el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row v-if="detailData.redlogbundlType==='1'">
                        <el-col :span="8" class="labelText">红包池金额/个：</el-col>
                        <el-col :span="16">{{ detailData.redPackAmountEach }}</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-row v-if="detailData.redlogbundlType==='2'">
                        <el-col :span="8" class="labelText">红包池金额上限/个：</el-col>
                        <el-col :span="16">{{ detailData.redPackAmountEachMax }}</el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row v-if="detailData.redlogbundlType==='2'">
                        <el-col :span="8" class="labelText">红包金额下限/个：</el-col>
                        <el-col :span="16">{{ detailData.redPackAmountEachMin }}</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="8" class="labelText"> 红包可使用渠道：</el-col>
                        <el-col :span="16">{{ detailData.redChannel }}</el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="8" class="labelText"> 备注：</el-col>
                        <el-col :span="16">{{ detailData.comment }}</el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <template v-slot:footer>
            <el-button  size="small" type="primary" @click="closeFn">关闭</el-button>
        </template>
    </common-dialog>
</template>
<script>
export default {
    name:'clientDetailInfo',
    props:[
        'detailData',
        'showDetail',
    ],
    data(){
        return {
        }
    },
    methods:{
        closeFn(){
            console.log('guanbi')
            this.$emit('closeFn')
        }
    }
}
</script>
<style lang="scss" scoped>
.detailInfo{
    .labelText{
        text-align: right;
        
    }
    .el-row>.el-col{
        padding: 0 4px 4px;
        margin-bottom: 0;
        .el-row {
            line-height: 40px;
            border-radius: 4px;
            font-size: 13px;
            color: rgba(0,0,0,.8);
            font-family: PingFangSC-Regular;
            // font-weight: bolder;
            .el-col{
                margin-bottom: 0;
                padding: 0;
            }
        }
    }
    .el-row:nth-child(odd)>.el-col {
        .el-row {
            background-color: #f4f4f5;
        }
    }
}
</style>