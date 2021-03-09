<template>
  <div class="detail" :style="style">
    <div class="table-container">
      <div class="table-item" v-for="(item,index) in detailOption" :key="index" :style="'background-color:'+item.bgColor">
        <template v-if="!item.slot">
          <span v-if="item.label" :style="labelStyleObject" class="label">{{item.label}}：</span>
          <span v-else :style="labelStyleObject" class="label"> &nbsp;</span>
          <span :style="valueStyleObject" v-if="!item.valueslot" :class="`value ${item.type&&item.type=='link' ? 'link' : ''}`">{{item.value}}</span>
          <slot v-else :name="`${item.prop}value`"></slot>
        </template>
        <template v-else>
          <slot :name="item.prop"></slot>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detailOption: {
      type: Array,
      default: () => []
    },
    labelWidth: Number,
    bgColor: String,
    style: Object
  },
  data() {
    return {
      labelStyleObject: {
        width: this.labelWidth + "%"
      },
      valueStyleObject: {
        width: 100 - this.labelWidth - 5 + "%",
        fontSize:'14px'
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.table-container {
  width: 100%;
}
.table-item {
  position: relative;
  z-index: 0;
  display: inline-flex;
  width: 50%;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px 0;
  &:nth-child(2n-1) {
    border-right: 5px solid #fff;
  }
  &:nth-child(2n) {
    border-left: 5px solid #fff;
  }
  .label {
    text-align: right;
    display: inline-block;
    width: 40%;
    box-sizing: border-box;
    padding: 0 12px 0 0;
    font-size: 14px;
  }
  .value {
    text-align: left;
    word-break: break-all;
    display: inline-block;
    width: 60%;
    box-sizing: border-box;
    font-size: 14px;
  }
}
.table-item:nth-child(4n-3),
.table-item:nth-child(4n-2) {
  background-color: #f4f4f5;
}
.link {
  color: #409eff;
}
</style>
