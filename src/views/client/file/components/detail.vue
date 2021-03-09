<template>
    <div class="indexDetail">
        <el-row>
            <el-col :span="24">
                <h3 class="title buttonCover">
                    <span>客户基本信息</span>
                    <el-button type="primary" size="small" @click="closeFn"
                        >关闭</el-button
                    >
                </h3>
            </el-col>
        </el-row>
        <detail-info :detailData="detailData" />
        <el-row>
            <el-col :span="24">
                <h3 class="title">客户卡信息</h3>
            </el-col>
        </el-row>
        <avue-crud
            ref="crud"
            :data="cardData"
            :page.sync="cardPage"
            :table-loading="cardLoading"
            :option="cardOption"
            @current-change="currentCardChange"
            @size-change="sizeCardChange"
        >
        </avue-crud>
        <el-row>
            <el-col :span="24">
                <h3 class="title">登录历史信息</h3>
            </el-col>
        </el-row>
        <avue-crud
            ref="crud"
            :data="historyData"
            :page.sync="historyPage"
            :table-loading="historyLoading"
            :option="historyOption"
            @current-change="currentHistoryChange"
            @size-change="sizeHistoryChange"
        >
        </avue-crud>
        <el-row>
            <el-col :span="24">
                <h3 class="title">解绑卡信息</h3>
            </el-col>
        </el-row>
        <avue-crud
            ref="crud"
            :page.sync="unboundPage"
            :data="unboundData"
            :option="unboundOption"
            :table-loading="unboundLoading"
            @current-change="currentUnboundChange"
            @size-change="sizeUnboundChange"
        >
        </avue-crud>
        <el-row>
            <el-col :span="24">
                <h3 class="title">地址信息</h3>
            </el-col>
        </el-row>
        <avue-crud
            ref="crud"
            :page.sync="addressPage"
            :data="addressData"
            :option="addressOption"
            :table-loading="addressLoading"
            @current-change="currentAddressChange"
            @size-change="sizeAddressChange"
        >
        </avue-crud>
    </div>
</template>

<script>
import Bus from "@/util/bus.js";
import detailInfo from "./info";
import {
    fetchAddressList,
    fetchHistoryList,
    fetchUnboundList,
    fetchCard,
    fetchInfoList,
} from "@/api/client/file";
import {
    cardOption,
    historyOption,
    unboundOption,
    addressOption,
} from "@/const/crud/client/file";
export default {
    name: "clientDetail",
    props: ["id", "idTypeList"],
    components: {
        detailInfo,
    },
    data() {
        return {
            // clientActiveName:'first', //客户信息展示项
            detailData: {}, //客户详情
            // 客户卡信息
            cardData: [],
            cardOption: cardOption,
            cardLoading: false,
            cardPage: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
            },

            // 登录历史信息
            historyData: [],
            historyOption: historyOption,
            historyLoading: false,
            historyPage: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
            },

            // 解绑卡信息
            unboundOption: unboundOption,
            unboundData: [],
            unboundLoading: false,
            unboundPage: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
            },

            // 地址信息
            addressOption: addressOption,
            addressData: [],
            addressLoading: false,
            addressPage: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
            },
        };
    },
    mounted() {
        // this.handleClientClick({name:'first'})
        this.getAccountDetail();
        this.getAccountCard();
        this.getHistory();
        this.getUnbound();
        this.getAddress();
    },
    methods: {
        // 获取客户详情
        getAccountDetail() {
            fetchInfoList(this.id).then((response) => {
                this.detailData = response.data.data;
                this.detailData["type"] = this.idTypeList.find(
                    (item) => item["value"] === response.data.data["idType"]
                )
                    ? this.idTypeList.find(
                          (item) =>
                              item["value"] === response.data.data["idType"]
                      )["label"]
                    : response.data.data["idType"];
                // 证件类型渲染
            });
        },
        // 获取客户卡信息
        getAccountCard() {
            fetchCard(this.id).then((res) => {
                this.cardData = res.data.data.records;
                this.cardPage.total = res.data.data.total;
            });
        },
        // 获取登录历史信息
        getHistory() {
            fetchHistoryList(this.id).then((res) => {
                this.historyData = res.data.data.records;
                this.historyPage.total = res.data.data.total;
            });
        },
        // 获取解绑卡信息
        getUnbound() {
            fetchUnboundList(this.id).then((res) => {
                this.unboundData = res.data.data.records;
                this.unboundPage.total = res.data.data.total;
            });
        },
        // 获取地址信息
        getAddress() {
            fetchAddressList(this.id).then((res) => {
                this.addressData = res.data.data.records;
                this.addressPage.total = res.data.data.total;
            });
        },
        // 关闭详情页
        closeFn() {
            Bus.$emit("clientFile", {
                first: "list",
                second: null,
            });
        },
        currentAddressChange(val) {
            this.addressPage.currentPage = val;
            this.getAddress(this.addressPage);
        },
        sizeAddressChange(val) {
            this.addressPage.pageSize = val;
            this.getAddress(this.addressPage);
        },
        currentUnboundChange(val) {
            this.unboundPage.currentPage = val;
            this.getUnbound(this.unboundPage);
        },
        sizeUnboundChange(val) {
            this.unboundPage.pageSize = val;
            this.getUnbound(this.unboundPage);
        },
        currentCardChange(val) {
            this.cardPage.currentPage = val;
            this.getCard(this.cardPage);
        },
        sizeCardChange(val) {
            this.cardPage.pageSize = val;
            this.getCard(this.cardpage);
        },
        currentHistoryChange(val) {
            this.historyPage.currentPage = val;
            this.getHistory(this.historyPage);
        },
        sizeHistoryChange(val) {
            this.historyPage.pageSize = val;
            this.getHistory(this.historyPage);
        },
    },
};
</script>

<style scoped lang="scss">
.indexDetail {
    > .avue-crud {
        ::v-deep .avue-crud__menu {
            min-height: 0;
            margin-bottom: 0;
        }
    }

    .title {
        border-left: 4px solid #0780ff;
        padding-left: 8px;
        font-size: 16px;
        line-height: 16px;
        font-weight: 700;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .buttonCover {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-left: none;
        margin: 0;
        height: 56px;
        span {
            border-left: 4px solid #0780ff;
            padding-left: 8px;
        }
    }
}
</style>
