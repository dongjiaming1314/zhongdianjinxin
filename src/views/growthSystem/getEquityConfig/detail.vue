<template>
  <common-dialog
    labelPosition="left"
    :visible.sync="visible"
    size="large"
    :label-width="'140px'"
    title="权益领取配置详情"
  >
    <info :detailOption="detailOption" :labelWidth='30'>
      <template #equityListvalue>
        <div style="width:60%">
          <div v-for="item in equityList" :key="item.equityId" >
            <span class="equity-label">{{item.equityName}}</span>
            <span class="equity-number">领取次数：{{item.number}}</span>
          </div>
        </div>
      </template>
    </info>
    <template #footer>
      <el-button size="small" @click="close">关闭</el-button>
    </template>
  </common-dialog>
</template>

<script>
import Info from "@/components/info";
import {getDetail} from "@/api/growthSystem/getEquityConfig";
import {remote} from "@/api/admin/dict"
export default {
  components: { Info },
  props: {
    detailVisible: {
      type: Boolean,
      default: () => false
    },
    batchNumber: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: this.detailVisible,
      detailOption: [
        { label: "客户等级", prop: "levelName", value: "" },
        { label: "权益类型", prop: "equityType", value: "" },
        { label: "权益列表", prop: "equityList", value: "11", valueslot: true },
        { label: "是否启用", prop: "enabled", value: "" }
      ],
      equityList: [],
    };
  },
  watch: {
    detailVisible(val, oldVal) {
      if (val === oldVal) return;
      this.visible = val;
    },
    visible(val, oldVal) {
      if (val === oldVal) return;
      this.$emit("update:detailVisible", val);
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      getDetail({batchNumber: this.batchNumber}).then(res => {
        const data = res.data.data.records
        if (!this.validatenull(data)) {
          this.detailOption.map(item => {
            if (item.prop == 'enabled') {
              item.value = data[0][item.prop] == 0 ? "启用" : "不启用"
              return
            }
            if (item.prop == 'equityType') {
              remote('equity_type').then(res => {
                res.data.data.map(i => {
                  if (i.value == data[0][item.prop]) {
                    item.value = i.label
                    return
                  }
                })
              })
            }
            item.value = data[0][item.prop]
          })
          data.map(item => {
            this.equityList.push({equityId: item.equityId, equityName: item.equityName, number: item.number})
          })
          console.log(this.equityList)
        }
      })
    },
    close() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.equity-label {
  display: inline-block;
  width: 160px;
  font-size: 12px;
}
.equity-number{
  font-size: 12px;
}
</style>
