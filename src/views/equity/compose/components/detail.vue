<template>
    <div class="indexDetail">
        <el-row>
            <el-col :span="24">
                <h3 class="title buttonCover"><span>权益组合信息</span> <el-button type="primary" size="small" @click="closeFn">关闭</el-button></h3>
            </el-col>
        </el-row>
        <detail-info :detailData="detailData" />
        <el-row>
            <el-col :span="24">
                <h3 class="title">权益列表</h3>
            </el-col>
        </el-row>
        <avue-crud 
            :data="rightData"
            :table-loading="rightLoading"
            :option="rightOption"
            >
        </avue-crud>
    </div>
</template>

<script>
import Bus from '@/util/bus.js'
import detailInfo from './info'
import {
    fetchDetail
  } from '@/api/equity/compose'
import {
    rightOption,
  } from '@/const/crud/equity/compose'
export default {
    name:'composeDetail',
    props:[
        'id',
    ],
    components:{
        detailInfo,
    },
    data(){
        return {
            detailData:{
                comment:'',
                modifyTime:'',
                modifyName:'',
                createTime:'',
                createName:'',
                equityNum:'',
                cataName:'',
                cataLevel:''
            },
            rightData:[],
            rightOption,
            rightLoading: true,
        }
    },
    mounted(){
        this.getEquityDetail()
    },
    methods:{
        // 获取详情
        getEquityDetail(){
            // 调取目录详情数据
            this.rightLoading = true
            fetchDetail(this.id).then(response=>{
                this.detailData = response.data.data
                this.rightData = response.data.data.elist
                this.rightLoading = false
            }).catch(()=>{
                this.rightLoading = false
            })
        },
        // 关闭详情页
        closeFn(){
            Bus.$emit('poolCompose',{
                'first':'list',
                'second':null
            })
        }
    },
}
</script>

<style scoped lang="scss">
.indexDetail{
    >.avue-crud {
        ::v-deep .avue-crud__menu{
            min-height: 0;
            margin-bottom: 0;
        }
    }
    
    .title{
        border-left: 4px solid #0780ff;
        padding-left: 8px;
        font-size: 16px;
        line-height: 16px;
        font-weight: 700;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .buttonCover{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-left: none;
        margin: 0;
        height:56px;
        span{
            border-left:4px solid #0780ff;
            padding-left: 8px;
        }
    }
    
}
</style>