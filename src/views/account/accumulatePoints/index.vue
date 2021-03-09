<template>
  <basic-container>
    <div :is="componentName" @fun='change' @getRow="getRow" :rowInfo="rowInfo">
    </div>
  </basic-container>
</template>
<script>
import list from "@/views/account/accumulatePoints/list";
import detailtwo from "@/views/account/accumulatePoints/detailTwo";
import detailthree from "@/views/account/accumulatePoints/detailThree";
import detail from "@/views/account/accumulatePoints/detail";
export default {
  data() {
    return {
      componentName: "list",
      rowInfo: {}
    };
  },
  components: {
    list,
    detailtwo,
    detailthree,
    detail
  },
  methods: {
    change(data) {
      // console.log(data)
      this.componentName = data;
    },
    getRow(data) {
      this.rowInfo = data;
    }
  }
};
</script>
<style scoped>
::v-deep .avue-form__menu {
  text-align: right;
}
::v-deep .avue-crud__pagination {
  text-align: center;
  padding: 15px 20px;
}
</style>
