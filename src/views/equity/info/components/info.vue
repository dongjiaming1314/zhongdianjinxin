<template>
    <div class="detailInfo">
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">权益名称：</el-col>
                    <el-col :span="16">{{ detailData.equityName ? detailData.equityName : "" }}
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">权益目录：</el-col>
                    <el-col :span="16">{{ detailData.cataName ? detailData.cataName : "" }}
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">权益成本：</el-col>
                    <el-col :span="16">{{ detailData.equityCost ? detailData.equityCost : "" }}
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">权益可用渠道：</el-col>
                    <el-col :span="16">{{ detailData.availChanType ? detailData.availChanType : "" }}
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">权益库存：</el-col>
                    <el-col :span="16">{{ detailData.equityInventory ? detailData.equityInventory : "" }}
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">库存预警：</el-col>
                    <el-col :span="16">{{ detailData.inventoryWarning ? detailData.inventoryWarning : "" }}
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">权益类型：</el-col>
                    <el-col :span="16">{{ detailData.type ? detailData.type : "" }}
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">权益有效期：</el-col>
                    <el-col :span="16">
                        <span>{{ detailData.equityValidity ? detailData.equityValidity : "" }} 天
                        </span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">所属供应商：</el-col>
                    <el-col :span="16">{{ detailData.supplierName }}
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="8" class="labelText">备注：</el-col>
                    <el-col :span="16">{{ detailData.remark ? detailData.remark : "" }}
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  name: "equityDetailInfo",
  props: ["detailData"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.detailInfo {
  .labelText {
    text-align: right;
  }
  .el-row > .el-col {
    padding: 0 4px 4px;
    margin-bottom: 0;
    .el-row {
      line-height: 40px;
      border-radius: 4px;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.8);
      font-family: PingFangSC-Regular;
      // font-weight: bolder;
      .el-col {
        margin-bottom: 0;
        padding: 0;
      }
    }
  }
  .el-row:nth-child(odd) > .el-col {
    .el-row {
      background-color: #f4f4f5;
    }
  }
}
</style>