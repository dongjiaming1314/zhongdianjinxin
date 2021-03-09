<template>
  <basic-container>
    <div :is="which" :id="id"></div>
  </basic-container>
</template>

<script>
import list from './list/index'
import detail from './detail/index'
import Bus from '@/util/bus.js'
import addModule from './addModule/index'
export default {
    name: 'equityInfo',
    components:{
        list,
        detail,
        addModule
    },
    data(){
        return{
          which: 'list',
          id:'',
        }
    },
    created(){
        let _this = this
        // 切换组件list,detail
        Bus.$on('equityModule', (data) => {
            _this.which = data['first']
            _this.id = data['second']
        })
    },
}
</script>

<style lang="scss" scoped>
::v-deep .avue-crud{
  text-align: left;
}
</style>