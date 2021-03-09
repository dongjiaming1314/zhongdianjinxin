<template>
    <div  class="indexDetail">
        <el-row>
            <el-col :span="24">
                <h3 class="title buttonCover"><span>客户红包详情</span> <el-button type="primary" size="small" @click="closeFn">关闭</el-button></h3>
            </el-col>
        </el-row>
        <detail-info :detailData="obj"></detail-info>
        <!-- <avue-form  
            :option="formOption" 
            v-model="obj">
        </avue-form> -->
        <el-row>
            <el-col :span="24">
                <h3 class="title">客户红包池信息</h3>
            </el-col>
        </el-row>
        <avue-crud
            v-if="redData.length"
            ref="crudItem"
            :data="redData"
            :before-open="handleBeforeOpen"
            :option="redOption"
            :table-loading="redLoading"
        ></avue-crud>
        <div v-if="!redData.length" style="color:red;">该客户名下没有红包池信息！</div>
    </div>
</template>

<script>
import Bus from '@/util/bus.js'
import { remote } from '@/api/admin/dict'
import {
    conditionFetch
} from '@/api/client/gift'
import {
    redOption,
    // formOption
} from '@/const/crud/client/gift'
import detailInfo from '../components/info'
export default {
    name: 'giftDetail',
    components:{
        detailInfo
    },
    props:[
        'id'
    ],
    data(){
        return{
            //   红包信息
            obj:{},
            redData: [],
            redLoading: false,
            dialogFormVisible: false,
            redOption: redOption,
        }
    },
    created(){
        this.getDetail()
    },
    methods:{
        getDetail(){
            remote('id_type').then(res=>{
                let idTypeList = res.data.data
                conditionFetch( this.id ).then(response=>{
                    // 红包列表获取
                    // 转换证件类型
                    let middle = idTypeList.find(item=>item['value']=== response.data.data['idType'])['label']
                    let {idType,...secondMiddle} = response.data.data
                    this.obj = Object.assign({'idType':middle},secondMiddle)

                    if( response.data.data.esCustRedPackList.length ){
                        this.redData = response.data.data.esCustRedPackList
                    }else{
                        this.redData = []
                        // this.$message({
                        //     message: response.data.msg,
                        //     type: 'info'
                        // })
                    }
                })
            })
            
        },
        // 关闭详情页
        closeFn(){
            Bus.$emit('clientGift',{
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