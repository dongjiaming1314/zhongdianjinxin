<template>
    <div class="indexDetail">
        <el-row>
            <el-col :span="24">
                <h3 class="title buttonCover"><span>权益模板信息</span> <el-button type="primary" size="small" @click="closeFn">关闭</el-button></h3>
            </el-col>
        </el-row>
        <template>
            <detail-info :detailData="detailData"></detail-info>
        </template>
    </div>
</template>

<script>
import detailInfo from '../components/info'
import Bus from '@/util/bus'
export default {
    components:{
        detailInfo,
    },
    data(){
        return{
            detailData: {},
        
        }
    },
    mounted(){
        // huoquxianqing
    },
    methods:{
        closeFn(){
            Bus.$emit('equityModule',{
                'first':'list',
                'second':null
            })
        }
    }
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