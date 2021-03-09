<template>
    <div>
        <!-- <template>
            <div style="text-align: center;margin-bottom: 15px;">
                <el-radio-group v-model="selectRadio" @change="selectTab" >
                    <el-radio-button label="first">客户信息查询</el-radio-button>
                    <el-radio-button label="second" v-if="permissionList.applyBtn">申请列表</el-radio-button>
                    <el-radio-button label="third" v-if="permissionList.verifyBtn">审核列表</el-radio-button>
                </el-radio-group>
            </div>
        </template> -->
        <template>
            <!-- <to-query 
                :permissionList="permissionList"
                v-if="selectRadio==='first'" /> -->
            <to-query 
                :permissionList="permissionList"
                />
        </template>
        <!-- <template>
            <to-apply 
              :permissionList="permissionList"
              v-if="selectRadio==='second'" />
        </template>
        <template>
            <to-verify
              :permissionList="permissionList" 
              v-if="selectRadio==='third'" />
        </template> -->
    </div>
</template>
<script>
import toQuery from "./query"
// import toApply from "./apply"
// import toVerify from "./verify"
import { mapGetters } from "vuex"
export default {
  name:'clientFile',
  components: {
    toQuery,
    // toApply,
    // toVerify
  },
  data() {
    return {
      selectRadio:'first',
    }
  },
  computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          verifyBtn: this.vaildData(this.permissions.client_info_verify),
          applyBtn: this.vaildData(this.permissions.client_info_apply),
          levelBtn: this.vaildData(this.permissions.client_level_set),
          checkBtn: this.vaildData(this.permissions.client_level_set),
        }
      },
  },
  methods: {
    selectTab(val){
        this.selectRadio = val
    },
  }
};
</script>
<style lang="scss" scoped>
.btn-wrapper {
  text-align: center;
}
.is-align-center {
  text-align: center;
}
::v-deep .el-input__inner {
  padding-right: 0;
}
::v-deep .el-table__row {
  .el-button {
    i {
      display: none;
    }
  }
}
::v-deep .avue-group {
  .el-collapse-item {
    .el-collapse-item__arrow {
      color: transparent;
    }
  }
}
</style>
