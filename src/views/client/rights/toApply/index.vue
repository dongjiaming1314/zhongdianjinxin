<template>
    <div>
        <avue-crud
            ref="crud"
            :page.sync="applyPage"
            :data="applyData"
            :table-loading="applyLoading"
            :option="applyOption"
            @on-load="getApplyList"
            @search-change="searchApplyChange"
        >
            <template slot-scope="scope" slot="menu">
                <div>
                    <el-button
                        v-if="
                            permissionList.applyBackBtn &&
                            scope.row.verify_status == 1
                        "
                        type="text"
                        size="small"
                        plain
                        @click.stop="handleBack(scope.row)"
                        >撤回</el-button
                    >
                    <el-button
                        v-if="scope.row.verify_status == 1"
                        type="text"
                        size="small"
                        plain
                        @click.stop="handleView(scope.row)"
                        >查看</el-button
                    >
                    <el-button
                        v-if="
                            permissionList.applyEditBtn &&
                            scope.row.verify_status == 3
                        "
                        type="text"
                        size="small"
                        plain
                        @click.stop="handleApplyEdit(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        v-if="
                            permissionList.applyDelBtn &&
                            scope.row.verify_status == 3
                        "
                        type="text"
                        size="small"
                        plain
                        @click.stop="handleDelete(scope.row)"
                        >删除</el-button
                    >
                </div>
            </template>
        </avue-crud>
        <apply-element
            v-if="applyChange"
            :applyChange.sync="applyChange"
            :applyTitle="applyTitle"
            :numForm="applyObj"
            @submitForm="applySubmit($event)"
            @resetForm="applyReset($event)"
            @closeFn="closeApplyFn"
        >
        </apply-element>
    </div>
</template>

<script>
import { applyOption } from "@/const/crud/client/rights";
import applyElement from "../components/applyElement";
export default {
    name: "rightApply",
    components: {
        applyElement,
    },
    props: ["permissionList"],
    data() {
        return {
            // 申请
            applyData: [
                {
                    cusName: "王斌",
                    custNo: "6000001",
                    phoneNumber: "17621047058",
                    checkStatus: "审核通过",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:57:45.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:57:45.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "韩飞",
                    custNo: "6000002",
                    phoneNumber: "18141521025",
                    checkStatus: "待审核",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:57:48.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:57:48.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "蒋志刚",
                    custNo: "6000003",
                    phoneNumber: "18145201026",
                    checkStatus: "待审核",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:57:51.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:57:51.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "刘玉杰",
                    custNo: "6000004",
                    phoneNumber: "18145784102",
                    checkStatus: "审核通过",
                    checkType: "修改",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:57:54.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:57:54.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "赵鑫",
                    custNo: "6000005",
                    phoneNumber: "18145631023",
                    checkStatus: "审核通过",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:57:58.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:57:58.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "郁晶鑫",
                    custNo: "6000006",
                    phoneNumber: "18175964120",
                    checkStatus: "审核通过",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:02.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:02.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "邵正兴",
                    custNo: "6000007",
                    phoneNumber: "18245102014",
                    checkStatus: "审核不通过",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:05.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:05.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "葛小敏",
                    custNo: "6000008",
                    phoneNumber: "18245261023",
                    checkStatus: "审核通过",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:08.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:08.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "陈世康",
                    custNo: "6000009",
                    phoneNumber: "18278941025",
                    checkStatus: "待审核",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:11.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:11.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "柳晨",
                    custNo: "6000010",
                    phoneNumber: "18245601023",
                    checkStatus: "待审核",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:15.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:15.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "周明杰",
                    custNo: "6000011",
                    phoneNumber: "18245102036",
                    checkStatus: "待审核",
                    checkType: "修改",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:19.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:19.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "鲁伟杰",
                    custNo: "6000012",
                    phoneNumber: "18645789541",
                    checkStatus: "审核不通过",
                    checkType: "新增",
                    createdBy: "P0001",
                    createdTime: "2020-12-30 14:58:22.0",
                    checkBy: "P0001",
                    checkTime: "2020-12-30 14:58:22.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "刘爽",
                    custNo: "6000013",
                    phoneNumber: "18645201026",
                    checkStatus: "审核通过",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:24.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:24.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "钱洪秀",
                    custNo: "6000014",
                    phoneNumber: "18645964510",
                    checkStatus: "待审核",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:28.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:28.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "李志强",
                    custNo: "6000015",
                    phoneNumber: "18645107896",
                    checkStatus: "待审核",
                    checkType: "修改",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:32.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:32.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "张继伟",
                    custNo: "6000016",
                    phoneNumber: "18645109630",
                    checkStatus: "审核不通过",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:34.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:34.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "许风",
                    custNo: "6000017",
                    phoneNumber: "18345211452",
                    checkStatus: "待审核",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:38.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:38.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "袁良才",
                    custNo: "6000018",
                    phoneNumber: "18345631026",
                    checkStatus: "待审核",
                    checkType: "新增",
                    createdBy: "P0001",
                    createdTime: "2020-12-30 14:58:40.0",
                    checkBy: "P0001",
                    checkTime: "2020-12-30 14:58:40.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "刘松",
                    custNo: "6000019",
                    phoneNumber: "18345695214",
                    checkStatus: "审核通过",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:43.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:43.0",
                    checkMark: "remarks",
                },
                {
                    cusName: "郭刘杰",
                    custNo: "6000020",
                    phoneNumber: "18645201027",
                    checkStatus: "审核不通过",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:45.0",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:45.0",
                    checkMark: "remarks",
                },
            ],
            applyPage: {
                total: 20, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10, // 每页显示多少条
            },
            applyLoading: false,
            applyOption,
            applyChange: false,
            applyTitle: "查看",
            applyObj: {},
        };
    },
    methods: {
        getApplyList() {
            this.applyData = this.applyData.slice(0,9)
        },
        searchApplyChange(form,done) {
            done()
        },
        // 申请
        // 撤回，状态为待审核时
        handleBack(row) {},
        // 撤回，状态为待审核时
        handleView(row) {
            this.applyTitle = "查看";
            this.applyChange = true;
            this.applyObj = row;
        },
        // 编辑，状态为审核失败时
        handleApplyEdit(row) {
            this.applyTitle = "编辑";
            this.applyChange = true;
            this.applyObj = row;
        },
        // 删除，状态为审核失败时
        handleDelete(row) {},
        // 编辑提交
        applySubmit() {},
        // 编辑取消
        applyReset() {
            this.closeApplyFn();
        },
        closeApplyFn() {
            this.applyChange = false;
        },
    },
};
</script>

<style>
</style>