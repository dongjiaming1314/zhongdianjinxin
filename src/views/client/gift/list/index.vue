<template>
    <div class="execution clientGift">
        <avue-crud 
                ref="crud"
                :page="page"
                :data="tableData"
                :table-loading="tableLoading"
                :option="tableOption"
                @on-load="getList"
                @search-change="searchChange">
                <template slot="cusName" slot-scope="scope">
                    <span
                        class="coverName" 
                        @click="handleItem(scope.row,scope.index)">{{scope.row.cusName}}</span>
                </template>
                <template slot-scope="scope" slot="menu">
                    <el-button type="text" size="small" @click="handleItem(scope.row)">查看</el-button>
                </template>
        </avue-crud>
    </div>
</template>

<script>
import Bus from '@/util/bus.js'
import {
    fetchList,
} from '@/api/client/gift'
import {
    tableOption,
} from '@/const/crud/client/gift'
import {
    mapGetters
} from 'vuex'
import {
    deepClone
}from '@/util/tag'
import {
    dateFormat
} from '@/util/date'

export default {
    name: 'clientGift',
    data() {
      return {
        tableData: [],
        page: {
            total: 0, // 总页数
            currentPage: 1, // 当前页数
            pageSize: 20 // 每页显示多少条
        },
        tableLoading: false,
        tableOption: tableOption,
      }
    },
    computed: {
        ...mapGetters(['permissions']),
        permissionList() {
            return {
                checkBtn: this.vaildData(this.permissions.client_gift_check)
            }
        },
    },
    methods: {
        // 获取红包池信息列表
        getList(page, params, done) {
            fetchList(Object.assign({
                current: page.currentPage,
                size: page.pageSize
            }, params)).then(response => {
                this.page.total = response.data.data.total
                this.tableData = response.data.data
                this.tableLoading = false
                if(typeof(done)!='undefined') done()
            }).catch(() => {
                this.tableLoading = false
            })
        },
        /**
         * 搜索回调
         */
        searchChange(params, done) {
            this.getList( this.page, params, done )
        },
        // 获取红包详情
        handleItem(row, index) {
            Bus.$emit('clientGift',{
                'first': 'detail',
                'second': row.customerNo
            })
        },
        // 
        handleBeforeOpen(done) {
            done()
        }
    }
  }
</script>

<style lang="scss" scoped>
.clientGift{
    .coverName{
        color: #409EFF; 
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>
