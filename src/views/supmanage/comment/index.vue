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
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
      <template slot="menuLeft">
        <el-button
          type="primary"
          size="small"
          :loading="shieldBtnLoading"
          @click.stop="ShieldMulti"
          v-if="permissionList.shieldBtn"
          >屏蔽</el-button
        >
        <el-button v-if="permissionList.replyBtn" type="primary" size="small" @click.stop="ReplyMulti"
          >回复</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="permissionList.setTopBtn"
          :loading="setTopBtnLoading"
          @click.stop="setTopMulti"
          >置顶</el-button
        >
      </template>
      <template slot-scope="scope" slot="userName">
        <span class="link" @click="handleView(scope.row)">{{scope.row.userName}}</span>
      </template>
    </avue-crud>
    <common-dialog
      v-if="replyDialog"
      :visible.sync="replyDialog"
      :title="'评价回复'"
      :size="'small'"
    >
      <el-form ref="replyForm" :model="replyForm">
        <el-form-item
          label="回复内容："
          prop="replyMessage"
          :rules="[{ required: true, message: '请输入回复内容', trigger: 'change'}]"
        >
          <el-input type="textarea" v-model="replyForm.replyMessage"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" align="right">
        <el-button
          type="primary"
          size="small"
          :loading="replySendBtnLoading"
          @click.stop="replySend"
          >发送</el-button
        >
        <el-button size="small" @click.stop="replyCancel">取消</el-button>
      </div>
    </common-dialog>
    <view-detail v-if="view" :view.sync="view" :form="detail"></view-detail>
  </basic-container>
</template>
<script>
import { tableOption } from "@/const/crud/supmanage/comment";
import { formatDate } from "@/util/date";
import {
  fetchList,
  shieldComment,
  replyComment,
  setTopComment
} from "@/api/supmanage/comment";
import Dialog from "@/components/Dialog";
import { mapGetters } from "vuex"
import ViewDetail from "./components/viewDetail"

export default {
  components: { commonDialog: Dialog, ViewDetail },
  data() {
    return {
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 20
      },
      tableData: [],
      tableOption: tableOption,
      tableLoading: false,
      sort: [],
      searchForm: {},
      selectList: [],
      shieldBtnLoading: false,
      setTopBtnLoading: false,
      replyDialog: false,
      replySendBtnLoading: false,
      replyForm: {
        replyMessage: ''
      },
      view: false,
      detail: {}
    };
  },
  computed: {
    ...mapGetters(['permissions']),
    permissionList() {
      return {
        shieldBtn: this.vaildData(this.permissions.supmanage_comment_shield),
        replyBtn: this.vaildData(this.permissions.supmanage_comment_reply),
        setTopBtn: this.vaildData(this.permissions.supmanage_comment_top),
      }
    }
  },
  created() {
    this.getList(this.page);
  },
  methods: {
    getList(page, params, done) {
      fetchList({
        current: page.currentPage,
        size: page.pageSize,
        ...params
      })
        .then(res => {
          this.tableData.push({ id: 1, userName: "111" });
          this.page.total = 1
          if (typeof done != "undefined") done();
        })
        .catch(res => {
          if (typeof done != "undefined") done();
        });
    },
    searchChange(form, done) {
      let middle = this.deepClone(this.filterForm(form));
      if (typeof this.filterForm(form)["commentTime"] == "object") {
        middle["startTime"] = formatDate(
          this.filterForm(form)["commentTime"][0]
        );
        middle["endTime"] = formatDate(this.filterForm(form)["commentTime"][1]);
      }
      this.searchForm = middle;
      this.getList(this.page, this.searchForm, done);
    },
    searchReset() {
      this.searchForm = {};
      this.getList(this.page);
    },
    selectionChange(selected) {
      this.selectList = selected;
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getList(this.page, this.searchForm);
    },
    sizeChange(val) {
      this.page.pageSize = val;
      this.getList(this.page, this.searchForm);
    },
    // 批量屏蔽
    ShieldMulti() {
      if (!this.selectList.length) {
        this.$message.warning("请选择要屏蔽的评论");
        return;
      }
      shieldComment()
        .then(res => {
          this.$message.success("屏蔽成功");
          this.setTopBtnLoading = false;
        })
        .catch(err => {
          this.setTopBtnLoading = false;
        });
    },
    // 批量回复
    ReplyMulti() {
      if (!this.selectList.length) {
        this.$message.warning("请选择要回复的评论");
        return;
      }
      this.replyDialog = true;
    },
    // 发送回复
    replySend() {
      this.$refs.replyForm.validateField("replyMessage", errMsg => {
        if (!errMsg) {
          this.replySendBtnLoading = true;
          replyComment().then(res => {
            this.$message.success('回复成功')
            this.replySendBtnLoading = false;
            this.replyDialog = false;
          }).catch(err => {
            this.replySendBtnLoading = false;
          })
        }
      });
    },
    // 取消发送
    replyCancel() {
      this.replyDialog = false;
    },
    // 批量置顶
    setTopMulti() {
      if (!this.selectList.length) {
        this.$message.warning("请选择要置顶的评论");
        return;
      }
      this.setTopBtnLoading = true;
      setTopComment()
        .then(res => {
          this.$message.success("置顶成功");
          this.setTopBtnLoading = false;
        })
        .catch(err => {
          this.setTopBtnLoading = false;
        });
    },
    // 查看详情
    handleView(detail) {
      this.view = true
      this.detail = detail
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .avue-group {
  .el-collapse-item__header {
    visibility: hidden;
  }
}
::v-deep .avue-crud__pagination {
  text-align: center;
  margin-bottom: 5px;
}
.link {
  color: #409eff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
