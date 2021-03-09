<template>
    <div class="detailInfo">
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">组合名称：</el-col>
                    <el-col :span="16">{{ detailData.name }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">组合ID：</el-col>
                    <el-col :span="16">{{ detailData.id }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">组合库存：</el-col>
                    <el-col :span="16">{{ detailData.number }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">组合发放模式：</el-col>
                    <el-col :span="16">{{ detailData.issueType }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">可选数量：</el-col>
                    <el-col :span="16">{{ detailData.availCost }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">创建人：</el-col>
                    <el-col :span="16">{{ detailData.createName }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">创建时间：</el-col>
                    <el-col :span="16">{{ detailData.createTime }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">修改人：</el-col>
                    <el-col :span="16">{{ detailData.modifyName }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">修改时间：</el-col>
                    <el-col :span="16">{{ detailData.modifyTime }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">(该字段需要后台添加)审核人：</el-col>
                    <el-col :span="16">{{ detailData.comment }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">(该字段需要后台添加)审核时间：</el-col>
                    <el-col :span="16">{{ detailData.modifyTime }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">(该字段需要后台添加)备注：</el-col>
                    <el-col :span="16">{{ detailData.comment }}</el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'composeInfo',
    props:[
        'detailData'
    ],
    data(){
        return {
        }
    },
    methods:{
        
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