<template>
    <common-dialog
        :visible.sync="showDetail"
        title="库存调整"
        :size="'large'"
        @close="closeFn"
    >
        <el-row>已选权益列表</el-row>
        <template>
            <el-table :data="selectedList" border style="width: 100%">
                <el-table-column type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="equityName" label="权益名称" width="180">
                </el-table-column>
                <el-table-column prop="type" label="权益类型">
                </el-table-column>
                <el-table-column prop="cataName" label="权益目录">
                </el-table-column>
                <el-table-column prop="equityInventory" label="当前库存">
                </el-table-column>
            </el-table>
        </template>
        <template>
            <el-form
                ref="numForm"
                :rules="numRules"
                :model="numForm"
                class="demo-form-inline"
                label-width="110px"
            >
                <el-form-item label="调整方向：" prop="checkType">
                    <el-radio-group v-model="numForm.checkType">
                        <el-radio
                            v-for="item in checkTypeList"
                            :label="item.value"
                            :key="item.value"
                            >{{ item.label }}</el-radio
                        >
                        <!-- <el-radio label="增加"></el-radio>
                                <el-radio label="减少"></el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="调整数量：" prop="adjustAmount">
                    <el-input
                        type="number"
                        v-model="numForm.adjustAmount"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="调整原因：" prop="checkMark">
                    <el-input
                        v-model="numForm.checkMark"
                        type="textarea"
                        placeholder="请输入调整原因"
                    ></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template v-slot:footer>
            <el-button size="small" type="primary" @click="resetForm('numForm')"
                >取消</el-button
            >
            <el-button
                size="small"
                type="primary"
                @click="submitForm('numForm')"
                >提交</el-button
            >
        </template>
    </common-dialog>
</template>
<script>
import { putObj } from "@/api/equity/pool";
import { mapGetters } from "vuex";
import { deepClone } from "@/util/tag";
export default {
    name: "changeInventory",
    props: ["selectedList", "showDetail", "checkTypeList"],
    computed: {
        ...mapGetters(["tag"]),
    },
    data() {
        return {
            numForm: {
                adjustAmount: "",
                checkType: "",
                checkMark: "",
            },
            numRules: {
                checkType: [
                    {
                        required: true,
                        message: "请选择调整方向",
                        trigger: "change",
                    },
                ],
                adjustAmount: [
                    {
                        required: true,
                        message: "请输入调整数量",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    methods: {
        submitForm(val) {
            this.$refs[val].validate((valid) => {
                if (valid) {
                    // 调整方向，数量为必填项
                    // ？？？库存减小时，做一步处理：调整方向选择“5减少”时，库存数量必须小于原库存
                    if (this.numForm.checkType === "5") {
                        let middleList = this.selectedList.map(
                            (item) => item.equityInventory
                        );
                        let middleNumber = Number(this.numForm.adjustAmount);
                        if (
                            middleList.some(
                                (item) => Number(item) < middleNumber
                            )
                        ) {
                            this.$message({
                                message: "减少的数量不能大于权益库存的库存数量",
                                type: "warning",
                            });
                            return false;
                        }
                    }
                    let finalData = deepClone(this.numForm);
                    finalData["equityId"] = this.selectedList
                        .map((item) => item.equityId)
                        .join(",");
                    // finalData["equityId"] = this.equityId
                    // checkStatus
                    // gid
                    finalData["checkStatus"] = "3";
                    finalData["gid"] = this.tag.query.menuId;
                    putObj(finalData)
                        .then((data) => {
                            this.$emit("closeFn");
                            this.numForm = {
                                adjustAmount: "",
                                checkType: "",
                                checkMark: "",
                            };

                            this.$message({
                                message: data.data.msg,
                                type: "success",
                            });

                            this.getList(this.page);
                        })
                        .catch(() => {});
                } else {
                    this.$message({
                        message: "请检查参数是否填完整!",
                        type: "warning",
                    });
                    return false;
                }
            });
        },
        closeFn() {
            this.numForm = {
                adjustAmount: "",
                checkType: "",
                checkMark: "",
            };

            this.$emit("closeFn");
        },
        resetForm(val) {
            this.closeFn();
            // this.$emit("resetForm", val);
        },
    },
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
.previewEquity {
    // min-width: 330px;
    // min-height: 400px;
    width: 100%;
    padding: 10px;
    // border: 1px solid grey;
    // height: 60%;
    margin: 0 auto;
    .textCover {
        text-align: center;
        font-size: 16px;
        line-height: 30px;
        height: 30px;
    }
    .previewBtn {
        margin: 10px 0;
        text-align: center;
    }
    .imgCover {
        width: 100%;
        // min-height:100px;
        overflow-y: auto;
        // max-height: 200px;
        height: 280px;
        img {
            width: 100%;
            height: auto;
        }
    }
}
</style>