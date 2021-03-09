<template>
  <div class="indexDetail">
    <el-row>
      <el-col :span="24">
        <h3 class="title buttonCover"><span>客户权益基本信息</span>
          <el-button type="primary" size="small" @click="closeFn">关闭</el-button>
        </h3>
      </el-col>
    </el-row>
    <detail-info :detailData="detailInfo"></detail-info>
    <el-row>
      <el-col :span="24">
        <h3 class="title">权益列表</h3>
      </el-col>
    </el-row>
    <avue-crud
      ref="crud"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      @on-load="getList">
    </avue-crud>
    <el-row>
      <el-col :span="24">
        <h3 class="title">权益使用列表</h3>
      </el-col>
    </el-row>
    <avue-crud
      ref="crud"
      :data="useData"
      :table-loading="useLoading"
      :option="useOption"
      @on-load="useList">
    </avue-crud>

  </div>
</template>

<script>
  import Bus from '@/util/bus.js'
  import detailInfo from '../components/info'
  import {detailOption, useOption} from '@/const/crud/client/rights'
  import {getEquityList, getEquityUseList} from "@/api/client/rights";

  export default {
    name: 'rightsDetail',
    props: {
      id: {
        type: String,
        default: ''
      },
      detailInfo: {
        type: Object,
        default: {}
      },
    },
    components: {
      detailInfo
    },
    data() {
      return {
        tableData: [],
        tableLoading: false,
        tableOption: detailOption,
        useData: [],
        useLoading: false,
        useOption,
      }
    },
    methods: {
      getList() {
        this.tableLoading = true
        getEquityList({custNo: this.detailInfo.custNo}).then(res => {
          this.tableData = res.data.data.records
          this.tableLoading = false
        }).catch(res => {
          this.$message.error(res)
          this.tableLoading = false
        })
      },
      useList() {
        this.useLoading = true
        getEquityUseList({custNo: this.detailInfo.custNo}).then(res => {
          this.useData = res.data.data.records
          this.useLoading = false
        }).catch(res => {
          this.$message.error(res)
          this.useLoading = false
        })
      },
      // 关闭详情页
      closeFn() {
        Bus.$emit('clientRights', {
          'first': 'list',
          'second': null
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .indexDetail {
    > .avue-crud {
      ::v-deep .avue-crud__menu {
        min-height: 0;
        margin-bottom: 0;
      }
    }

    .title {
      border-left: 4px solid #0780ff;
      padding-left: 8px;
      font-size: 16px;
      line-height: 16px;
      font-weight: 700;
      margin-bottom: 20px;
      margin-top: 20px;
    }

    .buttonCover {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: none;
      margin: 0;
      height: 56px;

      span {
        border-left: 4px solid #0780ff;
        padding-left: 8px;
      }
    }
  }
</style>
