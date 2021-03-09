<template>
  <div>
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      :search.sync="searchForm"
      @on-load="getList"
      @search-change="searchChange"
      @selection-change="selectionChange"
      @size-change="sizeChange"
      @cell-click="rowDetail"
    >
      <template slot-scope="scope" slot="statusSearch">
        <el-select clearable v-model="searchForm.ruleStatus">
          <el-option></el-option>
        </el-select>
      </template>

      <template slot-scope="scope" slot="shenheSearch">
        <el-select clearable v-model="searchForm.shenhe">
          <el-option></el-option>
        </el-select>
      </template>

      <template #menu="record">
        <el-button type="text" @click.native="auditHandler">审核</el-button>
        <el-button type="text">查看</el-button>
        <el-button type="text">删除</el-button>
      </template>
    </avue-crud>

    <common-dialog
      :visible.sync="auditVisible"
      label-position="left"
      size="default"
      :label-width="'100px'"
      title="审核"
    >
      <div>
        <div class="topWrapper">
          审核详情内容
        </div>
        <div>
          <div>
            <el-form-item label="审核结果：">
              <el-radio-group v-model="auditParams.result">
                <el-radio label="0">通过</el-radio>
                <el-radio label="1">失败</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="审核备注：">
              <el-input type="textarea" v-model="auditParams.mark"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button size="small">提交</el-button>
        <el-button size="small" @click="auditVisible = false">取消</el-button>
      </template>
    </common-dialog>
  </div>
</template>

<script>
import { tableOption } from "@/const/crud/growthSystem/auditList";
export default {
  data() {
    return {
      page: {},
      tableData: [
        {
          person: '112'
        }
      ],
      tableLoading: false,
      tableOption,
      searchForm: {},
      auditVisible: false,
      auditParams: {}
    };
  },
  methods: {
    getList() {},
    searchChange(val, done) {
      done()
    },
    selectionChange() {},
    sizeChange() {},
    rowDetail() {},
    auditHandler(){
      this.auditVisible = true
    }
  },
};
</script>

<style lang="scss" scoped>
.topWrapper {
  height: 200px;
  border: 1px solid #dedede;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
</style>