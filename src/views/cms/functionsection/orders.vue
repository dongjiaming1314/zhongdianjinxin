<template>
  <div class="filter-container"  v-loading="loading">
    <div class="madp-fs-container"
         v-for="defaultSort in defaultSortData"
         :key="defaultSort.fsId">
      <div class="madp-flex-row madp-fs-title">
        <div class="madp-fs-title-square"></div>
        <div class="madp-fs-title-text">{{defaultSort.name}}</div>
      </div>
      <div class="madp-flex-row">
        <div class="madp-flex-row madp-fs-icon-item"
             v-for="icon in defaultSort.list"
             :key="icon.thirdFsId">
          <div class="madp-fs-icon-container">
            <div class="madp-fs-icon-name">{{icon.name}}</div>
            <el-input-number
              v-model="icon.orders"
              size="mini"
              :min="1"
              :max="99"
              class="madp-fs-input-number" />
            <div>
              <el-popover placement="rights"
                          width="130"
                          v-model="icon.popVisible">
                <p class="madp-fs-pop-message">确定提交？</p>
                <div class="madp-fs-pop-div">
                  <el-button size="mini" type="text" @click="icon.popVisible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleDefaultUpdate(icon)">确定</el-button>
                </div>
                <el-button plain
                           type="text"
                           icon="el-icon-check"
                           size="small"
                           class="madp-link-style madp-fs-button"
                           v-if="permissions.cms_functiondefault_edit"
                           slot="reference">确认</el-button>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    fetchDefault
  } from '@/api/cms/functionsection'
  import {
    putObj
  } from '@/api/cms/functiondefault'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'orders',
    data() {
      return {
        defaultSortData: [],
        loading: true
      }
    },
    created() {
      this.getDefault()
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    methods: {
      getDefault(){
        fetchDefault().then(response => {
          this.defaultSortData = response.data.data
          this.loading = false
        })
      },
      /**
       * 更新默认图标排序
       * @param icon {
       *     firstFsId 一级导航分类
       *     thirdFsId 三级图标
       *     orders 排序
       * }
       */
      handleDefaultUpdate(icon){
        icon.popVisible = false
        let defaultIcon  = {
          firstFsId: icon.firstFsId,
          thirdFsId: icon.thirdFsId,
          orders: icon.orders
        }
        putObj(defaultIcon).then(() => {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .madp-flex-row{
    display: flex;
    flex-direction: row;
  }
  .madp-fs-container{
    .madp-fs-title{
      width: 100%;
      height: 36px;
      .madp-fs-title-square{
        width: 16px;
        height: 16px;
        margin: 10px;
        background-color: #409eff;
      }
      .madp-fs-title-text{
        width: auto;
        height:16px;
        line-height: 36px;
        font-size:14px;
      }
    }
    .madp-fs-icon-item{
      .madp-fs-icon-container{
        padding: 10px;
        img {
          width: 36px;
          height: 36px;
          padding: 0 30px;
        }
        .madp-fs-icon-name{
          font-size: 12px;
          width: 96px;
          text-align: center;
        }
        .madp-fs-input-number{
          width: 100px;
        }
        div{
          .madp-fs-button{
            width: 100px;
            margin: 5px 0 0 0;
          }
        }
      }
      /****/
      .madp-fs-button-container{
        display: flex;
        justify-content:center;
        align-items:Center;
      }
    }
    .madp-fs-pop-message{
      text-align: center;
      font-size: 12px;
    }
    .madp-fs-pop-div{
      width: 100%;
      display: flex;
      justify-content: center; /* 水平居中 */
    }
  }
</style>
