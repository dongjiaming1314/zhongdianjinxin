<template>
  <div style="padding-bottom:20px">
    <avue-crud
      :data="equityList"
      :option="option"
    >
      <template
        slot="equityUseStatus"
        slot-scope="scope"
      >
        <!-- <el-tag type="success">{{scope.row.equityUseStatus | status}}</el-tag> -->
        <div
          class="tag"
          :class="{ unused:scope.row.equityUseStatus === '0',used:scope.row.equityUseStatus === '1'}"
        >
          {{scope.row.equityUseStatus | status}}
        </div>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { equityOption } from "@/const/crud/client/view";
export default {
  props: ["equityList"],
  data() {
    return {
      option: equityOption,
    };
  },
  filters: {
    status: function (val) {
      if (val === "0") return "未使用";
      if (val === "1") return "已使用 ";
      if (val === "2") return "已过期";
      if (val === "3") return "失效";
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang='scss' scoped>
.tag {
  width: 68px;
  // height: 24px;
  text-align: center;
  line-height: 24px;
  border: 1px solid #909399;
  border-radius: 12px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  opacity: 0.68;
}
.unused {
  border: 1px solid #3de2ff;
  background: rgba(61, 226, 255, 0.2);
  color: #3de2ff;
}
.used {
  background: rgba(61, 112, 254, 0.12);
  border: 1px solid #396bff;
  color: #496dff;
}
</style>