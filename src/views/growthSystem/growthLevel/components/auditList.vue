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
      <template #statusSearch>
        <el-select v-model="searchForm.status"></el-select>
      </template>

      <template #isOrNotSearch>
        <el-select v-model="searchForm.isOrNot"></el-select>
      </template>

      <template #dateSearch>
        <el-date-picker
          v-model="searchForm.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </template>

      <template #menu="record">
        <el-button type="text" @click="auditHandler">审核</el-button>
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
        <div class="topWrapper">审核详情内容</div>
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
import { tableOption } from "@/const/crud/growthLevel/auditList";
export default {
  data() {
    return {
      page: {},
      tableData: [
        {
          ruleName: "111"
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
      done();
    },
    selectionChange() {},
    sizeChange() {},
    rowDetail() {},
    auditHandler() {
      this.auditVisible = true;
    }
  },
  mounted() {}
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
