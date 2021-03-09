<template>
    <div class="equityInfoQuery">
        <avue-crud
            ref="crud"
            :page.sync="page"
            :search.sync="search"
            :data="tableData"
            :permission="permissionList"
            :table-loading="tableLoading"
            :option="tableOption"
            @on-load="getList"
            @search-change="searchChange"
            @search-reset="searchReset"
            @current-change="currentChange"
            @size-change="sizeChange"
        >
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
            <template slot="equityName" slot-scope="scope">
                <!-- <span
                    class="coverName"
                    @click="checkFn(scope.row, scope.index)"
                    >{{ scope.row.equityName }}</span
                > -->
                <span>{{ scope.row.equityName }}</span>
            </template>
            <template slot-scope="scope" slot="menu">
                <!-- <el-button
                    v-if="
                        (scope.row.checkStatus === '3' ||
                        scope.row.checkStatus === '7') && permissionList.checkBtn
                    "
                    size="small"
                    type="text"
                    @click.stop="checkFn(scope.row, scope.index)"
                    >查看</el-button
                > -->
                <el-button
                    v-if="
                        scope.row.checkStatus === '3' &&
                        permissionList.recallBtn
                    "
                    size="small"
                    type="text"
                    @click.stop="recallFn(scope.row, scope.index)"
                    >撤回</el-button
                >
                <el-button
                    v-if="
                        scope.row.checkStatus === '5' && permissionList.editBtn
                    "
                    size="small"
                    type="text"
                    @click.stop="editFn(scope.row, scope.index)"
                    >编辑</el-button
                >
                <el-button
                    v-if="
                        (scope.row.checkStatus === '5' ||
                            scope.row.checkStatus === '7') &&
                        permissionList.delBtn
                    "
                    size="small"
                    type="text"
                    @click.stop="rowDel(scope.row, scope.index)"
                    >删除</el-button
                >
            </template>
        </avue-crud>
        <change-inventory
            v-if="numChange"
            :showDetail.sync="numChange"
            :selectedList="selectedList"
            :checkTypeList="checkTypeList"
            @submitForm="submitForm($event, val)"
            @resetForm="resetForm($event, val)"
            @closeFn="closeFn($event)"
        />
    </div>
</template>

<script>
import Bus from "@/util/bus";
import { fetchApplyList, delVerifyObj, backObj } from "@/api/equity/pool";
import { applyOption } from "@/const/crud/equity/pool";
import { deepClone } from "@/util/tag";
import changeInventory from "./changeInventory";
import { remoteDic } from "@/api/admin/dict";
import { mapGetters } from "vuex";
export default {
    name: "equityPoolApply",
    components: {
        changeInventory,
    },
    data() {
        return {
            firstCheck: true,
            checkStatusList: [],
            checkTypeList: [],
            checkedList: [],
            tableData: [],
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10, //  每页显示多少条
            },
            tableLoading: false,
            tableOption: applyOption,
            selectedList: [],
            numChange: false, //库存调整
            search: {
                checkType: "",
                checkStatus: "",
            },
        };
    },
    computed: {
        ...mapGetters(["permissions", "tag"]),
        permissionList() {
            return {
                checkBtn: this.vaildData(
                    this.permissions.equity_pool_apply_list_check
                ),
                delBtn: this.vaildData(
                    this.permissions.equity_pool_apply_list_del
                ),
                editBtn: this.vaildData(
                    this.permissions.equity_pool_apply_list_edit
                ),
                recallBtn: this.vaildData(
                    this.permissions.equity_pool_apply_list_recall
                ),
            };
        },
    },
    created() {},
    methods: {
        getList(page, params, done) {
            if (this.firstCheck) {
                this.firstCheck = false;
                remoteDic(
                    "equity_audit_check_status,equity_inventory_apply_check_type"
                ).then((res) => {
                    // // 去除草稿状态
                    // this.checkStatusList = res.data.data.equity_apply_check_status.filter(
                    //     (item) => item.label !== "草稿"
                    // );
                    // 用了审核状态： 待审核，审核通过，审核不通过
                    this.checkStatusList =
                        res.data.data.equity_audit_check_status;
                    this.checkTypeList =
                        res.data.data.equity_inventory_apply_check_type;
                    fetchApplyList(
                        Object.assign(
                            {
                                current: page.currentPage,
                                size: page.pageSize,
                                // listType: "0",
                            },
                            params
                        )
                    )
                        .then((response) => {
                            this.tableData = response.data.data.records.map(
                                (item) => {
                                    item["status"] = this.checkStatusList.find(
                                        (once) =>
                                            once.value === item["checkStatus"]
                                    )
                                        ? this.checkStatusList.find(
                                              (once) =>
                                                  once.value ===
                                                  item["checkStatus"]
                                          )["label"]
                                        : item["checkStatus"];
                                    item["type"] = this.checkTypeList.find(
                                        (twice) =>
                                            twice.value === item["checkType"]
                                    )
                                        ? this.checkTypeList.find(
                                              (twice) =>
                                                  twice.value ===
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
                });
            } else {
                fetchApplyList(
                    Object.assign(
                        {
                            current: page.currentPage,
                            size: page.pageSize,
                            // listType: "0",
                        },
                        params
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
                                    (twice) => twice.value === item["checkType"]
                                )
                                    ? this.checkTypeList.find(
                                          (twice) =>
                                              twice.value === item["checkType"]
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
        rowDel: function (row, index) {
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
                            checkType: "3",
                            id: row.id,
                        })
                    );
                })
                .then((data) => {
                    _this.$message({
                        message: data.data.msg,
                        type: "success",
                    });
                    _this.getList(this.page);
                });
        },
        //   搜索
        searchChange(params, done) {
            this.page.currentPage = 1;
            this.getList(this.page, Object.assign({},params,this.search), done);
        },
        searchReset(){
          this.search = {}
        },
        currentChange(currentPage) {
            this.page.currentPage = currentPage;
            this.getList(this.page, this.search);
        },
        sizeChange(pageSize) {
            this.page.pageSize = pageSize;
            this.getList(this.page, this.search);
        },
        // 编辑
        editFn(row, index) {
            this.numChange = true;
            // selectedList
        },
        // 查看权益详情
        checkFn(row, index) {
            Bus.$emit("equityPool", {
                first: "detail",
                second: row.id,
            });
        },
        recallFn(row, index) {
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
                            id: row.id,
                        })
                    );
                })
                .then((data) => {
                    _this.$message({
                        message: data.data.msg,
                        type: "success",
                    });
                    _this.getList(this.page);
                });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 调整方向，数量为必填项
                    // ？？？库存减小时，做一步处理：调整方向选择“5减少”时，库存数量必须小于原库存
                    if (this.numForm.checkType === "5") {
                        let middleList = this.selectedList.map(
                            (item) => item.equityInventory
                        );
                        let middleNumber = Number(this.numForm.adjustAmount);
                        if (
                            middleList.some(
                                (item) => Number(item) < middleNumber
                            )
                        ) {
                            this.$message({
                                message: "减少的数量不能大于权益库存的库存数量",
                                type: "warning",
                            });
                            return false;
                        }
                    }
                    let finalData = deepClone(this.numForm);
                    finalData["equityId"] = this.selectedList
                        .map((item) => item.equityId)
                        .join(",");
                    // finalData["equityId"] = this.equityId
                    // checkStatus
                    // gid
                    finalData["checkStatus"] = "3";
                    finalData["gid"] = this.tag.query.menuId;
                    putObj(finalData)
                        .then((data) => {
                            this.$refs.numForm.resetFields();
                            this.numChange = false;
                            this.$message({
                                message: data.data.msg,
                                type: "success",
                            });

                            this.getList(this.page);
                        })
                        .catch(() => {});
                } else {
                    this.$message({
                        message: "请检查参数是否填完整!",
                        type: "warning",
                    });
                    return false;
                }
            });
        },
        // 取消库存调整
        resetForm(formName) {
            this.numChange = false;
            this.$refs[formName].resetFields();
        },
        closeFn() {
            this.numChange = false;
        },
    },
};
</script>

<style lang="scss" scoped >
::v-deep .el-icon-delete {
    display: none;
}
.equityInfoQuery {
    .coverName {
        color: #409eff;
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>
