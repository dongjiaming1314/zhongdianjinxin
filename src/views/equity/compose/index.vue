<template>
  <basic-container>
    <div :is="which" :id="id"></div>
  </basic-container>
</template>

<script>
import list from './components/list'
import detail from './components/detail'
import Bus from '@/util/bus.js'
export default {
    name: 'fileIndex',
    components:{
        list,
        detail
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
        Bus.$on('poolCompose', (data) => {
            _this.which = data['first']
            _this.id = data['second']
        })
    },
}
</script>

<style>

</style>