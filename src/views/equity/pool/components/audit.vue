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
                    v-if="scope.row.checkStatus === '7'"
                    size="small"
                    type="text"
                    @click.stop="checkFn(scope.row, scope.index)"
                    >查看</el-button
                > -->
                <el-button
                    v-if="
                        scope.row.checkStatus === '7' ||
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
                    @click.stop="verifyFn(scope.row, scope.index)"
                    >审核</el-button
                >
            </template>
        </avue-crud>
        <audit-opinion
            v-if="verifyNow"
            :showDetail.sync="verifyNow"
            :id="id"
            :checkType="checkType"
            :checkStatusList="checkStatusList"
            v-on:getList="getList($event)"
            v-on:closeFn="closeFn($event)"
            :page="page"
        ></audit-opinion>
    </div>
</template>

<script>
import Bus from "@/util/bus";
import { fetchApplyList, delVerifyObj } from "@/api/equity/pool";
// import { getAllList } from "@/api/equity/catalogue"
import { applyOption } from "@/const/crud/equity/pool";
// import { format } from "@/util/date"
import { deepClone } from "@/util/tag";

import { remoteDic } from "@/api/admin/dict";
import { mapGetters } from "vuex";
import auditOpinion from "./auditOpinion";
export default {
    name: "equityPoolApply",
    components: {
        auditOpinion,
    },
    data() {
        return {
            checkType: "",
            id: "",
            verifyNow: false,
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
            numForm: {
                calculation: "",
                number: "",
                reason: "",
                ids: "",
            },
            numRules: {
                calculation: [
                    {
                        required: true,
                        message: "请选择调整方向",
                        trigger: "blur",
                    },
                ],
                number: [
                    {
                        type: "number",
                        required: true,
                        message: "请选择活动区域",
                        trigger: "change",
                    },
                ],
            },
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
                addBtn: this.vaildData(this.permissions.equity_info_add),
                delBtn: this.vaildData(this.permissions.equity_info_del),
                editBtn: this.vaildData(this.permissions.equity_info_edit),
                viewBtn: this.vaildData(this.permissions.equity_info_view),
                numChangeBtn: this.vaildData(
                    this.permissions.equity_number_edit
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
                    this.checkStatusList =
                        res.data.data.equity_audit_check_status;
                    this.checkTypeList =
                        res.data.data.equity_inventory_apply_check_type;
                });
                fetchApplyList(
                    Object.assign(
                        {
                            current: page.currentPage,
                            size: page.pageSize,
                            // listType: "1",
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
            } else {
                fetchApplyList(
                    Object.assign(
                        {
                            current: page.currentPage,
                            size: page.pageSize,
                            // listType: "1",
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
                            id: row.id,
                            checkType: "3",
                        })
                    );
                })
                .then((data) => {
                    _this.$message({
                        message: "删除成功",
                        type: "success",
                    });
                    this.getList(this.page);
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
        },
        // 选中项
        selectionChange(list) {
            this.$message.success("选中的数据" + JSON.stringify(list));
            // checkedList
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 调整方向，数量为必填项
                    // ？？？库存减小时，做一步处理：调整方向选择“减少”时，库存数量必须小于原库存

                    if (this.numForm.calculation === "减少") {
                        let middleList = this.selectedList.map(
                            (item) => item.number
                        );
                        let middleNumber = Number(this.numForm.number);
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
                    finalData["ids"] = this.selectedList.map((item) => item.id);

                    if (this.numForm.calculation === "增加") {
                        finalData.calculation = 0;
                    } else {
                        finalData.calculation = 1;
                    }
                    // putNumChangeObj(finalData).then(data => {
                    //     this.$message({
                    //       message: '库存修改成功',
                    //       type: 'success'
                    //     })
                    //     this.$refs.numForm.resetFields()
                    //     this.numChange = false
                    //     this.getList(this.page)
                    //   }).catch(() => {

                    //   })
                } else {
                    alert("请检查参数是否填完整!");
                    return false;
                }
            });
        },
        // 取消库存调整
        resetForm(formName) {
            this.numChange = false;
            this.$refs[formName].resetFields();
        },

        // 查看权益详情
        checkFn(row, index) {
            Bus.$emit("equityPool", {
                first: "detail",
                second: row.id,
            });
        },
        verifyFn(row, index) {
            this.verifyNow = true;
            this.id = row.id;
            this.checkType = row.checkType;
        },
        closeFn() {
            this.verifyNow = false;
            this.id = "";
            this.checkType = "";
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
