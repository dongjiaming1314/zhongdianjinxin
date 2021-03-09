<template>
  <div class="fileQuery">
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :table-loading="tableLoading"
      :option="tableOption"
      @on-load="getList"
      @search-change="searchChange"
      @refresh-change="refreshChange"
    >
      <template
        slot="cusName"
        slot-scope="scope"
      >
        <span
          class="coverName"
          @click="checkDetail(scope.row, scope.index)"
        >{{ scope.row.cusName }}</span>
      </template>
      <template
        slot="levelCode"
        slot-scope="scope"
      >
        <el-select
          v-model="scope.row.levelCode"
          placeholder="请选择"
          @change="editLevel(scope.row.id ,scope.row.levelCode)"
        >
          <el-option
            v-for="item in levelList"
            :key="item.id"
            :label="item.levelName"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <!--              {{ scope.row.levelCode }}-->
      </template>
      <!-- <template slot-scope="scope" slot="menuLeft">
                  <el-button
                  v-if="permissionList.levelBtn"
                  type="primary"
                  size="small"
                  @click.stop="levelSet()">成长等级设置</el-button>
              </template> -->
      <template
        slot-scope="scope"
        slot="menu"
      >
        <el-button
          type="text"
          size="small"
          @click.stop="checkDetail(scope.row)"
        >
          查看
        </el-button>
      </template>
    </avue-crud>
    <!-- <template>
        <el-dialog
            class="clientLevelSet"
            title="客户成长等级设置"
            :visible.sync="levelShow"
            width="60%"
            >
            <level-set
            :levelForm='levelForm'
            @changeLevel='changeLevel'
            @cancelChangeLevel='cancelChangeLevel'
            ></level-set>
        </el-dialog>
    </template> -->
  </div>
</template>

<script>
import { tableOption } from "@/const/crud/client/file";
import { fetchList, editCusLevel } from "@/api/client/file";
import { getInfoList } from "@/api/growthSystem/reminderSetting";
import levelSet from "./level";
import { mapGetters } from "vuex";
import Bus from "@/util/bus.js";

export default {
  name: "fileQuery",
  components: {
    "level-set": levelSet,
  },
  props: ["permissionList"],
  data() {
    return {
      levelShow: false, //成长等级设置
      levelForm: {
        clientName: "",
        nowLevel: "",
        lastLevel: "",
        changeReason: "",
      },
      tableData: [],
      tableLoading: false,
      tableOption: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      levelList: [],
    };
  },
  created() {},
  mounted() {
    getInfoList()
      .then((res) => {
        this.levelList = res.data.data;
        // console.log(res.data.data);
      })
      .catch((res) => {
        this.$message.error(res);
      });
  },
  methods: {
    editLevel(id, levelCode) {
      editCusLevel({ id: id, levelCode: levelCode })
        .then((res) => {
          this.$message.success(res.data.msg);
          this.getList(this.page);
        })
        .catch((res) => {
          this.$message.error(res);
        });
    },
    getList(page, params, done) {
      //传参1
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params
        )
      )
        .then((response) => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.tableLoading = false;
          if (typeof done != "undefined") done();
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    levelSet() {
      this.levelShow = true;
    },
    // 成长等级设置
    changeLevel() {},
    cancelChangeLevel() {
      this.levelShow = false;
    },
    // 搜索
    searchChange(form, done) {
      this.getList(this.page, this.filterForm(form), done);
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList(this.page);
    },
    // 客户详情展示
    checkDetail(row, index) {
      // Bus.$emit("clientFile", {
      //   first: "detail",
      //   second: row.custNo,
      // });
      this.$router.push({ path: "/view/index", query: { custNo: row.custNo } });
    },
  },
};
</script>

<style lang="scss" scoped>
.clientLevelSet .el-form-item__content {
  margin-left: 120px;
}

.clientLevelSet .el-form-item__label {
  text-align: left;
}

.fileQuery {
  .coverName {
    color: #409eff;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
