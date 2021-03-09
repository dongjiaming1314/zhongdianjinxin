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
      <template slot-scope="scope" slot="ruleNameSearch">
        <el-date-picker
          v-model="searchForm.date"
          type="daterange"
          range-separator="至"
          end-placeholder="结束日期"
          start-placeholder="开始日期"
        ></el-date-picker>
      </template>

      <template slot="menuLeft">
        <el-button type="primary" size="small" @click="addHandler"
          >新增</el-button
        >
        <el-button size="small">删除</el-button>
      </template>
      <template #levelName="record">
        <el-button type="text" @click="handleView(record.row)">
          {{ record.row.levelName }}
        </el-button>
      </template>
      <template #menu="scope">
        <el-button
          type="text"
          size="small"
          @click.stop="handleView(scope.row)"
          >查看</el-button
        >
        <el-button
          type="text"
          size="small"
          @click.stop="handleEdit(scope.row, scope.index)"
          >编辑</el-button
        >
        <el-button
          type="text"
          size="small"
          @click.stop="handleDelete(scope.row, scope.index)"
          >删除</el-button
        >
      </template>
    </avue-crud>

    <!-- 新增 -->
    <add-level :addVisible.sync="addVisible" :title="title"></add-level>

    <!-- 详情 -->
    <level-detail :detailVisible.sync="detailVisible"></level-detail>
  </div>
</template>

<script>
import { tableOption } from "@/const/crud/growthLevel/levelSearch";
import AddLevel from './addLevel.vue';
import LevelDetail from './levelDetail.vue';
export default {
  components: {AddLevel, LevelDetail},
  data() {
    return {
      page: {},
      tableData: [
        {
          levelName: "BatchDelete"
        }
      ],
      tableLoading: false,
      tableOption,
      searchForm: {},
      addVisible: false,
      detailVisible: false,
      selectData: [],
      title: 0
    };
  },
  methods: {
    getList() {},
    searchChange(val, done) {
      done();
    },
    selectionChange(val) {
      this.selectData = val;
    },
    sizeChange() {},
    rowDetail() {},
    addHandler() {
      this.title = 0;
      this.addVisible = true;
    },
    // 编辑
    handleEdit() {
      this.title = 1;
      this.addVisible = true;
    },
    // 查看
    handleView() {
      this.detailVisible = true;
    },
    // 单条删除
    handleDelete() {

    }
  }
};
</script>

<style lang="scss" scoped>
.label {
  margin-bottom: 10px;
  width: 140px;
  text-align: left;
  display: inline-block;
}
</style>
