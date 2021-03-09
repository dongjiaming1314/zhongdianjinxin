<template>
  <div>
    <Main v-if="isShow" @editShow="editShow"></Main>
    <AddCommodity v-else-if="!isShow" @editShow="editShow"></AddCommodity>
  </div>
</template>

<script>
  import Main from "./Main";
  import AddCommodity from "./AddCommodity";

  export default {
    name: "index",
    components: {Main, AddCommodity},
    data() {
      return {
        isShow: true,
      }
    },
    methods: {
      editShow(val) {
        this.isShow = val
      }
    }
  }
</script>

<style scoped>

</style>
