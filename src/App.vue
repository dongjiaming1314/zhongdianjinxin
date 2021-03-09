<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {   
      return {}
    },
    watch: {},
    created() {

    },
    methods: {},
    computed: {}

  }
</script>
<style lang="scss">
  html,body{
    height:100%;
  }
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
	// .el-form-item__label{
	// 	// text-align:left;
	// }
  }
</style>
