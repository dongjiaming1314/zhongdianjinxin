<template>
  <basic-container>
    <div :is="which" :id="id" :detailInfo="row"></div>
  </basic-container>
</template>

<script>
  import list from "./list/index";
  import detail from "./detail/index";
  // import statement from './statement/index'
  import Bus from "@/util/bus.js";

  export default {
    name: "rightsIndex",
    components: {
      list,
      detail,
      // statement
    },
    data() {
      return {
        which: "list",
        id: "",
        row: {}
      };
    },
    created() {
      let _this = this;
      // 切换组件list,detail
      Bus.$on("clientRights", (data) => {
        _this.which = data["first"];
        _this.id = data["second"];
        _this.row = data['third']
      });
    },
  };
</script>

<style>
</style>
