<template>
    <div class="indexDetail">
        <el-row>
            <el-col :span="24">
                <h3 class="title buttonCover"><span>模板新增</span> <el-button type="primary" size="small" @click="closeModuleFn">关闭</el-button></h3>
            </el-col>
        </el-row>
        <template>
            <div class="areaCover">
                <div class="leftArea">
                    <ul class="coverLi">
                        <li
                            v-for="(item,index) in areaList"
                            :key="index"
                            >
                                <span>{{item.label}}</span>
                                <el-button type="primary" v-if="item.type==='2'"></el-button>
                                <el-input  v-if="item.type==='1'" :type="item.area" v-model="item.model"></el-input>
                                <img src="" alt="" v-if="item.type==='3'"/>
                            </li>
                    </ul>
                </div>
                <div class="rightArea">
                    <div>
                        <el-form ref="form" :model="form" label-width="100px">
                            <el-form-item label="模板名称：">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="备注：">
                                <el-input type="area" v-model="form.name"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-row>
                            <el-col>    
                                    <el-button type="primary" @click="addNewAreaFn">新增区域</el-button>
                            </el-col>
                        </el-row>
                        <el-form ref="formArea" :model="formArea" label-width="100px">

                        </el-form>
                        <ul>
                            <li v-for="(item,index) in areaList" :key="item.key">
                                <div>{{item.label}} <el-button @click="delFn(index)">删除</el-button></div>
                                <div>{{item.area}}<span>输入框：1 文本输入 2 段落输入 按钮： large 大按钮 中按钮 medium 小按钮 small 图片big 大图片 middle 中图片 small 小图片</span></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </template>
        <diff-type 
            v-if='showType'
            :showType.sync='showType'
            :title='title'
            :numForm='numForm'
            :rules='rules'
            @submitForm='submitForm($event)'
            @resetForm='resetForm($event)'
            @closeFn="closeFn"
            @changeRadio="changeRadio"
            ></diff-type>
    </div>
</template>

<script>
import Bus from '@/util/bus'
import diffType from '../components/diffType'
export default {
    components: {
        diffType,
    },
    data(){
        return{
            areaList:[
                {
                    label: '区域1',
                    type: '2',
                    key:'1',
                    area:'large'
                },
                {
                    label: '区域2',
                    type: '3',
                    key:'2',
                    area: 'middle'

                },
                {
                    label: '区域3',
                    type: '1',
                    key:'3',
                    model: '输入',
                    area: '1'
                },
            ],
            form:{

            },
            showType: false,
            numForm:{
                type:'', // 1 输入框，2 按钮 3 图片
                area:'' // 输入框：1 文本输入 2 段落输入 按钮： large 大按钮 中按钮 medium 小按钮 small 图片big 大图片 middle 中图片 small 小图片
            },
            title:'类型选择',
            rules:{
                type: [
                    { required: true, message: '请选择类型', trigger: 'change' },
                ],
                area: [
                    { required: true, message: '请选择格式', trigger: 'change' }
                ],
            },
        }
    },
    methods:{
        closeModuleFn(){
            Bus.$emit('equityModule',{
                'first': 'list',
                'second': null
            })
        },
        addNewAreaFn(){
            // console.log('ddd')
            this.showType = true
            // console.log(this.showType)
        },
        submitForm(){

        },
        resetForm(val){
            this.showType = false
            // this.$refs[val].resetFields()
        },
        closeFn(){

        },
        // 清空格式
        changeRadio(){
            this.numForm['area'] = ''
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