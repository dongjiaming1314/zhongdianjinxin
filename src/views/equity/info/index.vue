<template>
    <basic-container>
        <div
            :is="which"
            :id="id"
            :selectRadio="selectRadio"
            :checkType="checkType"
            :checkStatus="checkStatus"
            v-on:selectTab="selectTab($event)"
        ></div>
    </basic-container>
</template>

<script>
import list from "./components/list";
import detail from "./components/detail";
import add from "./components/add";
import Bus from "@/util/bus.js";
export default {
    name: "equityInfo",
    components: {
        list,
        detail,
        add,
    },
    data() {
        return {
            which: "list", //当前是哪个页面，list 代表是查询列表，add代表是新增或是编辑页面，detail代表是详情页面
            id: "", //如果是详情或编辑的话，代表此条信息的id；id无值，当前是新增；id有值，当前是编辑或是查看详情
            selectRadio: "first", //具体是哪个列表。first跳查询列表或从查询列表跳编辑，second跳申请列表或从申请列表跳编辑，third跳审核列表
            checkType: "", //1 新增 2 修改 3 删除
            checkStatus: "", //如果是申请列表编辑，checkStatus是当前数据的checkStatus；如果是查询列表编辑，checkStatus 是7
        };
    },
    created() {
        this.watchFn();
    },
    methods: {
        watchFn() {
            let _this = this;
            // 切换组件list,detail
            Bus.$on("equityInfo", (data) => {
                _this.which = data["first"];
                _this.id = data["second"];
                _this.selectRadio = data["third"];
                _this.checkType = data["fourth"];
                _this.checkStatus = data["fifth"];
            });
        },
        selectTab(val) {
            this.selectRadio = val;
            //   this.watchFn()
        },
    },
};
</script>

<style>
</style>