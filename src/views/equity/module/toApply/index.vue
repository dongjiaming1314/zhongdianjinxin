<template>
  <div class="apply">
    <basic-container>
      <template>
        <avue-crud ref="crud"
        :option="option"
        :data="data" >
          <template slot-scope="scope" slot="menu">
            <el-button size="mini"
                      type="text"
                      @click.stop="handlerBtn(scope.row,scope.index)"
                     >{{handlerText}}
            </el-button>
          </template>
        </avue-crud>
      </template>

     </basic-container>
  </div>
</template>
<script>
  import {
    tableOption,
  } from '@/const/crud/client/file'
  import {
    mapGetters
  } from 'vuex'
  export default{
    name: "module",
    components: {

    },
    data(){
      return {

      }
    },
    methods: {


    }
  }
</script>
<style lang="scss">
  .apply {
    text-align:center;
  }
  .apply .el-card__body{
    background:white;
  }
  .apply .el-transfer{
    display:none;
    }
   .apply .avue-crud__filter{
     display:none;
   }
</style>
