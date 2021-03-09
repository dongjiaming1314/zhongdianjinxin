<template>
    <div>
        <avue-crud ref="crud"
                :page="page"
                :data="tableData"
                :table-loading="tableLoading"
                :option="tableOption"
                @on-load="getList"
                @search-change="searchChange">
                <template slot-scope="scope" slot="menuLeft">
                    <el-button
                        v-if="permissionList.exportInterestsBtn"  
                        type="primary"
                        size="small"
                        @click.stop="exportFn()">导出</el-button>
                    <el-button
                        v-if="permissionList.closeInterestsBtn"  
                        type="primary"
                        size="small"
                        @click.stop="closeFn()">关闭</el-button>
                </template>
        </avue-crud>
    </div>
</template>

<script>
import { tableOption } from '@/const/crud/client/order'
export default {
    props:[
        'permissionList',
    ],
    data(){
        return {
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 20 // 每页显示多少条
            },
            tableData:[],
            tableLoading: false,
            tableOption,

        }
    },
    methods:{
        getList(){

        },
        searchChange(){

        }
    }
}
</script>

<style>

</style>