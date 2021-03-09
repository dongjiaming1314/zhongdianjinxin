<template>
  <basic-container>
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      @search-change="searchChange"
      @search-reset="searchReset"
      @current-change="currentChange"
      @size-change="sizeChange">
      <template slot="clearTimeSearch" slot-scope="scope">
        <el-date-picker v-model="clearTimeList" value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetimerange" range-separator="至"
                        start-placeholder="开始时间" end-placeholder="结束时间">
        </el-date-picker>
      </template>
      <template slot="clearStatusSearch" slot-scope="scope">
        <el-select v-model="searchForm.clearStatus" placeholder="请选择清算状态">
          <el-option key="0" value="0" label="成功"></el-option>
          <el-option key="1" value="1" label="失败"></el-option>
          <el-option key="2" value="2" label="清算中"></el-option>
        </el-select>
      </template>
      <template slot="clearStatus" slot-scope="scope">
        {{ scope.row.clearStatus | toClearStatus }}
      </template>
      <template slot-scope="scope" slot="menu">
      <span style="cursor: pointer;color: #409EFF;padding: 0 5px"
            @click.stop="downLoad(scope.row)">下载</span>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getCustList, downLoadByName} from '@/api/costBreakdown/cost'
  export default {
    name: "index",
    filters: {
      toClearStatus: function (val) {
        if(val === '0') {
          return '成功'
        }else if(val === '1') {
          return '失败'
        }else if(val === '2') {
          return '清算中'
        }
      }
    },
    data() {
      return {
        page: {
          total: 0, // 总数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
          pageSizes: [10, 20, 30, 50]
        },
        clearTimeList: [],
        searchForm: {
          clearStatus: '',
          startTime: '',
          endTime: ''
        },
        tableData: [],
        tableLoading: false,
        tableOption: {
          stripe: true,
          addBtn: false,
          editBtn: false,
          delBtn: false,
          columnBtn: false,
          refreshBtn: false,
          align: 'center',
          // selection: true,
          searchIcon: false,
          formWidth: '100%',
          searchBtnText: '查询',
          searchBtnIcon: 'none',
          emptyBtnText: '重置',
          emptyBtnIcon: 'none',
          column: [{
            label: '编号',
            prop: 'integralCostCode',
            fixed: true,
            // search: true,
            // searchslot:true,
            searchSpan: 12,
            minWidth: '120px',
            // slot: true, // 自定义列
            // formslot: true // 自定义表单
          }, {
            label: '清算时间',
            prop: 'clearTime',
            searchslot:true,
            search:true,
            searchSpan: 12,
            minWidth: '200px',
            // slot: true, // 自定义列
            // formslot: true // 自定义表单
          }, {
            label: '清算状态',
            prop: 'clearStatus',
            searchslot:true,
            search:true,
            searchSpan: 12,
            minWidth: '120px',
            slot: true, // 自定义列
            formslot: true // 自定义表单
          }, {
            label: '发起人',
            prop: 'createdBy',
            // type: 'select',
            // search: true,
            // searchslot:true,
            searchSpan: 12,
            minWidth: '120px',
          }, {
            label: '流水文件',
            prop: 'fileName',
            // type: 'select',
            // search: true,
            // searchslot:true,
            searchSpan: 12,
            minWidth: '200px',
            // slot: true, // 自定义列
            // formslot: true // 自定义表单
          }]
        },
      }
    },
    mounted() {
      this.getList(this.page)
    },
    methods: {
      // 获取列表数据
      getList(page) {
        this.tableLoading = true;
        // this.tableLoading = false;
        this.searchForm.startTime = this.clearTimeList[0] ? this.clearTimeList[0] : ''
        this.searchForm.endTime = this.clearTimeList[1] ? this.clearTimeList[1] : ''
        getCustList(
          Object.assign({current: page.currentPage, size: page.pageSize}, this.searchForm)).then(res => {
          this.tableData = res.data.data.records;
          this.page.total = res.data.data.total;
          this.page.currentPage = res.data.data.current;
          this.tableLoading = false;
        }).catch(res => {
          this.$message.error(res)
          this.tableLoading = false;
        })
      },
      searchChange(param, done) {
        this.page.currentPage = 1;
        this.getList(this.page, param)
        done()
      },
      // 重置
      searchReset() {
        this.searchForm.changeType = '';
        this.searchForm.clearStatus = ''
      },
      currentChange() {
      },
      sizeChange() {
      },
      // 下载
      downLoad(row) {
        downLoadByName(row.fileName).then(res => {
          window.location.href = res.data.data
          // this.$message.success(res.data.msg)
        }).catch(res => {
          this.$message.error(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>
