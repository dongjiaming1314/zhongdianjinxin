<template>
  <basic-container>
    <div
      :is="which"
      :id="id"
      :idTypeList="idTypeList"
    ></div>
  </basic-container>
</template>

<script>
import list from "./components/list";
import detail from "./components/detail";
import Bus from "@/util/bus.js";
import { remoteDic } from "@/api/admin/dict";
export default {
  name: "fileIndex",
  components: {
    list,
    detail,
  },
  data() {
    return {
      which: "list",
      id: "",
      idTypeList: [],
    };
  },
  created() {
    let _this = this;
    // 切换组件list,detail
    Bus.$on("clientFile", (data) => {
      _this.which = data["first"];
      _this.id = data["second"];
    });
    // 获取证件类型
    remoteDic("id_type").then((res) => {
      this.idTypeList = res.data.data["id_type"];
    });
  },
};
</script>

<style>
</style>