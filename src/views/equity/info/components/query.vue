<template>
    <div class="execution equityInfoQuery">
        <el-container>
            <el-aside width="250px">
                <avue-tree
                    ref="tree"
                    :option="treeOption"
                    :data="treeData"
                    @node-click="nodeClick"
                />
            </el-aside>
            <el-main>
                <avue-crud
                    ref="crud"
                    :page.sync="page"
                    :data="tableData"
                    :permission="permissionList"
                    :table-loading="tableLoading"
                    :option="tableOption"
                    @on-load="getList"
                    @search-change="searchChange"
                >
                    <template slot="equityName" slot-scope="scope">
                        <span
                            class="coverName"
                            @click="checkFn(scope.row, scope.index)"
                            >{{ scope.row.equityName }}</span
                        >
                    </template>

                    <template slot="equityName" slot-scope="scope">
                        <span
                            class="coverName"
                            @click="checkFn(scope.row, scope.index)"
                            >{{ scope.row.equityName }}</span
                        >
                    </template>
                    <template slot="inventoryWarning" slot-scope="scope">
                        <span
                            v-if="
                                scope.row.inventoryWarning &&
                                scope.row.equityInventory
                            "
                            :class="[
                                Number(scope.row.inventoryWarning) >=
                                Number(scope.row.equityInventory)
                                    ? 'numberWarn'
                                    : '',
                            ]"
                            >{{
                                Number(scope.row.inventoryWarning) <
                                Number(scope.row.equityInventory)
                                    ? "正常"
                                    : "预警"
                            }}</span
                        >
                    </template>
                    <template slot="menuLeft">
                        <div>
                            <el-button
                                type="primary"
                                size="small"
                                @click.stop="handleAdd()"
                                >新增</el-button
                            >
                        </div>
                    </template>
                    <template slot-scope="scope" slot="menu">
                        <el-button
                            size="small"
                            type="text"
                            @click.stop="checkFn(scope.row, scope.index)"
                            >查看</el-button
                        >
                        <el-button
                            size="small"
                            type="text"
                            @click.stop="editFn(scope.row, scope.index)"
                            >编辑</el-button
                        >
                        <el-button
                            size="small"
                            type="text"
                            @click.stop="rowDel(scope.row, scope.index)"
                            >删除</el-button
                        >
                    </template>
                </avue-crud>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Bus from "@/util/bus";
import {
    fetchList,
    getObj,
    addObj,
    putObj,
    delVerifyObj,
} from "@/api/equity/info";
import { getAllList } from "@/api/equity/catalogue";
import { tableOption } from "@/const/crud/equity/info";
import { format } from "@/util/date";
import { deepClone } from "@/util/tag";
import { mapGetters } from "vuex";
export default {
    name: "equityInfoQuery",
    components: {},
    data() {
        return {
            // 查询条件
            searchForm: {
                equityCataId: "",
            },
            currentId: -1,
            treeData: [],
            roleProps: {
                label: "cataName",
                value: "deptId",
            },
            treeOption: {
                nodeKey: "deptId",
                addBtn: false,
                menu: false,
                defaultExpandAll: true,
                
                props: {
                    label: "cataName",
                    value: "deptId",
                },
            },
            tableData: [],
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10, //  每页显示多少条
            },
            tableLoading: false,
            tableOption: tableOption,
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
            };
        },
    },
    created() {
        // 获取目录
        getAllList(1).then((response) => {
            this.treeData = response.data.data;
        });
    },
    methods: {
        getList(page, params, done) {
            fetchList(
                Object.assign(
                    {
                        current: page.currentPage,
                        size: page.pageSize,
                        checkStatus: "7", //审核通过
                    },
                    params
                )
            )
                .then((response) => {
                    this.tableData = response.data.data.records;
                    this.$set(this.page, "total", response.data.data.total);
                    this.tableLoading = false;
                    if (typeof done != "undefined") done();
                })
                .catch(() => {
                    this.tableLoading = false;
                    if (typeof done != "undefined") done();
                });
        },
        // 点击权益目录，直接去调权益接口
        nodeClick(data) {
            this.page.currentPage = 1;
            this.currentId = data.id;
            this.searchForm.equityCataId = data.id;
            this.getList(this.page, { equityCataId: data.id });
        },
        rowDel: function (row, index) {
            var _this = this;
            this.$confirm("是否确认删除", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(function () {
                    return putObj(
                        Object.assign({
                            equityId: row.equityId,
                            gid: _this.tag.query.menuId,
                            checkType: "3",
                            checkStatus: "3",
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
            let middle = deepClone(this.filterForm(params));
            if (typeof this.filterForm(params)["createdTime"] == "object") {
                middle["startTime"] = format(
                    this.filterForm(params)["createdTime"][0],
                    "yyyy-MM-dd"
                );
                middle["endTime"] = format(
                    this.filterForm(params)["createdTime"][1],
                    "yyyy-MM-dd"
                );
            }
            this.getList(this.page, middle, done);
        },
        // 添加
        handleAdd() {
            Bus.$emit("equityInfo", {
                first: "add",
                second: null,
                third: "first",
                fourth: "1",
            });
        },
        // 编辑
        editFn(row, index) {
            // 跳编辑页面
            Bus.$emit("equityInfo", {
                first: "add",
                second: row.equityId,
                third: "first", //查询跳编辑
                fourth: row.checkType ? row.checkType : "2",
                fifth: "7", //查询列表编辑
            });

            // console.log(row)
        },
        // 查看权益详情
        checkFn(row, index) {
            Bus.$emit("equityInfo", {
                first: "detail",
                second: row.equityId,
                third: "first",
                fourth: row.checkType,
                fifth: "7",
            });
        },
    },
};
</script>

<style lang="scss" scoped >
.equityInfoQuery .equityShowSet {
    display: flex;
}
.equityShowSet .equityFlex {
    flex: 1;
}
::v-deep .el-icon-delete {
    display: none;
}
.equityShowSet .previewEquity {
    min-width: 330px;
    min-height: 400px;
    width: 70%;
    padding: 10px;
    border: 1px solid grey;
    height: 60%;
    margin: 0 auto;
}

.equityShowSet .previewEquity .imgCover img {
    width: 200px;
    height: 150px;
    border: 1px solid red;
}

.equityShowSet .previewEquity .imgCover,
.equityShowSet .previewEquity .el-row,
.equityShowSet .previewEquity .textCover,
.equityShowSet .equityFlex .centerBtnCover {
    text-align: center;
}
.equityShowSet .equityFlex .centerBtnCover {
    margin-top: 10px;
}
.equityShowSet .previewEquity .specialRow {
    text-align: right;
}
.equityShowSet .previewEquity .textCover {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    line-height: 200px;
    border: 1px solid red;
}
.equityInfoQuery {
    .coverName {
        color: #409eff;
        cursor: pointer;
        text-decoration: underline;
    }
}
.numberWarn {
    color: red;
}
</style>
