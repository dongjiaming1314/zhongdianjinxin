<template>
    <avue-crud
        ref="crud"
        :page.sync="page"
        :search.sync="search"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @search-change="searchChange"
        @search-reset="searchReset"
        @current-change="currentChange"
        @size-change="sizeChange"
    >
        <template slot="equityName" slot-scope="scope">
            <span class="coverName" @click="checkFn(scope.row, scope.index)">{{
                scope.row.equityName
            }}</span>
        </template>
        <template slot="checkStatusSearch" slot-scope="scope">
            <avue-select
                v-model="search.checkStatus"
                type="tree"
                placeholder="请选择"
                :dic="checkStatusList"
            ></avue-select>
        </template>
        <template slot="checkTypeSearch" slot-scope="scope">
            <avue-select
                v-model="search.checkType"
                type="tree"
                placeholder="请选择"
                :dic="checkTypeList"
            ></avue-select>
        </template>
        <template slot="checkType" slot-scope="scope">
            <span>{{ scope.row.type }}</span>
        </template>
        <template slot="checkStatus" slot-scope="scope">
            <span>{{ scope.row.status }}</span>
        </template>
        <template slot-scope="scope" slot="menu">
            <el-button
                v-if="scope.row.checkStatus === '3'"
                size="small"
                type="text"
                @click.stop="checkFn(scope.row, scope.index)"
                >查看</el-button
            >
            <el-button
                v-if="
                    scope.row.checkStatus === '1' ||
                    scope.row.checkStatus === '5'
                "
                size="small"
                type="text"
                @click.stop="editFn(scope.row, scope.index)"
                >编辑</el-button
            >
            <el-button
                v-if="
                    scope.row.checkStatus === '1' ||
                    scope.row.checkStatus === '5'
                "
                size="small"
                type="text"
                @click.stop="rowDel(scope.row, scope.index)"
                >删除</el-button
            >
            <el-button
                v-if="scope.row.checkStatus === '3'"
                size="small"
                type="text"
                @click.stop="backFn(scope.row, scope.index)"
                >撤回</el-button
            >
        </template>
    </avue-crud>
</template>
<script>
import { getObj, delVerifyObj, backObj } from "@/api/equity/info";
import { applyOption } from "@/const/crud/equity/info";
import { remoteDic } from "@/api/admin/dict";
import Bus from "@/util/bus.js";

import { mapGetters } from "vuex";

export default {
    name: "equityInfoApply",
    created() {
        this.getList(this.page);
    },
    computed: {
        ...mapGetters(["tag"]),
    },
    data() {
        return {
            tableOption: applyOption,
            checkStatusList: [],
            checkTypeList: [],
            tableData: [],
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10, //  每页显示多少条
            },
            tableLoading: false,
            search: {
                checkStatus: "",
                checkType: "",
            },
            firstCheck: true,
            editData: [],
        };
    },
    methods: {
        getList(page, params, done) {
            this.tableLoading = true
            if (this.firstCheck) {
                this.firstCheck = false;
                remoteDic("equity_apply_check_status,slideshow_checkType").then(
                    (res) => {
                        this.checkStatusList =
                            res.data.data.equity_apply_check_status;
                        this.checkTypeList = res.data.data.slideshow_checkType;
                        getObj(
                            Object.assign(
                                {
                                    listType: "0", //0 申请
                                    current: page.currentPage,
                                    size: page.pageSize,
                                },
                                params,
                              this.search
                            )
                        )
                            .then((response) => {
                                this.tableData = response.data.data.records.map(
                                    (item) => {
                                        item[
                                            "status"
                                        ] = this.checkStatusList.find(
                                            (once) =>
                                                once.value ===
                                                item["checkStatus"]
                                        )
                                            ? this.checkStatusList.find(
                                                  (once) =>
                                                      once.value ===
                                                      item["checkStatus"]
                                              )["label"]
                                            : item["checkStatus"];
                                        item["type"] = this.checkTypeList.find(
                                            (once) =>
                                                once.value === item["checkType"]
                                        )
                                            ? this.checkTypeList.find(
                                                  (once) =>
                                                      once.value ===
                                                      item["checkType"]
                                              )["label"]
                                            : item["checkType"];
                                        return item;
                                    }
                                );
                                this.$set(
                                    this.page,
                                    "total",
                                    response.data.data.total
                                );
                                this.tableLoading = false;
                                if (typeof done != "undefined") done();
                            })
                            .catch(() => {
                                this.tableLoading = false;
                                if (typeof done != "undefined") done();
                            });
                    }
                );
            } else {
                getObj(
                    Object.assign(
                        {
                            listType: "0", //0 申请
                            current: page.currentPage,
                            size: page.pageSize,
                        },
                        params,
                      this.search
                    )
                )
                    .then((response) => {
                        this.tableData = response.data.data.records.map(
                            (item) => {
                                item["status"] = this.checkStatusList.find(
                                    (once) => once.value === item["checkStatus"]
                                )
                                    ? this.checkStatusList.find(
                                          (once) =>
                                              once.value === item["checkStatus"]
                                      )["label"]
                                    : item["checkStatus"];
                                item["type"] = this.checkTypeList.find(
                                    (once) => once.value === item["checkType"]
                                )
                                    ? this.checkTypeList.find(
                                          (once) =>
                                              once.value === item["checkType"]
                                      )["label"]
                                    : item["checkType"];
                                return item;
                            }
                        );
                        this.$set(this.page, "total", response.data.data.total);
                        this.tableLoading = false;
                        if (typeof done != "undefined") done();
                    })
                    .catch(() => {
                        this.tableLoading = false;
                        if (typeof done != "undefined") done();
                    });
            }
        },
        searchChange(params, done) {
            this.page.currentPage = 1;
            this.getList(this.page, params, done);
        },
      searchReset() {
        this.search.checkStatus = ''
        this.search.checkType = ''
      },
        currentChange(currentPage) {
            this.page.currentPage = currentPage;
            this.getList(this.page, this.search);
        },
        sizeChange(pageSize) {
            this.page.pageSize = pageSize;
            this.getList(this.page, this.search);
        },
        checkFn(row, index) {
            Bus.$emit("equityInfo", {
                first: "detail",
                second: row.equityId,
                third: "second",
                fourth: row.checkType,
                fifth: row.checkStatus,
            });
        },
        editFn(row, index) {
            Bus.$emit("equityInfo", {
                first: "add",
                second: row.equityId,
                third: "second", //申请跳编辑
                fourth: row.checkType,
                fifth: row.checkStatus, //申请列表编辑，当前数据的checkStatus
            });
            // 需要把checkType,checkStatus带过去
        },
        rowDel(row, index) {
            var _this = this;
            this.$confirm("是否确认删除", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(function () {
                    return delVerifyObj(
                        Object.assign({
                            gid: _this.tag.query.menuId,
                            checkStatus: row.checkStatus,
                            equityId: row.equityId,
                            checkType: "3", //删除
                        })
                    );
                })
                .then((data) => {
                    _this.$message({
                        message: data.data.msg,
                        type: "success",
                    });
                    this.getList(this.page);
                });
        },
        backFn(row, index) {
            var _this = this;
            this.$confirm("是否确认撤回", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(function () {
                    return backObj(
                        Object.assign({
                            gid: _this.tag.query.menuId,
                            checkStatus: row.checkStatus,
                            equityId: row.equityId,
                        })
                    );
                })
                .then((data) => {
                    _this.$message({
                        message: data.data.msg,
                        type: "success",
                    });
                    this.getList(this.page);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.coverName {
    color: #409eff;
    cursor: pointer;
    text-decoration: underline;
}
</style>
