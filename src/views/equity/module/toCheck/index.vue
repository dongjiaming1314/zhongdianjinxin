<template>
    <div class="equityModuleCheck">
        <avue-crud  ref="crud"
                    :page.sync="page"
                    :table-loadding="tableLoading"
                    :option="tableOption"
                    :data="data">
                    <template slot-scope="scope" slot="customerName">
                        <span class="coverName" @click="checkDetail(scope.row)">{{scope.row.customerName}}</span>
                    </template>
                    <template slot-scope="scope" slot="menuLeft">
                      <el-button 
                          type="primary"
                          size="small"
                          @click.stop="handleAdd()">新增</el-button>
                    </template>
                    <template slot-scope="scope" slot="menu">
                        <el-button
                            size="small"
                            type="text"
                            @click="checkDetail(scope.row)"
                            >查看</el-button>
                        <el-button
                            size="small"
                            type="text"
                            @click="rowEdit(scope)"
                            >编辑</el-button>
                        <el-button
                          size="small"
                          type="text"
                          @click="rowDel(scope.row, scope.index)"
                          >删除</el-button>
                    </template>
        </avue-crud>
    </div>
</template>

<script>
import {
    tableOption
  } from '@/const/crud/equity/module'

import Bus from '@/util/bus.js'
export default {
    data(){
        return {
            data:[
                {
                    customerName:'张三',
                    customerNum: '1',
                    tel:'11111',
                    info:[
                    {
                        sex:15,
                    }, {
                        sex:16,
                    }
                    ]
                },
                {
                customerName:'李四',
                customerNum: '22',
                tel:'2222',
                info:[
                    {
                    sex:15,
                    }, {
                    sex:16,
                    },
                    ]
                },
                {
                    customerName:'王五',
                    customerNum: '33',
                    tel:'3333',
                    name: 'AAAA',
                    info:[
                    {
                        sex:15,
                    }, {
                        sex:16,
                    },
                    ]
                }
            ],
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 20 // 每页显示多少条
            },
            tableLoading: false,
            tableOption: tableOption,
        }
    },
    methods:{
        handleAdd(){
            Bus.$emit('equityModule',{
                'first':'addModule',
                'second': null
            })
        },
        rowDetail(index, row){
            this.detailShow = true
            // this.detailData = row
        },
        rowEdit(index, row){

        },
        rowDel(index, row){
            let title = '确认删除？'
            this.$confirm(title, '提示', {})
            .then(() => {
                let para = Object.assign({}, row)
                para.publicationFlag = !para.publicationFlag
                putObj(para).then(data => {
                this.$message({
                    message: data.data.msg,
                    type: 'success',
                })
                this.handlerText = "报名"
                this.getList(this.page)
                })
            })
            .catch(() => {})
        },
        checkDetail(row){
            Bus.$emit('equityModule',{
                'first':'detail',
                'second':row.id
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.equityModuleCheck{
    .coverName{
        color: #409EFF; 
        cursor: pointer;
        text-decoration: underline;
    }
}

</style>