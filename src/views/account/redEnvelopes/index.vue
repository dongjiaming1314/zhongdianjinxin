<template>
  <basic-container>
    <div :is="componentName" @fun='change'>
    </div>
  </basic-container>
</template>
<script>
import list from '@/views/account/redEnvelopes/list'
import detail from '@/views/account/redEnvelopes/detail'
export default {
  data(){
    return {
      componentName:'list',
    }
  },
  components:{
    list,detail
  },
  methods:{
    change(data){
      // console.log(data)
      this.componentName=data
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .avue-form__menu {
  text-align: right;
}
::v-deep .avue-crud__pagination {
  text-align: center;
  padding: 15px 20px;
}
</style>