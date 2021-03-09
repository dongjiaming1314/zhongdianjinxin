<template>
    <div class="detailInfo">
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">客户姓名：</el-col>
                    <el-col :span="16">{{ detailData.cusName }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">客户号：</el-col>
                    <el-col :span="16">{{ detailData.customerNo }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">证件类型：</el-col>
                    <el-col :span="16">{{ detailData.idType }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">证件号码：</el-col>
                    <el-col :span="16">{{ detailData.idNumber }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">手机号码：</el-col>
                    <el-col :span="16">{{ detailData.phoneNumber }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">所属机构：</el-col>
                    <el-col :span="16">{{ detailData.affiliation }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">上次登陆时间：</el-col>
                    <el-col :span="16">{{ detailData.lastLandingTime }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">登陆IP：</el-col>
                    <el-col :span="16">{{ detailData.lastLoginIpAddress }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">登录渠道：</el-col>
                    <el-col :span="16">{{ detailData.custChannel }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
            </el-col>
        </el-row>
    </div>
</template>
<script>

export default {
    name:'clientDetailInfo',
    props:[
        'detailData'
    ],
    data(){
        return {
            // detailData:{}
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