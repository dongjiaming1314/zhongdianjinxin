<template>
    <div class="execution equityInfoQuery">
        <avue-crud
            ref="crud"
            :page.sync="page"
            :data="tableData"
            :permission="permissionList"
            :table-loading="tableLoading"
            :option="tableOption"
            @search-change="searchChange"
            @current-change="currentChange"
            @size-change="sizeChange"
            @selection-change="selectionChange"
            @search-reset="searchReset"
        >
        <template slot="equityNameSearch" slot-scope="scope">
            <el-input
                    clearable
                    placeholder="请输入"
                    v-model="searchForm.equityName"
                ></el-input>
        </template>
            <template slot="equityTypeSearch" slot-scope="scope">
                <avue-select
                    v-model="searchForm.equityType"
                    type="tree"
                    placeholder="请选择"
                    :dic="equityTypeList"
                ></avue-select>
            </template>
            <template slot="supplierNameSearch" slot-scope="scope">
                <el-select
                    v-model="searchForm.supplierBusinessId"
                    placeholder="请选择"
                >
                <el-option v-for="(item,index) in supplierNameList" :key="index" :label="item.supplierName" :value="item.supplierNumber"></el-option>
                </el-select>
            </template>
            <template slot="equityType" slot-scope="scope">
                <span>{{ scope.row.type }}</span>
            </template>
            <!-- <template slot="equityName" slot-scope="scope">
                <span
                    class="coverName"
                    @click="checkFn(scope.row, scope.index)"
                    >{{ scope.row.equityName }}</span
                >
            </template> -->
            <template slot="equityName" slot-scope="scope">
                <span>{{ scope.row.equityName }}</span>
            </template>
            <template slot="cataNameSearch" slot-scope="scope">
                <avue-input-tree
                    v-model="searchForm.equityCataId"
                    placeholder="请选择"
                    type="tree"
                    :dic="treeData"
                    :props="roleProps"
                >
                </avue-input-tree>
            </template>
            <template slot="menuLeft">
                <div>
                    <el-button
                        v-if="permissionList.changeBtn"
                        type="primary"
                        size="small"
                        @click.stop="changeInventory()"
                        >库存变动</el-button
                    >
                </div>
            </template>
            <template slot-scope="scope" slot="menu">
                <!-- <el-button
                    size="small"
                    type="text"
                    @click.stop="checkFn(scope.row, scope.index)"
                    >查看</el-button
                > -->
                <el-button
                    v-if="permissionList.changeBtn"
                    size="small"
                    type="text"
                    @click.stop="editFn(scope.row, scope.index)"
                    >库存变动</el-button
                >
                <el-button
                    size="small"
                    type="text"
                    @click.stop="goparticulars(scope.row)"
                    >明细查询</el-button
                >
                <!-- <el-button
                    v-if="permissionList.delBtn"
                    size="small"
                    type="text"
                    @click.stop="rowDel(scope.row, scope.index)"
                    >删除</el-button
                > -->
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
import { fetchList, putObj,supplierBusiness } from "@/api/equity/pool";
import { getAllList } from "@/api/equity/catalogue";
import { tableOption } from "@/const/crud/equity/pool";
import changeInventory from "./changeInventory";
// selectRadio
import { remoteDic } from "@/api/admin/dict";
import { deepClone } from "@/util/tag";
import { mapGetters } from "vuex";
export default {
    name: "equityPoolQuery",
    components: {
        changeInventory,
    },
    data() {
        return {
            roleProps: {
                label: "cataName",
                value: "id",
            },
            // checkedList: [],
            tableData: [],
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10, //  每页显示多少条
            },
            tableLoading: false,
            tableOption: tableOption,
            selectedList: [],
            numChange: false, //库存调整
            treeData: [],
            searchForm: {
                equityCataId: "",
                equityType: "",
                equityName: "",
            },
            equityTypeList: [],
            firstCheck: true,
            checkTypeList: [],
            equityId: "",
            supplierNameList:[]
        };
    },
    computed: {
        ...mapGetters(["permissions", "tag"]),
        permissionList() {
            return {
                checkBtn: this.vaildData(
                    this.permissions.equity_pool_query_list_check
                ),
                delBtn: this.vaildData(
                    this.permissions.equity_pool_query_list_del
                ),
                changeBtn: this.vaildData(
                    this.permissions.equity_pool_query_list_change
                ),
            };
        },
    },
    created() {
        // 获取目录
        getAllList(1).then((response) => {
            this.treeData = response.data.data;
        });
        this.getList(this.page)
        this.getSupplierBusiness()
    },
    methods: {
        // 查询所属供应商
        getSupplierBusiness(){
            supplierBusiness({
                current:1,
                size:99999
            })
            .then(res=>{
                this.supplierNameList = res.data.data.records
            })
        },
        // 点击明细查询
        goparticulars(row){
            Bus.$emit("equityPool", {
                first: "particulars",
                second: row,
            });
        },
        getList(page) {
            this.tableLoading = true
            if (this.firstCheck) {
                this.firstCheck = false;
                remoteDic("equity_type,equity_inventory_apply_check_type").then(
                    (res) => {
                        this.equityTypeList = res.data.data.equity_type;
                        this.checkTypeList =
                            res.data.data.equity_inventory_apply_check_type;
                    }
                );
                fetchList( Object.assign({current: page.currentPage, size: page.pageSize},this.searchForm) )
                    .then((response) => {
                        this.tableData = response.data.data.records.map(
                            (item) => {
                                item["type"] = this.equityTypeList.find(
                                    (once) => once.value === item["equityType"]
                                )
                                    ? this.equityTypeList.find(
                                          (once) =>
                                              once.value === item["equityType"]
                                      )["label"]
                                    : item.equityType;
                                return item;
                            }
                        );
                        this.$set(this.page, "total", response.data.data.total);
                        this.tableLoading = false;
                    })
                    .catch(() => {
                        this.tableLoading = false;
                    });
            } else {
                fetchList( Object.assign({current: page.currentPage, size: page.pageSize},this.searchForm) )
                    .then((response) => {
                        this.tableData = response.data.data.records.map(
                            (item) => {
                                item["type"] = this.equityTypeList.find(
                                    (once) => once.value === item["equityType"]
                                )
                                    ? this.equityTypeList.find(
                                          (once) =>
                                              once.value === item["equityType"]
                                      )["label"]
                                    : item.equityType;
                                return item;
                            }
                        );
                        this.$set(this.page, "total", response.data.data.total);
                        this.tableLoading = false;
                    })
                    .catch(() => {
                        this.tableLoading = false;
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
                    return delObj(row.id);
                })
                .then((data) => {
                    _this.$message({
                        message: data.data.msg,
                        type: "success",
                    });
                    this.getList(this.page);
                });
        },
        //   搜索
        searchChange(params, done) {
            this.page.currentPage = 1;
            this.getList(this.page);
            done()
        },
        currentChange(currentPage) {
            this.page.currentPage = currentPage;
            this.getList(this.page)
        },
        sizeChange(pageSize) {
            this.page.pageSize = pageSize;
            this.getList(this.page)
        },
        searchReset() {
            this.searchForm = {
                equityCataId: "",
                equityType: "",
                equityName: '',
            };
            this.getList(this.page)
        },
        // 编辑
        editFn(row, index) {
            this.numChange = true;
            this.selectedList = new Array(0);
            this.selectedList.push(row);
        },
        // 选中项
        selectionChange(list) {
            this.selectedList = list;
        },
        // 库存调整
        changeInventory() {
            // 选项
            if (this.selectedList.length) {
                this.numChange = true;
            } else {
                this.$message.warning("请先选择要修改的数据");
            }
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
            this.selectedList = new Array(0);
            // 清空选中状态？？/
            this.$refs.crud.selectClear();
        },
        // 查看权益详情
        checkFn(row, index) {
            Bus.$emit("equityPool", {
                first: "detail",
                second: row.id,
            });
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
.numberWarn {
    color: red;
}
</style>
