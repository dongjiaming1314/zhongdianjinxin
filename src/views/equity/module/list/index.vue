<template>
    <div class="module">
        <template>
            <div style="text-align: center;margin-bottom: 15px;">
                <el-radio-group v-model="selectRadio" @change="selectTab">
                    <el-radio-button label="first">权益模板查询</el-radio-button>
                    <el-radio-button label="second">申请列表</el-radio-button>
                    <el-radio-button label="third">审核列表</el-radio-button>
                </el-radio-group>
            </div>
        </template>
        <template>
            <to-check
                v-if="selectRadio==='first'"
                ></to-check>
        </template>
        <template>
            <to-apply
                v-if="selectRadio==='second'"
                ></to-apply>
        </template>
        <template>
            <to-verify
                v-if="selectRadio==='third'"
                ></to-verify>
        </template>
    </div>
</template>
<script>
import {
mapGetters
} from 'vuex'
import toCheck from '../toCheck/index'
import toApply from '../toApply/index'
import toVerify from '../toVerify/index'
export default{
    name:"equityModule",
    components: {
      toCheck,
      toApply,
      toVerify,
    },
    data(){
      return {
        selectRadio: 'first',
      }
    },
    methods: {
      getList(page, params) {
        this.tableLoading = false
        fetchList(Object.assign({
            current: page.currentPage,
            size: page.pageSize
        }, params)).then(response => {
            this.tableData = response.data.data
            // this.page.total = 1
            this.tableLoading = false
        }).catch(() => {
            this.tableLoading=false
        })
      },
      selectTab(value) {
        this.selectRadio = value
      },
      handleCancle(){
        this.addFormVisible = false
      },
      

    }
  }
</script>
<style lang="scss" scoped>
  .module {
    text-align:center;
  }
  .module .el-card__body{
    background:white;
  }
  .module .el-transfer{
    display:none;
    }
   .module .avue-crud__filter{
     display:none;
   }
   .module .el-collapse-item__header{
      display:none!important;
    }
    .module .avue-crud__tip {
      display: none;
    }
    .moduleDetail{
      text-align:left;
    }
</style>
