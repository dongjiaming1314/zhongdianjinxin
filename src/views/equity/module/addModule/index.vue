<template>
    <div>
        <div class="indexDetail">
            <el-row>
                <el-col :span="24">
                    <h3 class="title buttonCover"><span>模板新增</span> <el-button type="primary" size="small" @click="closeModuleFn">关闭</el-button></h3>
                </el-col>
            </el-row>
        </div>
        <draggable
            :group="group"
            :sort="false"
            :forceFallback="true"
            ></draggable>
    </div>
</template>

<script>
import Bus from '@/util/bus'
import draggable from 'vuedraggable'
export default {
    components:{
        draggable
    },
    data(){
        return{
            group:{
                name:'scene',
                pull:'clone'
            },

        }
    },
    created(){
        // 阻止火狐浏览器默认的拖拽搜索行为
        document.body.ondrop = (event) =>{
            event.preventDefault()
            event.stopPropagation()
        }
    },
    methods:{
        // 刚开始拖动时触发
        start(evt){

        },
        // 拖拽新增的时候触发
        add(evt) {

        },
        // 从列表拖走，移除触发
        remove(evt) {

        },
        // 列表更新触发
        update(evt) {

        },
        // 和start对应，拖拽完了触发
        end(evt) {

        },
        closeModuleFn(){
            Bus.$emit('equityModule',{
                'first': 'list',
                'second': null
            })
        },
    }
}
</script>

<style lang="scss" scoped>
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
    .areaCover{
        display: flex;
        .leftArea{
            width: 400px;
            min-height: 500px;
            background-color: red;
            .coverLi{
                li{
                    border-bottom: 1px solid black;
                }
            }
        }
        .rightArea{
            flex: 1;
            min-height: 200px;
            // background-color: green;
        }
    }
    
}
</style>