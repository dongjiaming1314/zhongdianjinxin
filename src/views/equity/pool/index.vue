<template>
    <basic-container>
        <div
            :is="which"
            :id="id"
            :selectRadio="selectRadio"
            :everyTable='everyTable'
            :selectRadioTable='selectRadioTable'
            :six='six'
            v-on:selectTab="selectTab($event)"
            @selectTable='selectTable($event)'
        ></div>
    </basic-container>
</template>

<script>
import list from "./components/list";
import particulars from './components/particulars'
import particularsTable from './components/particularsTable'
// import detail from "./detail/index"
// import add from "./addEquity/index"
import Bus from "@/util/bus.js";
export default {
    name: "equityInfo",
    components: {
        list,
        particulars,
        particularsTable,
        // detail,
        // add,
    },
    data() {
        return {
            which: "list",
            id: "",
            selectRadio: "first", //first跳查询列表或从查询列表跳编辑，second跳申请列表或从申请列表跳编辑，third跳审核列表
            everyTable:'',
            selectRadioTable:'operation',
            six:'4'
        };
    },
    created() {
        this.watchFn();
    },
    methods: {
        watchFn() {
            let _this = this;
            // 切换组件list,detail
            Bus.$on("equityPool", (data) => {
                _this.which = data["first"];
                _this.id = data["second"];
                _this.selectRadio = data["third"];
                _this.everyTable = data["four"]
                _this.selectRadioTable = data["five"]
                _this.six = data["six"]
            });
        },
        selectTab(val) {
            this.selectRadio = val;
            //   this.watchFn()
        },
        selectTable(val){
            this.selectRadioTable = val
        }
    },
};
</script>

<style>
</style>