<template>
    <div class="detailInfo">
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">模板名称：</el-col>
                    <el-col :span="16">{{ detailData.cusName }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">模板ID：</el-col>
                    <el-col :span="16">{{  detailData.customerNo}}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">创建人：</el-col>
                    <el-col :span="16">{{ detailData.cusName }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">创建时间：</el-col>
                    <el-col :span="16">{{ detailData.idType }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">修改人：</el-col>
                    <el-col :span="16">{{ detailData.idNumber }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">修改时间：</el-col>
                    <el-col :span="16">{{ detailData.affiliation }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">审核人：</el-col>
                    <el-col :span="16">{{ detailData.growthLevel }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">审核时间：</el-col>
                    <el-col :span="16">{{ detailData.creationTime }}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">备注：</el-col>
                    <el-col :span="16">{{ detailData.modifyTime }}</el-col>
                </el-row>
            </el-col>
            <el-col :span="24">
                区域配置详情{{ detailData.lastLandingTime }}
                <avue-crud ref="crud"
                    :option="option"
                    :data="data">
                    </avue-crud>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props:[
        'detailData',
    ],
    data(){
        return{
            data:[],
            option:{
                stripe: true,
                align: 'center',
                addBtn:false,
                delBtn:false, // 行删除按钮
                editBtn:false, // 行编辑按钮
                columnBtn:false, //列动态显隐按钮
                refreshBtn:false, // 刷新按钮
                columnBtn:false,//列显隐按钮
                column: [
                    {
                        label: '区域名称',
                        prop: 'customerName',
                    },
                    {
                        label: '展示类型',
                        prop: 'info',
                    }
                ]
            }
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
   