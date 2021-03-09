<template>
    <div>
        <avue-crud
            ref="crud"
            :page.sync="verifyPage"
            :data="verifyData"
            :table-loading="verifyLoading"
            :option="verifyOption"
            @on-load="getVerifyList"
            @search-change="searchVerifyChange"
        >
            <template slot-scope="scope" slot="menu">
                <div>
                    <el-button
                        v-if="permissionList.verifyFunctionBtn"
                        type="text"
                        size="small"
                        plain
                        @click.stop="handleVerifyFunction(scope.row)"
                        >审核</el-button
                    >
                </div>
            </template>
        </avue-crud>

        <verify-element
            v-if="verifyVisible"
            :verifyVisible.sync="verifyVisible"
            :numForm="verifyForm"
            :numRules="verifyRules"
            :verifyObj="verifyObj"
            @submitForm="submit($event)"
            @resetForm="reset($event)"
            @closeFn="closeVerifyFn"
        >
        </verify-element>
    </div>
</template>

<script>
import { verifyOption } from "@/const/crud/client/rights";

import verifyElement from "../components/verifyElement";
export default {
    name: "toVerify",
    props: ["permissionList"],
    components: {
        verifyElement,
    },
    data() {
        return {
            // 审核
            verifyData: [
                {
                    cusName: "王斌",
                    custNo: "6000001",
                    phoneNumber: "17621047058",
                    checkStatus: "6",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:57:45",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:57:45",
                    checkMark: "check remark",
                },
                {
                    cusName: "韩飞",
                    custNo: "6000002",
                    phoneNumber: "18141521025",
                    checkStatus: "待审核",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:57:48",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:57:48",
                    checkMark: "check remark",
                },
                {
                    cusName: "蒋志刚",
                    custNo: "6000003",
                    phoneNumber: "18145201026",
                    checkStatus: "待审核",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:57:51",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:57:51",
                    checkMark: "check remark",
                },
                {
                    cusName: "刘玉杰",
                    custNo: "6000004",
                    phoneNumber: "18145784102",
                    checkStatus: "审核通过",
                    isAudit: "是",
                    checkType: "修改",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:57:54",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:57:54",
                    checkMark: "check remark",
                },
                {
                    cusName: "赵鑫",
                    custNo: "6000005",
                    phoneNumber: "18145631023",
                    checkStatus: "审核通过",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:57:58",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:57:58",
                    checkMark: "check remark",
                },
                {
                    cusName: "郁晶鑫",
                    custNo: "6000006",
                    phoneNumber: "18175964120",
                    checkStatus: "审核通过",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:02",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:02",
                    checkMark: "check remark",
                },
                {
                    cusName: "邵正兴",
                    custNo: "6000007",
                    phoneNumber: "18245102014",
                    checkStatus: "审核通过",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:05",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:05",
                    checkMark: "check remark",
                },
                {
                    cusName: "葛小敏",
                    custNo: "6000008",
                    phoneNumber: "18245261023",
                    checkStatus: "审核通过",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:08",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:08",
                    checkMark: "check remark",
                },
                {
                    cusName: "陈世康",
                    custNo: "6000009",
                    phoneNumber: "18278941025",
                    checkStatus: "待审核",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:11",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:11",
                    checkMark: "check remark",
                },
                {
                    cusName: "柳晨",
                    custNo: "6000010",
                    phoneNumber: "18245601023",
                    checkStatus: "待审核",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:15",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:15",
                    checkMark: "check remark",
                },
                {
                    cusName: "周明杰",
                    custNo: "6000011",
                    phoneNumber: "18245102036",
                    checkStatus: "待审核",
                    isAudit: "是",
                    checkType: "修改",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:19",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:19",
                    checkMark: "check remark",
                },
                {
                    cusName: "鲁伟杰",
                    custNo: "6000012",
                    phoneNumber: "18645789541",
                    checkStatus: "审核不通过",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "P0001",
                    createdTime: "2020-12-30 14:58:22",
                    checkBy: "P0001",
                    checkTime: "2020-12-30 14:58:22",
                    checkMark: "check remark",
                },
                {
                    cusName: "刘爽",
                    custNo: "6000013",
                    phoneNumber: "18645201026",
                    checkStatus: "审核通过",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:24",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:24",
                    checkMark: "check remark",
                },
                {
                    cusName: "钱洪秀",
                    custNo: "6000014",
                    phoneNumber: "18645964510",
                    checkStatus: "待审核",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:28",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:28",
                    checkMark: "check remark",
                },
                {
                    cusName: "李志强",
                    custNo: "6000015",
                    phoneNumber: "18645107896",
                    checkStatus: "待审核",
                    isAudit: "是",
                    checkType: "修改",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:32",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:32",
                    checkMark: "check remark",
                },
                {
                    cusName: "张继伟",
                    custNo: "6000016",
                    phoneNumber: "18645109630",
                    checkStatus: "审核不通过",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:34",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:34",
                    checkMark: "check remark",
                },
                {
                    cusName: "许风",
                    custNo: "6000017",
                    phoneNumber: "18345211452",
                    checkStatus: "待审核",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:38",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:38",
                    checkMark: "check remark",
                },
                {
                    cusName: "袁良才",
                    custNo: "6000018",
                    phoneNumber: "18345631026",
                    checkStatus: "待审核",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "P0001",
                    createdTime: "2020-12-30 14:58:40",
                    checkBy: "P0001",
                    checkTime: "2020-12-30 14:58:40",
                    checkMark: "check remark",
                },
                {
                    cusName: "刘松",
                    custNo: "6000019",
                    phoneNumber: "18345695214",
                    checkStatus: "审核通过",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:43",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:43",
                    checkMark: "check remark",
                },
                {
                    cusName: "郭刘杰",
                    custNo: "6000020",
                    phoneNumber: "18645201027",
                    checkStatus: "审核不通过",
                    isAudit: "是",
                    checkType: "新增",
                    createdBy: "admin",
                    createdTime: "2020-12-30 14:58:45",
                    checkBy: "admin",
                    checkTime: "2020-12-30 14:58:45",
                    checkMark: "check remark",
                },
            ],
            verifyPage: {
                total: 20, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10, // 每页显示多少条
            },
            verifyLoading: false,
            verifyOption,
            verifyVisible: false,
            verifyForm: {
                //审核表单
                calculation: "",
                number: 0,
                reason: "",
            },
            verifyRules: "", //审核表单规则
            verifyObj: {}, //审核信息
        };
    },
    methods: {
        getVerifyList(){
            this.verifyData = this.verifyData.slice(0,9)
        },
        // 审核
        handleVerifyFunction(row) {
            this.verifyVisible = true;
            // 调取接口，获得数据
            this.verifyObj = row;
        },
        closeVerifyFn() {
            this.verifyVisible = false;
        },
        // 审核提交
        submit() {},
        // 审核取消
        reset() {
            this.closeVerifyFn();
        },
        searchVerifyChange(form,done){
            done()
        }
    },
};
</script>

<style>
</style>