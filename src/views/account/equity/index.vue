<template>
  <basic-container>
    <div :is="componentName" @fun='change'>
    </div>
  </basic-container>
</template>
<script>
import list from '@/views/account/equity/list'
export default {
  data(){
    return {
      componentName:'list',
    }
  },
  components:{
    list
  },
  methods:{
    change(data){
      this.componentName=data
    }
  }
}
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
